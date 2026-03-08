import { motion } from "framer-motion";
import { useState } from "react";
import { Code2, Cpu, Shield, ShoppingCart, Eye, Zap, Github, ExternalLink } from "lucide-react";

const projects = [
  {
    num: "01",
    title: "Project Raseed",
    subtitle: "AI-First Receipt Intelligence Engine",
    period: "Jul 2025 – Aug 2025",
    icon: Zap,
    description:
      "Vision-based ingestion pipeline achieving 100% automated extraction of unstructured receipt data. Features a Receipt-to-Pass backend with Google Wallet integration and a LangChain SQL Agent for natural language querying.",
    highlights: [
      "100% automated extraction accuracy",
      "Zero-shot NL querying via LangChain",
      "Google Wallet pass generation",
    ],
    tools: ["Gemini 1.5 Flash", "Python", "Google Wallet API", "SQL", "LangChain", "Pandas"],
    category: "ai",
    image: "/placeholder.svg",
    github: "",
    live: "",
  },
  {
    num: "02",
    title: "Autonomous Swarm Navigation",
    subtitle: "Inter IIT Tech Meet 13.0 · Top 5",
    period: "Nov 2024 – Dec 2024",
    icon: Cpu,
    description:
      "Centralized multi-robot navigation system with fault-tolerant orchestration. Dual-layered architecture for 10+ robots with RL-based motion control, achieving 35% faster path planning across 50+ simulations.",
    highlights: [
      "35% reduction in path-finding latency",
      "10+ robot swarm coordination",
      "50+ Gazebo simulations",
    ],
    tools: ["ROS2", "Gazebo", "YOLOv8", "TD3/PPO", "MongoDB", "SLAM"],
    category: "robotics",
    image: "/placeholder.svg",
    github: "",
    live: "",
  },
  {
    num: "03",
    title: "E-Commerce Platform",
    subtitle: "Full-Stack MERN Application",
    period: "May 2025 – Jun 2025",
    icon: ShoppingCart,
    description:
      "Scalable e-commerce ecosystem with JWT-based multi-tier authentication, Cloudinary asset processing, and a React SPA with Context API for global state synchronization.",
    highlights: [
      "Multi-tier Admin/User auth",
      "Razorpay payment integration",
      "Cloudinary asset pipeline",
    ],
    tools: ["MongoDB", "Express.js", "React", "Node.js", "JWT", "Tailwind CSS", "Razorpay"],
    category: "web",
    image: "/placeholder.svg",
    github: "",
    live: "",
  },
  {
    num: "04",
    title: "SentimentSphere",
    subtitle: "Real-Time Emotion Recognition",
    period: "May 2025 – Jun 2025",
    icon: Eye,
    description:
      "Dual-modality emotion detection system — CNN-based facial recognition on FER-2013 and Bi-LSTM text classifier with 300d GloVe embeddings across 7 emotion classes.",
    highlights: [
      "68% facial emotion accuracy (CNN)",
      "63% text emotion accuracy (Bi-LSTM)",
      "Real-time OpenCV deployment",
    ],
    tools: ["Python", "OpenCV", "CNN", "Bi-LSTM", "GloVe", "NLP"],
    category: "ai",
    image: "/placeholder.svg",
    github: "",
    live: "",
  },
  {
    num: "05",
    title: "Network Intrusion Detection",
    subtitle: "ML-Based NIDS",
    period: "Feb 2025 – Apr 2025",
    icon: Shield,
    description:
      "Machine learning pipeline to identify malicious network activities — DoS attacks, unauthorized access — with 90%+ detection accuracy and AUC scores above 0.90.",
    highlights: [
      "90%+ detection accuracy",
      "AUC > 0.90 across models",
      "KDD Cup 99 & NSL-KDD datasets",
    ],
    tools: ["Python", "scikit-learn", "XGBoost", "TensorFlow", "NumPy", "Pandas"],
    category: "ai",
    image: "/placeholder.svg",
    github: "",
    live: "",
  },
  {
    num: "06",
    title: "Accident Detection System",
    subtitle: "Embedded Emergency Alert",
    period: "Sep 2024 – Nov 2024",
    icon: Zap,
    description:
      "Real-time accident detection using accelerometer-based impact analysis. Automated SMS alerts with live GPS coordinates, achieving 95% location accuracy under moving vehicle conditions.",
    highlights: [
      "60% faster emergency response",
      "95% GPS location accuracy",
      "Live Google Maps integration",
    ],
    tools: ["Arduino", "GSM (SIM800L)", "GPS (NEO-6M)", "Embedded C"],
    category: "embedded",
    image: "/placeholder.svg",
    github: "",
    live: "",
  },
];

