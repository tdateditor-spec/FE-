import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AnimatedGradientText } from '../ui/AnimatedGradientText'
import { TracingBeam } from '../ui/TracingBeam'

const chapters = [
  {
    id: 'C1',
    num: '01',
    label: 'MINDSET',
    title: 'Chương 1: Mindset (Nền Tảng)',
    range: 'Ngày 1–15',
    desc: 'Xuyên suốt từ ngày 1 đến ngày 15 và duy trì trong toàn bộ hành trình',
    color: {
      badge: 'bg-violet-500/20 border-violet-500/40 text-violet-300',
      bar: 'bg-gradient-to-r from-violet-500 to-violet-700',
      num: 'text-violet-400',
      icon: 'bg-violet-500/15 border-violet-500/30 text-violet-300',
      ring: 'ring-violet-500/20',
      result: 'border-violet-500/20 bg-violet-950/20 text-violet-200',
      connector: 'bg-violet-500/30',
    },
    phases: [
      {
        label: 'Giai Đoạn 1',
        name: 'Reset & Định Hướng',
        range: 'Ngày 1–15',
        desc: 'Bạn sẽ reset toàn bộ mindset, loại bỏ những niềm tin hạn chế như không giỏi, không có kinh nghiệm, không giỏi tiếng Anh. Bạn sẽ hiểu rõ bản thân, xác định hướng đi phù hợp và đặt mục tiêu cho $1,000 đầu tiên. Đồng thời, bạn sẽ hiểu cách thị trường freelance vận hành và cách mình có thể tham gia vào đó.',
        result: 'Bạn biết rõ mình đang đi đâu và vì sao mình làm điều này.',
      },
    ],
  },
  {
    id: 'C2',
    num: '02',
    label: 'SKILL',
    title: 'Chương 2: Skill (Editing & Workflow)',
    range: 'Ngày 10–45',
    desc: 'Xuyên suốt từ ngày 10 đến ngày 45',
    color: {
      badge: 'bg-blue-500/20 border-blue-500/40 text-blue-300',
      bar: 'bg-gradient-to-r from-blue-400 to-blue-600',
      num: 'text-blue-400',
      icon: 'bg-blue-500/15 border-blue-500/30 text-blue-300',
      ring: 'ring-blue-500/20',
      result: 'border-blue-500/20 bg-blue-950/20 text-blue-200',
      connector: 'bg-blue-500/30',
    },
    phases: [
      {
        label: 'Giai Đoạn 2',
        name: 'Bắt Đầu Kỹ Năng',
        range: 'Ngày 16–30',
        desc: 'Bạn sẽ bắt đầu với Premiere Pro từ con số 0, hiểu workflow dựng video cơ bản, biết cách chọn cảnh, dựng video mượt và nắm các kỹ thuật nền tảng như keyframe, sound và color.',
        result: 'Bạn có thể tự edit một video hoàn chỉnh.',
      },
      {
        label: 'Giai Đoạn 3',
        name: 'Nâng Cao & Portfolio',
        range: 'Ngày 31–45',
        desc: 'Bạn sẽ học After Effects để nâng cao giá trị video, thực hành trên các project thực tế, xây dựng portfolio từ con số 0 và hiểu cách tạo ra những video có tính storytelling và thẩm mỹ.',
        result: 'Bạn có portfolio sẵn sàng để đi kiếm tiền.',
      },
    ],
  },
  {
    id: 'C3',
    num: '03',
    label: 'SALES',
    title: 'Chương 3: Sales (Kiếm Tiền & Hệ Thống)',
    range: 'Ngày 30–90',
    desc: 'Xuyên suốt từ ngày 30 đến ngày 90',
    color: {
      badge: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300',
      bar: 'bg-gradient-to-r from-emerald-400 to-emerald-600',
      num: 'text-emerald-400',
      icon: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
      ring: 'ring-emerald-500/20',
      result: 'border-emerald-500/20 bg-emerald-950/20 text-emerald-200',
      connector: 'bg-emerald-500/30',
    },
    phases: [
      {
        label: 'Giai Đoạn 4',
        name: 'Kiếm Tiền Đầu Tiên',
        range: 'Ngày 46–60',
        desc: 'Bạn sẽ thiết lập profile trên các nền tảng như Upwork, Fiverr và social, học cách tạo offer, định giá dịch vụ, bắt đầu tiếp cận khách hàng và sử dụng các phương pháp nhắn tin, follow-up hiệu quả.',
        result: 'Bạn có những khách hàng đầu tiên và thu nhập đầu tiên.',
      },
      {
        label: 'Giai Đoạn 5',
        name: 'Tối Ưu & Tự Động',
        range: 'Ngày 61–75',
        desc: 'Bạn sẽ ứng dụng AI vào công việc để hỗ trợ content, outreach và workflow. Đồng thời, bạn xây dựng hệ thống tự động hóa và tối ưu quy trình làm việc để tiết kiệm thời gian.',
        result: 'Bạn giảm thời gian làm việc nhưng vẫn tăng thu nhập.',
      },
      {
        label: 'Giai Đoạn 6',
        name: 'Scale & Tự Do',
        range: 'Ngày 76–89',
        desc: 'Bạn sẽ học cách tăng giá dịch vụ, xây dựng hệ thống khách hàng ổn định, nâng cấp kỹ năng và tốc độ làm việc, từ đó từng bước xây dựng nền tảng cho một lifestyle business.',
        result: 'Bạn có thu nhập ổn định và khả năng làm việc từ bất cứ đâu chỉ với một chiếc laptop.',
      },
      {
        label: '🎯 Giai Đoạn 7',
        name: 'Tổng Kết & Định Hướng Mới',
        range: 'Ngày 90',
        desc: 'Một phần thưởng đặc biệt dành riêng cho những ai hoàn thành toàn bộ hành trình 90 ngày: bạn sẽ có một buổi call 1:1 cùng team để cùng nhau nhìn lại kết quả và xây dựng lộ trình phát triển tiếp theo. Đây là đặc quyền chỉ dành cho những người thực sự cam kết đi đến cuối hành trình.\n\nĐây không phải là điểm kết thúc, mà là điểm bắt đầu cho giai đoạn tiếp theo của bạn.\n\nTrong ngày này, bạn sẽ nhìn lại toàn bộ hành trình 90 ngày vừa qua, từ lúc bắt đầu với con số 0 cho đến khi bạn đã có kỹ năng editing, có portfolio và những khách hàng đầu tiên. Bạn sẽ hiểu rõ mình đã tiến xa như thế nào, đang ở đâu và cần cải thiện điều gì để đi xa hơn.\n\nBạn sẽ được hướng dẫn xây dựng "30 Day Action Plan" chi tiết cho 30 ngày tiếp theo, tập trung vào việc tăng thu nhập từ video editing, tối ưu quy trình làm việc và nâng cấp hệ thống cá nhân.\n\nBên cạnh đó, bạn sẽ học cách duy trì kỷ luật và chịu trách nhiệm để không bị mất động lực giữa chừng, đặc biệt là sau khi đã có những kết quả ban đầu.',
        result: 'Bạn có một roadmap rõ ràng cho giai đoạn tiếp theo, biết chính xác mình cần làm gì để đi từ thu nhập đầu tiên đến thu nhập ổn định và phát triển lâu dài với nghề Video Editing.',
        highlight: true,
      },
    ],
  },
]

