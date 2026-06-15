import { motion } from 'framer-motion'
import { TrendingUp, Users, Clock, Shield } from 'lucide-react'
import { AnimatedGradientText } from '../ui/AnimatedGradientText'
import { ShimmerButton } from '../ui/ShimmerButton'

const stats = [
  { val: '40M+', label: 'Thu nhập/tháng', Icon: TrendingUp, color: 'text-emerald-400' },
  { val: '90',   label: 'Ngày lộ trình',  Icon: Clock,      color: 'text-blue-400' },
  { val: '799K', label: 'Giá ra mắt',     Icon: Shield,     color: 'text-violet-400' },
  { val: '3+',   label: 'Học viên thật',  Icon: Users,      color: 'text-yellow-400' },
]

export function Hero({ onCTA }) {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">

      {/* Background */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-violet-800/10 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(37,99,235,0.07),transparent)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: 'radial-gradient(circle, #60a5fa 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-12 flex flex-col items-center text-center gap-5">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/[0.07] px-4 py-2 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse flex-shrink-0" />
          <span className="text-xs sm:text-sm text-slate-400">
            Dành cho những bạn trẻ đang cảm thấy ngột ngạt với định hướng an toàn, khao khát tự chủ tài chính và cuộc sống tự do{' '}
            <span className="text-blue-300 font-medium">nhưng không biết bắt đầu từ kỹ năng nào.</span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading text-4xl sm:text-5xl xl:text-[60px] font-bold text-white tracking-tight"
          style={{ lineHeight: 1.2 }}
        >
          Lộ Trình Từng Bước<br />
          Kiếm <AnimatedGradientText>26 Triệu Đầu Tiên</AnimatedGradientText><br />
          Từ <AnimatedGradientText>Video Editing</AnimatedGradientText>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base max-w-2xl space-y-1"
        >
          <span className="block">Ngay cả khi bạn chưa từng edit, không có kinh nghiệm, hay không giỏi tiếng Anh, bạn vẫn có thể bắt đầu.</span>
          <span className="block text-white font-semibold">Bạn hoàn toàn có thể làm việc ở bất cứ đâu, bất cứ khi nào bạn muốn, chỉ cần một chiếc laptop và kết nối Internet.</span>
        </motion.p>

        {/* Polaroids */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full flex items-end justify-center gap-6 sm:gap-12 md:gap-16"
        >
          {/* BEFORE */}
          <div style={{ filter: 'drop-shadow(0 16px 36px rgba(0,0,0,0.6))' }}>
            <div className="w-[180px] sm:w-[230px] md:w-[260px] bg-white rounded-sm p-3 pb-9 sm:p-4 sm:pb-11" style={{ transform: 'rotate(-4deg)' }}>
              <div style={{ filter: 'grayscale(100%) contrast(1.05)' }}>
                <img src="/z7837516370081_c74fa3f723643cac8eb8816b2799c68d.jpg" alt="Before"
                  className="w-full aspect-[3/4] object-cover object-top" />
              </div>
              <p className="mt-2 text-center font-bold text-[10px] sm:text-xs text-slate-600 tracking-widest uppercase">Before</p>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center gap-1.5 mb-8 flex-shrink-0">
            <svg viewBox="0 0 80 60" className="w-12 sm:w-16 text-white/60" fill="none">
              <path d="M4 50 Q22 8 62 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M54 12 L66 20 L56 27" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[10px] sm:text-xs text-slate-500">90 ngày</span>
          </div>

          {/* AFTER */}
          <div style={{ filter: 'drop-shadow(0 20px 44px rgba(0,0,0,0.7))' }}>
            <div className="w-[200px] sm:w-[255px] md:w-[285px] bg-white rounded-sm p-3 pb-9 sm:p-4 sm:pb-11" style={{ transform: 'rotate(3deg)' }}>
              <img src="/z7837520904327_079ceba089e65ad22f3ca257737ed004.jpg" alt="After"
                className="w-full aspect-[3/4] object-cover object-top" />
              <p className="mt-2 text-center font-bold text-[10px] sm:text-xs text-emerald-600 tracking-widest uppercase">After</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42 }}
          className="flex flex-col items-center gap-2 mt-4"
        >
          <ShimmerButton onClick={onCTA} className="text-sm sm:text-lg px-8 sm:px-12 py-4 sm:py-5 animate-pulse-blue">
            Tham Gia VIRAL FREEDOM SYSTEM 799K
          </ShimmerButton>
          <p className="text-slate-500 text-xs">
            Giá gốc: <span className="line-through">4,800,000đ</span>{' '}
            <span className="text-emerald-400 font-medium">Tiết kiệm 83%</span>
          </p>
        </motion.div>

        {/* Trust pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {['Truy cập trọn đời', 'Discord hỗ trợ 24/7'].map((text) => (
            <span key={text} className="flex items-center gap-1.5 text-xs text-slate-400 rounded-full border border-slate-700/50 bg-white/[0.02] px-3 py-1.5">
              <span className="text-blue-400 font-bold">✓</span> {text}
            </span>
          ))}
        </motion.div>


      </div>
    </section>
  )
}
