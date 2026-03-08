import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const COLS = 64;
const ROWS = 44;
const DOT_SIZE = 3;
const GAP = 1;

export default function AsciiPortrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = COLS * (DOT_SIZE + GAP);
    const h = ROWS * (DOT_SIZE + GAP);
    canvas.width = w;
    canvas.height = h;

    let time = 0;

    const draw = () => {
      ctx.fillStyle = "hsl(0, 0%, 0%)";
      ctx.fillRect(0, 0, w, h);

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const x = col * (DOT_SIZE + GAP);
          const y = row * (DOT_SIZE + GAP);

          // Multiple overlapping sine waves
          const wave1 = Math.sin(col * 0.15 + time * 0.8 + row * 0.05) * 0.5;
          const wave2 = Math.sin(col * 0.08 - time * 0.6 + row * 0.12) * 0.4;
          const wave3 = Math.sin((col + row) * 0.1 + time * 0.4) * 0.3;
          const wave4 = Math.cos(row * 0.2 - time * 0.5 + col * 0.06) * 0.3;

          const combined = wave1 + wave2 + wave3 + wave4;
          const norm = (combined + 1.5) / 3; // normalize to ~0-1

          // Threshold to create dot pattern (not gradient)
          if (norm > 0.45) {
            const alpha = Math.min(1, (norm - 0.45) * 3);
            // Size varies slightly
            const size = DOT_SIZE * (0.6 + alpha * 0.4);
            ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + alpha * 0.5})`;
            ctx.fillRect(
              x + (DOT_SIZE - size) / 2,
              y + (DOT_SIZE - size) / 2,
              size,
              size
            );
          }
        }
      }

      time += 0.03;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="glass-card p-6 cursor-crosshair select-none relative overflow-hidden group flex flex-col items-center justify-center"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-auto"
        style={{ imageRendering: "pixelated" }}
      />

      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,hsl(var(--foreground)/0.03)_1px,hsl(var(--foreground)/0.03)_2px)]" />

      <p className="font-mono text-[8px] text-muted-foreground/40 mt-3 text-center tracking-widest uppercase">
        wave interference
      </p>
    </motion.div>
  );
}
