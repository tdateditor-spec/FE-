import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const API          = import.meta.env.VITE_API_URL || 'https://server-pied-kappa.vercel.app'
const DISCORD_URL  = 'https://discord.gg/U3VG5fd9f'

const ADDONS = [
  {
    key: 'music',
    name: 'Sound Design & Premium Background Music',
    paragraphs: [
      'Một video có thể được edit rất đẹp, nhưng nếu âm thanh không đủ chất lượng, người xem vẫn sẽ cảm thấy nó thiếu chuyên nghiệp và dễ mất hứng thú chỉ sau vài giây đầu tiên.',
      'Đó là lý do các creator, agency và editor hàng đầu luôn đầu tư rất nhiều vào Sound Design và Background Music để tăng cảm xúc, tăng khả năng giữ chân người xem và nâng cao trải nghiệm tổng thể của video.',
      'Trong bộ tài nguyên này, bạn sẽ nhận được kho Sound Effects và Premium Background Music được tuyển chọn kỹ lưỡng, giúp bạn tiết kiệm hàng giờ tìm kiếm và dễ dàng áp dụng vào mọi dự án chỉ trong vài cú kéo thả.',
    ],
    highlight: 'Hôm nay bạn có thể sở hữu toàn bộ thư viện này với mức giá đặc biệt chỉ 299.000đ.',
    originalPrice: 599000,
    price: 299000,
    code: 'M',
  },
  {
    key: 'plugin',
    name: 'Atom Plugin & Premium Presets Collection',
    paragraphs: [
      'Một trong những lý do khiến editor mất hàng giờ cho mỗi dự án không phải vì thiếu kỹ năng, mà vì phải lặp đi lặp lại những thao tác thủ công mỗi ngày.',
      'Bộ Atom Plugin & Premium Presets Collection bao gồm những plugin, preset và thiết lập mà tôi đã chọn lọc, tinh chỉnh và sử dụng trong quá trình làm việc với khách hàng thực tế.',
      'Nếu được sử dụng đúng cách, bộ tài nguyên này hoàn toàn có thể giúp bạn cắt giảm tới 50% thời gian chỉnh sửa, đồng thời giữ được chất lượng đầu ra chuyên nghiệp và nhất quán hơn.',
    ],
    highlight: 'Hôm nay bạn có thể sở hữu toàn bộ bộ tài nguyên này với mức giá đặc biệt chỉ 499.000đ.',
    originalPrice: 899000,
    price: 499000,
    code: 'P',
  },
]

const COMMUNITY_NOTE = 'Mức giá hiện tại chỉ áp dụng trong giai đoạn ra mắt và sẽ sớm được điều chỉnh tăng trong thời gian tới để đảm bảo chất lượng đầu vào của cộng đồng. Khi tham gia Viral Freedom, bạn không chỉ nhận được lộ trình học và tài nguyên, mà còn được truy cập vào cộng đồng editor, creator và freelancer đang cùng nhau phát triển mỗi ngày.'

const fmtVND = (n) => n.toLocaleString('vi-VN') + 'đ'
const genOrder = () => 'WS-' + Date.now().toString(36).slice(-6).toUpperCase()

