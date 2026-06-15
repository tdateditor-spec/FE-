import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { X, Check, Globe, Clapperboard } from 'lucide-react'
import { MagicCard } from '../ui/MagicCard'

const befores = [
  'Mỗi sáng thức dậy đã tự hỏi "hôm nay mình cần làm gì nhỉ" mà không có câu trả lời',
  'Nhận job edit giá rẻ rồi chờ duyệt cả tuần, không biết bao giờ được trả',
  'Lo tiền phòng trọ cuối tháng trong khi không biết tháng sau có việc không',
]

const afters = [
  '$1,000–$3,000 đều đặn mỗi tháng từ 2–3 client nước ngoài ổn định, không cần chạy tìm việc mới liên tục',
  'Làm việc từ bất kỳ đâu có laptop và Internet căn phòng yên tĩnh, quán cà phê, hay ngôi nhà ở quê bạn vừa về thăm',
  'Tự quyết định ngày của mình không ai kiểm soát giờ giấc, địa điểm, hay cách bạn phân bổ thời gian',
  'Chu cấp cho bố mẹ, mua quà cho họ không phải vì dịp đặc biệt, mà vì bạn muốn và bạn có thể',
  'Sống theo cách mình muốn không phải cách người khác kỳ vọng',
]

const roleCards = [
  { role: 'Copywriter',   desc: 'Viết để bán hàng',               highlight: false },
  { role: 'Designer',     desc: 'Hình ảnh để hỗ trợ',             highlight: false },
  { role: 'Coder',        desc: 'Xây hệ thống phía sau',          highlight: false },
  { role: 'Video Editor', desc: 'Kết nối tất cả, tạo chuyển đổi', highlight: true  },
]

const whyParagraphs = [
  { type: 'normal', text: 'Trước đây, mình cũng từng nghĩ rằng muốn kiếm nhiều tiền thì phải học lập trình. Muốn làm marketing thì phải viết content. Còn nếu muốn sáng tạo thì phải theo thiết kế. Mình đã thử tìm hiểu qua những hướng đó, nhưng càng đi sâu, mình càng nhận ra một vấn đề lớn: mình đang chọn nghề dựa trên những gì "nghe có vẻ đúng", chứ không phải dựa trên nhu cầu thực sự của thị trường.' },
  { type: 'normal', text: 'Cho đến khi mình dừng lại và nhìn thị trường một cách rõ ràng hơn, mình nhận ra mọi thứ đang dần hội tụ về một điểm chung. Người ta không còn đọc nhiều như trước. Họ cũng không dừng lại lâu vì một tấm hình. Nhưng họ sẵn sàng dành hàng giờ để xem video. Từ TikTok, Instagram, YouTube cho đến quảng cáo và xây dựng thương hiệu cá nhân, video đang trở thành trung tâm của sự chú ý.' },
  { type: 'highlight', text: 'Không phải nghề nào "ngầu hơn" hay "khó hơn" sẽ kiếm được nhiều tiền hơn mà là kỹ năng nào thị trường đang cần nhất.' },
  { type: 'normal', text: 'Copywriter viết để bán hàng. Designer tạo hình ảnh để hỗ trợ. Coder xây dựng hệ thống phía sau. Nhưng video lại là thứ kết nối tất cả lại với nhau. Một video tốt không chỉ truyền tải thông điệp và cảm xúc, mà còn có khả năng tạo ra chuyển đổi thứ trực tiếp mang lại doanh thu.' },
  { type: 'normal', text: 'Nói cách khác, chỉnh sửa video không chỉ là một kỹ năng riêng lẻ, mà là điểm giao của nhiều kỹ năng tạo ra tiền.' },
  { type: 'normal', text: 'Nhưng vấn đề là phần lớn editor chỉ dừng lại ở việc "cắt cho đẹp". Họ không nghĩ đến việc video đó sẽ tạo ra doanh thu như thế nào. Và đó chính là lý do họ bị kẹt ở những công việc nhỏ, bị ép giá và không thể phát triển xa hơn.' },
  { type: 'secret', text: 'Khách hàng quốc tế không cần một editor làm hiệu ứng quá màu mè. Thứ họ thực sự cần là một người hiểu cách tạo ra video có khả năng chuyển đổi video giúp họ bán được hàng, thu hút khách hàng và phát triển thương hiệu.' },
  { type: 'normal', text: 'Chính khoảnh khắc đó, mình bắt đầu thay đổi hoàn toàn chiến lược. Mình không còn tập trung vào việc làm video "đẹp", mà tập trung vào việc làm video "hiệu quả" video có mục tiêu rõ ràng và mang lại kết quả cụ thể cho khách hàng.' },
  { type: 'normal', text: 'Và cũng từ quá trình đó, Viral Freedom System dần được hình thành. Đây không đơn thuần là một khóa học giúp bạn chỉnh sửa video giỏi hơn. Đây là một lộ trình từng bước, rõ ràng, giúp bạn đi từ con số 0 đến $1,000 đầu tiên mỗi tháng bằng kỹ năng Video Editing, theo cách mà thị trường thực sự trả tiền.' },
  { type: 'normal', text: 'Một hệ thống không chỉ dạy bạn làm nghề, mà giúp bạn hiểu cách dùng kỹ năng để tạo ra thu nhập và xây dựng cuộc sống tự do mà bạn mong muốn.' },
]

