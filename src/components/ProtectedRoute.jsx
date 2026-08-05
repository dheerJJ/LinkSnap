import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '../stores/authStore';
import AnimatedIcon from './AnimatedIcon';
import Modal from './Modal';

/**
 * ProtectedRoute — authentic SaaS-grade authentication required popup modal.
 * Features side-by-side buttons, arrow icon for Get Started, and returnTo preservation.
 */
export default function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    const returnTo = encodeURIComponent(location.pathname);

    return (
      <div
        style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        }}
        className="gradient-mesh noise-overlay"
      >
        <Modal
          isOpen={true}
          onClose={() => navigate('/')}
          maxWidth={480}
        >
          <div style={{ textAlign: 'center', padding: '16px 8px 8px' }}>
            {/* Animated Lock Icon Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              style={{
                width: 64,
                height: 64,
                borderRadius: 'var(--radius-xl)',
                background: 'rgba(194, 91, 62, 0.08)',
                border: '1px solid rgba(194, 91, 62, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: 'var(--shadow-glow)',
              }}
            >
              <AnimatedIcon name="lock" size={28} trigger="mount" color="#C25B3E" />
            </motion.div>

            {/* Title & Description */}
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--font-size-xl)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: 8,
              letterSpacing: '-0.02em',
            }}>
              Authentication Required
            </h2>
            <p style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--text-secondary)',
              marginBottom: 28,
              lineHeight: 1.6,
            }}>
              Please log in or create an account to access your links, analytics, and settings.
            </p>

            {/* Horizontally Aligned Buttons */}
            <div style={{ display: 'flex', gap: 12, width: '100%', marginBottom: 20 }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/login?returnTo=${returnTo}`)}
                className="btn btn-primary"
                style={{ flex: 1, padding: '12px 20px', fontWeight: 600 }}
              >
                <AnimatedIcon name="user" size={16} trigger="hover" />
                Log In
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/register')}
                className="btn btn-secondary"
                style={{ flex: 1, padding: '12px 20px', fontWeight: 600 }}
              >
                Get Started
                <AnimatedIcon name="arrow-right" size={16} trigger="hover" />
              </motion.button>
            </div>

            {/* Subtle cancel link */}
            <div>
              <button
                onClick={() => navigate('/')}
                className="btn-ghost"
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--text-tertiary)',
                  cursor: 'pointer',
                  padding: '4px 8px',
                }}
              >
                Back to Home
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  return children;
}
