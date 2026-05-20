import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export function MagicCard({ children, className, gradientColor = 'rgba(59,130,246,0.15)' }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        'relative rounded-3xl overflow-hidden transition-all duration-300',
        'bg-white/[0.03] border border-white/[0.07]',
        'hover:border-blue-500/30 hover:shadow-[0_10px_40px_rgba(59,130,246,0.1)]',
        className
      )}
    >
      {hover && (
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-60 transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, ${gradientColor}, transparent 70%)`,
          }}
        />
      )}
      {children}
    </div>
  )
}
