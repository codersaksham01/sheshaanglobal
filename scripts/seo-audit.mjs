import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const routesDir = join(root, "src", "routes");
const routeFiles = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path);
    else if (entry.endsWith(".tsx") || entry.endsWith(".ts")) routeFiles.push(path);
  }
}

walk(routesDir);

const issues = [];
const titles = new Map();
const descriptions = new Map();

for (const file of routeFiles) {
  const source = readFileSync(file, "utf8");
  const rel = relative(root, file);
  if (!source.includes("createFileRoute")) continue;
  if (rel.includes("README")) continue;

  if (
    !source.includes('rel: "canonical"') &&
    !source.includes("rel: 'canonical'") &&
    !rel.includes("sitemap")
  ) {
    issues.push(`${rel}: missing canonical link`);
  }
  if (
    !source.includes('name: "description"') &&
    !source.includes("name: 'description'") &&
    !rel.includes("sitemap")
  ) {
    issues.push(`${rel}: missing meta description`);
  }
  if (!source.includes("{ title:") && !source.includes("const TITLE") && !rel.includes("sitemap")) {
    issues.push(`${rel}: missing title metadata`);
  }

  const titleMatch = source.match(/const TITLE = ["`]([^"`]+)["`]/);
  if (titleMatch) {
    const previous = titles.get(titleMatch[1]);
    if (previous) issues.push(`${rel}: duplicate title also in ${previous}`);
    titles.set(titleMatch[1], rel);
  }
  const descMatch = source.match(/const DESC =\s*["`]([^"`]+)["`]/);
  if (descMatch) {
    const previous = descriptions.get(descMatch[1]);
    if (previous) issues.push(`${rel}: duplicate description also in ${previous}`);
    descriptions.set(descMatch[1], rel);
  }

  for (const jsonld of source.matchAll(/JSON\.stringify\((\{[\s\S]*?\})\)/g)) {
    if (!jsonld[1].includes('"@context"') && !jsonld[1].includes("'@context'")) {
      issues.push(`${rel}: JSON-LD block may be missing @context`);
    }
  }
}

const robots = readFileSync(join(root, "public", "robots.txt"), "utf8");
if (!robots.includes("Sitemap:")) issues.push("public/robots.txt: missing Sitemap directive");
if (/Disallow:\s*\/\s*$/m.test(robots)) issues.push("public/robots.txt: blocks the full site");

if (issues.length) {
  console.error("SEO audit found issues:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`SEO audit passed: ${routeFiles.length} route files checked.`);
