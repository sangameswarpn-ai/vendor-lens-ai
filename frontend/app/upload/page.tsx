"use client"

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileUp, Sparkles, UploadCloud } from 'lucide-react'
import api from '@/lib/api'

import { AppShell } from '@/components/layout/app-shell'
import { AuthGuard } from '@/components/app/auth-guard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

type Vendor = {
  id: number
  name: string
  category?: string | null
  contactEmail?: string | null
}

export default function UploadPage() {
  const router = useRouter()
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [selectedVendorId, setSelectedVendorId] = useState<number | null>(null)
  const [fileName, setFileName] = useState('')
  const [documentId, setDocumentId] = useState<number | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)

  const fetchVendors = useCallback(async () => {
    try {
      const resp = await api.get('/vendors')
      const vendorList = resp.data?.data || []
      setVendors(vendorList)
      setSelectedVendorId((prev) => prev ?? (vendorList.length > 0 ? vendorList[0].id : null))
    } catch (err) {
      console.error(err)
      window.alert('Unable to load vendors. Please try again later.')
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchVendors()
  }, [fetchVendors])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFileName(selectedFile.name)
      setProgress(0)
      uploadFile(selectedFile)
    }
  }

  const uploadFile = async (file: File) => {
    if (!selectedVendorId) {
      window.alert('Please select a vendor before uploading a document.')
      return
    }

    try {
      const form = new FormData()
      form.append('file', file)
      form.append('vendorId', String(selectedVendorId))

      const resp = await api.post('/uploads', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))
          setProgress(percent)
        },
      })

      if (resp.data && resp.data.success) {
        setFileName(resp.data.data.originalName || resp.data.data.filename)
        setDocumentId(resp.data.data.id)
        triggerAnalysis(resp.data.data.id)
      } else {
        window.alert(resp.data?.message || 'Upload failed')
        setProgress(0)
      }
    } catch (err) {
      console.error(err)
      const error = err as { response?: { data?: { message?: string } } }
      window.alert(error.response?.data?.message || 'Upload error')
      setProgress(0)
    }
  }

  const triggerAnalysis = async (documentId: number) => {
    try {
      setIsAnalyzing(true)
      setProgress(60)
      const resp = await api.post('/ai/analyze', {
        documentId,
        vendorId: selectedVendorId,
      })
      if (resp.data && resp.data.success) {
        setProgress(100)
        setTimeout(() => router.push('/risk-analysis'), 500)
      } else {
        window.alert(resp.data?.message || 'Analysis failed')
        setIsAnalyzing(false)
        setProgress(0)
      }
    } catch (err) {
      console.error(err)
      const error = err as { response?: { data?: { message?: string } } }
      window.alert(error.response?.data?.message || 'Analysis error')
      setIsAnalyzing(false)
      setProgress(0)
    }
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
              <div className="grid gap-4 md:grid-cols-[1fr_1.4fr]">
                <div>
                  <label className="block text-sm font-medium text-foreground/80">Select vendor</label>
                  <select
                    value={selectedVendorId ?? ''}
                    onChange={(event) => setSelectedVendorId(Number(event.target.value))}
                    className="mt-2 w-full rounded-xl border border-border bg-card px-3 py-3 text-sm"
                  >
                    <option value="">Choose a vendor</option>
                    {vendors.map((vendor) => (
                      <option key={vendor.id} value={vendor.id}>
                        {vendor.name} {vendor.category ? `· ${vendor.category}` : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80">Document</label>
                  <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted p-10 text-center transition hover:border-primary hover:bg-violet-50">
                    <FileUp className="size-10 text-primary" />
                    <span className="mt-3 text-sm font-medium text-foreground/80">Drop your PDF or DOCX contract here</span>
                    <span className="mt-1 text-sm text-muted-foreground">or click to browse files</span>
                    <input type="file" accept=".pdf,.docx" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>
              </div>

              {fileName ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                  Uploaded file: <span className="font-semibold">{fileName}</span>
                </div>
              ) : null}

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Upload progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>

              <Button disabled={!documentId || isAnalyzing} className="w-full" onClick={() => documentId && triggerAnalysis(documentId)}>
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
