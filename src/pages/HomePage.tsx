import { motion } from "framer-motion";
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

      {/* Bottom right version tag */}
      <div className="absolute bottom-12 right-6 md:right-12 z-10 pointer-events-none">
        <span className="font-mono text-[10px] text-gray-500 tracking-widest">
          v2026.03
        </span>
      </div>
    </div>
  );
};

export default HomePage;