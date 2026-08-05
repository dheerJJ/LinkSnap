import { motion } from 'framer-motion';
import AnimatedIcon from './AnimatedIcon';

/**
 * Animated Logo Loader — displays the LinkSnap logo with smooth entrance,
 * glowing pulse ring, animated chain snap icon, and brand text.
 * Used on site refresh and page transitions.
 */
export default function LogoLoader({ fullScreen = true }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: fullScreen ? '100vh' : '70vh',
        width: '100%',
        position: fullScreen ? 'fixed' : 'relative',
        inset: fullScreen ? 0 : undefined,
        zIndex: fullScreen ? 9999 : 10,
        background: 'var(--bg-primary)',
      }}
      className="noise-overlay"
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        {/* Glowing Animated Logo Badge */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: [0.7, 1.05, 1], opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 'var(--radius-xl)',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            boxShadow: 'var(--shadow-glow-lg)',
          }}
        >
          {/* Subtle pulse aura */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: -4,
              borderRadius: 'var(--radius-xl)',
              background: 'var(--accent-color)',
              filter: 'blur(12px)',
              pointerEvents: 'none',
            }}
          />

          <motion.div
            animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <AnimatedIcon name="link" size={40} trigger="mount" color="#C25B3E" />
          </motion.div>
        </motion.div>

        {/* Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          style={{ display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--font-size-xl)',
            fontWeight: 800,
            background: 'var(--accent-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
          }}>
            LinkSnap
          </span>
        </motion.div>

        {/* Loading indicator bar */}
        <motion.div
          style={{
            width: 120,
            height: 3,
            borderRadius: 'var(--radius-full)',
            background: 'var(--bg-tertiary)',
            overflow: 'hidden',
            position: 'relative',
            marginTop: 4,
          }}
        >
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '50%',
              height: '100%',
              background: 'var(--accent-color)',
              borderRadius: 'var(--radius-full)',
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
