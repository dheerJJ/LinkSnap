import { motion } from 'framer-motion';

/**
 * Animated skeleton loading placeholders.
 * Variants: 'text', 'title', 'card', 'row', 'chart', 'avatar', 'button', 'hero'
 */
export default function Skeleton({ variant = 'text', count = 1, className = '', style = {} }) {
  const baseVariants = {
    text: { height: 14, width: '100%', borderRadius: 'var(--radius-sm)' },
    title: { height: 28, width: '60%', borderRadius: 'var(--radius-md)' },
    card: { height: 160, width: '100%', borderRadius: 'var(--radius-lg)' },
    row: { height: 56, width: '100%', borderRadius: 'var(--radius-md)' },
    chart: { height: 280, width: '100%', borderRadius: 'var(--radius-lg)' },
    avatar: { height: 44, width: 44, borderRadius: 'var(--radius-full)' },
    button: { height: 44, width: 130, borderRadius: 'var(--radius-md)' },
    hero: { height: 220, width: '100%', borderRadius: 'var(--radius-xl)' },
  };

  const defaultStyle = baseVariants[variant] || baseVariants.text;

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
          style={{
            background: 'linear-gradient(90deg, var(--bg-tertiary) 25%, var(--bg-hover) 50%, var(--bg-tertiary) 75%)',
            backgroundSize: '200% 100%',
            ...defaultStyle,
            ...style,
            ...(variant === 'text' && i === count - 1 ? { width: '70%' } : {}),
          }}
        />
      ))}
    </div>
  );
}

/**
 * Dashboard stat card skeleton
 */
export function StatCardSkeleton() {
  return (
    <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Skeleton variant="text" style={{ width: '40%' }} />
      <Skeleton variant="title" style={{ width: '70%', height: 32 }} />
      <Skeleton variant="text" style={{ width: '50%' }} />
    </div>
  );
}

/**
 * Links table skeleton
 */
export function TableSkeleton({ rows = 5 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} variant="row" />
      ))}
    </div>
  );
}

/**
 * Full Page Skeleton Fallback for lazy route dynamic loading & network delays
 */
export function FullPageSkeleton() {
  return (
    <div style={{ maxWidth: 1280, margin: '40px auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Header / Hero Skeleton */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16, padding: '40px 0' }}>
        <Skeleton variant="button" style={{ width: 160, height: 30, borderRadius: 'var(--radius-full)' }} />
        <Skeleton variant="title" style={{ width: '75%', height: 44 }} />
        <Skeleton variant="text" style={{ width: '50%', height: 18 }} />
        <Skeleton variant="hero" style={{ maxWidth: 580, marginTop: 16 }} />
      </div>

      {/* Grid Cards Skeleton */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      {/* Main Content Area Skeleton */}
      <div className="card" style={{ padding: 24 }}>
        <Skeleton variant="title" style={{ width: '30%', marginBottom: 20 }} />
        <TableSkeleton rows={4} />
      </div>
    </div>
  );
}
