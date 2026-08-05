import { Link } from 'react-router-dom';
import AnimatedIcon from './AnimatedIcon';

const productLinks = [
  { label: 'Features', to: '/links' },
  { label: 'Analytics', to: '/analytics/lnk_1' },
  { label: 'Pricing', to: '/create' },
  { label: 'API', to: '/settings' },
];

const companyLinks = [
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
];

const legalLinks = [
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
  { label: 'Cookies', to: '/cookies' },
];

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-primary)',
      padding: '48px 24px 32px',
      marginTop: 80,
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 40,
          marginBottom: 40,
        }}>
          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, textDecoration: 'none' }}>
              <AnimatedIcon name="link" size={24} trigger="hover" color="#C25B3E" />
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--font-size-lg)',
                fontWeight: 700,
                background: 'var(--accent-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                LinkSnap
              </span>
            </Link>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 280 }}>
              The modern URL shortener. Create, track, and optimize your links with powerful analytics.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>
              Product
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {productLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  style={{
                    fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)',
                    textDecoration: 'none', transition: 'color 0.15s',
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>
              Company
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {companyLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  style={{
                    fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)',
                    textDecoration: 'none', transition: 'color 0.15s',
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>
              Legal
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {legalLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  style={{
                    fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)',
                    textDecoration: 'none', transition: 'color 0.15s',
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border-primary)',
          paddingTop: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>
            © {new Date().getFullYear()} LinkSnap. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 16 }}>
            <AnimatedIcon name="globe" size={18} trigger="hover" color="var(--text-tertiary)" />
            <AnimatedIcon name="zap" size={18} trigger="hover" color="var(--text-tertiary)" />
          </div>
        </div>
      </div>
    </footer>
  );
}
