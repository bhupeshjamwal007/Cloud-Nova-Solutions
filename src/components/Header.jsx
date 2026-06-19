'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import styles from './Header.module.css';
import LazarevCta from './ui/LazarevCta';

export default function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
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
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
          Cloud <span style={{ WebkitTextFillColor: 'initial', color: '#0D6EFD' }}>Nova</span> Solutions
        </Link>
      </div>
      <div className={styles.navLinks}>
        <a href="#portfolio" className={styles.link}>Portfolio</a>
        <a href="#services" className={styles.link}>Services</a>
        <a href="#about" className={styles.link}>About</a>
      </div>
      <LazarevCta href="/contact" text="Discuss With Us" />
    </motion.header>
  );
}
