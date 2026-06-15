import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  getValueLabel?: (value: number) => string
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, getValueLabel, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('relative h-4 w-full overflow-hidden rounded-full bg-muted', className)}
        {...props}
      >
        <div
          className="h-full w-full flex-1 bg-primary transition-all duration-300"
          style={{ width: `${Math.min(Math.max(value || 0, 0), max)}%` }}
        />
      </div>
    )
  }
)
Progress.displayName = 'Progress'

export { Progress }
