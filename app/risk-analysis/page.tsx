"use client"

import { DownloadCloud, Sparkles } from 'lucide-react'

import { AppShell } from '@/components/layout/app-shell'
import { AuthGuard } from '@/components/app/auth-guard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

const recommendationItems = [
  'Renegotiate SLA terms for Acme Cloud to reduce indemnity exposure.',
  'Refresh cyber controls for BluePeak Logistics before renewal.',
  'Add ESG clauses to Northwind Labs supplier agreements.',
]

const gaugeScore = 73

export default function RiskAnalysisPage() {
  return (
    <AuthGuard>
      <AppShell>
        <div className="space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Risk Analysis</h2>
              <p className="text-sm text-slate-500">AI-generated vendor risk insights and recommendations.</p>
            </div>
            <Button>
              <DownloadCloud className="mr-2 size-4" /> Download Report
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Card>
              <CardHeader><CardTitle>Overall Risk Score</CardTitle></CardHeader>
              <CardContent><div className="text-4xl font-semibold text-slate-900">73/100</div><p className="mt-2 text-sm text-slate-500">Moderate exposure</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Compliance Score</CardTitle></CardHeader>
              <CardContent><div className="text-4xl font-semibold text-slate-900">81/100</div><p className="mt-2 text-sm text-slate-500">Strong baseline</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Financial Risk</CardTitle></CardHeader>
              <CardContent><div className="text-4xl font-semibold text-slate-900">66</div><p className="mt-2 text-sm text-slate-500">Margin pressure</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Legal Risk</CardTitle></CardHeader>
              <CardContent><div className="text-4xl font-semibold text-slate-900">58</div><p className="mt-2 text-sm text-slate-500">Contract clauses</p></CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader><CardTitle>Risk Gauge</CardTitle></CardHeader>
              <CardContent className="flex flex-col items-center justify-center gap-4">
                <div className="flex size-40 items-center justify-center rounded-full border-[12px] border-primary/20" style={{ background: `conic-gradient(#6d28d9 ${gaugeScore * 3.6}deg, #e2e8f0 0deg)` }}>
                  <div className="flex size-24 items-center justify-center rounded-full bg-white text-3xl font-semibold text-slate-900">{gaugeScore}</div>
                </div>
                <p className="text-center text-sm text-slate-500">The contract risk profile is elevated due to cyber exposure and payment terms.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>AI Recommendations</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {recommendationItems.map((item) => (
                  <div key={item} className="flex items-start gap-2 rounded-xl border border-slate-200 p-3">
                    <Sparkles className="mt-0.5 size-4 text-primary" />
                    <p className="text-sm text-slate-600">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Risk Breakdown</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {[
                  ['Cyber Risk', 76],
                  ['ESG Risk', 61],
                  ['Financial Risk', 66],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-700">{label}</span>
                      <span className="text-slate-500">{value}/100</span>
                    </div>
                    <Progress value={Number(value)} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Flags</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Badge variant="warning">Delayed payments</Badge>
                <Badge variant="destructive">Unclear indemnity scope</Badge>
                <Badge variant="secondary">Missing ESG clause</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </AppShell>
    </AuthGuard>
  )
}
