'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from "@/components/Header";
import { CinematicFooter } from "@/components/ui/motion-footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import LazarevCta from "@/components/ui/LazarevCta";
import styles from './PortfolioPage.module.css';
import ShaderRipple from "@/components/ui/ShaderRipple";
import CrystalTrailBackground from "@/components/ui/crystal-trail-background";
import { ExternalLink, X, Briefcase, Calendar, User, Tag } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "NovaArcade Playground",
    subtitle: "Interactive Game Hub & Snippet Viewer",
    category: "Web Development",
    badge: "Web App / Gaming",
    description: "A customized next-gen online arcade suite built directly into the client solution portal. Houses 7 responsive canvas-rendered arcade games, allowing players to instantly toggle between playing or viewing copyable core-logic source code snippets.",
    problem: "The client wanted to display interactive playground features on their site to demonstrate HTML5 canvas development skills, but standard games broke on mobile layouts, double-fired tap events, or crashed key triggers.",
    solution: "We engineered a clean canvas rendering engine, mapped touchscreen gestures using Pointer Events to avoid double-firing, and designed a custom handheld virtual console mode overlay for mobile browsers.",
    tech: ["Next.js", "HTML5 Canvas", "Tailwind CSS", "Framer Motion", "Pointer Events API"],
    demoUrl: "/games",
    client: "Cloud Nova Internal",
    date: "July 2026"
  },
  {
    id: 2,
    title: "Zenith Headless Store",
    subtitle: "High-Performance Next-Gen E-Commerce",
    category: "Web Development",
    badge: "E-Commerce",
    description: "An ultra-fast headless e-commerce store with modular content control. Features fluid shopping cart overlays, micro-interactions, Stripe terminal hook-ups, and optimized Core Web Vitals achieving a 99 Lighthouse performance score.",
    problem: "Legacy storefront platforms were slow and bloated, resulting in high shopping cart abandonment rates on mobile viewports.",
    solution: "Built a customized headless React setup integrated with a GraphQL API layer, resulting in sub-second page transition load times and a 35% conversion boost.",
    tech: ["React", "Node.js", "GraphQL", "Stripe API", "Tailwind CSS"],
    demoUrl: "/services",
    client: "Zenith Apparel Group",
    date: "May 2026"
  },
  {
    id: 3,
    title: "FitSphere Application",
    subtitle: "Cross-Platform Gym Companion & Tracker",
    category: "Mobile Apps",
    badge: "iOS & Android App",
    description: "A beautiful, cross-platform mobile fitness companion application. Incorporates automated workout tracking, live biometric integrations, localized statistics, and secure cloud sync.",
    problem: "Users struggled to log workouts manually across multiple devices, and cross-platform native syncing was erratic.",
    solution: "Designed and built a Flutter utility app with offline-first SQLite databases, linked to a Firebase backend for transparent multi-device syncing.",
    tech: ["Flutter", "Dart", "Firebase", "Google Fit API", "SQLite"],
    demoUrl: "/contact",
    client: "FitSphere Ltd.",
    date: "March 2026"
  },
  {
    id: 4,
    title: "Vortex Custom CMS",
    subtitle: "Enterprise Content Delivery Solution",
    category: "Custom Software",
    badge: "Custom CMS",
    description: "A tailored, high-performance database and editor platform built to manage content pipelines for high-traffic media groups. Reduces writing-to-publishing speeds by 40%.",
    problem: "WordPress configurations were clunky and slow under peak loads, slowing down editorial publishing processes during breaking news.",
    solution: "Developed a Next.js control portal using a highly indexed PostgreSQL backend and custom content serialization logic, maintaining 100% server uptime.",
    tech: ["Next.js", "PostgreSQL", "Node.js", "AWS S3", "Docker"],
    demoUrl: "/services",
    client: "Global Media Network",
    date: "January 2026"
  },
  {
    id: 5,
    title: "Aura Brand Strategy",
    subtitle: "Digital Design & Visual Identity",
    category: "Brand Design",
    badge: "Branding / UI Design",
    description: "A comprehensive logo identity design, visual style library, and responsive typography overhaul for a fast-scaling tech venture, optimizing their market branding guidelines.",
    problem: "The client's logo and visual design felt outdated, failing to appeal to venture capital partners and modern tech consumers.",
    solution: "Conducted brand research to craft a glowing, minimalist visual language, delivering modular vector kits, web styling guidelines, and animation assets.",
    tech: ["Figma", "Adobe Illustrator", "After Effects", "Brand Guidelines"],
    demoUrl: "/contact",
    client: "Aura FinTech Labs",
    date: "November 2025"
  },
  {
    id: 6,
    title: "Apex HyperLocal SEO",
    subtitle: "Localized Organic Search Booster",
    category: "Custom Software",
    badge: "SEO / Marketing Engine",
    description: "An automated SEO generation suite for local business sites, structuring schema mapping, localized page loads, and organic maps keyword positioning.",
    problem: "Localized franchises were lost in search engine rankings, losing business to large aggregate directories.",
    solution: "Deployed a customized server-side rendering template system embedded with dynamic structured schema tags, raising map rankings by 250%.",
    tech: ["Next.js", "Google Maps API", "Schema Markup", "Analytics APIs"],
    demoUrl: "/services",
    client: "Apex Local Group",
    date: "September 2025"
  }
];

