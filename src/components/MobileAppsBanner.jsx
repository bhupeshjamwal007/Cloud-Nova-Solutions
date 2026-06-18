import React from 'react';
import InteractiveNeuralVortex from './ui/interactive-neural-vortex-background';
import LazarevCta from './ui/LazarevCta';
import styles from './MobileAppsBanner.module.css';

export default function MobileAppsBanner() {
  return (
    <section className={styles.bannerContainer}>
      <div className={styles.shaderWrapper}>
        <InteractiveNeuralVortex />
      </div>

      <div className={styles.content}>
        <div className={styles.glassCard}>
          <span className={styles.subtitle}>Mobile App Development</span>
          <h2 className={styles.title}>Next-Gen Mobile Experiences</h2>
          <p className={styles.description}>
            We engineer high-performance iOS and Android applications. From complex neural networks to seamless everyday utilities, our apps are designed to captivate users and dominate the market.
          </p>
          <LazarevCta text="Build Your App" href="#contact" />
        </div>
      </div>
    </section>
  );
}
