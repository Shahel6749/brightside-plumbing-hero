"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Award,
  Flame,
  ShieldCheck,
  Star,
  Wrench,
  MapPin,
  Phone,
  Mail,
  ChevronDown,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.3 + i * 0.15,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 1.2 + i * 0.08,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay: 0.8 + i * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

/* ─── Trust Badge Data (bottom bar) ─── */
const trustBadges = [
  { Icon: Award, label: "Red Seal Plumber" },
  { Icon: Flame, label: "Class A Gasfitter" },
  { Icon: ShieldCheck, label: "Cross Connection Certified" },
  { Icon: Star, label: "5.0 — 40 Google Reviews" },
  { Icon: Wrench, label: "20+ Years Experience" },
  { Icon: MapPin, label: "Calgary & Area" },
];

/* ─── Right Side Badges (desktop) — FIXED CONTENT ─── */
const rightBadges = [
  { Icon: Award, title: "Red Seal Plumber", sub: "Interprovincial Certified" },
  { Icon: Star, title: "5.0 Google Rating", sub: "40 Verified Reviews" },
  { Icon: ShieldCheck, title: "Class A Gasfitter", sub: "Licensed & Insured" },
];

/* ─── Nav Links ─── */
const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Book an Appointment", href: "#contact" },
];

/* ─── Particle Config (deterministic — CSS-only animation) ─── */
const particles = [
  { id: 0,  left: "7%",   top: "12%",  opacity: 0.20, duration: 7,  delay: 0.5 },
  { id: 1,  left: "14%",  top: "45%",  opacity: 0.25, duration: 8,  delay: 2.0 },
  { id: 2,  left: "22%",  top: "78%",  opacity: 0.30, duration: 6,  delay: 3.5 },
  { id: 3,  left: "30%",  top: "23%",  opacity: 0.18, duration: 9,  delay: 1.0 },
  { id: 4,  left: "38%",  top: "56%",  opacity: 0.22, duration: 7,  delay: 4.0 },
  { id: 5,  left: "45%",  top: "34%",  opacity: 0.35, duration: 5,  delay: 0.8 },
  { id: 6,  left: "53%",  top: "67%",  opacity: 0.28, duration: 8,  delay: 5.0 },
  { id: 7,  left: "60%",  top: "15%",  opacity: 0.15, duration: 6,  delay: 2.5 },
  { id: 8,  left: "67%",  top: "82%",  opacity: 0.32, duration: 5,  delay: 3.0 },
  { id: 9,  left: "74%",  top: "41%",  opacity: 0.20, duration: 9,  delay: 1.5 },
  { id: 10, left: "80%",  top: "59%",  opacity: 0.17, duration: 7,  delay: 4.5 },
  { id: 11, left: "86%",  top: "28%",  opacity: 0.25, duration: 6,  delay: 0.3 },
  { id: 12, left: "92%",  top: "73%",  opacity: 0.30, duration: 8,  delay: 5.5 },
  { id: 13, left: "97%",  top: "50%",  opacity: 0.22, duration: 5,  delay: 2.8 },
];

