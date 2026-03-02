/*
  ============================================================
  GREENTAJ WEBSITE — MAIN COMPONENT FILE
  ============================================================
  Content sourced from Green Taj Trading & Contracting W.L.L
  Company Profile PDF.

  Component order mirrors the page layout top → bottom:
    GreenTajWebsite (root)
      ├── Header
      ├── HeroSection
      ├── AboutSection
      ├── ServicesSection
      ├── ProjectManagementSection
      ├── ProjectsSection
      ├── TeamsSection
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

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y < lastScrollY.current || y < 80) setHeaderVisible(true);
      else if (y > lastScrollY.current && y > 80) setHeaderVisible(false);
      setScrolled(y > 50);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="font-sans">
      <motion.div className="scroll-progress-bar" style={{ scaleX: scrollYProgress }} />
      <Header
        scrolled={scrolled}
        headerVisible={headerVisible}
        scrollToSection={scrollToSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <HeroSection scrollToSection={scrollToSection} />
      <AboutSection />
      <ServicesSection />
      <ProjectManagementSection />
      <ProjectsSection />
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
    transition={{ duration: headerVisible ? 1.5 : 0.8, ease: [0.16, 1, 0.3, 1] }}
  >
    <div className={`header__capsule ${scrolled ? 'header__capsule--scrolled' : ''}`}>
      <div className="header__logo" onClick={() => scrollToSection('home')}>GREEN TAJ</div>
      <nav className="header__nav">
        {NAV_ITEMS.map(item => (
          <button key={item.id} className="header__nav-btn" onClick={() => scrollToSection(item.id)}>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="header__right">
        <div className="header__socials">
          <a href="#" className="header__social-link"><IconFacebook /></a>
          <a href="#" className="header__social-link"><IconX /></a>
          <a href="#" className="header__social-link"><IconInstagram /></a>
        </div>
        <button className="contact-pill" onClick={() => scrollToSection('contact')}>
          <span className="contact-pill__label">Contact us</span>
          <span className="contact-pill__icon">
            <span className="arrow arrow--default"><IconDiagArrow /></span>
            <span className="arrow arrow--hover"><IconDiagArrow /></span>
          </span>
        </button>
      </div>
      <button className="header__hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          {mobileMenuOpen
            ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/>
            : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/>}
        </svg>
      </button>
    </div>
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
          <button className="header__mobile-cta" onClick={() => scrollToSection('contact')}>Contact us</button>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.header>
);


/* ============================================================
   HERO SECTION
   ============================================================ */
const HeroSection = ({ scrollToSection }) => {
  const heroRef    = useRef(null);
  const bgRef      = useRef(null);
  const contentRef = useRef(null);
  const target  = useRef({ ty: 0, scale: 1, opacity: 1, cy: 0 });
  const current = useRef({ ty: 0, scale: 1, opacity: 1, cy: 0 });
  const lerp = (a, b, t) => a + (b - a) * t;
  const SMOOTH = 0.08;

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
      <div
        ref={bgRef}
        className="hero__bg"
        style={{ backgroundImage: 'url(https://offline.greentaj.com/wp-content/uploads/2026/03/GreenTaj1-scaled.jpg)' }}
      />
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
const AVATARS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100',
];

