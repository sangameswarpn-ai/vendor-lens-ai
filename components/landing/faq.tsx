"use client"

import { useState } from "react"
import { Reveal } from "./reveal"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    q: "How accurate is the AI risk analysis?",
    a: "VendorLens is benchmarked against more than 10,000 enterprise contracts and continuously evaluated by legal experts. Every finding cites the exact clause so your team can verify the reasoning behind each score.",
  },
  {
    q: "What file formats can I upload?",
    a: "You can upload PDFs, Word documents, scanned images, and plain text. Our ingestion pipeline handles OCR and structures the document automatically.",
  },
  {
    q: "Is my contract data secure?",
    a: "Yes. VendorLens is SOC 2 Type II compliant, encrypts data in transit and at rest, and never uses your contracts to train shared models. Enterprise plans include SSO and data residency options.",
  },
  {
    q: "Can I customize the risk scoring to our policies?",
    a: "Absolutely. Growth and Enterprise plans let you define custom risk policies, thresholds, and clause standards so scores reflect your organization's specific risk appetite.",
  },
  {
    q: "Does it integrate with our existing tools?",
    a: "VendorLens integrates with major ERP, CLM, and procurement systems via our API. Enterprise customers get dedicated support for custom integrations.",
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="bg-muted/30 py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              FAQ
            </span>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Frequently asked questions
            </h2>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = open === i
              return (
                <div
                  key={faq.q}
                  className="overflow-hidden rounded-2xl border border-border/70 bg-card/60 backdrop-blur"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-foreground">{faq.q}</span>
                    <ChevronDown
                      className={cn(
                        "size-5 shrink-0 text-muted-foreground transition-transform duration-300",
                        isOpen && "rotate-180 text-accent",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-out",
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 leading-relaxed text-muted-foreground">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
