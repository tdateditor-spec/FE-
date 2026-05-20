import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return width
}

function AvatarCard({ name, photo, size = 300 }) {
  const h = Math.round(size * 1.18)
  return (
    <div
      className="relative overflow-hidden"
      style={{ width: size, height: h, borderRadius: 20 }}
    >
      {/* Photo */}
      <img
        src={photo}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover object-top"
        draggable={false}
      />

      {/* Bottom gradient for name readability */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Name always visible on image */}
      <div className="absolute bottom-0 left-0 right-0 px-5 py-4">
        <p className="font-heading text-sm font-bold text-white leading-tight">{name}</p>
      </div>
    </div>
  )
}

export function AnimatedTestimonials({ testimonials, autoplay = true, autoplayDelay = 5000 }) {
  const [active, setActive]       = useState(0)
  const [direction, setDirection] = useState(1)
  const windowWidth = useWindowWidth()

  const goTo = useCallback((idx) => {
    const n = (idx + testimonials.length) % testimonials.length
    setDirection(n > active ? 1 : -1)
    setActive(n)
  }, [active, testimonials.length])

  const goNext = useCallback(() => goTo(active + 1), [goTo, active])
  const goPrev = useCallback(() => goTo(active - 1), [goTo, active])

  useEffect(() => {
    if (!autoplay) return
    const id = setInterval(goNext, autoplayDelay)
    return () => clearInterval(id)
  }, [autoplay, autoplayDelay, goNext])

  const t = testimonials[active]
  // Responsive avatar size: smaller on mobile to prevent overflow
  const SIZE = windowWidth >= 1024 ? 300 : Math.min(240, windowWidth - 96)
  const isMobile = windowWidth < 1024

  // Static ghost card positions (behind active)
  const ghosts = [
    { dx: 18, dy: -16, rotate:  4, scale: 0.93, opacity: 0.45 },
    { dx: -14, dy: -30, rotate: -5, scale: 0.85, opacity: 0.22 },
  ]

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

        {/* ── Avatar stack (left) ── */}
        <div
          className="relative flex-shrink-0"
          style={{ width: isMobile ? SIZE : SIZE + 36, height: Math.round(SIZE * 1.18) + (isMobile ? 0 : 32) }}
        >
          {/* Static ghost cards — desktop only */}
          {!isMobile && ghosts.map((g, i) => {
            const idx = (active + i + 1) % testimonials.length
            return (
              <div
                key={`ghost-${i}`}
                className="absolute pointer-events-none"
                style={{
                  left: g.dx,
                  top:  g.dy,
                  transform: `rotate(${g.rotate}deg) scale(${g.scale})`,
                  opacity:   g.opacity,
                  zIndex:    i + 1,
                  transformOrigin: 'bottom center',
                }}
              >
                <AvatarCard {...testimonials[idx]} size={SIZE} />
              </div>
            )
          })}

          {/* Active card — simple fade + slight lift */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              exit={{    opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.38, ease: 'easeInOut' }}
              className="absolute"
              style={{ left: 0, top: isMobile ? 0 : 16, zIndex: 10 }}
            >
              <AvatarCard {...t} size={SIZE} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Text (right) ── */}
        <div className="flex min-w-0 flex-1 flex-col">

          {/* Name + tag — static, no animation, no layout shift */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`meta-${active}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{    opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="font-heading mb-1 text-xl font-bold text-white md:text-2xl">
                {t.name}
              </h3>
              <p className="mb-5 text-sm text-slate-400">{t.tag}</p>
            </motion.div>
          </AnimatePresence>

          {/* Variable-length body — fixed height + overflow hidden */}
          <div className="relative overflow-hidden" style={{ height: isMobile ? 260 : 310 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`body-${active}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0  }}
                exit={{    opacity: 0, y: -8  }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute inset-0 w-full"
              >
                {t.back && (
                  <p className="mb-3 text-sm leading-relaxed text-slate-400">{t.back}</p>
                )}
                {t.fear && (
                  <p className="mb-4 text-sm italic text-slate-300">
                    Nỗi sợ: <span className="font-medium text-white">{t.fear}</span>
                  </p>
                )}
                <p className="text-base leading-relaxed text-slate-200 md:text-lg">
                  "{t.quote}"
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Result badge — always visible below body */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`result-${active}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{    opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="mt-4"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-xs font-bold text-emerald-300">Sau 3 tháng: {t.result}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <div className="mt-7 flex gap-3">
            <button
              onClick={goPrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-white/[0.04] text-slate-400 transition-colors hover:border-slate-500 hover:text-white"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={goNext}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-white/[0.04] text-slate-400 transition-colors hover:border-slate-500 hover:text-white"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
