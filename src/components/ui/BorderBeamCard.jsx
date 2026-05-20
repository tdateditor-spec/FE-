import { cn } from '@/lib/utils'

export function BorderBeamCard({ children, className, active = false }) {
  return (
    <div className={cn('relative rounded-3xl overflow-hidden', className)}>
      {active && (
        <span
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)',
            animation: 'border-beam 4s linear infinite',
          }}
        />
      )}
      <div
        className={cn(
          'relative rounded-3xl h-full',
          active
            ? 'bg-blue-950/30 border border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.15)]'
            : 'bg-white/[0.03] border border-white/[0.07]'
        )}
      >
        {children}
      </div>
    </div>
  )
}
