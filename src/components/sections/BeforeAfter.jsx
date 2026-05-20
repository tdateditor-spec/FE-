import { motion } from 'framer-motion'

export function BeforeAfter() {
  return (
    <section className="relative overflow-hidden py-16 px-4">
      {/* Dark maroon-ish background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(80,10,10,0.35),transparent)]" />

      <div className="relative mx-auto max-w-4xl">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
        </motion.div>

        {/* Polaroids row */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12">

          {/* BEFORE */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: -4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-shrink-0"
            style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.7))' }}
          >
            <div className="w-[140px] sm:w-[190px] md:w-[220px] rounded-sm bg-white p-2.5 pb-8 sm:p-3 sm:pb-10">
              <div className="relative overflow-hidden" style={{ filter: 'grayscale(100%) contrast(1.05)' }}>
                <img
                  src="/z7837516370081_c74fa3f723643cac8eb8816b2799c68d.jpg"
                  alt="Before"
                  className="w-full aspect-[3/4] object-cover object-top"
                />
              </div>
              <p className="mt-2 text-center font-bold text-[10px] sm:text-xs text-slate-700 tracking-wider uppercase">Before</p>
              <p className="text-center text-[9px] sm:text-[10px] text-slate-500">Thu nhập: 0đ</p>
            </div>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex-shrink-0 flex flex-col items-center gap-2"
          >
            <svg
              viewBox="0 0 80 60"
              className="w-12 sm:w-16 md:w-20 text-white"
              fill="none"
            >
              <path
                d="M4 50 Q20 10 60 20"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M52 14 L64 22 L54 28"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <span className="text-[10px] sm:text-xs text-slate-500 font-medium">90 ngày</span>
          </motion.div>

          {/* AFTER */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotate: 4 }}
            whileInView={{ opacity: 1, x: 0, rotate: 3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-shrink-0"
            style={{ filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.8))' }}
          >
            <div className="w-[160px] sm:w-[210px] md:w-[250px] rounded-sm bg-white p-2.5 pb-8 sm:p-3 sm:pb-10">
              <div className="relative overflow-hidden">
                <img
                  src="/z7837520904327_079ceba089e65ad22f3ca257737ed004.jpg"
                  alt="After"
                  className="w-full aspect-[3/4] object-cover object-top"
                />
                {/* Emerald glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent" />
              </div>
              <p className="mt-2 text-center font-bold text-[10px] sm:text-xs text-slate-700 tracking-wider uppercase">After</p>
              <p className="text-center text-[9px] sm:text-[10px] font-semibold text-emerald-600">26.000.000đ / tháng</p>
            </div>
          </motion.div>

        </div>

        {/* Caption */}

      </div>
    </section>
  )
}
