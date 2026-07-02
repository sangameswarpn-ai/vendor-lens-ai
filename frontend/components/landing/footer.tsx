import { Button } from "@/components/ui/button"
import { Reveal } from "./reveal"
import { ScanLine, ArrowRight, Globe, Mail, MessageCircle } from "lucide-react"

const columns = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Integrations", "Changelog", "Security"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Customers", "Contact"],
  },
  {
    title: "Resources",
    links: ["Documentation", "API Reference", "Help Center", "Guides", "Status"],
  },
]

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border/60 bg-background">
      {/* CTA band */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative -mt-px overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-accent px-6 py-14 text-center shadow-xl sm:px-12">
            <div className="pointer-events-none absolute inset-0 opacity-20">
              <div className="absolute -left-16 -top-16 size-64 rounded-full bg-primary-foreground/20 blur-3xl" />
              <div className="absolute -bottom-16 -right-16 size-64 rounded-full bg-primary-foreground/20 blur-3xl" />
            </div>
            <h2 className="relative text-balance text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
              Start de-risking your vendor spend today
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-primary-foreground/85">
              Join the procurement teams using VendorLens AI to negotiate smarter
              and move faster.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="group bg-background text-primary hover:bg-background/90"
              >
                Get Started Free
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* footer links */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <a href="#home" className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                <ScanLine className="size-5" />
              </span>
              <span className="text-lg font-semibold tracking-tight text-foreground">
                VendorLens<span className="text-accent"> AI</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              AI-powered procurement and vendor risk intelligence for modern
              enterprises.
            </p>
            <div className="mt-5 flex gap-3">
              {[Globe, MessageCircle, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex size-9 items-center justify-center rounded-lg border border-border/70 text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
                  aria-label="Social link"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} VendorLens AI. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