function PhaseCard({ phase, color, index, chapterInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={chapterInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.15 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-4"
    >
      {/* Phase connector dot */}
      <div className="relative flex flex-col items-center flex-shrink-0 w-3 mt-1.5">
        <div className={`w-2.5 h-2.5 rounded-full border-2 z-10 flex-shrink-0 ${phase.highlight ? 'bg-emerald-400 border-emerald-300' : 'bg-slate-700 border-slate-500'}`} />
      </div>

      {/* Card */}
      <div className={`flex-1 mb-3 rounded-2xl border overflow-hidden transition-all
        ${phase.highlight
          ? 'border-emerald-500/30 shadow-[0_0_24px_rgba(16,185,129,0.1)]'
          : 'border-white/[0.07] hover:border-white/[0.13]'
        }`}
      >
        <div className={`p-4 ${phase.highlight ? 'bg-emerald-950/15' : 'bg-white/[0.02]'}`}>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${phase.highlight ? 'bg-emerald-600 border-emerald-500 text-white' : color.badge}`}>
              {phase.label}
            </span>
            <span className="text-[10px] text-slate-500">{phase.range}</span>
          </div>
          <h4 className="font-heading text-sm font-bold text-white mb-2">{phase.name}</h4>
          <div className="text-xs leading-relaxed text-slate-400 mb-3 space-y-2">
            {phase.desc.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <div className={`inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 ${phase.highlight ? color.result : color.result}`}>
            <span className="text-xs flex-shrink-0">✓</span>
            <p className="text-xs font-medium leading-snug">{phase.result}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ChapterBlock({ chapter, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {/* Chapter header */}
      <div className="flex items-center gap-4 mb-5">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.1, type: 'spring', stiffness: 260 }}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center border flex-shrink-0 font-heading font-bold text-sm ring-4 ${chapter.color.icon} ${chapter.color.ring}`}
        >
          {chapter.num}
        </motion.div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-0.5">
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${chapter.color.badge}`}>
              {chapter.label}
            </span>
            <span className="text-xs text-slate-500">{chapter.range}</span>
          </div>
          <h3 className="font-heading font-bold text-white text-base">{chapter.title}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{chapter.desc}</p>
        </div>
      </div>

      {/* Phase cards with left connector line */}
      <div className="ml-16 relative">
        {/* Vertical connector */}
        <div className={`absolute left-[5px] top-2 bottom-6 w-px ${chapter.color.connector}`} />

        <div className="space-y-0">
          {chapter.phases.map((phase, i) => (
            <PhaseCard
              key={phase.name}
              phase={phase}
              color={chapter.color}
              index={i}
              chapterInView={inView}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function Roadmap() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section id="roadmap" className="py-24 px-6 bg-slate-900/20">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-5 rounded-full border border-blue-500/40 bg-blue-500/15 px-6 py-2.5 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">Lộ Trình 90 Ngày</span>
          </div>
          <h2 className="font-heading mb-4 text-4xl font-extrabold text-white md:text-5xl leading-tight">
            <AnimatedGradientText>Mindset → Skill → Sales</AnimatedGradientText>
          </h2>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto text-base leading-relaxed">
            Hệ thống 3 chương giúp bạn đi từ con số 0 đến có kỹ năng, có khách hàng và xây dựng thu nhập tự do.
          </p>
        </motion.div>

        {/* Chapter stepper */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center mb-12 max-w-xs mx-auto"
        >
          {chapters.map((c, i) => (
            <div key={c.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1 flex-1">
                <div className={`text-[10px] font-bold px-3 py-1 rounded-full border ${c.color.badge}`}>
                  {c.label}
                </div>
                <span className="text-[9px] text-slate-600">{c.range}</span>
              </div>
              {i < chapters.length - 1 && (
                <div className="w-6 h-px bg-slate-700 flex-shrink-0 mx-0.5 mb-4">
                  <span className="sr-only">→</span>
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Chapters with TracingBeam */}
        <TracingBeam className="pl-6 md:pl-14">
          <div className="space-y-10">
            {chapters.map((chapter, i) => (
              <ChapterBlock key={chapter.id} chapter={chapter} index={i} />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 flex items-center gap-3"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">✓</div>
            <div>
              <p className="text-sm font-bold text-white">Ngày 90: Thu Nhập Tự Do</p>
              <p className="text-xs text-slate-500">Kỹ năng, client, thu nhập và hệ thống trong tay bạn.</p>
            </div>
          </motion.div>
        </TracingBeam>
      </div>
    </section>
  )
}
