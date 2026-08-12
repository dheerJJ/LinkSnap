import { useState, useEffect, useMemo } from 'react';
import CursorGrid from '../components/CursorGrid.jsx';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedIcon from '../components/AnimatedIcon.jsx';
import api from '../services/index.js';
import useAuthStore from '../stores/authStore.js';
import useToastStore from '../stores/toastStore.js';
import { useMediaQuery } from '../hooks/index.js';

import featAnalyticsImg from '../assets/feat_analytics.png';
import featSecurityImg from '../assets/feat_security.png';
import featQrImg from '../assets/feat_qr.png';

// Preload images into memory for instant carousel transitions
[featAnalyticsImg, featSecurityImg, featQrImg].forEach((src) => {
  const img = new Image();
  img.src = src;
});

// Validation Schemas
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(20),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
const strengthColors = ['', '#C25B3E', '#F59E0B', '#FBBF24', '#0F9D6C', '#0F9D6C'];

const features = [
  {
    image: featAnalyticsImg,
    title: 'Real-Time Click Analytics',
    description: 'Track click traffic, geographical maps, device types, and top referrers instantly.',
  },
  {
    image: featSecurityImg,
    title: 'Password & Expiry Gates',
    description: 'Secure your shared links with optional passwords and custom expiration dates.',
  },
  {
    image: featQrImg,
    title: 'High-Res Vector QR Codes',
    description: 'Instantly generate and download crisp SVG and PNG QR codes for every link.',
  },
];

