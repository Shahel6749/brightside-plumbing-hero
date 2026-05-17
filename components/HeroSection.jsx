"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Award,
  Flame,
  ShieldCheck,
  Star,
  Wrench,
  MapPin,
  Phone,
} from "lucide-react";

/* ─── skillv-aligned Animation Config ─── */
const EASE_OUT = [0.23, 1, 0.32, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.15 + i * 0.05,
      ease: EASE_OUT,
    },
  }),
};

/* ─── Trust Bar Badges (bottom) ─── */
const trustBadges = [
  { Icon: Award, label: "Red Seal Plumber" },
  { Icon: Flame, label: "Class A Gasfitter" },
  { Icon: ShieldCheck, label: "Cross Connection Certified" },
  { Icon: Star, label: "5.0 — 40 Google Reviews" },
  { Icon: Wrench, label: "20+ Years Experience" },
  { Icon: MapPin, label: "Calgary & Area" },
];

/* ─── Inline Credential Pills ─── */
const credentials = [
  { Icon: Award, label: "Red Seal Certified" },
  { Icon: Star, label: "5.0 Google Rating" },
  { Icon: ShieldCheck, label: "Licensed & Insured" },
];

/* ─── Nav Links ─── */
const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Book an Appointment", href: "#contact" },
];

export default function HeroSection() {
  const heroRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Scroll listener for navbar */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ═══════════════ NAVBAR ═══════════════ */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
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
              onClick={() => setMobileOpen(false)}
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
        className="hero-section"
      >
        {/* ─── Background Image (full bleed) ─── */}
        <div className="hero-bg-wrapper">
          <Image
            src="/images/hero-bg.png"
            alt="Professional plumbing infrastructure"
            fill
            priority
            loading="eager"
            className="hero-bg-image"
            sizes="100vw"
            quality={90}
          />
        </div>

        {/* ─── Overlay ─── */}
        <div className="hero-overlay" />

        {/* ─── Grain Texture ─── */}
        <div className="grain-overlay hero-grain" />

        {/* ─── Split Content ─── */}
        <div className="hero-split">
          {/* LEFT — Content */}
          <div className="hero-content">
            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <span className="hero-eyebrow">
                <span className="hero-eyebrow-dot" />
                Calgary&apos;s Trusted Plumbing Expert
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="hero-headline"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <span className="hero-headline-white">Fast, Honest</span>
              <br />
              <span className="hero-headline-accent">Plumbing & Heating</span>
              <br />
              <span className="hero-headline-white">Done Right.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="hero-sub"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              Roshan personally handles every job — no subcontractors,
              no surprises, no hidden fees.{" "}
              <span className="hero-sub-bold">Red Seal Certified with 20+ years.</span>
            </motion.p>

            {/* Single CTA */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              <a href="tel:4037969658" className="hero-cta">
                <Phone size={20} />
                <span>Call Now — (403) 796-9658</span>
              </a>
            </motion.div>

            {/* Credential pills */}
            <motion.div
              className="hero-credentials"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              {credentials.map((cred) => (
                <div key={cred.label} className="hero-credential-pill">
                  <cred.Icon size={14} className="hero-credential-icon" />
                  <span>{cred.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Visual space (desktop only, image bleeds through) */}
          <div className="hero-media" aria-hidden="true" />
        </div>

        {/* ─── Trust Bar — bottom edge ─── */}
        <div className="hero-trust-bar">
          <motion.div
            className="hero-trust-inner"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={5}
          >
            {trustBadges.map((badge) => (
              <div key={badge.label} className="hero-trust-badge">
                <badge.Icon size={16} className="hero-trust-icon" />
                <span className="hero-trust-label">{badge.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
