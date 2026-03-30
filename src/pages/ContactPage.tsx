import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Github, Linkedin, Twitter, Instagram, Mail, Phone } from "lucide-react";
import emailjs from '@emailjs/browser';

const ContactPage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID, 
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID, 
      formRef.current!, 
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        alert("Transmission successful. I'll get back to you soon!");
        setForm({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("FAILED...", error);
        alert("Transmission failed. Please use the direct email links provided.");
      })
      .finally(() => setIsSending(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 relative pt-24 pb-16">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-stretch">
        
        {/* Left Side: Direct Contact Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1 glass-card p-6 sm:p-10 flex flex-col justify-between border border-border/40 bg-accent/5 backdrop-blur-md rounded-xl"
        >
          <div>
            {/* Added matching terminal header */}
            <div className="flex items-center gap-2 mb-8 pb-4 border-b border-border/20">
              <div className="w-2 h-2 rounded-full bg-blue-500/50" />
              <div className="w-2 h-2 rounded-full bg-purple-500/50" />
              <span className="font-mono text-[10px] text-muted-foreground ml-3 uppercase tracking-tighter">Direct_Access.sys</span>
            </div>

            <div className="space-y-8">
              <div className="group">
                <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                  Primary_Node
                </p>
                <a href="mailto:gouthamas10@example.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors ml-3.5">
                  <Mail size={16} />
                  <span className="font-mono text-sm">gouthamas369@gmail.com</span>
                </a>
              </div>

              <div className="group">
                <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                  Secondary_Node
                </p>
                <a href="mailto:goutham.iitj@email.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors ml-3.5">
                  <Mail size={16} />
                  <span className="font-mono text-sm">b23ee1024@iitj.ac.in</span>
                </a>
              </div>

              <div className="group">
                <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                  Voice_Comms
                </p>
                <div className="flex items-center gap-3 text-muted-foreground ml-3.5">
                  <Phone size={16} />
                  <span className="font-mono text-sm">+91 79946 55634</span>
                </div>
              </div>
            </div>
          </div>

          {/* Redesigned Social Grid -> Network Links */}
          <div className="mt-12 pt-8 border-t border-border/20">
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-4">Network_Links</p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "GitHub", href: "https://github.com/Goutham-IITJ", icon: <Github size={16} /> },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/gouthamas10/", icon: <Linkedin size={16} /> },
                { label: "X_Twitter", href: "https://x.com/GouthamAS_", icon: <Twitter size={16} /> },
                { label: "Instagram", href: "https://www.instagram.com/goutham_.as/", icon: <Instagram size={16} /> },
              ].map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border/40 bg-accent/5 text-muted-foreground hover:text-foreground hover:bg-accent/20 hover:border-foreground/30 transition-all duration-300"
                >
                  <span className="opacity-70 group-hover:opacity-100 transition-opacity">{s.icon}</span>
                  <span className="font-mono text-xs tracking-widest uppercase">{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Side: Messaging Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-[1.2] glass-card p-6 sm:p-10 border border-border/40 bg-accent/5 backdrop-blur-md rounded-xl"
        >
          <div className="flex items-center gap-2 mb-8 pb-4 border-b border-border/20">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
            <div className="w-2 h-2 rounded-full bg-green-500/50" />
            <span className="font-mono text-[10px] text-muted-foreground ml-3 uppercase tracking-tighter">Secure_Transmission_v2.sh</span>
          </div>

          <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">User_ID</label>
                <input
                  name="user_name"
                  type="text"
                  required
                  placeholder="Identification..."
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-accent/10 border border-border/50 rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:border-foreground/30 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Return_Address</label>
                <input
                  name="user_email"
                  type="email"
                  required
                  placeholder="email@node.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-accent/10 border border-border/50 rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:border-foreground/30 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Payload</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Enter message data..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-accent/10 border border-border/50 rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:border-foreground/30 transition-colors resize-none"
                />
              </div>
            </div>

            <button
              disabled={isSending}
              type="submit"
              className="font-mono text-xs tracking-[0.2em] uppercase border border-border/50 rounded-lg px-6 py-4 text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-all duration-300 w-full bg-accent/20 disabled:opacity-50"
            >
              {isSending ? "Transmitting..." : "Execute_Transmission"}
            </button>
          </form>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
        <span className="font-mono text-[10px] text-muted-foreground tracking-widest opacity-30">
          PORTFOLIO_SYSTEM_CORE // 2026
        </span>
      </div>
    </div>
  );
};

export default ContactPage;