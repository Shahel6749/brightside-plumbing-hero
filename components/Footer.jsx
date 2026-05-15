"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Star } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════ */
/* DATA                                                    */
/* ═══════════════════════════════════════════════════════ */
const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#why-choose-us" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Book an Appointment", href: "tel:+14037969658" },
  { label: "Contact", href: "mailto:info@brightsideplumbing.com" },
];

const serviceLinks = [
  { label: "Drain Cleaning", href: "/#services" },
  { label: "Water Leaks", href: "/#services" },
  { label: "Furnace Repair", href: "/#services" },
  { label: "Hot Water Tank", href: "/#services" },
  { label: "Toilet Repair", href: "/#services" },
  { label: "Faucet Installation", href: "/#services" },
];

/* ═══════════════════════════════════════════════════════ */
/* REUSABLE LINK COMPONENT                                */
/* ═══════════════════════════════════════════════════════ */
function FooterLink({ href, children }) {
  return (
    <motion.a
      href={href}
      whileHover={{ color: "#F5C400", x: 4 }}
      transition={{ duration: 0.2 }}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "13px",
        fontWeight: 400,
        color: "#A0A0A0",
        textDecoration: "none",
        display: "block",
        cursor: "pointer",
      }}
    >
      {children}
    </motion.a>
  );
}

/* ═══════════════════════════════════════════════════════ */
/* COMPONENT                                              */
/* ═══════════════════════════════════════════════════════ */
export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (footerRef.current) {
        gsap.set(footerRef.current, { opacity: 0, y: 30 });
        ScrollTrigger.create({
          trigger: footerRef.current,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(footerRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            });
          },
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      style={{
        background: "#0A0A0A",
        borderTop: "1px solid #2A2A2A",
        padding: "60px 6% 0",
        color: "#A0A0A0",
        opacity: 0,
      }}
    >
      {/* ═══════════════════════════════════════════ */}
      {/* FOOTER MAIN — 4 COLUMNS                    */}
      {/* ═══════════════════════════════════════════ */}
      <div
        className="footer-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
          gap: "48px",
          paddingBottom: "48px",
          borderBottom: "1px solid #2A2A2A",
          marginBottom: "0",
        }}
      >
        {/* ─── COLUMN 1: Brand ─── */}
        <div>
          <Image
            src="/images/logo.svg"
            alt="Brightside Plumbing and Heating"
            width={140}
            height={32}
            style={{ marginBottom: "16px", height: "auto", width: "140px" }}
          />
          <h4
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "14px",
              fontWeight: 700,
              color: "#FFFFFF",
              margin: "0 0 20px",
            }}
          >
            Brightside Plumbing and Heating
          </h4>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 400,
              color: "#A0A0A0",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Calgary&rsquo;s most trusted plumbing and heating expert. Roshan
            personally handles every job — no subcontractors, no exceptions. 20+
            years of certified expertise.
          </p>
        </div>

        {/* ─── COLUMN 2: Quick Links ─── */}
        <div>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 500,
              color: "#F5C400",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              display: "block",
              marginBottom: "20px",
            }}
          >
            Quick Links
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {quickLinks.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </div>
        </div>

        {/* ─── COLUMN 3: Services ─── */}
        <div>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 500,
              color: "#F5C400",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              display: "block",
              marginBottom: "20px",
            }}
          >
            Top Services
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {serviceLinks.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </div>
        </div>

        {/* ─── COLUMN 4: Contact ─── */}
        <div>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 500,
              color: "#F5C400",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              display: "block",
              marginBottom: "20px",
            }}
          >
            Get in Touch
          </span>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {/* Phone */}
            <motion.a
              href="tel:+14037969658"
              whileHover={{ color: "#F5C400" }}
              transition={{ duration: 0.2 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                textDecoration: "none",
                color: "#FFFFFF",
              }}
            >
              <Phone size={16} color="#F5C400" style={{ flexShrink: 0 }} />
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                (403) 796-9658
              </span>
            </motion.a>

            {/* Email */}
            <motion.a
              href="mailto:info@brightsideplumbing.com"
              whileHover={{ color: "#F5C400" }}
              transition={{ duration: 0.2 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                textDecoration: "none",
                color: "#FFFFFF",
              }}
            >
              <Mail size={16} color="#F5C400" style={{ flexShrink: 0 }} />
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                info@brightsideplumbing.com
              </span>
            </motion.a>

            {/* Location */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                color: "#FFFFFF",
              }}
            >
              <MapPin size={16} color="#F5C400" style={{ flexShrink: 0 }} />
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                Calgary, Alberta, Canada
              </span>
            </div>

            {/* Google Reviews link */}
            <motion.a
              href="https://www.google.com/maps/place/Brightside+Plumbing+and+Heating"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ color: "#D4A800" }}
              transition={{ duration: 0.2 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                textDecoration: "none",
                color: "#FFFFFF",
                marginTop: "8px",
              }}
            >
              <Star size={16} color="#F5C400" style={{ flexShrink: 0 }} />
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                See All Reviews
              </span>
            </motion.a>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* FOOTER BOTTOM — COPYRIGHT                  */}
      {/* ═══════════════════════════════════════════ */}
      <div
        className="footer-bottom"
        style={{
          padding: "24px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "24px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "12px",
            fontWeight: 400,
            color: "#2A2A2A",
          }}
        >
          © 2026 Brightside Plumbing and Heating. All rights reserved.
        </span>
        <span
          className="footer-tagline"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "12px",
            fontWeight: 400,
            color: "#2A2A2A",
          }}
        >
          Proudly serving Calgary since 2000
        </span>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* RESPONSIVE CSS                             */}
      {/* ═══════════════════════════════════════════ */}
      <style jsx global>{`
        @media (max-width: 1199px) and (min-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 767px) {
          footer {
            padding: 40px 20px 0 !important;
          }
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            text-align: center !important;
          }
          .footer-tagline {
            display: none !important;
          }
        }
      `}</style>
    </footer>
  );
}
