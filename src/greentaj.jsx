import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// ==================== MAIN APP COMPONENT ====================
const GreenTajWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="font-sans antialiased overflow-x-hidden">
      {/* Navigation Bar */}
      <Header 
        scrolled={scrolled} 
        scrollToSection={scrollToSection} 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Hero Section */}
      <HeroSection scrollToSection={scrollToSection} />

      {/* About Us Section */}
      <AboutSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Teams Section */}
      <TeamsSection />

      {/* Expertise Section */}
      <ExpertiseSection />

      {/* Work Process Section */}
      <WorkProcessSection />

      {/* Gallery Section */}
      <GallerySection />

      {/* Industries Section */}
      <IndustriesSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer scrollToSection={scrollToSection} />

      {/* Scroll Progress Indicator */}
      <motion.div 
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-600 origin-left z-50"
      />
    </div>
  );
};

// ==================== HEADER COMPONENT ====================
const Header = ({ scrolled, scrollToSection, mobileMenuOpen, setMobileMenuOpen }) => {
  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Projects', id: 'projects' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' }
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: 'f', label: 'Facebook' },
    { name: 'X', href: '#', icon: 'X', label: 'X (Twitter)' },
    { name: 'Instagram', href: '#', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
    ), label: 'Instagram' }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 px-4 md:px-6 lg:px-8 pt-4"
    >
      {/* Dark green bar with rounded corners */}
      <div className="max-w-7xl mx-auto bg-green-800 rounded-full shadow-lg py-3 px-6 md:px-8">
        <div className="flex justify-between items-center">
          {/* Logo - pill shape */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <div className="px-5 py-2">
              <span className="text-white font-bold text-lg md:text-xl tracking-tight">GREEN TAJ</span>
            </div>
          </motion.div>

          {/* Desktop: Nav + Social + Contact */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            <nav className="flex items-center gap-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-white font-medium text-sm hover:text-green-200 transition-colors"
                >
                  {item.name}
                </motion.button>
              ))}
            </nav>
            <div className="flex items-center gap-5">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  aria-label={link.label}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white hover:text-green-200 transition-colors"
                >
                  {typeof link.icon === 'string' ? (
                    <span className="text-lg font-semibold">{link.icon}</span>
                  ) : (
                    link.icon
                  )}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact us button */}
          <div className="hidden lg:block">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('contact')}
              className="bg-white text-green-800 font-semibold px-6 py-2.5 rounded-full flex items-center gap-2 shadow-md"
            >
              <span>Contact us</span>
              <span className="w-7 h-7 rounded-full bg-green-800 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pt-4 border-t border-green-700"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left text-white hover:text-green-200 transition-colors py-2"
                  >
                    {item.name}
                  </button>
                ))}
                <div className="flex gap-4 py-2">
                  {socialLinks.map((link) => (
                    <a key={link.name} href={link.href} aria-label={link.label} className="text-white hover:text-green-200">
                      {typeof link.icon === 'string' ? <span className="text-lg">{link.icon}</span> : link.icon}
                    </a>
                  ))}
                </div>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-white text-green-800 font-semibold px-6 py-3 rounded-full text-center flex items-center justify-center gap-2 w-full"
                >
                  Contact us
                  <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

