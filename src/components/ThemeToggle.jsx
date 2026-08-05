import { motion } from 'framer-motion';
import useThemeStore from '../stores/themeStore';
import { usePrefersReducedMotion } from '../hooks';

/**
 * Animated sun ↔ moon toggle.
 * Uses Framer Motion SVG path morphing for the transition.
 */
export default function ThemeToggle({ size = 20 }) {
  const { theme, toggleTheme } = useThemeStore();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      className="focus-ring"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{
        background: 'var(--bg-hover)',
        border: '1px solid var(--border-primary)',
        borderRadius: 'var(--radius-full)',
        padding: 8,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-primary)',
      }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {isDark ? (
          // Moon
          <motion.path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          // Sun
          <>
            <motion.circle
              cx={12}
              cy={12}
              r={5}
              initial={false}
              animate={{ scale: [0.8, 1] }}
              transition={{ duration: 0.3 }}
            />
            <motion.g
              initial={false}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </motion.g>
          </>
        )}
      </motion.svg>
    </motion.button>
  );
}
