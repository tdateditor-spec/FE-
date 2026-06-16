import { useState, useEffect } from 'react'
import { api } from './lib/api'
import { Login } from './pages/Login'
import { ChangePassword } from './pages/ChangePassword'
import { Profile } from './pages/Profile'
import { NotFound } from './pages/NotFound'
import { ForgotPassword } from './pages/ForgotPassword'
import { ResetPassword } from './pages/ResetPassword'
import { Dashboard } from './pages/Dashboard'
import { Admin } from './pages/Admin'
import { Navbar } from './components/Navbar'
import { PaymentModal } from './components/PaymentModal'
import { Hero } from './components/sections/Hero'
import { OriginStory } from './components/sections/OriginStory'
import { Vision } from './components/sections/Vision'
import { Pain } from './components/sections/Pain'
import { Comparison } from './components/sections/Comparison'
import { Pillars } from './components/sections/Pillars'
import { Roadmap } from './components/sections/Roadmap'
import { Modules } from './components/sections/Modules'
import { SocialProof } from './components/sections/SocialProof'
import { OfferStack } from './components/sections/OfferStack'
import { Pricing } from './components/sections/Pricing'
import { FAQ } from './components/sections/FAQ'
import { FinalCTA } from './components/sections/FinalCTA'

function Footer() {
  return (
    <footer className="border-t border-slate-800/50 py-10 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-heading font-bold text-white text-sm">VIRAL FREEDOM SYSTEM</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Chính Sách Bảo Mật</a>
            <a href="#" className="hover:text-white transition-colors">Điều Khoản</a>
            <a href="#" className="hover:text-white transition-colors">Liên Hệ</a>
          </div>
          <p className="text-xs text-slate-600">© 2025 Viral Freedom System.</p>
        </div>
        <p className="mt-5 text-center text-xs text-slate-700">
          Kết quả có thể khác nhau tùy cá nhân. Thu nhập được đề cập là kết quả thực tế của các học viên cụ thể.
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)

  const getPage = () => {
    const p = window.location.pathname
    if (p === '/course')            return 'course'
    if (p === '/login')             return 'login'
    if (p === '/change-password')   return 'change-password'
    if (p === '/profile')           return 'profile'
    if (p.startsWith('/admin'))     return 'admin'
    if (p === '/forgot-password')   return 'forgot-password'
    if (p === '/reset-password')    return 'reset-password'
    if (p === '/' || p === '')      return 'home'
    return '404'
  }
  const [page, setPage] = useState(getPage)

  useEffect(() => {
    const handler = () => setPage(getPage())
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [])

  const navigate = (path) => {
    window.history.pushState({}, '', path)
    setPage(getPage())
  }

  const goHome         = () => navigate('/')
  const goDashboard    = () => navigate('/course')
  const goLogin        = () => navigate('/login')
  const goAdmin        = () => navigate('/admin')
  const goChangePass   = () => navigate('/change-password')
  const goProfile      = () => navigate('/profile')
  const goForgotPass   = () => navigate('/forgot-password')
  const handleLogout   = () => { api.clearToken(); api.clearMustChange(); window.location.href = '/login' }

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const loggedIn = api.isLoggedIn()

  // Lấy role từ token
  const getRole = () => {
    try {
      const token = localStorage.getItem('vfs_token')
      if (!token) return null
      const base64 = token.split('.')[1].replace(/-/g,'+').replace(/_/g,'/')
      const payload = JSON.parse(decodeURIComponent(atob(base64).split('').map(c=>'%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)).join('')))
      return payload.role
    } catch { return null }
  }
  const role = loggedIn ? getRole() : null

  // Đã đăng nhập → không được vào landing hoặc login → redirect /course
  if (loggedIn && (page === 'home' || page === 'login')) {
    window.history.replaceState({}, '', '/course')
    return <Dashboard onLogout={handleLogout} onAdmin={goAdmin} onProfile={goProfile} />
  }

  // Chưa đăng nhập → không được vào các trang cần auth → redirect /login
  if (!loggedIn && (page === 'course' || page === 'profile' || page === 'change-password' || page === 'admin') && page !== 'forgot-password' && page !== 'reset-password') {
    window.history.replaceState({}, '', '/login')
    return <Login onBack={goHome} onSuccess={goDashboard} onMustChange={goChangePass} />
  }

  // Học viên cố vào /admin → redirect /course
  if (loggedIn && role !== 'admin' && page === 'admin') {
    window.history.replaceState({}, '', '/course')
    return <Dashboard onLogout={handleLogout} onAdmin={goAdmin} onProfile={goProfile} />
  }

  if (page === 'login')            return <Login onBack={goHome} onSuccess={goDashboard} onMustChange={goChangePass} onForgotPassword={goForgotPass} />
  if (page === 'change-password')  return <ChangePassword onSuccess={goDashboard} />
  if (page === 'profile')          return <Profile onBack={goDashboard} />
  if (page === 'course')           return <Dashboard onLogout={handleLogout} onAdmin={goAdmin} onProfile={goProfile} />
  if (page === 'admin')            return <Admin onBack={goDashboard} onLogout={handleLogout} />
  if (page === 'forgot-password')  return <ForgotPassword onBack={goLogin} />
  if (page === 'reset-password')   return <ResetPassword onSuccess={goLogin} />
  if (page === '404')              return <NotFound onBack={goDashboard} />

  return (
    <div className="bg-mesh min-h-screen">
      <Navbar onCTA={openModal} onLogin={goLogin} />
      <main>
        <Hero onCTA={openModal} />
        <OriginStory />
        <Vision onCTA={openModal} />
        <Pillars />
        <Pain />
        <Roadmap />
        {/* <Modules /> */}
        <SocialProof onCTA={openModal} />
        <OfferStack onCTA={openModal} />
        <Pricing onCTA={openModal} />
        <FAQ onCTA={openModal} />
        <FinalCTA onCTA={openModal} />
      </main>
      <Footer />
      <PaymentModal open={modalOpen} onClose={closeModal} />

      {/* Zalo floating button */}
      <a
        href="https://zalo.me/0326270914"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full bg-[#0068ff] px-4 py-3 shadow-[0_4px_24px_rgba(0,104,255,0.45)] hover:shadow-[0_4px_32px_rgba(0,104,255,0.65)] hover:-translate-y-1 transition-all group"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 1C5.477 1 1 5.15 1 10.267c0 2.9 1.388 5.492 3.567 7.233L4 21l3.933-1.967A10.39 10.39 0 0011 19.533C16.523 19.533 21 15.384 21 10.267 21 5.15 16.523 1 11 1z" fill="white"/>
          <path d="M7 10.5c0-.828.448-1.5 1-1.5s1 .672 1 1.5S8.552 12 8 12s-1-.672-1-1.5zM10 10.5c0-.828.448-1.5 1-1.5s1 .672 1 1.5-.448 1.5-1 1.5-1-.672-1-1.5zM13 10.5c0-.828.448-1.5 1-1.5s1 .672 1 1.5-.448 1.5-1 1.5-1-.672-1-1.5z" fill="#0068ff"/>
        </svg>
        <span className="text-white text-sm font-semibold whitespace-nowrap">Hỗ trợ Zalo</span>
      </a>
    </div>
  )
}
