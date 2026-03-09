import { motion } from "framer-motion";
import TechCanvas from '../components/TechCanvas';

const HomePage = () => {
  return (
    <div className="h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Giant background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="font-mono text-[20vw] sm:text-[18vw] font-bold tracking-tighter text-foreground opacity-[0.03] uppercase">
          GOUTHAM
        </span>
      </div>

      {/* Center mounting frame */}
      <div className="flex-1 flex items-center justify-center pt-14 px-4 sm:px-6 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="crosshair-frame aspect-video w-full max-w-xs sm:max-w-lg md:max-w-2xl flex items-center justify-center bg-transparent border border-foreground/5 relative"
        >
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
        className="absolute bottom-20 sm:bottom-12 left-4 sm:left-6 md:left-12 max-w-[85vw] sm:max-w-xl z-10 pointer-events-none"
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-foreground leading-tight">
          Full-Stack Developer &<br />Robotics Engineer.
        </h1>
        <p className="mt-3 sm:mt-4 font-mono text-[10px] sm:text-xs leading-relaxed text-muted-foreground max-w-md">
          Building intelligent web platforms and autonomous systems—from React
          frontends to ROS2 navigation.
        </p>
      </motion.div>

      {/* Bottom right social icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-6 sm:bottom-12 right-4 sm:right-6 md:right-12 z-10 flex gap-2 sm:gap-3"
      >
        {socialLinks.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-border/50 bg-accent/20 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:shadow-[0_0_20px_-6px_hsla(0,0%,100%,0.15)] transition-all duration-300"
          >
            <s.icon size={14} />
          </a>
        ))}
      </motion.div>
    </div>
  );
};

export default HomePage;
