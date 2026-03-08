import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

// High-detail ASCII eye art inspired by the reference
const EYE_ART = [
  "                                                            ",
  "                          .::::::.                          ",
  "                    .::////////////////::.                   ",
  "                .:////////////////////////////:.             ",
  "             .://////////////////////////////////.          ",
  "           .://///...:///////////////.:...:////////.         ",
  "         .://///       .://////////:.       :///////.       ",
  "        .:////          .:///////:           .//////:.      ",
  "       .://///       @@@@@@@@@@@@@@@@@@       ://////:.     ",
  "      .://////     @@@@@@@@@@@@@@@@@@@@@@     :///////:.    ",
  "     .:///////    @@@@@@@  ######  @@@@@@@    :////////:.   ",
  "    .:////////   @@@@@@ ##########  @@@@@@   ://///////:.   ",
  "    ://///////   @@@@@ ############  @@@@@   ://////////:.  ",
  "   .://///////   @@@@@ ####  ###### @@@@@   .://////////:.  ",
  "   .://///////   @@@@@ ####  ###### @@@@@   .://////////:.  ",
  "    ://///////   @@@@@ ############  @@@@@   ://////////:.  ",
  "    .:////////   @@@@@@ ##########  @@@@@@   ://///////:.   ",
  "     .:///////    @@@@@@@  ######  @@@@@@@    :////////:.   ",
  "      .://////     @@@@@@@@@@@@@@@@@@@@@@     :///////:.    ",
  "       .://///       @@@@@@@@@@@@@@@@@@       ://////:.     ",
  "        .:////          .:///////:           .//////:.      ",
  "         .://///       .://////////:.       :///////.       ",
  "           .://///...:///////////////.:...:////////.         ",
  "             .://////////////////////////////////.          ",
  "                .:////////////////////////////:.             ",
  "                    .::////////////////::.                   ",
  "                          .::::::.                          ",
  "                                                            ",
  "           G  O  U  T  H  A  M     A     S                 ",
  "           ─────────────────────────────                    ",
  "           d e v e l o p e r  .  b u i l d e r             ",
  "                                                            ",
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
  const [displayLines, setDisplayLines] = useState<string[]>([]);
  const [glitchIntensity, setGlitchIntensity] = useState(0);
  const [revealed, setRevealed] = useState(0);

  // Reveal animation on mount
  useEffect(() => {
    let frame = 0;
    const total = EYE_ART.length;
    const interval = setInterval(() => {
      frame += 1;
      setRevealed(Math.min(frame, total));
      if (frame >= total) {
        clearInterval(interval);
        setDisplayLines(EYE_ART);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Glitch on hover
  const runGlitch = useCallback(() => {
    if (!isHovered) return;
    const intensity = 0.1 + Math.random() * 0.2;
    setGlitchIntensity(intensity);
    setDisplayLines(EYE_ART.map((l) => glitchLine(l, intensity)));
  }, [isHovered]);

  useEffect(() => {
    if (!isHovered) {
      setDisplayLines(EYE_ART);
      setGlitchIntensity(0);
      return;
    }
    const interval = setInterval(runGlitch, 70);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setDisplayLines(EYE_ART);
      setGlitchIntensity(0);
    }, 700);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isHovered, runGlitch]);

  const visibleLines = displayLines.length > 0
    ? displayLines.slice(0, revealed)
    : EYE_ART.slice(0, revealed);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass-card p-6 cursor-crosshair select-none relative overflow-hidden group flex flex-col items-center justify-center"
    >
      <pre
        className="font-mono text-[6px] sm:text-[7px] md:text-[8px] leading-[1.3] text-muted-foreground transition-colors duration-200 group-hover:text-foreground/90 whitespace-pre"
        style={{
          textShadow:
            glitchIntensity > 0
              ? `${glitchIntensity * 3}px 0 hsl(var(--primary) / 0.4), -${glitchIntensity * 2}px 0 hsl(var(--destructive) / 0.3)`
              : "none",
        }}
      >
        {visibleLines.map((line, i) => (
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

      <p className="font-mono text-[8px] text-muted-foreground/40 mt-3 text-center tracking-widest uppercase">
        hover to glitch
      </p>
    </motion.div>
  );
}
