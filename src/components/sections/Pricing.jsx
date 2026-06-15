import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Layers, Clapperboard, Search, MessageSquare, Brain,
  Users, PhoneCall, Gift, RotateCcw, Infinity, CheckCircle, Shield
} from 'lucide-react'
import { ShimmerButton } from '../ui/ShimmerButton'

const features = [
  { Icon: Layers,        text: '3 Chapters: Mindset → Skill → Sales',          color: 'text-violet-400', bg: 'bg-violet-500/10' },
  { Icon: Clapperboard,  text: 'Premiere Pro + After Effects từ zero',           color: 'text-blue-400',   bg: 'bg-blue-500/10' },
  { Icon: Search,        text: 'Hệ thống tìm client Instagram + Cold DM',        color: 'text-sky-400',    bg: 'bg-sky-500/10' },
  { Icon: Users,         text: 'Discord Community + Q&A hằng ngày',             color: 'text-emerald-400',bg: 'bg-emerald-500/10' },
  { Icon: Infinity,      text: 'Truy cập và update miễn phí trọn đời',           color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { Icon: PhoneCall,     text: 'Call 1-1 miễn phí trực tiếp với mình',           color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { Icon: MessageSquare, text: 'Kịch bản Sales Call chuyên nghiệp',              color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { Icon: Gift,          text: '6 Bonus (trị giá 2,200,000đ)',                   color: 'text-pink-400',   bg: 'bg-pink-500/10' },
  { Icon: RotateCcw,     text: 'Truy cập video vĩnh viễn',                       color: 'text-blue-300',   bg: 'bg-blue-400/10' },
]

export function Pricing({ onCTA }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="mx-auto max-w-xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="inline-block mb-4 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">Học Phí</p>
          <h2 className="font-heading text-4xl font-extrabold text-white md:text-5xl mb-3">Tham Gia Ngay Hôm Nay</h2>
          <p className="text-sm text-slate-400">Cohort đầu tiên, nhóm nhỏ để theo dõi chuyên sâu và tối ưu chương trình trước khi ra mắt đại trà.</p>
        </motion.div>

        {/* Card */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-[1px] shadow-[0_0_60px_rgba(59,130,246,0.18)]"
          style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.6) 0%, rgba(59,130,246,0.15) 50%, rgba(99,102,241,0.5) 100%)' }}
        >
          <div className="rounded-3xl bg-[#080f1e] p-8">
            {/* Badge */}
            <div className="mb-6 text-center">
              <span className="inline-block rounded-full bg-blue-600/90 px-5 py-1.5 font-heading text-xs font-bold text-white tracking-wide shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                VIRAL FREEDOM SYSTEM 90-Day Challenge
              </span>
            </div>

            {/* Price */}
            <div className="mb-7 text-center">
              <div className="mb-1.5 text-sm text-slate-500">Giá gốc: 4,800,000đ</div>
              <div
                className="font-heading text-6xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #93c5fd 0%, #ffffff 50%, #60a5fa 100%)' }}
              >
                799,000đ
              </div>
              <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
                <CheckCircle size={12} className="text-emerald-400" />
                <span className="text-xs text-emerald-300 font-medium">Thanh toán một lần. Truy cập trọn đời</span>
              </div>
            </div>

            {/* Divider */}
            <div className="mb-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Feature list */}
            <ul className="mb-7 grid gap-2.5">
              {features.map(({ Icon, text, color, bg }, i) => (
                <motion.li
                  key={text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.35 }}
                  className="flex items-center gap-3"
                >
                  <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg ${bg} border border-white/[0.06]`}>
                    <Icon size={13} className={color} />
                  </div>
                  <span className="text-sm text-slate-300">{text}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <ShimmerButton onClick={onCTA} className="w-full text-base py-5">
              → TÔI SẴN SÀNG. BẮT ĐẦU NGAY
            </ShimmerButton>
            <p className="mt-3 text-center text-xs text-slate-500">🔒 Thanh toán an toàn • Truy cập trong 24 giờ</p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
