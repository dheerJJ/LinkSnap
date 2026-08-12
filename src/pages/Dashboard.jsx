import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../services/index.js';
import useAuthStore from '../stores/authStore.js';
import useToastStore from '../stores/toastStore.js';
import { useCopyToClipboard } from '../hooks/index.js';
import SplitText from '../components/SplitText.jsx';
import ShinyText from '../components/ShinyText.jsx';
import DashboardStatCard from '../components/DashboardStatCard.jsx';
import SearchFilterBar from '../components/SearchFilterBar.jsx';
import AnimatedIcon from '../components/AnimatedIcon.jsx';
import QRCodeModal from '../components/Modal.jsx';

export default function Dashboard() {
  const { user } = useAuthStore();
  const toast = useToastStore();
  const { copy } = useCopyToClipboard();

  const [links, setLinks] = useState([]);
  const [loadingLinks, setLoadingLinks] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [qrModalUrl, setQrModalUrl] = useState(null);

  // New Link Shortener state
  const [inputUrl, setInputUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');

  useEffect(() => {
    const fetchLinks = async () => {
      setLoadingLinks(true);
      try {
        const res = await api.getLinks();
        setLinks(res.data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load links');
      } finally {
        setLoadingLinks(false);
      }
    };
    fetchLinks();
  }, [toast]);

  const handleCreateLink = async (e) => {
    e.preventDefault();
    if (!inputUrl.trim()) {
      toast.error('Please enter a URL to shorten');
      return;
    }
    try {
      const res = await api.createLink({
        originalUrl: inputUrl,
        customAlias: customAlias.trim() || undefined,
      });
      setLinks((prev) => [res.data, ...prev]);
      setInputUrl('');
      if (customAlias) setCustomAlias('');
      toast.success('Short link created successfully!');
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Failed to shorten link');
    }
  };

  const handleCopy = (url) => {
    copy(url);
    toast.success('Copied to clipboard!');
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteLink(id);
      setLinks((prev) => prev.filter((l) => l.id !== id));
      toast.success('Link deleted');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete link');
    }
  };

  const totalClicks = useMemo(() => links.reduce((sum, l) => sum + l.clicks, 0), [links]);
  const avgCTR = useMemo(() => {
    return links.length ? ((totalClicks / (links.length * 150)) * 100).toFixed(1) + '%' : '0.0%';
  }, [links, totalClicks]);

  const chartData = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const last7Days = [];
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      last7Days.push({
        day: days[d.getDay()],
        dateStr: d.toDateString(),
        clicks: 0,
      });
    }

    links.forEach((link) => {
      const history = link.visitHistory || [];
      history.forEach((visit) => {
        const visitDateStr = new Date(visit.timestamp).toDateString();
        const dayObj = last7Days.find((item) => item.dateStr === visitDateStr);
        if (dayObj) {
          dayObj.clicks++;
        }
      });
    });

    return last7Days.map(({ day, clicks }) => ({ day, clicks }));
  }, [links]);

  const filteredLinks = links.filter((l) => {
    const matchesFilter = filter === 'all' || l.status === filter;
    const matchesSearch =
      (l.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (l.shortUrl || '').toLowerCase().includes(search.toLowerCase()) ||
      (l.originalUrl || '').toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: 36 }}
      >
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 8 }}>
          <SplitText text="Welcome back, " delay={0.04} />
          <ShinyText text={user?.username || 'Creator'} />! 👋
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-base)', maxWidth: 600 }}>
          Manage your shortened URLs, track performance, and generate vector QR codes.
        </p>
      </motion.div>

      {/* Quick Shortener Input Box */}
      <motion.form
        onSubmit={handleCreateLink}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card"
        style={{ padding: '20px 24px', marginBottom: 40, border: '1px solid var(--border-accent)' }}
      >
        <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          <AnimatedIcon name="zap" size={18} trigger="hover" color="var(--accent-color)" />
          Quick Shorten Link
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <input
            type="url"
            placeholder="Paste your long URL here..."
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="input focus-ring"
            style={{ flex: '2 1 260px' }}
          />
          <input
            type="text"
            placeholder="Custom alias (optional)"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
            className="input focus-ring"
            style={{ flex: '1 1 160px' }}
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="btn btn-primary"
            style={{ flex: '0 0 auto', minWidth: 140 }}
          >
            <AnimatedIcon name="link" size={16} trigger="hover" />
            Shorten
          </motion.button>
        </div>
      </motion.form>

      {/* 4 Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 40 }}>
        <DashboardStatCard title="Total Links" value={links.length} icon="link" trend={12} trendLabel="vs last month" color="#C25B3E" delay={0.1} />
        <DashboardStatCard title="Total Clicks" value={totalClicks} icon="chart" trend={28} trendLabel="vs last month" color="#0F9D6C" delay={0.15} />
        <DashboardStatCard title="Active Links" value={links.filter(l => l.status === 'active').length} icon="shield" trend={5} trendLabel="active" color="#3B82F6" delay={0.2} />
        <DashboardStatCard title="Avg. CTR" value={avgCTR} icon="zap" trend={8.4} trendLabel="conversion" color="#F59E0B" delay={0.25} />
      </div>

      {/* Analytics Preview Chart */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="card"
        style={{ padding: 28, marginBottom: 40 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-lg)', fontWeight: 700 }}>Click Analytics</h3>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>Traffic across all active short links (last 7 days)</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--font-size-xs)', color: 'var(--success-color)', fontWeight: 600, background: 'rgba(15, 157, 108, 0.1)', padding: '6px 12px', borderRadius: 'var(--radius-full)' }}>
            <AnimatedIcon name="chart" size={14} trigger="none" color="#0F9D6C" />
            +34.8% Click Growth
          </div>
        </div>

        <div style={{ width: '100%', height: 240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="clickGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C25B3E" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#C25B3E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="var(--text-tertiary)" fontSize={12} tickLine={false} />
              <YAxis stroke="var(--text-tertiary)" fontSize={12} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="clicks" stroke="#C25B3E" strokeWidth={3} fillOpacity={1} fill="url(#clickGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Links List Section */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="card"
        style={{ padding: 28 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-lg)', fontWeight: 700 }}>Your Short Links</h3>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>Showing {filteredLinks.length} of {links.length} total links</p>
          </div>
          <SearchFilterBar
            activeStatus={filter}
            onFilter={(status) => setFilter(status)}
            onSearch={(query) => setSearch(query)}
          />
        </div>

        {/* Links Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <AnimatePresence>
            {loadingLinks ? (
              <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>
                Loading links...
              </div>
            ) : filteredLinks.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>
                No links found. Shorten your first link above!
              </div>
            ) : (
              filteredLinks.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  style={{
                    padding: 18,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ minWidth: 220, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {item.title}
                      </h4>
                      <span className={`badge ${item.status === 'active' ? 'badge-active' : 'badge-expired'}`}>
                        ● {item.status}
                      </span>
                    </div>
                    <a
                      href={item.shortUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mono font-semibold truncate-url"
                      style={{ fontSize: 'var(--font-size-sm)', color: 'var(--accent-color)', textDecoration: 'none', display: 'block', marginBottom: 4 }}
                    >
                      {item.shortUrl}
                    </a>
                    <p className="truncate-url" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)', maxWidth: 400 }}>
                      {item.originalUrl}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ textAlign: 'right' }}>
                      <span className="mono" style={{ fontSize: 'var(--font-size-base)', fontWeight: 800, display: 'block' }}>
                        {item.clicks.toLocaleString()}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Total Clicks</span>
                    </div>

                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => setQrModalUrl(item.shortUrl)}
                        className="btn btn-secondary btn-sm"
                        title="View QR Code"
                      >
                        <AnimatedIcon name="qr" size={14} trigger="hover" />
                      </button>
                      <button
                        onClick={() => handleCopy(item.shortUrl)}
                        className="btn btn-secondary btn-sm"
                        title="Copy Short URL"
                      >
                        <AnimatedIcon name="copy" size={14} trigger="click" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="btn btn-ghost btn-sm"
                        style={{ color: 'var(--danger-color)' }}
                        title="Delete Link"
                      >
                        <AnimatedIcon name="close" size={14} trigger="hover" color="var(--danger-color)" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* QR Modal */}
      {qrModalUrl && (
        <QRCodeModal
          isOpen={Boolean(qrModalUrl)}
          onClose={() => setQrModalUrl(null)}
          title="Vector QR Code"
        >
          <div style={{ textAlign: 'center', padding: 20 }}>
            <p className="mono" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--accent-color)', marginBottom: 16 }}>
              {qrModalUrl}
            </p>
            <div style={{ padding: 20, background: '#FFFFFF', borderRadius: 16, display: 'inline-block', border: '1px solid var(--border-primary)' }}>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrModalUrl)}`}
                alt="QR Code"
                style={{ width: 180, height: 180, display: 'block' }}
              />
            </div>
          </div>
        </QRCodeModal>
      )}
    </div>
  );
}
