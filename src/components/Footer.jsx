import { Link } from 'react-router-dom';
import AnimatedIcon from './AnimatedIcon';

const productLinks = [
  { label: 'Features', to: '/#features' },
  { label: 'Analytics', to: '/dashboard' },
  { label: 'Pricing', to: '/#pricing' },
  { label: 'API Access', to: '/settings' },
];

const companyLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
  { label: 'Cookie Policy', to: '/cookies' },
  { label: 'Security', to: '/security' },
];

export default function Footer() {
  return (
    <footer className="footer-root">
      <div className="footer-container">
        {/* Main Footer Grid */}
        <div className="footer-main-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo-link">
              <div className="footer-logo-icon">
                <AnimatedIcon name="link" size={20} trigger="hover" color="#C25B3E" />
              </div>
              <span className="footer-logo-text">LinkSnap</span>
            </Link>

            <p className="footer-tagline">
              The modern URL shortener. Create, track, and optimize your links with real-time analytics and enterprise-grade security.
            </p>

            {/* Live Operational Status Indicator */}
            <div className="footer-status-pill">
              <span className="footer-status-dot" />
              <span className="footer-status-text">All Systems Operational</span>
            </div>
          </div>

          {/* Links Columns Container */}
          <div className="footer-links-grid">
            {/* Product */}
            <div className="footer-nav-col">
              <h4 className="footer-col-title">Product</h4>
              <ul className="footer-nav-list">
                {productLinks.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="footer-nav-item">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="footer-nav-col">
              <h4 className="footer-col-title">Company</h4>
              <ul className="footer-nav-list">
                {companyLinks.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="footer-nav-item">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="footer-nav-col legal-col">
              <h4 className="footer-col-title">Legal</h4>
              <ul className="footer-nav-list legal-nav-list">
                {legalLinks.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="footer-nav-item">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright-group">
            <span>© {new Date().getFullYear()} LinkSnap. All rights reserved.</span>
            <span className="footer-bullet">•</span>
            <span>Crafted with precision</span>
          </div>

          <div className="footer-badges">
            <div className="footer-badge-item">
              <AnimatedIcon name="globe" size={16} trigger="hover" color="var(--text-tertiary)" />
              <span>Global CDN</span>
            </div>
            <div className="footer-badge-item">
              <AnimatedIcon name="zap" size={16} trigger="hover" color="var(--accent-color)" />
              <span>Lightning Fast</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
