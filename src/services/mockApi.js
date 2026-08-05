/**
 * Mock API service — mirrors the real API contract exactly.
 * Uses setTimeout to simulate network latency.
 * Swap to real API by setting VITE_USE_MOCK=false.
 */

const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

// ── Mock data store (in-memory) ──
let mockUsers = [
  {
    id: 'usr_1',
    username: 'demo',
    email: 'demo@linksnap.io',
    password: 'Demo1234!',
    createdAt: '2026-06-15T10:00:00Z',
  },
];

let mockToken = 'mock_jwt_token_abc123';

let linkIdCounter = 6;
let mockLinks = [
  {
    id: 'lnk_1',
    originalUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
    shortCode: 'mdn-js',
    shortUrl: 'http://localhost:5000/mdn-js',
    customAlias: 'mdn-js',
    passwordProtected: false,
    expirationDate: '2027-01-01T00:00:00Z',
    clicks: 1247,
    status: 'active',
    createdAt: '2026-07-01T08:30:00Z',
    userId: 'usr_1',
  },
  {
    id: 'lnk_2',
    originalUrl: 'https://react.dev/learn/thinking-in-react',
    shortCode: 'react-think',
    shortUrl: 'http://localhost:5000/react-think',
    customAlias: 'react-think',
    passwordProtected: false,
    expirationDate: null,
    clicks: 893,
    status: 'active',
    createdAt: '2026-07-05T14:20:00Z',
    userId: 'usr_1',
  },
  {
    id: 'lnk_3',
    originalUrl: 'https://tailwindcss.com/docs/installation',
    shortCode: 'tw-docs',
    shortUrl: 'http://localhost:5000/tw-docs',
    customAlias: 'tw-docs',
    passwordProtected: false,
    expirationDate: '2026-06-01T00:00:00Z',
    clicks: 456,
    status: 'expired',
    createdAt: '2026-05-10T11:15:00Z',
    userId: 'usr_1',
  },
  {
    id: 'lnk_4',
    originalUrl: 'https://www.figma.com/design/abc123/my-design',
    shortCode: 'figma-proj',
    shortUrl: 'http://localhost:5000/figma-proj',
    customAlias: 'figma-proj',
    passwordProtected: true,
    expirationDate: null,
    clicks: 78,
    status: 'active',
    createdAt: '2026-07-20T09:00:00Z',
    userId: 'usr_1',
  },
  {
    id: 'lnk_5',
    originalUrl: 'https://github.com/vercel/next.js/releases/tag/v15.0.0',
    shortCode: 'next15',
    shortUrl: 'http://localhost:5000/next15',
    customAlias: 'next15',
    passwordProtected: false,
    expirationDate: '2027-06-01T00:00:00Z',
    clicks: 2341,
    status: 'active',
    createdAt: '2026-07-25T16:45:00Z',
    userId: 'usr_1',
  },
];

// Generate realistic analytics data
function generateAnalytics(_linkId) {
  const days = 30;
  const clicksPerDay = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    clicksPerDay.push({
      date: date.toISOString().split('T')[0],
      clicks: Math.floor(Math.random() * 80) + 5,
    });
  }

  return {
    clicksPerDay,
    byCountry: [
      { country: 'United States', clicks: 423 },
      { country: 'United Kingdom', clicks: 189 },
      { country: 'Germany', clicks: 156 },
      { country: 'India', clicks: 134 },
      { country: 'Canada', clicks: 98 },
      { country: 'Japan', clicks: 67 },
    ],
    byBrowser: [
      { browser: 'Chrome', clicks: 521 },
      { browser: 'Safari', clicks: 234 },
      { browser: 'Firefox', clicks: 167 },
      { browser: 'Edge', clicks: 89 },
      { browser: 'Other', clicks: 56 },
    ],
    byOS: [
      { os: 'Windows', clicks: 389 },
      { os: 'macOS', clicks: 312 },
      { os: 'iOS', clicks: 178 },
      { os: 'Android', clicks: 134 },
      { os: 'Linux', clicks: 54 },
    ],
    byReferrer: [
      { referrer: 'Direct', clicks: 345 },
      { referrer: 'Twitter/X', clicks: 234 },
      { referrer: 'Google', clicks: 189 },
      { referrer: 'GitHub', clicks: 123 },
      { referrer: 'Reddit', clicks: 78 },
    ],
    recentClicks: [
      { device: 'Desktop — Chrome', location: 'San Francisco, US', referrer: 'Twitter/X', timestamp: '2026-08-02T18:30:00Z' },
      { device: 'Mobile — Safari', location: 'London, UK', referrer: 'Direct', timestamp: '2026-08-02T18:25:00Z' },
      { device: 'Desktop — Firefox', location: 'Berlin, DE', referrer: 'Google', timestamp: '2026-08-02T18:20:00Z' },
      { device: 'Tablet — Chrome', location: 'Mumbai, IN', referrer: 'Reddit', timestamp: '2026-08-02T18:15:00Z' },
      { device: 'Desktop — Edge', location: 'Toronto, CA', referrer: 'GitHub', timestamp: '2026-08-02T18:10:00Z' },
      { device: 'Mobile — Chrome', location: 'Tokyo, JP', referrer: 'Direct', timestamp: '2026-08-02T18:05:00Z' },
      { device: 'Desktop — Safari', location: 'Sydney, AU', referrer: 'Twitter/X', timestamp: '2026-08-02T18:00:00Z' },
      { device: 'Desktop — Chrome', location: 'Paris, FR', referrer: 'Google', timestamp: '2026-08-02T17:55:00Z' },
    ],
  };
}

