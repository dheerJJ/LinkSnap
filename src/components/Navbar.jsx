import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedIcon from './AnimatedIcon.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import useAuthStore from '../stores/authStore.js';
import { useScrollDirection, useMediaQuery } from '../hooks/index.js';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const { scrollDir, scrollY } = useScrollDirection();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { isAuthenticated, user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const isScrolled = scrollY > 10;
  // Hide when scrolling down past 100px unless mobile menu is open
  const isHidden = scrollDir === 'down' && scrollY > 100 && !mobileOpen;

  const navLinks = [
    { to: '/', label: 'Home', icon: 'home' },
    { to: '/dashboard', label: 'Dashboard', icon: 'chart' },
    { to: '/links', label: 'My Links', icon: 'link' },
    { to: '/analytics', label: 'Analytics', icon: 'chart' },
    { to: '/features', label: 'Features', icon: 'zap' },
    { label: 'Pricing', to: '/pricing', icon: 'key' },
  ];


  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate('/');
  };

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -80 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 'var(--z-sticky)',
          background: isScrolled ? 'var(--glass-bg)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px) saturate(180%)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px) saturate(180%)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--border-primary)' : '1px solid transparent',
          transition: 'background 0.3s, border-color 0.3s',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 64,
            width: '100%',
          }}
        >
          {/* Logo with Smooth Micro Hover Animation */}
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                navigate('/');
                requestAnimationFrame(() => {
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 60);
                });
              }
            }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
          >
            <motion.div
              whileHover={{ scale: 1.15, rotate: -8 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 6,
                borderRadius: 'var(--radius-md)',
                background: 'rgba(194, 91, 62, 0.08)',
                border: '1px solid rgba(194, 91, 62, 0.2)',
              }}
            >
              <AnimatedIcon name="link" size={24} trigger="hover" color="#C25B3E" />
            </motion.div>
            <motion.span
              whileHover={{ x: 2 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--font-size-lg)',
                fontWeight: 800,
                background: 'var(--accent-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              LinkSnap
            </motion.span>
          </Link>

          {/* Desktop Nav with Animated Sliding Hover Pill */}
          {isDesktop && navLinks.length > 0 && (
            <div
              onMouseLeave={() => setHoveredNav(null)}
              style={{ display: 'flex', alignItems: 'center', gap: 4, position: 'relative' }}
            >
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                const isHovered = hoveredNav === link.to;

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onMouseEnter={() => setHoveredNav(link.to)}
                    className="nav-link"
                    style={{
                      position: 'relative',
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 600,
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                  >
                    {/* Animated Sliding Hover Pill */}
                    {isHovered && (
                      <motion.div
                        layoutId="navHoverPill"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'var(--bg-tertiary)',
                          borderRadius: 'var(--radius-md)',
                          zIndex: 0,
                        }}
                      />
                    )}

                    {/* Active Route Indicator Line */}
                    {isActive && (
                      <motion.div
                        layoutId="navActiveIndicator"
                        style={{
                          position: 'absolute',
                          bottom: -4,
                          left: 16,
                          right: 16,
                          height: 2.5,
                          background: 'var(--accent-color)',
                          borderRadius: 'var(--radius-full)',
                          boxShadow: '0 0 10px rgba(194, 91, 62, 0.6)',
                          zIndex: 1,
                        }}
                      />
                    )}

                    <span style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <AnimatedIcon name={link.icon} size={16} trigger={isHovered ? 'mount' : 'hover'} />
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Right Section Buttons with Spring Hover Effects */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
              <ThemeToggle />
            </motion.div>

            {isAuthenticated ? (
              <div style={{ position: 'relative' }}>
                <motion.button
                  whileHover={{ scale: 1.08, boxShadow: '0 4px 16px rgba(194, 91, 62, 0.35)' }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="focus-ring"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--accent-gradient)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 700,
                    fontFamily: 'var(--font-sans)',
                    transition: 'box-shadow 0.2s',
                  }}
                  aria-label="User menu"
                >
                  {user?.username?.[0]?.toUpperCase() || 'U'}
                </motion.button>

                {/* Profile Dropdown Menu */}
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        marginTop: 8,
                        width: 200,
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-primary)',
                        borderRadius: 'var(--radius-md)',
                        padding: 6,
                        boxShadow: 'var(--shadow-lg)',
                      }}
                    >
                      <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-primary)', marginBottom: 4 }}>
                        <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {user?.username || 'User'}
                        </p>
                        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>
                          {user?.email || ''}
                        </p>
                      </div>
                      <Link
                        to="/settings"
                        onClick={() => setProfileOpen(false)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          padding: '8px 12px', borderRadius: 'var(--radius-sm)',
                          fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)',
                          textDecoration: 'none', transition: 'all 0.15s',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                      >
                        <AnimatedIcon name="settings" size={16} trigger="hover" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8, width: '100%',
                          padding: '8px 12px', borderRadius: 'var(--radius-sm)',
                          fontSize: 'var(--font-size-sm)', color: 'var(--danger-color)',
                          background: 'transparent', border: 'none', cursor: 'pointer',
                          textAlign: 'left', transition: 'background 0.15s',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(194, 91, 62, 0.08)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <AnimatedIcon name="logout" size={16} trigger="hover" color="var(--danger-color)" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    className="btn btn-ghost focus-ring"
                  >
                    Log in
                  </motion.button>
                </Link>
                {isDesktop && (
                  <Link to="/register">
                    <motion.button
                      whileHover={{ scale: 1.04, y: -1, boxShadow: '0 6px 20px rgba(194, 91, 62, 0.35)' }}
                      whileTap={{ scale: 0.96 }}
                      className="btn btn-primary focus-ring"
                    >
                      Sign up
                    </motion.button>
                  </Link>
                )}
              </div>
            )}

            {/* Mobile menu toggle button */}
            {!isDesktop && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="btn-ghost focus-ring"
                style={{ padding: 8, border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}
                aria-label="Toggle menu"
              >
                <AnimatedIcon name={mobileOpen ? 'close' : 'menu'} size={24} trigger="click" />
              </motion.button>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Mobile slide-out menu */}
      <AnimatePresence>
        {mobileOpen && !isDesktop && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
                zIndex: 99, backdropFilter: 'blur(4px)',
              }}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0,
                width: 280, background: 'var(--bg-secondary)',
                borderLeft: '1px solid var(--border-primary)',
                zIndex: 100, padding: '80px 24px 24px',
                display: 'flex', flexDirection: 'column', gap: 4,
              }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 16px', borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--font-size-base)', fontWeight: 500,
                    color: location.pathname === link.to ? 'var(--text-primary)' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    background: location.pathname === link.to ? 'var(--bg-hover)' : 'transparent',
                  }}
                >
                  <AnimatedIcon name={link.icon} size={20} trigger="hover" />
                  {link.label}
                </Link>
              ))}
              {isAuthenticated && (
                <>
                  <div style={{ borderTop: '1px solid var(--border-primary)', margin: '8px 0' }} />
                  <Link
                    to="/settings"
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '12px 16px', borderRadius: 'var(--radius-md)',
                      fontSize: 'var(--font-size-base)', color: 'var(--text-secondary)',
                      textDecoration: 'none',
                    }}
                  >
                    <AnimatedIcon name="settings" size={20} trigger="hover" />
                    Settings
                  </Link>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div style={{ height: 64 }} />
    </>
  );
}
