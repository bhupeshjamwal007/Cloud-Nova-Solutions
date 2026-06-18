'use client';
import React from 'react';
import { motion } from 'framer-motion';
import styles from './FounderSection.module.css';

export default function FounderSection() {
  return (
    <section className={styles.founderSection}>
      <div className={styles.container}>
        
        {/* Top Area: Quote and Founder Info */}
        <div className={styles.topSection}>
          <motion.h2 
            className={styles.quote}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            "Last but not least — we embrace partnership mentality."
          </motion.h2>

          <motion.div 
            className={styles.founderInfo}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.photoWrapper}>
              <img src="/images/bhupesh-headshot.png" alt="Bhupesh Singh Jamwal" className={styles.founderPhoto} />
            </div>
            <div>
              <h3 className={styles.founderName}>Bhupesh Singh Jamwal</h3>
              <p className={styles.founderTitle}>Founder of Cloud Nova Solutions</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Area: Mission and Vision */}
        <div className={styles.bottomSection}>
          <motion.div 
            className={styles.infoBlock}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.blockTitle}>Our Mission</span>
            <p className={styles.blockText}>
              To empower visionary brands by engineering digital products that blur the line between flawless functionality and breathtaking design. We don't just write code; we build the digital infrastructure for market leaders.
            </p>
          </motion.div>

          <motion.div 
            className={styles.infoBlock}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.blockTitle}>Our Vision</span>
            <p className={styles.blockText}>
              To be the vanguard of digital innovation, where AI technology and creative audacity converge. We envision a future where our hyper-scalable solutions drive the most ambitious ideas from pre-seed to global dominance.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
