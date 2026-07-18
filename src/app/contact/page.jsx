'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from "@/components/Header";
import { CinematicFooter } from "@/components/ui/motion-footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import LazarevCta from "@/components/ui/LazarevCta";
import styles from './ContactPage.module.css';
import ShaderRipple from "@/components/ui/ShaderRipple";



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
        throw new Error(result.message || "API submission failed");
      }
      
      // Trigger success UI and Thor animation
      setIsSubmitted(true);
    } catch (error) {
      console.error("Form submission failed:", error);
      alert(`Failed to send message: ${error.message}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="relative w-full overflow-x-hidden bg-black">
      <main className="relative z-10 w-full bg-black flex flex-col rounded-b-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-b border-[rgba(255,255,255,0.1)]">
        <Header />
        
        <section className={`${styles.contactPage} relative overflow-hidden`}>
          {/* Floating & Spinning Background Logo */}
          <div className={styles.logoBackground}>
            <ShaderRipple />
            <img src="/cns-logo.png" alt="Cloud Nova Background Logo" className={styles.floatingSpinningLogo} />
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
                          maxLength={50}
                          pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
                          title="Please enter a valid email address containing an '@' symbol and a valid domain (e.g., name@company.com)"
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
                          placeholder="+1 1234567890" 
                          pattern="^\+\d{1,3}\s?\d{10}$"
                          title="Must start with a + country code, followed by exactly 10 digits (e.g. +1 1234567890)"
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

              {/* Right Panel: Contact Information & Details */}
              <div className={`${styles.panel} ${styles.infoSection} flex flex-col justify-center`}>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Connect With Us</h3>
                  <p className="text-zinc-400 text-sm">
                    Prefer direct communication? Reach out to us via email, phone, or find us online. We're here to help.
                  </p>
                </div>

                <div className={styles.infoBlock}>
                  <div className={styles.iconWrapper}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <span className={styles.infoLabel}>Email Us</span>
                    <a href="mailto:solutionscloudnova@gmail.com" className={`${styles.infoText} hover:text-[#0D6EFD] transition-colors`}>
                      solutionscloudnova@gmail.com
                    </a>
                  </div>
                </div>

                <div className={styles.infoBlock}>
                  <div className={styles.iconWrapper}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <span className={styles.infoLabel}>Call Us / WhatsApp</span>
                    <a href="tel:+918899866089" className={`${styles.infoText} hover:text-[#0D6EFD] transition-colors`}>
                      +91 88998 66089
                    </a>
                  </div>
                </div>

                <div className={styles.infoBlock}>
                  <div className={styles.iconWrapper}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <span className={styles.infoLabel}>Business Hours</span>
                    <span className={styles.infoText}>Monday – Saturday: 9:00 AM – 7:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <CinematicFooter />
      <FloatingWhatsApp />
    </div>
  );
}
