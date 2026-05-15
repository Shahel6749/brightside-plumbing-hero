"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, Waves, GitMerge, Droplets, AlertCircle, Settings,
  Droplet, Wind, Flame, Thermometer, Zap, Wrench,
  X, ArrowRight, Phone, ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════ */
/* ICON MAP                                                */
/* ═══════════════════════════════════════════════════════ */
const iconMap = {
  ShieldCheck, Waves, GitMerge, Droplets, AlertCircle, Settings,
  Droplet, Wind, Flame, Thermometer, Zap, Wrench,
};

/* ═══════════════════════════════════════════════════════ */
/* SERVICE DATA                                            */
/* ═══════════════════════════════════════════════════════ */
const services = [
  {
    id: "01", slug: "backflow-device-testing",
    name: "Backflow Device Testing & Installation",
    shortDesc: "Cross Connection Certified. City of Calgary compliance reporting.",
    fullDesc: "Protect your home\u2019s water supply from contamination. Roshan is Cross Connection Certified and handles all backflow preventer testing, installation, and compliance reporting to City of Calgary standards. Backflow prevention is critical for any home connected to irrigation systems, pools, or commercial equipment. Roshan ensures your system meets all municipal requirements.",
    icon: "ShieldCheck",
    image: "/images/services/backflow.png",
    tag: "Certified Service",
  },
  {
    id: "02", slug: "drain-cleaning",
    name: "Drain Cleaning",
    shortDesc: "Professional-grade equipment clears the problem at the source.",
    fullDesc: "Slow drains, complete blockages, or recurring backups \u2014 Roshan clears the problem at the source, not just the symptom. Using professional-grade equipment for kitchen drains, bathroom drains, floor drains, and more. Whether it\u2019s grease buildup, hair, foreign objects, or root intrusion \u2014 the problem gets solved permanently.",
    icon: "Waves",
    image: "/images/services/drain-cleaning.webp",
    tag: "Fast Response",
  },
  {
    id: "03", slug: "sewer-water-line",
    name: "Sewer & Water Line Replacements",
    shortDesc: "Full replacements with minimal disruption. Honest assessment.",
    fullDesc: "When repair isn\u2019t enough, Roshan handles full sewer and water main line replacements with minimal disruption to your property. Every assessment is honest \u2014 no unnecessary excavation, no upselling. You\u2019ll know exactly what needs to be done and why before any work begins.",
    icon: "GitMerge",
    image: "/images/services/sewer-water.png",
    tag: "Major Works",
  },
  {
    id: "04", slug: "water-leaks",
    name: "Water Leaks",
    shortDesc: "Rapid diagnosis before small leaks become costly disasters.",
    fullDesc: "A small leak can become a costly disaster within hours. Roshan provides rapid diagnosis and reliable repair for pipe leaks, joint failures, hidden leaks behind walls, and water damage prevention. Available for emergency calls including evenings, weekends, and holidays. Don\u2019t wait \u2014 call immediately.",
    icon: "Droplets",
    image: "/images/services/water-leaks.png",
    tag: "Emergency Available",
  },
  {
    id: "05", slug: "toilet-trouble",
    name: "Toilet Trouble",
    shortDesc: "Fast diagnosis and repair. Full replacement also available.",
    fullDesc: "Running, leaking, clogged, or not flushing properly \u2014 Roshan diagnoses and repairs all toilet issues quickly and affordably. Full replacement and installation also available. From internal mechanism repairs to complete toilet replacements, every job is done cleanly with no mess left behind.",
    icon: "AlertCircle",
    image: "/images/services/toilet.webp",
    tag: "Quick Fix",
  },
  {
    id: "06", slug: "garburators",
    name: "Garburators",
    shortDesc: "Properly connected and fully tested before leaving your home.",
    fullDesc: "Installation, repair, and replacement of kitchen garburators. Roshan ensures proper connection to your drain system and fully tests the unit before leaving your home. Includes all plumbing connections, electrical hookup coordination, and leak testing under pressure.",
    icon: "Settings",
    image: "/images/services/garburators.png",
    tag: "Installation",
  },
  {
    id: "07", slug: "sinks-faucets",
    name: "Sinks & Faucets",
    shortDesc: "Faucet upgrades, bidet installation, fixture work done right.",
    fullDesc: "From a dripping faucet to a full kitchen or bathroom sink installation \u2014 Roshan handles all fixture work with care and precision. Faucet upgrades, bidet installation, undermount sink replacement, and more. Every installation is tested for leaks and proper flow before the job is complete.",
    icon: "Droplet",
    image: "/images/services/sinks-faucets.png",
    tag: "Installation",
  },
  {
    id: "08", slug: "washing-machine-hookups",
    name: "Washing Machine Hook-Ups",
    shortDesc: "All connections done safely and to code.",
    fullDesc: "New washer installation or moving your laundry setup? Roshan handles all supply line and drain connections safely and to code. This includes hot and cold supply lines, drain hose routing, valve installation, and a full pressure test to ensure everything is sealed correctly.",
    icon: "Wind",
    image: "/images/services/washing-machine.jpg",
    tag: "Installation",
  },
  {
    id: "09", slug: "furnace-repair",
    name: "Furnace Repair & Heating",
    shortDesc: "Class A Gasfitter. Often repaired same day.",
    fullDesc: "Calgary winters are no time for a furnace failure. Roshan is a Class A Gasfitter Journeyman who diagnoses and repairs furnace issues fast \u2014 often same day. From ignition failures to heat exchanger issues, gas valve problems to pilot light failures. Your family stays warm.",
    icon: "Flame",
    image: "/images/services/furnace.webp",
    tag: "Emergency Available",
  },
  {
    id: "10", slug: "thermostat-installation",
    name: "Thermostat Installation",
    shortDesc: "Smart thermostat upgrades including smart home models.",
    fullDesc: "Upgrade to a smart thermostat or replace a faulty unit. Roshan handles all thermostat wiring and configuration, including smart home compatible models like Nest, Ecobee, and Honeywell. Full testing and setup included. Works with all heating systems including gas, electric, and heat pump.",
    icon: "Thermometer",
    image: "/images/services/thermostat.png",
    tag: "Smart Home",
  },
  {
    id: "11", slug: "hot-water-tank",
    name: "Hot Water Tank Installation & Repair",
    shortDesc: "Conventional and tankless from all major brands.",
    fullDesc: "No hot water is never acceptable. Roshan installs, repairs, and replaces hot water tanks from all major brands \u2014 conventional and tankless. Fast turnaround guaranteed. Includes all gas line connections, water supply hookups, pressure relief valve installation, and full system testing.",
    icon: "Zap",
    image: "/images/services/hot-water-tank.jpeg",
    tag: "Fast Turnaround",
  },
  {
    id: "12", slug: "general-plumbing",
    name: "Troubleshooting & General Plumbing",
    shortDesc: "20+ years means he\u2019s seen and solved everything.",
    fullDesc: "Not sure what the problem is? That\u2019s fine. Roshan will diagnose it. With 20+ years of experience, he\u2019s seen \u2014 and solved \u2014 everything. From mysterious sounds in pipes to pressure problems, from failed shut-off valves to whole-home plumbing inspections. Call and describe the issue \u2014 Roshan will know what it is.",
    icon: "Wrench",
    image: "/images/services/general-plumbing.png",
    tag: "General Service",
  },
];

