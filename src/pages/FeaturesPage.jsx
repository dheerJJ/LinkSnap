import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AnimatedIcon from '../components/AnimatedIcon.jsx';
import ThreeDTiltCard from '../components/ThreeDTiltCard.jsx';
import Footer from '../components/Footer.jsx';

const allFeatures = [
  {
    icon: 'zap',
    title: 'Instant Shortening Engine',
    description: 'Create short links in under 5ms using edge-computing nodes and memory caching.',
    details: ['Sub-5ms redirection latency', 'Global edge caching across 300+ POPs', 'Bulk shortening via API'],
  },
  {
    icon: 'chart',
    title: 'Real-Time Click Analytics',
    description: 'Track clicks, geographical locations, devices, referrers, and conversion goals live.',
    details: ['Real-time streaming stats', 'Geographic heatmaps & device graphs', 'Export to CSV / JSON / BigQuery'],
  },
  {
    icon: 'lock',
    title: 'Passcode Protection & AES-256',
    description: 'Secure confidential or paid links with custom passcodes and end-to-end encryption.',
    details: ['AES-256 password hashing', 'Session expiration tokens', 'Brute-force protection limits'],
  },
  {
    icon: 'clock',
    title: 'Custom Expiration & Limits',
    description: 'Set custom expiration dates or click count limits for time-sensitive marketing campaigns.',
    details: ['Automatic link deactivation', 'Custom 404 fallback redirects', 'Scheduled active window times'],
  },
  {
    icon: 'qr',
    title: 'High-Res Vector QR Codes',
    description: 'Generate customizable, high-resolution SVG and PNG QR codes for print and digital assets.',
    details: ['Downloadable SVG & PNG formats', 'Custom brand logos & color palettes', 'Dynamic QR code destination updates'],
  },
  {
    icon: 'key',
    title: 'Custom Aliases & Branded Domains',
    description: 'Boost CTR by up to 34% by wrapping short links with memorable custom brand aliases.',
    details: ['Custom domain mapping (yourname.link)', 'Memorable custom alias slugs', 'SSL auto-provisioning via Let\'s Encrypt'],
  },
];

export default function FeaturesPage() {
  const navigate = useNavigate();

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      {/* Hero Header */}
      <section style={{ padding: '80px 24px 60px', maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 'var(--radius-full)', background: 'rgba(194, 91, 62, 0.08)', border: '1px solid rgba(194, 91, 62, 0.2)', marginBottom: 20 }}>
            <AnimatedIcon name="zap" size={16} trigger="hover" color="#C25B3E" />
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--accent-color)' }}>
              Platform Overview
            </span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: 16 }}>
            Powerful Link Infrastructure Built for Growth
          </h1>
          <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)', maxWidth: 640, margin: '0 auto 36px' }}>
            Everything you need to shorten, brand, secure, and analyze your URLs at scale.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/register')} className="btn btn-primary btn-lg">
              Get Started Free
            </button>
            <button onClick={() => navigate('/dashboard')} className="btn btn-secondary btn-lg">
              Explore Live Dashboard
            </button>
          </div>
        </motion.div>
      </section>

      {/* Detailed Features Grid */}
      <section style={{ padding: '40px 24px 80px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {allFeatures.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <ThreeDTiltCard maxTilt={10} scale={1.02} style={{ height: '100%', borderRadius: 24 }}>
                <div
                  className="card card-hover"
                  style={{ padding: 32, height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 24 }}
                >
                  <div style={{
                    width: 52, height: 52, borderRadius: 'var(--radius-md)',
                    background: 'rgba(194, 91, 62, 0.08)', border: '1px solid rgba(194, 91, 62, 0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24,
                  }}>
                    <AnimatedIcon name={feat.icon} size={24} trigger="hover" color="var(--accent-color)" />
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-lg)', fontWeight: 700, marginBottom: 12 }}>
                    {feat.title}
                  </h3>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>
                    {feat.description}
                  </p>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 'auto 0 0 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {feat.details.map((detail) => (
                      <li key={detail} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
                        <AnimatedIcon name="check" size={14} trigger="none" color="#0F9D6C" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </ThreeDTiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
