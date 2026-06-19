'use client';
import { useState, useEffect } from 'react';
import styles from './Hero.module.css';
import SpotlightBackground from '@/components/ui/spotlight-background';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "Cloud Nova Solutions";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 100); // Speed of typing in ms

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContentWrapper}>
        <SpotlightBackground>
          <div className={styles.overlay} style={{ position: 'relative', zIndex: 30 }}>
            <img src="/cns-logo.png" alt="Cloud Nova Solution Logo" className={styles.heroLogo} />
            <h1 className={styles.mainTitle}>
              <span className={styles.typewriterText}>{typedText}</span>
              {isTyping && <span className={styles.cursor}>|</span>}
              &nbsp;is a technology-driven company specializing in modern 
              website development, mobile applications, cloud solutions, and AI-powered digital transformation.
            </h1>
            <p className={styles.subTitle}>
              We believe in transforming your ideas to digital growth.
            </p>
          </div>
        </SpotlightBackground>
      </div>

      <div className={styles.marqueeContainer}>
        <span className={styles.marqueeText}>
          THINK → INNOVATE → BUILD → SCALE → GROWTH
        </span>
      </div>
    </section>
  );
}
