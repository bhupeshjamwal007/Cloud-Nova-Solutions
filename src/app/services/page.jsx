'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Header from "@/components/Header";
import { CinematicFooter } from "@/components/ui/motion-footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import LazarevCta from "@/components/ui/LazarevCta";
import styles from './ServicesPage.module.css';
import ShaderRipple from "@/components/ui/ShaderRipple";
import CrystalTrailBackground from "@/components/ui/crystal-trail-background";

export default function ServicesPage() {
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

  // Card slide up animation
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.2,
        duration: 0.8
      }
    }
  };

  const services = [
    {
      title: "Web Development & Design",
      description: "Your website is your digital storefront. We build lightning-fast, scalable, and visually stunning web platforms tailored to your business goals. From initial concept to deployment, we deliver web experiences that captivate and convert.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      ),
      subservices: [
        {
          title: "UI/UX Layout & Prototyping",
          desc: "Crafting intuitive user journeys, wireframes, and beautiful layouts that keep your audience engaged."
        },
        {
          title: "Modern Web Engineering",
          desc: "Building responsive, dynamic sites utilizing robust modern frameworks like React for a flawless, interactive user experience."
        },
        {
          title: "E-Commerce Solutions",
          desc: "Designing secure, optimized online stores built to drive sales and handle high traffic seamlessly."
        },
        {
          title: "Performance Optimization",
          desc: "Ensuring rapid load times, smooth navigation, and top-tier SEO architecture across all devices."
        }
      ]
    },
    {
      title: "Mobile App & Game Development",
      description: "Reach your users wherever they are with powerful, engaging mobile applications. We specialize in bringing high-performance utilities and immersive gaming experiences straight to the palm of your hand.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
        </svg>
      ),
      subservices: [
        {
          title: "Cross-Platform Excellence",
          desc: "Utilizing Flutter to deploy seamless, native-feeling applications across both Android and iOS from a single codebase."
        },
        {
          title: "Mobile Game Development",
          desc: "Bringing thrilling game concepts to life with captivating graphics, smooth mechanics, and engaging gameplay loops."
        },
        {
          title: "Custom Enterprise Apps",
          desc: "Developing secure, scalable mobile applications designed to streamline your internal business operations."
        },
        {
          title: "App Maintenance & Updates",
          desc: "Providing ongoing support to ensure your apps remain compatible with the latest operating systems and devices."
        }
      ]
    },
    {
      title: "Custom Software Development",
      description: "Off-the-shelf software doesn't always fit. We engineer bespoke software solutions designed specifically for your unique operational needs, ensuring maximum efficiency and security.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
        </svg>
      ),
      subservices: [
        {
          title: "Cloud-Based & Online Software",
          desc: "Architecting scalable SaaS platforms, online portals, and web-based applications that connect your team from anywhere."
        },
        {
          title: "Offline & Desktop Applications",
          desc: "Developing robust, on-premise software solutions that function reliably without requiring a constant internet connection."
        },
        {
          title: "System Integration",
          desc: "Seamlessly connecting your new custom software with your existing legacy systems and third-party APIs."
        },
        {
          title: "Database Architecture",
          desc: "Designing secure, structured, and easily manageable databases to handle your most critical business information."
        }
      ]
    },
    {
      title: "Logo Design & Branding",
      description: "A strong brand starts with a memorable visual identity. Our creative team designs striking logos that capture the essence of your business and leave a lasting impression on your target market.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-3"></path>
        </svg>
      ),
      subservices: [
        {
          title: "Custom Logo Creation",
          desc: "Designing original, versatile logos that represent your core values and stand out in your industry."
        },
        {
          title: "Brand Identity Development",
          desc: "Establishing cohesive color palettes, typography, and brand guidelines to ensure consistency across all your platforms."
        },
        {
          title: "Asset Production",
          desc: "Delivering your new branding in all necessary formats for web, print, and digital marketing."
        }
      ]
    }
  ];

  return (
    <div className="relative w-full overflow-x-hidden bg-black">
      <main className="relative z-10 w-full bg-black flex flex-col rounded-b-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-b border-[rgba(255,255,255,0.1)]">
        <Header />
        
        <section className={styles.servicesPage}>
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
              <h1 className={styles.title}>Our Services</h1>
              <p className={styles.subtitle}>
                At Cloud Nova Solution, we transform complex digital challenges into elegant, high-performing solutions. Whether you are building a brand from scratch, launching a dynamic mobile game, or scaling your enterprise with custom software, our team has the expertise to bring your vision to reality.
              </p>
            </motion.div>

            {/* Grid of Service Cards */}
            <motion.div 
              className={styles.grid}
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {services.map((service, index) => (
                <motion.div 
                  key={index} 
                  className={styles.card}
                  variants={cardVariants}
                >
                  <div className={styles.cardGlow} />
                  
                  <div className={styles.cardIcon}>
                    {service.icon}
                  </div>
                  
                  <h2 className={styles.cardTitle}>{service.title}</h2>
                  <p className={styles.cardDescription}>{service.description}</p>
                  
                  <div className={styles.subservicesList}>
                    {service.subservices.map((sub, sIdx) => (
                      <div key={sIdx} className={styles.subserviceItem}>
                        <div className={styles.subserviceCheck}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <div className={styles.subserviceContent}>
                          <h3 className={styles.subserviceTitle}>{sub.title}</h3>
                          <p className={styles.subserviceDesc}>{sub.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
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
                  style={{ textShadow: "0 0 5px #c084fc, 0 0 10px #c084fc" }}
                >
                  Ready to start your next project?
                </h2>
                <p className={styles.ctaText}>
                  Reach out to the team at Cloud Nova Solution today, and let's build something incredible together.
                </p>
                <div className="mt-4">
                  <LazarevCta href="/contact" text="Let's Talk" />
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
