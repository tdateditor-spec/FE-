import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, KeyRound, CheckCircle2, Brain, Clapperboard, Target, TrendingUp, ArrowDown } from 'lucide-react'
import { MagicCard } from '../ui/MagicCard'
import { BorderBeamCard } from '../ui/BorderBeamCard'

const modules = [
  {
    num: '01',
    id: 'M1',
    Icon: Brain,
    title: 'Tư Duy & Công Cụ Khởi Đầu',
    tag: 'Mindset',
    color: {
      tag: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
      num: 'text-violet-400',
      bar: 'bg-gradient-to-b from-violet-500 to-violet-700',
      iconBg: 'bg-violet-500/15 border-violet-500/30 text-violet-300',
      glow: 'rgba(139,92,246,0.15)',
    },
    problem: 'Mông lung, thiếu định hướng, không biết bắt đầu từ đâu.',
    solution: 'Reset mindset, hiểu cách thị trường freelance vận hành và sở hữu lộ trình rõ ràng để chạm mốc 26 triệu đầu tiên. Thiết lập đầy đủ công cụ, phần mềm và workflow cần thiết.',
    result: 'Bạn biết chính xác mình cần làm gì mỗi ngày để bắt đầu kiếm tiền online mà không đi lòng vòng.',
  },
  {
    num: '02',
    id: 'M2',
    Icon: Clapperboard,
    title: 'Kỹ Thuật Giữ Chân Người Xem',
    tag: 'Core Skill',
    highlight: true,
    color: {
      tag: 'bg-blue-500/25 text-blue-200 border-blue-400/40',
      num: 'text-blue-300',
      bar: 'bg-gradient-to-b from-blue-400 to-blue-600',
      iconBg: 'bg-blue-500/20 border-blue-400/35 text-blue-200',
      glow: 'rgba(59,130,246,0.2)',
    },
    problem: 'Biết edit nhưng video nhạt, không giữ được người xem, khó tạo giá trị cho khách hàng.',
    solution: 'Hook 3 giây đầu, storytelling, subtitle, sound design, pacing và tư duy edit giúp video tăng retention. Học cách điều hướng cảm xúc người xem để video không thể bị lướt qua.',
    result: 'Tạo ra những video hấp dẫn, chuyên nghiệp và sở hữu 3 video mẫu chất lượng cao để làm vũ khí săn khách hàng.',
  },
  {
    num: '03',
    id: 'M3',
    Icon: Target,
    title: 'Hệ Thống Thu Hút Client Nước Ngoài',
    tag: 'Client',
    color: {
      tag: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      num: 'text-cyan-400',
      bar: 'bg-gradient-to-b from-cyan-500 to-cyan-700',
      iconBg: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
      glow: 'rgba(6,182,212,0.15)',
    },
    problem: 'Biết edit nhưng không biết tìm khách ở đâu, sợ tiếng Anh, không biết chốt deal thế nào.',
    solution: 'Xây portfolio đủ mạnh dù chưa nhiều kinh nghiệm, tìm đúng khách hàng tiềm năng và sử dụng 10 template DM thực chiến để tiếp cận hiệu quả.',
    result: 'Hoàn thiện portfolio chuyên nghiệp và có cơ hội nhận những job nước ngoài đầu tiên ngay từ tháng đầu.',
  },
  {
    num: '04',
    id: 'M4',
    Icon: TrendingUp,
    title: 'Scale Thu Nhập & Tự Do Thời Gian',
    tag: 'Scale',
    color: {
      tag: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      num: 'text-emerald-400',
      bar: 'bg-gradient-to-b from-emerald-500 to-emerald-700',
      iconBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
      glow: 'rgba(16,185,129,0.15)',
    },
    problem: 'Có khách nhưng thu nhập thất thường, làm nhiều giờ, dễ quá tải.',
    solution: 'Học cách tăng giá dịch vụ, giữ khách lâu dài, tối ưu workflow và quản lý thời gian như một freelancer chuyên nghiệp.',
    result: 'Xây dựng thu nhập ổn định, tăng doanh thu mà không cần tăng số giờ làm việc mỗi ngày.',
  },
]

