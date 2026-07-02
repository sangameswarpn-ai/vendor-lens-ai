"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Reveal } from "./reveal"
import { ArrowRight, Sparkles, ShieldCheck, FileText } from "lucide-react"

export function Hero() {
  const router = useRouter()
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
      {/* background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-105 w-205 -translate-x-1/2 rounded-full bg-linear-to-br from-primary/20 via-accent/15 to-transparent blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 100%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="size-4 text-accent" />
              AI-powered contract risk, in seconds
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-6xl">
              AI Procurement &amp; Vendor Risk{" "}
              <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                Intelligence Platform
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              VendorLens AI reads your vendor agreements, surfaces hidden risks,
              assigns objective risk scores, and generates audit-ready
              procurement reports — so your team can negotiate smarter and move
              faster.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                  size="lg"
                  className="group bg-linear-to-r from-primary to-accent text-primary-foreground shadow-sm transition-shadow hover:shadow-lg hover:shadow-accent/25"
                  onClick={() => router.push('/signup')}
                >
                  Get Started Free
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Button>

                <Button size="lg" variant="outline" onClick={() => router.push('/login')}>
                  Book a Demo
                </Button>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-primary" /> SOC 2 Type II
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FileText className="size-4 text-primary" /> No credit card
                required
              </span>
            </div>
          </Reveal>
        </div>

        {/* Dashboard preview */}
        <Reveal delay={200} className="mt-16">
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-linear-to-r from-primary/20 to-accent/20 opacity-60 blur-2xl" />
            <div className="overflow-hidden rounded-2xl border border-border/70 bg-background/70 p-2 shadow-2xl shadow-primary/10 backdrop-blur">
              <Image
                src="/dashboard-preview.png"
                alt="VendorLens AI dashboard showing vendor risk scores, contract risk trends, and vendor agreement analysis"
                width={1600}
                height={1000}
                priority
                className="w-full rounded-xl"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
