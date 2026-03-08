import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const COLS = 64;
const ROWS = 44;
const DOT_SIZE = 3;
const GAP = 1;
const REPEL_RADIUS = 50;
const REPEL_STRENGTH = 18;

export default function AsciiPortrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -999, y: -999, active: false });
  // Store per-dot velocity for physics simulation
  const dotsRef = useRef<{ vx: number; vy: number; ox: number; oy: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = COLS * (DOT_SIZE + GAP);
    const h = ROWS * (DOT_SIZE + GAP);
    canvas.width = w;
    canvas.height = h;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = w / rect.width;
      const scaleY = h / rect.height;
      mouseRef.current = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;

    // Init dot physics state
    const totalDots = COLS * ROWS;
    if (dotsRef.current.length !== totalDots) {
      dotsRef.current = Array.from({ length: totalDots }, () => ({ vx: 0, vy: 0, ox: 0, oy: 0 }));
    }
    const dots = dotsRef.current;

    const FRICTION = 0.85;
    const SPRING = 0.15;

    const draw = () => {
      ctx.fillStyle = "hsl(0, 0%, 0%)";
      ctx.fillRect(0, 0, w, h);

      const { x: mx, y: my, active } = mouseRef.current;
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.sqrt(cx * cx + cy * cy);

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const idx = row * COLS + col;
          const dot = dots[idx];
          const baseX = col * (DOT_SIZE + GAP);
          const baseY = row * (DOT_SIZE + GAP);

          // Mouse repulsion
          if (active) {
            const dx = baseX + dot.ox - mx;
            const dy = baseY + dot.oy - my;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);
            if (dist < REPEL_RADIUS && dist > 0.1) {
              const force = REPEL_STRENGTH / (distSq + 50);
              dot.vx += (dx / dist) * force;
              dot.vy += (dy / dist) * force;
            }
          }

          dot.vx -= dot.ox * SPRING;
          dot.vy -= dot.oy * SPRING;
          dot.vx *= FRICTION;
          dot.vy *= FRICTION;
          dot.ox += dot.vx;
          dot.oy += dot.vy;

          const x = baseX + dot.ox;
          const y = baseY + dot.oy;

          // Black hole math
          const dx = baseX - cx;
          const dy = baseY - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const normDist = dist / maxR;
          const angle = Math.atan2(dy, dx);

          // Event horizon — dark void in center
          const eventHorizon = 0.08;
          if (normDist < eventHorizon) continue;

          // Accretion disk — spiral arms
          const spiralAngle = angle + Math.log(normDist + 0.01) * 3.5 - time * 0.8;
          const spiral1 = Math.sin(spiralAngle * 2) * 0.5;
          const spiral2 = Math.sin(spiralAngle * 3 + 1.5) * 0.3;
          const spiral3 = Math.cos(spiralAngle * 1.5 - 0.8) * 0.25;

          // Radial glow — brighter near center, fading out
          const radialFade = Math.exp(-normDist * 2.5) * 1.2;
          // Disk thickness — narrow band around center
          const diskThickness = Math.exp(-Math.pow((normDist - 0.25) * 4, 2)) * 0.6;
          // Turbulence
          const turb = Math.sin(dist * 0.3 + time * 1.2) * Math.cos(angle * 5 - time * 0.5) * 0.15;

          const combined = (spiral1 + spiral2 + spiral3) * radialFade + diskThickness + turb;
          const norm = Math.max(0, Math.min(1, combined));

          if (norm > 0.15) {
            const alpha = Math.min(1, (norm - 0.15) * 2.5);
            const size = DOT_SIZE * (0.4 + alpha * 0.6);

            // Color: warm orange/white near center, cooler blue far out
            const warmth = Math.max(0, 1 - normDist * 2.5);
            const r = Math.round(255 * (0.6 + warmth * 0.4));
            const g = Math.round(255 * (0.4 + warmth * 0.3) * alpha);
            const b = Math.round(255 * (0.3 + (1 - warmth) * 0.5) * alpha);

            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.4 + alpha * 0.6})`;
            ctx.fillRect(
              x + (DOT_SIZE - size) / 2,
              y + (DOT_SIZE - size) / 2,
              size,
              size
            );
          }
        }
      }

      time += 0.012;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="cursor-crosshair select-none relative overflow-hidden group flex flex-col items-center justify-center"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-auto"
        style={{ imageRendering: "pixelated" }}
      />

      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,hsl(var(--foreground)/0.03)_1px,hsl(var(--foreground)/0.03)_2px)]" />

      <p className="font-mono text-[8px] text-muted-foreground/40 mt-3 text-center tracking-widest uppercase">
        singularity
      </p>
    </motion.div>
  );
}