const AboutSection = () => (
  <section id="about" className="about">
    <div className="about__wrap">
      <motion.img
        className="about__photo"
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070"
        alt="Green Taj building"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />

      {/* Mission card */}
      <motion.div
        className="about__card about__card--mission"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="about__card-title">About Us</h3>
        <p className="about__card-body">
          Established in Doha, Qatar in 2019, <strong>Green Taj Trading &amp; Contracting W.L.L</strong> is a
          leading qualified organisation directed by a highly qualified, experienced and technical team.
          Operating in Trading, General Contracting/Construction, MEP Contracting, General Cleaning
          and Hospitality Services under license from the Department of Qatar.
        </p>
      </motion.div>

      {/* Vision card */}
      <motion.div
        className="about__card about__card--vision"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="about__card-title">Our Policy</h3>
        <p className="about__card-body">
          GTTC's policy is to successfully execute projects to a <strong>"win-win-win"</strong> outcome. Our reputation
          is built on delivering the perfect mix of management expertise, ethical business practices,
          trainings and high-level construction capability earning client and consultant respect on every project.
        </p>
        <div className="about__avatars">
          {AVATARS.map((src, i) => (
            <img key={i} className="about__avatar" src={src} alt={`client ${i}`} />
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);


/* ============================================================
   SERVICES SECTION
   ============================================================ */
/* ============================================================
   SERVICES SECTION — Full replacement block
   Drop this entire block into greentaj.jsx replacing everything
   from "const SERVICES = [" through the closing of ServicesSection
   ============================================================ */

/* ---- Service Icons ---- */
const ServiceIconConstruction = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ground base */}
    <rect x="3" y="28" width="30" height="3" rx="1.5" fill="currentColor" opacity="0.85"/>
    {/* Three building columns */}
    <rect x="5"  y="17" width="5" height="11" rx="1" fill="currentColor" opacity="0.6"/>
    <rect x="15.5" y="10" width="5" height="18" rx="1" fill="currentColor" opacity="0.75"/>
    <rect x="26" y="20" width="5" height="8"  rx="1" fill="currentColor" opacity="0.55"/>
    {/* Roofline triangle */}
    <path d="M4 17 L18 4 L32 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4"/>
    {/* Door */}
    <rect x="15.5" y="22" width="5" height="6" rx="0.75" fill="currentColor" opacity="0.5"/>
  </svg>
);

const ServiceIconMEP = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer gear ring */}
    <circle cx="18" cy="18" r="12" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.35"/>
    {/* Inner gear circle */}
    <circle cx="18" cy="18" r="7"  stroke="currentColor" strokeWidth="2" fill="none" opacity="0.8"/>
    {/* Center dot */}
    <circle cx="18" cy="18" r="2.5" fill="currentColor" opacity="0.9"/>
    {/* Cardinal spokes */}
    <line x1="18" y1="3"  x2="18" y2="8"  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.85"/>
    <line x1="18" y1="28" x2="18" y2="33" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.85"/>
    <line x1="3"  y1="18" x2="8"  y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.85"/>
    <line x1="28" y1="18" x2="33" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.85"/>
    {/* Diagonal spokes */}
    <line x1="7.5"  y1="7.5"  x2="10.8" y2="10.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.45"/>
    <line x1="25.2" y1="25.2" x2="28.5" y2="28.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.45"/>
    <line x1="28.5" y1="7.5"  x2="25.2" y2="10.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.45"/>
    <line x1="10.8" y1="25.2" x2="7.5"  y2="28.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.45"/>
  </svg>
);

const ServiceIconCarpentry = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Chisel handle */}
    <rect x="15" y="3" width="6" height="14" rx="2" fill="currentColor" opacity="0.55"/>
    {/* Chisel ferrule */}
    <rect x="14" y="16" width="8" height="3" rx="1" fill="currentColor" opacity="0.75"/>
    {/* Chisel blade tapering to point */}
    <path d="M14 19 L16 30 L18 33 L20 30 L22 19 Z" fill="currentColor" opacity="0.9"/>
    {/* Wood grain lines left */}
    <path d="M4 12 Q8 10 4 8"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.35"/>
    <path d="M4 18 Q8 16 4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3"/>
    <path d="M4 24 Q8 22 4 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.25"/>
    {/* Wood grain lines right */}
    <path d="M32 12 Q28 10 32 8"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.35"/>
    <path d="M32 18 Q28 16 32 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3"/>
    <path d="M32 24 Q28 22 32 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.25"/>
  </svg>
);

