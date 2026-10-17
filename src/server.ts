import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

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

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      const proto =
        request.headers.get("x-forwarded-proto") ||
        (url.protocol ? url.protocol.replace(":", "") : "https");

      // Redirect non-SSL HTTP requests to HTTPS with 301 Permanent Redirect
      if (
        proto === "http" &&
        !url.hostname.includes("localhost") &&
        !url.hostname.includes("127.0.0.1")
      ) {
        url.protocol = "https:";
        return new Response(null, {
          status: 301,
          headers: {
            Location: url.toString(),
            "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
          },
        });
      }

      const isLovableHost =
        url.hostname.includes("lovable.app") ||
        url.hostname.includes("lovableproject.com");

      // 301 Redirect lovable.app public traffic directly to production domain (except editor preview)
      if (
        isLovableHost &&
        !url.searchParams.has("preview") &&
        !url.searchParams.has("lovable_preview") &&
        url.pathname !== "/lovable"
      ) {
        return new Response(null, {
          status: 301,
          headers: {
            Location: `https://www.sheshaanglobal.com${url.pathname}${url.search}`,
            "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
          },
        });
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);

      // Block search bots from indexing staging on lovable.app
      if (isLovableHost) {
        normalized.headers.set(
          "X-Robots-Tag",
          "noindex, nofollow, noarchive, nosnippet",
        );
      }

      return normalized;
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
