'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroPreloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';
    
    // Automatically remove preloader after animation completes
    // 2.4 seconds allows the box to expand fully and then fade out smoothly
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'auto';
    }, 2400);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          // We fade out the entire wrapper once the black box has filled it
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          // A light silver/white background so the black box is clearly visible
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#f4f4f5]"
        >
          {/* The Expanding Black Box */}
          <motion.div
            initial={{ width: "min(300px, 80vw)", height: "120px", borderRadius: "16px" }}
            animate={{ 
              width: "100vw", 
              height: "100vh", 
              borderRadius: "0px" 
            }}
            transition={{ 
              duration: 1.2, 
              ease: [0.76, 0, 0.24, 1], // Cinematic ease exactly like the video showcase
              delay: 0.8 // Wait 0.8s before expanding
            }}
            className="bg-black flex items-center justify-center overflow-hidden shadow-2xl"
          >
            {/* Minimalist Logo inside the box before it expands */}
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-white text-sm md:text-base font-bold tracking-[0.2em] uppercase"
            >
              Cloud <span style={{ color: '#0D6EFD' }}>Nova</span> Solution
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
