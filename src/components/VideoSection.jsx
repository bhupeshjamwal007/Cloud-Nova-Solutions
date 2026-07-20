'use client';
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import styles from './VideoSection.module.css';

export default function VideoSection() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [containedPlayer, setContainedPlayer] = useState(null);
  const [fullscreenPlayer, setFullscreenPlayer] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const containedPlayerRef = useRef(null);
  const fullscreenPlayerRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    // 1. Ensure the YouTube script is loaded
    if (!document.getElementById('youtube-iframe-api')) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // 2. Initialize contained player referencing the existing contained iframe ID
    const initContainedPlayer = () => {
      if (window.YT && window.YT.Player) {
        containedPlayerRef.current = new window.YT.Player('youtube-showreel-contained', {
          events: {
            onReady: (event) => {
              setContainedPlayer(event.target);
            }
          }
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initContainedPlayer();
    } else {
      // Define/hook into the global callback
      const previousCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (previousCallback) previousCallback();
        initContainedPlayer();
      };
    }

    return () => {
      if (containedPlayerRef.current && containedPlayerRef.current.destroy) {
        containedPlayerRef.current.destroy();
      }
    };
  }, []);

  // 3. Initialize fullscreen player when fullscreen opens
  useEffect(() => {
    let ytFullScreenPlayer = null;

    if (isFullScreen && window.YT && window.YT.Player) {
      const initFullscreenPlayer = () => {
        if (window.YT && window.YT.Player) {
          ytFullScreenPlayer = new window.YT.Player('youtube-showreel-fullscreen', {
            events: {
              onReady: (event) => {
                setFullscreenPlayer(event.target);
                event.target.playVideo();
              }
            }
          });
        }
      };

      // Slight timeout to let the Portal render the iframe, then bind
      const timer = setTimeout(initFullscreenPlayer, 80);

      return () => {
        clearTimeout(timer);
        if (ytFullScreenPlayer && ytFullScreenPlayer.destroy) {
          ytFullScreenPlayer.destroy();
        }
        setFullscreenPlayer(null);
      };
    }
  }, [isFullScreen]);

  // 4. Handle Open Fullscreen
  const handleOpenFullScreen = () => {
    let currentPlaybackTime = 0;
    if (containedPlayer && typeof containedPlayer.getCurrentTime === 'function') {
      currentPlaybackTime = containedPlayer.getCurrentTime();
      containedPlayer.pauseVideo();
    }
    setStartTime(currentPlaybackTime);
    setIsFullScreen(true);
  };

  // 5. Handle Close Fullscreen
  const handleCloseFullScreen = () => {
    let closeTime = startTime;
    if (fullscreenPlayer && typeof fullscreenPlayer.getCurrentTime === 'function') {
      closeTime = fullscreenPlayer.getCurrentTime();
    }
    if (containedPlayer && typeof containedPlayer.seekTo === 'function') {
      containedPlayer.seekTo(closeTime, true);
      containedPlayer.mute();
      containedPlayer.playVideo();
    }
    setIsFullScreen(false);
  };

  return (
    <div className={styles.videoWrapper}>
      {/* Contained Video Display */}
      <section className={styles.videoContainer}>
        {/* Transparent Click Overlay to intercept clicks */}
        <div 
          className={styles.clickOverlay}
          onClick={handleOpenFullScreen}
        />

        <iframe 
          id="youtube-showreel-contained"
          className={styles.videoElement}
          src="https://www.youtube.com/embed/GVu2XMJzb-Q?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=GVu2XMJzb-Q&controls=0&modestbranding=1&rel=0&playsinline=1"
          title="Cloud Nova Showreel Contained"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        />
      </section>

      {/* Render Full Screen View in a Portal */}
      {isFullScreen && isMounted && createPortal(
        <div className={styles.fullScreenOverlay}>
          {/* Click Overlay to close fullscreen and block YouTube interface */}
          <div 
            className={styles.clickOverlay}
            onClick={handleCloseFullScreen}
          />

          {/* Floating Close Button */}
          <button 
            className="absolute top-6 right-6 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 border border-white/20 transition-all cursor-pointer flex items-center justify-center shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              handleCloseFullScreen();
            }}
            style={{ backdropFilter: 'blur(8px)' }}
            aria-label="Exit Full Screen"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <iframe 
            id="youtube-showreel-fullscreen"
            className={styles.fullScreenVideo}
            src={`https://www.youtube.com/embed/GVu2XMJzb-Q?enablejsapi=1&autoplay=1&mute=0&loop=1&playlist=GVu2XMJzb-Q&controls=0&modestbranding=1&rel=0&playsinline=1&start=${Math.floor(startTime)}`}
            title="Cloud Nova Showreel Full Screen"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          />
        </div>,
        document.body
      )}
    </div>
  );
}
