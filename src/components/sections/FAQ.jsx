import { useState } from 'react'

const faqs = [
  { q: 'Tôi chưa có kinh nghiệm gì, có theo được không?', a: 'Được. Chapter 1 được thiết kế đặc biệt cho người chưa có portfolio thật, chưa từng làm việc với client nước ngoài. Bạn sẽ build portfolio từ zero trong Chapter 2 trước khi bước vào phần tìm client.' },
  { q: 'Tiếng Anh tôi rất kém, có sao không?', a: 'Không. Bạn không cần nói tiếng Anh trôi chảy, bạn chỉ cần copy đúng template vào đúng chỗ. 10 template DM đã viết sẵn, bạn chỉ điền thông tin và gửi. Kết hợp với ChatGPT theo cách chúng mình hướng dẫn, bạn communicate như native speaker mà không cần học thêm tiếng Anh.' },
  { q: 'Tôi đang đi học / đi làm full-time, có đủ thời gian không?', a: 'Cần khoảng 1–2 tiếng mỗi ngày trong giai đoạn đầu. Bình vừa đi học vừa làm được 25 triệu/tháng. Huy vừa đi làm văn phòng vừa xây được 20 triệu/tháng. Thời gian không phải vấn đề, thiếu lộ trình mới là vấn đề.' },
  { q: 'Thu nhập $1,000–$3,000/tháng có thực tế không?', a: 'Kiên: ~40 triệu/tháng. Bình: 25 triệu. Huy: 20 triệu. Cả ba đều bắt đầu không có gì đặc biệt hơn bạn. Kết quả có thể khác nhau tùy cá nhân, nhưng hệ thống đã được kiểm chứng qua nhiều người ở nhiều xuất phát điểm khác nhau.' },
  { q: 'Tại sao giá chỉ 799K, không phải 4,800,000đ?', a: 'Đây là cohort đầu tiên, nhóm nhỏ để theo dõi chuyên sâu, thu kết quả thật và hoàn thiện chương trình trước khi mở rộng. Sau cohort này giá sẽ về 4,800,000đ. Bạn được hưởng lợi từ việc tham gia sớm nhất.' },
  { q: 'Cần phần mềm gì? Có tốn thêm tiền không?', a: 'Khóa học dùng Premiere Pro và After Effects, 2 phần mềm chuẩn quốc tế mà client nước ngoài yêu cầu. Trong Chapter 2 sẽ hướng dẫn cách tiếp cận phần mềm phù hợp với ngân sách của bạn, kể cả các lựa chọn miễn phí để bắt đầu.' },
  { q: 'Sau 90 ngày có còn truy cập được nội dung không?', a: 'Có, truy cập video vĩnh viễn, không giới hạn thời gian. Discord community vẫn mở sau 90 ngày. Bạn có thể xem lại bất kỳ bài học nào, bất cứ lúc nào.' },
  { q: 'Đăng ký xong có học ngay được không?', a: 'Có, link truy cập được gửi trong vòng 24 giờ sau khi thanh toán được xác nhận. Bạn có thể bắt đầu Chapter 1 ngay trong ngày hôm đó.' },
  { q: 'Làm sao để không bỏ ngang giữa chừng như những lần trước?', a: 'Cấu trúc module tuần tự giúp bạn không bị lạc, mỗi bước dẫn thẳng vào bước tiếp theo. Discord community luôn có người trả lời khi bạn bị stuck. Và bonus "The Consistency Code" dạy chính xác cách duy trì kỷ luật 90 ngày.' },
  { q: 'Khóa học này có thực sự dành cho tôi không?', a: 'Nếu bạn muốn tự chủ tài chính, sẵn sàng bỏ ra 1–2 tiếng/ngày trong 90 ngày và làm theo hệ thống, thì đây chính xác là thứ bạn cần. Thứ duy nhất bạn thật sự mất nếu không thử, là thêm 3 tháng nữa vẫn đứng ở đúng chỗ này.' },
]

export function FAQ({ onCTA }) {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="py-20 px-6 bg-slate-900/20">
      <div className="mx-auto max-w-3xl">
        <p className="inline-block mb-4 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">FAQ</p>
        <h2 className="font-heading mb-14 text-center text-4xl font-extrabold text-white md:text-5xl">Câu Hỏi Thường Gặp</h2>

        <div className="space-y-3">
          {faqs.map(({ q, a }, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03]">
              <button
                className="flex w-full items-center justify-between p-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-heading pr-4 text-sm font-semibold text-white">{q}</span>
                <span className={`flex-shrink-0 text-xl text-blue-400 transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              <div className={`overflow-hidden transition-all duration-400 ${open === i ? 'max-h-96' : 'max-h-0'}`}>
                <p className="px-5 pb-5 text-sm leading-relaxed text-slate-400">{a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={onCTA}
            className="inline-block rounded-2xl bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 px-10 py-4 font-heading text-lg font-bold text-white shadow-[0_0_30px_rgba(59,130,246,0.35)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] hover:-translate-y-0.5 transition-all"
          >
            → TÔI SẴN SÀNG. BẮT ĐẦU NGAY
          </button>
        </div>
      </div>
    </section>
  )
}
