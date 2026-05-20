import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const paragraphs = [
  {
    type: 'quote',
    text: 'Có một sự thật mà rất ít người nói với bạn: Bạn không cần phải giỏi ngay từ đầu để bắt đầu.',
  },
  {
    type: 'normal',
    text: '2 năm trước, mình cũng từng ở vị trí giống bạn. Không rõ ràng về tương lai, không biết mình thực sự phù hợp với điều gì. Mình chọn học IT vì nghĩ đó là con đường "an toàn" với sự kỳ vọng của gia đình, nhưng càng đi, mình càng nhận ra mình không thuộc về nó.',
  },
  {
    type: 'image',
    src: '/5.png',
    caption: 'Những ngày học IT con đường tưởng là đúng',
  },
  {
    type: 'normal',
    text: 'Và đó là lúc mình rơi vào một khoảng trống lớn, đứng giữa hai ngã rẽ: đi tiếp hay bắt đầu lại từ đầu.',
  },
  {
    type: 'normal',
    text: 'Nhưng vấn đề không phải là chọn hướng nào, mà là mình gần như không có gì trong tay. Không kỹ năng, không kinh nghiệm kiếm tiền online, và tiếng Anh cũng không phải lợi thế.',
  },
  {
    type: 'normal',
    text: 'Mình bắt đầu tìm kiếm mọi ngóc ngách để tìm một lối thoát. Và rồi mình tình cờ thấy một video về một người cũng bắt đầu từ con số 0, nhưng có thể kiếm tiền từ việc edit video.',
  },
  {
    type: 'highlight',
    text: 'Điều khiến mình chú ý không phải là số tiền họ kiếm được, mà là cách họ bắt đầu: không cần giỏi ngay từ đầu, không cần nền tảng, chỉ cần một chiếc laptop và Internet.',
  },
  {
    type: 'normal',
    text: 'Lần đầu tiên, mình nghĩ: "Có thể… đây là thứ mình làm được." Và đó là cách mình bước vào con đường Video Editing, không phải vì mình giỏi, mà vì mình tin đây là cơ hội phù hợp để bắt đầu lại từ con số 0.',
  },
  {
    type: 'normal',
    text: 'Mình bắt đầu học từng chút một, nhận những job nhỏ đầu tiên, va vấp với khách hàng, định giá sai và làm lại rất nhiều lần. Nhưng càng làm mình càng nhận ra một điều quan trọng: khách hàng không trả tiền chỉ vì mình biết edit video, họ trả tiền vì video đó giúp họ giữ chân người xem, xây thương hiệu và tạo ra kết quả thật.',
  },
  {
    type: 'normal',
    text: 'Đó là lúc mình ngừng học edit theo kiểu chắp vá, và bắt đầu xây dựng một quy trình rõ ràng: hiểu tâm lý người xem, cấu trúc nội dung giữ chân, storytelling, tối ưu hình ảnh và cách biến video thành công cụ tăng trưởng cho khách hàng.',
  },
  {
    type: 'highlight',
    text: 'Khi mình có đúng phương pháp, mọi thứ bắt đầu thay đổi. Mình không còn bị giới hạn bởi vị trí địa lý, không còn phụ thuộc vào giờ giấc cố định, và cũng không còn phải chờ ai "cho cơ hội".',
  },
  {
    type: 'normal',
    text: 'Chỉ cần một chiếc laptop và kết nối Internet, mình có thể làm việc ở bất cứ đâu, bất cứ khi nào mình muốn.',
  },
  {
    type: 'normal',
    text: 'Và điều quan trọng nhất là: bạn cũng có thể làm được điều đó. Ngay cả khi bạn chưa từng edit, không có kinh nghiệm, hay không giỏi tiếng Anh.',
  },
  {
    type: 'normal',
    text: 'Bởi vì thứ bạn cần không phải là tài năng bẩm sinh, mà là một lộ trình đúng, một hệ thống rõ ràng, và một người đi trước chỉ cho bạn từng bước. Đó chính là lý do mình tạo ra lộ trình này.',
  },
]

function StoryBlock({ type, text, src, caption }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  if (type === 'image') return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="my-2"
    >
      <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
        <img src={src} alt={caption} className="w-full object-contain grayscale" />
      </div>
      {caption && (
        <p className="mt-2 text-center text-xs text-slate-600 italic">{caption}</p>
      )}
    </motion.div>
  )

  if (type === 'quote') return (
    <motion.blockquote
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="border-l-4 border-blue-500 pl-5 py-1"
    >
      <p className="text-lg font-semibold text-white italic leading-relaxed">{text}</p>
    </motion.blockquote>
  )

  if (type === 'highlight') return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-blue-500/20 bg-blue-500/[0.06] px-5 py-4"
    >
      <p className="text-base text-blue-100 leading-relaxed">{text}</p>
    </motion.div>
  )

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45 }}
      className="text-base text-slate-400 leading-relaxed"
    >
      {text}
    </motion.p>
  )
}

export function OriginStory() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })
  const conclusionRef = useRef(null)
  const conclusionInView = useInView(conclusionRef, { once: true, margin: '-80px' })

  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 16 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="inline-block mb-4 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">Câu Chuyện Thật</p>
          <h2 className="font-heading text-3xl font-extrabold text-white md:text-4xl leading-tight">
            Từ Mất Phương Hướng Đến<br />
            <span className="text-emerald-400">Thu Nhập 9 Chữ Số Mỗi Tháng</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base max-w-xl mx-auto">
            Từ kỹ năng thu nhập cao Video Editing. Không phải bằng may mắn, mà bằng một lộ trình đúng.
          </p>
        </motion.div>

        {/* Story paragraphs */}
        <div className="space-y-5">
          {paragraphs.map((p, i) => <StoryBlock key={i} {...p} />)}
        </div>

        {/* Conclusion */}
        <motion.div
          ref={conclusionRef}
          initial={{ opacity: 0, y: 24 }}
          animate={conclusionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mt-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-7 text-center"
        >
          <p className="text-base font-medium text-white leading-relaxed max-w-2xl mx-auto">
            Để giúp bạn đi từ con số 0, có khách hàng đầu tiên, tạo ra thu nhập và xây dựng một công việc mang lại cho bạn sự tự do thực sự.{' '}
            <span className="text-emerald-300 font-semibold">
              Nếu bạn muốn rút ngắn 2 năm va vấp của mình xuống còn 90 ngày đây chính là lộ trình dành cho bạn.
            </span>
          </p>
        </motion.div>

      </div>
    </section>
  )
}
