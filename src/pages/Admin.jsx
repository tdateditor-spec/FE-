import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '../lib/api'
import {
  LayoutDashboard, Users, BookOpen, LogOut,
  ArrowLeft, Plus, Search, Edit2, Trash2,
  TrendingUp, TrendingDown, DollarSign,
  Video, Clock, AlertTriangle, Lock, Unlock,
  ChevronDown, ChevronUp, Activity,
  Shield, Bell, Download, X, Check,
  GraduationCap, ShieldCheck,
} from 'lucide-react'

/* ─── Theme tokens (matching Dashboard) ─────────────────────────────────── */
const T = {
  bg:       '#0f1117',
  sidebar:  '#141520',
  card:     '#1a1d2e',
  border:   'rgba(255,255,255,0.07)',
  text:     '#f1f5f9',
  muted:    '#64748b',
  dim:      '#334155',
}

/* ─── Shared UI primitives ───────────────────────────────────────────────── */
function DarkCard({ children, className = '' }) {
  return (
    <div className={`rounded-2xl border p-5 ${className}`}
      style={{ background: T.card, borderColor: T.border }}>
      {children}
    </div>
  )
}

function DarkInput({ value, onChange, placeholder, type = 'text', className = '' }) {
  return (
    <input
      type={type} value={value} onChange={onChange} placeholder={placeholder}
      className={`w-full rounded-xl border bg-white/[0.04] px-3 py-2 text-[13px] text-slate-200 placeholder:text-slate-600
        outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all ${className}`}
      style={{ borderColor: T.border }}
    />
  )
}

function DarkBadge({ children, color = 'slate' }) {
  const colors = {
    green:  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    yellow: 'bg-yellow-500/10  text-yellow-400  border-yellow-500/20',
    blue:   'bg-blue-500/10    text-blue-400    border-blue-500/20',
    red:    'bg-red-500/10     text-red-400     border-red-500/20',
    slate:  'bg-white/[0.05]   text-slate-400   border-white/10',
  }
  return (
    <span className={`inline-flex items-center gap-1 rounded-xl border px-2 py-0.5 text-[11px] font-semibold ${colors[color]}`}>
      {children}
    </span>
  )
}

/* Modal overlay */
function Modal({ open, onClose, title, children, maxW = '420px' }) {
  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose() }
    if (open) window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ opacity:0, scale:0.96, y:8 }} animate={{ opacity:1, scale:1, y:0 }}
        exit={{ opacity:0, scale:0.96 }} transition={{ duration: 0.18 }}
        className="w-full rounded-3xl border p-6 shadow-2xl"
        style={{ maxWidth: maxW, background: '#1a1d2e', borderColor: T.border }}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[15px] font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="text-slate-600 hover:text-white transition-colors"><X size={16}/></button>
        </div>
        {children}
      </motion.div>
    </div>
  )
}

function ModalFooter({ onCancel, onConfirm, confirmLabel = 'Lưu', danger = false }) {
  return (
    <div className="flex justify-end gap-2 mt-5 pt-4" style={{ borderTop: `1px solid ${T.border}` }}>
      <button onClick={onCancel}
        className="rounded-xl border px-4 py-2 text-[13px] text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all"
        style={{ borderColor: T.border }}>
        Huỷ
      </button>
      <button onClick={onConfirm}
        className={`rounded-xl px-4 py-2 text-[13px] font-semibold text-white transition-all ${
          danger ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'
        }`}>
        {confirmLabel}
      </button>
    </div>
  )
}

function FormField({ label, children, hint }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-medium text-slate-400 uppercase tracking-wide">{label}</label>
      {children}
      {hint && <p className="text-[11px] text-slate-600">{hint}</p>}
    </div>
  )
}

