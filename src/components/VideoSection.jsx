'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './VideoSection.module.css';

export default function VideoSection() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <div className={styles.videoWrapper}>
      {/* Framer Motion automatically interpolates between these two CSS class states */}
      <motion.section 
        layout
        className={isFullScreen ? styles.fullScreenOverlay : styles.videoContainer}
      >
        {/* Click Overlay when not in Full Screen */}
        {!isFullScreen && (
          <div 
            className="absolute inset-0 w-full h-full z-10 cursor-pointer"
            onClick={() => setIsFullScreen(true)}
          />
        )}

        {/* Floating Close Button when in Full Screen */}
        {isFullScreen && (
          <button 
            className="absolute top-6 right-6 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 border border-white/20 transition-all cursor-pointer flex items-center justify-center shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              setIsFullScreen(false);
            }}
            style={{ backdropFilter: 'blur(8px)' }}
            aria-label="Exit Full Screen"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        )}

        <iframe 
          className={isFullScreen ? styles.fullScreenVideo : styles.videoElement}
          src={isFullScreen 
            ? "https://www.youtube.com/embed/GVu2XMJzb-Q?autoplay=1&mute=0&loop=1&playlist=GVu2XMJzb-Q&controls=1&playsinline=1" 
            : "https://www.youtube.com/embed/GVu2XMJzb-Q?autoplay=1&mute=1&loop=1&playlist=GVu2XMJzb-Q&controls=0&playsinline=1"
          }
          title="Cloud Nova Showreel"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        />
      </motion.section>
    </div>
  );
}
