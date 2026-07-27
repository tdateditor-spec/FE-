import { useEffect, useState } from 'react'

const DISCORD_URL = 'https://discord.gg/U3VG5fd9f'

export function ThankYou({ onLogin }) {
  const [email, setEmail] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setEmail(params.get('email') || '')
    const amount = Number(params.get('amount')) || 799000
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Purchase', { value: amount, currency: 'VND' })
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#080f1e] flex items-center justify-center px-4 py-16">
      {/* Background glows */}
      <div className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none fixed bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-violet-800/10 blur-[100px]" />

      <div className="relative w-full max-w-lg">
        {/* Card */}
        <div className="bg-[#0f1420] border border-white/8 rounded-3xl overflow-hidden shadow-2xl">

          {/* Top banner */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 px-8 py-8 text-center">
            {/* Checkmark circle */}
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Thanh Toán Thành Công!</h1>
            <p className="text-blue-100 text-sm">Chào mừng bạn đến với VIRAL FREEDOM SYSTEM</p>
          </div>

          {/* Body */}
          <div className="px-8 py-7 space-y-4">

            {/* Check email */}
            <div className="flex gap-4 rounded-2xl bg-white/[0.03] border border-white/8 p-4">
              <div className="flex-shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/15">
                <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white mb-0.5">Kiểm tra email của bạn</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Chúng tôi đã gửi tài khoản đăng nhập & tài nguyên khoá học tới{' '}
                  {email ? <strong className="text-blue-400">{email}</strong> : 'email của bạn'}.
                </p>
              </div>
            </div>

            {/* Discord */}
            <div className="flex gap-4 rounded-2xl bg-white/[0.03] border border-white/8 p-4">
              <div className="flex-shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/15">
                <svg className="h-4 w-4 text-violet-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.004.033.024.063.047.083a19.84 19.84 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white mb-0.5">Tham gia cộng đồng</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Nhóm Discord hỗ trợ 24/7, chia sẻ bài tập & network với các editor.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3 pt-1">
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-violet-600 hover:bg-violet-500 transition-colors py-3.5 text-sm font-semibold text-white"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.004.033.024.063.047.083a19.84 19.84 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                </svg>
                Vào nhóm Discord →
              </a>
              <button
                onClick={onLogin}
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors py-3.5 text-sm font-semibold text-white"
              >
                Đăng nhập để học ngay →
              </button>
            </div>

            <p className="text-center text-xs text-slate-600 pt-1">
              Không thấy email? Kiểm tra thư mục Spam / Quảng cáo
            </p>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-slate-700">© 2025 Viral Freedom System</p>
      </div>
    </div>
  )
}
