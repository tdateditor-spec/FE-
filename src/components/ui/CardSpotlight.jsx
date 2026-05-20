import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function CardSpotlight({ children, className, spotlightColor = 'rgba(59,130,246,0.15)' }) {
  const divRef = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e) => {
    const rect = divRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setPos({ x, y })
    const cx = rect.width / 2
    const cy = rect.height / 2
    setRotateX(((y - cy) / cy) * -6)
    setRotateY(((x - cx) / cx) * 6)
  }

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => { setOpacity(0); setRotateX(0); setRotateY(0) }}
      animate={{ rotateX, rotateY }}
      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
      style={{ transformStyle: 'preserve-3d', perspective: 800 }}
      className={cn(
        'relative rounded-2xl border border-white/[0.08] bg-white/[0.03] overflow-hidden transition-shadow duration-300',
        'hover:border-blue-500/30 hover:shadow-[0_8px_40px_rgba(59,130,246,0.12)]',
        className
      )}
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-2xl"
        style={{
          opacity,
          background: `radial-gradient(350px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />
      {/* Shine edge */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(100px circle at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.04), transparent 60%)`,
          opacity: opacity * 0.6,
        }}
      />
      {children}
    </motion.div>
  )
}
