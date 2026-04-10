import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, type Variants } from "framer-motion";

interface NavItem {
  href: string;
  label: string;
}

interface Props {
  navItems: NavItem[];
  lang: string;
  languageLinks: Record<string, string>;
  languages: Record<string, string>;
  labels: {
    logoMain: string;
    logoSub: string;
    toggleMenu: string;
  };
  logoUrl: string;
}

const NavbarContainer: React.FC<Props> = ({ navItems, lang, languageLinks, languages, labels, logoUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const scrollDelta = latest - previous;
    
    // Smooth threshold for appearance
    if (Math.abs(scrollDelta) < 10) return;

    if (latest > 100 && scrollDelta > 0) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  });

  const toggleMenu = () => setIsOpen(!isOpen);

  // Body scroll toggle
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isOpen]);

  const navVariants: Variants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: -100, opacity: 0 },
  };



  const handleLanguageChange = (targetLang: string) => {
    localStorage.setItem('ciluc_lang', targetLang);
  };

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      x: "100%",
    },
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    closed: { opacity: 0, x: 20 },
    opened: { opacity: 1, x: 0 },
  };

  return (
    <motion.nav
      className="navbar-wrapper"
      variants={navVariants}
      animate={isVisible || isOpen ? "visible" : "hidden"}
      initial="visible"
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="container nav-content">
        <a href={navItems[0]?.href || "#"} className="logo">
          <img src={logoUrl} alt="FESA Logo" className="logo-img" />
        </a>

        {/* Desktop Nav */}
        <div className="nav-links-desktop">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}

          <div className="lang-switcher-nav">
            {Object.entries(languages).map(
              ([l, label]) =>
                lang !== l && (
                  <a 
                    key={l} 
                    href={languageLinks[l] || '#'} 
                    className="btn-lang-nav"
                    onClick={() => handleLanguageChange(l)}
                  >
                    {l.toUpperCase()}
                  </a>
                )
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`mobile-toggle-btn ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label={labels.toggleMenu}
        >
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial="closed"
            animate="opened"
            exit="closed"
            variants={menuVariants}
          >
            <div className="mobile-menu-content">
              {navItems.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="mobile-nav-link"
                  variants={itemVariants}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}

              <motion.div className="mobile-lang-switcher" variants={itemVariants}>
                {Object.entries(languages).map(([l, label]) => (
                  <a
                    key={l}
                    href={languageLinks[l] || '#'}
                    className={`mobile-btn-lang ${lang === l ? "active" : ""}`}
                    onClick={() => {
                      handleLanguageChange(l);
                      setIsOpen(false);
                    }}
                  >
                    {label}
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavbarContainer;
