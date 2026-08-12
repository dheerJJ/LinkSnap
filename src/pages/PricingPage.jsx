import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AnimatedIcon from '../components/AnimatedIcon.jsx';
import ThreeDTiltCard from '../components/ThreeDTiltCard.jsx';
import Footer from '../components/Footer.jsx';

const faqs = [
  { q: 'Can I change my plan anytime?', a: 'Yes! You can upgrade, downgrade, or cancel your subscription anytime directly from your settings panel.' },
  { q: 'How does custom domain mapping work?', a: 'Pro and Enterprise plans allow you to connect your custom domains (e.g., yourname.link) with automated Let\'s Encrypt SSL certificates.' },
  { q: 'Are QR codes vector-quality?', a: 'Yes, all generated QR codes can be downloaded in scalable SVG format for high-res printing or PNG format for digital use.' },
  { q: 'Is there a free trial for the Pro plan?', a: 'Yes! All new users get a 14-day free trial of the Pro plan with zero credit card required upfront.' },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Ideal for individuals and side projects getting started.',
      features: ['50 links per month', 'Basic analytics dashboard', 'Vector QR code generation', 'Custom link aliases', 'Community support'],
      cta: 'Get Started Free',
      popular: false,
    },
    {
      name: 'Pro Workspace',
      price: isAnnual ? '$7' : '$9',
      period: '/month',
      description: 'Perfect for creators, startups, and growing teams.',
      features: ['Unlimited short links', 'Real-time advanced analytics', 'Passcode protection & AES-256', 'Custom expiration dates', 'API access & webhooks', '1 Custom branded domain'],
      cta: 'Start 14-Day Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For organizations needing dedicated SLAs and custom integrations.',
      features: ['Everything in Pro Workspace', 'SSO / SAML authentication', 'Dedicated SLA guarantees (99.99%)', 'Custom data retention policies', '24/7 Priority support manager'],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      {/* Header */}
      <section style={{ padding: '80px 24px 40px', maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 'var(--radius-full)', background: 'rgba(194, 91, 62, 0.08)', border: '1px solid rgba(194, 91, 62, 0.2)', marginBottom: 20 }}>
            <AnimatedIcon name="key" size={16} trigger="hover" color="#C25B3E" />
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--accent-color)' }}>
              Transparent Pricing
            </span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: 16 }}>
            Simple Plans for Scale and Performance
          </h1>
          <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)', maxWidth: 580, margin: '0 auto 36px' }}>
            Start for free, upgrade as your link volume and team requirements expand.
          </p>

          {/* Billing Toggle */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'var(--bg-secondary)', padding: '6px 10px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-primary)' }}>
            <button
              onClick={() => setIsAnnual(false)}
              style={{
                padding: '6px 16px', borderRadius: 'var(--radius-full)', fontSize: 'var(--font-size-xs)', fontWeight: 700,
                border: 'none', cursor: 'pointer', background: !isAnnual ? 'var(--bg-primary)' : 'transparent',
                color: !isAnnual ? 'var(--text-primary)' : 'var(--text-tertiary)', boxShadow: !isAnnual ? 'var(--shadow-sm)' : 'none',
              }}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              style={{
                padding: '6px 16px', borderRadius: 'var(--radius-full)', fontSize: 'var(--font-size-xs)', fontWeight: 700,
                border: 'none', cursor: 'pointer', background: isAnnual ? 'var(--accent-gradient)' : 'transparent',
                color: isAnnual ? '#FFFFFF' : 'var(--text-tertiary)', boxShadow: isAnnual ? 'var(--shadow-glow)' : 'none',
                display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              Annual Billing
              <span style={{ fontSize: 10, background: 'rgba(255,255,255,0.25)', padding: '2px 6px', borderRadius: 999 }}>Save 20%</span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="home-section" style={{ padding: '40px 24px 80px', maxWidth: 1080, margin: '0 auto' }}>
        <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {plans.map((plan) => (
            <div key={plan.name} className="pricing-card-wrapper" style={{ position: 'relative' }}>
              <ThreeDTiltCard maxTilt={10} scale={1.02} style={{ height: '100%' }}>
                <div
                  className="card"
                  style={{
                    padding: '36px 32px 32px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    border: plan.popular ? '2px solid #C25B3E' : undefined,
                    boxShadow: plan.popular ? '0 12px 30px rgba(194, 91, 62, 0.2)' : undefined,
                  }}
                >
                  {plan.popular && (
                    <div style={{
                      position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                      padding: '5px 18px', borderRadius: 'var(--radius-full)', background: 'var(--accent-gradient)',
                      fontSize: 'var(--font-size-xs)', fontWeight: 700, color: '#FFFFFF', boxShadow: '0 4px 14px rgba(194, 91, 62, 0.4)',
                    }}>
                      Most Popular
                    </div>
                  )}

                  <div>
                    <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, marginBottom: 6 }}>{plan.name}</h3>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginBottom: 20 }}>{plan.description}</p>

                    <div style={{ marginBottom: 24 }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-3xl)', fontWeight: 800 }}>{plan.price}</span>
                      <span style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)' }}>{plan.period}</span>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {plan.features.map((f) => (
                        <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                          <AnimatedIcon name="check" size={14} trigger="none" color="#0F9D6C" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => navigate('/register')}
                    className={plan.popular ? 'btn btn-primary' : 'btn btn-secondary'}
                    style={{ width: '100%', marginTop: 'auto' }}
                  >
                    {plan.cta}
                  </button>
                </div>
              </ThreeDTiltCard>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section style={{ padding: '40px 24px 80px', maxWidth: 760, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-2xl)', fontWeight: 700, textAlign: 'center', marginBottom: 36 }}>
          Frequently Asked Questions
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {faqs.map((faq, i) => (
            <div key={i} className="card" style={{ padding: 20, cursor: 'pointer' }} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600 }}>{faq.q}</h4>
                <AnimatedIcon name={openFaq === i ? 'close' : 'zap'} size={16} trigger="click" color="var(--accent-color)" />
              </div>
              {openFaq === i && (
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginTop: 12, lineHeight: 1.6 }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
