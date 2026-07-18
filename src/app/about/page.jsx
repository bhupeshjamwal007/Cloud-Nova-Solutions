'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Header from "@/components/Header";
import { CinematicFooter } from "@/components/ui/motion-footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import LazarevCta from "@/components/ui/LazarevCta";
import styles from './AboutPage.module.css';
import ShaderRipple from "@/components/ui/ShaderRipple";
import CrystalTrailBackground from "@/components/ui/crystal-trail-background";

export default function AboutPage() {
  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  // Block fade slide up animation
  const blockVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: {
        type: "spring",
        bounce: 0.2,
        duration: 0.8
      }
    }
  };

  const features = [
    {
      title: "360-Degree Expertise",
      text: "From first-impression logo design to backend database architecture, we manage the entire lifecycle of your digital product."
    },
    {
      title: "Modern & Scalable Tech Stack",
      text: "We leverage industry-leading tools—like React for responsive web platforms and Flutter for seamless iOS and Android apps—to ensure your solutions are built for the future."
    },
    {
      title: "Agile & Transparent Process",
      text: "We believe in clear communication, iterative progress, and collaborative development. You are involved and informed at every stage of the build."
    },
    {
      title: "Performance-Driven Quality",
      text: "Whether it is an online enterprise software or an interactive mobile game, we prioritize speed, security, and rock-solid reliability."
    }
  ];

  return (
    <div className="relative w-full overflow-x-hidden bg-black">
      <main className="relative z-10 w-full bg-black flex flex-col rounded-b-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-b border-[rgba(255,255,255,0.1)]">
        <Header />
        
        <section className={styles.aboutPage}>
          {/* Floating & Spinning Background Logo */}
          <div className={styles.logoBackground}>
            <ShaderRipple />
            <img src="/cns-logo.png" alt="Cloud Nova Background Logo" className={styles.floatingSpinningLogo} />
          </div>

          <div className={styles.container}>
            {/* Header Content */}
            <motion.div 
              className={styles.header}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className={styles.title}>About Cloud Nova Solution</h1>
              <p className={styles.subtitle}>
                At Cloud Nova Solution, we believe that digital transformation should be limitless. We are a dynamic team of developers, designers, and strategists dedicated to turning bold ideas into high-performing digital realities. Whether you are an ambitious startup or an established enterprise, we provide the technical architecture and creative firepower needed to stand out in today's digital landscape.
              </p>
            </motion.div>

            {/* Who We Are & Our Mission Pillar split */}
            <motion.div 
              className={styles.pillarSplit}
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div className={styles.pillarCard} variants={blockVariants}>
                <div className={styles.pillarGlow} />
                <h2 className={styles.pillarTitle}>Who We Are</h2>
                <p className={styles.pillarText}>
                  Founded on the principles of innovation and engineering excellence, Cloud Nova Solution is a full-stack digital agency. We bridge the gap between complex technology and intuitive user experiences. Our multidisciplinary team combines deep technical expertise in modern web frameworks, cross-platform mobile app deployment, custom software engineering, and visual branding to deliver end-to-end solutions under one roof.
                </p>
              </motion.div>

              <motion.div className={styles.pillarCard} variants={blockVariants}>
                <div className={styles.pillarGlow} />
                <h2 className={styles.pillarTitle}>Our Mission</h2>
                <p className={styles.pillarText}>
                  Our mission is simple: to empower businesses through scalable, forward-thinking technology. We strive to eliminate the friction between your goals and your technical capabilities by delivering tailored software, captivating games, and memorable brand identities that drive real, measurable growth.
                </p>
              </motion.div>
            </motion.div>

            {/* What Sets Us Apart Section */}
            <div className={styles.apartSection}>
              <motion.h2 
                className={styles.sectionHeading}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
              >
                What Sets Us Apart
              </motion.h2>

              <motion.div 
                className={styles.featuresGrid}
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
              >
                {features.map((feature, idx) => (
                  <motion.div key={idx} className={styles.featureCard} variants={blockVariants}>
                    <div className={styles.featureGlow} />
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureText}>{feature.text}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Our Approach to Innovation Section */}
            <motion.div 
              className={styles.approachSection}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className={styles.approachTitle}>Our Approach to Innovation</h2>
              <p className={styles.approachText}>
                We recognize that every business has a unique operational fingerprint. That is why we reject one-size-fits-all templates. When we build an offline desktop application, design a high-converting e-commerce web layout, or develop a mobile game, we tailor the architecture specifically to your target audience and operational needs.
              </p>
            </motion.div>

            {/* Call To Action Block */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              className="w-full"
            >
              <CrystalTrailBackground className={styles.ctaSection}>
                <h2 
                  className={styles.ctaTitle}
                  style={{ textShadow: "0 0 5px #0D6EFD, 0 0 12px rgba(13,110,253,0.75)" }}
                >
                  Let’s Build the Future Together
                </h2>
                <p className={styles.ctaText}>
                  Your vision deserves a partner capable of executing it without compromise. Connect with the team at Cloud Nova Solution today, and let us help you build your next great digital experience.
                </p>
                <div className="mt-4">
                  <LazarevCta href="/contact" text="Contact Us" />
                </div>
              </CrystalTrailBackground>
            </motion.div>

          </div>
        </section>

      </main>

      <CinematicFooter />
      <FloatingWhatsApp />
    </div>
  );
}
