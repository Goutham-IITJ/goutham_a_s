import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";
import TechCanvas from '../components/TechCanvas';

const HomePage = () => {
  return (
    <div className="h-screen flex flex-col relative overflow-hidden bg-[#050505]">
      {/* Giant background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="font-mono text-[18vw] font-bold tracking-tighter text-white opacity-[0.03] uppercase">
          GOUTHAM
        </span>
      </div>

      {/* Center mounting frame */}
      <div className="flex-1 flex items-center justify-center pt-14 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          // Removed glass-card, added explicit transparent background and subtle border
          className="crosshair-frame aspect-video w-full max-w-2xl flex items-center justify-center bg-transparent border border-white/5 relative"
        >
          {/* Replaced the span with a full-width/height absolute div */}
          <div className="absolute inset-0 w-full h-full">
            <TechCanvas />
          </div>
        </motion.div>
      </div>

      {/* Foreground text - bottom left */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute bottom-12 left-6 md:left-12 max-w-xl z-10 pointer-events-none"
      >
        <h1 className="text-2xl md:text-3xl font-light tracking-tight text-white leading-tight">
          Full-Stack Developer &<br />Robotics Engineer.
        </h1>
        <p className="mt-4 font-mono text-xs leading-relaxed text-gray-400 max-w-md">
          Building intelligent web platforms and autonomous systems—from React
          frontends to ROS2 navigation.
        </p>
      </motion.div>

      {/* Bottom right social icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-12 right-6 md:right-12 z-10 flex gap-3"
      >
        {[
          { href: "https://github.com", icon: <Github size={16} />, label: "GitHub" },
          { href: "https://linkedin.com", icon: <Linkedin size={16} />, label: "LinkedIn" },
          { href: "https://x.com", icon: <Twitter size={16} />, label: "X" },
          { href: "https://instagram.com", icon: <Instagram size={16} />, label: "Instagram" },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="w-9 h-9 rounded-full border border-border/50 bg-accent/20 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:shadow-[0_0_20px_-6px_hsla(0,0%,100%,0.15)] transition-all duration-300"
          >
            {s.icon}
          </a>
        ))}
      </motion.div>
    </div>
  );
};

export default HomePage;