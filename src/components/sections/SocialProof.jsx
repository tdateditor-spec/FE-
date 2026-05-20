import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ShimmerButton } from '../ui/ShimmerButton'
import { AnimatedTestimonials } from '../ui/AnimatedTestimonials'

const testimonials = [
  {
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=480&fit=crop&crop=face',
    name: 'Kiên, 23 tuổi',
    tag: 'Freelancer không ổn định → Client dài hạn ổn định',
    result: '~40 triệu/tháng',
    fear: '"Mình sẽ mãi như thế này mà không biết cách thoát ra."',
    back: 'Kiên không phải người mới. Có việc, có tiền, nhưng không đều. Tháng được tháng không, không biết job tiếp theo đến từ đâu.',
    quote: 'Trước đây mình có kỹ năng nhưng không có hệ thống. Mình cứ nhận việc theo kiểu ai thuê thì làm, không chủ động được gì. Bây giờ mình biết chính xác mình cần làm gì để thu nhập không bị phụ thuộc vào may rủi nữa.',
    sub: 'Từ client dài hạn ổn định, không còn lo "tháng này có việc không"',
  },
  {
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=480&fit=crop&crop=face',
    name: 'Bình, Sinh viên',
    tag: 'Thu nhập = 0 → 25 triệu trong khi vẫn đi học',
    result: '25 triệu/tháng',
    fear: '"Mình còn đang đi học, liệu client nước ngoài có thuê mình không?"',
    back: 'Không có kinh nghiệm, không có portfolio thật. Tiếng Anh đủ đọc hiểu nhưng chưa bao giờ dùng để giao tiếp chuyên nghiệp.',
    quote: 'Mình không nghĩ sinh viên như mình có thể làm được điều này. Hoá ra rào cản không phải bằng cấp hay kinh nghiệm, mà là không biết bắt đầu từ đâu. Khi có lộ trình rõ ràng, mọi thứ đơn giản hơn mình tưởng rất nhiều.',
    sub: 'Biết rõ 6 tháng tới mình sẽ ở đâu, làm gì để tăng lên mức tiếp theo',
  },
  {
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=480&fit=crop&crop=face',
    name: 'Huy, Nhân viên văn phòng',
    tag: 'Làm song song buổi tối → Thay thế hoàn toàn lương VP',
    result: '20 triệu/tháng',
    fear: '"Nếu mình bỏ việc mà freelance không ra tiền thì sao?"',
    back: 'Có công việc ổn định, có lương, nhưng mỗi sáng thức dậy đều biết hôm nay sẽ trôi qua như hôm qua. Muốn thoát nhưng không biết lối ra.',
    quote: 'Điều mình cần không phải là dũng cảm hơn, mà là một kế hoạch đủ rõ để mình biết mình đang đi đúng hướng. Khi có kế hoạch đó, việc bắt đầu không còn đáng sợ nữa.',
    sub: 'Làm buổi tối + cuối tuần, có lộ trình thay thế hoàn toàn lương văn phòng',
  },
]

export function SocialProof({ onCTA }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="proof" className="py-24 px-6 bg-slate-900/20">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
            Kết Quả Thực Tế
          </span>
          <h2 className="font-heading text-4xl font-extrabold text-white md:text-5xl mb-4">
            3 Người Thật<br className="hidden md:block" /> 3 Xuất Phát Điểm Như Bạn
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Không ai trong số họ có điều kiện lý tưởng. Thứ duy nhất khác biệt là họ có hệ thống đúng.
          </p>
        </motion.div>

        {/* Animated Testimonials */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <AnimatedTestimonials testimonials={testimonials} autoplay autoplayDelay={4500} />
        </motion.div>

        {/* Summary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="rounded-3xl border border-blue-600/20 bg-blue-950/20 p-8 text-center"
        >
          <h3 className="font-heading mb-4 text-xl font-bold text-white">
            3 người, 3 xuất phát điểm khác nhau:
          </h3>
          <div className="mb-6 flex flex-wrap justify-center gap-3">
            {[
              'Freelancer không ổn định',
              'Sinh viên chưa có gì',
              'Nhân viên văn phòng muốn thoát',
            ].map(t => (
              <span key={t} className="rounded-xl border border-slate-700/60 bg-white/[0.03] px-4 py-1.5 text-sm text-slate-400">
                {t}
              </span>
            ))}
          </div>
          <p className="mb-2 text-slate-400 max-w-lg mx-auto">
            Không ai trong số họ có điều kiện "lý tưởng" khi bắt đầu. Họ chỉ có một hệ thống rõ ràng, và quyết định làm theo từng bước.
          </p>
          <p className="mb-7 text-lg font-semibold text-white">
            👉 Nếu họ làm được, liệu bạn có làm được không?
          </p>
          <ShimmerButton onClick={onCTA} className="text-base px-8 py-4">
            → Tôi Muốn Bắt Đầu Ngay
          </ShimmerButton>
        </motion.div>
      </div>
    </section>
  )
}
