"use client";

import { useRef, useEffect } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Waves,
  GitMerge,
  Droplets,
  AlertCircle,
  Settings,
  Droplet,
  Wind,
  Flame,
  Thermometer,
  Zap,
  Wrench,
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Service Data ─── */
const services = [
  {
    id: "01",
    name: "Backflow Device Testing & Installation",
    description:
      "Cross Connection Certified. Roshan handles all backflow preventer testing, installation, and City of Calgary compliance reporting.",
    Icon: ShieldCheck,
    image: "/images/services/backflow-device-testing.png",
  },
  {
    id: "02",
    name: "Drain Cleaning",
    description:
      "Slow drains, blockages, recurring backups. Professional-grade equipment clears the problem at the source — not just the symptom.",
    Icon: Waves,
    image: "/images/services/drain-cleaning.png",
  },
  {
    id: "03",
    name: "Sewer & Water Line Replacements",
    description:
      "Full sewer and water main line replacements with minimal property disruption. Honest assessment — no unnecessary excavation.",
    Icon: GitMerge,
    image: "/images/services/sewer-water-line-replacement.png",
  },
  {
    id: "04",
    name: "Water Leaks",
    description:
      "Rapid diagnosis and reliable repair for pipe leaks, joint failures, and hidden leaks before they become costly disasters.",
    Icon: Droplets,
    image: "/images/services/water-leaks.png",
  },
  {
    id: "05",
    name: "Toilet Trouble",
    description:
      "Running, leaking, clogged, or not flushing. Fast diagnosis and repair. Full replacement and installation also available.",
    Icon: AlertCircle,
    image: "/images/services/toilet-trouble.png",
  },
  {
    id: "06",
    name: "Garburators",
    description:
      "Installation, repair, and replacement of kitchen garburators. Properly connected and fully tested on site.",
    Icon: Settings,
    image: "/images/services/garburators.png",
  },
  {
    id: "07",
    name: "Sinks & Faucets",
    description:
      "Dripping faucets, full fixture installations, bidet setup, kitchen and bathroom sink work — done with precision.",
    Icon: Droplet,
    image: "/images/services/sinks-faucets.png",
  },
  {
    id: "08",
    name: "Washing Machine Hook-Ups",
    description:
      "All supply line and drain connections for new washer installations or laundry room relocations. Done to code.",
    Icon: Wind,
    image: "/images/services/washing-machine-hookups.png",
  },
  {
    id: "09",
    name: "Furnace Repair & Heating",
    description:
      "Class A Gasfitter. Calgary winters demand fast response. Roshan diagnoses and repairs furnace issues — often same day.",
    Icon: Flame,
    image: "/images/services/furnace-repair.png",
  },
  {
    id: "10",
    name: "Thermostat Installation",
    description:
      "Smart thermostat upgrades or faulty unit replacement. Full wiring, configuration, and testing including smart home models.",
    Icon: Thermometer,
    image: "/images/services/thermostat-installation.png",
  },
  {
    id: "11",
    name: "Hot Water Tank Installation & Repair",
    description:
      "Fast installation, repair, and replacement of conventional and tankless hot water tanks from all major brands.",
    Icon: Zap,
    image: "/images/services/hot-water-tank.png",
  },
  {
    id: "12",
    name: "Troubleshooting & General Plumbing",
    description:
      "Not sure what the problem is? Roshan will find it. 20+ years of experience means he's seen — and solved — everything.",
    Icon: Wrench,
    image: "/images/services/general-troubleshooting.png",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const gridRef = useRef(null);
  const ctaRef = useRef(null);

  /* ─── GSAP Entrances — fire ONCE only ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Intro stagger */
      if (introRef.current) {
        gsap.from(introRef.current.children, {
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 80%",
            once: true,
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          force3D: true,
        });
      }

      /* Cards cascade */
      const cards = gridRef.current?.querySelectorAll(".svc-card");
      if (cards?.length) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
            once: true,
          },
          y: 50,
          opacity: 0,
          duration: 0.7,
          stagger: { amount: 0.8, from: "start" },
          ease: "power3.out",
          force3D: true,
        });
      }

      /* CTA row */
      if (ctaRef.current) {
        gsap.from(ctaRef.current.children, {
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            once: true,
          },
          y: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          force3D: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{ background: "#0A0A0A" }}
    >
      {/* ═══════════════════════════════════════════ */}
      {/* SECTION INTRO                               */}
      {/* ═══════════════════════════════════════════ */}
      <div
        ref={introRef}
        className="svc-intro"
        style={{
          padding: "80px 6%",
          borderBottom: "1px solid #2A2A2A",
          display: "flex",
          flexWrap: "wrap",
          gap: "3rem",
          alignItems: "flex-end",
          marginBottom: "0",
        }}
      >
        {/* Left */}
        <div style={{ flex: "1 1 400px", maxWidth: "600px" }}>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 500,
              color: "#F5C400",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              display: "block",
              marginBottom: "1.25rem",
            }}
          >
            OUR SERVICES
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(38px, 4.5vw, 64px)",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            Every Plumbing &<br />
            Heating Problem.
            <br />
            One Trusted Expert.
          </h2>
        </div>

        {/* Right */}
        <div
          className="hidden md:block"
          style={{ flex: "0 1 420px", alignSelf: "flex-end" }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "17px",
              fontWeight: 400,
              color: "#A0A0A0",
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            From emergency repairs to full installations — Roshan brings 20
            years of certified expertise directly to your door. Every service
            performed personally. No subcontractors. Ever.
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              fontWeight: 500,
              color: "#2A2A2A",
              marginTop: "24px",
              marginBottom: 0,
            }}
          >
            12 Services · Personally Performed · Calgary & Area
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* SERVICES GRID                               */}
      {/* ═══════════════════════════════════════════ */}
      <div
        ref={gridRef}
        className="svc-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          backgroundColor: "#2A2A2A",
          border: "1px solid #2A2A2A",
          borderRadius: "12px",
          overflow: "hidden",
          margin: "48px 6% 0",
        }}
      >
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION CTA ROW                             */}
      {/* ═══════════════════════════════════════════ */}
      <div
        ref={ctaRef}
        className="svc-cta-row"
        style={{
          background: "#1A1A1A",
          borderTop: "1px solid #2A2A2A",
          padding: "48px 6%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "2rem",
          marginTop: "48px",
        }}
      >
        {/* Left text */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "24px",
              fontWeight: 700,
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            Not sure which service you need?
          </h3>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "15px",
              fontWeight: 400,
              color: "#A0A0A0",
              marginTop: "8px",
              marginBottom: 0,
            }}
          >
            Call Roshan and he&apos;ll diagnose it.
          </p>
        </div>

        {/* Right buttons */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <motion.a
            href="tel:+14037969658"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#F5C400",
              color: "#0A0A0A",
              fontFamily: "var(--font-display)",
              fontSize: "14px",
              fontWeight: 700,
              padding: "14px 28px",
              borderRadius: "8px",
              textDecoration: "none",
              cursor: "pointer",
              border: "none",
            }}
          >
            Call Now — (403) 796-9658
          </motion.a>

          <motion.a
            href="mailto:info@brightsideplumbing.com"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="svc-email-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "transparent",
              color: "#FFFFFF",
              fontFamily: "var(--font-display)",
              fontSize: "14px",
              fontWeight: 700,
              padding: "14px 28px",
              borderRadius: "8px",
              textDecoration: "none",
              cursor: "pointer",
              border: "1px solid #2A2A2A",
              transition: "border-color 0.2s ease, color 0.2s ease",
            }}
          >
            Book by Email
          </motion.a>
        </div>
      </div>
    </section>
  );
}

