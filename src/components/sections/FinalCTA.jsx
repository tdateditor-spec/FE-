import { ShimmerButton } from '../ui/ShimmerButton'
import { TextReveal } from '../ui/TextReveal'

export function FinalCTA({ onCTA }) {
  return (
    <section className="relative overflow-hidden py-24 px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-blue-800/15" />

      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="font-heading mb-6 text-3xl font-bold text-white leading-tight md:text-5xl">
          <TextReveal text="Hai Con Đường Phía Trước Bạn" />
        </h2>

        <div className="mb-12 grid gap-5 text-left md:grid-cols-2">
          <div className="rounded-2xl border border-red-500/20 bg-white/[0.03] p-6">
            <h4 className="font-heading mb-3 font-semibold text-red-400">Con đường 1</h4>
            <p className="text-sm leading-relaxed text-slate-400">
              Đóng trang này, tiếp tục xem YouTube (lời khuyên mâu thuẫn nhau), đăng Upwork tiếp tục im lặng. 3 tháng sau, vẫn ở đúng chỗ này, thu nhập không ổn định, vẫn tự hỏi "bao giờ mới bắt đầu được."
            </p>
          </div>
          <div className="rounded-2xl border border-blue-500/30 bg-white/[0.03] p-6">
            <h4 className="font-heading mb-3 font-semibold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">Con đường 2</h4>
            <p className="text-sm leading-relaxed text-slate-400">
              Tham gia VIRAL FREEDOM SYSTEM với 799,000đ. 90 ngày sau, bạn có kỹ năng, portfolio, hệ thống tìm client và có thể đang trên đường đến 20–40 triệu/tháng như Kiên, Bình, Huy.
            </p>
          </div>
        </div>

        <ShimmerButton onClick={onCTA} className="mb-6 text-sm sm:text-xl px-6 sm:px-12 py-4 sm:py-5 animate-pulse-blue w-full sm:w-auto">
          → TÔI SẴN SÀNG. BẮT ĐẦU VIRAL FREEDOM SYSTEM NGAY
        </ShimmerButton>

<div className="mx-auto max-w-2xl rounded-2xl border border-slate-800 bg-white/[0.03] p-7 text-left">
          <p className="text-sm leading-relaxed text-slate-300">
            <strong className="text-white">P.S.</strong>{' '}
            <em>799,000đ. Thứ duy nhất bạn thật sự mất nếu không thử, là thêm 3 tháng nữa vẫn đứng ở đúng chỗ này.</em>
          </p>
        </div>
      </div>
    </section>
  )
}
