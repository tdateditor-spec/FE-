import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  CheckCircle2,
  Lock,
  ChevronDown,
  ChevronRight,
  LogOut,
  BookOpen,
  Clock,
  Download,
  MessageSquare,
  Bell,
  FileText,
  StickyNote,
  Send,
  ThumbsUp,
  Star,
  Paperclip,
  GraduationCap,
  PlayCircle,
  ChevronLeft,
  User,
  TrendingUp,
  Camera,
  Edit3,
  Shield,
  Target,
  Flame,
  Calendar,
  Trophy,
  ShieldCheck,
  X,
  Menu,
  LayoutDashboard,
  PlaySquare,
  FileVideo,
  Eye,
  EyeOff,
  KeyRound,
} from 'lucide-react';
import { api } from '../lib/api';

/* ─── Chapter styles (visual only, merged with API data) ──────────────────── */
const chapterStyles = [
  { color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/25', dot: 'bg-violet-500' },
  { color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/25',   dot: 'bg-blue-500'   },
  { color: 'text-emerald-400',bg: 'bg-emerald-500/10',border: 'border-emerald-500/25',dot: 'bg-emerald-500' },
];

function flattenLessons(chapters) {
  return chapters.flatMap((c, ci) =>
    c.lessons.map((l, li) => ({
      ...l,
      chapterId: c.id,
      num: chapters.slice(0, ci).reduce((s, x) => s + x.lessons.length, 0) + li + 1,
    }))
  );
}

const lessonResources = [
  { name: 'Template mục tiêu SMART.pdf', size: '245 KB', type: 'pdf' },
  { name: 'Bảng tính rate freelance.xlsx', size: '128 KB', type: 'xlsx' },
  { name: 'Roadmap 90 ngày (printable).pdf', size: '1.2 MB', type: 'pdf' },
];
const discussions = [
  {
    id: 1,
    user: 'Minh Anh',
    avatar: 'MA',
    time: '2 ngày trước',
    likes: 12,
    text: 'Mình đã áp dụng phương pháp phân tích ngược này và thực sự thấy rõ hướng đi hơn rất nhiều!',
    replies: [
      {
        id: 2,
        user: 'Huy Trainer',
        avatar: 'HT',
        time: '1 ngày trước',
        likes: 5,
        isInstructor: true,
        text: 'Tuyệt vời! Chia sẻ kết quả sau 30 ngày nhé.',
      },
    ],
  },
  {
    id: 3,
    user: 'Kiên',
    avatar: 'K',
    time: '5 ngày trước',
    likes: 8,
    text: 'Câu hỏi về rate: mới bắt đầu có nên nhận job $50 để xây portfolio không ạ?',
    replies: [],
  },
];

/* ─── Video helpers ───────────────────────────────────────────────────────── */


function getThumbUrl(videoUrl) {
  if (!videoUrl) return null;
  const short = videoUrl.match(/youtu\.be\/([^?&\s]+)/);
  if (short) return `https://img.youtube.com/vi/${short[1]}/mqdefault.jpg`;
  const long = videoUrl.match(/[?&]v=([^&\s]+)/);
  if (long) return `https://img.youtube.com/vi/${long[1]}/mqdefault.jpg`;
  return null;
}

function getEmbedUrl(url) {
  if (!url) return null;
  const short = url.match(/youtu\.be\/([^?&\s]+)/);
  if (short)
    return `https://www.youtube.com/embed/${short[1]}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`;
  const long = url.match(/[?&]v=([^&\s]+)/);
  if (long)
    return `https://www.youtube.com/embed/${long[1]}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`;
  if (url.includes('youtube.com/embed/'))
    return url.includes('autoplay') ? url : url + '?autoplay=1&rel=0&enablejsapi=1';
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;
  const driveFile = url.match(/drive\.google\.com\/file\/d\/([^/?&\s]+)/);
  if (driveFile) return `https://drive.google.com/file/d/${driveFile[1]}/preview?rm=minimal`;
  const driveOpen = url.match(/drive\.google\.com\/open\?id=([^&\s]+)/);
  if (driveOpen) return `https://drive.google.com/file/d/${driveOpen[1]}/preview?rm=minimal`;
  if (url.includes('drive.google.com/file/d/') && url.includes('/preview'))
    return url.includes('rm=minimal') ? url : url + '?rm=minimal';
  return null;
}

function fmtSecs(s) {
  if (!s || s <= 0) return null;
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), ss = Math.floor(s % 60);
  return h > 0
    ? `${h}:${String(m).padStart(2,'0')}:${String(ss).padStart(2,'0')}`
    : `${m}:${String(ss).padStart(2,'0')}`;
}


/* ─── Video Player ────────────────────────────────────────────────────────── */
function VideoPlayer({ lesson }) {
  const [playing, setPlaying] = useState(false);
  const [realDuration, setRealDuration] = useState(null);
  const iframeRef = useRef(null);
  const embedUrl = getEmbedUrl(lesson?.videoUrl);
  const isDrive = embedUrl?.includes('drive.google.com');
  const displayDuration = realDuration ? fmtSecs(realDuration) : (lesson?.duration ?? '—');

  // Lấy duration thực từ YouTube qua postMessage
  useEffect(() => {
    if (!playing || !embedUrl?.includes('youtube.com')) return;
    const handler = (e) => {
      if (!String(e.origin).includes('youtube.com')) return;
      try {
        const d = JSON.parse(e.data);
        if (d.event === 'infoDelivery' && d.info?.duration > 0)
          setRealDuration(d.info.duration);
      } catch { return; }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [playing, embedUrl]);

  const handlePlay = () => {
    if (iframeRef.current && embedUrl) iframeRef.current.src = embedUrl;
    setPlaying(true);
  };

  const handleStop = () => {
    if (iframeRef.current) iframeRef.current.src = '';
    setPlaying(false);
  };

  // Google Drive: hiện iframe thẳng, không cần poster (Drive không hỗ trợ autoplay)
  if (isDrive && embedUrl) {
    return (
      <div className="relative w-full bg-black overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="autoplay"
          allowFullScreen
          title={lesson?.title}
        />
<div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-xl bg-black/60 px-3 py-1.5 text-[11px] text-slate-300 pointer-events-none">
          <Clock size={10} />
          {displayDuration}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-black overflow-hidden" style={{ aspectRatio: '16/9' }}>

      {/* Iframe pre-rendered cho YouTube/Vimeo */}
      {embedUrl && (
        <iframe
          ref={iframeRef}
          src=""
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={lesson?.title}
          style={{ display: playing ? 'block' : 'none' }}
        />
      )}

      {playing && (
        <button
          onClick={handleStop}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-xl bg-black/60 text-white hover:bg-black/80 transition-all z-10"
        >
          <X size={14} />
        </button>
      )}

      {!playing && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#0d1226] to-[#0a0a1a]">
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: 'radial-gradient(circle, #60a5fa 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center px-8">
              {embedUrl ? (
                <p className="text-blue-400 text-[10px] uppercase tracking-widest mb-2 flex items-center justify-center gap-1.5">
                  <PlayCircle size={11} /> Video thực hành
                </p>
              ) : (
                <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-2">Bài học</p>
              )}
              <p className="text-white text-base font-semibold leading-snug max-w-md">{lesson?.title}</p>
              {!embedUrl && (
                <p className="mt-2 text-[11px] text-slate-600">Chưa có video — Thêm URL trong trang Admin</p>
              )}
            </div>
          </div>
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center group"
          >
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 border border-white/20 group-hover:bg-white/20 backdrop-blur-sm shadow-lg transition-all"
            >
              <Play size={22} className="text-white ml-1" fill="white" />
            </motion.div>
          </button>
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-xl bg-black/60 px-3 py-1.5 text-[11px] text-slate-300 pointer-events-none">
            <Clock size={10} />
            {displayDuration}
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Tab: Content ────────────────────────────────────────────────────────── */
function TabContent({ lesson }) {
  const points = (lesson?.keyPoints || '').split('\n').filter(Boolean);
  const tags   = (lesson?.tags || '').split(',').map(t => t.trim()).filter(Boolean);

  return (
    <div className="space-y-6">
      {points.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Star size={13} className="text-yellow-500" /> Điểm chính trong bài
          </h3>
          <ul className="space-y-2.5">
            {points.map((pt, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3"
              >
                <div className="flex-shrink-0 h-5 w-5 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mt-0.5">
                  <span className="text-[9px] font-bold text-primary">{i + 1}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{pt}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
      {lesson?.content && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <FileText size={13} className="text-muted-foreground" /> Nội dung bài giảng
          </h3>
          <div className="rounded-xl border bg-muted/40 p-4">
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {lesson.content}
            </p>
          </div>
        </div>
      )}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map(t => (
            <span key={t} className="rounded-xl border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {t}
            </span>
          ))}
        </div>
      )}
      {points.length === 0 && !lesson?.content && tags.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">Chưa có nội dung. Admin có thể thêm tại trang quản lý.</p>
      )}
    </div>
  );
}

/* ─── Tab: Notes ──────────────────────────────────────────────────────────── */
function TabNotes() {
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <StickyNote size={13} className="text-yellow-500" /> Ghi chú cá nhân
        </h3>
        <p className="text-xs text-muted-foreground">Chỉ bạn thấy</p>
      </div>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Ghi lại những điểm quan trọng..."
        rows={10}
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
      />
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{note.length} ký tự</p>
        <button
          onClick={() => {
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
          }}
          className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-all ${saved ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}
        >
          {saved ? (
            <>
              <CheckCircle2 size={12} /> Đã lưu
            </>
          ) : (
            'Lưu ghi chú'
          )}
        </button>
      </div>
    </div>
  );
}

/* ─── Tab: Resources ──────────────────────────────────────────────────────── */
function TabResources() {
  const icons = { pdf: '📄', xlsx: '📊', mp4: '🎬', zip: '📦' };
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
        <Paperclip size={13} className="text-muted-foreground" /> Tài liệu đính
        kèm
      </h3>
      {lessonResources.map((r, i) => (
        <motion.div
          key={r.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="flex items-center justify-between rounded-xl border bg-card p-4 hover:bg-accent transition-all cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">{icons[r.type] || '📎'}</span>
            <div>
              <p className="text-sm text-foreground font-medium">{r.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{r.size}</p>
            </div>
          </div>
          <button className="flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-all">
            <Download size={12} /> Tải xuống
          </button>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Tab: Discussion ─────────────────────────────────────────────────────── */
function TabDiscussion() {
  const [newQ, setNewQ] = useState('');
  const [threads, setThreads] = useState(discussions);
  const [openReply, setOpenReply] = useState(null);
  const post = () => {
    if (!newQ.trim()) return;
    setThreads((p) => [
      {
        id: Date.now(),
        user: 'Bạn',
        avatar: 'B',
        time: 'Vừa xong',
        likes: 0,
        text: newQ,
        replies: [],
      },
      ...p,
    ]);
    setNewQ('');
  };
  return (
    <div className="space-y-4">
      <div className="rounded-xl border bg-card p-4">
        <p className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
          <MessageSquare size={13} className="text-primary" /> Đặt câu hỏi
        </p>
        <textarea
          value={newQ}
          onChange={(e) => setNewQ(e.target.value)}
          placeholder="Hỏi bất cứ điều gì..."
          rows={3}
          className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none focus:border-primary/50 transition-all"
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={post}
            className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all"
          >
            <Send size={12} /> Gửi câu hỏi
          </button>
        </div>
      </div>
      {threads.map((t) => (
        <div key={t.id} className="rounded-xl border bg-card p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="h-8 w-8 flex-shrink-0 rounded-xl bg-muted flex items-center justify-center text-xs font-bold text-foreground">
              {t.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">
                  {t.user}
                </span>
                <span className="text-xs text-muted-foreground">{t.time}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                {t.text}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 pl-11 mb-2">
            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
              <ThumbsUp size={11} /> {t.likes}
            </button>
            <button
              onClick={() => setOpenReply(openReply === t.id ? null : t.id)}
              className="text-xs text-muted-foreground hover:text-primary"
            >
              Trả lời
            </button>
          </div>
          {t.replies.map((r) => (
            <div
              key={r.id}
              className="ml-11 mt-3 rounded-xl border bg-muted/30 p-3 flex gap-3"
            >
              <div
                className={`h-7 w-7 flex-shrink-0 rounded-xl flex items-center justify-center text-[10px] font-bold text-white ${r.isInstructor ? 'bg-primary' : 'bg-muted-foreground'}`}
              >
                {r.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-foreground">
                    {r.user}
                  </span>
                  {r.isInstructor && (
                    <span className="rounded-xl bg-primary/10 border border-primary/20 px-1.5 py-0.5 text-[9px] font-bold text-primary">
                      TRAINER
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {r.time}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                  {r.text}
                </p>
              </div>
            </div>
          ))}
          {openReply === t.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="ml-11 mt-3 flex gap-2"
            >
              <input
                placeholder="Viết trả lời..."
                className="flex-1 rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50"
              />
              <button className="rounded-xl bg-primary px-3 py-2 text-primary-foreground hover:bg-primary/90">
                <Send size={12} />
              </button>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Lesson Thumbnail ────────────────────────────────────────────────────── */
function LessonThumb({ lesson, isActive, isDone, isLocked }) {
  const thumb = getThumbUrl(lesson?.videoUrl);
  return (
    <div
      className={`relative flex-shrink-0 w-[72px] h-[42px] rounded overflow-hidden border ${
        isActive ? 'border-blue-500/60' : 'border-white/10'
      }`}
      style={{ background: '#1e2030' }}
    >
      {thumb && (
        <img
          src={thumb}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        {isLocked ? (
          <Lock size={13} className="text-slate-400 drop-shadow" />
        ) : isDone ? (
          <CheckCircle2 size={14} className="text-emerald-400 drop-shadow" />
        ) : (
          <PlayCircle
            size={14}
            className={`drop-shadow ${isActive ? 'text-blue-400' : 'text-slate-400'}`}
          />
        )}
      </div>
      {isActive && <div className="absolute inset-0 bg-blue-600/20" />}
    </div>
  );
}

/* ─── Profile Modal ──────────────────────────────────────────────────────── */
function PassInput({ label, value, onChange, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-slate-400">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:border-blue-500/60 focus:bg-blue-500/[0.06]"
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
        >
          {show ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
    </div>
  );
}

/* ─── Dashboard ───────────────────────────────────────────────────────────── */
export function Dashboard({ onLogout, onAdmin, onProfile }) {
  const [chapters, setChapters] = useState([]);
  const [loadingCourse, setLoadingCourse] = useState(true);
  const [activeLesson, setActiveLesson] = useState(null);
  const [tab, setTab] = useState('content');
  const [doneIds, setDoneIds] = useState(new Set());
  const [openChapters, setOpenChapters] = useState({});
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [user] = useState(() => {
    try {
      const token = localStorage.getItem('vfs_token');
      if (!token) return null;
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(
        decodeURIComponent(
          atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
        )
      );
      return { name: payload.name, email: payload.email, role: payload.role };
    } catch { return null; }
  });
  const avatarRef = useRef(null);

  // Load chapters from API
  useEffect(() => {
    api.getCourses()
      .then((data) => {
        const raw = data.chapters || [];
        const styled = raw.map((ch, ci) => ({
          ...ch,
          ...(chapterStyles[ci] || chapterStyles[chapterStyles.length - 1]),
        }));
        setChapters(styled);
        const initialOpen = {};
        styled.forEach((ch) => { initialOpen[ch.id] = !ch.locked; });
        setOpenChapters(initialOpen);
        const allL = flattenLessons(styled);
        setDoneIds(new Set(allL.filter((l) => l.done).map((l) => l.id)));
        const unlockedL = allL.filter((l) => !l.locked);
        const first = unlockedL.find((l) => !l.done) || unlockedL[0];
        if (first) setActiveLesson(first);
      })
      .catch(() => {})
      .finally(() => setLoadingCourse(false));
  }, []);

  useEffect(() => {
    if (!avatarOpen) return;
    const handler = (e) => {
      if (!e.target.closest('[data-avatar-menu]')) setAvatarOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [avatarOpen]);

  const allLessons = flattenLessons(chapters);
  const unlocked = allLessons.filter((l) => !l.locked);

  const done = doneIds.size;
  const total = allLessons.length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const activeChapter = chapters.find((c) =>
    c.lessons.some((l) => l.id === activeLesson?.id)
  );
  const currentIdx = unlocked.findIndex((l) => l.id === activeLesson?.id);
  const prevLesson = unlocked[currentIdx - 1];
  const nextLesson = unlocked[currentIdx + 1];

  const selectLesson = (l) => {
    setActiveLesson(l);
    setTab('content');
  };
  const markDone = () => {
    setDoneIds((prev) => new Set([...prev, activeLesson.id]));
    if (nextLesson) selectLesson(nextLesson);
  };

  const tabs = [
    { id: 'content', label: 'Nội dung', icon: BookOpen },
    { id: 'notes', label: 'Ghi chú', icon: StickyNote },
    { id: 'resources', label: 'Tài liệu', icon: Download },
    { id: 'discussion', label: 'Thảo luận', icon: MessageSquare },
  ];

  if (loadingCourse) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0f1117]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
          <p className="text-[13px] text-slate-500">Đang tải khoá học...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0f1117]">
      {/* ── LEFT SIDEBAR — course curriculum ── */}
      <aside
        className="flex flex-col w-[300px] flex-shrink-0 border-r border-white/[0.07]"
        style={{ background: '#141520' }}
      >
        {/* Top: logo + back */}
        <div className="flex items-center gap-3 px-4 py-3.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 flex-shrink-0">
            <GraduationCap size={15} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-white leading-tight truncate">
              VIRAL FREEDOM SYSTEM
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              90-Day Challenge
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] text-slate-400">
              {done} of {total} lessons completed
            </span>
            <span className="text-[11px] font-semibold text-blue-400">
              {pct}%
            </span>
          </div>
          <div className="h-1.5 rounded-xl bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-xl bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Chapter accordion */}
        <div className="flex-1 overflow-y-auto py-2">
          {chapters.map((ch, ci) => (
            <div key={ch.id}>
              {/* Chapter header */}
              <button
                onClick={() =>
                  setOpenChapters((p) => ({ ...p, [ch.id]: !p[ch.id] }))
                }
                className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`h-2 w-2 rounded-xl flex-shrink-0 ${ch.locked ? 'bg-slate-600' : ch.dot}`}
                  />
                  <div className="min-w-0">
                    <p
                      className={`text-[12px] font-semibold leading-tight ${ch.locked ? 'text-slate-600' : 'text-slate-200'}`}
                    >
                      {ch.title}
                    </p>
                    <p className="text-[10px] text-slate-600 mt-0.5">
                      {ch.lessons.filter((l) => doneIds.has(l.id)).length}/
                      {ch.lessons.length} bài
                      {ch.locked && (
                        <span className="ml-1.5 inline-flex items-center gap-0.5">
                          <Lock size={8} /> Đã khóa
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="text-slate-600 flex-shrink-0 ml-2">
                  {openChapters[ch.id] ? (
                    <ChevronDown size={13} />
                  ) : (
                    <ChevronRight size={13} />
                  )}
                </div>
              </button>

              {/* Lessons list */}
              <AnimatePresence initial={false}>
                {openChapters[ch.id] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    {ch.lessons.map((lesson, li) => {
                      const isActive = activeLesson?.id === lesson.id;
                      const isDone = doneIds.has(lesson.id);
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => !lesson.locked && selectLesson(lesson)}
                          disabled={lesson.locked}
                          className="flex w-full items-start gap-3 px-4 py-2.5 text-left transition-colors"
                          style={{
                            background: isActive
                              ? 'rgba(59,130,246,0.1)'
                              : 'transparent',
                            borderLeft: isActive
                              ? '2px solid #3b82f6'
                              : '2px solid transparent',
                            cursor: lesson.locked ? 'not-allowed' : 'pointer',
                            opacity: lesson.locked ? 0.4 : 1,
                          }}
                        >
                          {/* Thumbnail */}
                          <LessonThumb
                            lesson={lesson}
                            isActive={isActive}
                            isDone={isDone}
                            isLocked={lesson.locked}
                          />

                          {/* Lesson info */}
                          <div className="flex-1 min-w-0 pt-0.5">
                            <p
                              className={`text-[12px] leading-snug font-medium ${
                                isActive
                                  ? 'text-blue-300'
                                  : isDone
                                    ? 'text-slate-500 line-through'
                                    : 'text-slate-300'
                              }`}
                            >
                              {lesson.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="flex items-center gap-1 text-[10px] text-slate-600">
                                <Clock size={9} /> {lesson.duration}
                              </span>
                              {isDone && (
                                <span className="flex items-center gap-0.5 text-[10px] text-emerald-500">
                                  <CheckCircle2 size={9} /> Xong
                                </span>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <div className="h-4" />
        </div>

        {/* Bottom: admin + logout */}
        <div className="border-t border-white/[0.07] px-3 py-3 space-y-1">
          {onAdmin && user?.role === 'admin' && (
            <button
              onClick={onAdmin}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-[12px] text-violet-400 hover:bg-violet-500/10 transition-colors"
            >
              <ShieldCheck size={13} /> Quản trị Admin
            </button>
          )}
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-[12px] text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={13} /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex-shrink-0 flex items-center justify-between px-5 py-2.5 border-b border-white/[0.07] bg-[#0f1117]">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[12px] min-w-0">
            <span className="text-slate-600">
              {activeChapter?.title || 'Khoá học'}
            </span>
            <ChevronRight size={12} className="text-slate-700 flex-shrink-0" />
            <span className="text-slate-300 font-medium truncate max-w-[240px]">
              {activeLesson?.title}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Prev / Next */}
            {prevLesson && (
              <button
                onClick={() => selectLesson(prevLesson)}
                className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-4 py-1.5 text-[12px] text-slate-400 hover:text-white transition-all"
              >
                <ChevronLeft size={13} /> Trước
              </button>
            )}
            {nextLesson && (
              <button
                onClick={() => selectLesson(nextLesson)}
                className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-4 py-1.5 text-[12px] text-slate-400 hover:text-white transition-all"
              >
                Tiếp <ChevronRight size={13} />
              </button>
            )}

            {/* Avatar */}
            <div className="relative" data-avatar-menu>
              <button
                ref={avatarRef}
                onClick={() => setAvatarOpen((v) => !v)}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-[12px] font-bold text-white hover:bg-blue-500 transition-colors ml-1"
              >
                {user
                  ? user.name
                      .split(' ')
                      .map((w) => w[0])
                      .slice(-2)
                      .join('')
                      .toUpperCase()
                  : 'U'}
              </button>
              {avatarOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    zIndex: 9999,
                    background: '#1e2030',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0.75rem',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                    overflow: 'hidden',
                    width: '210px',
                  }}
                >
                  <div
                    style={{
                      padding: '12px 14px',
                      borderBottom: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#f1f5f9',
                      }}
                    >
                      {user?.name || 'Học Viên VFS'}
                    </p>
                    <p style={{ fontSize: 11, color: '#475569', marginTop: 2 }}>
                      {user?.email || ''}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setAvatarOpen(false);
                      if (onProfile) onProfile();
                    }}
                    style={{
                      display: 'flex',
                      width: '100%',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 14px',
                      fontSize: 12,
                      color: '#94a3b8',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        'rgba(255,255,255,0.05)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = 'none')
                    }
                  >
                    <User size={13} /> Hồ sơ & Đổi mật khẩu
                  </button>
                  {onAdmin && user?.role === 'admin' && (
                    <button
                      onClick={() => {
                        setAvatarOpen(false);
                        onAdmin();
                      }}
                      style={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        gap: 10,
                        padding: '10px 14px',
                        fontSize: 12,
                        color: '#a78bfa',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          'rgba(139,92,246,0.1)')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = 'none')
                      }
                    >
                      <ShieldCheck size={13} /> Quản trị Admin
                    </button>
                  )}
                  <div
                    style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <button
                      onClick={() => {
                        setAvatarOpen(false);
                        onLogout();
                      }}
                      style={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        gap: 10,
                        padding: '10px 14px',
                        fontSize: 12,
                        color: '#f87171',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          'rgba(239,68,68,0.08)')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = 'none')
                      }
                    >
                      <LogOut size={13} /> Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {/* Video player — full width, no padding */}
          <div className="w-full bg-black">
            <VideoPlayer lesson={activeLesson} key={activeLesson?.id} />
          </div>

          {/* Content area */}
          <div className="px-6 py-5 max-w-4xl">
            {/* Lesson title + mark done */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="min-w-0">
                {activeChapter && (
                  <span
                    className={`inline-block mb-2 rounded-xl px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider border ${activeChapter.bg} ${activeChapter.color} ${activeChapter.border}`}
                  >
                    {activeChapter.title}
                  </span>
                )}
                <h1 className="text-lg font-semibold text-white leading-snug">
                  {activeLesson?.title}
                </h1>
                <p className="flex items-center gap-3 mt-1 text-[12px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock size={10} /> {activeLesson?.duration}
                  </span>
                  {doneIds.has(activeLesson?.id) && (
                    <span className="flex items-center gap-1 text-emerald-500">
                      <CheckCircle2 size={10} /> Đã hoàn thành
                    </span>
                  )}
                </p>
              </div>

              {!doneIds.has(activeLesson?.id) ? (
                <button
                  onClick={markDone}
                  className="flex-shrink-0 flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-[13px] font-semibold text-white transition-all shadow-lg shadow-emerald-900/30"
                >
                  <CheckCircle2 size={14} /> Hoàn thành
                </button>
              ) : (
                <div className="flex-shrink-0 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-2.5 text-[13px] font-semibold text-emerald-400">
                  <CheckCircle2 size={14} /> Đã xong
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="border-b border-white/[0.07] mb-5">
              <div className="flex gap-0">
                {tabs.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setTab(id)}
                    className={`flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-medium border-b-2 -mb-px transition-all ${
                      tab === id
                        ? 'border-blue-500 text-white'
                        : 'border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Icon size={12} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {tab === 'content' && <TabContent lesson={activeLesson} />}
                {tab === 'notes' && <TabNotes />}
                {tab === 'resources' && <TabResources />}
                {tab === 'discussion' && <TabDiscussion />}
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next nav cards */}
            <div className="mt-8 flex gap-3">
              {prevLesson ? (
                <button
                  onClick={() => selectLesson(prevLesson)}
                  className="flex-1 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] p-4 text-left transition-all group"
                >
                  <ChevronLeft
                    size={15}
                    className="text-slate-600 group-hover:text-white flex-shrink-0 transition-colors"
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-600 mb-1 uppercase tracking-wide">
                      Bài trước
                    </p>
                    <p className="text-[13px] text-slate-300 group-hover:text-white truncate transition-colors">
                      {prevLesson.title}
                    </p>
                  </div>
                </button>
              ) : (
                <div className="flex-1" />
              )}
              {nextLesson && (
                <button
                  onClick={() => selectLesson(nextLesson)}
                  className="flex-1 flex items-center justify-end gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] p-4 text-right transition-all group"
                >
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-600 mb-1 uppercase tracking-wide">
                      Bài tiếp theo
                    </p>
                    <p className="text-[13px] text-slate-300 group-hover:text-white truncate transition-colors">
                      {nextLesson.title}
                    </p>
                  </div>
                  <ChevronRight
                    size={15}
                    className="text-slate-600 group-hover:text-blue-400 flex-shrink-0 transition-colors"
                  />
                </button>
              )}
            </div>
            <div className="h-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
