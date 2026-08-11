import { ArrowUpRight } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MetricCard({
  title,
  value,
  detail,
  icon,
}: {
  title: string
  value: string
  detail: string
  icon: React.ReactNode
}) {
  return (
    <Card className="group transition-all hover:-translate-y-1 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="rounded-xl bg-primary/10 p-2 text-primary">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold text-foreground">{value}</div>
        <p className="mt-2 flex items-center text-sm text-muted-foreground">
          {detail} <ArrowUpRight className="ml-1 size-4" />
        </p>
      </CardContent>
    </Card>
  )
}
