import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// ==================== UPDATED HERO SECTION WITH PARALLAX ====================
const HeroSection = ({ scrollToSection }) => {
  const heroRef = useRef(null);
  const backgroundRef = useRef(null);
  const contentRef = useRef(null);

  // Smooth animation state
  const [animationValues, setAnimationValues] = useState({
    currentTranslateY: 0,
    currentScale: 1,
    currentContentOpacity: 1,
    currentContentTranslateY: 0,
    targetTranslateY: 0,
    targetScale: 1,
    targetContentOpacity: 1,
    targetContentTranslateY: 0
  });

  // Lerp (Linear Interpolation) function for smooth transitions
  const lerp = (start, end, factor) => {
    return start + (end - start) * factor;
  };

  // Calculate target values based on scroll
  const calculateTargetValues = () => {
    if (!heroRef.current) return;

    const rect = heroRef.current.getBoundingClientRect();
    const heroHeight = heroRef.current.offsetHeight;

    let progress = 0;

    if (rect.top <= 0) {
      progress = Math.abs(rect.top) / heroHeight;
      progress = Math.min(progress, 1);
    }

    // Calculate target values
    const maxTranslate = 200;
    const targetTranslateY = -(progress * maxTranslate);

    const minScale = 1;
    const maxScale = 1.08;
    const targetScale = minScale + (progress * (maxScale - minScale));

    const targetContentOpacity = 1 - (progress * 1.5);
    const targetContentTranslateY = progress * 50;

    setAnimationValues(prev => ({
      ...prev,
      targetTranslateY,
      targetScale,
      targetContentOpacity,
      targetContentTranslateY
    }));
  };

  // Animation loop
  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      const smoothness = 0.08; // Adjust for desired smoothness

      setAnimationValues(prev => {
        const newValues = {
          currentTranslateY: lerp(prev.currentTranslateY, prev.targetTranslateY, smoothness),
          currentScale: lerp(prev.currentScale, prev.targetScale, smoothness),
          currentContentOpacity: lerp(prev.currentContentOpacity, prev.targetContentOpacity, smoothness),
          currentContentTranslateY: lerp(prev.currentContentTranslateY, prev.targetContentTranslateY, smoothness),
          targetTranslateY: prev.targetTranslateY,
          targetScale: prev.targetScale,
          targetContentOpacity: prev.targetContentOpacity,
          targetContentTranslateY: prev.targetContentTranslateY
        };

        // Apply transforms
        if (backgroundRef.current) {
          backgroundRef.current.style.transform = `translateY(${newValues.currentTranslateY}px) scale(${newValues.currentScale})`;
        }
        if (contentRef.current) {
          contentRef.current.style.opacity = Math.max(0, newValues.currentContentOpacity);
          contentRef.current.style.transform = `translateY(${newValues.currentContentTranslateY}px)`;
        }

        return newValues;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      calculateTargetValues();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    calculateTargetValues(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Background with Parallax Effect */}
      <div 
        ref={backgroundRef}
        className="absolute -top-[15%] left-0 w-full h-[130%]"
        style={{
          willChange: 'transform',
          backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div 
        ref={contentRef}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Large "GREENTAJ" Text */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-[12vw] sm:text-[10vw] md:text-[9rem] lg:text-[12rem] xl:text-[14rem] font-bold text-white leading-none tracking-tighter mb-4"
          style={{
            letterSpacing: '-0.02em',
            lineHeight: '0.9'
          }}
        >
          GREENTAJ
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-light tracking-wide mb-8"
          style={{ opacity: 0.95 }}
        >
          TRADING & CONTRACTING W.L.L
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
            className="inline-block px-10 py-4 bg-white text-gray-800 rounded-full font-semibold text-lg transition-all shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)]"
          >
            Get Started
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('about')}
            className="inline-block px-10 py-4 border-2 border-white text-white rounded-full font-semibold text-lg transition-all hover:bg-white hover:text-gray-800"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center"
        >
          <div className="w-[30px] h-[50px] border-2 border-white rounded-full relative">
            <motion.div
              animate={{ 
                y: [0, 20, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
              className="absolute top-[10px] left-1/2 transform -translate-x-1/2 w-[6px] h-[10px] bg-white rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;