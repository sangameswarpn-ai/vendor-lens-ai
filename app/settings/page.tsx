"use client"

import { useState } from 'react'
import { Save } from 'lucide-react'

import { AppShell } from '@/components/layout/app-shell'
import { AuthGuard } from '@/components/app/auth-guard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault()
    setSaved(true)
  }

  return (
    <AuthGuard>
      <AppShell>
        <div className="mx-auto max-w-3xl space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Settings</h2>
            <p className="text-sm text-slate-500">Manage your profile, notifications, theme, and security.</p>
          </div>

          {saved ? <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">Changes saved successfully.</div> : null}

          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Input placeholder="Full name" defaultValue="Ava Patel" />
                  <Input placeholder="Company name" defaultValue="Northstar Holdings" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input placeholder="Email" defaultValue="ava@northstar.com" />
                  <select className="flex h-10 rounded-lg border border-input bg-background px-3 text-sm" defaultValue="dark">
                    <option value="dark">Dark Theme</option>
                    <option value="light">Light Theme</option>
                  </select>
                </div>
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="mb-3 text-sm font-medium text-slate-800">Notification Settings</p>
                  <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                    <label className="rounded-full border border-slate-200 px-3 py-1">Email alerts</label>
                    <label className="rounded-full border border-slate-200 px-3 py-1">Slack updates</label>
                    <label className="rounded-full border border-slate-200 px-3 py-1">Weekly digest</label>
                  </div>
                </div>
                <Input type="password" placeholder="New password" />
                <Button type="submit">
                  <Save className="mr-2 size-4" /> Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </AppShell>
    </AuthGuard>
  )
}
