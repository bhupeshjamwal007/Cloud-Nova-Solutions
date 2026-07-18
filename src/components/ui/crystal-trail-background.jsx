'use client';

import React, { useRef, useEffect } from 'react';

export default function CrystalTrailBackground({ children, className = "" }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = containerRef.current.clientWidth;
    let height = canvas.height = containerRef.current.clientHeight;

    const particles = [];
    const maxParticles = 80;
    const mouse = { x: null, y: null, active: false };

    const handleResize = () => {
      if (!containerRef.current) return;
      width = canvas.width = containerRef.current.clientWidth;
      height = canvas.height = containerRef.current.clientHeight;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;

      // Spawn crystal particles on move
      if (particles.length < maxParticles) {
        for (let i = 0; i < 2; i++) {
          particles.push({
            x: mouse.x,
            y: mouse.y,
            vx: (Math.random() - 0.5) * 1.6,
            vy: (Math.random() - 0.5) * 1.6 - 0.4, // Slight upward drift
            size: Math.random() * 8 + 4,
            rotation: Math.random() * Math.PI,
            rotSpeed: (Math.random() - 0.5) * 0.04,
            alpha: 1.0,
            // Blue, cyan, and electric blue colors
            hue: Math.random() * 55 + 185, // Hue between 185 (Cyan) and 240 (Royal Blue)
            decay: Math.random() * 0.015 + 0.01,
          });
        }
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = null;
      mouse.y = null;
    };

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    let animationFrameId;

    const drawCrystal = (x, y, size, rotation, hue, alpha) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      // Setup dynamic crystal gradient
      const grad = ctx.createLinearGradient(-size, -size, size, size);
      grad.addColorStop(0, `hsla(${hue}, 100%, 75%, ${alpha})`);
      grad.addColorStop(0.5, `hsla(${hue + 20}, 95%, 85%, ${alpha * 0.8})`);
      grad.addColorStop(1, `hsla(${hue - 20}, 100%, 60%, ${alpha * 0.4})`);

      ctx.fillStyle = grad;
      
      // Neon Glow effect
      ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
      ctx.shadowBlur = size * 1.5;

      // Draw Diamond/Crystal facet shape
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(size * 0.6, 0);
      ctx.lineTo(0, size);
      ctx.lineTo(-size * 0.6, 0);
      ctx.closePath();
      ctx.fill();

      // Delicate facet outlines inside crystal for extra detail
      ctx.shadowBlur = 0;
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.45})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(0, size);
      ctx.moveTo(-size * 0.6, 0);
      ctx.lineTo(size * 0.6, 0);
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      // Clear with soft trails
      ctx.fillStyle = 'rgba(10, 10, 15, 0.16)';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle connecting energy lines between nearby crystal nodes
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            const alpha = (1 - dist / 90) * Math.min(particles[i].alpha, particles[j].alpha) * 0.28;
            ctx.strokeStyle = `hsla(${particles[i].hue}, 80%, 70%, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          drawCrystal(p.x, p.y, p.size, p.rotation, p.hue, p.alpha);
        }
      }

      // Slow ambient floating sparks from bottom to keep background alive
      if (Math.random() < 0.08) {
        particles.push({
          x: Math.random() * width,
          y: height + 10,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -Math.random() * 1.0 - 0.3,
          size: Math.random() * 5 + 3,
          rotation: Math.random() * Math.PI,
          rotSpeed: (Math.random() - 0.5) * 0.03,
          alpha: 0.8,
          hue: Math.random() * 55 + 185, // Blue spectrum
          decay: Math.random() * 0.007 + 0.003,
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none block z-0"
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
