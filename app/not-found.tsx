import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-slate-50 px-4 py-16 text-slate-900">
      <div className="max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
        <span className="inline-block rounded-full bg-[#FF8A00]/15 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#FF8A00]">
          404 • Export Dossier Route Not Found
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Looking for an Indian Agricultural Export Specification?
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          The requested URL may have been consolidated into our 49-Commodity HS Code Directory or
          our Port-to-Port Global Export Corridors. Select a destination below or message our 24/7
          Export Trade Desk directly.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="/products"
            className="inline-flex items-center justify-center rounded-xl bg-[#0057B8] px-5 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#003c85]"
          >
            Browse 49-Commodity Catalog →
          </a>
          <a
            href="/exports"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-bold text-slate-800 transition hover:border-[#0057B8] hover:text-[#0057B8]"
          >
            Explore Global Trade Corridors
          </a>
          <a
            href="https://wa.me/918149909546?text=Hello%20Sheshaan%20Global%20Export%20Desk%2C%20I%20am%20looking%20for%20a%20commodity%20specification%20sheet%20and%20FOB%2FCIF%20quote."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-[#25D366] px-5 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#1da851]"
          >
            WhatsApp Trade Desk (+91 81499 09546)
          </a>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-5 text-xs text-slate-500">
          <Link href="/" className="font-semibold text-[#0057B8] hover:underline">
            ← Return to Sheshaan Global Home
          </Link>
        </div>
      </div>
    </main>
  );
}
