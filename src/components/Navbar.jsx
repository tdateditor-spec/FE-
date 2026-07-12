import { useEffect, useState } from 'react'
import { ShimmerButton } from './ui/ShimmerButton'

export function Navbar({ onCTA, onLogin }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#080f1e]/95 backdrop-blur-xl border-b border-white/5' : ''}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="hidden md:flex items-center gap-2.5">
          <img src="/logo Feak.png" alt="Logo" className="h-8 w-8 rounded-lg object-cover" />
          <span className="font-heading font-bold text-white tracking-tight">VIRAL FREEDOM</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {[['#system', 'Hệ Thống'], ['#roadmap', 'Lộ Trình'], ['#proof', 'Kết Quả'], ['#pricing', 'Học Phí']].map(([href, label]) => (
            <a key={href} href={href} className="text-sm text-slate-400 transition-colors hover:text-white">{label}</a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={onLogin} className="text-sm text-slate-400 hover:text-white transition-colors px-3 py-2">
            Đăng Nhập
          </button>
          <ShimmerButton onClick={onCTA} className="text-sm px-5 py-2.5 text-base">
            Tham gia ngay
          </ShimmerButton>
        </div>

        {/* Mobile: CTA + giảm giá */}
        <div className="flex md:hidden flex-1 items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-sm text-emerald-400 font-bold leading-tight">Giá ưu đãi hơn 83%</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 line-through leading-tight">4,800,000đ</span>
              <span className="text-base font-extrabold leading-tight bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">799,000đ</span>
            </div>
          </div>
          <button
            onClick={onCTA}
            className="rounded-xl bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 px-4 py-2 text-xs font-bold text-white shadow-[0_0_12px_rgba(59,130,246,0.4)]"
          >
            Tham gia ngay
          </button>
        </div>
      </div>
    </nav>
  )
}