const ServiceIconTrading = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Top box */}
    <rect x="12" y="3" width="12" height="10" rx="2" fill="currentColor" opacity="0.9"/>
    <line x1="12" y1="8"  x2="24" y2="8"  stroke="rgba(0,0,0,0.2)" strokeWidth="1"/>
    {/* Bottom left box */}
    <rect x="3"  y="22" width="12" height="11" rx="2" fill="currentColor" opacity="0.65"/>
    <line x1="3"  y1="27" x2="15" y2="27" stroke="rgba(0,0,0,0.2)" strokeWidth="1"/>
    {/* Bottom right box */}
    <rect x="21" y="22" width="12" height="11" rx="2" fill="currentColor" opacity="0.5"/>
    <line x1="21" y1="27" x2="33" y2="27" stroke="rgba(0,0,0,0.2)" strokeWidth="1"/>
    {/* Connector lines */}
    <path d="M18 13 L18 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.55"/>
    <path d="M18 19 L9 22"  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.55"/>
    <path d="M18 19 L27 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.55"/>
    {/* Junction dot */}
    <circle cx="18" cy="19" r="2" fill="currentColor" opacity="0.8"/>
  </svg>
);

const ServiceIconManpower = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Front person — head */}
    <circle cx="13" cy="9" r="5" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.95"/>
    {/* Front person — body arc */}
    <path d="M3 32 C3 23.716 7.477 19 13 19 C18.523 19 23 23.716 23 32"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.85"/>
    {/* Hard hat on front person */}
    <path d="M8 9 Q13 4 18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
    {/* Back person — head */}
    <circle cx="25" cy="11" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.55"/>
    {/* Back person — body arc */}
    <path d="M22 32 C22 25.716 24.477 22 27 22 C29.523 22 32 25.716 33 32"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4"/>
    {/* Clipboard / tool hint */}
    <rect x="26" y="15" width="6" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.35"/>
    <line x1="28" y1="17.5" x2="30" y2="17.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.35"/>
    <line x1="28" y1="19.5" x2="30" y2="19.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.35"/>
  </svg>
);

/* ---- Data ---- */
const SERVICES = [
  {
    id: 0,
    title: 'General Contracting / Construction',
    desc:  'Executing projects across general construction for private and public authorities, equipped with machineries, tools and highly skilled people for timely completion.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070',
    icon:  <ServiceIconConstruction />,
  },
  {
    id: 1,
    title: 'MEP Works',
    desc:  'Mechanical, Electrical and Plumbing (MEP) installation services with a concept to provide a comfortable space for building occupants in residential and commercial buildings.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069',
    icon:  <ServiceIconMEP />,
  },
  {
    id: 2,
    title: 'Carpentry Works',
    desc:  'The art and trade of cutting, working and joining timber — covering structural timberwork in framing and fine items such as doors, windows, and staircases.',
    image: 'https://img.freepik.com/free-photo/carpenter-cutting-plank-by-circular-saw_329181-3731.jpg?t=st=1772361832~exp=1772365432~hmac=29ac209e08f263e98ca3bbe79525b2b8ef6b9df75876d155f687fd4fb20517cc&w=2000',
    icon:  <ServiceIconCarpentry />,
  },
  {
    id: 3,
    title: 'Trading',
    desc:  'Supplying quality construction materials, tools and equipment to support projects of all scales across Qatar, backed by an established procurement network.',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070',
    icon:  <ServiceIconTrading />,
  },
  {
    id: 4,
    title: 'Manpower Supply & Maintenance',
    desc:  'Reliable manpower supply, general maintenance, cleaning/housekeeping and hospitality services to keep your facilities running smoothly.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075',
    icon:  <ServiceIconManpower />,
  },
];

/* ---- Slide Variant ---- */
const slideVariants = {
  enter:  (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: 'easeInOut' } },
  exit:   (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }),
};

