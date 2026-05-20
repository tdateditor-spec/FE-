import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export function NumberTicker({ value, suffix = '', className }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const target = parseFloat(value)
          const duration = 1500
          const start = performance.now()
          const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setDisplay(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
            else setDisplay(target)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {display}{suffix}
    </span>
  )
}
