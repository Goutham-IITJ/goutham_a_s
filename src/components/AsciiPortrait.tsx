import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const PORTRAIT = [
  "┌─────────────────────────┐",
  "│                         │",
  "│    ╔═══════════════╗    │",
  "│    ║   ┌───────┐   ║    │",
  "│    ║   │ ◉   ◉ │   ║    │",
  "│    ║   │   ▲   │   ║    │",
  "│    ║   │  ───  │   ║    │",
  "│    ║   └───────┘   ║    │",
  "│    ╚═══════════════╝    │",
  "│                         │",
  "│    G O U T H A M        │",
  "│    ─ ─ ─ ─ ─ ─ ─       │",
  "│    developer.            │",
  "│    tinkerer.             │",
  "│    builder.              │",
  "│                         │",
  "│    > IIT Jodhpur         │",
  "│    > Full-Stack          │",
  "│    > Robotics            │",
  "│                         │",
  "│    status: building...   │",
  "│                         │",
  "└─────────────────────────┘",
];

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`░▒▓█▀▄■□▪▫";

function glitchLine(line: string, intensity: number): string {
  return line
    .split("")
    .map((ch) => {
      if (ch === " " || ch === "\n") return ch;
      return Math.random() < intensity
        ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        : ch;
    })
    .join("");
}

export default function AsciiPortrait() {
  const [isHovered, setIsHovered] = useState(false);
  const [displayLines, setDisplayLines] = useState(PORTRAIT);
  const [glitchIntensity, setGlitchIntensity] = useState(0);

  const runGlitch = useCallback(() => {
    if (!isHovered) return;
    const intensity = 0.08 + Math.random() * 0.15;
    setGlitchIntensity(intensity);
    setDisplayLines(PORTRAIT.map((l) => glitchLine(l, intensity)));
  }, [isHovered]);

  useEffect(() => {
    if (!isHovered) {
      setDisplayLines(PORTRAIT);
      setGlitchIntensity(0);
      return;
    }

    // Rapid glitch bursts
    const interval = setInterval(runGlitch, 80);
    // Stop after 600ms
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setDisplayLines(PORTRAIT);
      setGlitchIntensity(0);
    }, 600);

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
      className="glass-card p-5 cursor-crosshair select-none relative overflow-hidden group"
    >
      <pre
        className="font-mono text-[9px] sm:text-[10px] leading-[1.5] text-muted-foreground transition-colors duration-200 group-hover:text-foreground/80"
        style={{
          textShadow: glitchIntensity > 0
            ? `${glitchIntensity * 4}px 0 hsl(var(--primary) / 0.3), -${glitchIntensity * 3}px 0 hsl(var(--destructive) / 0.2)`
            : "none",
        }}
      >
        {displayLines.map((line, i) => (
          <motion.div
            key={i}
            animate={
              glitchIntensity > 0
                ? { x: (Math.random() - 0.5) * glitchIntensity * 20 }
                : { x: 0 }
            }
            transition={{ duration: 0.05 }}
          >
            {line}
          </motion.div>
        ))}
      </pre>

      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,hsl(var(--foreground)/0.03)_2px,hsl(var(--foreground)/0.03)_4px)]" />

      <p className="font-mono text-[9px] text-muted-foreground/40 mt-3 text-center tracking-widest uppercase">
        hover to glitch
      </p>
    </motion.div>
  );
}