/* ---- Component ---- */
const ServicesSection = () => {
  const [active, setActive]       = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (index) => {
    if (index === active) return;
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };
  const prev = () => goTo((active - 1 + SERVICES.length) % SERVICES.length);
  const next = () => goTo((active + 1)                   % SERVICES.length);

  const ChevronLeft  = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>;
  const ChevronRight = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>;

  return (
    <section id="services" className="services">
      <div className="services__wrap">

        {/* ── Top grid: copy + image slider ── */}
        <div className="services__top-grid">
          <div>
            <p className="services__eyebrow">Our Services</p>
            <h2 className="services__heading">
              From general contracting to MEP, carpentry, trading and inspection
              we manage every aspect with quality, efficiency and client satisfaction.
            </h2>
            <button
              className="contact-pill"
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="contact-pill__label">Get In Touch</span>
              <span className="contact-pill__icon">
                <span className="arrow arrow--default"><IconDiagArrow /></span>
                <span className="arrow arrow--hover"><IconDiagArrow /></span>
              </span>
            </button>
            <div className="services__nav">
              <button className="services__nav-btn" onClick={prev}><ChevronLeft /></button>
              <button className="services__nav-btn" onClick={next}><ChevronRight /></button>
            </div>
          </div>

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

        <hr className="services__divider" />

        {/* ── Tab row with icons ── */}
        <div className="services__tab-row">
          {SERVICES.map((s, i) => (
            <div
              key={s.id}
              className={`services__tab ${i === active ? 'services__tab--active' : ''}`}
              onClick={() => goTo(i)}
            >
              {/* Icon wrapper */}
              <div className="services__tab-icon-wrap">
                <div className="services__tab-icon">{s.icon}</div>
              </div>
              <h3 className="services__tab-name">{s.title}</h3>
              <p  className="services__tab-desc">{s.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

/* ============================================================
   PROJECT MANAGEMENT SECTION
   ============================================================ */
const PM_ITEMS = [
  {
    icon: <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>,
    label: 'Project Plans',
  },
  {
    icon: <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>,
    label: 'Project Meetings & Report',
  },
  {
    icon: <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>,
    label: 'Procurement Process',
  },
  {
    icon: <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
    label: 'Project Team',
  },
  {
    icon: <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>,
    label: 'Client Liaising',
  },
  {
    icon: <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>,
    label: 'Scheduling & Management',
  },
];

const ProjectManagementSection = () => (
  <section className="work-process">
    <div className="work-process__wrap">
      <div className="work-process__header">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="services__eyebrow">Project Management</p>
          <h2 className="work-process__title">
            Professional &amp; reliable supervision and implementation of all building construction services in Qatar and abroad
          </h2>
          <p style={{ color: '#6b7280', marginTop: '1rem', lineHeight: 1.7, maxWidth: '620px' }}>
            With extensive know-how and a wealth of experience, our experts solve complex issues and tasks.
            We rely on advanced technology to deliver engineering and construction projects — speeding
            schedules, lowering costs and ensuring quality.
          </p>
        </motion.div>
        <div className="gallery__cta">
          <button className="contact-pill" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
            <span className="contact-pill__label">Contact us</span>
            <span className="contact-pill__icon">
              <span className="arrow arrow--default"><IconDiagArrow /></span>
              <span className="arrow arrow--hover"><IconDiagArrow /></span>
            </span>
          </button>
        </div>
      </div>

      <div className="work-process__grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {PM_ITEMS.map((item, i) => (
          <motion.div
            key={i}
            className="process-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="process-card__icon">{item.icon}</div>
            <h3 className="process-card__title">{item.label}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);


/* ============================================================
   PROJECTS SECTION
   ============================================================ */
const PROJECTS = [
  {
    name:     'Msheireb Downtown Doha',
    category: 'Commercial Development',
    date:     'Mar 15, 2021',
    desc:     'MEP installation and contracting works for this landmark sustainable urban development project in the heart of Doha.',
    image:    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070',
  },
  {
    name:     'Lusail Palace',
    category: 'Luxury Residential',
    date:     'Jun 22, 2020',
    desc:     'Complete carpentry and MEP works for this prestigious palace construction project in Lusail City.',
    image:    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070',
  },
  {
    name:     'Doha South Sewage Treatment Plant',
    category: 'Infrastructure',
    date:     'Sep 8, 2021',
    desc:     'Large-scale MEP contracting for this critical public infrastructure project serving Doha\'s southern districts.',
    image:    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070',
  },
  {
    name:     'Airport Expansion Project',
    category: 'Transportation Hub',
    date:     'Nov 12, 2020',
    desc:     'Comprehensive construction and MEP services for the expansion of Qatar\'s premier aviation hub.',
    image:    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074',
  },
  {
    name:     'Qatar Festival City',
    category: 'Mixed-Use Development',
    date:     'Feb 28, 2021',
    desc:     'Trading and general contracting services for this large mixed-use retail and entertainment complex.',
    image:    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070',
  },
  {
    name:     'Gharafa Palace',
    category: 'Residential Palace',
    date:     'Oct 12, 2020',
    desc:     'Luxury carpentry and electrical works for this prestigious residential palace in Al Gharafa.',
    image:    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075',
  },
  {
    name:     'Kahramaa',
    category: 'Utilities & Energy',
    date:     'Jan 10, 2021',
    desc:     'Electrical and mechanical contracting works in support of Qatar\'s national electricity and water authority.',
    image:    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070',
  },
  {
    name:     'Schlumberger Overseas SA',
    category: 'Oil & Gas',
    date:     'Apr 5, 2020',
    desc:     'General contracting and manpower supply services for Schlumberger\'s Qatar operations.',
    image:    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070',
  },
  {
    name:     'Alshaya',
    category: 'Retail',
    date:     'Jul 18, 2021',
    desc:     'Carpentry, MEP and fit-out works for Alshaya retail operations across multiple locations in Qatar.',
    image:    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071',
  },
];

const CLIENTS = [
  'Arabtec Construction',
  'Progress Security',
  'Al Ajjaj Limited Co. (AALCO Group)',
  'MSI Projects',
  'Armiti Qatar',
  'Trelco Limited Company',
  'VA Tech Wabag',
  'Pinnacle Venture',
  'Interprogetti',
  'Al Mazrouei ICAS WLL',
];

const IconArrowDiag = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
    <path d="M7 17L17 7M7 7h10v10"/>
  </svg>
);

const ProjectsSection = () => (
  <section id="projects" className="projects">
    <div className="projects__wrap">
      <div className="section-header">
        <span className="section-label">Our Work</span>
        <h2 className="section-title">Major Project <span className="highlight">References</span></h2>
        <p className="section-subtitle">Successfully completed projects across Qatar with leading organisations</p>
      </div>

      <div className="projects__grid">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={i}
            className="project-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
          >
            <img className="project-card__img" src={project.image} alt={project.name} />
            <div className="project-card__gradient" />
            <div className="project-card__bar">
              <h3 className="project-card__bar-title">{project.name}</h3>
            </div>
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
        <h3 className="projects__clients-title">Client References</h3>
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
  { name: 'Management Director', role: 'Director',         image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000' },
  { name: 'Project Manager',     role: 'Project Manager',  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000' },
  { name: 'Safety Officer',      role: 'HSE Officer',      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000' },
];

const TeamsSection = () => (
  <section className="teams">
    <div className="teams__wrap">
      <div className="section-header">
        <span className="section-label">Our Team</span>
        <h2 className="section-title">Highly Qualified <span className="highlight">Expert Team</span></h2>
        <p className="section-subtitle">Directed by experienced professionals committed to delivering excellence across every discipline</p>
      </div>
      <div className="teams__grid">
        {TEAM.map((member, i) => (
          <motion.div
            key={i}
            className="team-card"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="team-card__photo-wrap">
              <img className="team-card__photo" src={member.image} alt={member.name} />
              <div className="team-card__fade" />
              <div className="team-card__arrow-badge"><IconArrowDiag /></div>
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
   GALLERY SECTION
   ============================================================ */
const CATEGORIES = [
  { id: 'all',          label: 'All Projects' },
  { id: 'construction', label: 'Construction' },
  { id: 'mep',          label: 'MEP Works'    },
  { id: 'carpentry',    label: 'Carpentry'    },
  { id: 'commercial',   label: 'Commercial'   },
];

const GALLERY_ITEMS = [
  { id: 1, cat: 'construction', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800', title: 'General Contracting Works'      },
  { id: 2, cat: 'mep',          image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800', title: 'Electrical Installation'         },
  { id: 3, cat: 'carpentry',    image: 'https://cdn.pixabay.com/photo/2017/06/20/17/17/tools-2423826_640.jpg', title: 'Custom Woodwork & Joinery'       },
  { id: 4, cat: 'commercial',   image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800', title: 'Commercial Development'           },
  { id: 5, cat: 'construction', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800', title: 'Residential & Palace Projects'   },
  { id: 6, cat: 'mep',          image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800', title: 'Plumbing & Mechanical Systems'   },
  { id: 7, cat: 'carpentry',    image: 'https://img.freepik.com/free-photo/carpenter-cutting-plank-by-circular-saw_329181-3731.jpg?t=st=1772361832~exp=1772365432~hmac=29ac209e08f263e98ca3bbe79525b2b8ef6b9df75876d155f687fd4fb20517cc&w=2000', title: 'Interior Carpentry Finishing'    },
  { id: 8, cat: 'commercial',   image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800', title: 'Office & Retail Complexes'       },
  { id: 9, cat: 'construction', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800', title: 'Infrastructure Projects'         },
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
          <p className="section-subtitle">A glimpse of our completed works across Qatar's construction sector</p>
        </div>
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
              <div className="gallery-card__info">
                <h4 className="gallery-card__info-title">{item.title}</h4>
                <span className="gallery-card__info-link">View Details <IconArrowDiag /></span>
              </div>
              <span className="gallery-card__tag">{catLabel(item.cat)}</span>
            </motion.div>
          ))}
        </div>
        <div className="gallery__cta">
          <button className="contact-pill" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
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
  'Commercial Buildings',
  'Industrial Buildings',
  'Residential Buildings',
  'Educational Institutions',
  'Government Organisations',
  'Healthcare Facilities',
  'Hospitality & Leisure',
  'Oil & Gas Facilities',
  'Retail & Shopping Centres',
  'Transportation Hubs',
  'Infrastructure Projects',
  'Utilities & Energy Sector',
];

const IndustriesSection = () => {
  const items = [...INDUSTRIES, ...INDUSTRIES, ...INDUSTRIES];
  return (
    <section className="industries-section">
      <div className="industries-container">
        <div className="industries-grid">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="industries-text"
          >
            <p className="industries-label">Industries We Serve</p>
            <h2 className="industries-heading">
              Delivering construction expertise across Qatar's diverse sectors from commercial to government.
            </h2>
            <button
              className="contact-pill"
              onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="contact-pill__label">Our Services</span>
              <span className="contact-pill__icon">
                <span className="arrow arrow--default"><IconDiagArrow /></span>
                <span className="arrow arrow--hover"><IconDiagArrow /></span>
              </span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="industries-scroll-wrapper"
          >
            <div className="scroll-track-wrap">
              {items.map((industry, index) => (
                <div key={`${industry}-${index}`} className="industry-pill">{industry}</div>
              ))}
            </div>
            <div className="fade-top" />
            <div className="fade-bottom" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};


/* ============================================================
   CONTACT SECTION
   ============================================================ */
const CONTACT_INFO = [
  {
    icon:  'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z',
    label: 'Address',
    value: 'P.O. Box 46064, Doha, Qatar',
  },
  {
    icon:  'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    label: 'Phone',
    value: '+974-55248447  /  +974-77248447',
  },
  {
    icon:  'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    label: 'Email',
    value: 'info@greentaj.com',
  },
  {
    icon:  'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    label: 'Business Hours',
    value: 'Sat – Thu: 8:00 AM – 6:00 PM  |  Fri: Closed',
  },
];

const FORM_FIELDS = [
  { id: 'name',  label: 'Full Name *',     type: 'text',  placeholder: 'John Doe',           required: true  },
  { id: 'email', label: 'Email Address *', type: 'email', placeholder: 'john@example.com',   required: true  },
  { id: 'phone', label: 'Phone Number',    type: 'tel',   placeholder: '+974 XXXX XXXX',     required: false },
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
          <p className="section-subtitle">Get in touch to discuss your project requirements, we're ready to deliver</p>
        </div>
        <div className="contact__grid">
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

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="contact__form-card">
              <h3 className="contact__form-heading">Send Us a Message</h3>
              <form className="contact__form" onSubmit={handleSubmit}>
                {FORM_FIELDS.map(f => (
                  <div key={f.id} className="contact__field">
                    <label htmlFor={f.id}>{f.label}</label>
                    <input
                      className="contact__input"
                      id={f.id} name={f.id} type={f.type}
                      placeholder={f.placeholder} required={f.required}
                      value={form[f.id]} onChange={handleChange}
                    />
                  </div>
                ))}
                <div className="contact__field">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    className="contact__textarea"
                    id="message" name="message"
                    placeholder="Tell us about your project..."
                    required value={form.message} onChange={handleChange}
                  />
                </div>
                <button className="contact__submit" type="submit">Send Message</button>
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
const StarIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
  </svg>
);

const TESTIMONIALS = [
  {
    name:     'Ahmed Al-Mazrouei',
    position: 'Project Manager',
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
  { num: '2019', label: 'Established in Qatar' },
  { num: '500+', label: 'Projects Delivered'   },
  { num: '10+',  label: 'Major Client Partners' },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCurrent(prev => (prev + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(timer);
  }, []);
  const t = TESTIMONIALS[current];

  return (
    <section className="testimonials">
      <div className="testimonials__pattern" />
      <div className="testimonials__wrap">
        <div className="section-header">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title section-title--white">What Our Clients Say</h2>
        </div>
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
const FOOTER_SERVICES    = ['MEP Works', 'General Contracting', 'Carpentry Works', 'Trading', 'Manpower Supply'];

const FOOTER_SOCIALS = [
  { label: 'Facebook',  href: '#', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
  { label: 'Twitter',   href: '#', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg> },
  { label: 'LinkedIn',  href: '#', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
  { label: 'Instagram', href: '#', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
];

const FOOTER_CONTACT = [
  { path: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', text: '+974-55248447 / +974-77248447' },
  { path: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', text: 'greentajtrading1@gmail.com'         },
  { path: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z', text: 'P.O. Box 46064, Doha, Qatar'  },
];

const columnVariants = {
  hidden:  { opacity: 0, y: 60 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] } }),
};

const Footer = ({ scrollToSection }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
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
          <motion.div custom={0} variants={columnVariants} initial="hidden" animate={visible ? 'visible' : 'hidden'}>
            <img className="footer__logo" src="https://offline.greentaj.com/wp-content/uploads/2026/03/greentajlogo-1.png" alt="Green Taj Logo" />
            <p className="footer__tagline">
              Building Qatar's future with precision, expertise and integrity since 2019.
            </p>
            <div className="footer__socials">
              {FOOTER_SOCIALS.map((s, i) => (
                <motion.a key={i} href={s.href} className="footer__social" aria-label={s.label} whileHover={{ scale: 1.12, y: -3 }} transition={{ duration: 0.2 }}>
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div custom={1} variants={columnVariants} initial="hidden" animate={visible ? 'visible' : 'hidden'}>
            <h3 className="footer__col-title">Quicker Links</h3>
            <ul className="footer__list">
              {FOOTER_QUICK_LINKS.map(link => (
                <li key={link} className="footer__list-item">
                  <span className="footer__bullet" />
                  <button className="footer__link" onClick={() => scrollToSection(link.toLowerCase().replace(/\s+/g, ''))}>{link}</button>
                </li>
              ))}
            </ul>
          </motion.div>

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

          <motion.div custom={3} variants={columnVariants} initial="hidden" animate={visible ? 'visible' : 'hidden'}>
            <h3 className="footer__col-title">Contact Us</h3>
            <ul className="footer__contacts">
              {FOOTER_CONTACT.map((item, i) => (
                <li key={i} className="footer__contact-row">
                  <span className="footer__contact-icon">
                    <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d={item.path}/></svg>
                  </span>
                  <span className="footer__contact-text">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

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