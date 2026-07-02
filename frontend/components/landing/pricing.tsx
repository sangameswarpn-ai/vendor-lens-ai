import { Reveal } from "./reveal"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    description: "For small teams evaluating vendor risk.",
    features: [
      "Up to 10 contracts / month",
      "AI risk scoring",
      "Basic risk findings",
      "PDF report export",
    ],
    cta: "Get started",
    featured: false,
  },
  {
    name: "Growth",
    price: "$499",
    period: "/mo",
    description: "For growing procurement teams that need more power.",
    features: [
      "Up to 500 contracts / month",
      "Clause-level explanations",
      "Approval workflows",
      "Renewal monitoring & alerts",
      "Custom risk policies",
    ],
    cta: "Start free trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations with advanced security needs.",
    features: [
      "Unlimited contracts",
      "SSO & SCIM provisioning",
      "Dedicated success manager",
      "API & ERP integrations",
      "Custom benchmarks & SLAs",
    ],
    cta: "Contact sales",
    featured: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Pricing
            </span>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              Start free and scale as your procurement needs grow.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 100}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border p-8 backdrop-blur transition-all duration-300",
                  plan.featured
                    ? "border-transparent bg-gradient-to-b from-primary to-accent text-primary-foreground shadow-xl shadow-accent/20"
                    : "border-border/70 bg-card/60 shadow-sm hover:-translate-y-1 hover:shadow-lg",
                )}
              >
                {plan.featured && (
                  <span className="absolute right-6 top-6 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold">
                    Most popular
                  </span>
                )}
                <h3
                  className={cn(
                    "text-lg font-semibold",
                    plan.featured ? "text-primary-foreground" : "text-foreground",
                  )}
                >
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">
                    {plan.price}
                  </span>
                  <span
                    className={cn(
                      "text-sm",
                      plan.featured
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground",
                    )}
                  >
                    {plan.period}
                  </span>
                </div>
                <p
                  className={cn(
                    "mt-3 text-sm leading-relaxed",
                    plan.featured
                      ? "text-primary-foreground/85"
                      : "text-muted-foreground",
                  )}
                >
                  {plan.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          plan.featured ? "text-primary-foreground" : "text-primary",
                        )}
                      />
                      <span
                        className={
                          plan.featured
                            ? "text-primary-foreground/90"
                            : "text-foreground"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn(
                    "mt-8 w-full",
                    plan.featured
                      ? "bg-background text-primary hover:bg-background/90"
                      : "bg-gradient-to-r from-primary to-accent text-primary-foreground",
                  )}
                >
                  {plan.cta}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