/** Wraps response in the same { data } shape Axios uses */
const res = (data, status = 200) => ({ data, status, headers: {} });

const mockApi = {
  // ── Auth ──
  register: async ({ username, email, password }) => {
    await delay(800);
    const exists = mockUsers.find((u) => u.email === email);
    if (exists) throw { response: { status: 409, data: { message: 'Email already registered' } } };
    const user = {
      id: `usr_${mockUsers.length + 1}`,
      username,
      email,
      password,
      createdAt: new Date().toISOString(),
    };
    mockUsers.push(user);
    const { password: _, ...safeUser } = user;
    return res({ token: mockToken, user: safeUser });
  },

  login: async ({ email, password }) => {
    await delay(600);
    const user = mockUsers.find((u) => u.email === email && u.password === password);
    if (!user) throw { response: { status: 401, data: { message: 'Invalid credentials' } } };
    const { password: _, ...safeUser } = user;
    return res({ token: mockToken, user: safeUser });
  },

  getProfile: async () => {
    await delay(300);
    const { password: _, ...safeUser } = mockUsers[0];
    return res({ user: safeUser });
  },

  // ── URLs ──
  createLink: async ({ originalUrl, customAlias, password, expirationDate }) => {
    await delay(900);
    const shortCode = customAlias || Math.random().toString(36).substring(2, 8);
    if (customAlias && mockLinks.find((l) => l.shortCode === customAlias)) {
      throw { response: { status: 409, data: { message: 'Alias already taken' } } };
    }
    const link = {
      id: `lnk_${++linkIdCounter}`,
      originalUrl,
      shortCode,
      shortUrl: `http://localhost:5000/${shortCode}`,
      customAlias: customAlias || null,
      passwordProtected: !!password,
      expirationDate: expirationDate || null,
      clicks: 0,
      status: 'active',
      createdAt: new Date().toISOString(),
      userId: 'usr_1',
    };
    mockLinks.unshift(link);
    return res(link);
  },

  getLinks: async (params = {}) => {
    await delay(500);
    let links = [...mockLinks.filter((l) => l.userId === 'usr_1')];
    if (params?.search) {
      const q = params.search.toLowerCase();
      links = links.filter(
        (l) =>
          l.originalUrl.toLowerCase().includes(q) ||
          l.shortCode.toLowerCase().includes(q)
      );
    }
    if (params?.status) {
      links = links.filter((l) => l.status === params.status);
    }
    if (params?.sort === 'clicks') {
      links.sort((a, b) => b.clicks - a.clicks);
    } else if (params?.sort === 'date') {
      links.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return res(links);
  },

  getLink: async (id) => {
    await delay(300);
    const link = mockLinks.find((l) => l.id === id);
    if (!link) throw { response: { status: 404, data: { message: 'Link not found' } } };
    return res(link);
  },

  updateLink: async (id, data) => {
    await delay(600);
    const idx = mockLinks.findIndex((l) => l.id === id);
    if (idx === -1) throw { response: { status: 404, data: { message: 'Link not found' } } };
    mockLinks[idx] = { ...mockLinks[idx], ...data };
    return res(mockLinks[idx]);
  },

  deleteLink: async (id) => {
    await delay(500);
    const idx = mockLinks.findIndex((l) => l.id === id);
    if (idx === -1) throw { response: { status: 404, data: { message: 'Link not found' } } };
    mockLinks.splice(idx, 1);
    return res({ message: 'Link deleted' });
  },

  checkAlias: async (alias) => {
    await delay(400);
    const taken = mockLinks.some((l) => l.shortCode === alias);
    return res({ available: !taken });
  },

  // ── Analytics ──
  getAnalytics: async (id) => {
    await delay(700);
    const link = mockLinks.find((l) => l.id === id);
    if (!link) throw { response: { status: 404, data: { message: 'Link not found' } } };
    return res(generateAnalytics(id));
  },

  // ── Short code resolve ──
  resolveShortCode: async (shortCode) => {
    await delay(300);
    const link = mockLinks.find((l) => l.shortCode === shortCode);
    if (!link) throw { response: { status: 404, data: { message: 'Link not found' } } };
    if (link.status === 'expired') {
      return res({ status: 'expired', message: 'This link has expired' });
    }
    if (link.passwordProtected) {
      return res({ status: 'password_required', message: 'This link is password protected' });
    }
    return res({ status: 'redirect', url: link.originalUrl });
  },
};

export default mockApi;
