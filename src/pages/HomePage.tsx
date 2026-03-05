import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="h-screen flex flex-col relative overflow-hidden">
      {/* Giant background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-mono text-[18vw] font-bold tracking-tighter text-foreground opacity-[0.03] blur-[1px] uppercase">
          PRIYANKA
        </span>
      </div>

      {/* Center mounting frame */}
      <div className="flex-1 flex items-center justify-center pt-14">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="crosshair-frame border border-border aspect-video w-full max-w-2xl flex items-center justify-center"
        >
          <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
            REACT THREE FIBER // CANVAS MOUNT PENDING
          </span>
        </motion.div>
      </div>

      {/* Foreground text - bottom left */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute bottom-12 left-6 md:left-12 max-w-xl"
      >
        <h1 className="text-2xl md:text-3xl font-light tracking-tight text-foreground leading-tight">
          Full-Stack Developer &<br />Robotics Engineer.
        </h1>
        <p className="mt-4 font-mono text-xs leading-relaxed text-muted-foreground max-w-md">
          Building intelligent web platforms and autonomous systems—from React
          frontends to ROS2 navigation.
        </p>
      </motion.div>

      {/* Bottom right version tag */}
      <div className="absolute bottom-12 right-6 md:right-12">
        <span className="font-mono text-[10px] text-muted-foreground tracking-widest">
          v2026.03
        </span>
      </div>
    </div>
  );
};

export default HomePage;
