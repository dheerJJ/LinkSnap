import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedIcon from '../components/AnimatedIcon';

const pageData = {
  '/about': {
    title: 'About LinkSnap',
    subtitle: 'The modern URL shortening and link management platform.',
    content: 'LinkSnap was built for developers, marketers, and creators who need fast, brandable, and secure short links with real-time analytics.',
  },
  '/blog': {
    title: 'LinkSnap Blog',
    subtitle: 'Insights on link optimization, SEO, and click tracking.',
    content: 'Stay updated with the latest trends in digital marketing, short link security, and conversion rate optimization.',
  },
  '/careers': {
    title: 'Join Our Team',
    subtitle: 'We are building the future of link infrastructure.',
    content: 'We are looking for passionate engineers, designers, and growth specialists to help scale LinkSnap globally.',
  },
  '/contact': {
    title: 'Contact Support',
    subtitle: 'Have questions or need assistance? We are here to help.',
    content: 'Reach out to our support team at support@linksnap.io or join our developer community on GitHub.',
  },
  '/privacy': {
    title: 'Privacy Policy',
    subtitle: 'Your data security and privacy are our top priorities.',
    content: 'LinkSnap collects minimal analytics data to provide click insights. We never sell your personal information to third parties.',
  },
  '/terms': {
    title: 'Terms of Service',
    subtitle: 'Clear, straightforward terms for using LinkSnap services.',
    content: 'By using LinkSnap, you agree to respect public web policies and avoid using short links for malicious or harmful activities.',
  },
  '/cookies': {
    title: 'Cookie Policy',
    subtitle: 'How we use essential cookies to maintain your active session.',
    content: 'We use strictly necessary cookies to store authentication states and dark mode theme preferences.',
  },
};

export default function InfoPage() {
  const { pathname } = useLocation();
  const info = pageData[pathname] || {
    title: 'Information',
    subtitle: 'LinkSnap Platform Details',
    content: 'Learn more about our platform capabilities and developer tools.',
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 100px' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)', textDecoration: 'none', marginBottom: 24 }}>
          <AnimatedIcon name="arrow-left" size={14} trigger="hover" />
          Back to Home
        </Link>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-2xl)', fontWeight: 800, marginBottom: 8, letterSpacing: '-0.02em' }}>
          {info.title}
        </h1>
        <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--text-secondary)', marginBottom: 32, lineHeight: 1.6 }}>
          {info.subtitle}
        </p>

        <div className="card" style={{ padding: 32, lineHeight: 1.7, color: 'var(--text-primary)', fontSize: 'var(--font-size-sm)' }}>
          {info.content}
        </div>
      </motion.div>
    </div>
  );
}
