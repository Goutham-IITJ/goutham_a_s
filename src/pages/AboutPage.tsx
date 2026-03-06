import { motion } from "framer-motion";
import { useState } from "react";
import { Atom, Globe, Server, Code2, Cpu, Bot, Database, Paintbrush } from "lucide-react";
import aboutHero from "@/assets/about-hero.jpeg";

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
    <div className="min-h-screen bg-background">
      {/* Hero image section - full viewport */}
      <section className="h-screen flex items-center justify-center px-4 sm:px-6 pt-14 relative">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-4xl aspect-[16/9] rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_hsla(0,0%,100%,0.08)] border border-border/30"
        >
          <img
            src={aboutHero}
            alt="About me"
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-6 bg-muted-foreground/40"
          />
        </motion.div>
      </section>

      {/* Content that scrolls up from behind */}
      <section className="relative z-10 pb-16 px-6 md:px-12 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase mb-16"
        >
          // About
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
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
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <h3 className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-10">
              Tech Stack
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3">
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
      </section>
    </div>
  );
};

export default AboutPage;
