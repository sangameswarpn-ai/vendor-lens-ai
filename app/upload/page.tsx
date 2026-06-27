"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileUp, Sparkles, UploadCloud } from 'lucide-react'

import { AppShell } from '@/components/layout/app-shell'
import { AuthGuard } from '@/components/app/auth-guard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export default function UploadPage() {
  const router = useRouter()
  const [fileName, setFileName] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    return () => {
      setProgress(0)
    }
  }, [])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFileName(selectedFile.name)
      setProgress(20)
    }
  }

  const handleAnalyze = () => {
    if (!fileName) {
      setProgress(0)
      return
    }

    setIsAnalyzing(true)
    setProgress(10)

    const interval = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          window.clearInterval(interval)
          setIsAnalyzing(false)
          router.push('/risk-analysis')
          return 100
        }
        return current + 12
      })
    }, 220)
  }

  return (
    <AuthGuard>
      <AppShell>
        <div className="mx-auto max-w-3xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UploadCloud className="size-5 text-primary" /> Upload Contract for AI Review
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center transition hover:border-primary hover:bg-violet-50">
                <FileUp className="size-10 text-primary" />
                <span className="mt-3 text-sm font-medium text-slate-700">Drop your PDF or DOCX contract here</span>
                <span className="mt-1 text-sm text-slate-500">or click to browse files</span>
                <input type="file" accept=".pdf,.docx" className="hidden" onChange={handleFileChange} />
              </label>

              {fileName ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                  Uploaded file: <span className="font-semibold">{fileName}</span>
                </div>
              ) : null}

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Upload progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>

              <Button onClick={handleAnalyze} className="w-full" disabled={isAnalyzing}>
                <Sparkles className="mr-2 size-4" />
                {isAnalyzing ? 'Analyzing contract…' : 'Analyze Contract'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </AppShell>
    </AuthGuard>
  )
}
