import { createFileRoute } from "@tanstack/react-router";
import type { AdminState } from "@/lib/admin-content";

const localStore = globalThis as typeof globalThis & { __sheshaanAdminContent?: AdminState };

export const Route = createFileRoute("/api/admin/content")({
  server: {
    handlers: {
      GET: async () => {
        return json({ content: localStore.__sheshaanAdminContent ?? null });
      },
      POST: async ({ request }) => {
        const providedPasscode = request.headers.get("x-admin-passcode") ?? "";
        const processEnv = (globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }).process?.env;
        const localFallbackPasscode = isLocalRequest(request) ? "sheshaan-admin" : processEnv?.SHESHAAN_ADMIN_PASSCODE;

        if (!localFallbackPasscode) {
          return json({ error: "Admin passcode is not configured." }, { status: 503 });
        }
        if (providedPasscode !== localFallbackPasscode) {
          return json({ error: "Invalid admin passcode." }, { status: 401 });
        }

        const content = await request.json() as AdminState;
        if (!content || !Array.isArray(content.products) || !Array.isArray(content.blogs)) {
          return json({ error: "Invalid content payload." }, { status: 400 });
        }

        localStore.__sheshaanAdminContent = content;
        return json({ ok: true, savedAt: new Date().toISOString() });
      },
    },
  },
});

function isLocalRequest(request: Request) {
  const host = new URL(request.url).hostname;
  return host === "localhost" || host === "127.0.0.1";
}

function json(data: unknown, init?: ResponseInit) {
  return Response.json(data, {
    ...init,
    headers: {
      "cache-control": "no-store",
      ...init?.headers,
    },
  });
}
