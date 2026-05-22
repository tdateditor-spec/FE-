import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, KeyRound } from 'lucide-react'
import { api } from '../lib/api'

function PasswordInput({ label, id, placeholder, value, onChange }) {
  const [show, setShow] = useState(false)
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-300">{label}</label>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all
            focus:border-blue-500/60 focus:bg-blue-500/[0.06] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]"
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

export function ChangePassword({ onSuccess }) {
  const [newPassword, setNewPassword]         = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading]                 = useState(false)
  const [error, setError]                     = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (newPassword.length < 6) {
      setError('Mật khẩu phải ít nhất 6 ký tự'); return
    }
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp'); return
    }

    setLoading(true)
    try {
      await api.changePassword(newPassword)
      api.clearMustChange()
      if (onSuccess) onSuccess()
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra, vui lòng thử lại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#0d1117] px-4">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative w-full max-w-[420px]"
      >
        {/* Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#141520] p-8 shadow-[0_0_60px_rgba(0,0,0,0.5)]">

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="h-14 w-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <KeyRound size={24} className="text-blue-400" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-7">
            <h1 className="font-heading text-2xl font-bold text-white">Đổi Mật Khẩu</h1>
            <p className="mt-2 text-sm text-slate-400">
              Đây là lần đăng nhập đầu tiên của bạn.<br />
              Vui lòng đặt mật khẩu mới để bảo mật tài khoản.
            </p>
          </div>

          {/* Warning box */}
          <div className="mb-6 rounded-xl border border-amber-500/20 bg-amber-500/[0.07] px-4 py-3">
            <p className="text-xs text-amber-400">
              ⚠️ Mật khẩu tạm thời trong email sẽ không còn dùng được sau khi đổi.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <PasswordInput
              id="newPassword"
              label="Mật khẩu mới"
              placeholder="Tối thiểu 6 ký tự"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <PasswordInput
              id="confirmPassword"
              label="Xác nhận mật khẩu"
              placeholder="Nhập lại mật khẩu mới"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
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
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition-all
                hover:bg-blue-500 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed
                shadow-[0_0_24px_rgba(59,130,246,0.35)] hover:shadow-[0_0_32px_rgba(59,130,246,0.5)]"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Đang lưu...
                </>
              ) : 'Xác nhận đổi mật khẩu'}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-slate-700">© Viral Freedom System</p>
      </motion.div>
    </div>
  )
}
