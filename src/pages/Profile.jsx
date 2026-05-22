import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, KeyRound, ArrowLeft, User, Mail, Phone, CheckCircle2 } from 'lucide-react'
import { api } from '../lib/api'

function PassInput({ label, value, onChange, placeholder }) {
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
        <button type="button" tabIndex={-1} onClick={() => setShow(v => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
          {show ? <EyeOff size={15}/> : <Eye size={15}/>}
        </button>
      </div>
    </div>
  )
}

export function Profile({ onBack }) {
  const [user, setUser]             = useState(null)
  const [oldPass, setOldPass]       = useState('')
  const [newPass, setNewPass]       = useState('')
  const [confirmPass, setConfirm]   = useState('')
  const [loading, setLoading]       = useState(false)
  const [err, setErr]               = useState('')
  const [success, setSuccess]       = useState(false)

  useEffect(() => {
    try {
      const token = localStorage.getItem('vfs_token')
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]))
        setUser({ name: payload.name, email: payload.email })
      }
    } catch {}
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErr('')
    if (newPass.length < 6)     { setErr('Mật khẩu mới phải ít nhất 6 ký tự'); return }
    if (newPass !== confirmPass) { setErr('Mật khẩu xác nhận không khớp'); return }
    setLoading(true)
    try {
      await api.changePassword(newPass, oldPass)
      setSuccess(true)
      setOldPass(''); setNewPass(''); setConfirm('')
    } catch (e) {
      setErr(e.message || 'Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  const initials = (user?.name || 'U').split(' ').map(w => w[0]).slice(-2).join('').toUpperCase()

  return (
    <div className="min-h-screen bg-[#0f1117]">
      {/* Top bar */}
      <header className="border-b border-white/[0.07] bg-[#141520] px-6 py-4 flex items-center gap-4">
        <button onClick={onBack}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={16}/> Quay lại khoá học
        </button>
        <div className="h-4 w-px bg-white/10"/>
        <span className="text-sm font-semibold text-white">Hồ sơ cá nhân</span>
      </header>

      <div className="mx-auto max-w-2xl px-6 py-10">

        {/* Avatar card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 rounded-2xl border border-white/[0.08] bg-[#141520] p-6 flex items-center gap-5"
        >
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-xl font-bold text-white flex-shrink-0 shadow-[0_0_24px_rgba(59,130,246,0.3)]">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold text-white truncate">{user?.name || '—'}</h2>
            <div className="flex items-center gap-4 mt-1.5 flex-wrap">
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <Mail size={12}/> {user?.email || '—'}
              </span>
            </div>
            <span className="inline-block mt-2 rounded-full bg-emerald-500/15 border border-emerald-500/25 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
              ✓ Tài khoản đang hoạt động
            </span>
          </div>
        </motion.div>

        {/* Change password card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-2xl border border-white/[0.08] bg-[#141520] overflow-hidden"
        >
          {/* Card header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.07]">
            <div className="h-8 w-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <KeyRound size={14} className="text-blue-400"/>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Đổi mật khẩu</p>
              <p className="text-xs text-slate-500">Cập nhật mật khẩu để bảo mật tài khoản</p>
            </div>
          </div>

          <div className="p-6">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-8 text-center"
              >
                <div className="h-16 w-16 rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 flex items-center justify-center mb-4">
                  <CheckCircle2 size={32} className="text-emerald-400"/>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Đổi mật khẩu thành công!</h3>
                <p className="text-sm text-slate-400 mb-6">Mật khẩu mới đã được lưu.</p>
                <button onClick={() => setSuccess(false)}
                  className="rounded-xl border border-white/10 px-5 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all">
                  Đổi lại mật khẩu
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
                <PassInput
                  label="Mật khẩu hiện tại"
                  value={oldPass}
                  onChange={e => setOldPass(e.target.value)}
                  placeholder="Nhập mật khẩu đang dùng"
                />
                <PassInput
                  label="Mật khẩu mới"
                  value={newPass}
                  onChange={e => setNewPass(e.target.value)}
                  placeholder="Ít nhất 6 ký tự"
                />
                <PassInput
                  label="Xác nhận mật khẩu mới"
                  value={confirmPass}
                  onChange={e => setConfirm(e.target.value)}
                  placeholder="Nhập lại mật khẩu mới"
                />

                {err && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-400 rounded-xl border border-red-500/20 bg-red-500/[0.08] px-3 py-2"
                  >
                    {err}
                  </motion.p>
                )}

                <button type="submit" disabled={loading}
                  className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-500 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_24px_rgba(59,130,246,0.3)]">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Đang lưu...
                    </>
                  ) : 'Cập nhật mật khẩu'}
                </button>
              </form>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
