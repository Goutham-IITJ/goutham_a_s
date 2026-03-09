import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

const socialLinks = [
  { href: "https://github.com", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://x.com", icon: Twitter, label: "X" },
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
];

const SocialDock = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="fixed bottom-6 sm:bottom-12 right-4 sm:right-6 md:right-12 z-40 flex gap-2 sm:gap-3"
    >
      {socialLinks.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-border/50 bg-accent/20 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:shadow-[0_0_20px_-6px_hsla(0,0%,100%,0.15)] transition-all duration-300"
        >
          <s.icon size={14} />
        </a>
      ))}
    </motion.div>
  );
};

export default SocialDock;
