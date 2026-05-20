import { cn } from '@/lib/utils'

export function ShimmerButton({ children, className, onClick, ...props }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden rounded-2xl px-8 py-4 font-heading font-bold text-white transition-all duration-300',
        'bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 bg-[length:200%_100%]',
        'hover:bg-right-center hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] hover:-translate-y-0.5',
        'shadow-[0_0_30px_rgba(59,130,246,0.35)]',
        'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
