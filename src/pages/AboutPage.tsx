import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Atom, Globe, Server, Code2, Cpu, Bot, Database, Paintbrush, ChevronDown, Github, Braces, BarChart3, Cloud, Wrench, Layout } from "lucide-react";
import aboutHero from "@/assets/about-hero.jpeg";

interface TimelineItem {
  title: string;
  org: string;
  period: string;
  desc: string;
  details?: string[];
  expandable?: boolean;
  github?: boolean;
}

const timeline: TimelineItem[] = [
  {
    title: "Bash/CLI Developer Intern",
    org: "AfterQuery (YC W25)",
    period: "Aug 2025 – Nov 2025",
    desc: "Developed test suites and benchmarked LLMs.",
    expandable: true,
    github: true,
    details: [
      "Generated 20+ high-complexity DevOps/SRE scenarios using Kubernetes and Docker to benchmark frontier LLMs, improving LLM performance.",
      "Conducted deterministic Python test suites (Pytest) for CLI tasks, achieving 100% reproducibility against Oracle agents while adhering to quality standards (input validation, error handling).",
    ],
  },
  {
    title: "Inter IIT Tech Meet 13.0",
    org: "Kalyani Bharat Forge, Autonomous Swarm Navigation",
    period: "Dec 2024 – Dec 2024",
    desc: "Built centralized software for robot swarm navigation.",
    expandable: true,
    github: true,
    details: [
      "Built a centralized software for robot swarm navigation, achieving a 35% reduction in path-finding latency in unknown, unpredictable environments through TD3 & PPO path-planning algorithms.",
      "Pioneered a dual-layered architecture for 10+ robots by integrating YOLOv8 and RL with MongoDB-based communication, achieving higher obstacle avoidance accuracy across 50+ Gazebo simulations.",
    ],
  },
  {
    title: "B.Tech Electrical Engineering",
    org: "IIT Jodhpur",
    period: "Expected 2027",
    desc: "Expected 2027.",
    expandable: false,
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
  const [expandedExp, setExpandedExp] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Content panel slides from bottom (100%) to top (0%) as user scrolls
  const panelY = useTransform(scrollYProgress, [0.1, 0.55], ["100vh", "0vh"]);
  const panelOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  // Hero image subtly scales and fades
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0.3, 0.55], [1, 0.3]);

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-background">
      {/* Sticky wrapper that holds both layers */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Hero image layer */}
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 pt-14"
        >
          <div className="relative w-full max-w-4xl aspect-[16/9] rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_hsla(0,0%,100%,0.08)] border border-border/30">
            <img
              src={aboutHero}
              alt="About me"
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

            {/* Text on top of card */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="font-mono text-xs sm:text-sm text-muted-foreground mb-3 tracking-wide"
              >
                Hi, I'm <span className="text-foreground font-medium">Goutham A S</span>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-muted-foreground uppercase mb-2 sm:mb-3"
              >
                // About Me
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight"
              >
                Building at the
                <br />
                intersection of
                <br />
                <span className="text-muted-foreground">code & curiosity.</span>
              </motion.h1>
            </div>
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-6 bg-muted-foreground/40"
            />
          </motion.div>
        </motion.div>

        {/* Sliding content panel */}
        <motion.div
          style={{ y: panelY, opacity: panelOpacity }}
          className="absolute inset-0 bg-background pt-20 sm:pt-24 pb-16 px-6 md:px-12 overflow-y-auto"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase mb-16">
              // About
            </h2>

            <div className="grid md:grid-cols-2 gap-16 md:gap-24">
              {/* Timeline */}
              <div>
                <h3 className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-10">
                  Experience
                </h3>
                <div className="relative pl-8">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border/60" />

                  {timeline.map((item, i) => {
                    const isExpanded = expandedExp === i;
                    const isClickable = item.expandable;
                    return (
                      <div key={i} className="relative mb-10 last:mb-0">
                        <div className="absolute -left-8 top-1.5 w-[15px] h-[15px] flex items-center justify-center">
                          <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${isExpanded ? "bg-foreground glow-dot" : "bg-foreground glow-dot"}`} />
                        </div>

                        <div
                          onClick={() => isClickable && setExpandedExp(isExpanded ? null : i)}
                          className={`glass-card p-4 transition-all duration-300 ${isClickable ? "cursor-pointer hover:!border-foreground/20 hover:shadow-[0_0_20px_-6px_hsla(0,0%,100%,0.12)]" : ""} ${isExpanded ? "!border-foreground/15 shadow-[0_0_25px_-6px_hsla(0,0%,100%,0.1)]" : ""}`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-medium text-foreground leading-snug">
                                  {item.title}
                                </h4>
                                {item.github && <Github size={13} className="text-muted-foreground shrink-0" />}
                              </div>
                              <span className="font-mono text-[11px] text-muted-foreground mt-1 block">
                                @ {item.org}
                              </span>
                              <span className="font-mono text-[10px] text-muted-foreground/60 mt-0.5 block">
                                {item.period}
                              </span>
                            </div>
                            {isClickable && (
                              <motion.div
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-1 shrink-0"
                              >
                                <ChevronDown size={14} className="text-muted-foreground" />
                              </motion.div>
                            )}
                          </div>

                          <AnimatePresence>
                            {isExpanded && item.details && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <ul className="mt-4 space-y-3 border-t border-border/40 pt-4">
                                  {item.details.map((detail, j) => (
                                    <motion.li
                                      key={j}
                                      initial={{ opacity: 0, x: -8 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: j * 0.1, duration: 0.3 }}
                                      className="text-xs text-muted-foreground leading-relaxed pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-foreground/40"
                                    >
                                      {detail}
                                    </motion.li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tech Stack Grid */}
              <div>
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
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
