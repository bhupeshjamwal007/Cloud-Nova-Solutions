'use client';
import React from 'react';
import { useShaderBackground } from './ui/animated-shader-hero';
import LazarevCta from './ui/LazarevCta';
import styles from './WebDevBanner.module.css';

export default function WebDevBanner() {
  const canvasRef = useShaderBackground();

  return (
    <section className={styles.bannerSection}>
      <div className={styles.bannerCard}>
        <canvas
          ref={canvasRef}
          className={styles.shaderCanvas}
        />
        <div className={styles.cardContent}>
        
        <h2 className={styles.title}>
          State-of-the-Art <br />
          <span className={styles.highlight}>Web Development</span>
        </h2>

        <p className={styles.description}>
          We build blazing-fast, highly scalable, and visually stunning web applications. From custom React frontends to robust cloud architectures, we transform complex ideas into seamless digital experiences that drive real business growth.
        </p>

        <div className={styles.featuresGrid}>
          <div className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Modern Architecture</h3>
            <p className={styles.featureDesc}>Next.js, React, and serverless edge computing for maximum performance.</p>
          </div>
          <div className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Premium UI/UX</h3>
            <p className={styles.featureDesc}>Immersive, animated, and responsive designs that captivate users instantly.</p>
          </div>
          <div className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Cloud Scalability</h3>
            <p className={styles.featureDesc}>Enterprise-grade backend solutions tailored to grow dynamically with your user base.</p>
          </div>
        </div>

        <LazarevCta text="Start a Project" />
        </div>

      </div>
    </section>
  );
}
