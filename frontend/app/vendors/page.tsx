"use client"

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Plus, Search, Trash2, PencilLine } from 'lucide-react'
import api from '@/lib/api'

import { AppShell } from '@/components/layout/app-shell'
import { AuthGuard } from '@/components/app/auth-guard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

type Vendor = {
  id: number
  name: string
  category?: string | null
  contactEmail?: string | null
  phone?: string | null
  address?: string | null
  rating?: number
  notes?: string | null
}

type VendorForm = {
  name: string
  category: string
  contactEmail: string
  phone: string
  address: string
  rating: number
  notes: string
}

const initialVendorForm: VendorForm = {
  name: '',
  category: '',
  contactEmail: '',
  phone: '',
  address: '',
  rating: 0,
  notes: '',
}

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [search, setSearch] = useState('')
  const [vendorForm, setVendorForm] = useState<VendorForm>(initialVendorForm)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  const fetchVendors = useCallback(async () => {
    try {
      const resp = await api.get('/vendors')
      setVendors(resp.data?.data || [])
    } catch (err) {
      console.error(err)
      window.alert('Unable to load vendors. Please refresh and try again.')
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchVendors()
  }, [fetchVendors])

  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => vendor.name.toLowerCase().includes(search.toLowerCase()))
  }, [search, vendors])

  const handleSaveVendor = async () => {
    if (!vendorForm.name.trim()) {
      window.alert('Vendor name is required.')
      return
    }

    try {
      const payload = {
        name: vendorForm.name.trim(),
        category: vendorForm.category || null,
        contactEmail: vendorForm.contactEmail || null,
        phone: vendorForm.phone || null,
        address: vendorForm.address || null,
        rating: vendorForm.rating,
        notes: vendorForm.notes || null,
      }

      let resp
      if (editingId !== null) {
        resp = await api.put(`/vendors/${editingId}`, payload)
      } else {
        resp = await api.post('/vendors', payload)
      }

      if (resp.data?.success) {
        await fetchVendors()
        setVendorForm(initialVendorForm)
        setShowForm(false)
        setEditingId(null)
      } else {
        window.alert(resp.data?.message || 'Unable to save vendor')
      }
    } catch (err) {
      console.error(err)
      window.alert('Error saving vendor. Please try again.')
    }
  }

  const handleEdit = (vendor: Vendor) => {
    setEditingId(vendor.id)
    setVendorForm({
      name: vendor.name || '',
      category: vendor.category || '',
      contactEmail: vendor.contactEmail || '',
      phone: vendor.phone || '',
      address: vendor.address || '',
      rating: vendor.rating ?? 0,
      notes: vendor.notes || '',
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this vendor?')) return

    try {
      const resp = await api.delete(`/vendors/${id}`)
      if (resp.data?.success) {
        setVendors((current) => current.filter((vendor) => vendor.id !== id))
      } else {
        window.alert(resp.data?.message || 'Unable to delete vendor')
      }
    } catch (err) {
      console.error(err)
      window.alert('Error deleting vendor. Please try again.')
    }
  }

  return (
    <AuthGuard>
      <AppShell>
        <div className="space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Vendor Management</h2>
              <p className="text-sm text-muted-foreground">Add, update, and delete vendors connected to your contract uploads.</p>
            </div>
            <Button onClick={() => setShowForm((value) => !value)}>
              <Plus className="mr-2 size-4" /> {showForm ? 'Hide Form' : 'Add Vendor'}
            </Button>
          </div>

          {showForm ? (
            <Card>
              <CardHeader>
                <CardTitle>{editingId !== null ? 'Edit Vendor' : 'Add a Vendor'}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <Input
                  placeholder="Vendor name"
                  value={vendorForm.name}
                  onChange={(event) => setVendorForm((current) => ({ ...current, name: event.target.value }))}
                />
                <Input
                  placeholder="Category"
                  value={vendorForm.category}
                  onChange={(event) => setVendorForm((current) => ({ ...current, category: event.target.value }))}
                />
                <Input
                  placeholder="Contact email"
                  value={vendorForm.contactEmail}
                  onChange={(event) => setVendorForm((current) => ({ ...current, contactEmail: event.target.value }))}
                />
                <Input
                  placeholder="Phone"
                  value={vendorForm.phone}
                  onChange={(event) => setVendorForm((current) => ({ ...current, phone: event.target.value }))}
                />
                <Input
                  placeholder="Address"
                  value={vendorForm.address}
                  onChange={(event) => setVendorForm((current) => ({ ...current, address: event.target.value }))}
                />
                <Input
                  type="number"
                  placeholder="Rating"
                  value={vendorForm.rating}
                  onChange={(event) => setVendorForm((current) => ({ ...current, rating: Number(event.target.value) }))}
                />
                <Input
                  placeholder="Notes"
                  value={vendorForm.notes}
                  onChange={(event) => setVendorForm((current) => ({ ...current, notes: event.target.value }))}
                />
                <Button onClick={handleSaveVendor}>{editingId !== null ? 'Update Vendor' : 'Save Vendor'}</Button>
              </CardContent>
            </Card>
          ) : null}

          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <CardTitle>Vendor Directory</CardTitle>
              <label className="flex items-center gap-2 rounded-xl border border-border bg-muted px-3 py-2 text-sm text-muted-foreground">
                <Search className="size-4" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search vendors"
                  className="w-48 bg-transparent outline-none"
                />
              </label>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="min-w-full text-sm">
                  <thead className="bg-muted text-left text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">Vendor</th>
                      <th className="px-4 py-3 font-medium">Email</th>
                      <th className="px-4 py-3 font-medium">Phone</th>
                      <th className="px-4 py-3 font-medium">Category</th>
                      <th className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVendors.map((vendor) => (
                      <tr key={vendor.id} className="border-t border-border">
                        <td className="px-4 py-3 font-medium text-foreground">{vendor.name}</td>
                        <td className="px-4 py-3">{vendor.contactEmail || '—'}</td>
                        <td className="px-4 py-3">{vendor.phone || '—'}</td>
                        <td className="px-4 py-3">{vendor.category || '—'}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(vendor)}>
                              <PencilLine className="mr-1 size-3" /> Edit
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDelete(vendor.id)}>
                              <Trash2 className="mr-1 size-3" /> Delete
                            </Button>
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
