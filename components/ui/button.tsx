import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, children, ...props }, ref) => {
    const Comp = 'button'
    
    const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-[2px] text-sm font-semibold tracking-[0.04em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50'
    
    const variantClasses = {
      default: 'bg-primary text-primary-foreground hover:bg-[hsl(var(--gold-light))]',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input bg-background/30 text-foreground hover:border-primary hover:bg-primary/10 hover:text-primary',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-[hsl(var(--bordeaux-dark))]',
      ghost: 'text-muted-foreground hover:bg-primary/10 hover:text-primary',
      link: 'text-primary underline-offset-4 hover:underline',
    }

    const sizeClasses = {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10',
    }

    const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className)

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>

      return React.cloneElement(child, {
        className: cn(classes, child.props.className),
        ...props,
      } as React.HTMLAttributes<HTMLElement>)
    }

    return (
      <Comp
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button }
