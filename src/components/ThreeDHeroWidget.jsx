import { motion } from 'framer-motion';
import AnimatedIcon from './AnimatedIcon';

/**
 * ThreeDHeroWidget — Animated 3D Floating Hero Graphic with interactive 3D depth,
 * floating glass spheres, real-time analytics badge, and glowing orbit rings.
 */
export default function ThreeDHeroWidget() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: 520,
      height: 320,
      margin: '40px auto 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      perspective: 1200,
    }}>
      {/* Background Glowing 3D Radial Aura */}
      <div
        className="animate-pulse-glow"
        style={{
          position: 'absolute',
          width: 340,
          height: 340,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(194, 91, 62, 0.28) 0%, rgba(15, 157, 108, 0.15) 50%, transparent 70%)',
          filter: 'blur(40px)',
          zIndex: 0,
        }}
      />

      {/* Rotating 3D Orbit Ring 1 */}
      <div
        className="animate-rotate-ring"
        style={{
          position: 'absolute',
          width: 380,
          height: 380,
          borderRadius: '50%',
          border: '1.5px dashed rgba(194, 91, 62, 0.35)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Floating 3D Main Link Card */}
      <motion.div
        initial={{ opacity: 0, rotateY: -15, rotateX: 10, y: 30 }}
        animate={{ opacity: 1, rotateY: -8, rotateX: 6, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="animate-float-3d"
        style={{
          position: 'relative',
          zIndex: 3,
          width: 360,
          padding: '24px 28px',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid var(--border-accent)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 25px 50px -12px rgba(20, 33, 30, 0.25), 0 0 30px rgba(194, 91, 62, 0.2)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Card Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, transform: 'translateZ(20px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 'var(--radius-md)',
              background: 'rgba(194, 91, 62, 0.12)', border: '1px solid rgba(194, 91, 62, 0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <AnimatedIcon name="link" size={20} trigger="loop" color="#C25B3E" />
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-sm)', fontWeight: 700 }}>
                LinkSnap Pro
              </h4>
              <span className="mono" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>
                linksnap.io/launch-2026
              </span>
            </div>
          </div>
          <span className="badge badge-active" style={{ transform: 'translateZ(10px)' }}>
            ● Active
          </span>
        </div>

        {/* Shortened URL Bar */}
        <div style={{
          padding: '10px 14px',
          background: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
          transform: 'translateZ(25px)',
          border: '1px solid var(--border-primary)',
        }}>
          <span className="truncate-url" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
            https://producthunt.com/posts/linksnap-v2
          </span>
          <AnimatedIcon name="external-link" size={14} trigger="hover" color="var(--text-tertiary)" />
        </div>

        {/* Live Click Counter & Trend */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', transform: 'translateZ(30px)' }}>
          <div>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)', display: 'block' }}>Total Clicks</span>
            <span className="mono" style={{ fontSize: 'var(--font-size-lg)', fontWeight: 800, color: 'var(--text-primary)' }}>
              148,920
            </span>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '4px 10px', borderRadius: 'var(--radius-full)',
            background: 'rgba(15, 157, 108, 0.12)', color: '#0F9D6C',
            fontSize: 'var(--font-size-xs)', fontWeight: 700,
          }}>
            <AnimatedIcon name="chart" size={14} trigger="none" color="#0F9D6C" />
            +34.8%
          </div>
        </div>
      </motion.div>

      {/* Floating 3D Badge 1 (Top Right QR Code Badge) */}
      <motion.div
        initial={{ opacity: 0, x: 30, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="animate-float-3d-fast"
        style={{
          position: 'absolute',
          top: 10,
          right: 20,
          zIndex: 4,
          padding: '10px 16px',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(15, 157, 108, 0.3)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 15px 30px rgba(20, 33, 30, 0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          transformStyle: 'preserve-3d',
          transform: 'translateZ(45px)',
        }}
      >
        <div style={{
          width: 32, height: 32, borderRadius: 'var(--radius-sm)',
          background: 'rgba(15, 157, 108, 0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <AnimatedIcon name="qr" size={18} trigger="hover" color="#0F9D6C" />
        </div>
        <div>
          <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, display: 'block' }}>Vector QR</span>
          <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>Instant SVG/PNG</span>
        </div>
      </motion.div>

      {/* Floating 3D Badge 2 (Bottom Left Security Badge) */}
      <motion.div
        initial={{ opacity: 0, x: -30, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="animate-float-3d-fast"
        style={{
          position: 'absolute',
          bottom: 15,
          left: 15,
          zIndex: 4,
          padding: '10px 16px',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(194, 91, 62, 0.3)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 15px 30px rgba(20, 33, 30, 0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          transformStyle: 'preserve-3d',
          transform: 'translateZ(50px)',
          animationDelay: '-2s',
        }}
      >
        <div style={{
          width: 32, height: 32, borderRadius: 'var(--radius-sm)',
          background: 'rgba(194, 91, 62, 0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <AnimatedIcon name="shield" size={18} trigger="hover" color="#C25B3E" />
        </div>
        <div>
          <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, display: 'block' }}>Password Protected</span>
          <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>AES-256 Encrypted</span>
        </div>
      </motion.div>
    </div>
  );
}
