import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const API = import.meta.env.VITE_API_URL || 'https://server-pied-kappa.vercel.app'

export function PaymentModal({ open, onClose }) {
  const [step, setStep]       = useState('form')   // 'form' | 'qr'
  const [copied, setCopied]   = useState(null)
  const [form, setForm]       = useState({ name: '', phone: '', email: '' })
  const [err, setErr]         = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Reset khi đóng
  useEffect(() => {
    if (!open) { setTimeout(() => { setStep('form'); setForm({ name:'', phone:'', email:'' }); setErr('') }, 300) }
  }, [open])

  const copy = async (text, key) => {
    await navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) { setErr('Vui lòng nhập họ tên'); return }
    if (!/^0\d{9}$/.test(form.phone.replace(/\s/g,''))) { setErr('SĐT không hợp lệ (VD: 0901234567)'); return }
    if (!/\S+@\S+\.\S+/.test(form.email)) { setErr('Email không hợp lệ'); return }
    setErr('')
    setLoading(true)
    try {
      const res  = await fetch(`${API}/api/register`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name: form.name.trim(), phone: form.phone.replace(/\s/g,''), email: form.email.trim() }),
      })
      const data = await res.json()
      if (!res.ok) { setErr(data.error || 'Có lỗi xảy ra, vui lòng thử lại'); setLoading(false); return }
      setStep('qr')
    } catch {
      setErr('Không thể kết nối server, vui lòng thử lại')
    }
    setLoading(false)
  }

  const phone    = form.phone.replace(/\s/g,'')
  const noiDung  = `VFS ${phone}`
  const qrUrl    = `https://qr.sepay.vn/img?acc=0368683148&bank=MBBank&amount=799000&des=${encodeURIComponent(noiDung)}&template=compact`

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-lg"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-[420px] rounded-3xl border border-blue-500/25 bg-[#0f1f3d] shadow-[0_0_60px_rgba(59,130,246,0.15)] animate-[fadeUp_0.3s_ease] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 text-2xl text-slate-500 leading-none hover:text-white transition-colors"
        >×</button>

        {/* ── STEP 1: Form ── */}
        {step === 'form' && (
          <div className="p-8">
            <div className="text-center mb-6">
              <span className="rounded-full border border-blue-500/30 bg-blue-600/20 px-3 py-1 text-xs font-semibold text-blue-300">
                VIRAL FREEDOM SYSTEM
              </span>
              <h3 className="font-heading mt-3 text-xl font-bold text-white">Đăng Ký Tham Gia</h3>
              <p className="mt-1 text-xs text-slate-400">Điền thông tin để nhận link truy cập sau khi thanh toán</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Họ và tên *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Nguyễn Văn A"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500/60 focus:bg-blue-500/[0.06] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Số điện thoại * <span className="text-slate-500">(dùng làm mã xác nhận)</span></label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="0901234567"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500/60 focus:bg-blue-500/[0.06] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Email * <span className="text-slate-500">(nhận link truy cập)</span></label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="email@gmail.com"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500/60 focus:bg-blue-500/[0.06] transition-all"
                />
              </div>

              {err && <p className="text-xs text-red-400 text-center">{err}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 py-4 font-heading font-bold text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? '⏳ Đang xử lý...' : '→ Tiếp Tục Thanh Toán'}
              </button>
            </form>

          </div>
        )}

        {/* ── STEP 2: QR ── */}
        {step === 'qr' && (
          <div className="p-8">
            <div className="text-center mb-5">
              <span className="rounded-full border border-blue-500/30 bg-blue-600/20 px-3 py-1 text-xs font-semibold text-blue-300">
                VIRAL FREEDOM SYSTEM
              </span>
              <h3 className="font-heading mt-3 text-xl font-bold text-white">Quét QR Để Thanh Toán</h3>
              <p className="mt-1 text-xs text-slate-400">Hỗ trợ 44+ ngân hàng qua VietQR</p>
            </div>

            <div className="flex justify-center mb-5">
              <div className="rounded-2xl bg-white p-3">
                <img
                  className="h-44 w-44 rounded-xl"
                  src={qrUrl}
                  alt="VietQR 799,000đ"
                  onError={(e) => {
                    e.target.parentElement.innerHTML = '<div class="h-44 w-44 flex flex-col items-center justify-center bg-slate-800 rounded-xl text-slate-400 text-xs text-center p-4"><div class="text-3xl mb-2">📱</div>Quét QR thanh toán</div>'
                  }}
                />
              </div>
            </div>

            <div className="text-center mb-5">
              <span className="font-heading text-3xl font-bold bg-gradient-to-r from-blue-300 via-blue-100 to-blue-400 bg-clip-text text-transparent">799,000đ</span>
              <p className="mt-1 text-xs text-slate-500">Giá gốc: 4,800,000đ</p>
            </div>

            <div className="mb-5 space-y-2 rounded-2xl border border-slate-700 bg-white/[0.03] p-4 text-sm">
              {[
                { label: 'Ngân hàng',     value: 'MB Bank',         key: null },
                { label: 'Số tài khoản', value: '0368683148',      key: 'stk' },
                { label: 'Chủ tài khoản',value: 'LE THANH DAT',    key: null },
                { label: 'Nội dung CK',  value: noiDung,            key: 'noidung' },
              ].map(({ label, value, key }) => (
                <div key={label} className="flex items-center justify-between gap-2">
                  <span className="text-slate-400 flex-shrink-0">{label}</span>
                  {key ? (
                    <button
                      onClick={() => copy(value, key)}
                      className={cn(
                        'rounded border px-2 py-1 font-mono text-xs transition-all',
                        copied === key
                          ? 'border-green-500/30 bg-green-500/15 text-green-300'
                          : 'border-slate-700 bg-slate-800 text-white hover:bg-blue-600/20'
                      )}
                    >
                      {copied === key ? '✓ Đã copy!' : `${value} ⧉`}
                    </button>
                  ) : (
                    <span className="font-medium text-white text-right">{value}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-emerald-700/20 bg-emerald-900/20 p-4 text-center">
              <p className="text-xs font-semibold text-emerald-300 mb-1">✅ Sau khi chuyển khoản thành công:</p>
              <p className="text-xs text-slate-400">
                Hệ thống tự động gửi <strong className="text-white">tài khoản & mật khẩu</strong><br />
                về email <strong className="text-emerald-400">{form.email}</strong> trong vài phút 🚀
              </p>
            </div>


            <button
              onClick={() => setStep('form')}
              className="mt-3 w-full text-xs text-slate-600 hover:text-slate-400 transition-colors"
            >
              ← Sửa thông tin
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
