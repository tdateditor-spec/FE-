import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

export function TextReveal({ text, className, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const words = text.split(' ')

  return (
    <span ref={ref} className={cn('inline', className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
