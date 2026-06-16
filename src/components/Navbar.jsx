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
        <a href="#" className="flex items-center gap-2.5">
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
            Bắt Đầu Ngay →
          </ShimmerButton>
        </div>

        <button className="md:hidden text-slate-400" onClick={() => setMobileOpen(v => !v)}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900/95 px-6 py-4 space-y-3">
          {[['#system', 'Hệ Thống'], ['#roadmap', 'Lộ Trình'], ['#proof', 'Kết Quả'], ['#pricing', 'Học Phí']].map(([href, label]) => (
            <a key={href} href={href} className="block text-sm text-slate-300" onClick={() => setMobileOpen(false)}>{label}</a>
          ))}
          <ShimmerButton onClick={onCTA} className="w-full text-sm">Bắt Đầu Ngay →</ShimmerButton>
        </div>
      )}
    </nav>
  )
}
