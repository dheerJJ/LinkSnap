import { motion } from 'framer-motion';
import AnimatedIcon from './AnimatedIcon';

/**
 * Empty state with animated icon + message + optional CTA.
 */
export default function EmptyState({
  icon = 'link',
  title = 'Nothing here yet',
  description = '',
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 24px',
        textAlign: 'center',
      }}
    >
      {/* Animated icon container with gradient glow */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          width: 80,
          height: 80,
          borderRadius: 'var(--radius-xl)',
          background: 'var(--bg-tertiary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
          border: '1px solid var(--border-primary)',
          position: 'relative',
        }}
      >
        <div style={{
          position: 'absolute',
          inset: -1,
          borderRadius: 'var(--radius-xl)',
          background: 'var(--accent-gradient)',
          opacity: 0.1,
          filter: 'blur(20px)',
        }} />
        <AnimatedIcon name={icon} size={36} trigger="mount" color="var(--text-tertiary)" />
      </motion.div>

      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--font-size-lg)',
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginBottom: 8,
      }}>
        {title}
      </h3>

      {description && (
        <p style={{
          fontSize: 'var(--font-size-sm)',
          color: 'var(--text-secondary)',
          maxWidth: 400,
          lineHeight: 1.6,
          marginBottom: actionLabel ? 24 : 0,
        }}>
          {description}
        </p>
      )}

      {actionLabel && onAction && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAction}
          className="btn btn-primary"
        >
          <AnimatedIcon name="plus" size={16} trigger="hover" />
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  );
}
