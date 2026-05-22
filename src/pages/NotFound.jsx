import { motion } from 'framer-motion'

export function NotFound({ onBack }) {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#0f1117] px-6 text-center">
      {/* Glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* 404 number */}
        <p className="font-heading text-[120px] font-extrabold leading-none bg-gradient-to-b from-slate-600 to-slate-800 bg-clip-text text-transparent select-none">
          404
        </p>

        {/* Message */}
        <h1 className="font-heading text-2xl font-bold text-white -mt-4 mb-3">
          Trang không tồn tại
        </h1>
        <p className="text-slate-400 text-sm mb-8 max-w-sm">
          Đường dẫn anh/chị truy cập không tồn tại hoặc đã bị xoá.
        </p>

        {/* Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-500 hover:-translate-y-0.5 shadow-[0_0_24px_rgba(59,130,246,0.35)]"
        >
          ← Về trang khoá học
        </button>
      </motion.div>
    </div>
  )
}
