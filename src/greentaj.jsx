/*
  ============================================================
  GREENTAJ WEBSITE — MAIN COMPONENT FILE
  ============================================================
  Import order:
    1. React & hooks
    2. Framer Motion
    3. CSS stylesheet

  Component order mirrors the page layout top → bottom:
    GreenTajWebsite (root)
      ├── Header
      ├── HeroSection
      ├── AboutSection
      ├── ServicesSection
      ├── ProjectsSection
      ├── TeamsSection
      ├── WorkProcessSection
      ├── GallerySection
      ├── IndustriesSection
      ├── ContactSection
      ├── TestimonialsSection
      └── Footer
  ============================================================
*/

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import './greentaj.css';


/* ============================================================
   ROOT COMPONENT
   ============================================================ */
const GreenTajWebsite = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled]             = useState(false);
  const [headerVisible, setHeaderVisible]   = useState(true);
  const lastScrollY = useRef(0);

  // Scroll progress bar (Framer Motion)
  const { scrollYProgress } = useScroll();

  // Show/hide header based on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      if (y < lastScrollY.current || y < 80) {
        setHeaderVisible(true);   // scrolling up → show
      } else if (y > lastScrollY.current && y > 80) {
        setHeaderVisible(false);  // scrolling down → hide
      }

      setScrolled(y > 50);
      lastScrollY.current = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth-scroll helper shared across all child components
  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="font-sans">

      {/* Thin progress bar across the very top of the viewport */}
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX: scrollYProgress }}
      />

      <Header
        scrolled={scrolled}
        headerVisible={headerVisible}
        scrollToSection={scrollToSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <HeroSection       scrollToSection={scrollToSection} />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <TeamsSection />
      <GallerySection />
      <IndustriesSection />
      <ContactSection />
      <TestimonialsSection />
      <Footer scrollToSection={scrollToSection} />

    </div>
  );
};


/* ============================================================
   HEADER
   ============================================================ */

/* ---------- Small SVG icons used only inside the Header ---------- */
const IconFacebook = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const IconX = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
  </svg>
);

const IconInstagram = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

/* Diagonal arrow (used in the CTA pill) */
const IconDiagArrow = () => (
  <svg viewBox="0 0 256 256" width="15" height="15">
    <line x1="64" y1="192" x2="192" y2="64" stroke="currentColor" strokeWidth="22" strokeLinecap="round"/>
    <polyline points="88 64 192 64 192 168" stroke="currentColor" strokeWidth="22" strokeLinecap="round" fill="none"/>
  </svg>
);

const NAV_ITEMS = [
  { label: 'Home',     id: 'home'     },
  { label: 'Projects', id: 'projects' },
  { label: 'About',    id: 'about'    },
  { label: 'Services', id: 'services' },
];

