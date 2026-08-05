import { useState } from 'react';
import CursorGrid from '../components/CursorGrid.jsx';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedIcon from '../components/AnimatedIcon.jsx';
import ThreeDTiltCard from '../components/ThreeDTiltCard.jsx';
import Footer from '../components/Footer.jsx';
import api from '../services/index.js';
import useAuthStore from '../stores/authStore.js';
import useToastStore from '../stores/toastStore.js';
import { useCopyToClipboard } from '../hooks/index.js';
import DecryptedText from '../components/DecryptedText.jsx';
import ShinyText from '../components/ShinyText.jsx';
import SplitText from '../components/SplitText.jsx';
import Magnet from '../components/Magnet.jsx';

const features = [
  { icon: 'zap', title: 'Instant Shortening', description: 'Create short links in milliseconds with our blazing-fast engine.' },
  { icon: 'chart', title: 'Real-time Analytics', description: 'Track clicks, locations, devices, and referrers in real time.' },
  { icon: 'lock', title: 'Password Protection', description: 'Secure your links with optional password protection.' },
  { icon: 'clock', title: 'Expiration Control', description: 'Set custom expiry dates for time-sensitive campaigns.' },
  { icon: 'qr', title: 'QR Code Generation', description: 'Generate beautiful QR codes for any shortened link.' },
  { icon: 'key', title: 'Custom Aliases', description: 'Choose memorable custom aliases for branded short links.' },
];

