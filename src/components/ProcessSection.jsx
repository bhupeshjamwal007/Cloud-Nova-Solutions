'use client';
import React from 'react';
import { motion } from 'framer-motion';
import styles from './ProcessSection.module.css';

export default function ProcessSection() {
  return (
    <section className={styles.processSection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.titleContainer}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className={styles.title}>
            Digital product <br />
            design process
          </h2>
        </motion.div>

        <div className={styles.contentContainer}>
          <motion.p 
            className={styles.paragraph}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            We do not take on projects that involve blind conformity or designing out of context. We won't settle for a user interface design that is misaligned with your product and digital strategy. Neither will we launch web development ventures without user testing to validate our design solutions.
          </motion.p>

          <motion.p 
            className={styles.paragraph}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Instead, we create scalable digital products that meet the ever-evolving demands of our customers, ensuring long-term sustainability.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
