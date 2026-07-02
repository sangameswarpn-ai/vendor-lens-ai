import { Reveal } from "./reveal"

const companies = [
  "Northwind",
  "Acme Corp",
  "Lumio",
  "Vertex",
  "Cascade",
  "Meridian",
]

export function Trusted() {
  return (
    <section className="border-y border-border/60 bg-muted/30 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Trusted by procurement teams at leading enterprises
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
            {companies.map((name) => (
              <div
                key={name}
                className="text-center text-lg font-semibold tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground"
              >
                {name}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
