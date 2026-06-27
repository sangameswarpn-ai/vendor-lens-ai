import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Trusted } from "@/components/landing/trusted"
import { Features } from "@/components/landing/features"
import { HowItWorks } from "@/components/landing/how-it-works"
import { RiskShowcase } from "@/components/landing/risk-showcase"
import { Pricing } from "@/components/landing/pricing"
import { Testimonials } from "@/components/landing/testimonials"
import { FAQ } from "@/components/landing/faq"
import { Footer } from "@/components/landing/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Trusted />
      <Features />
      <HowItWorks />
      <RiskShowcase />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  )
}
