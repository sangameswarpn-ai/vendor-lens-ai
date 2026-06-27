"use client"

import { useEffect, useMemo, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  FileText,
  Globe,
  LoaderCircle,
  Lock,
  Mail,
  ScanLine,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { isAuthenticated, setAuthenticated } from '@/lib/auth'

type FormErrors = {
  email?: string
  password?: string
}

const heroHighlights = [
  { title: 'AI Contract Analysis', icon: Sparkles },
  { title: 'Vendor Risk Assessment', icon: ShieldCheck },
  { title: 'Procurement Intelligence', icon: TrendingUp },
  { title: 'Compliance Monitoring', icon: CheckCircle2 },
]

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/dashboard')
    }
  }, [router])

  const validate = () => {
    const nextErrors: FormErrors = {}

    if (!email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid work email.'
    }

    if (!password.trim()) {
      nextErrors.password = 'Password is required.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('')

    if (!validate()) {
      return
    }

    setLoading(true)
    window.setTimeout(() => {
      setAuthenticated()
      setLoading(false)
      router.push('/dashboard')
    }, 800)
  }

  const handleSocialLogin = (provider: 'Google' | 'Microsoft') => {
    setLoading(true)
    setMessage(`${provider} sign-in is ready. Redirecting to your workspace...`)
    window.setTimeout(() => {
      setAuthenticated()
      setLoading(false)
      router.push('/dashboard')
    }, 700)
  }

  const heroStats = useMemo(
    () => [
      { label: 'AI coverage', value: '97%' },
      { label: 'Vendor review speed', value: '4.2x' },
      { label: 'Risk alerts', value: '24/7' },
    ],
    [],
  )

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.15),_transparent_35%),linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_100%)] px-3 py-4 sm:px-6 lg:px-8 lg:py-6">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-[32px] border border-white/70 bg-white/70 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl">
        <section className="relative hidden w-[55%] flex-col justify-between overflow-hidden bg-slate-950 px-8 py-10 text-white lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.28),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(79,70,229,0.28),_transparent_35%)]" />
          <div className="absolute -left-14 top-10 h-40 w-40 rounded-full bg-cyan-400/30 blur-3xl" style={{ animation: 'float 7s ease-in-out infinite' }} />
          <div className="absolute bottom-12 right-6 h-56 w-56 rounded-full bg-indigo-500/30 blur-3xl" style={{ animation: 'float 8s ease-in-out infinite reverse' }} />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-medium text-slate-200 backdrop-blur">
              <ScanLine className="size-4 text-cyan-300" />
              Enterprise Procurement Intelligence
            </div>

            <div className="mt-8 max-w-xl">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white xl:text-5xl">
                Secure Procurement Starts Here
              </h1>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                AI-powered vendor risk intelligence for smarter procurement decisions.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl">
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-[28px] border border-white/10 bg-white/10 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-cyan-300">Dynamic Procurement Command Center</p>
                  <p className="mt-2 text-sm text-slate-300">Monitor contracts, compliance, and vendor health in one intelligent workspace.</p>
                </div>
                <div className="rounded-2xl bg-cyan-400/20 p-3 text-cyan-200">
                  <FileText className="size-6" />
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {heroHighlights.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.title} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/40 px-3 py-3 text-sm text-slate-200">
                      <div className="rounded-xl bg-white/10 p-2 text-cyan-300">
                        <Icon className="size-4" />
                      </div>
                      {item.title}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-6 flex items-center gap-3 text-sm text-slate-300">
            <ShieldCheck className="size-4 text-cyan-300" />
            Trusted by procurement leaders at Fortune 500 companies
          </div>
        </section>

        <section className="flex w-full items-center justify-center bg-slate-50/80 px-4 py-8 sm:px-6 lg:w-[45%] lg:px-8">
          <Card className="w-full max-w-md border-0 bg-white/85 p-0 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <CardHeader className="px-6 pt-6 pb-3 text-center sm:px-8 sm:pt-8">
              <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-600/20">
                <ScanLine className="size-6" />
              </div>
              <CardTitle className="mt-4 text-2xl font-semibold text-slate-900">Welcome Back</CardTitle>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Sign in to access your procurement intelligence dashboard.
              </p>
            </CardHeader>

            <CardContent className="px-6 pb-6 sm:px-8 sm:pb-8">
              {message ? (
                <div className="mb-4 rounded-2xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-sm text-cyan-700">
                  {message}
                </div>
              ) : null}

              <form className="space-y-4" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700" htmlFor="email">
                    Work email
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Enter your work email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value)
                        if (errors.email) {
                          setErrors((current) => ({ ...current, email: undefined }))
                        }
                      }}
                      className="h-11 pl-10"
                    />
                  </div>
                  {errors.email ? <p className="text-sm text-rose-500">{errors.email}</p> : null}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value)
                        if (errors.password) {
                          setErrors((current) => ({ ...current, password: undefined }))
                        }
                      }}
                      className="h-11 pl-10 pr-10"
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      onClick={() => setShowPassword((current) => !current)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                  {errors.password ? <p className="text-sm text-rose-500">{errors.password}</p> : null}
                </div>

                <div className="flex items-center justify-between gap-2 text-sm">
                  <label className="flex items-center gap-2 text-slate-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe((current) => !current)}
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    className="font-medium text-indigo-600 transition hover:text-indigo-700"
                    onClick={() => setMessage('Password reset is available soon.')} 
                  >
                    Forgot password?
                  </button>
                </div>

                <Button type="submit" className="h-11 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-base font-semibold shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5 hover:shadow-xl" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <LoaderCircle className="size-4 animate-spin" />
                      Signing in...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Sign In
                      <ArrowRight className="size-4" />
                    </span>
                  )}
                </Button>
              </form>

              <div className="my-5 flex items-center gap-3 text-center text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                <div className="h-px flex-1 bg-slate-200" />
                <span>Or Continue With</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="space-y-3">
                <Button type="button" variant="outline" className="h-11 w-full justify-center gap-2 rounded-2xl border-slate-200 bg-white" onClick={() => handleSocialLogin('Google')} disabled={loading}>
                  <Globe className="size-4" />
                  Continue with Google
                </Button>
                <Button type="button" variant="outline" className="h-11 w-full justify-center gap-2 rounded-2xl border-slate-200 bg-white" onClick={() => handleSocialLogin('Microsoft')} disabled={loading}>
                  <Users className="size-4" />
                  Continue with Microsoft
                </Button>
              </div>

              <p className="mt-6 text-center text-sm text-slate-500">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="font-semibold text-indigo-600 transition hover:text-indigo-700">
                  Create Account
                </Link>
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-400">
                <Link href="/" className="transition hover:text-slate-600">Privacy Policy</Link>
                <span>•</span>
                <Link href="/" className="transition hover:text-slate-600">Terms of Service</Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}