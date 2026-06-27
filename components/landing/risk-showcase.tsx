import { Reveal } from "./reveal"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle2, ShieldX, ArrowRight } from "lucide-react"

const findings = [
  {
    level: "high",
    label: "Unlimited liability clause",
    detail: "Section 9.2 — no cap on indemnification",
  },
  {
    level: "medium",
    label: "Auto-renewal with 90-day notice",
    detail: "Section 3.1 — easy to miss opt-out window",
  },
  {
    level: "low",
    label: "Standard data processing terms",
    detail: "Exhibit C — GDPR & SOC 2 aligned",
  },
]

const levelStyles: Record<
  string,
  { icon: typeof AlertTriangle; chip: string; iconColor: string }
> = {
  high: {
    icon: ShieldX,
    chip: "bg-destructive/10 text-destructive",
    iconColor: "text-destructive",
  },
  medium: {
    icon: AlertTriangle,
    chip: "bg-amber-500/10 text-amber-600",
    iconColor: "text-amber-500",
  },
  low: {
    icon: CheckCircle2,
    chip: "bg-emerald-500/10 text-emerald-600",
    iconColor: "text-emerald-500",
  },
}

export function RiskShowcase() {
  const score = 72
  const circumference = 2 * Math.PI * 52

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-accent">
                AI Risk Analysis
              </span>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                See exactly why a vendor is risky — and what to do about it
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                VendorLens doesn&apos;t just give you a number. Every score is
                broken down into explainable findings mapped to the exact clause,
                so legal and procurement always know the &quot;why&quot; behind
                the risk.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Clause-level explanations and citations",
                  "Benchmarked against 10,000+ enterprise contracts",
                  "Actionable redline recommendations",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="group mt-8 bg-gradient-to-r from-primary to-accent text-primary-foreground">
                Explore risk analysis
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-primary/15 to-accent/15 blur-2xl" />
              <div className="rounded-2xl border border-border/70 bg-card/70 p-6 shadow-xl shadow-primary/5 backdrop-blur sm:p-8">
                <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-5">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Vendor Agreement
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      Cascade Cloud Services
                    </p>
                  </div>
                  <div className="relative flex size-28 items-center justify-center">
                    <svg className="size-28 -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="52"
                        fill="none"
                        stroke="var(--muted)"
                        strokeWidth="12"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="52"
                        fill="none"
                        stroke="url(#riskGradient)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference * (1 - score / 100)}
                      />
                      <defs>
                        <linearGradient
                          id="riskGradient"
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="1"
                        >
                          <stop offset="0%" stopColor="var(--primary)" />
                          <stop offset="100%" stopColor="var(--accent)" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-2xl font-bold text-foreground">
                        {score}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        risk score
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">
                    Key findings
                  </p>
                  {findings.map((f) => {
                    const s = levelStyles[f.level]
                    return (
                      <div
                        key={f.label}
                        className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/60 p-3"
                      >
                        <s.icon className={`mt-0.5 size-5 shrink-0 ${s.iconColor}`} />
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-medium text-foreground">
                              {f.label}
                            </span>
                            <span
                              className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${s.chip}`}
                            >
                              {f.level} risk
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {f.detail}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
