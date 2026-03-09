import { motion } from "framer-motion";
import { useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageSquare,
  CheckCircle,
  Code2,
} from "lucide-react";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 relative pt-24 pb-20 sm:pt-28 sm:pb-16">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left – Send Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-6 sm:p-8"
        >
          <h2 className="font-mono text-lg sm:text-xl text-foreground font-semibold mb-1 tracking-wide">
            Send Message
          </h2>
          <p className="text-xs text-muted-foreground mb-6">
            Fill out the form below and I'll get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase block mb-2">
                  Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-accent/30 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-foreground font-mono outline-none focus:border-foreground/40 focus:shadow-[0_0_15px_-4px_hsla(0,0%,100%,0.1)] transition-all duration-300 placeholder:text-muted-foreground/50"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase block mb-2">
                  Email <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-accent/30 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-foreground font-mono outline-none focus:border-foreground/40 focus:shadow-[0_0_15px_-4px_hsla(0,0%,100%,0.1)] transition-all duration-300 placeholder:text-muted-foreground/50"
                />
              </div>
            </div>
            <div>
              <label className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase block mb-2">
                Message <span className="text-primary">*</span>
              </label>
              <textarea
                rows={5}
                placeholder="Tell me about your project, opportunity, or just say hello..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-accent/30 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-foreground font-mono outline-none focus:border-foreground/40 focus:shadow-[0_0_15px_-4px_hsla(0,0%,100%,0.1)] transition-all duration-300 resize-none placeholder:text-muted-foreground/50"
              />
            </div>
            <button
              type="submit"
              className="font-mono text-xs tracking-[0.15em] uppercase border border-primary/50 rounded-lg px-6 py-3 text-primary-foreground bg-primary/80 hover:bg-primary hover:shadow-[0_0_20px_-6px_hsl(var(--primary)/0.4)] transition-all duration-300 w-full flex items-center justify-center gap-2"
            >
              <Send size={14} />
              Send Message
            </button>
          </form>

          {/* Info bullets */}
          <div className="mt-6 pt-4 border-t border-border/30 space-y-2.5">
            {[
              { icon: Clock, text: "Usually responds within 24 hours" },
              { icon: MessageSquare, text: "Open to collaboration and opportunities" },
              { icon: CheckCircle, text: "Available for freelance projects" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2.5 text-muted-foreground">
                <item.icon size={14} className="text-primary/70 shrink-0" />
                <span className="text-xs">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-6 sm:p-8"
          >
            <h2 className="font-mono text-lg sm:text-xl text-foreground font-semibold mb-5 tracking-wide">
              Contact Information
            </h2>
            <div className="space-y-5">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  value: "b23ee1024@iitj.ac.in",
                  href: "mailto:b23ee1024@iitj.ac.in",
                  sub: "Best way to reach me",
                },
                {
                  icon: Phone,
                  title: "Phone",
                  value: "+91-7994655634",
                  href: "tel:+917994655634",
                  sub: "Available Mon-Fri, 9AM–6PM IST",
                },
                {
                  icon: MapPin,
                  title: "Location",
                  value: "IIT Jodhpur, Rajasthan",
                  href: undefined,
                  sub: "Currently based at",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-border/50 bg-accent/20 flex items-center justify-center shrink-0">
                    <item.icon size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-primary hover:underline"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm text-primary">{item.value}</span>
                    )}
                    <p className="text-[11px] text-muted-foreground mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Connect Online */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-6 sm:p-8"
          >
            <h2 className="font-mono text-lg sm:text-xl text-foreground font-semibold mb-5 tracking-wide">
              Connect Online
            </h2>
            <div className="space-y-4">
              {[
                {
                  icon: Linkedin,
                  title: "LinkedIn",
                  handle: "@goutham-a-s",
                  href: "https://linkedin.com/in/goutham-a-s",
                  sub: "Professional network",
                },
                {
                  icon: Github,
                  title: "GitHub",
                  handle: "@Goutham-IITJ",
                  href: "https://github.com/Goutham-IITJ",
                  sub: "Code repositories",
                },
                {
                  icon: Code2,
                  title: "LeetCode",
                  handle: "@goutham99",
                  href: "https://leetcode.com/goutham99",
                  sub: "Algorithm practice & problem solving",
                },
              ].map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full border border-border/50 bg-accent/20 flex items-center justify-center shrink-0 group-hover:border-foreground/30 group-hover:shadow-[0_0_20px_-6px_hsla(0,0%,100%,0.15)] transition-all duration-300">
                    <item.icon size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm text-primary group-hover:underline">{item.handle}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{item.sub}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 text-center">
        <span className="font-mono text-[10px] text-muted-foreground tracking-wider">
          Designed and Engineered by Goutham// 2026
        </span>
      </div>
    </div>
  );
};

export default ContactPage;
