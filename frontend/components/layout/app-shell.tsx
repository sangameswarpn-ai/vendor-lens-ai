"use client"

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  BarChart3,
  Bell,
  FileText,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  ShieldAlert,
  Upload,
  Users,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { clearAuthentication } from '@/lib/auth'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/upload', label: 'Upload Contract', icon: Upload },
  { href: '/vendors', label: 'Vendors', icon: Users },
  { href: '/risk-analysis', label: 'Risk Analysis', icon: ShieldAlert },
  { href: '/reports', label: 'AI Reports', icon: FileText },
  { href: '/insights', label: 'Procurement Insights', icon: BarChart3 },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    clearAuthentication()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="w-full border-b bg-white/90 p-4 backdrop-blur lg:w-72 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div className="rounded-xl bg-primary p-2 text-primary-foreground">
              <ShieldAlert className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">VendorLens AI</p>
              <p className="text-xs text-slate-500">Procurement Intelligence</p>
            </div>
          </div>

          <nav className="mt-6 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all hover:bg-slate-100',
                    active ? 'bg-primary text-primary-foreground shadow-sm' : 'text-slate-700',
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              )
            })}
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-rose-50 hover:text-rose-600"
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </nav>
        </aside>

        <div className="flex-1">
          <header className="border-b bg-white/90 px-4 py-4 backdrop-blur sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-primary">AI-powered procurement workspace</p>
                <h1 className="text-2xl font-semibold text-slate-950">VendorLens Control Center</h1>
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
                  <Search className="size-4" />
                  <input placeholder="Search vendors" className="w-32 bg-transparent outline-none" />
                </label>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Notifications"
                  onClick={() => window.alert('You have 3 pending procurement actions.')} 
                >
                  <Bell className="size-4" />
                </Button>
              </div>
            </div>
          </header>

          <main className="p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
