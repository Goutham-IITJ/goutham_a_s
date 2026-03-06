import { motion } from "framer-motion";
import { useState } from "react";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 relative pt-20 pb-16 sm:pt-0 sm:pb-0">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="w-full max-w-lg glass-card p-6 sm:p-8 md:p-10"
      >
        {/* Terminal bar */}
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border/40">
          <div className="w-2.5 h-2.5 rounded-full bg-foreground/30" />
          <div className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
          <span className="font-mono text-[10px] text-muted-foreground ml-3 tracking-wider">
            contact.sh
          </span>
        </div>

        <p className="font-mono text-xs text-muted-foreground mb-8">
          <span className="text-foreground">{">"}</span> initiate_contact --target goutham
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase block mb-2">
              Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-accent/30 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-foreground font-mono outline-none focus:border-foreground/40 focus:shadow-[0_0_15px_-4px_hsla(0,0%,100%,0.1)] transition-all duration-300"
            />
          </div>
          <div>
            <label className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase block mb-2">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-accent/30 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-foreground font-mono outline-none focus:border-foreground/40 focus:shadow-[0_0_15px_-4px_hsla(0,0%,100%,0.1)] transition-all duration-300"
            />
          </div>
          <div>
            <label className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase block mb-2">
              Message
            </label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-accent/30 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-foreground font-mono outline-none focus:border-foreground/40 focus:shadow-[0_0_15px_-4px_hsla(0,0%,100%,0.1)] transition-all duration-300 resize-none"
            />
          </div>
          <button
            type="submit"
            className="font-mono text-xs tracking-[0.2em] uppercase border border-border/50 rounded-lg px-6 py-3 text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:shadow-[0_0_20px_-6px_hsla(0,0%,100%,0.12)] transition-all duration-300 w-full bg-accent/20"
          >
            Transmit
          </button>
        </form>

        {/* Social Icons */}
        <div className="mt-8 pt-4 border-t border-border/40 flex gap-4">
          {[
            { href: "https://github.com", icon: <Github size={18} />, label: "GitHub" },
            { href: "https://linkedin.com", icon: <Linkedin size={18} />, label: "LinkedIn" },
            { href: "https://x.com", icon: <Twitter size={18} />, label: "X" },
            { href: "https://instagram.com", icon: <Instagram size={18} />, label: "Instagram" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-10 h-10 rounded-full border border-border/50 bg-accent/20 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:shadow-[0_0_20px_-6px_hsla(0,0%,100%,0.15)] transition-all duration-300"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-6 left-0 right-0 text-center">
        <span className="font-mono text-[10px] text-muted-foreground tracking-wider">
          Designed and Engineered by Goutham// 2026
        </span>
      </div>
    </div>
  );
};

export default ContactPage;
