"use client"

import { useMemo, useState } from 'react'
import { Plus, Search, Trash2, PencilLine } from 'lucide-react'

import { AppShell } from '@/components/layout/app-shell'
import { AuthGuard } from '@/components/app/auth-guard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

type Vendor = {
  id: number
  name: string
  status: 'Active' | 'Review' | 'Risk'
  risk: number
  expiry: string
}

const initialVendors: Vendor[] = [
  { id: 1, name: 'Northwind Labs', status: 'Active', risk: 78, expiry: '2026-09-15' },
  { id: 2, name: 'Acme Cloud', status: 'Review', risk: 65, expiry: '2026-11-02' },
  { id: 3, name: 'BluePeak Logistics', status: 'Risk', risk: 88, expiry: '2026-07-22' },
]

export default function VendorsPage() {
  const [vendors, setVendors] = useState(initialVendors)
  const [search, setSearch] = useState('')
  const [newVendor, setNewVendor] = useState({ name: '', status: 'Review' as Vendor['status'], risk: 70, expiry: '' })
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => vendor.name.toLowerCase().includes(search.toLowerCase()))
  }, [search, vendors])

  const handleAddVendor = () => {
    if (!newVendor.name.trim()) return

    if (editingId !== null) {
      setVendors((current) => current.map((vendor) => vendor.id === editingId ? { ...vendor, ...newVendor, name: newVendor.name.trim() } : vendor))
      setEditingId(null)
    } else {
      setVendors((current) => [
        ...current,
        { id: Date.now(), ...newVendor, name: newVendor.name.trim() },
      ])
    }

    setNewVendor({ name: '', status: 'Review', risk: 70, expiry: '' })
    setShowForm(false)
  }

  const handleEdit = (vendor: Vendor) => {
    setEditingId(vendor.id)
    setNewVendor({ name: vendor.name, status: vendor.status, risk: vendor.risk, expiry: vendor.expiry })
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    setVendors((current) => current.filter((vendor) => vendor.id !== id))
  }

  return (
    <AuthGuard>
      <AppShell>
        <div className="space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Vendor Management</h2>
              <p className="text-sm text-slate-500">Monitor supplier health and renewals in one place.</p>
            </div>
            <Button onClick={() => setShowForm((value) => !value)}>
              <Plus className="mr-2 size-4" /> Add Vendor
            </Button>
          </div>

          {showForm ? (
            <Card>
              <CardHeader>
                <CardTitle>{editingId !== null ? 'Edit Vendor' : 'Add a New Vendor'}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-4">
                <Input placeholder="Vendor name" value={newVendor.name} onChange={(event) => setNewVendor((current) => ({ ...current, name: event.target.value }))} />
                <Input placeholder="Expiry date" value={newVendor.expiry} onChange={(event) => setNewVendor((current) => ({ ...current, expiry: event.target.value }))} />
                <select className="flex h-10 rounded-lg border border-input bg-background px-3 text-sm" value={newVendor.status} onChange={(event) => setNewVendor((current) => ({ ...current, status: event.target.value as Vendor['status'] }))}>
                  <option value="Active">Active</option>
                  <option value="Review">Review</option>
                  <option value="Risk">Risk</option>
                </select>
                <Button onClick={handleAddVendor}>{editingId !== null ? 'Update Vendor' : 'Save Vendor'}</Button>
              </CardContent>
            </Card>
          ) : null}

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Vendor Directory</CardTitle>
              <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
                <Search className="size-4" />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search vendors" className="w-32 bg-transparent outline-none" />
              </label>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 text-left text-slate-600">
                    <tr>
                      <th className="px-4 py-3 font-medium">Vendor</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Risk Score</th>
                      <th className="px-4 py-3 font-medium">Contract Expiry</th>
                      <th className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVendors.map((vendor) => (
                      <tr key={vendor.id} className="border-t border-slate-200">
                        <td className="px-4 py-3 font-medium text-slate-900">{vendor.name}</td>
                        <td className="px-4 py-3"><Badge variant={vendor.status === 'Risk' ? 'destructive' : vendor.status === 'Review' ? 'warning' : 'success'}>{vendor.status}</Badge></td>
                        <td className="px-4 py-3">{vendor.risk}</td>
                        <td className="px-4 py-3">{vendor.expiry}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(vendor)}><PencilLine className="mr-1 size-3" /> Edit</Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDelete(vendor.id)}><Trash2 className="mr-1 size-3" /> Delete</Button>
                          </div>
                        </td>
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
