import { motion } from "framer-motion";
import { useState } from "react";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="w-full max-w-lg glassmorphic border border-border p-8 md:p-10"
      >
        {/* Terminal bar */}
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
          <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
          <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/10" />
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
              className="w-full bg-transparent border border-border px-4 py-2.5 text-sm text-foreground font-mono outline-none focus:border-foreground transition-colors duration-300"
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
              className="w-full bg-transparent border border-border px-4 py-2.5 text-sm text-foreground font-mono outline-none focus:border-foreground transition-colors duration-300"
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
              className="w-full bg-transparent border border-border px-4 py-2.5 text-sm text-foreground font-mono outline-none focus:border-foreground transition-colors duration-300 resize-none"
            />
          </div>
          <button
            type="submit"
            className="font-mono text-xs tracking-[0.2em] uppercase border border-border px-6 py-3 text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300 w-full"
          >
            Transmit
          </button>
        </form>

        {/* Links */}
        <div className="mt-8 pt-4 border-t border-border flex gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            github://
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            linkedin://
          </a>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <span className="font-mono text-[10px] text-muted-foreground tracking-wider">
          Designed and Engineered by Goutham// 2026
        </span>
      </div>
    </div>
  );
};

export default ContactPage;
