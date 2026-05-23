import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { Clapperboard } from 'lucide-react'
import { api } from '../lib/api'

/* ─── Left panel placeholder ─────────────────────────────────────────────── */
/* Swap <LeftPanel /> with an <img> when you have the artwork                */
function LeftPanel() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0d1117]">

      {/* Abstract geometric lines — dark art placeholder */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Grid of diagonal lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={`d${i}`}
            x1={i * 120 - 200} y1="0"
            x2={i * 120 + 200} y2="900"
            stroke="#1e3a5f" strokeWidth="1"
          />
        ))}
        {/* Horizontal subtle lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="0" y1={i * 120}
            x2="700" y2={i * 120}
            stroke="#1e3a5f" strokeWidth="0.5"
          />
        ))}
        {/* Glowing arc */}
        <ellipse cx="50%" cy="110%" rx="55%" ry="65%"
          fill="none" stroke="url(#arcGrad)" strokeWidth="1.5" />
        <defs>
          <radialGradient id="arcGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Blue glow bottom-center */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-blue-600/20 blur-[100px]" />
      {/* Blue glow top-right */}
      <div className="pointer-events-none absolute -top-20 right-0 w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-[80px]" />

      {/* Brand logo — centered */}
      <div className="relative z-10 flex flex-col items-center gap-5 select-none">
        {/* Two-square Nexus-style icon */}
        <div className="relative h-20 w-20">
          <div className="absolute top-0 left-0 h-12 w-12 rounded-xl bg-blue-500/30 border border-blue-400/40 backdrop-blur-sm" />
          <div className="absolute bottom-0 right-0 h-12 w-12 rounded-xl bg-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.6)]" />
        </div>
        <div className="text-center">
          <p className="font-heading text-3xl font-bold tracking-tight text-white">
            VIRAL FREEDOM
          </p>
          <p className="mt-1 text-sm text-blue-400 font-medium tracking-widest uppercase">
            System
          </p>
        </div>
      </div>

      {/* Bottom caption */}
      <p className="absolute bottom-8 left-0 right-0 text-center text-xs text-slate-600 px-8">
        Nền tảng đào tạo Video Editing &amp; Freelance quốc tế
      </p>
    </div>
  )
}

/* ─── Input component ────────────────────────────────────────────────────── */
function Input({ label, id, type = 'text', placeholder, value, onChange }) {
  const [show, setShow] = useState(false)
  const isPass = type === 'password'
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-300">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={isPass && !show ? 'password' : 'text'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all
            focus:border-blue-500/60 focus:bg-blue-500/[0.06] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]"
          autoComplete={isPass ? 'current-password' : id}
        />
        {isPass && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShow(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
          >
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
    </div>
  )
}

/* ─── Login page ─────────────────────────────────────────────────────────── */
export function Login({ onBack, onSuccess, onMustChange, onForgotPassword }) {
  const [step, setStep]         = useState('email')   // 'email' | 'password'
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const handleContinue = async (e) => {
    e.preventDefault()
    setError('')

    if (step === 'email') {
      if (!email) { setError('Vui lòng nhập email.'); return }
      if (!/\S+@\S+\.\S+/.test(email)) { setError('Email không hợp lệ.'); return }
      setStep('password')
      return
    }

    if (!password) { setError('Vui lòng nhập mật khẩu.'); return }
    setLoading(true)
    try {
      const data = await api.login(email, password)
      api.saveToken(data.token, data.mustChangePassword)
      if (data.mustChangePassword) {
        if (onMustChange) onMustChange()
      } else {
        if (onSuccess) onSuccess()
      }
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0d1117]">

      {/* ── LEFT: brand artwork (hidden on mobile) ── */}
      <div className="hidden lg:block lg:w-[52%] xl:w-[55%] flex-shrink-0 h-full">
        <LeftPanel />
      </div>

      {/* ── RIGHT: form ── */}
      <div className="flex flex-1 flex-col">

        {/* Top bar */}
        <div className="flex items-center justify-between px-8 pt-7">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-blue-600">
              <Clapperboard size={14} className="text-white" />
            </div>
            <span className="font-heading text-sm font-bold text-white">VIRAL FREEDOM</span>
          </div>
          <div className="hidden lg:block" />

          <div />
        </div>

        {/* Center: form */}
        <div className="flex flex-1 items-center justify-center px-6 py-8">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full max-w-[400px]"
          >

            {/* Heading */}
            <div className="mb-8">
              <h1 className="font-heading text-3xl font-bold text-white tracking-tight">
                {step === 'email' ? 'Đăng nhập' : 'Nhập mật khẩu'}
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                {step === 'email'
                  ? 'Chào mừng trở lại! Vui lòng đăng nhập để tiếp tục.'
                  : <>Đăng nhập với <span className="text-white font-medium">{email}</span></>
                }
              </p>
            </div>

            {/* Google SSO — only on email step */}
            {step === 'email' && (
              <>
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white transition-all hover:bg-white/[0.08] hover:border-white/20 active:scale-[0.98]"
                >
                  <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Tiếp tục với Google
                </button>

                {/* Divider */}
                <div className="my-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/[0.07]" />
                  <span className="text-xs text-slate-600">hoặc</span>
                  <div className="h-px flex-1 bg-white/[0.07]" />
                </div>
              </>
            )}

            {/* Form */}
            <form onSubmit={handleContinue} className="flex flex-col gap-4">

              {step === 'email' ? (
                <Input
                  id="email"
                  label="Địa chỉ Email"
                  type="email"
                  placeholder="hello@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              ) : (
                <>
                  <Input
                    id="password"
                    label="Mật khẩu"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <div className="flex justify-between items-center -mt-1">
                    <button
                      type="button"
                      onClick={() => { setStep('email'); setError('') }}
                      className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      ← Đổi email
                    </button>
                    <button type="button" onClick={onForgotPassword} className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                      Quên mật khẩu?
                    </button>
                  </div>
                </>
              )}

              {/* Error */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-400 rounded-xl border border-red-500/20 bg-red-500/8 px-3 py-2"
                >
                  {error}
                </motion.p>
              )}

              {/* Submit */}
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
                    Đang đăng nhập...
                  </>
                ) : 'Tiếp tục'}
              </button>
            </form>

          </motion.div>
        </div>

        {/* Footer */}
        <div className="px-8 pb-7 text-center">
          <p className="text-xs text-slate-700">
            © Viral Freedom System
            <span className="mx-2">·</span>
            <button type="button" className="hover:text-slate-500 transition-colors">Bảo Mật</button>
            <span className="mx-2">·</span>
            <button type="button" className="hover:text-slate-500 transition-colors">Điều Khoản</button>
          </p>
        </div>
      </div>
    </div>
  )
}
