import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
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
                transition={{ delay: 0.4, duration: 0.6 }}
                className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-muted-foreground uppercase mb-2 sm:mb-3"
              >
                // About Me
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight"
              >
                Building at the
                <br />
                intersection of
                <br />
                <span className="text-muted-foreground">code & curiosity.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="font-mono text-xs sm:text-sm text-muted-foreground mt-3 tracking-wide"
              >
                Hi, I'm <span className="text-foreground font-medium">Goutham A S</span>
              </motion.p>
            </div>
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
