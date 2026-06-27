import { Reveal } from "./reveal"
import { Upload, ScanSearch, BarChart3, FileCheck } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Upload agreements",
    description:
      "Drag and drop contracts, MSAs, and SOWs in any format. VendorLens ingests and structures them instantly.",
  },
  {
    icon: ScanSearch,
    title: "AI analyzes risk",
    description:
      "Our models read every clause, comparing terms against your policies and industry benchmarks.",
  },
  {
    icon: BarChart3,
    title: "Get risk scores",
    description:
      "Receive a transparent risk score per vendor with prioritized, explainable findings.",
  },
  {
    icon: FileCheck,
    title: "Generate reports",
    description:
      "Export executive-ready procurement reports and share insights across your organization.",
  },
]

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              How it works
            </span>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              From contract to clarity in four steps
            </h2>
          </div>
        </Reveal>

        <div className="relative mt-16">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 100}>
                <div className="relative text-center">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-border/70 bg-background shadow-sm">
                    <step.icon className="size-6 text-primary" />
                    <span className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-semibold text-primary-foreground">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
