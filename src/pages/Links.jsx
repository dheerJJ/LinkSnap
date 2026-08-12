import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/index.js';
import useToastStore from '../stores/toastStore.js';
import { useCopyToClipboard } from '../hooks/index.js';
import AnimatedIcon from '../components/AnimatedIcon.jsx';
import SearchFilterBar from '../components/SearchFilterBar.jsx';
import Modal from '../components/Modal.jsx';

export default function Links() {
  const toast = useToastStore();
  const { copy } = useCopyToClipboard();

  const [links, setLinks] = useState([]);
  const [loadingLinks, setLoadingLinks] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrModalUrl, setQrModalUrl] = useState(null);

  // Form states
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [alias, setAlias] = useState('');
  const [password, setPassword] = useState('');
  const [expiry, setExpiry] = useState('');

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

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      toast.error('Please enter a destination URL');
      return;
    }
    try {
      const res = await api.createLink({
        originalUrl: url,
        title: title.trim() || undefined,
        customAlias: alias.trim() || undefined,
        password: password || undefined,
        expirationDate: expiry || undefined,
      });
      setLinks((prev) => [res.data, ...prev]);
      setIsModalOpen(false);
      setUrl('');
      setTitle('');
      setAlias('');
      setPassword('');
      setExpiry('');
      toast.success('Link created successfully!');
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Failed to create link');
    }
  };

  const handleCopy = (shortUrl) => {
    copy(shortUrl);
    toast.success('Short link copied!');
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

  const filtered = links.filter((l) => {
    const matchesFilter = filter === 'all' || l.status === filter;
    const matchesSearch =
      (l.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (l.shortUrl || '').toLowerCase().includes(search.toLowerCase()) ||
      (l.originalUrl || '').toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-2xl)', fontWeight: 800, marginBottom: 4 }}>
            Link Management
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
            Create, search, and manage custom branded links with protection & expiry controls.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
        >
          <AnimatedIcon name="zap" size={18} trigger="hover" />
          Create New Link
        </motion.button>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ padding: 20, marginBottom: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <SearchFilterBar
          activeStatus={filter}
          onFilter={(val) => setFilter(val)}
          onSearch={(val) => setSearch(val)}
        />
        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)', fontWeight: 500 }}>
          {filtered.length} links found
        </span>
      </div>

      {/* Links List Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <AnimatePresence>
          {loadingLinks ? (
            <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>
              Loading links...
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>
              No links found. Create your first branded link using the button above!
            </div>
          ) : (
            filtered.map((link) => (
              <motion.div
                key={link.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="card card-hover"
                style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}
              >
                <div style={{ minWidth: 260, flex: '1 1 300px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {link.title}
                    </h3>
                    <span className={`badge ${link.status === 'active' ? 'badge-active' : 'badge-expired'}`}>
                      ● {link.status}
                    </span>
                    {link.isProtected && (
                      <span className="badge badge-protected">
                        🔒 Protected
                      </span>
                    )}
                  </div>

                  <a
                    href={link.shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mono font-semibold truncate-url"
                    style={{ fontSize: 'var(--font-size-sm)', color: 'var(--accent-color)', textDecoration: 'none', display: 'inline-block', marginBottom: 6 }}
                  >
                    {link.shortUrl}
                  </a>

                  <p className="truncate-url" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)', maxWidth: 460 }}>
                    {link.originalUrl}
                  </p>
                </div>

                {/* Stats & Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span className="mono" style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, display: 'block', color: 'var(--text-primary)' }}>
                      {link.clicks.toLocaleString()}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Total Clicks</span>
                  </div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => setQrModalUrl(link.shortUrl)}
                      className="btn btn-secondary btn-sm"
                      title="View QR Code"
                    >
                      <AnimatedIcon name="qr" size={16} trigger="hover" />
                      QR
                    </button>

                    <button
                      onClick={() => handleCopy(link.shortUrl)}
                      className="btn btn-secondary btn-sm"
                      title="Copy Link"
                    >
                      <AnimatedIcon name="copy" size={16} trigger="click" />
                      Copy
                    </button>

                    <button
                      onClick={() => handleDelete(link.id)}
                      className="btn btn-ghost btn-sm"
                      style={{ color: 'var(--danger-color)' }}
                      title="Delete Link"
                    >
                      <AnimatedIcon name="close" size={16} trigger="hover" color="var(--danger-color)" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Create Link Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Branded Link"
      >
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 10 }}>
          <div>
            <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: 6 }}>
              Destination URL *
            </label>
            <input
              type="url"
              placeholder="https://example.com/long-page-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="input focus-ring"
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: 6 }}>
              Title / Campaign Name
            </label>
            <input
              type="text"
              placeholder="e.g. Summer Promo 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input focus-ring"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: 6 }}>
                Custom Alias
              </label>
              <input
                type="text"
                placeholder="e.g. promo-2026"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                className="input focus-ring"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: 6 }}>
                Expiration Date
              </label>
              <input
                type="date"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="input focus-ring"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: 6 }}>
              Passcode Protection (Optional)
            </label>
            <input
              type="password"
              placeholder="Optional passcode"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input focus-ring"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Link
            </button>
          </div>
        </form>
      </Modal>

      {/* QR Code Modal */}
      {qrModalUrl && (
        <Modal
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
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrModalUrl)}`}
                alt="QR Code"
                style={{ width: 200, height: 200, display: 'block' }}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
