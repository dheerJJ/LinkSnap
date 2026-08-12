import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import ToastContainer from './components/Toast.jsx';

import LogoLoader from './components/LogoLoader.jsx';
import { FullPageSkeleton } from './components/Skeleton.jsx';

import useThemeStore from './stores/themeStore.js';
import { useSmoothScroll } from './hooks/index.js';

// Lazy-loaded route bundles with explicit .jsx extension for IDE resolution
const Home = lazy(() => import('./pages/Home.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const Links = lazy(() => import('./pages/Links.jsx'));
const Analytics = lazy(() => import('./pages/Analytics.jsx'));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage.jsx'));
const PricingPage = lazy(() => import('./pages/PricingPage.jsx'));
const Settings = lazy(() => import('./pages/Settings.jsx'));
const InfoPage = lazy(() => import('./pages/InfoPage.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function FallbackSkeleton() {
  return <FullPageSkeleton />;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%' }}
      >
        <Suspense fallback={<FallbackSkeleton />}>
          <Routes location={location}>
            {/* Primary UI Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/links" element={<Links />} />
            <Route path="/create" element={<Links />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/analytics/:id" element={<Analytics />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/settings" element={<Settings />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Info & Legal Routes */}
            <Route path="/about" element={<InfoPage />} />
            <Route path="/blog" element={<InfoPage />} />
            <Route path="/careers" element={<InfoPage />} />
            <Route path="/contact" element={<InfoPage />} />
            <Route path="/privacy" element={<InfoPage />} />
            <Route path="/terms" element={<InfoPage />} />
            <Route path="/cookies" element={<InfoPage />} />
            <Route path="/security" element={<InfoPage />} />

            {/* 404 Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function MainLayout() {
  const location = useLocation();
  useSmoothScroll();

  const hideNavbarOnPages = ['/login', '/register'];
  const shouldHideNavbar = hideNavbarOnPages.includes(location.pathname);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      {!shouldHideNavbar && <Navbar />}
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <AnimatedRoutes />
      </main>
      <ToastContainer />
    </div>
  );
}

export default function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const { initTheme } = useThemeStore();

  useEffect(() => {
    initTheme();
    const timer = setTimeout(() => setInitialLoading(false), 700);
    return () => clearTimeout(timer);
  }, [initTheme]);

  if (initialLoading) {
    return <LogoLoader text="Initializing LinkSnap..." />;
  }

  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}
