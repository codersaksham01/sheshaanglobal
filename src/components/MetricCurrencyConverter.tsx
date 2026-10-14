import React, { useState, useMemo } from "react";
import {
  Scale,
  DollarSign,
  ArrowRightLeft,
  RotateCcw,
  Info,
  Check,
  Copy,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

interface CurrencyRate {
  code: string;
  symbol: string;
  name: string;
  rateToUsd: number; // 1 USD in this currency
}

const CURRENCIES: CurrencyRate[] = [
  { code: "USD", symbol: "$", name: "US Dollar", rateToUsd: 1.0 },
  { code: "AED", symbol: "AED", name: "UAE Dirham", rateToUsd: 3.6725 },
  { code: "SAR", symbol: "SAR", name: "Saudi Riyal", rateToUsd: 3.75 },
  { code: "EUR", symbol: "€", name: "Euro", rateToUsd: 0.92 },
  { code: "GBP", symbol: "£", name: "British Pound", rateToUsd: 0.79 },
  { code: "INR", symbol: "₹", name: "Indian Rupee", rateToUsd: 84.5 },
];

export function MetricCurrencyConverter() {
  // Metric units state based on metric tons (MT)
  const [metricTons, setMetricTons] = useState<number>(29); // Default 1x 40ft FCL

  // Currency pricing calculator state
  const [targetCurrency, setTargetCurrency] = useState<string>("USD");
  const [basePricePerMtUsd, setBasePricePerMtUsd] = useState<number>(420); // Benchmark Nashik Red Onion FOB

  // Calculations for units
  const kg = useMemo(() => Math.round(metricTons * 1000), [metricTons]);
  const quintals = useMemo(() => Number((metricTons * 10).toFixed(2)), [metricTons]);
  const lbs = useMemo(() => Math.round(metricTons * 2204.62262), [metricTons]);
  const bags25kg = useMemo(() => Math.round((metricTons * 1000) / 25), [metricTons]);
  const bags50kg = useMemo(() => Math.round((metricTons * 1000) / 50), [metricTons]);

  // Handlers for bi-directional unit inputs
  const handleMtChange = (val: string) => {
    const num = parseFloat(val);
    setMetricTons(isNaN(num) || num < 0 ? 0 : num);
  };

  const handleKgChange = (val: string) => {
    const num = parseFloat(val);
    setMetricTons(isNaN(num) || num < 0 ? 0 : Number((num / 1000).toFixed(3)));
  };

  const handleQuintalChange = (val: string) => {
    const num = parseFloat(val);
    setMetricTons(isNaN(num) || num < 0 ? 0 : Number((num / 10).toFixed(3)));
  };

  const handleLbsChange = (val: string) => {
    const num = parseFloat(val);
    setMetricTons(isNaN(num) || num < 0 ? 0 : Number((num / 2204.62262).toFixed(3)));
  };

  const handleBags25Change = (val: string) => {
    const num = parseFloat(val);
    setMetricTons(isNaN(num) || num < 0 ? 0 : Number(((num * 25) / 1000).toFixed(3)));
  };

  const handleBags50Change = (val: string) => {
    const num = parseFloat(val);
    setMetricTons(isNaN(num) || num < 0 ? 0 : Number(((num * 50) / 1000).toFixed(3)));
  };

  // Currency conversion calculations
  const activeCurr = CURRENCIES.find((c) => c.code === targetCurrency) ?? CURRENCIES[0];
  const convertedPricePerMt = useMemo(() => {
    return Number((basePricePerMtUsd * activeCurr.rateToUsd).toFixed(2));
  }, [basePricePerMtUsd, activeCurr]);

  const convertedPricePerKg = useMemo(() => {
    return Number((convertedPricePerMt / 1000).toFixed(3));
  }, [convertedPricePerMt]);

  const convertedPricePer25Bag = useMemo(() => {
    return Number((convertedPricePerKg * 25).toFixed(2));
  }, [convertedPricePerKg]);

  const totalLotPrice = useMemo(() => {
    return Number((convertedPricePerMt * metricTons).toFixed(2));
  }, [convertedPricePerMt, metricTons]);

  const handleCopyConversion = () => {
    const text = `Sheshaan Global Unit & Price Conversion: ${metricTons} MT = ${kg.toLocaleString()} KG | ${lbs.toLocaleString()} LBS | ${bags25kg.toLocaleString()} bags (25kg) | Est. Rate: ${activeCurr.symbol} ${convertedPricePerMt.toLocaleString()}/MT (${activeCurr.symbol} ${convertedPricePerKg}/KG)`;
    navigator.clipboard.writeText(text);
    toast.success("Conversion values copied to clipboard!");
  };

  return (
    <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="inline-block rounded-full bg-[#0057B8]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#0057B8]">
            Trade Procurement Utility
          </span>
          <h3 className="mt-2 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
            Agricultural Metric &amp; Currency Quick-Converter
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Instant bidirectional unit conversions between Metric Tons, Kilograms, Quintals, US Pounds, and
            export bag counts with multi-currency reference pricing.
          </p>
        </div>
        <button
          onClick={handleCopyConversion}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
        >
          <Copy className="h-3.5 w-3.5 text-slate-500" /> Copy Calculations
        </button>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-12">
        {/* Section 1: Weight & Packaging Units */}
        <div className="space-y-4 lg:col-span-7">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
              <Scale className="h-4 w-4 text-[#0057B8]" /> 1. Bi-Directional Weight Converter
            </span>
            <span className="text-[11px] text-slate-500">Edit any field to recalculate all</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-300 bg-slate-50 p-3">
              <label className="text-[11px] font-bold uppercase text-slate-500">Metric Tons (MT)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={metricTons || ""}
                onChange={(e) => handleMtChange(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-900 focus:border-[#0057B8] focus:outline-none"
              />
              <span className="mt-1 block text-[10px] text-slate-400">1 MT = 1,000 KG</span>
            </div>

            <div className="rounded-xl border border-slate-300 bg-slate-50 p-3">
              <label className="text-[11px] font-bold uppercase text-slate-500">Kilograms (KG)</label>
              <input
                type="number"
                step="1"
                min="0"
                value={kg || ""}
                onChange={(e) => handleKgChange(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-900 focus:border-[#0057B8] focus:outline-none"
              />
              <span className="mt-1 block text-[10px] text-slate-400">Net payload</span>
            </div>

            <div className="rounded-xl border border-slate-300 bg-slate-50 p-3">
              <label className="text-[11px] font-bold uppercase text-slate-500">Indian Quintals</label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={quintals || ""}
                onChange={(e) => handleQuintalChange(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-900 focus:border-[#0057B8] focus:outline-none"
              />
              <span className="mt-1 block text-[10px] text-slate-400">1 Quintal = 100 KG</span>
            </div>

            <div className="rounded-xl border border-slate-300 bg-slate-50 p-3">
              <label className="text-[11px] font-bold uppercase text-slate-500">US Pounds (LBS)</label>
              <input
                type="number"
                step="1"
                min="0"
                value={lbs || ""}
                onChange={(e) => handleLbsChange(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-900 focus:border-[#0057B8] focus:outline-none"
              />
              <span className="mt-1 block text-[10px] text-slate-400">1 MT = 2,204.62 LBS</span>
            </div>

            <div className="rounded-xl border border-slate-300 bg-slate-50 p-3">
              <label className="text-[11px] font-bold uppercase text-slate-500">25 KG Export Bags</label>
              <input
                type="number"
                step="1"
                min="0"
                value={bags25kg || ""}
                onChange={(e) => handleBags25Change(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-900 focus:border-[#0057B8] focus:outline-none"
              />
              <span className="mt-1 block text-[10px] text-slate-400">Standard Mesh / PP</span>
            </div>

            <div className="rounded-xl border border-slate-300 bg-slate-50 p-3">
              <label className="text-[11px] font-bold uppercase text-slate-500">50 KG Bulk Bags</label>
              <input
                type="number"
                step="1"
                min="0"
                value={bags50kg || ""}
                onChange={(e) => handleBags50Change(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-900 focus:border-[#0057B8] focus:outline-none"
              />
              <span className="mt-1 block text-[10px] text-slate-400">Jute / Woven PP</span>
            </div>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="font-semibold text-slate-500">Standard Container Presets:</span>
            <button
              onClick={() => setMetricTons(14)}
              className="rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-slate-200 font-medium"
            >
              14 MT (20ft Reefer)
            </button>
            <button
              onClick={() => setMetricTons(24)}
              className="rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-slate-200 font-medium"
            >
              24 MT (20ft Dry FCL)
            </button>
            <button
              onClick={() => setMetricTons(29)}
              className="rounded-lg border border-slate-200 bg-[#0057B8]/10 px-2.5 py-1 text-[#0057B8] font-bold hover:bg-[#0057B8]/20"
            >
              29 MT (40ft HC Reefer)
            </button>
          </div>
        </div>

        {/* Section 2: Multi-Currency Indicative Pricing Calculator */}
        <div className="flex flex-col justify-between rounded-2xl bg-[#04152D] p-6 text-white lg:col-span-5 shadow-lg">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF8A00]">
                <DollarSign className="h-4 w-4" /> 2. Currency Pricing Converter
              </span>
              <span className="text-[10px] text-slate-400">Indicative Benchmark</span>
            </div>

            {/* Currency picker pills */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {CURRENCIES.map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => setTargetCurrency(curr.code)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                    targetCurrency === curr.code
                      ? "bg-[#FF8A00] text-slate-950"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {curr.code} ({curr.symbol})
                </button>
              ))}
            </div>

            {/* Base USD input */}
            <div className="mt-4">
              <label className="text-[11px] font-semibold text-slate-300">
                Indicative Benchmark Rate (USD / MT FOB):
              </label>
              <div className="relative mt-1">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                  $
                </span>
                <input
                  type="number"
                  step="10"
                  min="50"
                  value={basePricePerMtUsd}
                  onChange={(e) => setBasePricePerMtUsd(Number(e.target.value) || 0)}
                  className="w-full rounded-xl border border-white/20 bg-white/10 py-2 pl-8 pr-4 text-sm font-bold text-white focus:border-[#FF8A00] focus:outline-none"
                />
              </div>
            </div>

            {/* Output price cards */}
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <div className="rounded-xl bg-white/10 p-3">
                <div className="text-[10px] uppercase tracking-wider text-slate-300">
                  Rate in {activeCurr.code} / MT
                </div>
                <div className="mt-1 text-xl font-extrabold text-amber-400">
                  {activeCurr.symbol} {convertedPricePerMt.toLocaleString()}
                </div>
              </div>

              <div className="rounded-xl bg-white/10 p-3">
                <div className="text-[10px] uppercase tracking-wider text-slate-300">
                  Rate in {activeCurr.code} / KG
                </div>
                <div className="mt-1 text-xl font-extrabold text-emerald-400">
                  {activeCurr.symbol} {convertedPricePerKg.toFixed(2)}
                </div>
              </div>

              <div className="rounded-xl bg-white/10 p-3">
                <div className="text-[10px] uppercase tracking-wider text-slate-300">
                  Rate in {activeCurr.code} / 25kg Bag
                </div>
                <div className="mt-1 text-lg font-bold text-white">
                  {activeCurr.symbol} {convertedPricePer25Bag.toFixed(2)}
                </div>
              </div>

              <div className="rounded-xl bg-white/10 p-3">
                <div className="text-[10px] uppercase tracking-wider text-slate-300">
                  Total Lot ({metricTons} MT)
                </div>
                <div className="mt-1 text-lg font-bold text-emerald-300">
                  {activeCurr.symbol} {totalLotPrice.toLocaleString()}
                </div>
              </div>
            </div>

            <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
              * Benchmark rates provided for procurement modeling. Actual commercial proforma invoices
              executed under irrevocable LC at bank spot rate.
            </p>
          </div>

          <a
            href={`https://wa.me/918149909546?text=${encodeURIComponent(
              `Hello Sheshaan Global,\nI used your Currency & Unit Converter:\n• Target Volume: ${metricTons} MT (~${bags25kg} bags of 25kg)\n• Benchmark Reference: ${activeCurr.symbol} ${convertedPricePerMt}/MT (${activeCurr.code})\n\nPlease share today's official firm quote.`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-center text-xs font-bold text-white shadow-md transition hover:bg-emerald-500"
          >
            Inquire Firm Commercial Quote on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
