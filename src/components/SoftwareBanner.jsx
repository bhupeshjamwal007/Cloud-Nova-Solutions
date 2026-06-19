import React from 'react';
import TubesCursorBackground from './ui/tube-cursor-background';
import LazarevCta from './ui/LazarevCta';
import styles from './SoftwareBanner.module.css';

export default function SoftwareBanner() {
  return (
    <section className={styles.bannerContainer}>
      <div className={styles.shaderWrapper}>
        <TubesCursorBackground enableRandomizeOnClick={true} />
      </div>

      <div className={styles.content}>
        <div className={styles.glassCard}>
          <span className={styles.subtitle}>Enterprise Software</span>
          <h2 className={styles.title}>Offline Power.<br/>Cloud Scalability.</h2>
          <p className={styles.description}>
            We engineer robust, offline-capable desktop applications and infinitely scalable cloud platforms tailored perfectly to your business logic. Built for extreme performance and absolute security.
          </p>
          <LazarevCta text="Develop With Us" href="/contact" />
        </div>
      </div>
    </section>
  );
}
