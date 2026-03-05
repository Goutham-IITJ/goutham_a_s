import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/work", label: "Work" },
  { to: "/contact", label: "Contact" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 z-50 glassmorphic border-b border-border">
        <div className="container flex items-center justify-between h-14 px-6 max-w-7xl mx-auto">
          <Link to="/" className="font-mono text-sm tracking-widest text-foreground hover:text-primary transition-colors duration-300">
            [P_]
          </Link>
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-mono text-xs tracking-wider uppercase transition-colors duration-300 ${
                  location.pathname === link.to
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Page content */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  );
};

export default Layout;