/* ─── Individual Service Card ─── */
function ServiceCard({ service }) {
  return (
    <motion.div
      className="svc-card"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{
        background: "#0A0A0A",
        padding: "40px 36px",
        position: "relative",
        overflow: "hidden",
        minHeight: "260px",
        display: "flex",
        flexDirection: "column",
        cursor: "default",
      }}
    >
      {/* Layer 1 — Background Image */}
      <img
        src={service.image}
        alt={service.name}
        loading="lazy"
        className="svc-card-bg"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.07,
          filter: "grayscale(100%)",
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      />

      {/* Layer 2 — Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.80) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Layer 3 — Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* Service Number */}
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "11px",
            fontWeight: 500,
            color: "#333333",
            letterSpacing: "0.15em",
            marginBottom: "20px",
          }}
        >
          {service.id}
        </span>

        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 8, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{ marginBottom: "16px", width: "fit-content" }}
        >
          <service.Icon size={32} style={{ color: "#F5C400" }} />
        </motion.div>

        {/* Service Name */}
        <h4
          className="svc-card-title"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "18px",
            fontWeight: 700,
            color: "#FFFFFF",
            margin: "0 0 10px 0",
            transition: "color 0.2s ease",
            lineHeight: 1.3,
          }}
        >
          {service.name}
        </h4>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            fontWeight: 400,
            color: "#A0A0A0",
            lineHeight: 1.7,
            margin: "0 0 20px 0",
            flex: 1,
          }}
        >
          {service.description}
        </p>

        {/* CTA */}
        <motion.a
          href="/book"
          className="svc-card-cta"
          whileHover="hover"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "13px",
            fontWeight: 500,
            color: "#F5C400",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            marginTop: "20px",
            opacity: 0,
            transition: "opacity 0.2s ease",
          }}
        >
          Book This Service
          <motion.span
            variants={{ hover: { x: 4 } }}
            transition={{ type: "spring", stiffness: 400 }}
            style={{ display: "inline-flex" }}
          >
            <ArrowRight size={14} />
          </motion.span>
        </motion.a>
      </div>

      {/* Layer 4 — Bottom Accent Line */}
      <div className="svc-card-line" />
    </motion.div>
  );
}
