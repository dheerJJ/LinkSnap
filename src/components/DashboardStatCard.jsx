import { motion } from 'framer-motion';
import { useCountUp } from '../hooks';
import AnimatedIcon from './AnimatedIcon';
import ThreeDTiltCard from './ThreeDTiltCard';

/**
 * Dashboard stat card with animated count-up, trend indicator, and 3D mouse tilt.
 */
export default function DashboardStatCard({ title, value, icon, trend, trendLabel, subtext, delay = 0, color }) {
  const animatedValue = useCountUp(value, 1200, true);

  const trendColor = trend > 0 ? '#0F9D6C' : trend < 0 ? '#C25B3E' : 'var(--text-tertiary)';
  const trendIcon = 'chart';

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: '-30px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
      style={{ height: '100%' }}
    >
      <ThreeDTiltCard maxTilt={10} scale={1.03} style={{ height: '100%' }}>
        <div
          className="card card-hover"
          style={{ padding: 24, position: 'relative', overflow: 'hidden', height: '100%' }}
        >
          {/* Background glow */}
          <div style={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: color || 'var(--accent-gradient)',
            opacity: 0.06,
            filter: 'blur(30px)',
          }} />

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16, position: 'relative' }}>
            <p style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--text-secondary)',
              fontWeight: 500,
            }}>
              {title}
            </p>
            <div style={{
              padding: 8,
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-primary)',
            }}>
              <AnimatedIcon name={icon} size={18} trigger="hover" color={color || '#C25B3E'} />
            </div>
          </div>

          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--font-size-2xl)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1,
            marginBottom: 8,
            position: 'relative',
          }}>
            {typeof value === 'number' ? animatedValue.toLocaleString() : value}
          </p>

          {trendLabel && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, position: 'relative' }}>
              {trend !== undefined && (
                <span style={{
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 600,
                  color: trendColor,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}>
                  {trend > 0 ? '+' : ''}{trend}%
                  <AnimatedIcon name={trendIcon} size={14} trigger="none" color={trendColor} />
                </span>
              )}
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>
                {trendLabel}
              </span>
            </div>
          )}

          {subtext && !trendLabel && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, position: 'relative' }}>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>
                {subtext}
              </span>
            </div>
          )}
        </div>
      </ThreeDTiltCard>
    </motion.div>
  );
}
