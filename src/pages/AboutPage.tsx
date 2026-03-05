import { motion } from "framer-motion";
import { useState } from "react";

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
  "React", "Next.js", "Node.js", "Python", "C++", "ROS2", "MongoDB", "Tailwind",
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
            {/* Timeline line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

            {timeline.map((item, i) => (
              <div key={i} className="relative mb-12 last:mb-0">
                {/* Node dot with glow */}
                <div className="absolute -left-8 top-1.5 w-[15px] h-[15px] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-silver shadow-[0_0_8px_2px_hsla(0,0%,70%,0.3)]" />
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
          <div className="grid grid-cols-2 gap-2">
            {techStack.map((tech) => (
              <div
                key={tech}
                onMouseEnter={() => setHoveredTech(tech)}
                onMouseLeave={() => setHoveredTech(null)}
                className={`border border-border px-4 py-3 font-mono text-xs transition-all duration-300 cursor-default ${
                  hoveredTech === null || hoveredTech === tech
                    ? "text-foreground border-muted-foreground/30"
                    : "text-muted-foreground/30 border-border"
                } ${hoveredTech === tech ? "bg-accent shadow-[0_0_12px_-4px_hsla(0,0%,100%,0.1)]" : ""}`}
              >
                {tech}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