export default function HeroSection() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const overlayRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Scroll listener for navbar */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* GSAP — scroll-driven parallax + overlay darken only (no particles) */
  useEffect(() => {
    gsap.config({ force3D: true });

    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to(bgRef.current, {
        yPercent: 20,
        force3D: true,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Overlay darken on scroll
      gsap.to(overlayRef.current, {
        opacity: 0.92,
        force3D: true,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ═══════════════ NAVBAR ═══════════════ */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        {/* Logo */}
        <a href="#hero" style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/images/logo-main.svg"
            alt="Brightside Plumbing and Heating"
            width={140}
            height={40}
            priority
            style={{ height: "40px", width: "auto" }}
          />
        </a>

        {/* Desktop Nav Links */}
        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
          <li>
            <a href="tel:4037969658" className="navbar-cta">
              Call Now — (403) 796-9658
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className={`hamburger ${mobileOpen ? "open" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-nav open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 45 }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:4037969658"
              className="navbar-cta"
              onClick={() => setMobileOpen(false)
              }
              style={{ marginTop: "1rem", fontSize: "1.1rem" }}
            >
              Call Now — (403) 796-9658
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section
        ref={heroRef}
        id="hero"
        className="relative w-full"
        style={{ height: "100vh", minHeight: "100vh", overflow: "hidden", position: "relative" }}
      >
        {/* ─── Background Image Layer (CSS Ken Burns) ─── */}
        <div
          ref={bgRef}
          className="absolute inset-0 w-full"
          style={{ height: "120%", top: "-10%", willChange: "transform" }}
        >
          <Image
            src="/images/hero-bg.png"
            alt="Ultra-wide industrial pipe system — professional plumbing infrastructure"
            fill
            priority
            loading="eager"
            className="object-cover object-center hero-image"
            sizes="100vw"
            quality={90}
          />
        </div>

        {/* ─── Gradient Overlay (strengthened 105deg) ─── */}
        <div
          ref={overlayRef}
          className="absolute inset-0"
          style={{
            opacity: 0.75,
            background:
              "linear-gradient(105deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.85) 35%, rgba(10,10,10,0.40) 65%, rgba(10,10,10,0.15) 100%)",
          }}
        />
        {/* Vertical depth overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.4) 0%, transparent 30%, transparent 60%, rgba(10,10,10,0.95) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* ─── Accent Glows ─── */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            top: "15%",
            left: "5%",
            width: 700,
            height: 700,
            background: "var(--color-accent)",
            opacity: 0.035,
            filter: "blur(140px)",
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            bottom: "20%",
            right: "10%",
            width: 500,
            height: 500,
            background: "var(--color-gold)",
            opacity: 0.04,
            filter: "blur(120px)",
          }}
        />

        {/* ─── Animated Particles (pure CSS — no GSAP) ─── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 10 }}
        >
          {particles.map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{
                position: "absolute",
                left: p.left,
                top: p.top,
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: "#F5C400",
                opacity: p.opacity,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>

        {/* ─── Grain Texture ─── */}
        <div
          className="grain-overlay absolute inset-0 pointer-events-none"
          style={{ zIndex: 3 }}
        />

        {/* ─── Left Content Block — absolute centered ─── */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: "6%",
            zIndex: 10,
            maxWidth: "700px",
          }}
          >
          <div>
              {/* Eyebrow */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
                style={{ marginBottom: "1.5rem" }}
              >
                <span
                  className="inline-flex items-center gap-2 backdrop-blur-sm"
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--color-accent)",
                    border: "1px solid rgba(245, 196, 0, 0.2)",
                    background: "rgba(245, 196, 0, 0.06)",
                    borderRadius: "9999px",
                    padding: "0.5rem 1.25rem",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  <span
                    className="animate-pulse"
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--color-accent)",
                      display: "inline-block",
                    }}
                  />
                  Red Seal Certified · 20+ Years Experience · Calgary, AB
                </span>
              </motion.div>

              {/* Headline — DOMINANT SIZE */}
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                style={{
                  fontSize: "clamp(48px, 6vw, 86px)",
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  maxWidth: "900px",
                  margin: 0,
                  fontFamily: "var(--font-display)",
                }}
              >
                <span style={{ color: "#ffffff" }}>
                  Calgary&apos;s Trusted
                </span>
                <br />
                <span className="shimmer-text">Plumbing &amp; Heating</span>
                <br />
                <span style={{ color: "#ffffff" }}>Expert.</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                style={{
                  marginTop: "1.5rem",
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  color: "var(--color-muted)",
                  maxWidth: "600px",
                  lineHeight: 1.7,
                  fontFamily: "var(--font-sans)",
                }}
              >
                Fast, honest, and done right the first time. Roshan personally
                handles every job —{" "}
                <span style={{ color: "var(--color-white)", fontWeight: 500 }}>
                  no subcontractors, no surprises.
                </span>
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={3}
                className="flex flex-col sm:flex-row"
                style={{ marginTop: "2.5rem", gap: "1rem" }}
              >
                {/* Primary CTA */}
                <motion.a
                  href="tel:4037969658"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group"
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.75rem",
                    padding: "1rem 2rem",
                    borderRadius: "0.75rem",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    color: "var(--color-bg)",
                    background:
                      "linear-gradient(135deg, var(--color-accent), var(--color-gold))",
                    boxShadow: "0 8px 32px rgba(245, 196, 0, 0.25)",
                    overflow: "hidden",
                    textDecoration: "none",
                    transition: "box-shadow 0.3s ease",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  <span
                    className="group-hover:opacity-100"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(135deg, var(--color-gold), var(--color-accent))",
                      opacity: 0,
                      transition: "opacity 0.3s",
                    }}
                  />
                  <Phone
                    size={20}
                    style={{ position: "relative", zIndex: 1 }}
                  />
                  <span style={{ position: "relative", zIndex: 1 }}>
                    Call Now — (403) 796-9658
                  </span>
                </motion.a>

                {/* Secondary CTA */}
                <motion.a
                  href="mailto:info@brightsideplumbing.com?subject=Booking Request"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.75rem",
                    padding: "1rem 2rem",
                    borderRadius: "0.75rem",
                    fontWeight: 600,
                    fontSize: "1.05rem",
                    color: "var(--color-white)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  <Mail
                    size={20}
                    className="group-hover:rotate-6"
                    style={{
                      color: "var(--color-accent)",
                      transition: "transform 0.3s",
                    }}
                  />
                  <span>Book by Email</span>
                </motion.a>
              </motion.div>

              {/* Emergency notice */}
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={4}
                style={{
                  marginTop: "1.25rem",
                  fontSize: "0.8rem",
                  color: "var(--color-muted)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "var(--font-sans)",
                }}
              >
                <span
                  className="animate-pulse"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#22c55e",
                    display: "inline-block",
                  }}
                />
                Emergency availability · Fair pricing guaranteed · No
                subcontractors
              </motion.p>
          </div>
        </div>

        {/* RIGHT — Desktop Trust Badges (absolute positioned) */}
        <div
          className="hidden lg:flex flex-col"
          style={{
            position: "absolute",
            right: "4rem",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            gap: "1rem",
          }}
        >
          {rightBadges.map((badge, i) => (
            <motion.div
              key={badge.title}
              variants={slideRight}
              initial="hidden"
              animate="visible"
              custom={i}
              whileHover={{
                scale: 1.04,
                borderColor: "rgba(245, 196, 0, 0.35)",
              }}
              style={{
                borderRadius: "8px",
                padding: "14px 20px",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                cursor: "default",
                transition: "all 0.3s ease",
                minWidth: "200px",
                background: "rgba(10,10,10,0.7)",
                border: "1px solid rgba(245,196,0,0.2)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "0.75rem",
                  background: "rgba(245, 196, 0, 0.08)",
                  border: "1px solid rgba(245, 196, 0, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <badge.Icon
                  size={22}
                  style={{ color: "var(--color-accent)" }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "var(--color-white)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {badge.title}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-muted)",
                    marginTop: "0.15rem",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {badge.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─── Trust Bar — absolute bottom edge ─── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 20,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderTop: "1px solid #2A2A2A",
            padding: "16px 0",
          }}
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={5}
            className="flex flex-wrap justify-center items-center"
            style={{
              maxWidth: "90rem",
              margin: "0 auto",
              gap: "2rem",
              padding: "0 2rem",
            }}
          >
            {trustBadges.map((badge, i) => (
              <motion.div
                key={badge.label}
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                custom={i}
                className="group"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "default",
                }}
              >
                <badge.Icon
                  size={18}
                  className="group-hover:scale-110"
                  style={{
                    color: "var(--color-accent)",
                    transition: "transform 0.3s",
                    flexShrink: 0,
                  }}
                />
                <span
                  className="group-hover:text-white"
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: "var(--color-muted)",
                    lineHeight: 1.3,
                    transition: "color 0.3s",
                    fontFamily: "var(--font-sans)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {badge.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ─── Scroll Indicator ─── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={6}
          style={{
            position: "absolute",
            bottom: "70px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-muted)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Explore Our Services
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown
              size={20}
              style={{ color: "var(--color-accent)" }}
            />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
