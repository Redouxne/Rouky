'use client'

import * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, disabled, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(checked || false)

    React.useEffect(() => {
      setIsChecked(checked || false)
    }, [checked])

    const handleClick = () => {
      if (disabled) return
      const newChecked = !isChecked
      setIsChecked(newChecked)
      onCheckedChange?.(newChecked)
    }

    return (
      <button
        ref={ref as React.RefObject<HTMLButtonElement>}
        type="button"
        role="checkbox"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          'peer h-4 w-4 shrink-0 rounded-sm border border-border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          isChecked && 'bg-primary text-primary-foreground',
          className
        )}
        {...props}
      >
        {isChecked && <Check className="h-4 w-4" />}
      </button>
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
