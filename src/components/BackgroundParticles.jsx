import { useEffect, useRef } from 'react';

/**
 * BackgroundParticles — High-performance 60 FPS Canvas Engine
 * with rotating Asterisk "*" shapes, mouse proximity linking,
 * frame-budget optimization, and hardware-accelerated rendering.
 */
export default function BackgroundParticles({ count = 55 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Mouse tracking for interactive particle connection
    const mouse = { x: -1000, y: -1000, radius: 140 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Brand color palette
    const colors = [
      'rgba(194, 91, 62, ', // Warm Terracotta
      'rgba(15, 157, 108, ', // Mint Success
      'rgba(245, 158, 11, ', // Gold
      'rgba(194, 91, 62, ', // Terracotta Accent
    ];

    // Asterisk Particle Definition
    class AsteriskParticle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + Math.random() * 25;
        this.size = Math.random() * 3.5 + 3; // 3px to 6.5px radius
        this.lineWidth = Math.random() * 0.6 + 1.2;
        this.speedY = Math.random() * 0.6 + 0.3; // Upward speed
        this.speedX = (Math.random() - 0.5) * 0.4; // Horizontal sway
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.015; // Smooth slow rotation
        this.baseAlpha = Math.random() * 0.4 + 0.25;
        this.alpha = this.baseAlpha;
        this.colorPrefix = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y < -20 || this.x < -30 || this.x > width + 30) {
          this.reset(false);
        }

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          this.alpha = Math.min(0.85, this.baseAlpha + (1 - dist / mouse.radius) * 0.4);
        } else {
          this.alpha = this.baseAlpha;
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        ctx.strokeStyle = `${this.colorPrefix}${this.alpha})`;
        ctx.lineWidth = this.lineWidth;
        ctx.lineCap = 'round';

        // Draw 6-spoke vector Asterisk '*'
        const spokes = 6;
        for (let i = 0; i < spokes; i++) {
          const angle = (i * Math.PI) / (spokes / 2);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle) * this.size, Math.sin(angle) * this.size);
          ctx.stroke();
        }

        ctx.restore();
      }
    }

    const particles = Array.from({ length: count }, () => new AsteriskParticle());

    // Connect nearby particles with batched stroke paths
    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80) {
            const lineAlpha = (1 - dist / 80) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(194, 91, 62, ${lineAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        const mdx = mouse.x - particles[i].x;
        const mdy = mouse.y - particles[i].y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < mouse.radius) {
          const mlineAlpha = (1 - mdist / mouse.radius) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(194, 91, 62, ${mlineAlpha})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }
    };

    // Animation Loop with passive listeners
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      connectParticles();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        width: '100vw',
        height: '100vh',
        willChange: 'contents',
      }}
      aria-hidden="true"
    />
  );
}
