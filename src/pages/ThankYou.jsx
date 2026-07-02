import { useEffect, useState } from 'react'

const TELEGRAM_URL = 'https://t.me/+jWnmBTQuQ8VkMGY1'

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

            {/* Telegram */}
            <div className="flex gap-4 rounded-2xl bg-white/[0.03] border border-white/8 p-4">
              <div className="flex-shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/15">
                <svg className="h-4 w-4 text-violet-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.525 13.67l-2.94-.917c-.638-.203-.654-.638.136-.944l11.49-4.43c.532-.194.998.13.683.842z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white mb-0.5">Tham gia cộng đồng</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Nhóm Telegram hỗ trợ 24/7, chia sẻ bài tập & network với các editor.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3 pt-1">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-violet-600 hover:bg-violet-500 transition-colors py-3.5 text-sm font-semibold text-white"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.525 13.67l-2.94-.917c-.638-.203-.654-.638.136-.944l11.49-4.43c.532-.194.998.13.683.842z"/>
                </svg>
                Vào nhóm Telegram →
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
