import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Globe, Bot, ChevronDown, Github, Braces, BarChart3, Cloud, Layout, Palette, Cpu, PenTool, Users } from "lucide-react";
import aboutHero from "@/assets/about-hero.jpeg";
import AsciiPortrait from "@/components/AsciiPortrait";

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

const techCategories = [
  {
    label: "Languages",
    icon: Braces,
    items: ["C/C++", "Python", "JavaScript", "SQL"],
  },
  {
    label: "Web & Backend",
    icon: Globe,
    items: ["React", "Node.js", "Express.js", "JWT", "REST APIs", "Tailwind CSS"],
  },
  {
    label: "Data & Visualization",
    icon: BarChart3,
    items: ["NumPy", "Pandas", "Matplotlib", "Plotly"],
  },
  {
    label: "Databases & Cloud",
    icon: Cloud,
    items: ["MongoDB", "Firebase", "GCP", "Cloud Functions", "Vertex AI"],
  },
  {
    label: "Robotics & Simulation",
    icon: Bot,
    items: ["ROS2", "Gazebo", "TurtleBot", "Git", "Linux", "SolidWorks"],
  },
  {
    label: "Application & UI",
    icon: Layout,
    items: ["Plotly Dashboards", "Tailwind CSS", "Event-driven Programming"],
  },
];

// Flatten all skills for the interactive hover effect
const allSkills = techCategories.flatMap((cat) => cat.items);

