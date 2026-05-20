import { cn } from '@/lib/utils'

export function AnimatedGradientText({ children, className }) {
  return (
    <span
      className={cn(
        'animate-gradient bg-gradient-to-r from-blue-300 via-blue-100 to-blue-400 bg-[length:300%_100%] bg-clip-text text-transparent',
        className
      )}
    >
      {children}
    </span>
  )
}