function ModuleCard({ m, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const CardWrapper = m.highlight ? BorderBeamCard : MagicCard
  const cardProps = m.highlight
    ? { active: true }
    : { gradientColor: m.color.glow }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <CardWrapper {...cardProps} className="rounded-2xl">
        <div className="flex overflow-hidden rounded-2xl">
          {/* Left accent bar */}
          <div className={`w-1 flex-shrink-0 ${m.color.bar}`} />

          <div className="flex-1">
            {/* ── Card header ── */}
            <div className={`flex items-center gap-4 px-6 py-5 ${m.highlight ? 'bg-blue-950/30' : 'bg-white/[0.02]'}`}>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center border flex-shrink-0 ${m.color.iconBg} ${m.highlight ? 'shadow-[0_0_20px_rgba(59,130,246,0.35)]' : ''}`}>
                <m.Icon size={20} strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <span className={`text-xs font-bold tabular-nums ${m.color.num}`}>{m.num}</span>
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${m.color.tag}`}>{m.tag}</span>
                  {m.highlight && (
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={inView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
                      className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                    >
                      ⭐ Cốt Lõi
                    </motion.span>
                  )}
                </div>
                <h3 className="font-heading text-base md:text-[17px] font-bold text-white leading-snug">{m.title}</h3>
              </div>
            </div>

            {/* ── Divider ── */}
            <div className="h-px bg-white/[0.06]" />

            {/* ── Problem ── */}
            <div className="px-6 py-4 bg-red-950/10">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg bg-red-500/15 border border-red-500/25 flex items-center justify-center">
                  <Zap size={12} className="text-red-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">Vấn đề gặp phải</p>
                  <p className="text-sm leading-relaxed text-slate-300">{m.problem}</p>
                </div>
              </div>
            </div>

            {/* ── Separator with arrow ── */}
            <div className="flex items-center gap-3 px-6 py-1.5 bg-white/[0.015]">
              <div className="flex-1 h-px bg-white/[0.06]" />
              <ArrowDown size={12} className="text-slate-600 flex-shrink-0" />
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>

            {/* ── Solution ── */}
            <div className={`px-6 py-4 ${m.highlight ? 'bg-blue-950/20' : 'bg-white/[0.015]'}`}>
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center border ${m.highlight ? 'bg-blue-500/20 border-blue-500/30' : 'bg-blue-500/10 border-blue-500/20'}`}>
                  <KeyRound size={12} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Giải pháp</p>
                  <p className="text-sm leading-relaxed text-slate-300">{m.solution}</p>
                </div>
              </div>
            </div>

            {/* ── Separator with arrow ── */}
            <div className="flex items-center gap-3 px-6 py-1.5 bg-white/[0.015]">
              <div className="flex-1 h-px bg-white/[0.06]" />
              <ArrowDown size={12} className="text-slate-600 flex-shrink-0" />
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>

            {/* ── Result ── */}
            <div className="px-6 py-4 bg-emerald-950/15 rounded-b-2xl">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
                  <CheckCircle2 size={12} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Kết quả đạt được</p>
                  <p className="text-sm font-medium leading-relaxed text-emerald-100">{m.result}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardWrapper>
    </motion.div>
  )
}

export function Modules() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section className="py-24 px-6 bg-slate-900/20">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-400">Lộ Trình Chi Tiết</p>
          <h2 className="font-heading mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl leading-tight">
            4 Module: Từng Bước<br className="hidden sm:block" /> Đến Thu Nhập Tự Do
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto leading-relaxed text-sm md:text-base">
            Mỗi module giải quyết đúng vấn đề bạn đang gặp, theo đúng thứ tự, không bị lạc giữa chừng.
          </p>
        </motion.div>

        {/* Step track */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:flex items-center justify-center mb-10 max-w-xl mx-auto"
        >
          {modules.map((m, i) => (
            <div key={m.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5 flex-1">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={headerInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 260 }}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold border
                    ${m.highlight
                      ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_18px_rgba(59,130,246,0.55)]'
                      : 'bg-slate-800/80 border-slate-700 ' + m.color.num
                    }`}
                >
                  {m.num}
                </motion.div>
                <span className={`text-[10px] font-semibold ${m.highlight ? 'text-blue-300' : 'text-slate-500'}`}>{m.tag}</span>
              </div>
              {i < modules.length - 1 && (
                <div className="h-px flex-1 bg-slate-700/50 mx-1 mb-5" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Cards */}
        <div className="space-y-4">
          {modules.map((m, i) => (
            <ModuleCard key={m.id} m={m} index={i} />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex flex-col items-center gap-2"
        >
          <div className="w-px h-8 bg-gradient-to-b from-emerald-500/50 to-transparent" />
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="text-emerald-400 text-sm"
          >↓</motion.div>
          <span className="text-sm text-slate-400 font-medium">Thu nhập tự do</span>
        </motion.div>
      </div>
    </section>
  )
}
