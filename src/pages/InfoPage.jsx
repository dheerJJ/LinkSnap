import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedIcon from '../components/AnimatedIcon';

/* ─────────────── page data ─────────────── */
const pageData = {

  '/about': {
    title: 'About LinkSnap',
    subtitle: 'We\'re building the world\'s most intelligent link management platform — fast, secure, and built for scale.',
    sections: [
      {
        heading: 'Our Story',
        body: `LinkSnap started with a simple frustration: every URL shortener was either too basic or too expensive. We set out to build something different — a platform that gives developers, marketers, and creators everything they need in one place, without compromising on speed, security, or transparency.\n\nFounded in 2024, LinkSnap has grown from a weekend side project into a full-scale link intelligence platform trusted by thousands of users globally.`,
      },
      {
        heading: 'What We Build',
        items: [
          '⚡  Instant URL shortening with sub-100ms response times',
          '📊  Real-time analytics — clicks, geography, devices, referrers',
          '🔒  AES-256 passcode protection & link expiration controls',
          '🌐  Custom branded domains & memorable alias slugs',
          '🔗  REST API access with webhook event streaming',
          '📱  QR code generation for every link you create',
        ],
      },
      {
        heading: 'Our Mission',
        body: 'We believe every link deserves to be smart. LinkSnap exists to give every creator and organization the power to understand, brand, and control their digital presence — one link at a time.',
      },
      {
        heading: 'Built With Care',
        body: 'Our platform is built on Node.js, MongoDB, and React — with a focus on performance, privacy, and developer experience. We open-source our tooling where possible and believe in transparency about how we handle your data.',
      },
    ],
  },

  '/blog': {
    title: 'LinkSnap Blog',
    subtitle: 'Insights, guides, and deep-dives on link optimization, analytics, and digital growth.',
    sections: [
      {
        heading: '📌 Featured: The Power of Custom Aliases',
        body: 'Generic short links like `sho.rt/x9Jz2` don\'t build trust. Custom aliases like `yourname.link/launch` do. In this post, we explore why branded short links can increase click-through rates by up to 39% and how to set them up in under 60 seconds with LinkSnap.',
      },
      {
        heading: '📈 Understanding Your Click Analytics',
        body: 'Knowing someone clicked your link is just the beginning. With LinkSnap\'s real-time analytics dashboard, you can see exactly where your audience is coming from — by city, device type, operating system, and referral source. Learn how to interpret this data and use it to drive smarter campaigns.',
      },
      {
        heading: '🔒 Why Link Security Matters in 2025',
        body: 'Phishing attacks via shortened URLs increased by 220% in 2024. LinkSnap\'s passcode protection and link expiration features are designed to give you complete control over who can access your links — and for how long. This post breaks down our security model from first principles.',
      },
      {
        heading: '🛠️ Building with the LinkSnap API',
        body: 'LinkSnap\'s REST API lets you create, retrieve, and analyze links programmatically. Whether you\'re building a marketing automation workflow, a SaaS product with integrated link shortening, or a browser extension — our API is designed for developers who want full control.',
      },
      {
        heading: '📬 Subscribe for Updates',
        body: 'We publish new content on growth strategy, developer tools, and platform updates every two weeks. Follow us on GitHub and check back here for the latest posts from the LinkSnap team.',
      },
    ],
  },

  '/careers': {
    title: 'Join Our Team',
    subtitle: 'We\'re a small, focused team building infrastructure that millions of links depend on. Come build with us.',
    sections: [
      {
        heading: 'Who We Are',
        body: 'LinkSnap is a lean, fully-remote team of engineers, designers, and growth specialists who care deeply about the product we\'re building. We move fast, ship often, and treat every team member as a co-creator — not just an executor.',
      },
      {
        heading: 'Open Roles',
        items: [
          '🧑‍💻  Senior Backend Engineer (Node.js / MongoDB)',
          '⚛️   Frontend Engineer (React / Vite)',
          '📊  Data & Analytics Engineer',
          '🎨  Product Designer (UI/UX)',
          '📣  Growth & Marketing Lead',
          '🤝  Developer Relations (DevRel)',
        ],
      },
      {
        heading: 'What We Offer',
        items: [
          '💰  Competitive salary + meaningful equity',
          '🌍  100% remote — work from anywhere',
          '🧘  Flexible async-first culture, no meeting overload',
          '📚  $2,000/year learning & development budget',
          '🏖️  Unlimited PTO with a minimum 15-day expectation',
          '🛠️  Top-of-the-line hardware setup, your choice',
        ],
      },
      {
        heading: 'How to Apply',
        body: 'Send your resume, a short note about why you\'re excited about LinkSnap, and any relevant work (GitHub, portfolio, case studies) to careers@linksnap.io. We review every application personally and aim to respond within 5 business days.',
      },
    ],
  },

  '/contact': {
    title: 'Contact Us',
    subtitle: 'We\'re here to help. Whether it\'s a technical issue, a billing question, or a partnership inquiry — reach out.',
    sections: [
      {
        heading: '💬 General Support',
        body: 'For questions about your account, link management, or analytics features, email us at support@linksnap.io. Our support team responds within 24 hours on business days. Pro Workspace users get priority response within 4 hours.',
      },
      {
        heading: '🔧 Technical & API Support',
        body: 'Experiencing an issue with our REST API, webhooks, or integrations? Open an issue on our GitHub repository or email devs@linksnap.io. Please include your request payload, response code, and a description of the unexpected behavior.',
      },
      {
        heading: '🤝 Partnerships & Enterprise',
        body: 'Interested in a volume licensing deal, white-label integration, or technology partnership? We\'d love to talk. Reach out to partnerships@linksnap.io and we\'ll schedule a call within 48 hours.',
      },
      {
        heading: '🐛 Report Abuse',
        body: 'If you\'ve encountered a LinkSnap short link being used for spam, phishing, or malicious activity, please report it immediately at abuse@linksnap.io. We take reports seriously and investigate every submission within 6 hours.',
      },
      {
        heading: '📍 Company Information',
        items: [
          '🌐  Website: linksnap.io',
          '📧  General: hello@linksnap.io',
          '🐙  GitHub: github.com/dheerJJ/LinkSnap',
          '🔐  Security: security@linksnap.io',
        ],
      },
    ],
  },

  '/privacy': {
    title: 'Privacy Policy',
    subtitle: 'Your privacy is not a checkbox for us — it\'s a core design principle. Last updated: August 2025.',
    sections: [
      {
        heading: 'What We Collect',
        body: 'When you register, we store your name, email address, and a securely hashed password (bcrypt). We never store passwords in plain text. When a short link is visited, we log the timestamp, approximate geographic location (country/city from IP), browser user-agent, and referrer URL. We do not store full IP addresses after geolocation lookup.',
      },
      {
        heading: 'What We Do NOT Collect',
        items: [
          '❌  We do not sell your data to any third party — ever',
          '❌  We do not run third-party advertising trackers on our platform',
          '❌  We do not build behavioral profiles for ad targeting',
          '❌  We do not share your link analytics with external services',
          '❌  We do not access the content of the destination URLs you shorten',
        ],
      },
      {
        heading: 'How We Use Your Data',
        body: 'Data you provide is used solely to operate the LinkSnap service: to authenticate you, to display your link analytics dashboard, and to provide aggregated click insights per link. We may use anonymized, aggregate usage data to improve platform performance — but this data is never tied to your identity.',
      },
      {
        heading: 'Data Retention',
        body: 'Your account data is retained as long as your account is active. If you delete your account, all personal data and associated link analytics are permanently deleted within 30 days. You may request early deletion by emailing privacy@linksnap.io.',
      },
      {
        heading: 'Your Rights (GDPR / CCPA)',
        items: [
          '✅  Right to access your data — request a full export at any time',
          '✅  Right to correct inaccurate data',
          '✅  Right to erasure — delete your account and all data',
          '✅  Right to portability — download your links and analytics as CSV/JSON',
          '✅  Right to object to processing — contact us at privacy@linksnap.io',
        ],
      },
      {
        heading: 'Cookies',
        body: 'We use only strictly necessary cookies: a JWT session token stored in memory (not on disk) and a theme preference flag. We do not use any advertising or tracking cookies. See our Cookie Policy for full details.',
      },
    ],
  },

  '/terms': {
    title: 'Terms of Service',
    subtitle: 'Plain-language terms that explain exactly what you can expect from us — and what we expect from you. Last updated: August 2025.',
    sections: [
      {
        heading: 'Acceptance',
        body: 'By creating a LinkSnap account or using our API, you agree to these Terms of Service. If you do not agree, please do not use the platform. We may update these terms from time to time — we\'ll notify you by email when we do, and your continued use constitutes acceptance.',
      },
      {
        heading: 'Acceptable Use',
        body: 'You may use LinkSnap for lawful purposes only. You agree NOT to use our platform to:',
        items: [
          '🚫  Distribute malware, spyware, or ransomware',
          '🚫  Conduct phishing, fraud, or identity theft',
          '🚫  Share content that is illegal, hateful, or violates copyright',
          '🚫  Circumvent security measures or attempt unauthorized access',
          '🚫  Generate automated spam links in bulk without an API key',
          '🚫  Use our service to harm, harass, or threaten others',
        ],
      },
      {
        heading: 'Free Plan Limits',
        body: 'The Free plan allows up to 50 shortened links per calendar month. Links created under the Free plan may be subject to a 90-day inactivity expiration. Automated mass creation via the UI is not permitted on the Free plan.',
      },
      {
        heading: 'Intellectual Property',
        body: 'LinkSnap and its logos, UI, and documentation are the intellectual property of LinkSnap Ltd. Your links and analytics data belong to you. You grant us a limited license to store and process them solely for the purpose of operating the service.',
      },
      {
        heading: 'Termination',
        body: 'We reserve the right to suspend or terminate accounts that violate these terms, at our discretion and without prior notice if the violation poses an immediate risk. For lesser violations, we will typically provide a warning first.',
      },
      {
        heading: 'Limitation of Liability',
        body: 'LinkSnap is provided "as is." We are not liable for any indirect, incidental, or consequential damages arising from use of the platform. Our total liability for any claim is limited to the amount you paid us in the 12 months preceding the claim.',
      },
    ],
  },

  '/cookies': {
    title: 'Cookie Policy',
    subtitle: 'We believe in minimal, purposeful cookie usage. Here\'s exactly what we use and why. Last updated: August 2025.',
    sections: [
      {
        heading: 'Our Cookie Philosophy',
        body: 'We use exactly two types of cookies on LinkSnap, both strictly necessary for the platform to function. We do not use advertising cookies, cross-site tracking cookies, or third-party analytics cookies of any kind.',
      },
      {
        heading: 'Cookies We Use',
        items: [
          '🔐  linksnap_auth_token — Stores your JWT authentication session in memory. Expires when the browser is closed or after 7 days. Required for you to stay logged in.',
          '🎨  linksnap_theme — Stores your dark/light mode preference (a single string: "dark" or "light"). Persists across sessions. No personal data.',
        ],
      },
      {
        heading: 'What We Do NOT Use',
        items: [
          '❌  Google Analytics, Facebook Pixel, or any third-party trackers',
          '❌  Advertising or retargeting cookies',
          '❌  Cross-domain tracking cookies',
          '❌  Fingerprinting or supercookies of any kind',
        ],
      },
      {
        heading: 'Managing Cookies',
        body: 'You can clear all LinkSnap cookies at any time by logging out of your account or clearing your browser\'s site data for linksnap.io. Disabling cookies in your browser will prevent you from staying logged in, but you can still use the public link shortener without an account.',
      },
      {
        heading: 'Changes to This Policy',
        body: 'If we ever need to add new cookies for legitimate operational reasons, we will update this policy and notify registered users by email before the change takes effect.',
      },
    ],
  },

  '/security': {
    title: 'Security at LinkSnap',
    subtitle: 'Security isn\'t a feature — it\'s a foundation. Here\'s how we protect your links, your data, and your account.',
    sections: [
      {
        heading: 'Authentication & Passwords',
        body: 'All user passwords are hashed using bcrypt with a salt factor of 12 before storage. We never store or transmit plain-text passwords. Session tokens are signed JWTs with a 7-day expiry using RS256 (asymmetric keys). Tokens are stored in memory, not localStorage, to prevent XSS-based theft.',
      },
      {
        heading: 'Link Passcode Protection',
        body: 'When you protect a link with a passcode, the passcode is hashed server-side using AES-256 before storage. The raw passcode is never logged. Visitors must provide the correct passcode to be redirected — protecting sensitive destinations from unauthorized access.',
      },
      {
        heading: 'Data Encryption',
        items: [
          '🔒  All data in transit is encrypted using TLS 1.3',
          '🔐  Sensitive fields in the database are encrypted at rest using AES-256',
          '🛡️  MongoDB is deployed in a private VPC with no public internet exposure',
          '📦  Backups are encrypted and stored in geo-redundant storage',
        ],
      },
      {
        heading: 'Infrastructure Security',
        items: [
          '🌐  All traffic routed through a reverse proxy with rate limiting',
          '🚫  Brute-force protection: accounts are locked after 10 failed login attempts',
          '📋  Full audit logging of authentication events and API key usage',
          '🔄  Dependency scanning runs on every pull request via automated CI',
          '🧪  Regular penetration testing by third-party security researchers',
        ],
      },
      {
        heading: 'Responsible Disclosure',
        body: 'We operate a responsible disclosure program. If you discover a security vulnerability in LinkSnap, please report it to security@linksnap.io. Do not publicly disclose the issue until we\'ve had a chance to investigate and patch it. We commit to acknowledging reports within 24 hours and providing a resolution timeline within 72 hours.',
      },
      {
        heading: 'Reporting Abuse',
        body: 'If you encounter a LinkSnap short link being used for phishing, malware distribution, or other malicious purposes, please email abuse@linksnap.io immediately. We investigate all reports and typically disable abusive links within 1–6 hours of a confirmed report.',
      },
    ],
  },

};