const staggerChildren = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 35, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Home() {
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [qrOpen, setQrOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const toast = useToastStore();
  const { copied, copy } = useCopyToClipboard();

  const handleShorten = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      toast.error('Please enter a URL to shorten');
      return;
    }

    if (!isAuthenticated) {
      toast.info('Sign up to save and track your links!');
    }

    setLoading(true);
    try {
      const res = await api.createLink({
        originalUrl: url,
        ...(alias && { customAlias: alias }),
      });
      setResult(res.data);
      toast.success('Link shortened!');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to shorten link');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyResult = () => {
    if (result) {
      copy(result.shortUrl);
      toast.success('Copied to clipboard!');
    }
  };

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: ['50 links/month', 'Basic analytics', 'QR code generation', 'Custom aliases'],
      cta: isAuthenticated ? 'Go to Dashboard' : 'Get Started',
      action: () => navigate(isAuthenticated ? '/dashboard' : '/register'),
      popular: false,
    },
    {
      name: 'Pro',
      price: '$9',
      period: '/month',
      features: ['Unlimited links', 'Advanced analytics', 'Password protection', 'API access', 'Custom domains', 'Priority support'],
      cta: isAuthenticated ? 'Active Pro Workspace' : 'Start Free Trial',
      action: () => navigate(isAuthenticated ? '/dashboard' : '/register'),
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: ['Everything in Pro', 'SSO / SAML', 'Dedicated support', 'SLA guarantees', 'Custom integrations'],
      cta: 'Contact Sales',
      action: () => navigate('/contact'),
      popular: false,
    },
  ];

  return (
    <div style={{ width: '100%', overflowX: 'hidden', position: 'relative' }}>
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
      {/* ── Hero Section ── */}
      <section
        style={{
          position: 'relative',
          padding: '110px 24px 80px',
          maxWidth: 1280,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
        className="gradient-mesh noise-overlay"
      >
        <Magnet range={60}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(194, 91, 62, 0.08)',
              border: '1px solid rgba(194, 91, 62, 0.2)',
              marginBottom: 24,
              cursor: 'pointer',
            }}
          >
            <AnimatedIcon name="zap" size={16} trigger="hover" color="#C25B3E" />
            <DecryptedText
              text="LinkSnap v2.0 is Live"
              animateOn="hover"
              speed={40}
              maxIterations={8}
              style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--accent-color)' }}
            />
          </motion.div>
        </Magnet>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            maxWidth: 800,
            marginBottom: 20,
            color: 'var(--text-primary)',
          }}
        >
          <SplitText text="Shorten, Share, and Scale Your " delay={0.035} />
          <ShinyText text="Links" style={{
            background: 'var(--accent-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }} />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--text-secondary)',
            maxWidth: 580,
            lineHeight: 1.6,
            marginBottom: 40,
          }}
        >
          Create branded short URLs, generate vector QR codes, and track real-time click analytics with a sleek, interactive platform.
        </motion.p>

        {/* 3D Lifted Floating Shortener Box */}
        <ThreeDTiltCard maxTilt={10} scale={1.02} style={{ width: '100%', maxWidth: 580, marginBottom: 40 }}>
          <motion.form
            onSubmit={handleShorten}
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              padding: '12px 14px 14px',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(194, 91, 62, 0.28)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: '0 24px 60px rgba(20, 33, 30, 0.12), 0 6px 24px rgba(194, 91, 62, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '6px 6px 6px 16px',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'inset 0 2px 4px rgba(20, 33, 30, 0.03), 0 2px 8px rgba(20, 33, 30, 0.04)',
            }}>
              <AnimatedIcon name="link" size={18} trigger="hover" color="var(--accent-color)" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste your long destination URL..."
                className="focus-ring"
                style={{
                  flex: 1,
                  padding: '12px 4px',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--font-size-sm)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 500,
                }}
              />
              <motion.button
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{
                  padding: '12px 24px',
                  whiteSpace: 'nowrap',
                  background: 'var(--accent-gradient)',
                  boxShadow: '0 6px 20px rgba(194, 91, 62, 0.4)',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 700,
                  fontSize: 'var(--font-size-sm)',
                  position: 'relative',
                  overflow: 'hidden',
                  minWidth: 180,
                }}
              >
                {/* Success Checkmark */}
                <AnimatePresence>
                  {success && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      >
                        <AnimatedIcon name="check" size={18} color="#FFFFFF" trigger="mount" />
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>

                {/* Main content */}
                <motion.div
                  animate={{ opacity: success ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%' }}
                >
                  {!loading && <AnimatedIcon name="zap" size={16} trigger="hover" />}
                  Shorten URL
                </motion.div>

                {/* Loader on the far right */}
                <AnimatePresence>
                  {loading && (
                    <div style={{ position: 'absolute', right: 16, top: 0, bottom: 0, display: 'flex', alignItems: 'center' }}>
                      <motion.div
                        key="loader"
                        initial={{ opacity: 0, scale: 0.8, x: 10 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <AnimatedIcon name="loader" size={16} trigger="mount" />
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 12, paddingTop: 2 }}>
              <AnimatedIcon name="key" size={14} trigger="hover" color="var(--accent-color)" />
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', fontWeight: 500 }}>
                Custom alias:
              </span>
              <input
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder="e.g. summer-sale-2026"
                style={{
                  flex: 1,
                  padding: '4px 4px',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--font-size-xs)',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 500,
                }}
              />
            </div>
          </motion.form>
        </ThreeDTiltCard>

        {/* Shorten Result Box */}
        {result && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="card"
              style={{
                width: '100%',
                maxWidth: 560,
                padding: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                marginBottom: 40,
                border: '1px solid rgba(15, 157, 108, 0.3)',
                background: 'rgba(15, 157, 108, 0.04)',
              }}
            >
              <span className="mono font-semibold" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--accent-color)' }}>
                {result.shortUrl}
              </span>
              <div style={{ display: 'flex', gap: 8 }}>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setQrOpen(true)}
                  className="btn btn-secondary btn-sm"
                >
                  <AnimatedIcon name="qr" size={14} trigger="hover" />
                  QR Code
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleCopyResult}
                  className="btn btn-secondary btn-sm"
                >
                  <AnimatedIcon name={copied ? 'check' : 'copy'} size={14} trigger="click" />
                  {copied ? 'Copied' : 'Copy'}
                </motion.button>
              </div>
            </motion.div>
            <QRCodeModal
              isOpen={qrOpen}
              onClose={() => setQrOpen(false)}
              url={result.shortUrl}
              shortCode={result.shortCode}
            />
          </>
        )}
      </section>

      {/* ── Features Grid ── */}
      <section style={{ padding: '80px 24px', maxWidth: 1280, margin: '0 auto' }}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          variants={staggerChildren}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-2xl)', fontWeight: 700, marginBottom: 12 }}>
            Everything you need to manage your links
          </motion.h2>
          <motion.p variants={fadeUp} style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-lg)', maxWidth: 600, margin: '0 auto' }}>
            Built for maximum speed, enterprise security, and detailed analytics.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          variants={staggerChildren}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 20,
          }}
        >
          {features.map((feature, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <ThreeDTiltCard
                  maxTilt={10}
                  scale={1.02}
                  style={{ height: '100%', borderRadius: '24px' }}
                >
                  <div
                    style={{
                      padding: '32px 28px',
                      height: '100%',
                      background: 'var(--bg-secondary)',
                      border: `1px solid ${isHovered ? 'rgba(194, 91, 62, 0.28)' : 'var(--border-primary)'}`,
                      borderRadius: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      boxShadow: isHovered
                        ? '0 12px 30px rgba(194, 91, 62, 0.08), 0 0 20px rgba(194, 91, 62, 0.04)'
                        : 'none',
                      transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                    }}
                  >
                    <Magnet range={60}>
                      <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: 'var(--radius-md)',
                        background: isHovered ? 'rgba(194, 91, 62, 0.08)' : 'rgba(194, 91, 62, 0.05)',
                        border: `1px solid ${isHovered ? 'rgba(194, 91, 62, 0.2)' : 'rgba(194, 91, 62, 0.12)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 20,
                        transition: 'all 0.25s ease',
                      }}>
                        <AnimatedIcon name={feature.icon} size={22} trigger="hover" active={isHovered} color="var(--accent-color)" />
                      </div>
                    </Magnet>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: 8,
                    }}>
                      {feature.title}
                    </h3>
                    <p style={{
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                    }}>
                      {feature.description}
                    </p>
                  </div>
                </ThreeDTiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ── Pricing Section with Clean Un-clipped Most Popular Pill ── */}
      <section style={{ padding: '80px 24px', maxWidth: 1280, margin: '0 auto' }}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          variants={staggerChildren}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-2xl)', fontWeight: 700, marginBottom: 16 }}>
            Simple, transparent pricing
          </motion.h2>
          <motion.p variants={fadeUp} style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-lg)' }}>
            Start free, upgrade when you need more.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          variants={staggerChildren}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
            maxWidth: 960,
            margin: '0 auto',
            paddingTop: 16, // Extra space for top floating pill
          }}
        >
          {plans.map((plan, i) => (
            <motion.div key={i} variants={fadeUp} style={{ position: 'relative' }}>
              <ThreeDTiltCard maxTilt={10} scale={1.02} style={{ height: '100%', overflow: 'visible' }}>
                <div
                  className="card"
                  style={{
                    padding: '36px 32px 32px',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    border: plan.popular ? '2px solid #C25B3E' : undefined,
                    boxShadow: plan.popular ? '0 12px 30px rgba(194, 91, 62, 0.2)' : undefined,
                    overflow: 'visible',
                  }}
                >
                  {plan.popular && (
                    <div style={{
                      position: 'absolute',
                      top: -14,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      padding: '5px 18px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--accent-gradient)',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      letterSpacing: '0.03em',
                      boxShadow: '0 4px 14px rgba(194, 91, 62, 0.4)',
                      whiteSpace: 'nowrap',
                      zIndex: 30,
                    }}>
                      Most Popular
                    </div>
                  )}

                  <div>
                    <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: 8 }}>
                      {plan.name}
                    </h3>
                    <div style={{ marginBottom: 24 }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-2xl)', fontWeight: 800 }}>
                        {plan.price}
                      </span>
                      <span style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)' }}>
                        {plan.period}
                      </span>
                    </div>
                    <ul style={{ listStyle: 'none', marginBottom: 28 }}>
                      {plan.features.map((f, j) => (
                        <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                          <AnimatedIcon name="check" size={14} trigger="none" color="#0F9D6C" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Perfectly Aligned Button at Bottom */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={plan.popular ? 'btn btn-primary' : 'btn btn-secondary'}
                    style={{ width: '100%', marginTop: 'auto' }}
                    onClick={plan.action}
                  >
                    {plan.cta}
                  </motion.button>
                </div>
              </ThreeDTiltCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