const categories = ["All", "Web Development", "Mobile Apps", "Custom Software", "Brand Design"];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeModalProject, setActiveModalProject] = useState(null);

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        duration: 0.7
      }
    }
  };

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="relative w-full overflow-x-hidden bg-black">
      <CrystalTrailBackground />
      
      <main className="relative z-10 w-full bg-black flex flex-col rounded-b-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-b border-[rgba(255,255,255,0.1)]">
        <Header />
        
        <section className={styles.portfolioPage}>
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
              <h1 className={styles.title}>Our Creations</h1>
              <p className={styles.subtitle}>
                Explore the digital solutions, custom platforms, and next-generation applications we've built for ambitious clients. We combine robust tech stacks with premium interfaces.
              </p>
            </motion.div>

            {/* Category Filters */}
            <div className={styles.filterContainer}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`${styles.filterBtn} ${selectedCategory === cat ? styles.activeFilterBtn : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <motion.div 
              className={styles.projectGrid}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              layout
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    variants={cardVariants}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, scale: 0.9, y: 10, transition: { duration: 0.3 } }}
                    className={styles.projectCard}
                    onClick={() => setActiveModalProject(project)}
                  >
                    <div className={styles.cardGlow} />
                    
                    <div className={styles.cardHeader}>
                      <span className={styles.projectBadge}>{project.badge}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                      <span className="text-xs text-zinc-500 font-medium tracking-wide uppercase">{project.subtitle}</span>
                    </div>

                    <p className={styles.projectDesc}>{project.description}</p>

                    <div className={styles.techStack}>
                      {project.tech.slice(0, 4).map((t, i) => (
                        <span key={i} className={styles.techBadge}>{t}</span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className={styles.techBadge}>+{project.tech.length - 4} more</span>
                      )}
                    </div>

                    <div className={styles.cardFooter}>
                      <span className={styles.viewDetails}>
                        View Case Study
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        >
                          →
                        </motion.span>
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.modalOverlay}
            onClick={() => setActiveModalProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.closeModalBtn}
                onClick={() => setActiveModalProject(null)}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col gap-2">
                <span className={`${styles.projectBadge} ${styles.modalCategory}`}>
                  {activeModalProject.badge}
                </span>
                <h2 className={styles.modalTitle}>{activeModalProject.title}</h2>
                <p className={styles.modalSubtitle}>{activeModalProject.subtitle}</p>
              </div>

              {/* Grid with Project Meta */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-[rgba(255,255,255,0.08)] pt-4">
                <div className="flex items-center gap-2 text-zinc-400">
                  <User className="w-4 h-4 text-[#0D6EFD]" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-500 uppercase font-semibold">Client</span>
                    <span className="text-xs text-white font-medium">{activeModalProject.client}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Calendar className="w-4 h-4 text-[#0D6EFD]" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-500 uppercase font-semibold">Date Completed</span>
                    <span className="text-xs text-white font-medium">{activeModalProject.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-zinc-400 col-span-2 sm:col-span-1">
                  <Tag className="w-4 h-4 text-[#0D6EFD]" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-500 uppercase font-semibold">Project Domain</span>
                    <span className="text-xs text-white font-medium">{activeModalProject.category}</span>
                  </div>
                </div>
              </div>

              <div className={styles.modalSplit}>
                <div>
                  <h4 className={styles.modalSectionTitle}>The Challenge</h4>
                  <p className={styles.modalSectionText}>{activeModalProject.problem}</p>
                </div>
                
                <div>
                  <h4 className={styles.modalSectionTitle}>Our Solution</h4>
                  <p className={styles.modalSectionText}>{activeModalProject.solution}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {activeModalProject.tech.map((t, idx) => (
                  <span key={idx} className={styles.techBadge}>{t}</span>
                ))}
              </div>

              <div className={styles.modalFooter}>
                <LazarevCta 
                  text="Live Preview" 
                  href={activeModalProject.demoUrl}
                  onClick={() => setActiveModalProject(null)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CinematicFooter />
      <FloatingWhatsApp />
    </div>
  );
}
