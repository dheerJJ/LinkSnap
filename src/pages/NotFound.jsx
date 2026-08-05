import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedIcon from '../components/AnimatedIcon';

export default function NotFound() {
  return (
    <div
      className="gradient-mesh noise-overlay"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
      >
        {/* Animated 404 icon */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
          style={{
            width: 120, height: 120, borderRadius: 'var(--radius-xl)',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 32px',
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute', inset: -2,
            borderRadius: 'var(--radius-xl)',
            background: 'var(--accent-gradient)',
            opacity: 0.1, filter: 'blur(20px)',
          }} />
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--font-size-2xl)',
            fontWeight: 800,
            background: 'var(--accent-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            404
          </span>
        </motion.div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--font-size-2xl)',
          fontWeight: 700,
          marginBottom: 12,
        }}>
          Page Not Found
        </h1>
        <p style={{
          fontSize: 'var(--font-size-base)',
          color: 'var(--text-secondary)',
          maxWidth: 420,
          margin: '0 auto 32px',
          lineHeight: 1.6,
        }}>
          The page you're looking for doesn't exist or has been moved to a new URL.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn btn-primary">
              <AnimatedIcon name="home" size={16} trigger="hover" />
              Go Home
            </motion.button>
          </Link>
          <Link to="/dashboard">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn btn-secondary">
              <AnimatedIcon name="analytics" size={16} trigger="hover" />
              Dashboard
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
