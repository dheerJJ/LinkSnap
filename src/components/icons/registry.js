/**
 * Animated Icon Registry
 *
 * Each icon defines:
 * - paths[]      — SVG <path> elements with motion variants
 * - circles[]    — SVG <circle> elements (optional)
 * - rects[]      — SVG <rect> elements (optional)
 * - lines[]      — SVG <line> elements (optional)
 * - polylines[]  — SVG <polyline> elements (optional)
 * - container    — variants applied to the wrapper div
 * - viewBox      — SVG viewBox (default: '0 0 24 24')
 * - label        — accessible label
 *
 * Variants must have `idle` and `animated` keys.
 */

const springBounce = { type: 'spring', stiffness: 500, damping: 15 };

export const iconRegistry = {
  // ── Link / Chain — "snaps" together on animate ──
  link: {
    label: 'Link',
    paths: [
      {
        d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71',
        variants: {
          idle: { x: 0, y: 0 },
          animated: { x: 1, y: -1 },
        },
        transition: springBounce,
      },
      {
        d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
        variants: {
          idle: { x: 0, y: 0 },
          animated: { x: -1, y: 1 },
        },
        transition: springBounce,
      },
    ],
    container: {
      idle: { rotate: 0 },
      animated: { rotate: [0, -5, 5, 0], transition: springBounce },
    },
  },

  // ── Copy → Checkmark morph ──
  copy: {
    label: 'Copy',
    rects: [
      {
        x: 9, y: 9, width: 13, height: 13, rx: 2,
        variants: {
          idle: { opacity: 1 },
          animated: { opacity: 0, scale: 0.8 },
        },
        transition: { duration: 0.2 },
      },
    ],
    paths: [
      {
        d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1',
        variants: {
          idle: { opacity: 1 },
          animated: { opacity: 0 },
        },
        transition: { duration: 0.15 },
      },
      {
        d: 'M5 13l4 4L20 6',
        variants: {
          idle: { pathLength: 0, opacity: 0 },
          animated: { pathLength: 1, opacity: 1 },
        },
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
      },
    ],
  },

  // ── Check ──
  check: {
    label: 'Check',
    paths: [
      {
        d: 'M5 13l4 4L20 6',
        variants: {
          idle: { pathLength: 0 },
          animated: { pathLength: 1 },
        },
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      },
    ],
  },

  // ── Edit (pencil) ──
  edit: {
    label: 'Edit',
    paths: [
      {
        d: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7',
        variants: { idle: {}, animated: {} },
      },
      {
        d: 'M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z',
        variants: {
          idle: { rotate: 0 },
          animated: { rotate: [-3, 3, -2, 1, 0] },
        },
        transition: { duration: 0.5, ease: 'easeInOut' },
      },
    ],
    container: {
      idle: {},
      animated: { y: [0, -2, 0], transition: { duration: 0.3 } },
    },
  },

  // ── Delete (trash) — shakes before confirming ──
  delete: {
    label: 'Delete',
    paths: [
      { d: 'M3 6h18', variants: { idle: {}, animated: {} } },
      {
        d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6',
        variants: { idle: {}, animated: {} },
      },
      { d: 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2', variants: { idle: {}, animated: {} } },
    ],
    lines: [
      {
        x1: 10, y1: 11, x2: 10, y2: 17,
        variants: { idle: { opacity: 1 }, animated: { opacity: [1, 0.5, 1] } },
        transition: { duration: 0.3, delay: 0.1 },
      },
      {
        x1: 14, y1: 11, x2: 14, y2: 17,
        variants: { idle: { opacity: 1 }, animated: { opacity: [1, 0.5, 1] } },
        transition: { duration: 0.3, delay: 0.2 },
      },
    ],
    container: {
      idle: { rotate: 0 },
      animated: {
        rotate: [0, -8, 8, -5, 5, 0],
        transition: { duration: 0.5, ease: 'easeInOut' },
      },
    },
  },

  // ── QR Code — pulses on hover ──
  qr: {
    label: 'QR Code',
    rects: [
      { x: 2, y: 2, width: 8, height: 8, rx: 1, variants: { idle: { scale: 1 }, animated: { scale: [1, 1.05, 1] } }, transition: { duration: 0.4, delay: 0 } },
      { x: 14, y: 2, width: 8, height: 8, rx: 1, variants: { idle: { scale: 1 }, animated: { scale: [1, 1.05, 1] } }, transition: { duration: 0.4, delay: 0.1 } },
      { x: 2, y: 14, width: 8, height: 8, rx: 1, variants: { idle: { scale: 1 }, animated: { scale: [1, 1.05, 1] } }, transition: { duration: 0.4, delay: 0.2 } },
    ],
    paths: [
      {
        d: 'M14 14h2v2h-2zM20 14h2v2h-2zM14 20h2v2h-2zM20 20h2v2h-2zM17 17h2v2h-2z',
        fill: true,
        variants: {
          idle: { opacity: 0.7 },
          animated: { opacity: [0.7, 1, 0.7] },
        },
        transition: { duration: 0.6, delay: 0.1 },
      },
    ],
    container: {
      animated: { scale: [1, 1.05, 1], transition: { duration: 0.4 } },
    },
  },

  // ── Analytics / Chart (bar chart) — bars stagger up smoothly ──
  analytics: {
    label: 'Analytics',
    paths: [
      { d: 'M18 20V10', variants: { idle: { pathLength: 1 }, animated: { pathLength: [0.3, 1] } }, transition: { duration: 0.4, delay: 0 }, strokeWidth: 2 },
      { d: 'M12 20V4', variants: { idle: { pathLength: 1 }, animated: { pathLength: [0.3, 1] } }, transition: { duration: 0.4, delay: 0.1 }, strokeWidth: 2 },
      { d: 'M6 20v-6', variants: { idle: { pathLength: 1 }, animated: { pathLength: [0.3, 1] } }, transition: { duration: 0.4, delay: 0.2 }, strokeWidth: 2 },
    ],
  },
  chart: {
    label: 'Analytics',
    paths: [
      { d: 'M18 20V10', variants: { idle: { pathLength: 1 }, animated: { pathLength: [0.3, 1] } }, transition: { duration: 0.4, delay: 0 }, strokeWidth: 2 },
      { d: 'M12 20V4', variants: { idle: { pathLength: 1 }, animated: { pathLength: [0.3, 1] } }, transition: { duration: 0.4, delay: 0.1 }, strokeWidth: 2 },
      { d: 'M6 20v-6', variants: { idle: { pathLength: 1 }, animated: { pathLength: [0.3, 1] } }, transition: { duration: 0.4, delay: 0.2 }, strokeWidth: 2 },
    ],
  },

  // ── Lock ──
  lock: {
    label: 'Lock',
    rects: [
      {
        x: 3, y: 11, width: 18, height: 11, rx: 2,
        variants: { idle: {}, animated: {} },
      },
    ],
    paths: [
      {
        d: 'M7 11V7a5 5 0 0 1 10 0v4',
        variants: {
          idle: { y: 0 },
          animated: { y: [0, -3, 0] },
        },
        transition: springBounce,
      },
    ],
  },

  // ── Expired (clock with X) ──
  expired: {
    label: 'Expired',
    circles: [
      {
        cx: 12, cy: 12, r: 10,
        variants: {
          idle: { rotate: 0 },
          animated: { rotate: [0, 5, -5, 0] },
        },
        transition: { duration: 0.5 },
      },
    ],
    paths: [
      { d: 'M12 6v6l-3 3', variants: { idle: {}, animated: {} } },
      {
        d: 'M9 17l6-6M15 17l-6-6',
        variants: {
          idle: { opacity: 0, scale: 0 },
          animated: { opacity: 1, scale: 1 },
        },
        transition: { duration: 0.3, delay: 0.2 },
      },
    ],
  },

  // ── Sun ──
  sun: {
    label: 'Sun',
    circles: [
      {
        cx: 12, cy: 12, r: 5,
        variants: {
          idle: { scale: 1 },
          animated: { scale: [1, 1.1, 1] },
        },
        transition: { duration: 0.4 },
      },
    ],
    paths: [
      {
        d: 'M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42',
        variants: {
          idle: { rotate: 0 },
          animated: { rotate: 45 },
        },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      },
    ],
  },

  // ── Moon ──
  moon: {
    label: 'Moon',
    paths: [
      {
        d: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z',
        variants: {
          idle: { rotate: 0 },
          animated: { rotate: [0, -15, 0] },
        },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      },
    ],
  },

  // ── Search ──
  search: {
    label: 'Search',
    circles: [
      {
        cx: 11, cy: 11, r: 8,
        variants: {
          idle: { scale: 1 },
          animated: { scale: [1, 1.05, 1] },
        },
        transition: { duration: 0.3 },
      },
    ],
    lines: [
      {
        x1: 21, y1: 21, x2: 16.65, y2: 16.65,
        variants: {
          idle: { x: 0, y: 0 },
          animated: { x: [0, 2, 0], y: [0, 2, 0] },
        },
        transition: { duration: 0.3 },
      },
    ],
  },

  // ── Plus ──
  plus: {
    label: 'Add',
    paths: [
      {
        d: 'M12 5v14M5 12h14',
        variants: {
          idle: { rotate: 0 },
          animated: { rotate: 90 },
        },
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      },
    ],
  },

  // ── Close (X) ──
  close: {
    label: 'Close',
    paths: [
      {
        d: 'M18 6L6 18M6 6l12 12',
        variants: {
          idle: { rotate: 0 },
          animated: { rotate: 90 },
        },
        transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
      },
    ],
  },

  // ── Home ──
  home: {
    label: 'Home',
    paths: [
      {
        d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1',
        variants: {
          idle: { y: 0 },
          animated: { y: [0, -2, 0] },
        },
        transition: springBounce,
      },
    ],
  },

  // ── Settings (gear) ──
  settings: {
    label: 'Settings',
    paths: [
      {
        d: 'M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z',
        variants: {
          idle: { rotate: 0 },
          animated: { rotate: 90 },
        },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      },
    ],
    circles: [
      {
        cx: 12, cy: 12, r: 3,
        variants: { idle: {}, animated: {} },
      },
    ],
  },

  // ── User ──
  user: {
    label: 'User',
    paths: [
      {
        d: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2',
        variants: { idle: {}, animated: {} },
      },
    ],
    circles: [
      {
        cx: 12, cy: 7, r: 4,
        variants: {
          idle: { scale: 1 },
          animated: { scale: [1, 1.1, 1] },
        },
        transition: { duration: 0.3 },
      },
    ],
  },

  // ── Logout ──
  logout: {
    label: 'Logout',
    paths: [
      { d: 'M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4', variants: { idle: {}, animated: {} } },
      {
        d: 'M16 17l5-5-5-5M21 12H9',
        variants: {
          idle: { x: 0 },
          animated: { x: [0, 3, 0] },
        },
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      },
    ],
  },

  // ── External Link ──
  'external-link': {
    label: 'External Link',
    paths: [
      { d: 'M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6', variants: { idle: {}, animated: {} } },
      {
        d: 'M15 3h6v6M10 14L21 3',
        variants: {
          idle: { x: 0, y: 0 },
          animated: { x: [0, 2, 0], y: [0, -2, 0] },
        },
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      },
    ],
  },

  // ── Download ──
  download: {
    label: 'Download',
    paths: [
      { d: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4', variants: { idle: {}, animated: {} } },
      {
        d: 'M7 10l5 5 5-5M12 15V3',
        variants: {
          idle: { y: 0 },
          animated: { y: [0, 3, 0] },
        },
        transition: springBounce,
      },
    ],
  },

  // ── Share ──
  share: {
    label: 'Share',
    circles: [
      { cx: 18, cy: 5, r: 3, variants: { idle: { scale: 1 }, animated: { scale: [1, 1.15, 1] } }, transition: { duration: 0.3, delay: 0 } },
      { cx: 6, cy: 12, r: 3, variants: { idle: { scale: 1 }, animated: { scale: [1, 1.15, 1] } }, transition: { duration: 0.3, delay: 0.1 } },
      { cx: 18, cy: 19, r: 3, variants: { idle: { scale: 1 }, animated: { scale: [1, 1.15, 1] } }, transition: { duration: 0.3, delay: 0.2 } },
    ],
    lines: [
      { x1: 8.59, y1: 13.51, x2: 15.42, y2: 17.49, variants: { idle: {}, animated: {} } },
      { x1: 15.41, y1: 6.51, x2: 8.59, y2: 10.49, variants: { idle: {}, animated: {} } },
    ],
  },

  // ── Arrow Right ──
  'arrow-right': {
    label: 'Arrow Right',
    paths: [
      {
        d: 'M5 12h14M12 5l7 7-7 7',
        variants: {
          idle: { x: 0 },
          animated: { x: [0, 4, 0] },
        },
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      },
    ],
  },

  // ── Arrow Left ──
  'arrow-left': {
    label: 'Arrow Left',
    paths: [
      {
        d: 'M19 12H5M12 19l-7-7 7-7',
        variants: {
          idle: { x: 0 },
          animated: { x: [0, -4, 0] },
        },
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      },
    ],
  },

  // ── Menu (hamburger) ──
  menu: {
    label: 'Menu',
    paths: [
      {
        d: 'M3 12h18M3 6h18M3 18h18',
        variants: {
          idle: { x: 0 },
          animated: { x: [0, 2, 0] },
        },
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      },
    ],
  },

  // ── Shield / Protected ──
  shield: {
    label: 'Protected',
    paths: [
      {
        d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
        variants: {
          idle: { scale: 1 },
          animated: { scale: [1, 1.05, 1] },
        },
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      },
    ],
  },

  // ── Globe ──
  globe: {
    label: 'Globe',
    circles: [
      {
        cx: 12, cy: 12, r: 10,
        variants: {
          idle: { rotate: 0 },
          animated: { rotate: 360 },
        },
        transition: { duration: 2, ease: 'linear', repeat: Infinity },
      },
    ],
    paths: [
      { d: 'M2 12h20', variants: { idle: {}, animated: {} } },
      {
        d: 'M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z',
        variants: { idle: {}, animated: {} },
      },
    ],
  },

  // ── Zap / Lightning ──
  zap: {
    label: 'Zap',
    paths: [
      {
        d: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
        variants: {
          idle: { scale: 1, opacity: 1 },
          animated: { scale: [1, 1.1, 1], opacity: [1, 0.8, 1] },
        },
        transition: { duration: 0.3 },
      },
    ],
  },

  // ── Clock ──
  clock: {
    label: 'Clock',
    circles: [
      { cx: 12, cy: 12, r: 10, variants: { idle: {}, animated: {} } },
    ],
    paths: [
      {
        d: 'M12 6v6l4 2',
        variants: {
          idle: { rotate: 0 },
          animated: { rotate: [0, 10, 0] },
        },
        transition: { duration: 0.5 },
      },
    ],
  },

  // ── Trending Up ──
  'trending-up': {
    label: 'Trending Up',
    paths: [
      {
        d: 'M23 6l-9.5 9.5-5-5L1 18',
        variants: {
          idle: { pathLength: 1 },
          animated: { pathLength: [0, 1] },
        },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      },
    ],
    polylines: [
      {
        points: '17 6 23 6 23 12',
        variants: {
          idle: { opacity: 1 },
          animated: { opacity: [0, 1] },
        },
        transition: { duration: 0.3, delay: 0.3 },
      },
    ],
  },

  // ── Eye ──
  eye: {
    label: 'View',
    paths: [
      {
        d: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z',
        variants: { idle: {}, animated: {} },
      },
    ],
    circles: [
      {
        cx: 12, cy: 12, r: 3,
        variants: {
          idle: { scale: 1 },
          animated: { scale: [1, 1.3, 1] },
        },
        transition: { duration: 0.3 },
      },
    ],
  },

  // ── Loader (spinning) ──
  loader: {
    label: 'Loading',
    paths: [
      {
        d: 'M21 12a9 9 0 11-6.219-8.56',
        variants: { idle: {}, animated: {} },
      },
    ],
  },

  // ── Calendar ──
  calendar: {
    label: 'Calendar',
    rects: [
      {
        x: 3, y: 4, width: 18, height: 18, rx: 2,
        variants: { idle: {}, animated: {} },
      },
    ],
    lines: [
      { x1: 16, y1: 2, x2: 16, y2: 6, variants: { idle: {}, animated: {} } },
      { x1: 8, y1: 2, x2: 8, y2: 6, variants: { idle: {}, animated: {} } },
      { x1: 3, y1: 10, x2: 21, y2: 10, variants: { idle: {}, animated: {} } },
    ],
    container: {
      idle: {},
      animated: { y: [0, -2, 0], transition: { duration: 0.3 } },
    },
  },

  // ── Key ──
  key: {
    label: 'Key',
    paths: [
      {
        d: 'M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4',
        variants: {
          idle: { rotate: 0 },
          animated: { rotate: [0, -10, 0] },
        },
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      },
    ],
  },

  // ── Chevron Down ──
  'chevron-down': {
    label: 'Expand',
    paths: [
      {
        d: 'M6 9l6 6 6-6',
        variants: {
          idle: { y: 0 },
          animated: { y: [0, 2, 0] },
        },
        transition: { duration: 0.3 },
      },
    ],
  },

  // ── Image ──
  image: {
    label: 'Image',
    rects: [
      { x: 3, y: 3, width: 18, height: 18, rx: 2, variants: { idle: {}, animated: {} } },
    ],
    circles: [
      { cx: 8.5, cy: 8.5, r: 1.5, variants: { idle: {}, animated: {} } },
    ],
    polylines: [
      {
        points: '21 15 16 10 5 21',
        variants: {
          idle: { pathLength: 1 },
          animated: { pathLength: [0, 1] },
        },
        transition: { duration: 0.5 },
      },
    ],
  },

  // ── Sparkle / Magic ──
  sparkle: {
    label: 'Magic',
    paths: [
      {
        d: 'M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z',
        variants: {
          idle: { scale: 1, rotate: 0 },
          animated: { scale: [1, 1.15, 1], rotate: [0, 15, 0] },
        },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      },
    ],
  },
};
