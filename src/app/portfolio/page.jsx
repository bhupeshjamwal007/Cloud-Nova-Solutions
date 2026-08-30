'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import styles from './PortfolioPage.module.css';
import { Star, Globe, X, Menu, ArrowRight, ArrowUpRight, CircleDot } from 'lucide-react';
import Header from "@/components/Header";
import { CinematicFooter } from "@/components/ui/motion-footer";
import LazarevCta from "@/components/ui/LazarevCta";

const carouselSlides = [
  { caption: "Conversion design", title: "Crafted to convert." },
  { caption: "Engineering", title: "Built to scale." },
  { caption: "Brand systems", title: "Designed to last." }
];

const partnersList = [
  "Kaido", "Northpeak", "Vellum", "Orbit", "Brightline", "Cobalt", "Mesa"
];

const portfolioCards = [
  {
    name: "Print & Copy",
    category: "Website / E-Commerce",
    year: "2025",
    description: "A complete custom web solution for digital printing and quick copy requests.",
    tags: ["Web Development", "E-Commerce", "UI/UX"]
  },
  {
    name: "Elementa",
    category: "Product (In Progress)",
    year: "2026",
    description: "An advanced modular design system and software platform built for modern enterprises.",
    tags: ["Product Design", "Software Dev", "UI/UX"]
  },
  {
    name: "now.gg",
    category: "Platform Integration",
    year: "2025",
    description: "Mobile cloud gaming platform integration, delivering instant browser-based play.",
    tags: ["Web Integration", "Cloud Solutions", "QA"]
  },
  {
    name: "EduQuest App",
    category: "Mobile App",
    year: "2024",
    description: "A gamified educational mobile application designed to enhance classroom learning.",
    tags: ["Mobile App", "iOS & Android", "UI/UX"]
  },
  {
    name: "Sudoku App",
    category: "Mobile Game",
    year: "2024",
    description: "A sleek, clean classic Sudoku puzzle mobile application with interactive challenges.",
    tags: ["Mobile App", "Game Dev", "iOS & Android"]
  }
];

const servicesList = [
  { idx: "01", title: "Software Development", desc: "Scalable web & mobile products built to last." },
  { idx: "02", title: "Product Design", desc: "Interfaces that feel effortless and look sharp." },
  { idx: "03", title: "Quality Assurance", desc: "Rigorous testing for flawless, confident releases." },
  { idx: "04", title: "Consulting", desc: "Strategy and direction for ambitious teams." }
];

const statsList = [
  { target: 150, suffix: "+", label: "Projects delivered" },
  { target: 98, suffix: "%", label: "Client retention" },
  { target: 12, suffix: "", label: "Years of craft" },
  { target: 40, suffix: "+", label: "Team members" }
];

const SliderContactButton = ({ onSwipe, styles }) => {
  const [trackWidth, setTrackWidth] = useState(320);
  const trackRef = useRef(null);
  
  // Motion value for high-performance direct dragging
  const x = useMotionValue(0);

  useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.offsetWidth);
    }
  }, []);

  const handleDragStart = () => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.offsetWidth);
    }
  };

  const handleWidth = 56;
  const padding = 6;
  const maxDragX = trackWidth - handleWidth - padding * 2;

  // Real-time fade out of the shimmering background text during swipe
  const textOpacity = useTransform(x, [0, maxDragX * 0.6], [1, 0]);

  return (
    <div 
      ref={trackRef} 
      className={styles.sliderTrack}
    >
      <motion.div 
        className={styles.sliderShimmerText}
        style={{ opacity: textOpacity }}
      >
        Slide to Contact Us →
      </motion.div>
      
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: maxDragX }}
        dragElastic={0.02}
        style={{ x }}
        onDragStart={handleDragStart}
        onDragEnd={(event, info) => {
          if (x.get() >= maxDragX - 15) {
            onSwipe();
          }
          // Springs the handle back to initial 0 coordinate
          animate(x, 0, { type: 'spring', stiffness: 600, damping: 35 });
        }}
        className={styles.sliderHandle}
      >
        <ArrowRight className="w-5 h-5 text-white" />
      </motion.div>
    </div>
  );
};

