import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedIcon from '../components/AnimatedIcon.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';
import useAuthStore from '../stores/authStore.js';
import useThemeStore from '../stores/themeStore.js';
import useToastStore from '../stores/toastStore.js';
import api from '../services/api.js';

export default function Settings() {
  const { user, logout } = useAuthStore();
  const { theme } = useThemeStore();
  const toast = useToastStore();
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      await api.deleteAccount();
      toast.success('Account deleted successfully.');
      logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Delete account error:', error);
      toast.error('Failed to delete account. Please try again.');
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulated save
    setTimeout(() => {
      setSaving(false);
      toast.success('Settings saved successfully!');
    }, 800);
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px 80px' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-xl)', fontWeight: 700, marginBottom: 8 }}>
          Settings
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', marginBottom: 40 }}>
          Manage your account settings and preferences.
        </p>
      </motion.div>

      {/* Profile */}
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, margin: '-30px' }}
        transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="card"
        style={{ padding: 28, marginBottom: 20 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: 'var(--radius-md)',
            background: 'rgba(194, 91, 62, 0.1)',
            border: '1px solid rgba(194, 91, 62, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <AnimatedIcon name="user" size={18} trigger="hover" color="var(--accent-color)" />
          </div>
          <h2 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600 }}>Profile</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 500, marginBottom: 6 }}>Username</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none' }}>
                <AnimatedIcon name="user" size={16} trigger="none" />
              </div>
              <input className="input focus-ring" defaultValue={user?.username || 'demo'} style={{ paddingLeft: 36 }} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 500, marginBottom: 6 }}>Email</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none', fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>
                @
              </div>
              <input className="input focus-ring" defaultValue={user?.email || 'demo@linksnap.io'} type="email" style={{ paddingLeft: 36 }} />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleSave}
            disabled={saving}
            className="btn btn-primary"
            style={{ alignSelf: 'flex-start' }}
          >
            {saving ? <AnimatedIcon name="loader" size={16} trigger="mount" /> : 'Save Changes'}
          </motion.button>
        </div>
      </motion.div>

      {/* Password */}
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, margin: '-30px' }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="card"
        style={{ padding: 28, marginBottom: 20 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: 'var(--radius-md)',
            background: 'rgba(194, 91, 62, 0.1)',
            border: '1px solid rgba(194, 91, 62, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <AnimatedIcon name="lock" size={18} trigger="hover" color="var(--accent-color)" />
          </div>
          <h2 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600 }}>Change Password</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 500, marginBottom: 6 }}>Current Password</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none' }}>
                <AnimatedIcon name="lock" size={16} trigger="none" />
              </div>
              <input className="input focus-ring" type="password" placeholder="••••••••" style={{ paddingLeft: 36 }} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 500, marginBottom: 6 }}>New Password</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none' }}>
                <AnimatedIcon name="lock" size={16} trigger="none" />
              </div>
              <input className="input focus-ring" type="password" placeholder="••••••••" style={{ paddingLeft: 36 }} />
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="btn btn-secondary" style={{ alignSelf: 'flex-start' }}>
            Update Password
          </motion.button>
        </div>
      </motion.div>

      {/* Theme */}
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, margin: '-30px' }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="card"
        style={{ padding: 28, marginBottom: 20 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 'var(--radius-md)',
              background: 'rgba(194, 91, 62, 0.1)',
              border: '1px solid rgba(194, 91, 62, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <AnimatedIcon name={theme === 'dark' ? 'moon' : 'sun'} size={18} trigger="hover" color="var(--accent-color)" />
            </div>
            <div>
              <h2 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, marginBottom: 2 }}>Appearance</h2>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Toggle dark/light mode</p>
            </div>
          </div>
          <ThemeToggle size={22} />
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, margin: '-30px' }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          padding: 28,
          border: '1px solid rgba(239, 68, 68, 0.25)',
          borderRadius: 'var(--radius-lg)',
          background: 'rgba(239, 68, 68, 0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: 'var(--radius-md)',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <AnimatedIcon name="delete" size={18} trigger="hover" color="#EF4444" />
          </div>
          <h2 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, color: '#EF4444' }}>Danger Zone</h2>
        </div>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: 20 }}>
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="btn btn-danger"
          onClick={() => setShowDeleteConfirm(true)}
        >
          <AnimatedIcon name="delete" size={16} trigger="hover" color="#FFFFFF" />
          Delete Account
        </motion.button>
      </motion.div>

      {/* Delete Account Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '0 16px',
            }}
            onClick={(e) => { if (e.target === e.currentTarget) setShowDeleteConfirm(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="card"
              style={{ padding: 32, maxWidth: 420, width: '100%', textAlign: 'center' }}
            >
              <div style={{
                width: 52,
                height: 52,
                borderRadius: 'var(--radius-md)',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}>
                <AnimatedIcon name="delete" size={24} trigger="mount" color="#EF4444" />
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-lg)', fontWeight: 700, marginBottom: 10 }}>
                Delete Account?
              </h2>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: 28, lineHeight: 1.6 }}>
                This will permanently delete your account and all associated data.
                <strong style={{ display: 'block', marginTop: 6, color: 'var(--text-primary)' }}>This action cannot be undone.</strong>
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={deleting}
                  style={{ flex: 1 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-danger"
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                  style={{ flex: 1 }}
                >
                  {deleting
                    ? <AnimatedIcon name="loader" size={16} trigger="mount" />
                    : 'Yes, Delete'
                  }
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