// ==================== HERO SECTION (from hero.jsx - with parallax) ====================
const HeroSection = ({ scrollToSection }) => {
  const heroRef = useRef(null);
  const backgroundRef = useRef(null);
  const contentRef = useRef(null);

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

  const lerp = (start, end, factor) => start + (end - start) * factor;

  const calculateTargetValues = () => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const heroHeight = heroRef.current.offsetHeight;
    let progress = 0;
    if (rect.top <= 0) {
      progress = Math.min(Math.abs(rect.top) / heroHeight, 1);
    }
    const maxTranslate = 200;
    setAnimationValues(prev => ({
      ...prev,
      targetTranslateY: -(progress * maxTranslate),
      targetScale: 1 + progress * 0.08,
      targetContentOpacity: 1 - progress * 1.5,
      targetContentTranslateY: progress * 50
    }));
  };

  useEffect(() => {
    let animationFrameId;
    const animate = () => {
      const smoothness = 0.08;
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
    return () => animationFrameId && cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    const handleScroll = () => calculateTargetValues();
    window.addEventListener('scroll', handleScroll, { passive: true });
    calculateTargetValues();
    return () => window.removeEventListener('scroll', handleScroll);
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
          backgroundImage: 'url(https://greentaj.com/wp-content/uploads/2026/01/GreenTaj1-scaled.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        style={{ willChange: 'transform, opacity' }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-[12vw] sm:text-[10vw] md:text-[9rem] lg:text-[12rem] xl:text-[14rem] font-bold text-white leading-none tracking-tighter mb-4"
          style={{ letterSpacing: '-0.02em', lineHeight: '0.9' }}
        >
          GREENTAJ
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-semibold tracking-wide mb-8"
          style={{ opacity: 0.95 }}
        >
          TRADING & CONTRACTING W.L.L
        </motion.p>

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
              animate={{ y: [0, 20, 0], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="absolute top-[10px] left-1/2 transform -translate-x-1/2 w-[6px] h-[10px] bg-white rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// ==================== ABOUT SECTION ====================
const AboutSection = () => {
  const avatars = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100'
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Central Building Image with Overlapping Cards */}
        <div className="relative max-w-5xl mx-auto">
          {/* Background Building Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070"
              alt="Modern Building"
              className="w-full h-[600px] md:h-[700px] object-cover rounded-2xl"
            />
          </motion.div>

          {/* Our Mission Card - Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute left-4 md:-left-12 top-8 md:top-12 bg-white rounded-xl shadow-xl p-6 md:p-8 w-[calc(100%-2rem)] md:w-[400px] z-10"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Our mission
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              At <strong>Green Taj Trading & Contracting</strong>, we specialize in providing expert guidance to bring your ideas to life.
            </p>
          </motion.div>

          {/* Our Vision Card - Right */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute right-4 md:-right-12 bottom-8 md:bottom-12 bg-white rounded-xl shadow-xl p-6 md:p-8 w-[calc(100%-2rem)] md:w-[400px] z-10"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Our vision
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-6">
              Create and track budgets for various categories like transportation. Edit high-quality videos.
            </p>
            
            {/* Rating Component */}
            <div className="flex flex-col gap-3">
              {/* Avatars and Stars */}
              <div className="flex items-center gap-3">
                {/* Overlapping Avatars */}
                <div className="flex -space-x-2">
                  {avatars.map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt={`User ${index + 1}`}
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              {/* Rating Text */}
              <p className="text-gray-700 text-sm">
                1200+ happy users rating
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ==================== SERVICES SECTION ====================
const ServicesSection = () => {
  const services = [
    {
      title: 'MEP Works',
      description: 'Mechanical, Electrical and Plumbing installations with cutting-edge technology providing comfortable spaces for building occupants in residential and commercial buildings.',
      icon: '⚡',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069'
    },
    {
      title: 'General Contracting',
      description: 'Comprehensive construction services including HVAC, Fire Fighting, Fire Suppression, Electrical and Civil Works with top quality, efficiency and productivity.',
      icon: '🏗️',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071'
    },
    {
      title: 'Carpentry Works',
      description: 'Expert carpentry services including cutting, working, and joining timber for structural timberwork, doors, windows, staircases, and custom woodwork.',
      icon: '🪵',
      image: 'https://images.unsplash.com/photo-1617957743089-7ec7c0c13078?q=80&w=2070'
    },
    {
      title: 'Trading',
      description: 'Supply of high-quality construction materials, equipment, and tools to support various projects across commercial and residential sectors.',
      icon: '📦',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070'
    }
  ];

  return (
    <section id="services" className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-green-600 text-sm font-semibold tracking-wider uppercase mb-2">What We Offer</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive Construction &<br />
            <span className="text-green-600">Contracting Services</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            We provide a full spectrum of construction services designed to bring your projects to life with quality, reliability, and expertise.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 text-6xl">{service.icon}</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== TESTIMONIALS SECTION ====================
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Ahmed Al-Mazrouei',
      position: 'Project Manager, ICAS WLL',
      company: 'Al Mazrouei ICAS WLL',
      quote: 'Green Taj exceeded our expectations on multiple projects. Their professionalism, technical expertise, and commitment to timelines were outstanding. We highly recommend them for any MEP and construction work.',
      rating: 5
    },
    {
      name: 'Sarah Johnson',
      position: 'Operations Director',
      company: 'MSI Projects',
      quote: 'Working with Green Taj has been a pleasure. Their attention to detail and quality craftsmanship is evident in every project. They delivered our commercial building MEP works flawlessly.',
      rating: 5
    },
    {
      name: 'Mohammed Hassan',
      position: 'Construction Manager',
      company: 'Arabtec Construction',
      quote: 'Green Taj Trading & Contracting is our go-to partner for carpentry and MEP works. Their skilled team and reliable service make them stand out in Qatar\'s competitive construction market.',
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-green-900 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-green-400 text-sm font-semibold tracking-wider uppercase mb-2">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our Clients Say
          </h2>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
          {[
            { number: '98%', label: 'Projects Completed' },
            { number: '99%', label: 'Client Satisfaction' },
            { number: '500+', label: 'Projects Delivered' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-bold text-green-400 mb-2">{stat.number}</p>
              <p className="text-gray-300 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial Slider */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl"
            >
              <div className="flex items-center mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 italic">
                "{testimonials[currentIndex].quote}"
              </p>
              
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                  {testimonials[currentIndex].name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">{testimonials[currentIndex].name}</p>
                  <p className="text-gray-600">{testimonials[currentIndex].position}</p>
                  <p className="text-green-600 font-semibold">{testimonials[currentIndex].company}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-green-400 w-8' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== PROJECTS SECTION ====================
const ProjectsSection = () => {
  const projects = [
    {
      name: 'Msheireb Downtown Doha',
      category: 'Commercial Development',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070',
      description: 'MEP installation and contracting for sustainable urban development',
      date: 'Mar 15, 2021'
    },
    {
      name: 'Lusail Palace',
      category: 'Luxury Residential',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070',
      description: 'Complete carpentry and MEP works for premium palace construction',
      date: 'Jun 22, 2020'
    },
    {
      name: 'Doha South Sewage Treatment Plant',
      category: 'Infrastructure',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070',
      description: 'Large-scale MEP contracting for critical infrastructure',
      date: 'Sep 8, 2021'
    },
    {
      name: 'Airport Expansion Project',
      category: 'Transportation Hub',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074',
      description: 'Comprehensive construction and MEP services',
      date: 'Nov 12, 2020'
    },
    {
      name: 'Qatar Festival City',
      category: 'Mixed-Use Development',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070',
      description: 'Trading and general contracting services',
      date: 'Feb 28, 2021'
    },
    {
      name: 'Gharafa Palace',
      category: 'Residential Palace',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075',
      description: 'Luxury carpentry and electrical works',
      date: 'Oct 12, 2020'
    }
  ];

  return (
    <section id="projects" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-green-600 text-sm font-semibold tracking-wider uppercase mb-2">Our Work</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Portfolio of <span className="text-green-600">Excellence</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Explore our diverse range of successfully completed projects across Qatar
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer h-[550px]"
            >
              <div className="relative h-full w-full">
                {/* Background Image */}
                <img 
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Default State - Title with Arrow */}
                <div className="absolute bottom-0 left-0 right-0 p-6 group-hover:opacity-0 transition-opacity duration-300">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                    <svg 
                      className="w-5 h-5 text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" 
                      fill="none" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </div>
                </div>

                {/* Hover Overlay - Dark Box with Details */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/95 p-6 transform translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out">
                  {/* Project Title */}
                  <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
                  
                  {/* Subtitle/Description */}
                  <p className="text-white/90 text-sm mb-4 leading-relaxed">{project.description}</p>
                  
                  {/* Separator Line */}
                  <div className="h-px bg-gray-600 mb-4" />
                  
                  {/* Date and Category */}
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-gray-400 text-xs mb-1">Date</p>
                      <p className="text-white text-sm font-medium">{project.date}</p>
                    </div>
                    
                    {/* Vertical Separator */}
                    <div className="w-px h-10 bg-gray-600 mx-4" />
                    
                    <div className="flex-1">
                      <p className="text-gray-400 text-xs mb-1">Category</p>
                      <p className="text-white text-sm font-medium">{project.category}</p>
                    </div>
                  </div>
                  
                  {/* Orange Action Button */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute bottom-6 right-6 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <svg 
                      className="w-5 h-5 text-white" 
                      fill="none" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Notable Clients Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gray-50 rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Trusted by Leading Organizations
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {[
              'Arabtec Construction',
              'Al Mazrouei ICAS',
              'MSI Projects',
              'VA Tech Wabag',
              'Armiti Qatar',
              'Trelco Limited',
              'Interprogetti',
              'Pinnacle Venture',
              'AALCO Group',
              'Kahramaa'
            ].map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-center"
              >
                <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-gray-700 font-semibold text-sm">{client}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ==================== TEAMS SECTION ====================
const TeamsSection = () => {
  const teamMembers = [
    {
      name: 'James Albert',
      role: 'Founder',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000'
    },
    {
      name: 'David Hower',
      role: 'Project Manager',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000'
    },
    {
      name: 'Ann Vasser',
      role: 'Safety Officer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000'
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-green-600 text-sm font-semibold tracking-wider uppercase mb-2">Our Team</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Our <span className="text-green-600">Expert Team</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Dedicated professionals committed to delivering excellence in every project
          </p>
        </motion.div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
            >
              {/* Team Member Image */}
              <div className="relative h-96 overflow-hidden">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gradient Overlay at bottom - fading to white */}
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none" />
                
                {/* Hover Arrow Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  whileHover={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <svg 
                    className="w-5 h-5 text-gray-800" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2.5" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </motion.div>
              </div>

              {/* Team Member Info - Overlaid on gradient */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-gray-500 text-sm font-medium mb-2">{member.role}</p>
                <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== EXPERTISE SECTION ====================
const ExpertiseSection = () => {
  const stats = [
    { number: '500+', label: 'Projects Completed', icon: '🏗️' },
    { number: '98%', label: 'Client Satisfaction', icon: '⭐' },
    { number: '5+', label: 'Years Experience', icon: '📅' },
    { number: '200+', label: 'Expert Team Members', icon: '👥' }
  ];

  const expertise = [
    {
      title: 'Quality Craftsmanship',
      description: 'We pride ourselves on delivering superior quality and craftsmanship in every project we undertake.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Skilled Team',
      description: 'Our highly qualified, experienced, and technical team ensures excellence in execution.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Modern Equipment',
      description: 'Well-equipped with state-of-the-art machinery, tools, and technology for efficient project delivery.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Timely Delivery',
      description: 'Committed to completing all works within agreed timelines without compromising on quality.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-green-600 text-sm font-semibold tracking-wider uppercase mb-2">Our Expertise</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose <span className="text-green-600">Green Taj</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            We combine innovation, expertise, and commitment to deliver exceptional results
          </p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
              <div className="text-sm font-semibold text-gray-700">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Expertise Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {expertise.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* Icon with Gradient Background */}
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${item.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {item.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {item.description}
              </p>

              {/* Decorative Element */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`} />
            </motion.div>
          ))}
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-green-600 to-green-700 p-8 md:p-12 rounded-2xl text-white overflow-hidden group"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20.5z"/%3E%3C/g%3E%3C/svg%3E")'
              }} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <h3 className="text-3xl font-bold">Our Vision</h3>
              </div>
              <p className="text-green-50 leading-relaxed">
                To be the top-most leading company renowned for excellence, quality, performance, and reliability in electro-mechanical works in the global market. We aim to contribute to our clients and stakeholders in Qatar and the region with continuous professional development and sustainable growth.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-12 rounded-2xl text-white overflow-hidden group"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20.5z"/%3E%3C/g%3E%3C/svg%3E")'
              }} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="text-3xl font-bold">Our Mission</h3>
              </div>
              <p className="text-gray-200 leading-relaxed">
                To become the customers' most preferred choice by attaining excellence in quality and delivering timely, value-added projects. We continually innovate and adopt state-of-the-art technology to enhance productivity and build long-lasting relationships with contractors and clients.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ==================== WORK PROCESS SECTION ====================
const WorkProcessSection = () => {
  const services = [
    {
      number: '01',
      title: 'Pro Construction',
      description: 'Our strength lies in our team. From experienced engineers',
      icon: (
        <div className="flex flex-col items-start gap-2">
          {/* Helmet */}
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          {/* Gear */}
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      )
    },
    {
      number: '02',
      title: 'Official Building',
      description: 'Official buildings serve more than a physical function they',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      number: '03',
      title: 'Custom Carpentry',
      description: 'We source only the finest hardwoods and composite',
      icon: (
        <div className="flex items-center gap-2">
          {/* Pencil */}
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          {/* Ruler/Triangle */}
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21l9-9m0 0V3m0 9H3m9 0h9" />
          </svg>
        </div>
      )
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with More Services Button */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12 gap-6">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 max-w-2xl"
          >
            Expert building construction practices to your needs
          </motion.h2>
          
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold text-sm md:text-base whitespace-nowrap flex items-center gap-2 transition-colors shadow-lg"
          >
            <span>&gt;</span> More Services
          </motion.button>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl p-8 relative overflow-hidden group hover:shadow-2xl transition-all duration-300"
            >
              {/* Icon - Top Left */}
              <div className="text-gray-300 mb-6">
                {service.icon}
              </div>

              {/* Numbered Badge - Top Right */}
              <div className="absolute top-6 right-6 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{service.number}</span>
              </div>

              {/* Title */}
              <h3 className="text-green-500 font-bold text-xl mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-white text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== GALLERY SECTION ====================
const GallerySection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'construction', name: 'Construction' },
    { id: 'mep', name: 'MEP Works' },
    { id: 'carpentry', name: 'Carpentry' },
    { id: 'commercial', name: 'Commercial' }
  ];

  const galleryItems = [
    {
      id: 1,
      category: 'construction',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800',
      title: 'Modern Building Construction'
    },
    {
      id: 2,
      category: 'mep',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800',
      title: 'Electrical Installation'
    },
    {
      id: 3,
      category: 'carpentry',
      image: 'https://images.unsplash.com/photo-1617957743089-7ec7c0c13078?q=80&w=800',
      title: 'Custom Woodwork'
    },
    {
      id: 4,
      category: 'commercial',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800',
      title: 'Commercial Development'
    },
    {
      id: 5,
      category: 'construction',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800',
      title: 'Residential Project'
    },
    {
      id: 6,
      category: 'mep',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800',
      title: 'Plumbing Systems'
    },
    {
      id: 7,
      category: 'carpentry',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800',
      title: 'Interior Carpentry'
    },
    {
      id: 8,
      category: 'commercial',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800',
      title: 'Office Complex'
    },
    {
      id: 9,
      category: 'construction',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800',
      title: 'Infrastructure Project'
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-green-600 text-sm font-semibold tracking-wider uppercase mb-2">Our Gallery</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Project <span className="text-green-600">Showcase</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Explore our portfolio of completed projects across various sectors
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                selectedCategory === category.id
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Title on Hover */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <div className="flex items-center gap-2 text-green-400">
                    <span className="text-sm font-semibold">View Details</span>
                    <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {categories.find(cat => cat.id === item.category)?.name || item.category}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// ==================== INDUSTRIES SECTION ====================
const IndustriesSection = () => {
  const industries = [
    'Educational Institutions',
    'Civil Engineering',
    'Healthcare Facilities',
    'Hospitality & Leisure',
    'Energy & Sustainability',
    'Government & Public Sector',
    'Commercial Construction',
    'Residential Development',
    'Industrial Facilities',
    'Infrastructure Projects',
    'Retail & Shopping Centers',
    'Transportation Hubs'
  ];

  // Duplicate industries for seamless infinite scroll
  const duplicatedIndustries = [...industries, ...industries];

  return (
    <section className="py-20 md:py-32 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <p className="text-gray-400 text-sm font-semibold tracking-wider uppercase mb-4">
              Industries we serve
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
              We bring our construction expertise to a diverse range of industries.
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* Right Column - Scrollable Industries List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[500px] overflow-hidden"
          >
            {/* Scrolling Container */}
            <div className="absolute inset-0 flex flex-col gap-4 scroll-container">
              {duplicatedIndustries.map((industry, index) => (
                <div
                  key={`${industry}-${index}`}
                  className="bg-gray-800 text-gray-300 px-6 py-4 rounded-full text-center font-medium text-lg hover:bg-gray-700 hover:text-white transition-all cursor-pointer flex-shrink-0"
                >
                  {industry}
                </div>
              ))}
            </div>

            {/* Gradient Overlays for fade effect */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-900 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none z-10" />
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-up {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-50%);
          }
        }
        .scroll-container {
          animation: scroll-up 25s linear infinite;
        }
        .scroll-container:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

// ==================== CONTACT SECTION ====================
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-green-600 text-sm font-semibold tracking-wider uppercase mb-2">Contact Us</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Let's Build <span className="text-green-600">Together</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Get in touch with us to discuss your project requirements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Address</p>
                    <p className="text-gray-600">P.O. Box 46064, Doha, Qatar</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Phone</p>
                    <p className="text-gray-600">+974-55248447</p>
                    <p className="text-gray-600">+974-77248447</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Email</p>
                    <p className="text-gray-600">greentajtrading1@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Business Hours</p>
                    <p className="text-gray-600">Saturday - Thursday: 8:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Friday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center">
              <p className="text-gray-500">Map Location - Doha, Qatar</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="+974 XXXX XXXX"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
                >
                  Send Message
                </motion.button>

                {/* Success Message */}
                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg"
                    >
                      <p className="font-semibold">Thank you! Your message has been sent successfully.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ==================== FOOTER COMPONENT ====================
const Footer = ({ scrollToSection }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="text-green-400">GREEN</span> TAJ
            </div>
            <p className="text-gray-400 mb-4">
              Building your future with precision and expertise in Qatar since 2019.
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <span className="text-lg">f</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <span className="text-lg">in</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <span className="text-lg">@</span>
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollToSection(link.toLowerCase())}
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Our Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>MEP Works</li>
              <li>General Contracting</li>
              <li>Carpentry Works</li>
              <li>Trading</li>
              <li>Maintenance Services</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>P.O. Box 46064, Doha, Qatar</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+974-55248447</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>greentajtrading1@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Green Taj Trading & Contracting W.L.L. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ==================== EXPORT ====================
export default GreenTajWebsite;