/* ═══════════════════════════════════════════════════════ */
/* MAIN PAGE COMPONENT                                     */
/* ═══════════════════════════════════════════════════════ */
export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  /* ESC key handler */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setSelectedService(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  /* Body scroll lock */
  useEffect(() => {
    document.body.style.overflow = selectedService ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedService]);

  /* GSAP entrances */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Header stagger */
      if (headerRef.current) {
        const kids = headerRef.current.children;
        gsap.from(kids, {
          y: 40, opacity: 0, duration: 0.8,
          stagger: 0.12, ease: "power3.out", delay: 0.1,
        });
      }
      /* Card grid stagger */
      gsap.set(".svc-card", { opacity: 0, y: 50 });
      ScrollTrigger.create({
        trigger: ".svc-grid",
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(".svc-card", {
            opacity: 1, y: 0, duration: 0.65,
            stagger: { amount: 0.7, from: "start" },
            ease: "power3.out",
            clearProps: "transform,opacity",
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      {/* ─── Mini Nav ─── */}
      <nav style={{
        padding: "20px 6%", display: "flex", justifyContent: "space-between",
        alignItems: "center", borderBottom: "1px solid #2A2A2A",
        position: "sticky", top: 0, zIndex: 50, background: "rgba(10,10,10,0.92)",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
      }}>
        <Link href="/" style={{
          display: "flex", alignItems: "center", gap: "8px",
          textDecoration: "none", color: "#A0A0A0",
          fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 500,
        }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <motion.a href="tel:+14037969658"
          whileHover={{ scale: 1.04, backgroundColor: "#D4A800" }}
          whileTap={{ scale: 0.96 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "#F5C400", color: "#0A0A0A",
            fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 700,
            padding: "10px 20px", borderRadius: "4px", textDecoration: "none",
          }}
        >
          <Phone size={14} /> (403) 796-9658
        </motion.a>
      </nav>

      {/* ─── Page Header ─── */}
      <div ref={headerRef} style={{
        padding: "80px 6% 60px", borderBottom: "1px solid #2A2A2A",
      }}>
        <span style={{
          fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 500,
          color: "#F5C400", textTransform: "uppercase", letterSpacing: "0.2em",
          display: "block", marginBottom: "16px",
        }}>What We Offer</span>
        <h1 style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(40px, 5vw, 72px)",
          fontWeight: 700, color: "#FFFFFF", lineHeight: 1.05, margin: "0 0 20px",
        }}>
          Full-Service Plumbing,<br />Gas Fitting & Heating.
        </h1>
        <p style={{
          fontFamily: "var(--font-sans)", fontSize: "17px", color: "#A0A0A0",
          lineHeight: 1.75, maxWidth: "560px", margin: 0,
        }}>
          Every service performed personally by Roshan &mdash;
          a Red Seal Plumber and Class A Gasfitter
          with over 20 years of experience in Calgary homes.
        </p>
      </div>

      {/* ─── Services Grid ─── */}
      <div ref={gridRef} className="svc-grid" style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1px", background: "#2A2A2A", border: "1px solid #2A2A2A",
        margin: "60px 6% 80px", borderRadius: "12px", overflow: "hidden",
      }}>
        {services.map((svc) => {
          const Icon = iconMap[svc.icon];
          return (
            <motion.div
              key={svc.id}
              layoutId={`card-${svc.id}`}
              className="svc-card"
              onClick={() => setSelectedService(svc)}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              style={{
                background: "#0A0A0A", padding: "40px 36px",
                position: "relative", overflow: "hidden",
                minHeight: "260px", display: "flex", flexDirection: "column",
                cursor: "pointer", opacity: 0,
              }}
            >
              {/* BG image subtle */}
              <img
                src={svc.image} alt="" aria-hidden="true"
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%", objectFit: "cover",
                  opacity: 0.07, filter: "grayscale(100%)", pointerEvents: "none",
                }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.8) 100%)",
              }} />

              {/* Content */}
              <div style={{ position: "relative", zIndex: 10 }}>
                <div style={{
                  fontFamily: "var(--font-display)", fontSize: "11px",
                  color: "#333", letterSpacing: "0.15em", marginBottom: "20px",
                }}>{svc.id}</div>
                {Icon && <div style={{ marginBottom: "16px" }}><Icon size={30} color="#F5C400" /></div>}
                <h3 style={{
                  fontFamily: "var(--font-display)", fontWeight: 700,
                  fontSize: "18px", color: "#FFFFFF",
                  marginBottom: "10px", lineHeight: 1.3,
                }}>{svc.name}</h3>
                <p style={{
                  fontFamily: "var(--font-sans)", fontSize: "13px",
                  color: "#A0A0A0", lineHeight: 1.65, marginBottom: "20px",
                }}>{svc.shortDesc}</p>
                <div style={{
                  fontSize: "12px", color: "#F5C400",
                  fontFamily: "var(--font-sans)", fontWeight: 500,
                  display: "flex", alignItems: "center", gap: "6px",
                }}>
                  Learn More <ArrowRight size={12} />
                </div>
              </div>

              {/* Bottom accent line (CSS) */}
              <div className="svc-accent-line" />
            </motion.div>
          );
        })}
      </div>

      {/* ─── Expanded Overlay ─── */}
      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedService(null)}
              style={{
                position: "fixed", inset: 0,
                background: "rgba(0,0,0,0.85)",
                zIndex: 100, cursor: "pointer",
                backdropFilter: "blur(4px)",
              }}
            />
            <motion.div
              key={selectedService.id}
              layoutId={`card-${selectedService.id}`}
              className="svc-expanded"
              transition={{
                layout: { type: "spring", stiffness: 300, damping: 30 },
              }}
              style={{
                position: "fixed", inset: "2%", zIndex: 101,
                borderRadius: "16px", overflow: "hidden",
                background: "#0A0A0A", border: "1px solid #2A2A2A",
                display: "flex",
              }}
            >
              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                onClick={() => setSelectedService(null)}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(245,196,0,0.2)" }}
                style={{
                  position: "absolute", top: "20px", right: "20px",
                  width: "40px", height: "40px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.06)", border: "1px solid #2A2A2A",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", zIndex: 200,
                }}
              >
                <X size={18} color="#FFFFFF" />
              </motion.button>

              <ExpandedView service={selectedService} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />

      {/* ─── CSS ─── */}
      <style jsx global>{`
        .svc-card { position: relative; }
        .svc-card .svc-accent-line {
          position: absolute; bottom: 0; left: 0;
          height: 2px; width: 0%; background: #F5C400;
          transition: width 0.45s ease;
        }
        .svc-card:hover .svc-accent-line { width: 100%; }

        @media (max-width: 1199px) and (min-width: 768px) {
          .svc-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 767px) {
          .svc-grid { grid-template-columns: 1fr !important; }
          .svc-expanded {
            inset: 0 !important;
            border-radius: 0 !important;
            flex-direction: column !important;
          }
          .svc-expanded .exp-image {
            width: 100% !important; height: 40vh !important;
          }
          .svc-expanded .exp-content {
            padding: 32px 24px !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/* EXPANDED VIEW                                           */
/* ═══════════════════════════════════════════════════════ */
function ExpandedView({ service }) {
  const Icon = iconMap[service.icon];
  const tags = [service.tag, "Personal Service", "No Subcontractors"];

  const stagger = (i) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.2 + i * 0.08, duration: 0.5, ease: "easeOut" },
  });

  return (
    <>
      {/* LEFT — Image */}
      <div className="exp-image" style={{
        width: "50%", height: "100%", position: "relative",
        overflow: "hidden", flexShrink: 0,
      }}>
        <img
          src={service.image} alt={service.name}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            opacity: 1, filter: "none",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(10,10,10,0) 60%, rgba(10,10,10,1) 100%)",
        }} />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          style={{
            position: "absolute", bottom: "24px", left: "24px",
            background: "rgba(245,196,0,0.15)",
            border: "1px solid rgba(245,196,0,0.3)",
            borderRadius: "20px", padding: "6px 16px",
            fontFamily: "var(--font-sans)", fontWeight: 500,
            fontSize: "12px", color: "#F5C400",
            backdropFilter: "blur(8px)",
          }}
        >
          {service.tag}
        </motion.div>
      </div>

      {/* RIGHT — Content */}
      <div className="exp-content" style={{
        flex: 1, padding: "48px", overflowY: "auto",
        display: "flex", flexDirection: "column", justifyContent: "center",
        background: "#0A0A0A",
      }}>
        {/* Number + Icon */}
        <motion.div {...stagger(0)} style={{
          display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px",
        }}>
          <span style={{
            fontFamily: "var(--font-display)", fontSize: "13px",
            fontWeight: 500, color: "#333",
          }}>{service.id}</span>
          {Icon && <Icon size={40} color="#F5C400" />}
        </motion.div>

        {/* Name */}
        <motion.h2 {...stagger(1)} style={{
          fontFamily: "var(--font-display)", fontWeight: 700,
          fontSize: "clamp(28px, 3.5vw, 48px)", color: "#FFFFFF",
          lineHeight: 1.1, marginBottom: "24px",
        }}>{service.name}</motion.h2>

        {/* Divider */}
        <motion.div {...stagger(2)} style={{
          height: "1px", background: "#2A2A2A", marginBottom: "24px",
        }} />

        {/* Full description */}
        <motion.p {...stagger(3)} style={{
          fontFamily: "var(--font-sans)", fontSize: "16px",
          color: "#A0A0A0", lineHeight: 1.8, marginBottom: "32px",
        }}>{service.fullDesc}</motion.p>

        {/* Tags */}
        <motion.div {...stagger(4)} style={{
          display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "36px",
        }}>
          {tags.map((t) => (
            <span key={t} style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid #2A2A2A", borderRadius: "20px",
              padding: "6px 14px", fontFamily: "var(--font-sans)",
              fontWeight: 500, fontSize: "12px", color: "#A0A0A0",
            }}>{t}</span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div {...stagger(5)}>
          <motion.a
            href="tel:+14037969658"
            whileHover={{ scale: 1.04, backgroundColor: "#D4A800" }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              background: "#F5C400", color: "#0A0A0A",
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: "14px", padding: "14px 28px", borderRadius: "4px",
              textDecoration: "none", marginBottom: "16px",
            }}
          >
            <Phone size={16} /> Call Now — (403) 796-9658
          </motion.a>
          <p style={{
            fontFamily: "var(--font-sans)", fontSize: "12px", color: "#333",
          }}>
            Press Esc or click outside to close
          </p>
        </motion.div>
      </div>
    </>
  );
}
