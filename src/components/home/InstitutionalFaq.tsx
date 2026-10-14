import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQS } from "@/lib/site";

export function InstitutionalFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-[#FBFBFA] py-20 text-[#111816]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded border border-[#C59B27]/40 bg-[#F5F3EF] px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-widest text-[#A67C1E]">
            <HelpCircle className="h-3.5 w-3.5 text-[#091E16]" />
            Commercial &amp; Trade Inquiries
          </div>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#091E16] sm:text-4xl">
            Frequently Asked Trade Questions
          </h2>
          <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#3D4843]">
            Essential answers on payment terms, ocean freight minimums, cold chain parameters, and
            customs documentation.
          </p>
        </div>

        <div className="mt-10 space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-xl border border-[#091E16]/10 bg-white transition-all duration-200 hover:border-[#C59B27]"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-[#F5F3EF]/60"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-[#091E16] pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-[#C59B27] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-[#091E16]/08 bg-[#F5F3EF]/30 px-5 pb-5 pt-3">
                    <p className="text-sm leading-relaxed text-[#3D4843] whitespace-pre-line">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
