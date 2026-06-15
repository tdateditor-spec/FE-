import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Map, Wrench, Users } from 'lucide-react'

const pains = [
  'Bạn biết mình muốn làm freelance editing, nhưng không biết ngày đầu tiên cần bắt đầu từ đâu. Không phải bạn chưa sẵn sàng, mà là chưa có ai cho bạn một lộ trình rõ ràng.',
  'Bạn đã tạo profile trên Upwork hoặc Fiverr, nhưng chờ 2 tuần vẫn không có ai nhắn. Bạn bắt đầu tự hỏi mình sai ở đâu, rồi dần nghi ngờ "hay là mình không đủ giỏi" trong khi vấn đề thật ra không nằm ở kỹ năng.',
  'Bạn nghe nói freelance nước ngoài có thể kiếm được $1,000–$3,000 mỗi tháng, nhưng không chắc điều đó có thật với mình không. Bạn không thấy ai giống mình làm được, nên cũng không biết nên tin vào đâu.',
  'Bạn sợ tiếng Anh của mình không đủ để giao tiếp với client. Sợ nhắn sai, sợ không chuyên nghiệp, sợ bị từ chối, sợ bị hỏi mà không biết trả lời như thế nào.',
  'Bạn đã thử tự học trên YouTube, nhưng mỗi người nói một kiểu. Xem rất nhiều, nhưng vẫn không biết hôm nay mình cần làm gì cụ thể. Kiến thức thì có, nhưng hành động thì vẫn đứng yên.',
  'Bạn đã từng bắt đầu, nhưng rồi bỏ giữa chừng. Không phải vì bạn lười, mà vì không có ai ở bên khi bạn bế tắc. Chỉ cần một câu hỏi không có lời giải, bạn có thể dừng lại vài ngày, rồi dần mất động lực.',
  'Bạn muốn thoát khỏi việc đổi thời gian lấy tiền, nhưng không biết phải bắt đầu từ đâu để đi từ "có kỹ năng" sang "có thu nhập".',
]

const solutions = [
  { Icon: Map,    text: 'Một lộ trình rõ ràng biết chính xác ngày 1 cần làm gì, ngày 7 cần làm gì, và ngày 30 cần đạt được điều gì.' },
  { Icon: Wrench, text: 'Một bộ công cụ sẵn sàng template tiếng Anh, kịch bản nhắn tin, checklist từng bước để bạn không phải tự mò mẫm mọi thứ từ đầu.' },
  { Icon: Users,  text: 'Một môi trường có người đi trước đồng hành để khi bạn gặp vấn đề, luôn có người giúp bạn đi tiếp thay vì đứng lại.' },
]

function PainItem({ text, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 hover:bg-white/[0.04] transition-colors"
    >
      <span className="flex-shrink-0 mt-0.5 text-red-400 text-lg leading-none">→</span>
      <p className="text-base text-slate-300 leading-relaxed">{text}</p>
    </motion.div>
  )
}

export function Pain() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })
  const solRef = useRef(null)
  const solInView = useInView(solRef, { once: true, margin: '-60px' })

  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-3xl">

        {/* Header — hình nền + chữ đè lên */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 16 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative mb-10 overflow-hidden rounded-3xl"
        >
          {/* Ảnh nền vuông */}
          <img
            src="/hinh fix so 2.jpg"
            alt=""
            className="w-full object-cover"
            style={{ aspectRatio: '1/1' }}
          />
          {/* Overlay tối để chữ dễ đọc */}
          <div className="absolute inset-0 bg-black/55" />
          {/* Chữ đè lên giữa ảnh */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p className="inline-block mb-4 rounded-full border border-red-500/40 bg-red-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-red-400">Bạn Có Đang...</p>
            <h2 className="font-heading text-4xl font-extrabold text-white md:text-5xl leading-tight drop-shadow-lg">
              Ở Một Trong Những<br />Trạng Thái Này?
            </h2>
          </div>
        </motion.div>

        {/* Pain list */}
        <div className="space-y-3 mb-12">
          {pains.map((text, i) => <PainItem key={i} text={text} index={i} />)}
        </div>

        {/* Đúng không? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 space-y-4 rounded-2xl border border-blue-500/20 bg-blue-500/[0.05] p-7"
        >
          <p className="text-2xl font-bold text-white">Đúng không?</p>
          <p className="text-base text-slate-400 leading-relaxed">
            Mình hiểu cảm giác đó, vì mình cũng từng ở chính vị trí đó.
          </p>
          <p className="text-base text-slate-400 leading-relaxed">
            Và mình nhận ra một điều: <strong className="text-white">vấn đề của bạn không phải là thiếu thông tin.</strong> Trên YouTube có hàng nghìn video dạy edit, dạy freelance, dạy tìm khách hàng. Bạn không thiếu thứ để xem.
          </p>
        </motion.div>

        {/* Thứ bạn thực sự thiếu */}
        <motion.div
          ref={solRef}
          initial={{ opacity: 0, y: 20 }}
          animate={solInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">Thứ bạn thực sự thiếu là →</p>
          <div className="space-y-4">
            {solutions.map(({ Icon, text }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={solInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="flex items-start gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] px-5 py-4"
              >
                <div className="flex-shrink-0 mt-0.5 h-9 w-9 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
                  <Icon size={16} className="text-emerald-400" />
                </div>
                <p className="text-base text-slate-300 leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 text-center rounded-2xl border border-blue-600/20 bg-blue-900/15 p-6"
        >
          <p className="text-base font-medium text-white leading-relaxed">
            Và đó chính xác là lý do{' '}
            <span className="text-blue-300 font-bold">Viral Freedom System</span>{' '}
            được tạo ra.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
