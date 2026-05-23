import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { api } from '../lib/api'

function PasswordInput({ label, value, onChange, placeholder }) {
  const [show, setShow] = useState(false)
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-300">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:border-blue-500/60 focus:bg-blue-500/[0.06] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]"
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShow(v => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
        >
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
    </div>
  )
}

export function ResetPassword({ onSuccess }) {
  const [newPassword,     setNewPassword]     = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading,         setLoading]         = useState(false)
  const [done,            setDone]            = useState(false)
  const [error,           setError]           = useState('')

  // Lấy token từ URL
  const token = new URLSearchParams(window.location.search).get('token')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!newPassword) { setError('Vui lòng nhập mật khẩu mới.'); return }
    if (newPassword.length < 6) { setError('Mật khẩu phải ít nhất 6 ký tự.'); return }
    if (newPassword !== confirmPassword) { setError('Mật khẩu xác nhận không khớp.'); return }
    if (!token) { setError('Link không hợp lệ. Vui lòng yêu cầu lại.'); return }

    setLoading(true)
    try {
      await api.resetPassword(token, newPassword)
      setDone(true)
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra, vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#0f1117] px-6 text-center">
        <div>
          <p className="text-red-400 text-sm mb-4">Link không hợp lệ hoặc đã hết hạn.</p>
          <button onClick={onSuccess} className="text-blue-400 hover:text-blue-300 text-sm">← Về đăng nhập</button>
        </div>
      </div>
    )
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
        {!done ? (
          <>
            <div className="mb-8">
              <h1 className="font-heading text-3xl font-bold text-white tracking-tight">Tạo mật khẩu mới</h1>
              <p className="mt-2 text-sm text-slate-400">Nhập mật khẩu mới cho tài khoản của bạn.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <PasswordInput
                label="Mật khẩu mới"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Tối thiểu 6 ký tự"
              />
              <PasswordInput
                label="Xác nhận mật khẩu"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu"
              />

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
                    Đang lưu...
                  </>
                ) : 'Đặt lại mật khẩu'}
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-heading text-2xl font-bold text-white mb-3">Đặt lại thành công!</h2>
            <p className="text-sm text-slate-400 mb-8">Mật khẩu của bạn đã được cập nhật. Bạn có thể đăng nhập ngay.</p>
            <button
              onClick={onSuccess}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-500 shadow-[0_0_24px_rgba(59,130,246,0.35)]"
            >
              Đăng nhập →
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