function WhyBlock({ type, text }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  if (type === 'highlight') return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
      className="rounded-xl border border-blue-500/20 bg-blue-500/[0.06] px-5 py-4"
    >
      <p className="text-base font-semibold text-blue-100 leading-relaxed">{text}</p>
    </motion.div>
  )

  if (type === 'secret') return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
      className="rounded-xl border border-emerald-500/25 bg-emerald-500/[0.06] px-5 py-4"
    >
      <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-2">Bí mật của thị trường</p>
      <p className="text-base text-emerald-100 leading-relaxed">{text}</p>
    </motion.div>
  )

  return (
    <motion.p ref={ref}
      initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45 }}
      className="text-base text-slate-400 leading-relaxed"
    >
      {text}
    </motion.p>
  )
}

export function Vision({ onCTA }) {
  const compareRef = useRef(null)
  const compareInView = useInView(compareRef, { once: true, margin: '-80px' })
  const whyRef = useRef(null)
  const whyInView = useInView(whyRef, { once: true, margin: '-80px' })

  return (
    <section className="py-24 px-6 bg-slate-900/20">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="inline-block mb-4 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">Sau 90 Ngày</p>
          <h2 className="font-heading text-3xl font-extrabold text-white md:text-4xl leading-tight">
            Vậy cuộc sống của bạn sẽ trông như thế nào<br />
            sau khi hoàn thành<br />
            lộ trình này?
          </h2>

          {/* Hình minh hoạ */}
          <div className="mt-10 flex justify-center">
            <img
              src="/hinh fix so 1.jpg"
              alt="Sau 90 ngày"
              className="w-full rounded-2xl object-cover"
              style={{ aspectRatio: '1/1', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}
            />
          </div>
        </motion.div>

        {/* Morning narrative */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 rounded-3xl border border-blue-500/20" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/8 via-transparent to-violet-800/8" />
          <div className="relative p-8 md:p-10 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-500/30" />
              <span className="text-2xl text-blue-400 font-serif">"</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-500/30" />
            </div>
            <p className="text-lg font-bold text-white">Một buổi sáng. Không có tiếng chuông.</p>
            <p className="leading-relaxed text-slate-300">Bạn thức dậy tự nhiên không phải vì phải dậy, mà vì cơ thể đã ngủ đủ và sẵn sàng. Xung quanh yên tĩnh. Không có tiếng còi xe, không có mùi khói bụi, không có cái cảm giác ngột ngạt của một thành phố đang vội vã mà bạn buộc phải chạy theo.</p>
            <p className="leading-relaxed text-slate-300"><strong className="text-white">Bạn không cần nhìn sắc mặt ai hôm nay.</strong> Không có sếp. Không có KPI. Không có cuộc họp 8 giờ sáng mà bạn phải có mặt trước khi kịp uống cà phê.</p>
            <p className="leading-relaxed text-slate-300">Bạn mở điện thoại, ngân hàng vừa báo có tiền vào lúc nửa đêm trong khi bạn đang ngủ. Client ở Mỹ. Thanh toán tự động. Đều đặn như lịch.</p>
            <p className="leading-relaxed text-slate-300">Bạn pha cà phê, mở laptop, làm việc vài tiếng ở bất cứ đâu bạn muốn, theo lịch bạn tự đặt.</p>
            <p className="leading-relaxed text-slate-300">Rồi đến một buổi chiều thứ Tư không phải thứ Bảy, không phải ngày lễ bạn đột nhiên nghĩ đến bố mẹ. Bạn đặt vé, ghé siêu thị mua mấy thứ họ thích, lên xe về quê.</p>
            <p className="leading-relaxed text-white font-semibold">Không xin phép ai. Không lo mất ngày công. Không tính toán xem tháng này còn đủ tiền không. Chỉ đơn giản là bạn muốn, và bạn đi.</p>
          </div>
        </motion.div>

        {/* Before / After */}
        <div ref={compareRef} className="mb-10 grid gap-5 md:grid-cols-2">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={compareInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-red-500/20 bg-red-900/[0.07] p-6"
          >
            <h4 className="font-heading mb-5 flex items-center gap-2 font-semibold text-red-400">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/20 border border-red-500/30">
                <X size={12} />
              </div>
              Bạn sẽ không còn phải...
            </h4>
            <ul className="space-y-4">
              {befores.map((text, i) => (
                <motion.li key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={compareInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 mt-1 h-5 w-5 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
                    <X size={9} className="text-red-400" strokeWidth={3} />
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{text}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={compareInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-emerald-500/25 bg-emerald-900/[0.07] p-6"
          >
            <h4 className="font-heading mb-5 flex items-center gap-2 font-semibold text-emerald-400">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30">
                <Check size={12} />
              </div>
              Thay vào đó...
            </h4>
            <ul className="space-y-4">
              {afters.map((text, i) => (
                <motion.li key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={compareInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 mt-1 h-5 w-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    <Check size={9} className="text-emerald-400" strokeWidth={3} />
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{text}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Reality check */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center"
        >
          <p className="text-base font-semibold text-white mb-2">Đây không phải viễn cảnh xa vời.</p>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xl mx-auto">
            Đây là thực tế của những bạn trẻ bình thường không giỏi tiếng Anh sẵn, không có portfolio hoành tráng, không có mối quan hệ nước ngoài nhưng <span className="text-white font-medium">có đúng hệ thống và không bỏ cuộc.</span>
          </p>
        </motion.div>

        {/* Why Video Editing */}
        <motion.div
          ref={whyRef}
          initial={{ opacity: 0, y: 24 }}
          animate={whyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <MagicCard className="p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 border border-blue-500/25">
                <Clapperboard size={20} className="text-blue-400" />
              </div>
              <h3 className="font-heading text-xl font-bold text-white">
                Tại sao là Video Editing chứ không phải kỹ năng khác?
              </h3>
            </div>

            <div className="space-y-5 mb-8">
              {whyParagraphs.slice(0, 2).map((p, i) => <WhyBlock key={i} {...p} />)}
            </div>

            {/* Role cards */}
            <div className="mb-8 grid gap-3 grid-cols-2 md:grid-cols-4">
              {roleCards.map(({ role, desc, highlight }, i) => (
                <motion.div key={role}
                  initial={{ opacity: 0, y: 12 }}
                  animate={whyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className={`relative rounded-2xl p-4 text-center border ${
                    highlight
                      ? 'border-blue-500/40 bg-blue-900/30 shadow-[0_0_20px_rgba(59,130,246,0.12)]'
                      : 'border-slate-700/40 bg-white/[0.02]'
                  }`}
                >
                  {highlight && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-2.5 py-0.5 text-[9px] font-bold text-white whitespace-nowrap">✦ Bạn</div>
                  )}
                  <p className={`font-heading text-sm font-bold mb-1 ${highlight ? 'text-blue-300' : 'text-white'}`}>{role}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="space-y-5">
              {whyParagraphs.slice(2).map((p, i) => <WhyBlock key={i} {...p} />)}
            </div>
          </MagicCard>
        </motion.div>

      </div>
    </section>
  )
}