const Header = ({ scrolled, headerVisible, scrollToSection, mobileMenuOpen, setMobileMenuOpen }) => (
  <motion.header
    className="header"
    initial={{ y: -150, opacity: 0 }}
    animate={{ y: headerVisible ? 0 : -120, opacity: headerVisible ? 1 : 0 }}
    transition={{
      duration: headerVisible ? 1.5 : 0.8,
      ease: [0.16, 1, 0.3, 1]
    }}
  >
    {/* Green pill capsule */}
    <div className={`header__capsule ${scrolled ? 'header__capsule--scrolled' : ''}`}>

      {/* Logo */}
      <div className="header__logo" onClick={() => scrollToSection('home')}>
        GREEN TAJ
      </div>

      {/* Desktop center nav */}
      <nav className="header__nav">
        {NAV_ITEMS.map(item => (
          <button key={item.id} className="header__nav-btn" onClick={() => scrollToSection(item.id)}>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Desktop right: social icons + CTA */}
      <div className="header__right">
        <div className="header__socials">
          <a href="#" className="header__social-link"><IconFacebook /></a>
          <a href="#" className="header__social-link"><IconX /></a>
          <a href="#" className="header__social-link"><IconInstagram /></a>
        </div>

        {/* Contact pill button */}
        <button className="contact-pill" onClick={() => scrollToSection('contact')}>
          <span className="contact-pill__label">Contact us</span>
          <span className="contact-pill__icon">
            <span className="arrow arrow--default"><IconDiagArrow /></span>
            <span className="arrow arrow--hover"><IconDiagArrow /></span>
          </span>
        </button>
      </div>

      {/* Hamburger (mobile) */}
      <button className="header__hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          {mobileMenuOpen
            ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/>
            : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/>}
        </svg>
      </button>
    </div>

    {/* Mobile dropdown */}
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          className="header__mobile-menu"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {NAV_ITEMS.map(item => (
            <button key={item.id} className="header__mobile-item" onClick={() => scrollToSection(item.id)}>
              {item.label}
            </button>
          ))}
          <button className="header__mobile-cta" onClick={() => scrollToSection('contact')}>
            Contact us
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.header>
);


/* ============================================================
   HERO SECTION
   Parallax background + content fade driven by rAF loop
   ============================================================ */
const HeroSection = ({ scrollToSection }) => {
  const heroRef      = useRef(null);
  const bgRef        = useRef(null);
  const contentRef   = useRef(null);

  // Targets (set from scroll events)
  const target = useRef({ ty: 0, scale: 1, opacity: 1, cy: 0 });
  // Current interpolated values
  const current = useRef({ ty: 0, scale: 1, opacity: 1, cy: 0 });

  const lerp = (a, b, t) => a + (b - a) * t;
  const SMOOTH = 0.08;

  // Update target values from scroll position
  const calcTargets = () => {
    if (!heroRef.current) return;
    const rect     = heroRef.current.getBoundingClientRect();
    const h        = heroRef.current.offsetHeight;
    const progress = rect.top <= 0 ? Math.min(Math.abs(rect.top) / h, 1) : 0;

    target.current.ty      = -(progress * 200);
    target.current.scale   = 1 + progress * 0.08;
    target.current.opacity = 1 - progress * 1.5;
    target.current.cy      = progress * 50;
  };

  // rAF animation loop
  useEffect(() => {
    let rafId;

    const tick = () => {
      const c = current.current;
      const t = target.current;

      c.ty      = lerp(c.ty,      t.ty,      SMOOTH);
      c.scale   = lerp(c.scale,   t.scale,   SMOOTH);
      c.opacity = lerp(c.opacity, t.opacity, SMOOTH);
      c.cy      = lerp(c.cy,      t.cy,      SMOOTH);

      if (bgRef.current)
        bgRef.current.style.transform = `translateY(${c.ty}px) scale(${c.scale})`;

      if (contentRef.current) {
        contentRef.current.style.opacity   = Math.max(0, c.opacity);
        contentRef.current.style.transform = `translateY(${c.cy}px)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', calcTargets, { passive: true });
    calcTargets();
    return () => window.removeEventListener('scroll', calcTargets);
  }, []);

  return (
    <section id="home" ref={heroRef} className="hero">

      {/* Parallax background image */}
      <div
        ref={bgRef}
        className="hero__bg"
        style={{ backgroundImage: 'url(https://greentaj.com/wp-content/uploads/2026/01/GreenTaj1-scaled.jpg)' }}
      />

      {/* Centered text content */}
      <div ref={contentRef} className="hero__content">
        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          GREENTAJ
        </motion.h1>

        <motion.div
          className="hero__subtitle-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <span className="hero__rule" />
          <span>TRADING &amp; CONTRACTING W.L.L</span>
          <span className="hero__rule" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="hero__scroll-box">
          <div className="hero__scroll-dot" />
        </div>
      </motion.div>

    </section>
  );
};


/* ============================================================
   ABOUT SECTION
   ============================================================ */

// Avatars for the vision card
const AVATARS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100',
];

const StarIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
  </svg>
);

const AboutSection = () => (
  <section id="about" className="about">
    <div className="about__wrap">

      {/* Main photo */}
      <motion.img
        className="about__photo"
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070"
        alt="Green Taj building"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />

      {/* Mission card — top-left */}
      <motion.div
        className="about__card about__card--mission"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="about__card-title">Our mission</h3>
        <p className="about__card-body">
          At <strong>Green Taj Trading &amp; Contracting</strong>, we specialize in
          providing expert guidance to bring your ideas to life.
        </p>
      </motion.div>

      {/* Vision card — bottom-right */}
      <motion.div
        className="about__card about__card--vision"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="about__card-title">Our vision</h3>
        <p className="about__card-body">
          Delivering innovative, sustainable construction solutions that exceed
          client expectations across Qatar and the region.
        </p>

        {/* Avatars + stars */}
        <div className="about__avatars">
          {AVATARS.map((src, i) => (
            <img key={i} className="about__avatar" src={src} alt={`client ${i}`} />
          ))}
        </div>
        <div className="about__stars">
          {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
        </div>
        <p className="about__rating-label">1200+ happy clients</p>
      </motion.div>

    </div>
  </section>
);


/* ============================================================
   SERVICES SECTION
   ============================================================ */

const SERVICES = [
  {
    id: 0,
    title: 'General Contracting',
    desc:  'Team work with subcontractors, suppliers, and stakeholders to streamline workflows.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070',
  },
  {
    id: 1,
    title: 'Design & Build',
    desc:  'Our integrated design & build approach simplifies the construction process.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071',
  },
  {
    id: 2,
    title: 'Renew & Redesign',
    desc:  'We enhance functionality, boost energy efficiency, and promote sustainability.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069',
  },
  {
    id: 3,
    title: 'Civil & Infrastructure',
    desc:  'Our expertise covers roads, bridges, drainage systems, and public infrastructure.',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070',
  },
];

// Framer Motion slide variants
const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: 'easeInOut' } },
  exit:  (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }),
};

const ServicesSection = () => {
  const [active, setActive]     = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (index) => {
    if (index === active) return;
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };

  const prev = () => goTo((active - 1 + SERVICES.length) % SERVICES.length);
  const next = () => goTo((active + 1)                   % SERVICES.length);

  // Simple arrow icon
  const ChevronLeft  = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>;
  const ChevronRight = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>;

  return (
    <section id="services" className="services">
      <div className="services__wrap">

        {/* Top row: heading + slideshow */}
        <div className="services__top-grid">

          {/* Left: text */}
          <div>
            <p className="services__eyebrow">Our services</p>
            <h2 className="services__heading">
              From project planning to final execution, we manage every aspect
              with a focus on quality, timelines, and budget.
            </h2>

            <button className="contact-pill" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
              <span className="contact-pill__label">Learn More</span>
              <span className="contact-pill__icon">
                <span className="arrow arrow--default"><IconDiagArrow /></span>
                <span className="arrow arrow--hover"><IconDiagArrow /></span>
              </span>
            </button>

            {/* Prev / Next */}
            <div className="services__nav">
              <button className="services__nav-btn" onClick={prev}><ChevronLeft /></button>
              <button className="services__nav-btn" onClick={next}><ChevronRight /></button>
            </div>
          </div>

          {/* Right: sliding image */}
          <div className="services__slides">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={active}
                className="services__slide-img"
                src={SERVICES[active].image}
                alt={SERVICES[active].title}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              />
            </AnimatePresence>
          </div>

        </div>

        {/* Divider */}
        <hr className="services__divider" />

        {/* Tab row */}
        <div className="services__tab-row">
          {SERVICES.map((s, i) => (
            <div
              key={s.id}
              className={`services__tab ${i === active ? 'services__tab--active' : ''}`}
              onClick={() => goTo(i)}
            >
              <h3 className="services__tab-name">{s.title}</h3>
              <p className="services__tab-desc">{s.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};


/* ============================================================
   PROJECTS SECTION
   ============================================================ */

const PROJECTS = [
  { name: 'Msheireb Downtown Doha',       category: 'Commercial Development', date: 'Mar 15, 2021', desc: 'MEP installation and contracting for sustainable urban development',         image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070' },
  { name: 'Lusail Palace',                category: 'Luxury Residential',     date: 'Jun 22, 2020', desc: 'Complete carpentry and MEP works for premium palace construction',            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070' },
  { name: 'Doha South Sewage Treatment',  category: 'Infrastructure',         date: 'Sep 8, 2021',  desc: 'Large-scale MEP contracting for critical infrastructure project',            image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070' },
  { name: 'Airport Expansion Project',    category: 'Transportation Hub',     date: 'Nov 12, 2020', desc: 'Comprehensive construction and MEP services for airport expansion',          image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074' },
  { name: 'Qatar Festival City',          category: 'Mixed-Use Development',  date: 'Feb 28, 2021', desc: 'Trading and general contracting services for large mixed-use complex',       image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070' },
  { name: 'Gharafa Palace',               category: 'Residential Palace',     date: 'Oct 12, 2020', desc: 'Luxury carpentry and electrical works for prestigious residential palace',   image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075' },
];

const CLIENTS = [
  'Arabtec Construction', 'Al Mazrouei ICAS', 'MSI Projects', 'VA Tech Wabag', 'Armiti Qatar',
  'Trelco Limited',       'Interprogetti',    'Pinnacle Venture', 'AALCO Group', 'Kahramaa',
];

// Arrow SVG reused in project cards
const IconArrowDiag = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
    <path d="M7 17L17 7M7 7h10v10"/>
  </svg>
);

const ProjectsSection = () => (
  <section id="projects" className="projects">
    <div className="projects__wrap">

      {/* Section header */}
      <div className="section-header">
        <span className="section-label">Our Work</span>
        <h2 className="section-title">Portfolio of <span className="highlight">Excellence</span></h2>
        <p className="section-subtitle">Explore our diverse range of successfully completed projects across Qatar</p>
      </div>

      {/* 2-column card grid */}
      <div className="projects__grid">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={i}
            className="project-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <img className="project-card__img" src={project.image} alt={project.name} />
            <div className="project-card__gradient" />

            {/* Default name bar */}
            <div className="project-card__bar">
              <h3 className="project-card__bar-title">{project.name}</h3>
            </div>

            {/* Hover detail panel */}
            <div className="project-card__detail">
              <h3 className="project-card__detail-title">{project.name}</h3>
              <p className="project-card__detail-desc">{project.desc}</p>

              <div className="project-card__meta-row">
                <div className="project-card__meta-group">
                  <p className="project-card__meta-key">Date</p>
                  <p className="project-card__meta-val">{project.date}</p>
                </div>
                <div className="project-card__meta-divider" />
                <div className="project-card__meta-group">
                  <p className="project-card__meta-key">Category</p>
                  <p className="project-card__meta-val">{project.category}</p>
                </div>
              </div>

              <div className="project-card__arrow"><IconArrowDiag /></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Client logos */}
      <div className="projects__clients">
        <h3 className="projects__clients-title">Trusted by Leading Organizations</h3>
        <div className="projects__clients-grid">
          {CLIENTS.map((name, i) => (
            <motion.div
              key={i}
              className="client-tag"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  </section>
);


/* ============================================================
   TEAMS SECTION
   ============================================================ */

const TEAM = [
  { name: 'James Albert', role: 'Founder',         image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000' },
  { name: 'David Hower',  role: 'Project Manager', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000' },
  { name: 'Ann Vasser',   role: 'Safety Officer',  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000' },
];

const TeamsSection = () => (
  <section className="teams">
    <div className="teams__wrap">

      <div className="section-header">
        <span className="section-label">Our Team</span>
        <h2 className="section-title">Meet Our <span className="highlight">Expert Team</span></h2>
        <p className="section-subtitle">Dedicated professionals committed to delivering excellence in every project</p>
      </div>

      <div className="teams__grid">
        {TEAM.map((member, i) => (
          <motion.div
            key={i}
            className="team-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="team-card__photo-wrap">
              <img className="team-card__photo" src={member.image} alt={member.name} />
              <div className="team-card__fade" />

              {/* Arrow badge on hover */}
              <div className="team-card__arrow-badge">
                <IconArrowDiag />
              </div>
            </div>

            <div className="team-card__info">
              <p className="team-card__role">{member.role}</p>
              <h3 className="team-card__name">{member.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  </section>
);


/* ============================================================
   WORK PROCESS SECTION
   ============================================================ */

// SVG icons for each process card
const ProcessIcons = {
  '01': (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
      <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
    </div>
  ),
  '02': (
    <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
  ),
  '03': (
    <div style={{ display: 'flex', gap: 8 }}>
      <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
      <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21l9-9m0 0V3m0 9H3m9 0h9"/></svg>
    </div>
  ),
};

const PROCESS_CARDS = [
  { num: '01', title: 'Pro Construction',  desc: 'Our strength lies in our team. From experienced engineers to skilled craftsmen, every member brings deep expertise.' },
  { num: '02', title: 'Official Building', desc: 'Official buildings serve more than a physical function — they represent trust, reliability, and institutional pride.' },
  { num: '03', title: 'Custom Carpentry',  desc: 'We source only the finest hardwoods and composite materials for lasting, precision-crafted results.' },
];

const WorkProcessSection = () => (
  <section className="work-process">
    <div className="work-process__wrap">

      {/* Header row */}
      <div className="work-process__header">
        <motion.h2
          className="work-process__title"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          Expert building construction practices tailored to your needs
        </motion.h2>

        <motion.button
          className="btn btn--green btn--pill"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
        >
          More Services
        </motion.button>
      </div>

      {/* 3 dark process cards */}
      <div className="work-process__grid">
        {PROCESS_CARDS.map((card, i) => (
          <motion.div
            key={card.num}
            className="process-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="process-card__icon">{ProcessIcons[card.num]}</div>
            <div className="process-card__badge">{card.num}</div>
            <h3 className="process-card__title">{card.title}</h3>
            <p className="process-card__desc">{card.desc}</p>
          </motion.div>
        ))}
      </div>

    </div>
  </section>
);


/* ============================================================
   GALLERY SECTION
   ============================================================ */

const CATEGORIES = [
  { id: 'all',          label: 'All Projects'  },
  { id: 'construction', label: 'Construction'  },
  { id: 'mep',          label: 'MEP Works'     },
  { id: 'carpentry',    label: 'Carpentry'     },
  { id: 'commercial',   label: 'Commercial'    },
];

const GALLERY_ITEMS = [
  { id: 1, cat: 'construction', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800', title: 'Modern Building Construction' },
  { id: 2, cat: 'mep',          image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800', title: 'Electrical Installation'        },
  { id: 3, cat: 'carpentry',    image: 'https://images.unsplash.com/photo-1617957743089-7ec7c0c13078?q=80&w=800', title: 'Custom Woodwork'                },
  { id: 4, cat: 'commercial',   image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800', title: 'Commercial Development'         },
  { id: 5, cat: 'construction', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800', title: 'Residential Project'            },
  { id: 6, cat: 'mep',          image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800', title: 'Plumbing Systems'               },
  { id: 7, cat: 'carpentry',    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800', title: 'Interior Carpentry'             },
  { id: 8, cat: 'commercial',   image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800', title: 'Office Complex'                 },
  { id: 9, cat: 'construction', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800', title: 'Infrastructure Project'         },
];

const GallerySection = () => {
  const [activeCat, setActiveCat] = useState('all');

  const filtered = activeCat === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.cat === activeCat);

  const catLabel = (id) => CATEGORIES.find(c => c.id === id)?.label ?? id;

  return (
    <section id="gallery" className="gallery">
      <div className="gallery__wrap">

        <div className="section-header">
          <span className="section-label">Our Gallery</span>
          <h2 className="section-title">Project <span className="highlight">Showcase</span></h2>
          <p className="section-subtitle">Explore our portfolio of completed projects across various sectors</p>
        </div>

        {/* Filter buttons */}
        <div className="gallery__filters">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`gallery__filter-btn ${activeCat === cat.id ? 'gallery__filter-btn--active' : ''}`}
              onClick={() => setActiveCat(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Image grid */}
        <div className="gallery__grid">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              className="gallery-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <img className="gallery-card__img" src={item.image} alt={item.title} />
              <div className="gallery-card__overlay" />

              {/* Info on hover */}
              <div className="gallery-card__info">
                <h4 className="gallery-card__info-title">{item.title}</h4>
                <span className="gallery-card__info-link">
                  View Details <IconArrowDiag />
                </span>
              </div>

              {/* Category tag */}
              <span className="gallery-card__tag">{catLabel(item.cat)}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="gallery__cta">
          <button
            className="contact-pill"
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="contact-pill__label">View All Projects</span>
            <span className="contact-pill__icon">
              <span className="arrow arrow--default"><IconDiagArrow /></span>
              <span className="arrow arrow--hover"><IconDiagArrow /></span>
            </span>
          </button>
        </div>

      </div>
    </section>
  );
};


/* ============================================================
   INDUSTRIES SECTION
   ============================================================ */

const INDUSTRIES = [
  'Educational Institutions', 'Civil Engineering',        'Healthcare Facilities',
  'Hospitality & Leisure',   'Energy & Sustainability',  'Government & Public Sector',
  'Commercial Construction', 'Residential Development',  'Industrial Facilities',
  'Infrastructure Projects', 'Retail & Shopping Centers','Transportation Hubs',
];

const IndustriesSection = () => (
  <section className="industries">
    <div className="industries__wrap">

      {/* Left: text + button */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="industries__eyebrow">Industries we serve</p>
        <h2 className="industries__heading">
          We bring our construction expertise to a diverse range of industries.
        </h2>
        <button
          className="contact-pill"
          onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="contact-pill__label">Learn More</span>
          <span className="contact-pill__icon">
            <span className="arrow arrow--default"><IconDiagArrow /></span>
            <span className="arrow arrow--hover"><IconDiagArrow /></span>
          </span>
        </button>
      </motion.div>

      {/* Right: auto-scrolling pill list */}
      <motion.div
        className="industries__scroll-col"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Gradient fade masks */}
        <div className="industries__fade-top" />
        <div className="industries__fade-bottom" />

        {/* Duplicated so scroll loops seamlessly */}
        <div className="industries__track">
          {[...INDUSTRIES, ...INDUSTRIES].map((name, i) => (
            <div key={`${name}-${i}`} className="industry-pill">{name}</div>
          ))}
        </div>
      </motion.div>

    </div>
  </section>
);


/* ============================================================
   CONTACT SECTION
   ============================================================ */

const CONTACT_INFO = [
  {
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z',
    label: 'Address',
    value: 'P.O. Box 46064, Doha, Qatar',
  },
  {
    icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    label: 'Phone',
    value: '+974-55248447 / +974-77248447',
  },
  {
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    label: 'Email',
    value: 'info@greentaj.com',
  },
  {
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    label: 'Business Hours',
    value: 'Sat–Thu: 8:00 AM – 6:00 PM  |  Fri: Closed',
  },
];

const FORM_FIELDS = [
  { id: 'name',  label: 'Full Name *',      type: 'text',  placeholder: 'John Doe',           required: true  },
  { id: 'email', label: 'Email Address *',  type: 'email', placeholder: 'john@example.com',   required: true  },
  { id: 'phone', label: 'Phone Number',     type: 'tel',   placeholder: '+974 XXXX XXXX',     required: false },
];

const ContactSection = () => {
  const [form, setForm]       = useState({ name: '', email: '', phone: '', message: '' });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setForm({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setSuccess(false), 3500);
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__wrap">

        <div className="section-header">
          <span className="section-label">Contact Us</span>
          <h2 className="section-title">Let's Build <span className="highlight">Together</span></h2>
          <p className="section-subtitle">Get in touch with us to discuss your project requirements</p>
        </div>

        <div className="contact__grid">

          {/* Left: info + map */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="contact__info-card">
              <h3 className="contact__info-heading">Contact Information</h3>
              <ul className="contact__info-list">
                {CONTACT_INFO.map((item, i) => (
                  <li key={i} className="contact__info-item">
                    <span className="contact__info-icon">
                      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                        <path d={item.icon}/>
                      </svg>
                    </span>
                    <div>
                      <p className="contact__info-key">{item.label}</p>
                      <p className="contact__info-val">{item.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="contact__map">Map Location — Doha, Qatar</div>
          </motion.div>

          {/* Right: form */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="contact__form-card">
              <h3 className="contact__form-heading">Send Us a Message</h3>
              <form className="contact__form" onSubmit={handleSubmit}>

                {/* Text / Email / Tel fields */}
                {FORM_FIELDS.map(f => (
                  <div key={f.id} className="contact__field">
                    <label htmlFor={f.id}>{f.label}</label>
                    <input
                      className="contact__input"
                      id={f.id}
                      name={f.id}
                      type={f.type}
                      placeholder={f.placeholder}
                      required={f.required}
                      value={form[f.id]}
                      onChange={handleChange}
                    />
                  </div>
                ))}

                {/* Message textarea */}
                <div className="contact__field">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    className="contact__textarea"
                    id="message"
                    name="message"
                    placeholder="Tell us about your project..."
                    required
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <button className="contact__submit" type="submit">Send Message</button>

                {/* Success toast */}
                <AnimatePresence>
                  {success && (
                    <motion.p
                      className="contact__success"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      ✓ Thank you! Your message has been sent successfully.
                    </motion.p>
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


/* ============================================================
   TESTIMONIALS SECTION
   ============================================================ */

const TESTIMONIALS = [
  {
    name:     'Ahmed Al-Mazrouei',
    position: 'Project Manager, ICAS WLL',
    company:  'Al Mazrouei ICAS WLL',
    quote:    'Green Taj exceeded our expectations on multiple projects. Their professionalism, technical expertise, and commitment to timelines were outstanding.',
    rating:   5,
  },
  {
    name:     'Sarah Johnson',
    position: 'Operations Director',
    company:  'MSI Projects',
    quote:    'Working with Green Taj has been a pleasure. Their attention to detail and quality craftsmanship is evident in every project they deliver.',
    rating:   5,
  },
  {
    name:     'Mohammed Hassan',
    position: 'Construction Manager',
    company:  'Arabtec Construction',
    quote:    "Green Taj is our go-to partner for carpentry and MEP works. Their skilled team and reliable service make them stand out in Qatar's construction market.",
    rating:   5,
  },
];

const STATS = [
  { num: '98%',  label: 'Projects Completed'  },
  { num: '99%',  label: 'Client Satisfaction' },
  { num: '500+', label: 'Projects Delivered'  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  // Auto-advance every 5 s
  useEffect(() => {
    const timer = setInterval(() => setCurrent(prev => (prev + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const t = TESTIMONIALS[current];

  return (
    <section className="testimonials">
      <div className="testimonials__pattern" />

      <div className="testimonials__wrap">

        {/* Header */}
        <div className="section-header">
          <span className="services__eyebrow">Testimonials</span>
          <h2 className="section-title section-title--white">What Our Clients Say</h2>
        </div>

        {/* Stats */}
        <div className="testimonials__stats">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="testimonials__stat-num">{s.num}</span>
              <span className="testimonials__stat-lbl">{s.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Animated testimonial card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="testimonial-card"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.45 }}
          >
            <div className="testimonial-card__stars">
              {[...Array(t.rating)].map((_, i) => <StarIcon key={i} />)}
            </div>

            <p className="testimonial-card__quote">"{t.quote}"</p>

            <div className="testimonial-card__author">
              <div className="testimonial-card__avatar">{t.name.charAt(0)}</div>
              <div>
                <p className="testimonial-card__name">{t.name}</p>
                <p className="testimonial-card__position">{t.position}</p>
                <p className="testimonial-card__company">{t.company}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dot navigation */}
        <div className="testimonials__dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`testimonials__dot ${i === current ? 'testimonials__dot--active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};


/* ============================================================
   FOOTER
   ============================================================ */

const FOOTER_QUICK_LINKS = ['Home', 'About Us', 'Our Services', 'Projects', 'Contact Us'];
const FOOTER_SERVICES    = ['MEP Works', 'General Contracting', 'Carpentry Works', 'Trading', 'Maintenance Services'];

const FOOTER_SOCIALS = [
  {
    label: 'Facebook',
    href: '#',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
  },
  {
    label: 'Twitter',
    href: '#',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>,
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
  },
  {
    label: 'Instagram',
    href: '#',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  },
];

// Contact rows (icon path + label)
const FOOTER_CONTACT = [
  { path: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', text: '+974-55248447' },
  { path: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',                                                                                                                        text: 'greentajtrading1@gmail.com' },
  { path: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z',                                                                                                          text: 'P.O. Box 46064, Doha, Qatar' },
];

// Stagger animation for columns
const columnVariants = {
  hidden:  { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Footer = ({ scrollToSection }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  // Trigger column animations when footer enters viewport
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className="footer" ref={ref}>
      <div className="footer__top-line" />
      <div className="footer__glow" />

      <div className="footer__inner">
        <div className="footer__columns">

          {/* Col 1 — Brand */}
          <motion.div custom={0} variants={columnVariants} initial="hidden" animate={visible ? 'visible' : 'hidden'}>
            <img
              className="footer__logo"
              src="https://greentaj.com/wp-content/uploads/2026/02/greentajlogo-1.png"
              alt="Green Taj Logo"
            />
            <p className="footer__tagline">
              Building your future with precision and expertise in Qatar since 2019.
            </p>
            <div className="footer__socials">
              {FOOTER_SOCIALS.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  className="footer__social"
                  aria-label={s.label}
                  whileHover={{ scale: 1.12, y: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Col 2 — Quick Links */}
          <motion.div custom={1} variants={columnVariants} initial="hidden" animate={visible ? 'visible' : 'hidden'}>
            <h3 className="footer__col-title">Quick Links</h3>
            <ul className="footer__list">
              {FOOTER_QUICK_LINKS.map(link => (
                <li key={link} className="footer__list-item">
                  <span className="footer__bullet" />
                  <button
                    className="footer__link"
                    onClick={() => scrollToSection(link.toLowerCase().replace(/\s+/g, ''))}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3 — Services */}
          <motion.div custom={2} variants={columnVariants} initial="hidden" animate={visible ? 'visible' : 'hidden'}>
            <h3 className="footer__col-title">Our Services</h3>
            <ul className="footer__list">
              {FOOTER_SERVICES.map(s => (
                <li key={s} className="footer__list-item">
                  <span className="footer__bullet" />
                  <span className="footer__plain">{s}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4 — Contact */}
          <motion.div custom={3} variants={columnVariants} initial="hidden" animate={visible ? 'visible' : 'hidden'}>
            <h3 className="footer__col-title">Contact Us</h3>
            <ul className="footer__contacts">
              {FOOTER_CONTACT.map((item, i) => (
                <li key={i} className="footer__contact-row">
                  <span className="footer__contact-icon">
                    <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                      <path d={item.path}/>
                    </svg>
                  </span>
                  <span className="footer__contact-text">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* Bottom copyright bar */}
        <motion.div
          className="footer__bottom"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="footer__copyright">
            Copyright © {year} Green Taj Trading &amp; Contracting W.L.L. All rights reserved.
          </p>
          <a href="https://nf9.in/" target="_blank" rel="noopener noreferrer" className="footer__credit">
            <span className="footer__credit-bar" />
            Designed &amp; Developed by <span className="footer__credit-name">NF9.IN</span>
          </a>
        </motion.div>

      </div>
    </footer>
  );
};


/* ============================================================
   EXPORT
   ============================================================ */
export default GreenTajWebsite;