export default function Auth({ initialMode = 'login' }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get('returnTo') || '/dashboard';

  const [mode, setMode] = useState(
    location.pathname === '/register' ? 'register' : initialMode
  );
  const [loading, setLoading] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const { setAuth } = useAuthStore();
  const toast = useToastStore();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const isLogin = mode === 'login';

  // Carousel auto-play timer (4s per slide)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Form for Login
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  // Form for Register
  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: '', email: '', password: '' },
  });

  const registerPassword = registerForm.watch('password');
  const strength = useMemo(() => getPasswordStrength(registerPassword || ''), [registerPassword]);

  const handleLoginSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await api.login(data);
      if (res.data.Message !== 'Login Success') throw new Error(res.data.Message);
      setAuth({ username: res.data.username, email: res.data.email }, res.data.token);
      toast.success('Welcome back!');
      navigate(returnTo);
    } catch (err) {
      toast.error(err?.response?.data?.Message || err?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await api.register(data);
      if (res.data.Message !== 'Registeration Success') throw new Error(res.data.Message);
      // Auto-login after register
      const loginRes = await api.login({ email: data.email, password: data.password });
      if (loginRes.data.token) setAuth({ username: loginRes.data.username, email: loginRes.data.email }, loginRes.data.token);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err?.response?.data?.Message || err?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    window.history.replaceState(null, '', newMode === 'register' ? '/register' : '/login');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
      className="noise-overlay"
    >
      {/* ── CursorGrid Background ── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <CursorGrid
          cellSize={65}
          color="#C25B3E"
          radius={160}
          falloff="smooth"
          holdTime={350}
          fadeDuration={900}
          lineWidth={1}
          maxOpacity={0.85}
          fillOpacity={0.04}
          gridOpacity={0.04}
          cellRadius={2}
          clickPulse
          pulseSpeed={550}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 1080,
          minHeight: isDesktop ? 660 : 'auto',
          height: isDesktop ? 660 : 'auto',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--radius-xl)',
          display: 'grid',
          gridTemplateColumns: isDesktop ? 'repeat(auto-fit, minmax(340px, 1fr))' : '1fr',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        {/* ── Left Side: Showcase Panel with Steady Instant Pre-Mounted Images ── */}
        <div
          style={{
            position: 'relative',
            padding: 40,
            display: isDesktop ? 'flex' : 'none',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            margin: 12,
            height: 'calc(100% - 24px)',
          }}
        >
          {/* Pre-Mounted Overlapping Images (Instant Load + 0 Movement Jitter) */}
          {features.map((feat, i) => (
            <motion.img
              key={i}
              src={feat.image}
              alt={feat.title}
              initial={false}
              animate={{ opacity: activeSlide === i ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Dark Overlay Gradient */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(20, 33, 30, 0.45) 0%, rgba(20, 33, 30, 0.92) 100%)',
              zIndex: 1,
            }}
          />

          {/* Top: Brand Logo */}
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              padding: 8,
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(8px)',
            }}>
              <AnimatedIcon name="link" size={24} trigger="mount" color="#FFFFFF" />
            </div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--font-size-lg)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
            }}>
              LinkSnap
            </span>
          </div>

          {/* Bottom: Animated Carousel Text & Indicators */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
              {features.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  style={{
                    height: 4,
                    width: activeSlide === i ? 28 : 10,
                    borderRadius: 'var(--radius-full)',
                    background: activeSlide === i ? '#FFFFFF' : 'rgba(255, 255, 255, 0.3)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  lineHeight: 1.2,
                  marginBottom: 8,
                }}>
                  {features[activeSlide].title}
                </h2>
                <p style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'rgba(255, 255, 255, 0.85)',
                  lineHeight: 1.6,
                  maxWidth: 360,
                }}>
                  {features[activeSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Right Side: Form Panel (Fixed Height Layout - Zero Jump) ── */}
        <div
          style={{
            padding: '36px 48px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          {/* Centered Top Toggle Switch */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              display: 'inline-flex',
              padding: 4,
              background: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-primary)',
            }}>
              <button
                onClick={() => switchMode('login')}
                style={{
                  padding: '8px 24px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 600,
                  background: isLogin ? 'var(--accent-color)' : 'transparent',
                  color: isLogin ? 'white' : 'var(--text-secondary)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                Log In
              </button>
              <button
                onClick={() => switchMode('register')}
                style={{
                  padding: '8px 24px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 600,
                  background: !isLogin ? 'var(--accent-color)' : 'transparent',
                  color: !isLogin ? 'white' : 'var(--text-secondary)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Form area with smooth inner animation */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '16px 0' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Centered Titles */}
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                  <h1 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--font-size-2xl)',
                    fontWeight: 800,
                    marginBottom: 4,
                    letterSpacing: '-0.02em',
                  }}>
                    {isLogin ? 'Welcome Back' : 'Create An Account'}
                  </h1>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                    {isLogin
                      ? 'Enter your credentials to access your link dashboard.'
                      : 'Start shortening and tracking your links for free.'}
                  </p>
                </div>

                {isLogin ? (
                  /* LOGIN FORM */
                  <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)}>
                    <div style={{ marginBottom: 14 }}>
                      <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, marginBottom: 4 }}>
                        Email Address
                      </label>
                      <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none', display: 'flex', alignItems: 'center', lineHeight: 0 }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </svg>
                        </div>
                        <input
                          {...loginForm.register('email')}
                          type="email"
                          placeholder="your.email@domain.com"
                          className={`input focus-ring ${loginForm.formState.errors.email ? 'input-error' : ''}`}
                          style={{ paddingLeft: 36 }}
                          autoComplete="email"
                        />
                      </div>
                      {loginForm.formState.errors.email && (
                        <p style={{ fontSize: 'var(--font-size-xs)', color: '#C25B3E', marginTop: 2 }}>
                          {loginForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div style={{ marginBottom: 14 }}>
                      <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, marginBottom: 4 }}>
                        Password
                      </label>
                      <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none', display: 'flex', alignItems: 'center', lineHeight: 0 }}>
                          <AnimatedIcon name="lock" size={16} trigger="none" />
                        </div>
                        <input
                          {...loginForm.register('password')}
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className={`input focus-ring ${loginForm.formState.errors.password ? 'input-error' : ''}`}
                          style={{ paddingLeft: 36, paddingRight: 36 }}
                          autoComplete="current-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                            background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', padding: 0,
                          }}
                        >
                          <AnimatedIcon name="eye" size={16} trigger="hover" />
                        </button>
                      </div>
                      {loginForm.formState.errors.password && (
                        <p style={{ fontSize: 'var(--font-size-xs)', color: '#C25B3E', marginTop: 2 }}>
                          {loginForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                        <input type="checkbox" style={{ accentColor: '#C25B3E', width: 15, height: 15 }} />
                        Remember me
                      </label>
                      <a href="#" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--accent-color)', fontWeight: 600, textDecoration: 'none' }}>
                        Forgot Password?
                      </a>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary btn-lg"
                      style={{ width: '100%', fontWeight: 600 }}
                    >
                      {loading ? <AnimatedIcon name="loader" size={20} trigger="mount" /> : 'Log In to LinkSnap'}
                    </motion.button>
                  </form>
                ) : (
                  /* REGISTER FORM */
                  <form onSubmit={registerForm.handleSubmit(handleRegisterSubmit)}>
                    <div style={{ marginBottom: 10 }}>
                      <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, marginBottom: 4 }}>
                        Username
                      </label>
                      <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none', display: 'flex', alignItems: 'center', lineHeight: 0 }}>
                          <AnimatedIcon name="user" size={16} trigger="none" />
                        </div>
                        <input
                          {...registerForm.register('username')}
                          type="text"
                          placeholder="username"
                          className={`input focus-ring ${registerForm.formState.errors.username ? 'input-error' : ''}`}
                          style={{ paddingLeft: 36 }}
                          autoComplete="username"
                        />
                      </div>
                      {registerForm.formState.errors.username && (
                        <p style={{ fontSize: 'var(--font-size-xs)', color: '#C25B3E', marginTop: 2 }}>
                          {registerForm.formState.errors.username.message}
                        </p>
                      )}
                    </div>

                    <div style={{ marginBottom: 10 }}>
                      <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, marginBottom: 4 }}>
                        Email Address
                      </label>
                      <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none', display: 'flex', alignItems: 'center', lineHeight: 0 }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </svg>
                        </div>
                        <input
                          {...registerForm.register('email')}
                          type="email"
                          placeholder="your.email@domain.com"
                          className={`input focus-ring ${registerForm.formState.errors.email ? 'input-error' : ''}`}
                          style={{ paddingLeft: 36 }}
                          autoComplete="email"
                        />
                      </div>
                      {registerForm.formState.errors.email && (
                        <p style={{ fontSize: 'var(--font-size-xs)', color: '#C25B3E', marginTop: 2 }}>
                          {registerForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div style={{ marginBottom: 14 }}>
                      <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, marginBottom: 4 }}>
                        Password
                      </label>
                      <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none', display: 'flex', alignItems: 'center', lineHeight: 0 }}>
                          <AnimatedIcon name="lock" size={16} trigger="none" />
                        </div>
                        <input
                          {...registerForm.register('password')}
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className={`input focus-ring ${registerForm.formState.errors.password ? 'input-error' : ''}`}
                          style={{ paddingLeft: 36, paddingRight: 36 }}
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                            background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', padding: 0,
                          }}
                        >
                          <AnimatedIcon name="eye" size={16} trigger="hover" />
                        </button>
                      </div>
                      {registerForm.formState.errors.password && (
                        <p style={{ fontSize: 'var(--font-size-xs)', color: '#C25B3E', marginTop: 2 }}>
                          {registerForm.formState.errors.password.message}
                        </p>
                      )}

                      {/* Password Strength Meter */}
                      {registerPassword && (
                        <div style={{ marginTop: 6 }}>
                          <div style={{ display: 'flex', gap: 4, marginBottom: 2 }}>
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div
                                key={level}
                                style={{
                                  flex: 1, height: 3, borderRadius: 'var(--radius-full)',
                                  background: strength >= level ? strengthColors[strength] : 'var(--bg-tertiary)',
                                  transition: 'all 0.3s',
                                }}
                              />
                            ))}
                          </div>
                          <p style={{ fontSize: 10, color: strengthColors[strength], fontWeight: 600 }}>
                            {strengthLabels[strength]}
                          </p>
                        </div>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary btn-lg"
                      style={{ width: '100%', fontWeight: 600 }}
                    >
                      {loading ? <AnimatedIcon name="loader" size={20} trigger="mount" /> : 'Create Account'}
                    </motion.button>
                  </form>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Social Logins Divider & Buttons */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ flex: 1, height: 1, background: 'var(--border-primary)' }} />
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)', fontWeight: 500 }}>Or continue with</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border-primary)' }} />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => toast.info('Google sign-in arriving soon!')}
                className="btn btn-secondary"
                style={{ flex: 1, padding: 8 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" />
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                  <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.4 0 15.3s.7 5.6 1.9 8l3.7-2.9c-.2-.7-.4-1.5-.4-2.3z" />
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z" />
                </svg>
              </button>
              <button
                onClick={() => toast.info('GitHub sign-in arriving soon!')}
                className="btn btn-secondary"
                style={{ flex: 1, padding: 8 }}
              >
                <AnimatedIcon name="external-link" size={18} trigger="hover" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
