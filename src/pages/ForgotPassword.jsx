import { useState } from 'react'
import { motion } from 'framer-motion'
import { api } from '../lib/api'

export function ForgotPassword({ onBack }) {
  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [error,   setError]   = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email) { setError('Vui lòng nhập email.'); return }
    setLoading(true)
    try {
      await api.forgotPassword(email)
      setSent(true)
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra, vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#0f1117] px-6">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-[420px]"
      >
        {!sent ? (
          <>
            <div className="mb-8">
              <h1 className="font-heading text-3xl font-bold text-white tracking-tight">Quên mật khẩu?</h1>
              <p className="mt-2 text-sm text-slate-400">
                Nhập email của bạn — chúng tôi sẽ gửi link đặt lại mật khẩu.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300">Địa chỉ Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="hello@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:border-blue-500/60 focus:bg-blue-500/[0.06] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]"
                  autoComplete="email"
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-400 rounded-xl border border-red-500/20 bg-red-500/[0.08] px-3 py-2"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-500 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_24px_rgba(59,130,246,0.35)]"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Đang gửi...
                  </>
                ) : 'Gửi link đặt lại'}
              </button>

              <button
                type="button"
                onClick={onBack}
                className="text-sm text-slate-500 hover:text-slate-300 transition-colors text-center"
              >
                ← Quay lại đăng nhập
              </button>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/10 border border-green-500/20">
              <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="font-heading text-2xl font-bold text-white mb-3">Kiểm tra email!</h2>
            <p className="text-sm text-slate-400 mb-2">
              Chúng tôi đã gửi link đặt lại mật khẩu tới
            </p>
            <p className="text-sm font-semibold text-white mb-6">{email}</p>
            <p className="text-xs text-slate-500 mb-8">
              Link có hiệu lực trong 1 giờ. Kiểm tra cả thư mục spam nếu không thấy.
            </p>
            <button
              type="button"
              onClick={onBack}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              ← Quay lại đăng nhập
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
