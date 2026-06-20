'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import styles from './Header.module.css';
import LazarevCta from './ui/LazarevCta';

export default function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.header 
        className={styles.navContainer}
        variants={{
          visible: { y: 0, x: "-50%" },
          hidden: { y: "-150%", x: "-50%" },
        }}
        initial="visible"
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        <div className={styles.logo}>
          <Link href="/" onClick={closeMenu} style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
            Cloud <span style={{ WebkitTextFillColor: 'initial', color: '#0D6EFD' }}>Nova</span> Solution
          </Link>
        </div>
        
        <div className={styles.navLinks}>
          <a href="/#portfolio" className={styles.link}>Portfolio</a>
          <a href="/#services" className={styles.link}>Services</a>
          <a href="/#about" className={styles.link}>About</a>
        </div>

        <div className="flex items-center gap-4">
          <LazarevCta href="/contact" text="Contact Us" className={styles.desktopCta} onClick={closeMenu} />
          
          {/* Mobile Hamburger Button */}
          <button 
            className={styles.hamburger} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={styles.hamburgerLine} style={{ transform: isMobileMenuOpen ? 'rotate(45deg)' : 'rotate(0)' }} />
            <div className={styles.hamburgerLine} style={{ opacity: isMobileMenuOpen ? 0 : 1, transform: isMobileMenuOpen ? 'translateX(20px)' : 'translateX(0)' }} />
            <div className={styles.hamburgerLine} style={{ transform: isMobileMenuOpen ? 'rotate(-45deg)' : 'rotate(0)' }} />
          </button>
        </div>
      </motion.header>

      {/* Full Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={styles.mobileMenuOverlay}
          >
            <Link href="/#portfolio" className={styles.mobileLink} onClick={closeMenu}>Portfolio</Link>
            <Link href="/#services" className={styles.mobileLink} onClick={closeMenu}>Services</Link>
            <Link href="/#about" className={styles.mobileLink} onClick={closeMenu}>About</Link>
            <div className="mt-8">
              <LazarevCta href="/contact" text="Contact Us" onClick={closeMenu} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