export function Checkout({ onBack }) {
  const [step, setStep]       = useState('form')   // 'form' | 'checkout'
  const [addOns, setAddOns]   = useState({ music: false, plugin: false })
  const [copied, setCopied]   = useState(null)
  const [form, setForm]       = useState({ name: '', phone: '', email: '' })
  const [err, setErr]         = useState('')
  const [loading, setLoading] = useState(false)
  const [orderCode]           = useState(genOrder)
  const pollRef               = useRef(null)

  const totalAmount = 799000 + (addOns.music ? 299000 : 0) + (addOns.plugin ? 499000 : 0)
  const phone       = form.phone.replace(/\s/g, '')
  const courseCode  = ['E', addOns.music && 'M', addOns.plugin && 'P'].filter(Boolean).join('')
  const noiDung     = `VFS ${phone} ${courseCode}`
  const qrUrl       = `https://qr.sepay.vn/img?acc=0368683148&bank=MBBank&amount=${totalAmount}&des=${encodeURIComponent(noiDung)}&template=compact`

  const stopPolling = () => {
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null }
  }

  const startPolling = (email) => {
    stopPolling()
    pollRef.current = setInterval(async () => {
      try {
        const res  = await fetch(`${API}/api/register/status?email=${encodeURIComponent(email)}`)
        const data = await res.json()
        if (data.paid) {
          stopPolling()
          const amt = 799000 + (addOns.music ? 299000 : 0) + (addOns.plugin ? 499000 : 0)
          window.history.pushState({}, '', `/thankyou?email=${encodeURIComponent(email)}&amount=${amt}`)
          window.dispatchEvent(new PopStateEvent('popstate'))
        }
      } catch {}
    }, 4000)
  }

  useEffect(() => () => stopPolling(), [])

  const copy = async (text, key) => {
    await navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) { setErr('Vui lòng nhập họ tên'); return }
    if (!/^0\d{9}$/.test(form.phone.replace(/\s/g, ''))) { setErr('SĐT không hợp lệ (VD: 0901234567)'); return }
    if (!/\S+@\S+\.\S+/.test(form.email)) { setErr('Email không hợp lệ'); return }
    setErr('')
    setLoading(true)
    try {
      const res  = await fetch(`${API}/api/register`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name: form.name.trim(), phone: form.phone.replace(/\s/g, ''), email: form.email.trim() }),
      })
      const data = await res.json()
      if (!res.ok) { setErr(data.error || 'Có lỗi xảy ra'); setLoading(false); return }
      setStep('checkout')
      startPolling(form.email.trim())
    } catch {
      setErr('Không thể kết nối server, vui lòng thử lại')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#080f1e]">
      {/* Background glows */}
      <div className="pointer-events-none fixed -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none fixed bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-violet-800/10 blur-[100px]" />

      {/* Topbar */}
      <div className="border-b border-white/[0.06] bg-[#080f1e]/80 backdrop-blur-xl px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Quay lại
          </button>
          <div className="flex items-center gap-2">
            <img src="/logo Feak.png" alt="Logo" className="h-7 w-7 rounded-lg object-cover" />
            <span className="font-bold text-white text-sm tracking-tight">VIRAL FREEDOM</span>
          </div>
          <div className="w-20" /> {/* spacer */}
        </div>
      </div>

      {/* ── STEP 1: Form ── */}
      {step === 'form' && (
        <div className="relative mx-auto max-w-2xl px-4 py-10">
          <div className="text-center mb-8">
            <span className="rounded-full border border-blue-500/30 bg-blue-600/20 px-3 py-1 text-xs font-semibold text-blue-300">
              VIRAL FREEDOM SYSTEM
            </span>
            <h1 className="font-heading mt-4 text-2xl sm:text-3xl font-bold text-white">Đăng Ký Tham Gia</h1>
            <p className="mt-2 text-sm text-slate-400">Điền thông tin để tiến hành thanh toán</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0f1420] p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { field: 'name',  label: 'Họ và tên *',     type: 'text',  placeholder: 'Nguyễn Văn A' },
                { field: 'phone', label: 'Số điện thoại *', type: 'tel',   placeholder: '0901234567' },
                { field: 'email', label: 'Email *',          type: 'email', placeholder: 'email@gmail.com' },
              ].map(({ field, label, type, placeholder }) => (
                <div key={field}>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
                  <input
                    type={type}
                    value={form[field]}
                    onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500/60 focus:bg-blue-500/[0.06] transition-all"
                  />
                </div>
              ))}

              {err && <p className="text-xs text-red-400 text-center">{err}</p>}

              <button type="submit" disabled={loading}
                className="w-full rounded-2xl bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 py-4 font-heading font-bold text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2">
                {loading ? '⏳ Đang xử lý...' : '→ Tiếp Tục Thanh Toán'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── STEP 2: Checkout ── */}
      {step === 'checkout' && (
        <div className="relative mx-auto max-w-2xl px-4 py-8 space-y-5">
          {/* Header */}
          <div className="text-center">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
              Hoàn tất thanh toán
            </h2>
            <p className="text-sm text-slate-400">
              Chào <strong className="text-white">{form.name.toUpperCase()}</strong>, đơn hàng của bạn đã sẵn sàng.
            </p>
          </div>

          {/* ── 2 gói add-on nằm ngang hàng ── */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-3">
              Nâng cấp đơn hàng — ưu đãi chỉ dành riêng hôm nay
            </p>
            <div className="grid grid-cols-2 gap-3">
              {ADDONS.map(addon => {
                const sel = addOns[addon.key]
                const saving = Math.round((1 - addon.price / addon.originalPrice) * 100)
                return (
                  <div
                    key={addon.key}
                    onClick={() => setAddOns(p => ({ ...p, [addon.key]: !p[addon.key] }))}
                    className={`relative cursor-pointer rounded-2xl border p-4 flex flex-col gap-2.5 transition-all duration-200 ${
                      sel
                        ? 'border-blue-500/50 bg-blue-500/10 shadow-[0_0_24px_rgba(59,130,246,0.12)]'
                        : 'border-white/10 bg-white/[0.03] hover:border-blue-500/25 hover:bg-white/[0.05]'
                    }`}
                  >
                    {/* Checkbox */}
                    <div className={`absolute top-3 right-3 h-5 w-5 rounded-full flex items-center justify-center transition-all ${
                      sel ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'border border-white/20'
                    }`}>
                      {sel && (
                        <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>

                    {/* Saving badge */}
                    <span className="self-start rounded-full bg-emerald-500/15 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                      -{saving}%
                    </span>

                    {/* Name */}
                    <p className="text-xs font-semibold text-white leading-snug pr-6">{addon.name}</p>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[11px] text-slate-600 line-through">{fmtVND(addon.originalPrice)}</span>
                      <span className="font-heading font-bold text-blue-400">{fmtVND(addon.price)}</span>
                    </div>

                    {/* Description snippet */}
                    <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">{addon.paragraphs[0]}</p>

                    {/* Toggle button */}
                    <div className={`mt-auto w-full rounded-xl py-2 text-center text-[11px] font-bold transition-all ${
                      sel
                        ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                        : 'bg-blue-600/15 border border-blue-500/25 text-blue-300'
                    }`}>
                      {sel ? '✕ Bỏ khỏi đơn' : '+ Thêm vào đơn'}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── QR Code + Thông tin thanh toán ── */}
          <div className="rounded-2xl border border-white/10 bg-[#0d1018] p-5">
            <h3 className="font-heading font-bold text-white text-center text-sm mb-4">Quét QR để thanh toán</h3>

            <div className="flex gap-5 items-start">
              {/* QR */}
              <div className="flex-shrink-0">
                <div className="rounded-2xl bg-white p-2.5 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                  <img
                    className="h-[140px] w-[140px] rounded-xl"
                    src={qrUrl}
                    alt="VietQR"
                    onError={(e) => {
                      e.target.parentElement.innerHTML = '<div class="h-[140px] w-[140px] flex flex-col items-center justify-center bg-slate-800 rounded-xl text-slate-400 text-xs text-center p-4"><div class="text-3xl mb-1">📱</div>QR thanh toán</div>'
                    }}
                  />
                </div>
              </div>

              {/* Bank info + total */}
              <div className="flex-1 min-w-0 space-y-3">
                {/* Bank rows */}
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3 space-y-2 text-xs">
                  {[
                    { label: 'Ngân hàng',     value: 'MB Bank',           key: null },
                    { label: 'Số tài khoản',  value: '0368683148',        key: 'stk' },
                    { label: 'Chủ TK',        value: 'LE THANH DAT',      key: null },
                    { label: 'Nội dung CK',   value: noiDung,             key: 'nd' },
                  ].map(({ label, value, key }) => (
                    <div key={label} className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 flex-shrink-0">{label}</span>
                      {key ? (
                        <button onClick={() => copy(value, key)}
                          className={cn('rounded border px-2 py-0.5 font-mono text-[11px] transition-all',
                            copied === key
                              ? 'border-green-500/30 bg-green-500/15 text-green-300'
                              : 'border-slate-700 bg-slate-800 text-white hover:border-blue-500/40')}>
                          {copied === key ? '✓ Copied!' : `${value} ⧉`}
                        </button>
                      ) : (
                        <span className="font-semibold text-white text-right">{value}</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="rounded-xl border border-blue-500/30 bg-blue-500/[0.08] p-3">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-[11px] text-slate-400">Tổng thanh toán</span>
                    <span className="font-heading font-bold text-blue-400 text-lg">{fmtVND(totalAmount)}</span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>Khoá học chính</span><span>{fmtVND(799000)}</span>
                    </div>
                    {addOns.music && (
                      <div className="flex justify-between text-[11px] text-slate-500">
                        <span>+ Sound Design</span><span>{fmtVND(299000)}</span>
                      </div>
                    )}
                    {addOns.plugin && (
                      <div className="flex justify-between text-[11px] text-slate-500">
                        <span>+ Plugin</span><span>{fmtVND(499000)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Waiting */}
                <div className="rounded-xl border border-green-700/30 bg-green-900/20 px-3 py-2 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0"/>
                    <p className="text-xs font-semibold text-green-300">Đang chờ thanh toán...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Bạn nhận được ── */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
            <div className="px-5 py-3 border-b border-white/[0.07]">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-400">Bạn nhận được tất cả</p>
            </div>
            {[
              { tag: 'CORE',    color: 'text-blue-400',    name: 'Chapter 1: Mindset — Reset tư duy + Roadmap $1,000 đầu tiên' },
              { tag: 'CORE',    color: 'text-blue-400',    name: 'Chapter 2: Kỹ năng — Premiere Pro + After Effects chuẩn quốc tế' },
              { tag: 'CORE',    color: 'text-blue-400',    name: 'Chapter 3: Thu nhập — Tìm client, Cold DM, đàm phán, giữ client dài hạn' },
              { tag: 'BONUS',   color: 'text-emerald-400', name: 'Cộng đồng Discord hỗ trợ 24/7' },
              { tag: 'PREMIUM', color: 'text-yellow-400',  name: 'Truy cập & update miễn phí trọn đời' },
              { tag: 'PREMIUM', color: 'text-yellow-400',  name: 'Call 1-1 miễn phí trực tiếp' },
              { tag: 'BONUS',   color: 'text-emerald-400', name: '"The $0 Portfolio Blueprint"' },
              { tag: 'BONUS',   color: 'text-emerald-400', name: '"The Rate Raise Script"' },
            ].map(({ tag, color, name }, i) => (
              <div key={i} className="flex items-center gap-3 border-b border-white/[0.05] px-5 py-3 last:border-0">
                <span className="text-emerald-400 text-sm flex-shrink-0">✓</span>
                <div>
                  <span className={`text-[10px] font-bold ${color}`}>{tag} </span>
                  <span className="text-xs text-white">{name}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Học viên nói gì</p>
            {[
              { name: 'Nguyễn Minh Tuấn', role: 'Freelance Video Editor', avatar: 'MT', text: 'Trước khi học mình không biết gì về edit, chỉ sau 3 tuần đã nhận được khách hàng đầu tiên từ Instagram. Lộ trình rất rõ ràng và thực tế.' },
              { name: 'Trần Thị Hương',   role: 'Content Creator',        avatar: 'TH', text: 'Mình đã thử nhiều khoá khác nhưng đây là khoá duy nhất dạy mình cách tìm client thực sự. Tháng đầu kiếm được 8 triệu từ video editing.' },
              { name: 'Lê Quang Huy',     role: 'Video Editor - Agency',  avatar: 'QH', text: 'Chapter 3 về Sales là phần mình thấy giá trị nhất. Giờ mình có 3 client cố định, thu nhập ổn định hơn công việc văn phòng cũ nhiều.' },
            ].map(({ name, role, avatar, text }) => (
              <div key={name} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600/30 text-xs font-bold text-blue-300">{avatar}</div>
                  <div>
                    <p className="text-xs font-semibold text-white">{name}</p>
                    <p className="text-[10px] text-slate-500">{role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-xs">★</span>)}
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">"{text}"</p>
              </div>
            ))}
          </div>

          {/* Cam kết hoàn tiền */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-900/10 p-5 flex gap-4 items-start">
            <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xl">🛡️</div>
            <div>
              <p className="text-sm font-bold text-emerald-400 mb-1">Cam Kết Hoàn Tiền 100%</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Nếu sau <strong className="text-white">7 ngày</strong> học bạn cảm thấy chương trình không phù hợp, chúng tôi sẽ hoàn lại <strong className="text-white">100% học phí</strong> — không hỏi lý do.
              </p>
            </div>
          </div>

          <button onClick={() => setStep('form')} className="w-full text-xs text-slate-600 hover:text-slate-400 transition-colors pb-4">
            ← Sửa thông tin
          </button>
        </div>
      )}
    </div>
  )
}