/* ─────────────── component ─────────────── */
export default function InfoPage() {
  const { pathname } = useLocation();
  const info = pageData[pathname] || {
    title: 'LinkSnap',
    subtitle: 'Platform information and documentation.',
    sections: [{ heading: 'Coming Soon', body: 'This page is under construction. Check back soon!' }],
  };

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '60px 24px 100px' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Back link */}
        <Link
          to="/"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)',
            textDecoration: 'none', marginBottom: 28,
          }}
        >
          <AnimatedIcon name="arrow-left" size={14} trigger="hover" />
          Back to Home
        </Link>

        {/* Header */}
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-2xl)',
          fontWeight: 800, marginBottom: 10, letterSpacing: '-0.02em',
          lineHeight: 1.2,
        }}>
          {info.title}
        </h1>
        <p style={{
          fontSize: 'var(--font-size-base)', color: 'var(--text-secondary)',
          marginBottom: 40, lineHeight: 1.65, maxWidth: 640,
        }}>
          {info.subtitle}
        </p>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {info.sections.map((section, i) => (
            <motion.div
              key={i}
              className="card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              style={{ padding: '28px 32px' }}
            >
              <h2 style={{
                fontSize: 'var(--font-size-base)', fontWeight: 700,
                marginBottom: 12, color: 'var(--text-primary)',
              }}>
                {section.heading}
              </h2>

              {section.body && (
                <p style={{
                  fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)',
                  lineHeight: 1.75, whiteSpace: 'pre-line',
                  marginBottom: section.items ? 14 : 0,
                }}>
                  {section.body}
                </p>
              )}

              {section.items && (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {section.items.map((item, j) => (
                    <li key={j} style={{
                      fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)',
                      lineHeight: 1.6, paddingLeft: 4,
                    }}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
