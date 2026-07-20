'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './VideoSection.module.css';

export default function VideoSection() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    // 1. Ensure the YouTube script is loaded
    if (!document.getElementById('youtube-iframe-api')) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    let ytPlayer = null;

    // 2. Initialize the player referencing the existing iframe ID
    const initPlayer = () => {
      if (window.YT && window.YT.Player) {
        ytPlayer = new window.YT.Player('youtube-showreel', {
          events: {
            onReady: (event) => {
              setPlayer(event.target);
            }
          }
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      // Define/hook into the global callback
      const previousCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (previousCallback) previousCallback();
        initPlayer();
      };
    }

    return () => {
      if (ytPlayer && ytPlayer.destroy) {
        ytPlayer.destroy();
      }
    };
  }, []);

  // 3. Toggle volume programmatically without reloading the iframe
  useEffect(() => {
    if (player && typeof player.mute === 'function' && typeof player.unMute === 'function') {
      try {
        if (isFullScreen) {
          player.unMute();
          player.setVolume(100);
        } else {
          player.mute();
        }
      } catch (e) {
        console.error("Error setting volume state:", e);
      }
    }
  }, [isFullScreen, player]);

  return (
    <div className={styles.videoWrapper}>
      {/* Framer Motion automatically interpolates between these two CSS class states */}
      <motion.section 
        layout
        className={isFullScreen ? styles.fullScreenOverlay : styles.videoContainer}
      >
        {/* Transparent Click Overlay to toggle full screen in both modes */}
        <div 
          className="absolute inset-0 w-full h-full z-10 cursor-pointer"
          onClick={() => setIsFullScreen(!isFullScreen)}
        />

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
          id="youtube-showreel"
          className={isFullScreen ? styles.fullScreenVideo : styles.videoElement}
          src="https://www.youtube.com/embed/GVu2XMJzb-Q?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=GVu2XMJzb-Q&controls=0&modestbranding=1&rel=0&playsinline=1"
          title="Cloud Nova Showreel"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        />
      </motion.section>
    </div>
  );
}
