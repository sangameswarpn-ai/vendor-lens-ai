"use client"

import { CircleDollarSign, TrendingUp, Workflow } from 'lucide-react'

import { AppShell } from '@/components/layout/app-shell'
import { AuthGuard } from '@/components/app/auth-guard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const opportunities = [
  { title: 'Bundle renewals', savings: '$184K', detail: 'Five vendors are due within 90 days.' },
  { title: 'Dual-source critical suppliers', savings: '$92K', detail: 'Reduce concentration risk by 22%.' },
]

export default function InsightsPage() {
  return (
    <AuthGuard>
      <AppShell>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Procurement Insights</h2>
            <p className="text-sm text-slate-500">Forecast savings, compare suppliers, and monitor category health.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><CircleDollarSign className="size-5 text-primary" /> Cost Savings</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-semibold text-slate-900">$328K</div><p className="mt-2 text-sm text-slate-500">Potential annual savings</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="size-5 text-primary" /> Spend Efficiency</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-semibold text-slate-900">+12%</div><p className="mt-2 text-sm text-slate-500">Improved since Q1</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Workflow className="size-5 text-primary" /> Supplier Coverage</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-semibold text-slate-900">94%</div><p className="mt-2 text-sm text-slate-500">Critical suppliers mapped</p></CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader><CardTitle>AI Recommendations</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {opportunities.map((item) => (
                  <div key={item.title} className="rounded-xl border border-slate-200 p-3">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-slate-900">{item.title}</p>
                      <Badge variant="success">{item.savings}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Vendor Comparison</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {['Northwind Labs', 'Acme Cloud', 'BluePeak Logistics'].map((vendor) => (
                  <div key={vendor} className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2">
                    <span className="font-medium text-slate-700">{vendor}</span>
                    <Badge variant="secondary">Stable</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </AppShell>
    </AuthGuard>
  )
}