/* ─── Overview ───────────────────────────────────────────────────────────── */
function Overview({ users, chapters }) {
  const totalLessons = chapters.reduce((s,c)=>s+c.lessons.length, 0)
  const paid         = users.filter(u=>u.paid).length
  const active       = users.filter(u=>u.status==='active').length
  const avgProgress  = users.length ? Math.round(users.reduce((s,u)=>s+u.progress,0)/users.length) : 0
  const withVideo    = chapters.reduce((s,c)=>s+c.lessons.filter(l=>l.videoUrl).length, 0)

  const stats = [
    { title:'Doanh thu', value:`${paid * 799}K`, sub:`${paid} đã thanh toán`, icon:DollarSign, color:'text-emerald-400', up:true },
    { title:'Học viên',  value:users.length,      sub:`${active} đang học`,   icon:Users,      color:'text-blue-400',    up:true },
    { title:'Tiến độ TB',value:`${avgProgress}%`, sub:'Toàn bộ học viên',     icon:Activity,   color:'text-violet-400',  up:avgProgress>50 },
    { title:'Bài học',   value:totalLessons,       sub:`${withVideo} có video`, icon:BookOpen,  color:'text-yellow-400',  up:true },
  ]

  const chapterDots = ['bg-violet-500','bg-blue-500','bg-emerald-500']

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Dashboard</h1>
          <p className="text-[13px] text-slate-500 mt-0.5">Chào mừng trở lại, Admin 👋</p>
        </div>
        <button className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-4 py-2 text-[13px] text-slate-400 hover:text-white transition-all">
          <Download size={13}/> Xuất báo cáo
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ title, value, sub, icon:Icon, color, up }) => (
          <DarkCard key={title}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[12px] text-slate-500">{title}</p>
              <Icon size={15} className={color}/>
            </div>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="flex items-center gap-1 text-[11px] text-slate-600 mt-1">
              {up ? <TrendingUp size={10} className="text-emerald-500"/> : <TrendingDown size={10} className="text-red-500"/>}
              {sub}
            </p>
          </DarkCard>
        ))}
      </div>

      {/* Lower section */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">

        {/* Chapter progress — col 4 */}
        <DarkCard className="lg:col-span-4">
          <p className="text-[13px] font-semibold text-white mb-1">Tiến độ theo chương</p>
          <p className="text-[12px] text-slate-500 mb-4">Phân tích bài học & video</p>
          <div className="space-y-5">
            {chapters.map((ch, ci) => {
              const total    = ch.lessons.length
              const hasVideo = ch.lessons.filter(l=>l.videoUrl).length
              const pct      = total ? Math.round((hasVideo/total)*100) : 0
              return (
                <div key={ch.id} className="space-y-2">
                  <div className="flex items-center justify-between text-[12px]">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-xl ${chapterDots[ci]||'bg-slate-500'}`}/>
                      <span className="text-slate-300 font-medium">{ch.title}</span>
                    </div>
                    <span className="text-slate-600">{total} bài · {hasVideo} video</span>
                  </div>
                  <div className="h-1.5 rounded-xl overflow-hidden" style={{ background:'rgba(255,255,255,0.06)' }}>
                    <motion.div className={`h-full rounded-xl ${chapterDots[ci]||'bg-slate-500'}`}
                      initial={{ width:0 }} animate={{ width:`${pct||5}%` }} transition={{ duration:0.8, delay:ci*0.1 }}/>
                  </div>
                </div>
              )
            })}
            <div className="pt-3" style={{ borderTop:`1px solid ${T.border}` }}>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { label:'Tổng bài', value:totalLessons, color:'text-white' },
                  { label:'Có video', value:withVideo,    color:'text-blue-400' },
                  { label:'Miễn phí', value:chapters.reduce((s,c)=>s+c.lessons.filter(l=>l.free).length,0), color:'text-emerald-400' },
                ].map(i=>(
                  <div key={i.label} className="rounded-xl border p-3" style={{ background:'rgba(255,255,255,0.03)', borderColor:T.border }}>
                    <p className={`text-xl font-bold ${i.color}`}>{i.value}</p>
                    <p className="text-[11px] text-slate-600 mt-0.5">{i.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DarkCard>

        {/* Recent users — col 3 */}
        <DarkCard className="lg:col-span-3">
          <p className="text-[13px] font-semibold text-white mb-1">Học viên gần đây</p>
          <p className="text-[12px] text-slate-500 mb-4">{users.length} học viên đã đăng ký</p>
          <div className="space-y-4">
            {users.slice(0,6).map(u => (
              <div key={u.id} className="flex items-center gap-3">
                <div className="h-8 w-8 flex-shrink-0 rounded-xl bg-blue-600 flex items-center justify-center text-[11px] font-bold text-white">
                  {u.name.split(' ').map(w=>w[0]).slice(-2).join('').toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-slate-200 font-medium truncate">{u.name}</p>
                  <p className="text-[11px] text-slate-600 truncate">{u.email}</p>
                </div>
                <span className={`text-[12px] font-semibold flex-shrink-0 ${u.paid ? 'text-emerald-400' : 'text-slate-600'}`}>
                  {u.paid ? `+799K` : 'Chưa TT'}
                </span>
              </div>
            ))}
            {users.length === 0 && <p className="text-[13px] text-slate-600 text-center py-4">Chưa có học viên</p>}
          </div>
        </DarkCard>
      </div>
    </div>
  )
}

/* ─── User Management ────────────────────────────────────────────────────── */
function UserManagement({ users, setUsers }) {
  const [search, setSearch]  = useState('')
  const [modal, setModal]    = useState(null)   // null | 'add' | user-obj
  const [confirmDel, setDel] = useState(null)
  const [form, setForm]      = useState({ name:'', email:'', phone:'', status:'active', paid:false })

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd  = () => { setForm({ name:'', email:'', phone:'', status:'active', paid:false }); setModal('add') }
  const openEdit = u  => { setForm({ name:u.name, email:u.email, phone:u.phone, status:u.status, paid:u.paid }); setModal(u) }
  const save = async () => {
    if (!form.name || !form.email) return
    try {
      if (modal === 'add') {
        const newUser = await api.addUser(form)
        setUsers(p => [...p, newUser])
      } else {
        const updated = await api.updateUser(modal.id, form)
        setUsers(p => p.map(u => u.id===modal.id ? updated : u))
      }
    } catch {}
    setModal(null)
  }
  const del = async id => {
    try { await api.deleteUser(id) } catch {}
    setUsers(p => p.filter(u=>u.id!==id)); setDel(null)
  }
  const toggleLock = async id => {
    const u = users.find(x=>x.id===id)
    const newStatus = u.status==='inactive' ? 'active' : 'inactive'
    try { await api.updateUser(id, { status: newStatus }) } catch {}
    setUsers(p => p.map(u => u.id===id ? { ...u, status: newStatus } : u))
  }

  const statusMap = {
    active:   { label:'Đang học',  color:'green'  },
    inactive: { label:'Dừng học',  color:'slate'  },
    pending:  { label:'Chờ duyệt', color:'yellow' },
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Học viên</h1>
          <p className="text-[13px] text-slate-500 mt-0.5">Quản lý toàn bộ học viên</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2 text-[13px] font-semibold text-white transition-all">
          <Plus size={14}/> Thêm học viên
        </button>
      </div>

      <DarkCard className="!p-0 overflow-hidden">
        {/* Search */}
        <div className="px-4 py-3" style={{ borderBottom:`1px solid ${T.border}` }}>
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"/>
            <DarkInput value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Tìm theo tên hoặc email..." className="pl-8"/>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr style={{ borderBottom:`1px solid ${T.border}` }}>
                {['Học viên','SĐT','Trạng thái','Tiến độ','Thanh toán','Ngày tham gia',''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-slate-600">Không tìm thấy học viên nào</td></tr>
              )}
              {filtered.map((u, i) => {
                const st = statusMap[u.status] || statusMap.inactive
                return (
                  <tr key={u.id} className="transition-colors hover:bg-white/[0.02]"
                    style={{ borderBottom: i < filtered.length-1 ? `1px solid ${T.border}` : 'none' }}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-7 w-7 flex-shrink-0 rounded-xl bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                          {u.name.split(' ').map(w=>w[0]).slice(-2).join('').toUpperCase()}
                        </div>
                        <div>
                          <p className="text-slate-200 font-medium">{u.name}</p>
                          <p className="text-[11px] text-slate-600">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{u.phone}</td>
                    <td className="px-4 py-3"><DarkBadge color={st.color}>{st.label}</DarkBadge></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 min-w-[90px]">
                        <div className="flex-1 h-1.5 rounded-xl overflow-hidden" style={{ background:'rgba(255,255,255,0.06)' }}>
                          <div className="h-full rounded-xl bg-blue-500" style={{ width:`${u.progress}%` }}/>
                        </div>
                        <span className="text-[11px] text-slate-600 w-8 text-right">{u.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <DarkBadge color={u.paid ? 'green' : 'yellow'}>{u.paid ? 'Đã trả' : 'Chưa trả'}</DarkBadge>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{u.joinDate}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={()=>openEdit(u)}
                          className="h-7 w-7 flex items-center justify-center rounded-xl text-slate-500 hover:text-white hover:bg-white/[0.06] transition-all">
                          <Edit2 size={13}/>
                        </button>
                        <button onClick={()=>toggleLock(u.id)}
                          className="h-7 w-7 flex items-center justify-center rounded-xl text-slate-500 hover:text-white hover:bg-white/[0.06] transition-all">
                          {u.status==='inactive' ? <Unlock size={13}/> : <Lock size={13}/>}
                        </button>
                        <button onClick={()=>setDel(u)}
                          className="h-7 w-7 flex items-center justify-center rounded-xl text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all">
                          <Trash2 size={13}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </DarkCard>

      {/* Add / Edit modal */}
      <AnimatePresence>
        {modal && (
          <Modal open={!!modal} onClose={()=>setModal(null)}
            title={modal === 'add' ? 'Thêm học viên' : 'Chỉnh sửa học viên'}>
            <div className="space-y-4">
              <FormField label="Họ tên *">
                <DarkInput value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Nguyễn Văn A"/>
              </FormField>
              <FormField label="Email *">
                <DarkInput type="email" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} placeholder="email@example.com"/>
              </FormField>
              <FormField label="Số điện thoại">
                <DarkInput value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} placeholder="09xx xxx xxx"/>
              </FormField>
              <FormField label="Trạng thái">
                <select value={form.status} onChange={e=>setForm(p=>({...p,status:e.target.value}))}
                  className="w-full rounded-xl border bg-white/[0.04] px-3 py-2 text-[13px] text-slate-200 outline-none focus:border-blue-500/50 transition-all"
                  style={{ borderColor: T.border }}>
                  <option value="active" style={{background:'#1a1d2e'}}>Đang học</option>
                  <option value="inactive" style={{background:'#1a1d2e'}}>Dừng học</option>
                  <option value="pending" style={{background:'#1a1d2e'}}>Chờ duyệt</option>
                </select>
              </FormField>
              <label className="flex items-center gap-3 cursor-pointer">
                <div onClick={()=>setForm(p=>({...p,paid:!p.paid}))}
                  className={`relative h-5 w-9 rounded-xl transition-colors ${form.paid ? 'bg-emerald-500' : 'bg-white/10'}`}>
                  <div className={`absolute top-0.5 h-4 w-4 rounded-xl bg-white shadow transition-transform ${form.paid ? 'translate-x-4' : 'translate-x-0.5'}`}/>
                </div>
                <span className="text-[13px] text-slate-300">Đã thanh toán</span>
              </label>
            </div>
            <ModalFooter onCancel={()=>setModal(null)} onConfirm={save} confirmLabel={modal==='add'?'Thêm học viên':'Lưu thay đổi'}/>
          </Modal>
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {confirmDel && (
          <Modal open={!!confirmDel} onClose={()=>setDel(null)} title="Xoá học viên" maxW="360px">
            <p className="text-[13px] text-slate-400">
              Xoá <strong className="text-white">{confirmDel.name}</strong>? Hành động này không thể hoàn tác.
            </p>
            <ModalFooter onCancel={()=>setDel(null)} onConfirm={()=>del(confirmDel.id)} confirmLabel="Xoá học viên" danger/>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Module Management ──────────────────────────────────────────────────── */
function ModuleManagement({ chapters, setChapters }) {
  const [openCh, setOpenCh]   = useState({})
  const [chModal, setChModal] = useState(null)
  const [lModal, setLModal]   = useState(null)
  const [delCh, setDelCh]     = useState(null)
  const [delL, setDelL]       = useState(null)
  const [chForm, setChForm]   = useState({ title:'', description:'' })
  const [lForm, setLForm]     = useState({ title:'', duration:'', free:false, videoUrl:'' })

  const totalLessons = chapters.reduce((s,c)=>s+c.lessons.length, 0)

  const saveCh = async () => {
    if (!chForm.title) return
    try {
      if (chModal==='add') {
        const ch = await api.addChapter(chForm)
        setChapters(p=>[...p, ch])
      } else {
        const ch = await api.updateChapter(chModal.id, chForm)
        setChapters(p=>p.map(c=>c.id===chModal.id?{...c,...ch}:c))
      }
    } catch {}
    setChModal(null)
  }
  const doDelCh = async id => {
    try { await api.deleteChapter(id) } catch {}
    setChapters(p=>p.filter(c=>c.id!==id)); setDelCh(null)
  }
  const saveL = async () => {
    if (!lForm.title) return
    const {mode, ch, l} = lModal
    try {
      if (mode==='add') {
        const lesson = await api.addLesson(ch.id, lForm)
        setChapters(p=>p.map(c=>c.id===ch.id?{...c,lessons:[...c.lessons,lesson]}:c))
      } else {
        const lesson = await api.updateLesson(ch.id, l.id, lForm)
        setChapters(p=>p.map(c=>c.id===ch.id?{...c,lessons:c.lessons.map(x=>x.id===l.id?lesson:x)}:c))
      }
    } catch {}
    setLModal(null)
  }
  const doDelL = async ({ch, l}) => {
    try { await api.deleteLesson(ch.id, l.id) } catch {}
    setChapters(p=>p.map(c=>c.id===ch.id?{...c,lessons:c.lessons.filter(x=>x.id!==l.id)}:c)); setDelL(null)
  }

  const chColors = ['bg-violet-500','bg-blue-500','bg-emerald-500']

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Nội dung khoá học</h1>
          <p className="text-[13px] text-slate-500 mt-0.5">{chapters.length} chương · {totalLessons} bài học</p>
        </div>
        <button onClick={()=>{setChForm({title:'',description:''});setChModal('add')}}
          className="flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2 text-[13px] font-semibold text-white transition-all">
          <Plus size={14}/> Thêm chương
        </button>
      </div>

      <div className="space-y-3">
        {chapters.map((ch, ci) => (
          <DarkCard key={ch.id} className="!p-0 overflow-hidden">
            {/* Chapter header */}
            <div className="flex items-center gap-3 px-4 py-3">
              <button className="flex flex-1 items-center gap-3 text-left min-w-0"
                onClick={()=>setOpenCh(p=>({...p,[ch.id]:!p[ch.id]}))}>
                <div className={`h-7 w-7 flex-shrink-0 rounded-xl flex items-center justify-center text-[11px] font-bold text-white ${chColors[ci]||'bg-slate-500'}`}>
                  {ci+1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-white">{ch.title}</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">{ch.description} · {ch.lessons.length} bài</p>
                </div>
                {openCh[ch.id] ? <ChevronUp size={14} className="text-slate-600 flex-shrink-0"/> : <ChevronDown size={14} className="text-slate-600 flex-shrink-0"/>}
              </button>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button onClick={()=>{setLForm({title:'',duration:'',free:false,videoUrl:''});setLModal({mode:'add',ch})}}
                  className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-3 py-1.5 text-[12px] text-slate-400 hover:text-white transition-all">
                  <Plus size={11}/> Thêm bài
                </button>
                <button onClick={()=>{setChForm({title:ch.title,description:ch.description||''});setChModal(ch)}}
                  className="h-7 w-7 flex items-center justify-center rounded-xl text-slate-600 hover:text-white hover:bg-white/[0.06] transition-all">
                  <Edit2 size={12}/>
                </button>
                <button onClick={()=>setDelCh(ch)}
                  className="h-7 w-7 flex items-center justify-center rounded-xl text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all">
                  <Trash2 size={12}/>
                </button>
              </div>
            </div>

            {/* Lessons */}
            <AnimatePresence initial={false}>
              {openCh[ch.id] && (
                <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}}
                  exit={{height:0,opacity:0}} transition={{duration:0.2}} className="overflow-hidden">
                  <div style={{ borderTop:`1px solid ${T.border}` }}>
                    {ch.lessons.length === 0 ? (
                      <p className="px-5 py-4 text-[13px] text-slate-600">
                        Chưa có bài học.{' '}
                        <button onClick={()=>{setLForm({title:'',duration:'',free:false,videoUrl:''});setLModal({mode:'add',ch})}}
                          className="text-blue-400 hover:underline">Thêm bài học</button>
                      </p>
                    ) : (
                      <table className="w-full text-[13px]">
                        <thead>
                          <tr style={{ borderBottom:`1px solid ${T.border}` }}>
                            {['#','Tên bài học','Thời lượng','Video','Loại',''].map(h=>(
                              <th key={h} className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wide text-slate-600">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {ch.lessons.map((l, li) => (
                            <tr key={l.id} className="hover:bg-white/[0.02] transition-colors"
                              style={{ borderBottom: li < ch.lessons.length-1 ? `1px solid ${T.border}` : 'none' }}>
                              <td className="px-4 py-2.5 text-slate-600">{li+1}</td>
                              <td className="px-4 py-2.5 text-slate-200 font-medium">{l.title}</td>
                              <td className="px-4 py-2.5">
                                <span className="flex items-center gap-1 text-[11px] text-slate-600">
                                  <Clock size={10}/>{l.duration}
                                </span>
                              </td>
                              <td className="px-4 py-2.5">
                                {l.videoUrl
                                  ? <DarkBadge color="blue"><Video size={9}/>Có video</DarkBadge>
                                  : <span className="text-[11px] text-slate-600">Chưa có</span>
                                }
                              </td>
                              <td className="px-4 py-2.5">
                                <DarkBadge color={l.free ? 'green' : 'slate'}>
                                  {l.free ? 'Miễn phí' : 'Trả phí'}
                                </DarkBadge>
                              </td>
                              <td className="px-4 py-2.5">
                                <div className="flex items-center justify-end gap-1">
                                  <button onClick={()=>{setLForm({title:l.title,duration:l.duration,free:l.free,videoUrl:l.videoUrl||''});setLModal({mode:'edit',ch,l})}}
                                    className="h-6 w-6 flex items-center justify-center rounded text-slate-600 hover:text-white hover:bg-white/[0.06] transition-all">
                                    <Edit2 size={11}/>
                                  </button>
                                  <button onClick={()=>setDelL({ch,l})}
                                    className="h-6 w-6 flex items-center justify-center rounded text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all">
                                    <Trash2 size={11}/>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </DarkCard>
        ))}
      </div>

      {/* Chapter modal */}
      <AnimatePresence>
        {chModal && (
          <Modal open={!!chModal} onClose={()=>setChModal(null)}
            title={chModal==='add' ? 'Thêm chương mới' : 'Chỉnh sửa chương'}>
            <div className="space-y-4">
              <FormField label="Tên chương *">
                <DarkInput value={chForm.title} onChange={e=>setChForm(p=>({...p,title:e.target.value}))} placeholder="VD: Chapter 4: Advanced"/>
              </FormField>
              <FormField label="Mô tả">
                <DarkInput value={chForm.description} onChange={e=>setChForm(p=>({...p,description:e.target.value}))} placeholder="Mô tả ngắn"/>
              </FormField>
            </div>
            <ModalFooter onCancel={()=>setChModal(null)} onConfirm={saveCh} confirmLabel={chModal==='add'?'Thêm chương':'Lưu'}/>
          </Modal>
        )}
      </AnimatePresence>

      {/* Lesson modal */}
      <AnimatePresence>
        {lModal && (
          <Modal open={!!lModal} onClose={()=>setLModal(null)}
            title={lModal.mode==='add' ? 'Thêm bài học' : 'Chỉnh sửa bài học'}>
            <p className="text-[12px] text-slate-600 mb-4 -mt-2">Chương: <span className="text-blue-400">{lModal.ch.title}</span></p>
            <div className="space-y-4">
              <FormField label="Tên bài học *">
                <DarkInput value={lForm.title} onChange={e=>setLForm(p=>({...p,title:e.target.value}))} placeholder="VD: Bài học về X"/>
              </FormField>
              <FormField label="Thời lượng">
                <DarkInput value={lForm.duration} onChange={e=>setLForm(p=>({...p,duration:e.target.value}))} placeholder="VD: 15:30"/>
              </FormField>
              <FormField label="URL Video" hint={lForm.videoUrl ? '✓ Đã có URL video' : 'Hỗ trợ YouTube & Vimeo'}>
                <DarkInput type="url" value={lForm.videoUrl} onChange={e=>setLForm(p=>({...p,videoUrl:e.target.value}))} placeholder="https://www.youtube.com/watch?v=..."/>
              </FormField>
              <label className="flex items-center gap-3 cursor-pointer">
                <div onClick={()=>setLForm(p=>({...p,free:!p.free}))}
                  className={`relative h-5 w-9 rounded-xl transition-colors ${lForm.free ? 'bg-emerald-500' : 'bg-white/10'}`}>
                  <div className={`absolute top-0.5 h-4 w-4 rounded-xl bg-white shadow transition-transform ${lForm.free ? 'translate-x-4' : 'translate-x-0.5'}`}/>
                </div>
                <div>
                  <span className="text-[13px] text-slate-300">Bài học miễn phí</span>
                  <p className="text-[11px] text-slate-600">Cho phép preview trước khi mua</p>
                </div>
              </label>
            </div>
            <ModalFooter onCancel={()=>setLModal(null)} onConfirm={saveL} confirmLabel={lModal.mode==='add'?'Thêm bài học':'Lưu'}/>
          </Modal>
        )}
      </AnimatePresence>

      {/* Delete chapter */}
      <AnimatePresence>
        {delCh && (
          <Modal open={!!delCh} onClose={()=>setDelCh(null)} title="Xoá chương" maxW="360px">
            <p className="text-[13px] text-slate-400">
              Xoá chương <strong className="text-white">"{delCh.title}"</strong> và{' '}
              <strong className="text-white">{delCh.lessons?.length} bài học</strong> bên trong? Không thể hoàn tác.
            </p>
            <ModalFooter onCancel={()=>setDelCh(null)} onConfirm={()=>doDelCh(delCh.id)} confirmLabel="Xoá chương" danger/>
          </Modal>
        )}
      </AnimatePresence>

      {/* Delete lesson */}
      <AnimatePresence>
        {delL && (
          <Modal open={!!delL} onClose={()=>setDelL(null)} title="Xoá bài học" maxW="360px">
            <p className="text-[13px] text-slate-400">
              Xoá bài <strong className="text-white">"{delL.l?.title}"</strong>? Không thể hoàn tác.
            </p>
            <ModalFooter onCancel={()=>setDelL(null)} onConfirm={()=>doDelL(delL)} confirmLabel="Xoá bài học" danger/>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Admin Shell ────────────────────────────────────────────────────────── */
export function Admin({ onBack, onLogout }) {
  const [page, setPage]         = useState('overview')
  const [users, setUsers]       = useState([])
  const [chapters, setChapters] = useState([])
  const [loading, setLoading]   = useState(true)
  const [avatarOpen, setAvatarOpen] = useState(false)

  useEffect(() => {
    Promise.all([api.getUsers(), api.getCourses()])
      .then(([usersData, coursesData]) => {
        setUsers(usersData)
        setChapters(coursesData.chapters)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const navItems = [
    { id:'overview', label:'Dashboard',   icon:LayoutDashboard, group:'GENERAL'    },
    { id:'users',    label:'Học viên',    icon:Users,           group:'MANAGEMENT' },
    { id:'modules',  label:'Nội dung',    icon:BookOpen,        group:'MANAGEMENT' },
  ]

  const groups = ['GENERAL','MANAGEMENT']

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: T.bg, fontFamily:'Inter,sans-serif' }}>

      {/* ── Left sidebar ── */}
      <aside className="flex flex-col w-[240px] flex-shrink-0" style={{ background: T.sidebar, borderRight:`1px solid ${T.border}` }}>

        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-3.5" style={{ borderBottom:`1px solid ${T.border}` }}>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600 flex-shrink-0">
            <ShieldCheck size={15} className="text-white"/>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-white leading-tight">VFS Admin</p>
            <p className="text-[10px] text-slate-600">Quản trị hệ thống</p>
          </div>
        </div>

        {/* Nav groups */}
        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-4">
          {groups.map(group => (
            <div key={group}>
              <p className="px-2 mb-1 text-[10px] font-semibold tracking-widest text-slate-600">{group}</p>
              {navItems.filter(i=>i.group===group).map(({ id, label, icon:Icon }) => {
                const active = page === id
                return (
                  <button key={id} onClick={()=>setPage(id)}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium transition-all mb-0.5"
                    style={{
                      background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                      color: active ? '#f1f5f9' : '#64748b',
                    }}
                    onMouseEnter={e=>{ if(!active){ e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.color='#cbd5e1' }}}
                    onMouseLeave={e=>{ if(!active){ e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#64748b' }}}
                  >
                    <Icon size={15}/>{label}
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="px-3 py-3 space-y-0.5" style={{ borderTop:`1px solid ${T.border}` }}>
          <button onClick={onBack}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] text-slate-500 hover:text-slate-200 hover:bg-white/[0.04] transition-all">
            <ArrowLeft size={14}/> Về trang học
          </button>
          <button onClick={() => { localStorage.removeItem('vfs_token'); onLogout && onLogout() }}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut size={14}/> Đăng xuất
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* Header */}
        <header className="flex-shrink-0 flex items-center justify-between px-5 py-2.5" style={{ borderBottom:`1px solid ${T.border}`, background: T.bg }}>
          <div className="flex items-center gap-2 text-[12px]">
            <span className="text-slate-600">VFS Admin</span>
            <span className="text-slate-700">/</span>
            <span className="text-slate-300 font-medium">
              {navItems.find(i=>i.id===page)?.label || 'Dashboard'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-8 w-8 flex items-center justify-center rounded-xl text-slate-500 hover:text-white hover:bg-white/[0.06] transition-all">
              <Bell size={15}/>
            </button>
            <div className="h-6 w-px mx-1" style={{ background: T.border }}/>
            {/* Avatar + Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAvatarOpen(v => !v)}
                className="h-8 w-8 flex items-center justify-center rounded-xl bg-violet-600 text-[11px] font-bold text-white hover:bg-violet-500 transition-all"
              >
                AD
              </button>
              <AnimatePresence>
                {avatarOpen && (
                  <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-40" onClick={() => setAvatarOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-10 z-50 w-48 rounded-2xl border py-1.5 shadow-2xl"
                      style={{ background: '#1a1d2e', borderColor: T.border }}
                    >
                      {/* User info */}
                      <div className="px-3 py-2 mb-1" style={{ borderBottom: `1px solid ${T.border}` }}>
                        <p className="text-[12px] font-semibold text-white">Admin</p>
                        <p className="text-[11px] text-slate-500">admin@gmail.com</p>
                      </div>
                      {/* Go to course */}
                      <button
                        onClick={() => { setAvatarOpen(false); onBack && onBack() }}
                        className="flex w-full items-center gap-2.5 px-3 py-2 text-[13px] text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all"
                      >
                        <ArrowLeft size={13}/> Về trang học
                      </button>
                      {/* Logout */}
                      <button
                        onClick={() => { setAvatarOpen(false); localStorage.removeItem('vfs_token'); onLogout && onLogout() }}
                        className="flex w-full items-center gap-2.5 px-3 py-2 text-[13px] text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                      >
                        <LogOut size={13}/> Đăng xuất
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <p className="text-[13px] text-slate-600">Đang tải dữ liệu...</p>
            </div>
          ) : (
            <>
              {page==='overview' && <Overview users={users} chapters={chapters}/>}
              {page==='users'    && <UserManagement users={users} setUsers={setUsers}/>}
              {page==='modules'  && <ModuleManagement chapters={chapters} setChapters={setChapters}/>}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
