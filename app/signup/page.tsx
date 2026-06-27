"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, ShieldCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function SignUpPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!name.trim() || !email.trim() || !password.trim()) {
      window.alert('Please complete all fields to create an account.')
      return
    }

    router.push('/login')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(109,40,217,0.16),transparent_55%)] px-4 py-10">
      <Card className="w-full max-w-md border-slate-200 shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <ShieldCheck className="size-6" />
          </div>
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <p className="text-sm text-slate-500">Start monitoring vendor risk with AI in minutes.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Full name" value={name} onChange={(event) => setName(event.target.value)} />
            <Input type="email" placeholder="Work email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
            <Button className="w-full" type="submit">
              Create account <ArrowRight className="ml-2 size-4" />
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary">Log in</Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
