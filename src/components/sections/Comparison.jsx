import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { X, Check } from 'lucide-react'

/* ── data ──────────────────────────────────────────────────────────────────── */
const rows = [
  {
    topic: 'Lộ trình',
    without: 'Tự mày mò, xem YouTube mỗi người nói một kiểu, không biết hôm nay cần làm gì',
    with:    'Lộ trình 90 ngày rõ từng bước — ngày 1, ngày 15, ngày 30 làm gì, không cần đoán',
  },
  {
    topic: 'Tìm client',
    without: 'Đăng profile lên Upwork/Fiverr rồi ngồi chờ. 2 tuần không ai nhắn. Không biết mình sai ở đâu',
    with:    'Hệ thống tìm đúng client trên Instagram, cold DM đã viết sẵn, chủ động tiếp cận từ ngày đầu',
  },
  {
    topic: 'Tiếng Anh',
    without: 'Sợ nhắn tin sai, sợ không chuyên nghiệp, cuối cùng chỉ dám nhận $5 thay vì $50',
    with:    '10 template DM tiếng Anh + ChatGPT hỗ trợ — giao tiếp và chốt deal mượt như người bản xứ',
  },
  {
    topic: 'Kỹ năng edit',
    without: 'Học theo tutorial làm video "đẹp với mình" — nhưng client cần video tạo ra doanh thu',
    with:    'Học đúng style video "đắt khách" — hook 3 giây, storytelling, retention — thứ client thực sự trả tiền',
  },
  {
    topic: 'Thu nhập',
    without: 'Tháng được tháng không, không biết tháng sau có việc không, hoàn toàn phụ thuộc may rủi',
    with:    '2–3 client ổn định, $1,000–$3,000/tháng đều đặn, không cần chạy tìm việc mới liên tục',
  },
  {
    topic: 'Khi bị stuck',
    without: 'Không có ai hỗ trợ, một câu hỏi không có lời giải có thể khiến bạn bỏ cuộc vài ngày',
    with:    'Cộng đồng Discord + mentor đồng hành — bạn không bao giờ học một mình hay mắc kẹt một mình',
  },
  {
    topic: 'Portfolio',
    without: 'Không biết làm portfolio thế nào khi chưa có kinh nghiệm, vòng tròn gà-trứng không lối thoát',
    with:    '"$0 Portfolio Blueprint" — xây portfolio chuyên nghiệp từ con số 0, không cần client trước đó',
  },
  {
    topic: 'Thời gian',
    without: '6–12 tháng mày mò, va vấp, đi lòng vòng không biết mình đang đúng hay sai hướng',
    with:    'Rút ngắn xuống 90 ngày — đi theo đúng lộ trình đã được kiểm chứng bởi người đi trước',
  },
]

/* ── Row ───────────────────────────────────────────────────────────────────── */
function Row({ topic, without, with: withVal, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="grid grid-cols-[1fr_1px_1fr] items-stretch gap-0 rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02]"
    >
      {/* Without */}
      <div className="flex items-start gap-3 p-5 bg-red-500/[0.04] hover:bg-red-500/[0.07] transition-colors">
        <div className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
          <X size={10} className="text-red-400" strokeWidth={3}/>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-red-400/70 mb-1">{topic}</p>
          <p className="text-sm text-slate-400 leading-relaxed">{without}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="bg-white/[0.05]" />

      {/* With */}
      <div className="flex items-start gap-3 p-5 bg-emerald-500/[0.04] hover:bg-emerald-500/[0.07] transition-colors">
        <div className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
          <Check size={10} className="text-emerald-400" strokeWidth={3}/>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/70 mb-1">{topic}</p>
          <p className="text-sm text-slate-200 leading-relaxed">{withVal}</p>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Section ───────────────────────────────────────────────────────────────── */
export function Comparison() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section className="py-24 px-6 overflow-hidden">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <p className="inline-block mb-4 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
            Sự Khác Biệt Thực Sự
          </p>
          <h2 className="font-heading text-4xl font-extrabold text-white md:text-5xl leading-tight">
            Tự Mày Mò Một Mình{' '}
            <span className="gradient-text">vs</span>{' '}
            Có Hệ Thống Rõ Ràng
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto leading-relaxed">
            Cùng một xuất phát điểm, cùng mong muốn tự do tài chính —{' '}
            <strong className="text-white">con đường khác nhau tạo ra kết quả khác nhau hoàn toàn.</strong>
          </p>
        </motion.div>

        {/* Column headers */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="grid grid-cols-2 mb-3 px-1"
        >
          <div className="flex items-center gap-2 px-5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
            <span className="text-xs font-bold uppercase tracking-widest text-red-400/80">
              Không có hệ thống
            </span>
          </div>
          <div className="flex items-center gap-2 px-5">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Viral Freedom System
            </span>
          </div>
        </motion.div>

        {/* Rows */}
        <div className="space-y-2">
          {rows.map((r, i) => (
            <Row key={r.topic} {...r} index={i} />
          ))}
        </div>

        {/* Bottom CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 to-blue-500/5 p-8 text-center"
        >
          <p className="text-2xl font-bold text-white mb-2">
            Bạn chọn con đường nào?
          </p>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto leading-relaxed">
            Cả hai đều cần thời gian và nỗ lực. Nhưng chỉ một con đường có lộ trình rõ ràng,
            công cụ sẵn dùng, và người đi trước dẫn đường.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-6 py-3 text-sm text-red-400">
              <X size={15} strokeWidth={2.5}/>
              <span>6–12 tháng mày mò · Không ổn định · Dễ bỏ cuộc</span>
            </div>
            <div className="text-slate-600 font-bold text-lg">hay</div>
            <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-6 py-3 text-sm text-emerald-400">
              <Check size={15} strokeWidth={2.5}/>
              <span>90 ngày · Có hệ thống · Kết quả thật</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
