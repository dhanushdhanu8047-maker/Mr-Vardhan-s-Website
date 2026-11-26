import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  alphaDir: number;
  life?: number;
  maxLife?: number;
}

interface GoldenParticlesProps {
  burstKey: number;
}

export function GoldenParticles({ burstKey }: GoldenParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const burstParticlesRef = useRef<Particle[]>([]);

  // Trigger celebratory golden burst when burstKey increments
  useEffect(() => {
    if (burstKey === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const cx = width * 0.5;
    const cy = height * 0.48;

    const burstCount = 38;
    for (let i = 0; i < burstCount; i++) {
      const angle = (Math.PI * 2 * i) / burstCount + (Math.random() - 0.5) * 0.35;
      const speed = 1.2 + Math.random() * 3.2;
      burstParticlesRef.current.push({
        x: cx + (Math.random() - 0.5) * 60,
        y: cy + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.9,
        radius: 1.4 + Math.random() * 2.2,
        alpha: 0.95,
        alphaDir: -1,
        life: 0,
        maxLife: 75 + Math.random() * 45,
      });
    }
  }, [burstKey]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrameId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const ambientCount = prefersReduced ? 18 : Math.min(48, Math.floor(width / 32));
    const ambient: Particle[] = Array.from({ length: ambientCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -0.12 - Math.random() * 0.25,
      radius: 0.9 + Math.random() * 1.7,
      alpha: 0.12 + Math.random() * 0.45,
      alphaDir: Math.random() > 0.5 ? 1 : -1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Ambient drifting gold dust
      for (const p of ambient) {
        if (!prefersReduced) {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha += p.alphaDir * 0.0025;
          if (p.alpha > 0.58) {
            p.alpha = 0.58;
            p.alphaDir = -1;
          } else if (p.alpha < 0.08) {
            p.alpha = 0.08;
            p.alphaDir = 1;
          }
          if (p.y < -10) p.y = height + 10;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229, 199, 107, ${p.alpha})`;
        ctx.fill();
      }

      // Celebratory burst particles
      const remaining: Particle[] = [];
      for (const b of burstParticlesRef.current) {
        b.x += b.vx;
        b.y += b.vy;
        b.vy += 0.025; // soft gravity
        b.vx *= 0.985;
        b.life = (b.life ?? 0) + 1;
        const maxLife = b.maxLife ?? 90;
        const progress = b.life / maxLife;
        const opacity = Math.max(0, (1 - progress) * 0.9);

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(243, 217, 134, ${opacity})`;
        ctx.fill();

        if (b.life < maxLife) {
          remaining.push(b);
        }
      }
      burstParticlesRef.current = remaining;

      if (!prefersReduced) {
        animationFrameId = window.requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 h-full w-full"
    />
  );
}
