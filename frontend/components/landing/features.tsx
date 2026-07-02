import { Reveal } from "./reveal"
import {
  FileSearch,
  ShieldAlert,
  Gauge,
  FileBarChart,
  Workflow,
  Bell,
} from "lucide-react"

const features = [
  {
    icon: FileSearch,
    title: "Contract Intelligence",
    description:
      "Upload any vendor agreement and let AI extract key clauses, obligations, renewal dates, and liabilities in seconds.",
  },
  {
    icon: ShieldAlert,
    title: "Risk Identification",
    description:
      "Automatically flag indemnity gaps, data-privacy exposure, auto-renewals, and non-standard terms before you sign.",
  },
  {
    icon: Gauge,
    title: "Objective Risk Scoring",
    description:
      "Every vendor gets a transparent 0–100 risk score backed by explainable factors you can drill into and trust.",
  },
  {
    icon: FileBarChart,
    title: "Procurement Reports",
    description:
      "Generate audit-ready reports and executive summaries with one click — formatted for legal, finance, and the board.",
  },
  {
    icon: Workflow,
    title: "Approval Workflows",
    description:
      "Route high-risk contracts to the right reviewers with automated, policy-driven approval chains.",
  },
  {
    icon: Bell,
    title: "Renewal Monitoring",
    description:
      "Never miss a deadline. Get proactive alerts on renewals, price escalations, and expiring SLAs.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Features
            </span>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Everything you need to de-risk vendor spend
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              A complete intelligence layer for modern procurement, from intake
              to renewal.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 80}>
              <div className="group h-full rounded-2xl border border-border/70 bg-card/60 p-7 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10">
                <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
                  <feature.icon className="size-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
