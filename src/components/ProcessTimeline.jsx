'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './ProcessTimeline.module.css';

const phases = [
  {
    title: "Product strategy",
    steps: ["Strategy workshops", "Idea validation", "Market research", "Product positioning", "UX research", "Functional decomposition"]
  },
  {
    title: "UX design",
    steps: ["User flows", "Prototyping", "Information architecture", "Wireframing"]
  },
  {
    title: "UI design",
    steps: ["Moodboards", "Visual design", "Design systems", "Hand-off"]
  },
  {
    title: "Delivery",
    steps: ["Frontend dev", "Backend dev", "Quality assurance", "Launch"]
  }
];

export default function ProcessTimeline() {
  const containerRef = useRef(null);
  
  // Track the scroll progress as the timeline section passes through the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Calculate global index to keep the numbers ascending across columns
  let globalStepCounter = 0;

  return (
    <section className={styles.timelineSection} ref={containerRef}>
      <div className={styles.container}>
        {phases.map((phase, colIndex) => {
          return (
            <div key={colIndex} className={styles.column}>
              <div className={styles.columnHeader}>
                {phase.title}
              </div>
              <div className={styles.pillsContainer}>
                {phase.steps.map((step, localIndex) => {
                  globalStepCounter++;
                  
                  // This hook ties the horizontal position of each pill to the scroll progress.
                  // It starts at 0 (straight line) and moves to `localIndex * 40px` (staircase).
                  const xOffset = useTransform(
                    scrollYProgress, 
                    [0, 1], 
                    [0, localIndex * 45]
                  );

                  return (
                    <motion.div 
                      key={step} 
                      className={styles.pill}
                      style={{ x: xOffset }}
                    >
                      <div className={styles.pillNumber}>
                        {globalStepCounter}
                      </div>
                      <div className={styles.pillText}>
                        {step}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
