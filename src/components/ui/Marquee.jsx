import { cn } from '@/lib/utils'

export function Marquee({ children, className, reverse = false, pauseOnHover = true }) {
  return (
    <div
      className={cn('group flex overflow-hidden [--duration:30s] [--gap:1rem]', className)}
    >
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          className={cn(
            'flex min-w-full shrink-0 items-center justify-around gap-[--gap]',
            'animate-scroll',
            reverse ? '[animation-direction:reverse]' : '',
            pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''
          )}
          style={{ animationDuration: 'var(--duration)' }}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
