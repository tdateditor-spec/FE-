import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const API          = import.meta.env.VITE_API_URL || 'https://server-pied-kappa.vercel.app'
const TELEGRAM_URL = 'https://t.me/+jWnmBTQuQ8VkMGY1'

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
      'Bộ Atom Plugin & Premium Presets Collection bao gồm những plugin, preset và thiết lập mà tôi đã chọn lọc, tinh chỉnh và sử dụng trong quá trình làm việc với khách hàng thực tế. Mọi thứ đều được tối ưu để giúp bạn tăng tốc workflow, giảm các thao tác không cần thiết và hoàn thành dự án nhanh hơn chỉ với vài cú click.',
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

export function PaymentModal({ open, onClose }) {
  const [step, setStep]         = useState('form')   // 'form' | 'checkout' | 'success'
  const [addOns, setAddOns]     = useState({ music: false, plugin: false })
  const [copied, setCopied]     = useState(null)
  const [form, setForm]         = useState({ name: '', phone: '', email: '' })
  const [err, setErr]           = useState('')
  const [loading, setLoading]   = useState(false)
  const [orderCode]             = useState(genOrder)
  const pollRef                 = useRef(null)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep('form')
        setAddOns({ music: false, plugin: false })
        setForm({ name: '', phone: '', email: '' })
        setErr('')
        stopPolling()
      }, 300)
    }
  }, [open])

  const startPolling = (email) => {
    stopPolling()
    pollRef.current = setInterval(async () => {
      try {
        const res  = await fetch(`${API}/api/register/status?email=${encodeURIComponent(email)}`)
        const data = await res.json()
        if (data.paid) { stopPolling(); setStep('success') }
      } catch {}
    }, 4000)
  }

  const stopPolling = () => {
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null }
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
        body:    JSON.stringify({
          name:  form.name.trim(),
          phone: form.phone.replace(/\s/g, ''),
          email: form.email.trim(),
        }),
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

  // Tính tổng + mã khoá
  const totalAmount  = 799000 + (addOns.music ? 299000 : 0) + (addOns.plugin ? 499000 : 0)
  const phone        = form.phone.replace(/\s/g, '')
  const courseCode   = ['E', addOns.music && 'M', addOns.plugin && 'P'].filter(Boolean).join('')
  const noiDung      = `VFS ${phone} ${courseCode}`
  const qrUrl        = `https://qr.sepay.vn/img?acc=0368683148&bank=MBBank&amount=${totalAmount}&des=${encodeURIComponent(noiDung)}&template=compact`

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-3 bg-black/80 backdrop-blur-md"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={cn(
        'relative w-full border border-white/10 bg-[#111318] shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 flex flex-col',
        'rounded-t-3xl sm:rounded-3xl',
        step === 'checkout' ? 'max-w-[900px] h-[92svh] sm:h-auto sm:max-h-[95vh]' : 'max-w-[420px]'
      )}>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-400 hover:bg-white/20 hover:text-white transition-all"
        >×</button>

        {/* ── STEP 1: Form ── */}
        {step === 'form' && (
          <div className="p-8">
            <div className="text-center mb-6">
              <span className="rounded-full border border-blue-500/30 bg-blue-600/20 px-3 py-1 text-xs font-semibold text-blue-300">
                VIRAL FREEDOM SYSTEM
              </span>
              <h3 className="font-heading mt-3 text-xl font-bold text-white">Đăng Ký Tham Gia</h3>
              <p className="mt-1 text-xs text-slate-400">Điền thông tin để tiến hành thanh toán</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { field: 'name',  label: 'Họ và tên *',       type: 'text',  placeholder: 'Nguyễn Văn A' },
                { field: 'phone', label: 'Số điện thoại *',   type: 'tel',   placeholder: '0901234567' },
                { field: 'email', label: 'Email *',            type: 'email', placeholder: 'email@gmail.com' },
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
                className="w-full rounded-2xl bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 py-4 font-heading font-bold text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? '⏳ Đang xử lý...' : '→ Tiếp Tục Thanh Toán'}
              </button>
            </form>
          </div>
        )}

        {/* ── STEP 2: Checkout (2 cột) ── */}
        {step === 'checkout' && (
          <div className="flex flex-col md:flex-row flex-1 min-h-0">

            {/* ── Cột phải (QR) — hiện đầu tiên trên mobile ── */}
            <div className="w-full md:w-[290px] flex-shrink-0 overflow-y-auto p-5 flex flex-col bg-[#0d1018] border-b md:border-b-0 md:border-r border-white/[0.07] order-first md:order-last max-h-[44vh] md:max-h-none">
              <h3 className="font-heading font-bold text-white text-center mb-3 text-sm">Quét QR để thanh toán</h3>

              {/* QR */}
              <div className="flex justify-center mb-3">
                <div className="rounded-2xl bg-white p-3 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                  <img
                    className="h-[150px] w-[150px] rounded-xl"
                    src={qrUrl}
                    alt="VietQR"
                    onError={(e) => {
                      e.target.parentElement.innerHTML = '<div class="h-[150px] w-[150px] flex flex-col items-center justify-center bg-slate-800 rounded-xl text-slate-400 text-xs text-center p-4"><div class="text-3xl mb-2">📱</div>QR thanh toán</div>'
                    }}
                  />
                </div>
              </div>

              {/* Bank info */}
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3 mb-3 space-y-2 text-xs">
                {[
                  { label: 'Ngân hàng',     value: 'MB Bank',      key: null },
                  { label: 'Số tài khoản',  value: '0368683148',   key: 'stk' },
                  { label: 'Chủ tài khoản', value: 'LE THANH DAT', key: null },
                  { label: 'Số tiền',       value: fmtVND(totalAmount), key: null, highlight: true },
                  { label: 'Nội dung CK',   value: noiDung,        key: 'nd' },
                ].map(({ label, value, key, highlight }) => (
                  <div key={label} className="flex items-center justify-between gap-2">
                    <span className="text-slate-500 flex-shrink-0">{label}</span>
                    {key ? (
                      <button onClick={() => copy(value, key)}
                        className={cn('rounded border px-2 py-0.5 font-mono transition-all',
                          copied === key
                            ? 'border-green-500/30 bg-green-500/15 text-green-300'
                            : 'border-slate-700 bg-slate-800 text-white hover:border-blue-500/40')}>
                        {copied === key ? '✓ Copied!' : `${value} ⧉`}
                      </button>
                    ) : (
                      <span className={cn('font-semibold text-right', highlight ? 'text-blue-400' : 'text-white')}>{value}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Đang chờ */}
              <div className="rounded-xl border border-green-700/30 bg-green-900/20 px-3 py-2.5 text-center mb-3">
                <div className="flex items-center justify-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse flex-shrink-0"/>
                  <p className="text-xs font-semibold text-green-300">Đang chờ thanh toán...</p>
                </div>
              </div>

              {/* Tổng */}
              <div className="mt-auto space-y-2 border-t border-white/[0.07] pt-3 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Sản phẩm chính</span>
                  <span>{fmtVND(799000)}</span>
                </div>
                {addOns.music && (
                  <div className="flex justify-between text-slate-400">
                    <span>Sound Design</span>
                    <span>{fmtVND(299000)}</span>
                  </div>
                )}
                {addOns.plugin && (
                  <div className="flex justify-between text-slate-400">
                    <span>Plugin</span>
                    <span>{fmtVND(499000)}</span>
                  </div>
                )}
                <div className="flex justify-between font-heading font-bold text-base border-t border-white/[0.07] pt-2 mt-2">
                  <span className="text-white">Tổng thanh toán</span>
                  <span className="text-blue-400">{fmtVND(totalAmount)}</span>
                </div>
              </div>

              <button onClick={() => setStep('form')}
                className="mt-4 w-full text-xs text-slate-600 hover:text-slate-400 transition-colors">
                ← Sửa thông tin
              </button>
            </div>

            {/* ── Cột trái: đơn hàng + upsell ── */}
            <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-7 order-last md:order-first border-t md:border-t-0 border-white/[0.07]">
              {/* Heading */}
              <h2 className="font-heading text-2xl font-bold text-center mb-1 bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                Hoàn tất thanh toán
              </h2>
              <p className="text-center text-sm text-slate-400 mb-6">
                Chào <strong className="text-white">{form.name.toUpperCase()}</strong>, đơn hàng của bạn đã sẵn sàng.
              </p>

              {/* Sản phẩm chính */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden mb-4">
                <div className="px-4 py-2 border-b border-white/[0.07]">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Sản phẩm chính</span>
                </div>
                <div className="p-4">
                  <p className="font-heading font-bold text-white mb-3">VIRAL FREEDOM SYSTEM – Video Editing</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Mã đơn hàng</span>
                      <span className="text-blue-400 font-mono font-semibold">{orderCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Email</span>
                      <span className="text-white">{form.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Giá</span>
                      <span className="text-blue-400 font-bold">{fmtVND(799000)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add-on đã chọn */}
              {ADDONS.filter(a => addOns[a.key]).map(addon => (
                <div key={addon.key} className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.06] overflow-hidden mb-4">
                  <div className="px-4 py-2 border-b border-blue-500/20">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Đã thêm vào đơn</span>
                  </div>
                  <div className="p-4">
                    <p className="font-heading font-semibold text-white text-sm mb-2">{addon.name}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Giá</span>
                      <span className="text-blue-400 font-bold">{fmtVND(addon.price)}</span>
                    </div>
                    <button
                      onClick={() => setAddOns(p => ({ ...p, [addon.key]: false }))}
                      className="mt-2 text-[11px] text-slate-600 hover:text-red-400 transition-colors"
                    >
                      ✕ Bỏ khỏi đơn hàng
                    </button>
                  </div>
                </div>
              ))}

              {/* Upsell cards — chỉ hiện add-on chưa chọn */}
              {ADDONS.filter(a => !addOns[a.key]).map(addon => (
                <div key={addon.key} className="rounded-2xl border border-dashed border-blue-500/40 bg-blue-500/[0.03] p-5 mb-4">
                  <p className="text-[11px] font-semibold text-blue-300 mb-3 leading-snug">
                    Đừng bỏ lỡ sản phẩm dưới đây, giá ưu đãi duy nhất chỉ khi mua kèm VIRAL FREEDOM SYSTEM
                  </p>
                  <p className="font-heading font-bold text-white mb-3">{addon.name}</p>
                  <div className="space-y-2 mb-3">
                    {addon.paragraphs.map((p, i) => (
                      <p key={i} className="text-xs text-slate-400 leading-relaxed">{p}</p>
                    ))}
                  </div>
                  <p className="text-xs text-blue-300 font-semibold mb-4 leading-relaxed">{addon.highlight}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-slate-600 line-through">{fmtVND(addon.originalPrice)}</span>
                    <span className="font-heading font-bold text-blue-400 text-lg">{fmtVND(addon.price)}</span>
                    <span className="rounded-full bg-blue-500/20 border border-blue-500/30 px-2 py-0.5 text-[10px] font-bold text-blue-400">
                      Tiết kiệm {Math.round((1 - addon.price / addon.originalPrice) * 100)}%
                    </span>
                  </div>
                  <button
                    onClick={() => setAddOns(p => ({ ...p, [addon.key]: true }))}
                    className="w-full rounded-xl bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 hover:brightness-110 py-3 font-heading font-bold text-white text-sm transition-all hover:-translate-y-0.5 shadow-[0_0_16px_rgba(59,130,246,0.3)]"
                  >
                    + Thêm sản phẩm này vào đơn hàng
                  </button>
                </div>
              ))}

              {/* Cộng đồng sắp tăng giá */}
              <div className="rounded-2xl border border-blue-500/20 bg-blue-900/10 p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Cộng Đồng Viral Freedom Sẽ Sớm Tăng Giá</p>
                <p className="text-xs text-slate-400 leading-relaxed">{COMMUNITY_NOTE}</p>
              </div>
            </div>

          </div>
        )}

        {/* ── STEP 3: Success ── */}
        {step === 'success' && (
          <div className="p-8 text-center max-w-[420px] mx-auto">
            <div className="flex items-center justify-center mb-5">
              <div className="h-20 w-20 rounded-full bg-blue-500/15 border-2 border-blue-500/40 flex items-center justify-center">
                <span className="text-4xl">🎉</span>
              </div>
            </div>
            <h3 className="font-heading text-2xl font-bold text-white mb-2">Thanh Toán Thành Công!</h3>
            <p className="text-sm text-slate-400 mb-6">
              Email xác nhận đã gửi tới <strong className="text-white">{form.email}</strong>
            </p>

            <div className="space-y-3 mb-6 text-left">
              <div className="flex items-start gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/[0.07] p-4">
                <span className="text-xl mt-0.5">✉️</span>
                <div>
                  <p className="text-sm font-semibold text-white">Kiểm tra email</p>
                  <p className="text-xs text-slate-400 mt-0.5">Tài khoản & mật khẩu đã gửi về <span className="text-blue-400">{form.email}</span></p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-violet-500/20 bg-violet-500/[0.07] p-4">
                <span className="text-xl mt-0.5">💬</span>
                <div>
                  <p className="text-sm font-semibold text-white">Tham gia cộng đồng</p>
                  <p className="text-xs text-slate-400 mt-0.5">Hỗ trợ 24/7, chia sẻ bài tập, kết nối học viên</p>
                </div>
              </div>
            </div>

            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
              className="block w-full rounded-2xl bg-gradient-to-r from-violet-700 to-violet-500 py-3.5 font-heading font-bold text-white text-sm mb-3 hover:-translate-y-0.5 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              Vào nhóm Telegram →
            </a>
            <button onClick={onClose}
              className="w-full rounded-2xl border border-white/10 py-3 text-sm text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all">
              Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
