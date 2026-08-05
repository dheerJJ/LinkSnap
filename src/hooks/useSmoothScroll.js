import { useEffect } from 'react';

/**
 * useSmoothScroll — Ultra-smooth inertia momentum wheel scrolling.
 * Provides silky smooth physics-based scrolling while preserving
 * native scroll accessibility and input focus.
 */
export function useSmoothScroll() {
  useEffect(() => {
    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let isRunning = false;

    // Smooth inertia easing factor
    const ease = 0.1;

    const updateScroll = () => {
      const diff = targetY - currentY;
      currentY += diff * ease;
      window.scrollTo(0, currentY);

      if (Math.abs(diff) > 0.4) {
        requestAnimationFrame(updateScroll);
      } else {
        currentY = targetY;
        window.scrollTo(0, currentY);
        isRunning = false;
      }
    };

    const handleWheel = (e) => {
      // Ignore if user is inside a scrollable dropdown, modal, or input field
      const path = e.composedPath ? e.composedPath() : [];
      const isInnerScroll = path.some((el) => {
        if (!el || !el.getAttribute) return false;
        const overflow = window.getComputedStyle(el).overflowY;
        return (overflow === 'auto' || overflow === 'scroll') && el.scrollHeight > el.clientHeight;
      });

      if (isInnerScroll) return;

      e.preventDefault();
      targetY += e.deltaY * 0.9;

      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      targetY = Math.max(0, Math.min(targetY, maxScroll));

      if (!isRunning) {
        isRunning = true;
        requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);
}
