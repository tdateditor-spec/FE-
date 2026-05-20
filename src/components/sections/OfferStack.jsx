const items = [
  { tag: 'CORE', name: 'Chapter 1: Mindset: Reset tư duy + Roadmap $1,000 đầu tiên', price: '1,500,000đ' },
  { tag: 'CORE', name: 'Chapter 2: Kỹ năng: Premiere Pro + After Effects theo chuẩn thị trường quốc tế', price: '3,500,000đ' },
  { tag: 'CORE', name: 'Chapter 3: Thu nhập: Hệ thống tìm client Instagram, Cold DM, đàm phán, giữ client dài hạn', price: '2,500,000đ' },
  { tag: 'BONUS', name: 'Cộng đồng Discord, hỏi đáp, chia sẻ tiến trình, kết nối học viên', price: '600,000đ' },
  { tag: 'BONUS ẨN #1', name: 'Bộ 10 Template Cold DM tiếng Anh + Lịch outreach 30 ngày', price: '800,000đ' },
  { tag: 'BONUS ẨN #2', name: 'Script xử lý 10 tình huống đàm phán với client', price: '500,000đ' },
  { tag: 'BONUS ẨN #3', name: '"The Consistency Code", Hệ thống giữ kỷ luật 90 ngày', price: '300,000đ' },
  { tag: 'BONUS #4', name: '"The $0 Portfolio Blueprint", Build portfolio khi chưa có client', price: '400,000đ' },
  { tag: 'BONUS #5', name: '"The Rate Raise Script", Cách tăng giá mà không mất client', price: '400,000đ' },
  { tag: 'BONUS #6', name: 'Hướng dẫn mở Payoneer/Wise nhận tiền quốc tế', price: '200,000đ' },
]

export function OfferStack({ onCTA }) {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-3xl">
        <p className="inline-block mb-4 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">Toàn Bộ Gói</p>
        <h2 className="font-heading mb-12 text-center text-4xl font-extrabold text-white md:text-5xl">
          Bạn Nhận Được Tất Cả Những Gì Sau Đây
        </h2>

        <div className="overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.03]">
          {items.map(({ tag, name, price }, i) => {
            const isCore = tag === 'CORE'
            const isHidden = tag.includes('ẨN')
            const tagColor = isCore ? 'text-blue-400' : isHidden ? 'text-purple-400' : 'text-green-400'
            return (
              <div key={i} className="flex items-center justify-between border-b border-slate-800/70 p-5 last:border-0 hover:bg-white/[0.02] transition-colors">
                <div>
                  <p className={`mb-1 text-xs font-semibold ${tagColor}`}>{tag}</p>
                  <h4 className="font-heading text-sm font-semibold text-white">{name}</h4>
                </div>
                <span className="ml-4 whitespace-nowrap text-xs text-slate-500">{price}</span>
              </div>
            )
          })}

          <div className="bg-gradient-to-br from-blue-900/20 to-transparent p-6">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-slate-400">Tổng giá trị:</span>
              <span className="text-slate-400">~10,700,000đ</span>
            </div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-slate-400">Giá bình thường:</span>
              <span className="text-slate-400">4,800,000đ</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-white">Giá ra mắt hôm nay:</span>
              <span className="font-heading text-3xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">799,000đ</span>
            </div>
            <p className="mt-1 text-right text-xs text-blue-400">Chỉ áp dụng cho cohort đầu tiên</p>
            <button
              onClick={onCTA}
              className="mt-5 w-full rounded-2xl bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 py-4 font-heading font-bold text-white shadow-[0_0_30px_rgba(59,130,246,0.35)] transition-all hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] hover:-translate-y-0.5 text-lg"
            >
              → TÔI MUỐN VÀO NGAY. CHỈ 799,000Đ
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