const categories = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI / ML" },
  { key: "robotics", label: "Robotics" },
  { key: "web", label: "Web" },
  { key: "embedded", label: "Embedded" },
];

const WorkPage = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const filtered = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 md:px-12 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
          // Work & Experience
        </span>
        <h1 className="text-3xl md:text-4xl font-light text-foreground mt-4 tracking-tight">
          Things I've built.
        </h1>
        <p className="text-muted-foreground text-sm mt-2 max-w-lg">
          A mix of AI systems, robotics, full-stack apps, and embedded hardware — from hackathons to internships.
        </p>
      </motion.div>

      {/* Projects Section */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Code2 size={16} className="text-muted-foreground" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
            Projects
          </span>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`font-mono text-[11px] tracking-wider px-4 py-2 rounded-md border transition-all duration-300 ${
                activeCategory === cat.key
                  ? "border-foreground/30 text-foreground bg-accent/60"
                  : "border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project Cards */}
        <div className="space-y-6">
          {filtered.map((project, i) => {
            const Icon = project.icon;
            const isExpanded = expandedProject === project.num;

            return (
              <motion.div
                key={project.num}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onMouseEnter={() => setHovered(project.num)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setExpandedProject(isExpanded ? null : project.num)}
                className="glass-card glow-border p-8 md:p-10 cursor-pointer transition-all duration-500 relative overflow-hidden group"
              >
                {/* Background number */}
                <span
                  className={`font-mono text-7xl md:text-9xl font-bold text-foreground/[0.04] absolute -top-2 right-4 md:right-8 transition-all duration-700 select-none ${
                    hovered === project.num ? "text-foreground/[0.08] scale-105" : ""
                  }`}
                >
                  {project.num}
                </span>

                <div className="relative z-10">
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md border border-border/50 bg-accent/40 flex items-center justify-center">
                        <Icon size={15} className="text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-light text-foreground tracking-tight">
                          {project.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {project.subtitle}
                        </p>
                      </div>
                      {/* GitHub & Live links */}
                      <div className="flex items-center gap-2 ml-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-7 h-7 rounded-md border border-border/50 bg-accent/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
                          >
                            <Github size={14} />
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-7 h-7 rounded-md border border-border/50 bg-accent/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground shrink-0 hidden sm:block">
                      {project.period}
                    </span>
                  </div>

                  {/* Description + Cover Image */}
                  <div className="flex flex-col sm:flex-row gap-5 mt-5">
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {project.description}
                    </p>
                    {project.image && (
                      <div className="shrink-0 w-full sm:w-40 h-28 rounded-lg border border-border/30 bg-accent/20 overflow-hidden">
                        <img
                          src={project.image}
                          alt={`${project.title} cover`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Expanded content */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isExpanded ? "auto" : 0,
                      opacity: isExpanded ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 pt-5 border-t border-border/30">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase block mb-3">
                        Key Highlights
                      </span>
                      <ul className="space-y-1.5 mb-6">
                        {project.highlights.map((h, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                            <span className="text-foreground/40 mt-0.5">→</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Tools */}
                  <div className="mt-5 pt-4 border-t border-border/30">
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="font-mono text-[10px] px-2.5 py-1 border border-border/60 text-muted-foreground rounded bg-accent/30"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expand hint */}
                  <div className="mt-4 flex items-center gap-1.5">
                    <span className="font-mono text-[10px] text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
                      {isExpanded ? "click to collapse" : "click to expand"}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Achievements callout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 glass-card p-8 md:p-10"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase block mb-5">
            Achievements
          </span>
          <div className="space-y-3">
            {[
              "Top 5 at Inter IIT Tech Meet 13.0 — Autonomous Swarm Navigation",
              "1st Place — Pitch Rush: Product Management Hackathon, IIT Jodhpur",
              "Finalist — RowBoatics RC Boat Racing, Techfest IIT Bombay",
              "AIR 393 (B.Arch) & AIR 121 (B.Planning) — JEE Mains",
            ].map((a, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-foreground/30 font-mono text-xs mt-0.5">◆</span>
                <span className="text-sm text-muted-foreground">{a}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WorkPage;
