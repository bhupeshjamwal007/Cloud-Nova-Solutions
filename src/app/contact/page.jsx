'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Header from "@/components/Header";
import { CinematicFooter } from "@/components/ui/motion-footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import LazarevCta from "@/components/ui/LazarevCta";
import styles from './ContactPage.module.css';
import { Lightning } from "@/components/ui/Lightning";

// Lazy-load the heavy 3D Model Viewer so it doesn't block the page from rendering
const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-transparent">
      <div className="w-12 h-12 border-4 border-[rgba(255,255,255,0.1)] border-t-[#0D6EFD] rounded-full animate-spin"></div>
      <span className="text-zinc-400 font-mono text-sm tracking-widest uppercase animate-pulse">Initializing 3D Engine...</span>
    </div>
  )
});

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Add the selected services array back into the data payload
    data.services = selectedServices.length > 0 ? selectedServices.join(', ') : "None selected";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      if (!result.success) {
        throw new Error("API submission failed");
      }
      
      // Trigger success UI and Thor animation
      setIsSubmitted(true);
    } catch (error) {
      console.error("Form submission failed:", error);
      alert("Failed to send message. Please try again or contact us directly.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="relative w-full overflow-x-hidden bg-black">
      <main className="relative z-10 w-full bg-black flex flex-col rounded-b-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-b border-[rgba(255,255,255,0.1)]">
        <Header />
        
        <section className={`${styles.contactPage} relative overflow-hidden`}>
          {/* WebGL Lightning Background (triggered by Thor's GSAP timeline) */}
          <div id="lightning-bg" className="absolute inset-0 pointer-events-none opacity-0 mix-blend-screen" style={{ zIndex: 0 }}>
            <Lightning hue={220} speed={1.6} intensity={1.5} size={2} />
          </div>

          <div className={`${styles.container} relative`} style={{ zIndex: 9999 }}>
            {/* Explicitly setting z-0 to prevent background-clip from breaking stacking order */}
            <div className={`${styles.header} relative z-0`}>
              <h1 className={styles.title}>Let's Build Something<br />Extraordinary.</h1>
              <p className={styles.subtitle}>
                Tell us about your project, your timeline, and your grand vision. Our experts are ready to turn it into reality.
              </p>
            </div>

            {/* Explicitly setting z-50 to ensure this entire layout block beats the title text */}
            <div className={`${styles.splitLayout} relative z-50`}>
              {/* Left Panel: Contact Form or Success Message */}
              <div className={`${styles.panel} relative z-10 min-h-[400px]`}>
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form 
                      key="contact-form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                      transition={{ duration: 0.5 }}
                      className={styles.form} 
                      onSubmit={handleSubmit}
                    >
                      <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="name">Your Name</label>
                        <input 
                          type="text" 
                          id="name"
                          name="name"
                          className={styles.input} 
                          placeholder="John Doe" 
                          required 
                        />
                      </div>
                      
                      <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="email">Email Address</label>
                        <input 
                          type="email" 
                          id="email"
                          name="email"
                          className={styles.input} 
                          placeholder="john@company.com" 
                          required 
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="mobile">Mobile Number</label>
                        <input 
                          type="tel" 
                          id="mobile"
                          name="mobile"
                          className={styles.input} 
                          placeholder="+1 (555) 123-4567" 
                          required 
                        />
                      </div>
                      
                      <div className={styles.formGroup}>
                        <label className={styles.label}>What services do you need? (Select multiple)</label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {[
                            "🌐 Web Development",
                            "📱 Mobile App Development",
                            "💻 Custom Software",
                            "🛍️ E-Commerce Store",
                            "🎨 Logo & Brand Design",
                            "📈 Local SEO",
                            "🛠️ Website Maintenance",
                            "❓ Other"
                          ].map((service) => (
                            <button
                              key={service}
                              type="button"
                              onClick={() => {
                                if (selectedServices.includes(service)) {
                                  setSelectedServices(selectedServices.filter(s => s !== service));
                                } else {
                                  setSelectedServices([...selectedServices, service]);
                                }
                              }}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                                selectedServices.includes(service)
                                  ? "bg-[#0D6EFD] text-white border-[#0D6EFD] shadow-[0_0_15px_rgba(13,110,253,0.5)]"
                                  : "bg-zinc-900/50 text-zinc-400 border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.3)] hover:text-zinc-200"
                              }`}
                            >
                              {service}
                            </button>
                          ))}
                        </div>
                        {/* Hidden input to pass the selected services array to FormSubmit */}
                        <input type="hidden" name="services" value={selectedServices.join(', ')} />
                      </div>
                      
                      <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="message">Project Details</label>
                        <textarea 
                          id="message"
                          name="message"
                          className={styles.textarea} 
                          placeholder="Tell us about your goals, budget, and timeline..." 
                          required 
                        />
                      </div>

                      <div className="mt-4 flex justify-start">
                        <button type="submit" disabled={isSending} style={{ background: 'transparent', border: 'none', padding: 0, opacity: isSending ? 0.7 : 1 }}>
                          <LazarevCta text={isSending ? "Sending..." : "Send Message"} href="#" />
                        </button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success-message"
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: "spring", bounce: 0.5, duration: 0.8, delay: 0.3 }}
                      className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 border border-[#0D6EFD]/30 bg-[#0D6EFD]/5 backdrop-blur-md rounded-2xl"
                    >
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.6 }}
                        className="w-16 h-16 bg-[#0D6EFD]/20 rounded-full flex items-center justify-center mb-6"
                      >
                        <svg className="w-8 h-8 text-[#0dcaf0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </motion.div>
                      <h3 className="text-3xl font-bold text-white mb-4">Message Received!</h3>
                      <p className="text-zinc-400 text-lg">
                        Thank you for reaching out. The Cloud Nova team will review your project details and get back to you with lightning speed.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Panel: Empty placeholder to push the grid and provide space for Thor */}
              <div className="hidden md:block w-full h-full opacity-0 pointer-events-none"></div>
            </div>
          </div>
          
          {/* Full-Page 3D Canvas Overlay - Spans the entire screen to prevent Thor from getting clipped */}
          <div className="absolute inset-0 pointer-events-none w-full h-full" style={{ zIndex: 999 }}>
            <ModelViewer isSubmitted={isSubmitted} />
          </div>
        </section>

      </main>

      <CinematicFooter />
      <FloatingWhatsApp />
    </div>
  );
}
