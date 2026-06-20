'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './VideoSection.module.css';

export default function VideoSection() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoRef = useRef(null);

  // Dynamically toggle audio, reset playback, and force play
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isFullScreen;
      if (isFullScreen) {
        // Restart video from the beginning when opened in full screen
        videoRef.current.currentTime = 0;
      }
      // Explicitly call play() to ensure it doesn't pause after state changes
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, [isFullScreen]);

  return (
    <div className={styles.videoWrapper}>
      {/* Framer Motion automatically interpolates between these two CSS class states */}
      <motion.section 
        layout
        className={isFullScreen ? styles.fullScreenOverlay : styles.videoContainer}
        onClick={() => setIsFullScreen(!isFullScreen)} // Toggles between full-screen and contained
      >
        <motion.video 
          ref={videoRef}
          layout
          className={isFullScreen ? styles.fullScreenVideo : styles.videoElement}
          src="/showreel_preview_1920_v4.mp4" 
          autoPlay 
          loop 
          playsInline
          muted={!isFullScreen} // Crucial for initial browser autoplay
        />
      </motion.section>
    </div>
  );
}
