import { motion } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    num: "01",
    title: "Project Raseed",
    subtitle: "AI-first receipt management engine.",
    tools: ["Gemini 1.5", "Python", "Google Wallet API"],
  },
  {
    num: "02",
    title: "Autonomous Swarm Navigation",
    subtitle: "Inter IIT Tech Meet 13.0 (Top 5).",
    tools: ["ROS2", "Gazebo", "Centralized Swarm Control"],
  },
];

const WorkPage = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 md:px-12 max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase mb-16"
      >
        // Work
      </motion.h2>

      <div className="space-y-8">
        {projects.map((project, i) => (
          <motion.div
            key={project.num}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
            onMouseEnter={() => setHovered(project.num)}
            onMouseLeave={() => setHovered(null)}
            className="border border-border p-8 md:p-10 glow-border transition-all duration-500 relative"
          >
            {/* Number */}
            <span
              className={`font-mono text-6xl md:text-8xl font-bold text-muted-foreground/10 absolute top-6 right-8 transition-transform duration-500 select-none ${
                hovered === project.num ? "translate-x-1 -translate-y-1" : ""
              }`}
            >
              {project.num}
            </span>

            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-light text-foreground tracking-tight">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                {project.subtitle}
              </p>

              <div className="mt-6 pt-4 border-t border-border">
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase block mb-3">
                  Tools & Features
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="font-mono text-[11px] px-3 py-1 border border-border text-muted-foreground"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WorkPage;
