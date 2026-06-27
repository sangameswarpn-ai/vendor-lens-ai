"use client"

import { useRouter } from 'next/navigation'
import {
  AlertTriangle,
  FileSignature,
  ShieldCheck,
  Users,
} from 'lucide-react'

import { AppShell } from '@/components/layout/app-shell'
import { AuthGuard } from '@/components/app/auth-guard'
import { MetricCard } from '@/components/app/metric-card'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const activity = [
  { title: 'New contract reviewed', detail: 'Acme Cloud • 6 mins ago', risk: 'High' },
  { title: 'Vendor risk updated', detail: 'Northwind Labs • 26 mins ago', risk: 'Medium' },
  { title: 'Report exported', detail: 'Procurement summary • 1 hr ago', risk: 'Low' },
]

const contracts = [
  { vendor: 'Northwind Labs', status: 'Active', expiry: '2026-09-15', risk: '82' },
  { vendor: 'Acme Cloud', status: 'Pending', expiry: '2026-11-02', risk: '67' },
  { vendor: 'BluePeak Logistics', status: 'Expiring', expiry: '2026-07-22', risk: '74' },
]

export default function DashboardPage() {
  const router = useRouter()

  return (
    <AuthGuard>
      <AppShell>
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard title="Total Vendors" value="128" detail="14 new this month" icon={<Users className="size-4" />} />
            <MetricCard title="High Risk Vendors" value="18" detail="3 escalated today" icon={<AlertTriangle className="size-4" />} />
            <MetricCard title="Active Contracts" value="94" detail="81% renewed" icon={<FileSignature className="size-4" />} />
            <MetricCard title="AI Risk Score" value="73/100" detail="Improved +8%" icon={<ShieldCheck className="size-4" />} />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle>Risk Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex h-48 items-end gap-3">
                  {[42, 58, 51, 70, 64, 81].map((height, index) => (
                    <div key={index} className="flex-1 rounded-t-xl bg-gradient-to-t from-primary to-violet-300" style={{ height: `${height}%` }} />
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activity.map((item) => (
                  <div key={item.title} className="rounded-xl border border-slate-200 p-3">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-slate-900">{item.title}</p>
                      <Badge variant="warning">{item.risk}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Vendor Contracts</CardTitle>
              <button type="button" className="text-sm font-medium text-primary" onClick={() => router.push('/vendors')}>View all</button>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 text-left text-slate-600">
                    <tr>
                      <th className="px-4 py-3 font-medium">Vendor</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Contract Expiry</th>
                      <th className="px-4 py-3 font-medium">Risk Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contracts.map((contract) => (
                      <tr key={contract.vendor} className="border-t border-slate-200">
                        <td className="px-4 py-3 font-medium text-slate-900">{contract.vendor}</td>
                        <td className="px-4 py-3"><Badge variant={contract.status === 'Active' ? 'success' : contract.status === 'Expiring' ? 'warning' : 'secondary'}>{contract.status}</Badge></td>
                        <td className="px-4 py-3">{contract.expiry}</td>
                        <td className="px-4 py-3">{contract.risk}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppShell>
    </AuthGuard>
  )
}
