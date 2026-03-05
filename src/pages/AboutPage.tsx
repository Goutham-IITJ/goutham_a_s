import { motion } from "framer-motion";
import { useState } from "react";
import { Atom, Globe, Server, Code2, Cpu, Bot, Database, Paintbrush } from "lucide-react";

const timeline = [
  {
    title: "Bash/CLI Developer Intern",
    org: "AfterQuery (YC W25)",
    desc: "Developed test suites and benchmarked LLMs.",
  },
  {
    title: "B.Tech Electrical Engineering",
    org: "IIT Jodhpur",
    desc: "Expected 2027.",
  },
];

const techStack = [
  { name: "React", icon: Atom },
  { name: "Next.js", icon: Globe },
  { name: "Node.js", icon: Server },
  { name: "Python", icon: Code2 },
  { name: "C++", icon: Cpu },
  { name: "ROS2", icon: Bot },
  { name: "MongoDB", icon: Database },
  { name: "Tailwind", icon: Paintbrush },
];

const AboutPage = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 md:px-12 max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase mb-16"
      >
        // About
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-16 md:gap-24">
        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-10">
            Experience
          </h3>
          <div className="relative pl-8">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border/60" />

            {timeline.map((item, i) => (
              <div key={i} className="relative mb-12 last:mb-0">
                <div className="absolute -left-8 top-1.5 w-[15px] h-[15px] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-foreground glow-dot" />
                </div>

                <h4 className="text-sm font-medium text-foreground leading-snug">
                  {item.title}
                </h4>
                <span className="font-mono text-[11px] text-muted-foreground mt-1 block">
                  @ {item.org}
                </span>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack Grid */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <h3 className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-10">
            Tech Stack
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {techStack.map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.name}
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                  className={`glass-card flex items-center gap-3 px-4 py-3.5 font-mono text-xs transition-all duration-300 cursor-default ${
                    hoveredTech === null || hoveredTech === tech.name
                      ? "text-foreground"
                      : "text-muted-foreground/30"
                  } ${hoveredTech === tech.name ? "!border-foreground/20 shadow-[0_0_20px_-6px_hsla(0,0%,100%,0.15)]" : ""}`}
                >
                  <Icon size={18} strokeWidth={1.5} className="shrink-0 opacity-70" />
                  {tech.name}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
