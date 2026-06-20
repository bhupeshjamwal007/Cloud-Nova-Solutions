'use client';
import React from 'react';
import { motion } from 'framer-motion';
import styles from './ManifestoSection.module.css';

export default function ManifestoSection() {
  return (
    <section className={styles.manifestoSection}>
      <div className={styles.container}>
        <motion.h2 
          className={styles.hugeTitle}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Digital engineering agency <br />
          of passionate forerunners
        </motion.h2>

        <motion.div
          className={styles.brandName}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Cloud Nova Solution.
        </motion.div>

        <div className={styles.grid}>
          <motion.p 
            className={styles.paragraph}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            The powerhouse of AI tech, creative audacity, and flawless engineering. We work with everything digital, helping you turn innovative ideas into profitable, market-dominating businesses.
          </motion.p>
          
          <motion.p 
            className={styles.paragraph}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            We engineer the digital future. Our elite squad transforms complex concepts into breathtaking mobile applications, robust enterprise software, and hyper-scalable web platforms. From the initial architecture to post-launch optimization, we write the code that powers your growth from pre-seed to Series D and beyond.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
