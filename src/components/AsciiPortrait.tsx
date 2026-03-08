import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import aboutHero from "@/assets/about-hero.jpeg";

const ASCII_CHARS = " .,:;i1tfLCG08@#";
const GLITCH_CHARS = "!@#$%^&*░▒▓█▀▄■□";

function getAsciiFromImage(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  cols: number,
  rows: number
): string[] {
  const cellW = width / cols;
  const cellH = height / rows;
  const lines: string[] = [];

  for (let y = 0; y < rows; y++) {
    let line = "";
    for (let x = 0; x < cols; x++) {
      const px = Math.floor(x * cellW);
      const py = Math.floor(y * cellH);
      const data = ctx.getImageData(px, py, Math.ceil(cellW), Math.ceil(cellH)).data;

      let sum = 0;
      let count = 0;
      for (let i = 0; i < data.length; i += 4) {
        sum += (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
        count++;
      }
      const avg = sum / count;
      const charIndex = Math.floor((avg / 255) * (ASCII_CHARS.length - 1));
      line += ASCII_CHARS[charIndex];
    }
    lines.push(line);
  }
  return lines;
}

function glitchLines(lines: string[], intensity: number): string[] {
  return lines.map((line) =>
    line
      .split("")
      .map((ch) => {
        if (ch === " ") return ch;
        return Math.random() < intensity
          ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          : ch;
      })
      .join("")
  );
}

export default function AsciiPortrait() {
  const [asciiLines, setAsciiLines] = useState<string[]>([]);
  const [displayLines, setDisplayLines] = useState<string[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [glitchIntensity, setGlitchIntensity] = useState(0);
  const [revealed, setRevealed] = useState(0); // 0 to total rows for reveal animation
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const baseLines = useRef<string[]>([]);

  // Convert image to ASCII on mount
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      const cols = 60;
      const rows = 45;
      const lines = getAsciiFromImage(ctx, img.width, img.height, cols, rows);
      baseLines.current = lines;
      setAsciiLines(lines);
      setDisplayLines(lines);
    };
    img.src = aboutHero;
  }, []);

  // Reveal animation — lines appear row by row
  useEffect(() => {
    if (asciiLines.length === 0) return;
    let frame = 0;
    const total = asciiLines.length;
    const interval = setInterval(() => {
      frame += 2;
      setRevealed(Math.min(frame, total));
      if (frame >= total) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [asciiLines]);

  // Glitch on hover
  const runGlitch = useCallback(() => {
    if (!isHovered || baseLines.current.length === 0) return;
    const intensity = 0.1 + Math.random() * 0.2;
    setGlitchIntensity(intensity);
    setDisplayLines(glitchLines(baseLines.current, intensity));
  }, [isHovered]);

  useEffect(() => {
    if (!isHovered) {
      setDisplayLines(baseLines.current);
      setGlitchIntensity(0);
      return;
    }
    const interval = setInterval(runGlitch, 70);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setDisplayLines(baseLines.current);
      setGlitchIntensity(0);
    }, 700);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isHovered, runGlitch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass-card p-4 cursor-crosshair select-none relative overflow-hidden group"
    >
      <canvas ref={canvasRef} className="hidden" />

      <pre
        className="font-mono text-[5px] sm:text-[6px] md:text-[7px] leading-[1.15] text-muted-foreground transition-colors duration-200 group-hover:text-foreground/90 whitespace-pre overflow-hidden"
        style={{
          textShadow:
            glitchIntensity > 0
              ? `${glitchIntensity * 3}px 0 hsl(var(--primary) / 0.4), -${glitchIntensity * 2}px 0 hsl(var(--destructive) / 0.3)`
              : "none",
          letterSpacing: "0.08em",
        }}
      >
        {displayLines.slice(0, revealed).map((line, i) => (
          <motion.div
            key={i}
            animate={
              glitchIntensity > 0
                ? { x: (Math.random() - 0.5) * glitchIntensity * 15 }
                : { x: 0 }
            }
            transition={{ duration: 0.04 }}
          >
            {line}
          </motion.div>
        ))}
      </pre>

      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,hsl(var(--foreground)/0.04)_1px,hsl(var(--foreground)/0.04)_2px)]" />

      {/* CRT vignette */}
      <div className="absolute inset-0 pointer-events-none rounded-lg bg-[radial-gradient(ellipse_at_center,transparent_60%,hsl(var(--background)/0.6)_100%)]" />

      <p className="font-mono text-[8px] text-muted-foreground/40 mt-2 text-center tracking-widest uppercase">
        hover to glitch
      </p>
    </motion.div>
  );
}