const AboutPage = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedExp, setExpandedExp] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const panelY = useTransform(scrollYProgress, [0.1, 0.55], ["100vh", "0vh"]);
  const panelOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0.3, 0.55], [1, 0.3]);

  const activeCatItems = activeCategory
    ? techCategories.find((c) => c.label === activeCategory)?.items ?? []
    : [];

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-background">
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
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

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
            <h2 className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase mb-12">
              // About
            </h2>

            {/* Two-column: Experience left, stats/info right */}
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
              {/* Experience */}
              <div>
                <h3 className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-8">
                  Experience
                </h3>
                <div className="relative pl-8">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border/60" />

                  {timeline.map((item, i) => {
                    const isExpanded = expandedExp === i;
                    const isClickable = item.expandable;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.12, duration: 0.5 }}
                        className="relative mb-6 last:mb-0"
                      >
                        <div className="absolute -left-8 top-5 w-[15px] h-[15px] flex items-center justify-center">
                          <motion.div
                            animate={isExpanded ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="w-2.5 h-2.5 rounded-full bg-foreground glow-dot"
                          />
                        </div>

                        <div
                          onClick={() => isClickable && setExpandedExp(isExpanded ? null : i)}
                          className={`glass-card p-5 transition-all duration-300 ${
                            isClickable ? "cursor-pointer hover:!border-foreground/20 hover:shadow-[0_0_30px_-8px_hsla(0,0%,100%,0.12)]" : ""
                          } ${isExpanded ? "!border-foreground/15 shadow-[0_0_30px_-6px_hsla(0,0%,100%,0.1)]" : ""}`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="text-sm font-medium text-foreground leading-snug">
                                  {item.title}
                                </h4>
                                {item.github && (
                                  <Github size={13} className="text-muted-foreground/60 hover:text-foreground transition-colors duration-200 shrink-0" />
                                )}
                              </div>
                              <span className="font-mono text-[11px] text-muted-foreground mt-1.5 block">
                                @ {item.org}
                              </span>
                              <span className="font-mono text-[10px] text-muted-foreground/50 mt-0.5 block">
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
                                      initial={{ opacity: 0, x: -10 }}
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
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Right column — ASCII portrait */}
              <div className="flex flex-col gap-4 lg:mt-10">
                <AsciiPortrait />
              </div>
            </div>

            {/* Technical Skills — interactive category filter + flowing pills */}
            <div>
              <h3 className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-8">
                Technical Skills
              </h3>

              {/* Category tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`font-mono text-[10px] tracking-wider uppercase px-3.5 py-2 rounded-lg border transition-all duration-300 ${
                    activeCategory === null
                      ? "border-foreground/30 text-foreground bg-foreground/5 shadow-[0_0_15px_-5px_hsla(0,0%,100%,0.15)]"
                      : "border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground/20"
                  }`}
                >
                  All
                </button>
                {techCategories.map((cat) => {
                  const CatIcon = cat.icon;
                  const isActive = activeCategory === cat.label;
                  return (
                    <button
                      key={cat.label}
                      onClick={() => setActiveCategory(isActive ? null : cat.label)}
                      className={`font-mono text-[10px] tracking-wider uppercase px-3.5 py-2 rounded-lg border flex items-center gap-1.5 transition-all duration-300 ${
                        isActive
                          ? "border-foreground/30 text-foreground bg-foreground/5 shadow-[0_0_15px_-5px_hsla(0,0%,100%,0.15)]"
                          : "border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground/20"
                      }`}
                    >
                      <CatIcon size={12} strokeWidth={1.5} />
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Skill pills — animated layout */}
              <motion.div layout className="flex flex-wrap gap-2">
                <AnimatePresence mode="popLayout">
                  {(activeCategory === null ? allSkills : activeCatItems).map((skill) => (
                    <motion.span
                      key={skill}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.25 }}
                      onMouseEnter={() => setHoveredTech(skill)}
                      onMouseLeave={() => setHoveredTech(null)}
                      className={`font-mono text-[11px] px-4 py-2 rounded-full border cursor-default transition-all duration-300 ${
                        hoveredTech === null || hoveredTech === skill
                          ? "text-foreground border-border/60 hover:border-foreground/30 hover:shadow-[0_0_20px_-6px_hsla(0,0%,100%,0.12)] hover:bg-foreground/5"
                          : "text-muted-foreground/30 border-border/20"
                      }`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Leadership & Positions */}
            <div className="mt-20">
              <h3 className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-8">
                Leadership & Positions
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    icon: Cpu,
                    cover: "",
                    title: "Electronic Subsystem Coordinator",
                    org: "Robotics Society",
                    sub: "IIT Jodhpur",
                    period: "Aug 2025 – Present",
                    points: [
                      "Leading electronic subsystem design and integration",
                      "Coordinate sensor and actuator integration across teams",
                      "Ensure reliability in field tests and competitions",
                    ],
                  },
                  {
                    icon: PenTool,
                    cover: "",
                    title: "Design Coordinator",
                    org: "Office of Placement and Training",
                    sub: "IIT Jodhpur",
                    period: "Aug 2025 – Present",
                    points: [
                      "Lead design workshops",
                      "Coordinate with placement teams for presentation assets",
                    ],
                  },
                  {
                    icon: Palette,
                    cover: "",
                    title: "Joint Secretary",
                    org: "Fine Arts Society",
                    sub: "IIT Jodhpur",
                    period: "2024",
                    points: [
                      "Organized cultural events and exhibitions",
                      "Managed artist collaborations and budgets",
                      "Led outreach initiatives across campus",
                    ],
                  },
                  {
                    icon: Users,
                    cover: "",
                    title: "Associate",
                    org: "Product Club",
                    sub: "IIT Jodhpur",
                    period: "2024",
                    points: [
                      "Participated in product management workshops",
                      "Collaborated on product development initiatives",
                      "Contributed to winning Pitch Rush Hackathon project",
                    ],
                  },
                ].map((pos, i) => {
                  const PosIcon = pos.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="glass-card overflow-hidden group hover:!border-foreground/20 hover:shadow-[0_0_30px_-8px_hsla(0,0%,100%,0.1)] transition-all duration-300"
                    >
                      {/* Cover image area */}
                      <div className="w-full h-32 bg-muted/30 border-b border-border/40 flex items-center justify-center overflow-hidden">
                        {pos.cover ? (
                          <img src={pos.cover} alt={pos.title} className="w-full h-full object-cover" />
                        ) : (
                          <PosIcon size={28} strokeWidth={1} className="text-muted-foreground/30" />
                        )}
                      </div>
                      <div className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-full border border-border/60 flex items-center justify-center group-hover:border-foreground/30 group-hover:shadow-[0_0_15px_-5px_hsla(0,0%,100%,0.15)] transition-all duration-300">
                          <PosIcon size={16} strokeWidth={1.5} className="text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-foreground leading-snug">{pos.title}</h4>
                          <p className="font-mono text-[11px] text-muted-foreground">{pos.org}</p>
                          <p className="font-mono text-[10px] text-muted-foreground/50">{pos.sub}</p>
                        </div>
                      </div>
                      <span className="inline-block font-mono text-[10px] tracking-wider text-muted-foreground border border-border/60 rounded px-2 py-0.5 mb-3">
                        {pos.period}
                      </span>
                      <ul className="space-y-2">
                        {pos.points.map((pt, j) => (
                          <li key={j} className="text-xs text-muted-foreground leading-relaxed pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-foreground/30">
                            {pt}
                          </li>
                        ))}
                      </ul>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
