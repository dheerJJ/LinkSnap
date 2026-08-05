import { motion } from 'framer-motion';
import useAuthStore from '../stores/authStore.js';
import SplitText from '../components/SplitText.jsx';
import ShinyText from '../components/ShinyText.jsx';

export default function Dashboard() {
  const { user } = useAuthStore();

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 80px' }}>
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: 32 }}
      >
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-xl)', fontWeight: 700, marginBottom: 4 }}>
          <SplitText text="Welcome back, " delay={0.04} />
          <ShinyText text={user?.username || 'User'} />! 👋
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
          Here is your dashboard overview.
        </p>
      </motion.div>
    </div>
  );
}

