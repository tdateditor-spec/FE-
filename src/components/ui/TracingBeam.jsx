import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

export function TracingBeam({ children, className }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 15%', 'end 85%'],
  })

  const contentRef = useRef(null)
  const [svgHeight, setSvgHeight] = useState(0)

  useEffect(() => {
    const update = () => {
      if (contentRef.current) setSvgHeight(contentRef.current.offsetHeight)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight * 0.9]),
    { stiffness: 500, damping: 90 }
  )
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight]),
    { stiffness: 500, damping: 90 }
  )

  return (
    <motion.div ref={ref} className={cn('relative', className)}>
      {/* Beam rail — hidden on mobile */}
      <div className="absolute top-0 -left-6 md:-left-10 hidden md:block">
        <svg
          width="20"
          height={svgHeight}
          viewBox={`0 0 20 ${svgHeight}`}
          fill="none"
          aria-hidden="true"
        >
          {/* Static rail */}
          <path
            d={`M 10 0 L 10 ${svgHeight}`}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1.5"
          />
          {/* Glowing trace */}
          <path
            d={`M 10 0 L 10 ${svgHeight}`}
            stroke="url(#tracing-grad)"
            strokeWidth="1.5"
          />
          {/* Dot at head */}
          <motion.circle cx="10" cy={y1} r="4" fill="#3b82f6" />
          <motion.circle cx="10" cy={y1} r="2" fill="white" />
          <defs>
            <motion.linearGradient
              id="tracing-grad"
              gradientUnits="userSpaceOnUse"
              x1="0" x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="0.1" stopColor="#3b82f6" />
              <stop offset="0.5" stopColor="#8b5cf6" />
              <stop offset="1" stopColor="#a855f7" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>

      <div ref={contentRef}>{children}</div>
    </motion.div>
  )
}
