import { useState, useRef, useCallback } from 'react';

/**
 * ThreeDTiltCard — Ultra-smooth 60 FPS 3D mouse perspective tilt
 * with requestAnimationFrame debouncing and specular lighting reflection.
 */
export default function ThreeDTiltCard({
  children,
  className = '',
  style = {},
  maxTilt = 12,
  scale = 1.02,
  ...rest
}) {
  const cardRef = useRef(null);
  const rafId = useRef(null);
  const [transformStyle, setTransformStyle] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, x: 50, y: 50 });

  const handleMouseMove = useCallback((e) => {
    if (rafId.current) cancelAnimationFrame(rafId.current);

    const clientX = e.clientX;
    const clientY = e.clientY;

    rafId.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      const mouseX = clientX - rect.left;
      const mouseY = clientY - rect.top;

      const rotateY = ((mouseX / width) - 0.5) * maxTilt * 2;
      const rotateX = -((mouseY / height) - 0.5) * maxTilt * 2;

      const glareX = (mouseX / width) * 100;
      const glareY = (mouseY / height) * 100;

      setTransformStyle(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, 1)`);
      setGlareStyle({ opacity: 0.28, x: glareX, y: glareY });
    });
  }, [maxTilt, scale]);

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlareStyle({ opacity: 0, x: 50, y: 50 });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilt-3d-card preserve-3d relative ${className}`}
      style={{
        transform: transformStyle,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
        position: 'relative',
        overflow: style.overflow || 'visible',
        borderRadius: style.borderRadius || 'var(--radius-lg)',
        backfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'subpixel-antialiased',
        ...style,
      }}
      {...rest}
    >
      {/* Dynamic Specular Light Reflection Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 10,
          background: `radial-gradient(circle at ${glareStyle.x}% ${glareStyle.y}%, rgba(255, 255, 255, 0.38) 0%, rgba(255, 255, 255, 0) 65%)`,
          opacity: glareStyle.opacity,
          transition: 'opacity 0.25s ease',
          borderRadius: 'inherit',
        }}
      />
      <div style={{ transform: 'translateZ(12px)', transformStyle: 'preserve-3d', height: '100%', position: 'relative' }}>
        {children}
      </div>
    </div>
  );
}