export default function PortfolioPage() {
  // Navigation & modal states
  const [isLoaderFinished, setIsLoaderFinished] = useState(true);
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clockTime, setClockTime] = useState("9:41am");
  const [clockDate, setClockDate] = useState("12 March, 2025");
  const [mouseCoords, setMouseCoords] = useState({ x: -9999, y: -9999 });

  // Carousel state
  const [carouselIdx, setCarouselIdx] = useState(0);

  // Stats numbers state
  const [statsNumbers, setStatsNumbers] = useState([0, 0, 0, 0]);
  const statsPanelRef = useRef(null);

  // References
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const lenisRef = useRef(null);

  // Form states
  const [selectedServices, setSelectedServices] = useState([]);

  // Clock dynamic updates
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const minutes = String(now.getMinutes()).padStart(2, '0');
      
      const day = now.getDate();
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const month = months[now.getMonth()];
      const year = now.getFullYear();

      setClockTime(`${hours}:${minutes}${ampm}`);
      setClockDate(`${day} ${month}, ${year}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize Lenis dynamic import
  useEffect(() => {
    let lenisInst;
    import('lenis').then((LenisModule) => {
      const LenisClass = LenisModule.default;
      window.scrollTo(0, 0);
      lenisInst = new LenisClass({ smoothWheel: true });
      lenisRef.current = lenisInst;

      function raf(t) {
        lenisInst.raf(t);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    });

    return () => {
      if (lenisInst) lenisInst.destroy();
    };
  }, []);

  // Scroll lock handles
  const stopScroll = () => {
    if (lenisRef.current) lenisRef.current.stop();
    document.documentElement.style.position = 'relative';
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.height = '100%';
  };

  const startScroll = () => {
    if (lenisRef.current) lenisRef.current.start();
    document.documentElement.style.removeProperty('position');
    document.documentElement.style.removeProperty('overflow');
    document.documentElement.style.removeProperty('height');
  };
  const handleHeroPointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMouseCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleHeroPointerLeave = () => {
    setMouseCoords({ x: -9999, y: -9999 });
  };  // Handle section scrolling
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    
    stopScroll();
    setTimeout(() => {
      const offsetTop = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      setTimeout(startScroll, 1000);
    }, 50);
  };

  // Adaptive Grid above 1920px
  useEffect(() => {
    const applyGrid = () => {
      const FONT_BASE = 16, baseWidth = 1920, coef = 0.6666;
      const w = window.innerWidth;
      const widthReduction = ((baseWidth - w) / baseWidth) * 100;
      const size = FONT_BASE - (FONT_BASE * (widthReduction * coef)) / 100;
      if (size > FONT_BASE) {
        document.documentElement.style.fontSize = size + 'px';
      } else {
        document.documentElement.style.removeProperty('font-size');
      }
    };
    applyGrid();
    window.addEventListener('resize', applyGrid);
    return () => window.removeEventListener('resize', applyGrid);
  }, []);

  // LiquidReveal background engine
  useEffect(() => {
    if (!isLoaderFinished || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    const offscreenCover = document.createElement('canvas');
    const offscreenBrush = document.createElement('canvas');
    const coverCtx = offscreenCover.getContext('2d');
    const brushCtx = offscreenBrush.getContext('2d');

    const afterImg = new Image();
    afterImg.src = '/images/bhupesh-glasses.png'; // afterSrc

    const brushRadius = 143;
    const decay = 0.016;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let rect = { width: 0, height: 0, left: 0, top: 0 };
    let pointer = { x: 0, y: 0 };
    let lastPointer = { x: 0, y: 0 };
    let pointsQueue = [];
    let isDrawing = false;
    let idleFrames = 0;

    const resizeCanvas = () => {
      rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.scale(dpr, dpr);

      offscreenCover.width = rect.width;
      offscreenCover.height = rect.height;

      if (afterImg.complete && afterImg.naturalWidth > 0) {
        drawCoverImage();
      }
    };

    const drawCoverImage = () => {
      const w = offscreenCover.width;
      const h = offscreenCover.height;
      const imgW = afterImg.naturalWidth;
      const imgH = afterImg.naturalHeight;

      const s = Math.max(w / imgW, h / imgH);
      const dw = imgW * s;
      const dh = imgH * s;

      const dx = (w - dw) * 0.50;
      const dy = (h - dh) * 0.20;

      coverCtx.clearRect(0, 0, w, h);
      coverCtx.drawImage(afterImg, dx, dy, dw, dh);
    };

    afterImg.onload = () => {
      drawCoverImage();
    };

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(container);

    const handlePointerMove = (e) => {
      const currentRect = container.getBoundingClientRect();
      const px = e.clientX - currentRect.left;
      const py = e.clientY - currentRect.top;
      const maxDist = brushRadius;

      if (
        px < -maxDist || 
        px > currentRect.width + maxDist || 
        py < -maxDist || 
        py > currentRect.height + maxDist
      ) {
        isDrawing = false;
        return;
      }

      pointer.x = px;
      pointer.y = py;

      if (!isDrawing) {
        lastPointer.x = px;
        lastPointer.y = py;
        isDrawing = true;
      }

      const dx = pointer.x - lastPointer.x;
      const dy = pointer.y - lastPointer.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const step = Math.max(brushRadius * 0.3, 1);
      const steps = Math.min(Math.ceil(dist / step), 60);

      for (let i = 0; i < steps; i++) {
        const ratio = i / steps;
        pointsQueue.push({
          x: lastPointer.x + dx * ratio,
          y: lastPointer.y + dy * ratio
        });
      }

      lastPointer.x = pointer.x;
      lastPointer.y = pointer.y;
      idleFrames = 0;
    };

    window.addEventListener('pointermove', handlePointerMove);

    const drawBrushStamp = (x, y) => {
      const radius = brushRadius;
      const diameter = Math.ceil(radius * 2);
      
      offscreenBrush.width = diameter;
      offscreenBrush.height = diameter;

      brushCtx.clearRect(0, 0, diameter, diameter);
      const grad = brushCtx.createRadialGradient(radius, radius, 0, radius, radius, radius);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.55, 'rgba(255, 255, 255, 0.82)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      brushCtx.fillStyle = grad;
      brushCtx.beginPath();
      brushCtx.arc(radius, radius, radius, 0, Math.PI * 2);
      brushCtx.fill();

      brushCtx.compositeOperation = 'source-in';
      brushCtx.globalCompositeOperation = 'source-in';
      brushCtx.drawImage(
        offscreenCover,
        x - radius, y - radius, diameter, diameter,
        0, 0, diameter, diameter
      );

      ctx.compositeOperation = 'source-over';
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(offscreenBrush, x - radius, y - radius);
    };

    let animationFrameId;
    const tick = () => {
      if (pointsQueue.length > 0 || idleFrames < 120) {
        if (pointsQueue.length === 0) {
          idleFrames++;
        }

        const fade = isDrawing ? decay : Math.min(decay + idleFrames * 0.004, 0.5);
        ctx.compositeOperation = 'destination-out';
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = `rgba(0, 0, 0, ${fade})`;
        ctx.fillRect(0, 0, rect.width, rect.height);

        if (pointsQueue.length > 0) {
          pointsQueue.forEach(pt => {
            drawBrushStamp(pt.x, pt.y);
          });
          pointsQueue = [];
        }

        if (idleFrames >= 120) {
          ctx.clearRect(0, 0, rect.width, rect.height);
        }
      }
      animationFrameId = requestAnimationFrame(tick);
    };
    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [isLoaderFinished]);

  // Observer for stats panel count-up triggers
  useEffect(() => {
    if (!isLoaderFinished) return;

    const panel = statsPanelRef.current;
    if (!panel) return;

    const handleScroll = () => {
      const rect = panel.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const startPoint = viewportHeight;
      const endPoint = viewportHeight / 2;
      const currentPoint = rect.top;

      let progress = (startPoint - currentPoint) / (startPoint - endPoint);
      progress = Math.max(0, Math.min(progress, 1));

      const updated = statsList.map(item => Math.round(progress * item.target));
      setStatsNumbers(updated);

      if (progress >= 1) {
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger check initially

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoaderFinished]);

  // Carousel actions
  const carouselNext = (e) => {
    if (e) e.stopPropagation();
    setCarouselIdx((prev) => (prev + 1) % carouselSlides.length);
  };
  const carouselPrev = (e) => {
    if (e) e.stopPropagation();
    setCarouselIdx((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  // Form submit handler to POST to /api/contact
  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
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
      
      setModalSuccess(true);
    } catch (error) {
      console.error("Form submission failed:", error);
      alert(`Failed to send message: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Gated animation parent variants
  const revealContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const lineReveal = {
    hidden: { y: "100%", opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.9, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  const wordReveal = {
    hidden: { y: 24, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.7, ease: [0.165, 0.84, 0.44, 1] }
    }
  };

  const fadeUpReveal = {
    hidden: { y: 16, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className={styles.pageContainer}>
      


      <Header />

      {/* Main Sections */}
      <main id="main">
        
        {/* Hero Section */}
        <section 
          id="home" 
          ref={containerRef} 
          className={styles.heroSection}
          onPointerMove={handleHeroPointerMove}
          onPointerLeave={handleHeroPointerLeave}
        >
          <div className={styles.liquidRevealContainer}>
            <img 
              className={styles.liquidRevealBg} 
              src="/images/bhupesh-headshot.png" 
              alt="Bhupesh Jamwal Portfolio Hero Background" 
            />
            <canvas ref={canvasRef} className={styles.liquidRevealCanvas} aria-hidden="true"></canvas>
          </div>
          
          <div className={styles.legibilityVignette}></div>
          
          <div 
            className={`${styles.brandWatermark} ${isLoaderFinished ? styles.active : ''}`}
            style={{
              '--mouse-x': `${mouseCoords.x}px`,
              '--mouse-y': `${mouseCoords.y}px`
            }}
          >
            <div className={styles.watermarkBase}>CloudNova Solution</div>
            <div className={styles.watermarkHover}>
              <div className={styles.watermarkHoverText}>CloudNova Solution</div>
            </div>
          </div>
          
          <div className={`${styles.shell} ${styles.heroContent}`}>
            {/* Overlay content removed as requested */}
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className={styles.contactCtaSection}>
          <div className={`${styles.shell} ${styles.contactCtaInner}`}>
            <SliderContactButton onSwipe={() => { stopScroll(); setIsModalOpen(true); }} styles={styles} />
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="works">
          <div className={`${styles.shell} ${styles.portfolioInner}`}>
            <div className={`${styles.eyebrow} ${styles.eyebrowDark} ${styles.portfolioEyebrow} reveal-fade-up`}>Portfolio</div>
            
            <h2 className={styles.portfolioTitle}>
              <span className={styles.revealLine}>
                <span className={styles.revealLineInner}>Selected Work</span>
              </span>
            </h2>
            
            <ul className={styles.portfolioGrid}>
              {portfolioCards.map((card, i) => (
                <li key={i} className="reveal-fade-up">
                  <a href="#" className={styles.portfolioCardLink} onClick={(e) => { e.preventDefault(); stopScroll(); setIsModalOpen(true); }}>
                    <article className={styles.portfolioCard}>
                      <div className={styles.portfolioCardMeta}>
                        <span>{card.category} — {card.year}</span>
                        <span className={styles.portfolioCardBadge}>
                          <ArrowUpRight />
                        </span>
                      </div>
                      <div className={styles.portfolioCardWatermark}>
                        <svg viewBox="0 0 48 48" fill="currentColor" width="1em" height="1em">
                          <path d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z"/>
                        </svg>
                        <span>®</span>
                      </div>
                      <div className={styles.portfolioCardBottom}>
                        <h3 className={styles.portfolioCardName}>{card.name}</h3>
                        <p class={styles.portfolioCardDesc}>{card.description}</p>
                        <div className={styles.portfolioCardTags}>
                          {card.tags.map((t, idx) => <span key={idx} className={styles.tagChip}>{t}</span>)}
                        </div>
                      </div>
                    </article>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Services Section */}
        <section id="services">
          <div className={`${styles.shell} ${styles.servicesInner}`}>
            <div className={`${styles.eyebrow} ${styles.eyebrowDark} reveal-fade-up`}>Services</div>
            
            <h2 className={styles.servicesTitle}>
              <span className={styles.revealLine}>
                <span className={styles.revealLineInner}>What we do best</span>
              </span>
            </h2>
            
            <ul className={styles.servicesList}>
              {servicesList.map((row, i) => (
                <li key={i} className={`${styles.servicesRowItem} reveal-fade-up`}>
                  <a href="#" className={styles.servicesLink} onClick={(e) => { e.preventDefault(); stopScroll(); setIsModalOpen(true); }}>
                    <span className={styles.servicesIdx}>{row.idx}</span>
                    <h3 className={styles.servicesRowTitle}>{row.title}</h3>
                    <p className={styles.servicesDesc}>{row.desc}</p>
                    <span className={styles.servicesBadge}>
                      <ArrowUpRight />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>



      </main>

      <CinematicFooter />

      {/* RequestModal Overlay */}
      <div className={`${styles.requestModal} ${isModalOpen ? styles.requestModalActive : ''}`} onClick={() => { startScroll(); setIsModalOpen(false); }} role="dialog" aria-modal="true">
        <div className={styles.modalPanel} onClick={(e) => e.stopPropagation()}>
          <button className={styles.closeModalBtn} onClick={() => { startScroll(); setIsModalOpen(false); }} aria-label="Close dialog">
            <X className="w-5 h-5" />
          </button>

          {/* Form State */}
          {!modalSuccess && (
            <div className={styles.modalFormState}>
              <div className={styles.modalHeadingBlock}>
                <div className={`${styles.eyebrow} ${styles.eyebrowDark} ${styles.modalEyebrow}`}>Start a project</div>
                <h2 className={styles.modalTitle}>Tell us what you're building.</h2>
              </div>
              
              <form className={styles.modalForm} onSubmit={handleSubmitRequest}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="name">Your Name</label>
                  <input 
                    className={styles.formInput} 
                    type="text" 
                    id="name" 
                    name="name"
                    placeholder="John Doe" 
                    required 
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="email">Email Address</label>
                  <input 
                    className={styles.formInput} 
                    type="email" 
                    id="email" 
                    name="email"
                    placeholder="john@company.com" 
                    maxLength={50}
                    pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
                    title="Please enter a valid email address containing an '@' symbol and a valid domain (e.g., name@company.com)"
                    required 
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="mobile">Mobile Number</label>
                  <input 
                    className={styles.formInput} 
                    type="tel" 
                    id="mobile" 
                    name="mobile"
                    placeholder="+1 1234567890" 
                    pattern="^\+\d{1,3}\s?\d{10}$"
                    title="Must start with a + country code, followed by exactly 10 digits (e.g. +1 1234567890)"
                    required 
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>What services do you need? (Select multiple)</label>
                  <div className="flex flex-wrap gap-2 mt-1">
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
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 border ${
                          selectedServices.includes(service)
                            ? "bg-[#0D6EFD] text-white border-[#0D6EFD] shadow-[0_0_10px_rgba(13,110,253,0.3)]"
                            : "bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-200 hover:text-zinc-800"
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                  <input type="hidden" name="services" value={selectedServices.join(', ')} />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="message">Project Details</label>
                  <textarea 
                    className={styles.formTextarea} 
                    id="message" 
                    name="message"
                    rows="4" 
                    placeholder="Tell us about your goals, budget, and timeline..."
                    required
                  ></textarea>
                </div>

                <div className={styles.modalBottomRow}>
                  <span className={styles.modalReplyNote}>We reply within one business day.</span>
                  <button className={`${styles.pillBtn} ${styles.pillBtnDark} ${styles.pillBtnWithArrow}`} type="submit" disabled={isSubmitting}>
                    <span className={styles.pillBtnInner}>
                      <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                      <span className={styles.pillBtnBadge}>
                        <ArrowUpRight className={styles.arrowUpright} />
                      </span>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Success State */}
          {modalSuccess && (
            <div className={styles.modalSuccessState}>
              <div className={styles.modalSuccessBadge}>
                <svg viewBox="0 0 48 48" fill="currentColor" width="1.5rem" height="1.5rem">
                  <path d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z"/>
                </svg>
              </div>
              <h2 className={styles.modalSuccessTitle}>Request received</h2>
              <p className={styles.modalSuccessDesc}>Thanks for reaching out — we'll get back to you within one business day.</p>
              
              <button 
                className={`${styles.pillBtn} ${styles.pillBtnDark} ${styles.pillBtnNoArrow}`} 
                onClick={() => {
                  startScroll();
                  setIsModalOpen(false);
                  setTimeout(() => {
                    setModalSuccess(false);
                    setSelectedServices([]);
                  }, 300);
                }}
              >
                <span className={styles.pillBtnInner}>Close</span>
              </button>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
