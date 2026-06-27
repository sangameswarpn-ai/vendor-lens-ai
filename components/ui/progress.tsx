import * as React from 'react'

import { cn } from '@/lib/utils'

function Progress({ className, value, ...props }: React.ComponentProps<'div'> & { value?: number }) {
  return (
    <div data-slot="progress" className={cn('h-2 w-full overflow-hidden rounded-full bg-muted', className)} {...props}>
      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${value ?? 0}%` }} />
    </div>
  )
}

export { Progress }
