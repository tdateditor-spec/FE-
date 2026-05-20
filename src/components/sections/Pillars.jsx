import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { AnimatedGradientText } from '../ui/AnimatedGradientText'

const pillars = [
  {
    num: '01',
    title: 'Triết Lý "Kẻ Thực Dụng"',
    color: 'blue',
    core: 'Client nước ngoài không thuê bạn vì bạn biết nhiều effect họ thuê bạn vì bạn giải quyết được đúng vấn đề của họ, đều đặn, đáng tin cậy.',
    solution: 'Bỏ qua tất cả những hiệu ứng "bay múa" không cần thiết. Mình sẽ hướng dẫn bạn làm đúng những style video "đắt khách" nhất thứ client thực sự tìm kiếm và sẵn sàng trả tiền ổn định hàng tháng.',
    warning: 'Bạn sẽ mãi luyện kỹ năng theo hướng "đẹp với mình" trong khi client đang tìm người giải quyết đúng bài toán của họ. Edit giỏi nhưng không ai thuê vì bạn đang giải sai đề. Và mỗi tháng trôi qua, bạn học thêm tutorial mới nhưng tài khoản Payoneer vẫn về 0.',
  },
  {
    num: '02',
    title: 'Hệ Thống "Kẻ Săn Mồi Thông Minh"',
    color: 'emerald',
    core: 'Client nước ngoài không tự tìm đến bạn bạn phải tiếp cận họ đúng nơi, đúng cách, đúng thông điệp. Đây là kỹ năng riêng biệt, hoàn toàn có thể học được.',
    solution: 'Mình sẽ hướng dẫn bạn cách xây portfolio "hút khách" trên Instagram nơi những client béo bở đang cư trú, cách phân tích profile để nhận diện đúng người có ngân sách, và cách nhắn tin để họ chủ động đặt tiền vào tay bạn thay vì bạn phải van xin.',
    warning: 'Bạn sẽ đăng portfolio lên rồi ngồi đợi trong im lặng. Một tuần không ai nhắn. Hai tuần vẫn vậy. Bạn bắt đầu tự hỏi "hay là mình không đủ giỏi?" trong khi vấn đề thật sự là bạn đang gõ nhầm cửa, sai cách, và không ai biết bạn tồn tại.',
  },
  {
    num: '03',
    title: 'Vũ Khí "Kẻ Vượt Biên Giới"',
    color: 'violet',
    core: 'Rào cản lớn nhất không phải kỹ năng edit mà là tiếng Anh và nỗi sợ giao tiếp với người nước ngoài. Thứ đang khiến hàng nghìn editor Việt giỏi không dám bước ra thị trường quốc tế.',
    solution: 'Mình sẽ trang bị cho bạn hệ thống kịch bản có sẵn từ DM đầu tiên, báo giá, xử lý phản đối, đến chốt deal kết hợp với ChatGPT để giao tiếp và đàm phán mượt mà như người bản xứ. Bạn không cần giỏi tiếng Anh. Bạn chỉ cần đúng công cụ.',
    warning: 'Bạn sẽ run sợ, tự hạ giá bản thân mỗi khi đối diện với client nước ngoài. Nhận $5/video khi đáng được trả $50 chỉ vì không biết cách nói chuyện với họ đúng cách.',
  },
]

const colorMap = {
  blue:   { badge: 'border-blue-500/30 bg-blue-600/15 text-blue-300', card: 'border-blue-500/20 hover:border-blue-500/40', core: 'border-blue-500/20 bg-blue-500/[0.06] text-blue-100', sol: 'text-blue-400' },
  emerald:{ badge: 'border-emerald-500/30 bg-emerald-600/15 text-emerald-300', card: 'border-emerald-500/20 hover:border-emerald-500/40', core: 'border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-100', sol: 'text-emerald-400' },
  violet: { badge: 'border-violet-500/30 bg-violet-600/15 text-violet-300', card: 'border-violet-500/20 hover:border-violet-500/40', core: 'border-violet-500/20 bg-violet-500/[0.06] text-violet-100', sol: 'text-violet-400' },
}

function PillarCard({ num, title, color, core, solution, warning, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const c = colorMap[color]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`rounded-2xl border ${c.card} bg-white/[0.025] p-7 flex flex-col gap-5 transition-colors duration-300`}
    >
      {/* Number badge */}
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl border font-heading text-lg font-bold ${c.badge}`}>
        {num}
      </div>

      {/* Title */}
      <h3 className="font-heading text-xl font-bold text-white leading-snug">{title}</h3>

      {/* Core */}
      <div className={`rounded-xl border ${c.core} px-4 py-3`}>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5 opacity-60">Cốt lõi</p>
        <p className="text-sm leading-relaxed">{core}</p>
      </div>

      {/* Solution */}
      <div>
        <p className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${c.sol}`}>Giải pháp</p>
        <p className="text-sm text-slate-400 leading-relaxed">{solution}</p>
      </div>

      {/* Warning */}
      <div className="rounded-xl border border-red-500/15 bg-red-900/10 px-4 py-3 mt-auto">
        <p className="text-[10px] font-bold uppercase tracking-widest text-red-400/70 mb-1.5">⚠ Nếu thiếu</p>
        <p className="text-xs text-red-400 leading-relaxed">{warning}</p>
      </div>
    </motion.div>
  )
}

export function Pillars() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })
  const conclusionRef = useRef(null)
  const conclusionInView = useInView(conclusionRef, { once: true, margin: '-60px' })

  return (
    <section id="system" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 16 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <p className="inline-block mb-4 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">Hệ Thống Cốt Lõi</p>
          <h2 className="font-heading text-4xl font-extrabold text-white md:text-5xl leading-tight mb-4">
            3 Thứ Tạo Ra Sự Khác Biệt Giữa<br />
            Editor Kiếm <AnimatedGradientText>$0</AnimatedGradientText> Và Editor Kiếm <AnimatedGradientText>$1,000+/Tháng</AnimatedGradientText>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Sau khi tự đi qua con đường này và đồng hành cùng nhiều bạn trẻ Việt bắt đầu từ con số 0, mình nhận ra một sự thật:{' '}
            <strong className="text-white">Hầu hết người thất bại với freelance không phải vì kỹ năng edit kém mà vì thiếu đúng 3 thứ này.</strong>
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 rounded-2xl overflow-hidden"
        >
          <img src="/2.jpg" alt="" className="w-full max-w-sm mx-auto aspect-[3/4] object-cover object-top rounded-2xl" />
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3 mt-12">
          {pillars.map((p, i) => (
            <PillarCard key={p.num} {...p} index={i} />
          ))}
        </div>

        {/* Conclusion */}
        <motion.div
          ref={conclusionRef}
          initial={{ opacity: 0, y: 24 }}
          animate={conclusionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mt-10 rounded-2xl border border-blue-600/20 bg-blue-900/15 p-7 text-center"
        >
          <p className="text-base font-medium text-white leading-relaxed max-w-2xl mx-auto">
            Khi bạn có đủ cả 3 edit đúng thứ client cần, biết tìm đúng người, và không còn sợ giao tiếp{' '}
            <span className="text-blue-300 font-semibold">Viral Freedom System chính là hệ thống đưa tất cả những thứ đó vào một lộ trình duy nhất, từng bước, theo đúng thứ tự.</span>
          </p>
        </motion.div>

      </div>
    </section>
  )
}
