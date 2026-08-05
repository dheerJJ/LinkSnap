import { motion, AnimatePresence } from 'framer-motion';
import useToastStore from '../stores/toastStore';
import AnimatedIcon from './AnimatedIcon';

const typeConfig = {
  success: { icon: 'check', color: '#22C55E', bg: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.2)' },
  error: { icon: 'close', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.2)' },
  info: { icon: 'sparkle', color: '#0EA5E9', bg: 'rgba(14, 165, 233, 0.1)', border: 'rgba(14, 165, 233, 0.2)' },
  warning: { icon: 'zap', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.2)' },
};

export default function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  return (
    <div
      style={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 'var(--z-toast)',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        maxWidth: 400,
        width: '100%',
        pointerEvents: 'none',
      }}
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const config = typeConfig[toast.type] || typeConfig.info;
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, x: 80, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: config.bg,
                border: `1px solid ${config.border}`,
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                backdropFilter: 'blur(12px)',
                pointerEvents: 'auto',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
              onClick={() => removeToast(toast.id)}
            >
              <div style={{ color: config.color, flexShrink: 0, marginTop: 2 }}>
                <AnimatedIcon name={config.icon} size={18} trigger="mount" color={config.color} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                {toast.title && (
                  <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2, lineHeight: 1.4 }}>
                    {toast.title}
                  </p>
                )}
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {toast.message}
                </p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); removeToast(toast.id); }}
                style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', padding: 2, flexShrink: 0 }}
                aria-label="Dismiss"
              >
                <AnimatedIcon name="close" size={14} trigger="hover" />
              </button>
              {/* Auto-dismiss progress bar */}
              {toast.duration > 0 && (
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: toast.duration / 1000, ease: 'linear' }}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: config.color,
                    transformOrigin: 'left',
                    opacity: 0.5,
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
