"use client"

import { useState } from 'react'
import { FileDown, FileSpreadsheet, FileText } from 'lucide-react'

import { AppShell } from '@/components/layout/app-shell'
import { AuthGuard } from '@/components/app/auth-guard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const reports = [
  { title: 'Vendor Summary', description: 'Key vendor profiles, renewal dates, and risk levels.' },
  { title: 'Compliance Report', description: 'Policy adherence and regulatory requirements by supplier.' },
  { title: 'Contract Analysis', description: 'Clause-level risk findings and obligations.' },
  { title: 'Procurement Report', description: 'Spend optimization opportunities and category insights.' },
]

export default function ReportsPage() {
  const [message, setMessage] = useState('')

  const handleExport = (type: 'PDF' | 'Excel', title: string) => {
    setMessage(`${title} exported as ${type} report.`)
  }

  return (
    <AuthGuard>
      <AppShell>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">AI Reports</h2>
            <p className="text-sm text-slate-500">Generate export-ready procurement and compliance summaries.</p>
          </div>

          {message ? <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">{message}</div> : null}

          <div className="grid gap-4 md:grid-cols-2">
            {reports.map((report) => (
              <Card key={report.title} className="transition-all hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="size-5 text-primary" /> {report.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-600">{report.description}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleExport('PDF', report.title)}>
                      <FileDown className="mr-2 size-4" /> PDF
                    </Button>
                    <Button onClick={() => handleExport('Excel', report.title)}>
                      <FileSpreadsheet className="mr-2 size-4" /> Excel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AppShell>
    </AuthGuard>
  )
}
