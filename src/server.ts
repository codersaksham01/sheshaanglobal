import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import type { AdminState } from "./lib/admin-content";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;
const CONTENT_KEY = "site-content";

type SiteEnv = {
  SHESHAAN_CONTENT?: {
    get: (key: string, options?: { type?: "json" | "text" }) => Promise<AdminState | string | null>;
    put: (key: string, value: string) => Promise<void>;
  };
  SHESHAAN_ADMIN_PASSCODE?: string;
};

const localStore = globalThis as typeof globalThis & { __sheshaanAdminContent?: AdminState };

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

function jsonResponse(data: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...init?.headers,
    },
  });
}

function isLocalRequest(request: Request) {
  const host = new URL(request.url).hostname;
  return host === "localhost" || host === "127.0.0.1";
}

async function handleAdminContentApi(request: Request, env: SiteEnv = {}) {
  if (request.method === "GET") {
    const stored = env.SHESHAAN_CONTENT
      ? await env.SHESHAAN_CONTENT.get(CONTENT_KEY, { type: "json" })
      : localStore.__sheshaanAdminContent ?? null;
    return jsonResponse({ content: stored ?? null });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, { status: 405 });
  }

  const expectedPasscode = env.SHESHAAN_ADMIN_PASSCODE;
  const providedPasscode = request.headers.get("x-admin-passcode") ?? "";
  const localFallbackPasscode = isLocalRequest(request) ? "sheshaan-admin" : "";
  if (!expectedPasscode && !localFallbackPasscode) {
    return jsonResponse({ error: "Admin passcode is not configured." }, { status: 503 });
  }
  if (providedPasscode !== (expectedPasscode || localFallbackPasscode)) {
    return jsonResponse({ error: "Invalid admin passcode." }, { status: 401 });
  }

  const content = await request.json() as AdminState;
  if (!content || !Array.isArray(content.products) || !Array.isArray(content.blogs)) {
    return jsonResponse({ error: "Invalid content payload." }, { status: 400 });
  }

  if (env.SHESHAAN_CONTENT) {
    await env.SHESHAAN_CONTENT.put(CONTENT_KEY, JSON.stringify(content));
  } else {
    localStore.__sheshaanAdminContent = content;
  }
  return jsonResponse({ ok: true, savedAt: new Date().toISOString() });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      if (url.pathname === "/api/admin/content") {
        return await handleAdminContentApi(request, env as SiteEnv);
      }
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
