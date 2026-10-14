import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { ScrollProgress } from "../components/ScrollProgress";
import { SiteNavbar } from "../components/SiteNavbar";
import { VisitPopup } from "../components/VisitPopup";
import { DEFAULT_KEYWORDS, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "../lib/seo";
import { ORGANIZATION_JSONLD } from "../lib/site";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-background px-4 py-16">
      <div className="max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">
          404 • Export Dossier Route Not Found
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-foreground sm:text-4xl">
          Looking for an Indian Agricultural Export Specification?
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you requested may have moved to our 49-Commodity HS Code Directory or our
          Port-to-Port Global Export Corridors.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="/products"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Browse 49-Commodity Catalog →
          </a>
          <a
            href="/exports"
            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2.5 text-xs font-bold text-foreground transition-colors hover:bg-accent"
          >
            Explore Export Corridors
          </a>
          <a
            href="https://wa.me/918149909546"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-[#25D366] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#1da851]"
          >
            WhatsApp (+91 81499 09546)
          </a>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sheshaan Global | Indian Agricultural Produce Exporter" },
      {
        name: "description",
        content:
          "IEC and APEDA certified Indian exporter of onions, green chillies, rice, coconut, spices and pulses to 25+ countries. Get catalogue and pricing.",
      },
      { name: "keywords", content: DEFAULT_KEYWORDS },
      { name: "author", content: SITE_NAME },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/" },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { property: "og:image:alt", content: "Sheshaan Global agricultural export company logo" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
      { name: "theme-color", content: "#0057B8" },
      { name: "format-detection", content: "telephone=yes" },
      { name: "msvalidate.01", content: "220260664B862A3A28DB3917C5DCE05C" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://translate.google.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "icon", href: "/favicon-192.png", type: "image/png", sizes: "192x192" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "alternate", hrefLang: "en", href: SITE_URL + "/" },
      { rel: "alternate", hrefLang: "ar", href: SITE_URL + "/ar" },
      { rel: "alternate", hrefLang: "fr", href: SITE_URL + "/fr" },
      { rel: "alternate", hrefLang: "ru", href: SITE_URL + "/ru" },
      { rel: "alternate", hrefLang: "x-default", href: SITE_URL + "/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(ORGANIZATION_JSONLD),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="msvalidate.01" content="220260664B862A3A28DB3917C5DCE05C" />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollProgress />
      <SiteNavbar />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <LanguageSwitcher />
      <VisitPopup />
    </QueryClientProvider>
  );
}
