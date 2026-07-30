import { Link, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { reportLovableError } from "@/lib/lovable-error-reporting";

/** Shared route-level error boundary UI (used as the router default). */
export function RouteError({ error, reset }: { error: Error; reset?: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error("Route error:", error);
    reportLovableError(error, { boundary: "route_error_component" });
  }, [error]);

  return (
    <div className="grid min-h-[60vh] place-items-center bg-slate-50 px-6 text-center">
      <div className="max-w-md">
        <h1 className="font-display text-2xl font-bold text-slate-900">This section didn't load</h1>
        <p className="mt-3 text-sm text-slate-600">
          Something went wrong while loading this page. Please try again, or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset?.();
            }}
            className="rounded-full bg-[#0057B8] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#003c85]"
          >
            Try again
          </button>
          <Link
            to="/"
            className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-[#0057B8] hover:text-[#0057B8]"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
