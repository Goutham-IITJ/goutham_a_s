import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ChevronDown, Activity, Code2, Database } from "lucide-react";

// Define the shape of your project data
export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  date: string;
  shortDescription: string;
  longDescription: string[]; // Array for multiple paragraphs/points
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  category: "AI / ML" | "Robotics" | "Web" | "Embedded";
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to pick an icon based on category (optional, but adds flair)
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "AI / ML": return <Activity size={16} className="text-primary" />;
      case "Web": return <Code2 size={16} className="text-blue-400" />;
      case "Robotics": return <Database size={16} className="text-green-400" />;
      default: return <Database size={16} className="text-muted-foreground" />;
    }
  };

  return (
    <motion.div
      layout
      className="relative w-full border border-border/40 rounded-xl bg-accent/5 backdrop-blur-sm overflow-hidden group transition-colors hover:border-border/80"
    >
      {/* Giant Faded Number Background */}
      <div className="absolute right-8 -top-4 text-[120px] font-mono font-bold text-foreground/[0.03] select-none pointer-events-none z-0 transition-opacity group-hover:text-foreground/[0.05]">
        {project.number}
      </div>

      <div className="relative z-10 p-6 sm:p-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              {getCategoryIcon(project.category)}
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
                {project.title}
              </h3>
            </div>
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
              {project.subtitle}
            </p>
          </div>
          <div className="font-mono text-[10px] tracking-widest text-muted-foreground/60 whitespace-nowrap">
            {project.date}
          </div>
        </div>

        {/* Short Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-3xl">
          {project.shortDescription}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase border border-border/50 rounded bg-background/50 text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Bar (Expand Toggle + Links) */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/20">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors group/btn"
          >
            <ChevronDown 
              size={14} 
              className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : "group-hover/btn:translate-y-0.5"}`} 
            />
            {isExpanded ? "Collapse_Details" : "Expand_Details"}
          </button>

          <div className="flex gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github size={14} /> Code
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink size={14} /> Demo
              </a>
            )}
          </div>
        </div>

        {/* Expandable Content Area */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-8 mt-2 border-t border-border/10">
                 {/* This is where you can put detailed bullet points, images, or architecture diagrams */}
                 <div className="space-y-4">
                    {project.longDescription.map((desc, idx) => (
                      <div key={idx} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                        <span className="text-primary/50 font-mono mt-0.5">{">"}</span>
                        <p>{desc}</p>
                      </div>
                    ))}
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
};

export default ProjectCard;