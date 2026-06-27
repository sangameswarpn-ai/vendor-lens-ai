import { Reveal } from "./reveal"

const testimonials = [
  {
    quote:
      "VendorLens cut our contract review time from days to minutes. The risk scoring is shockingly accurate and our legal team finally trusts the output.",
    name: "Sarah Chen",
    role: "VP of Procurement, Northwind",
    initials: "SC",
  },
  {
    quote:
      "We caught an unlimited-liability clause that would have cost us seven figures. VendorLens paid for itself in the first week.",
    name: "Marcus Rivera",
    role: "Head of Legal Ops, Vertex",
    initials: "MR",
  },
  {
    quote:
      "The audit-ready reports are a game changer. Our board reviews now take half the time and everyone understands the risk.",
    name: "Priya Nair",
    role: "CFO, Meridian",
    initials: "PN",
  },
]

export function Testimonials() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Testimonials
            </span>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Loved by procurement and legal teams
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="flex h-full flex-col rounded-2xl border border-border/70 bg-card/60 p-7 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <blockquote className="flex-1 text-pretty leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border/60 pt-5">
                  <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-semibold text-primary-foreground">
                    {t.initials}
                  </span>
                  <div>
                    <div className="font-semibold text-foreground">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
