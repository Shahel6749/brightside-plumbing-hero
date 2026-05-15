"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Wrench, Zap, Send } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ═══ DATA ═══ */
const services = [
  "Drain Cleaning & Repair",
  "Water Leak Detection & Repair",
  "Furnace Repair & Installation",
  "Hot Water Tank Installation & Repair",
  "Toilet Repair & Installation",
  "Faucet & Fixture Installation",
  "Sump Pump Installation",
  "Thermostat Installation",
  "Backflow Prevention",
  "Gas Line Services",
  "Troubleshooting & General Plumbing",
  "Emergency Service",
];

const contactCards = [
  { Icon: Phone, title: "Phone", line1: "+1 (403) 796-9658", line2: "Call or text — no voicemail runaround", href: "tel:+14037969658" },
  { Icon: MapPin, title: "Service Area", line1: "Calgary & Surrounding Areas", line2: "Alberta, Canada", href: null },
  { Icon: Clock, title: "Hours of Operation", line1: "Mon – Fri: 7:00 AM – 7:00 PM", line2: "Sat – Sun: 8:00 AM – 6:00 PM", href: null },
  { Icon: Wrench, title: "Services", line1: "Plumbing · Heating · Gas Fitting", line2: "Water Heaters · Drains · Emergency", href: null },
];

/* ═══ STYLES ═══ */
const inputStyle = {
  width: "100%", padding: "14px 16px", background: "#0A0A0A",
  border: "1px solid #2A2A2A", borderRadius: "6px", color: "#FFFFFF",
  fontFamily: "var(--font-sans)", fontSize: "14px", outline: "none",
  transition: "border-color 0.2s ease",
};
const labelStyle = {
  fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 500,
  color: "#A0A0A0", marginBottom: "6px", display: "block",
};
const focusIn = (e) => (e.target.style.borderColor = "#F5C400");
const focusOut = (e) => (e.target.style.borderColor = "#2A2A2A");

/* ═══ COMPONENT ═══ */
export default function BookingCTA() {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const mapRef = useRef(null);
  const ctaRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", phone: "", email: "", service: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Booking: ${formData.service || "General"}`);
    const body = encodeURIComponent(
      `Name: ${formData.firstName} ${formData.lastName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nService: ${formData.service}\n\n${formData.message}`
    );
    window.location.href = `mailto:info@brightsideplumbing.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      [
        { sel: ".bk-hero-anim", ref: heroRef },
        { sel: ".bk-content-anim", ref: contentRef },
        { sel: ".bk-map-anim", ref: mapRef },
      ].forEach(({ sel, ref }) => {
        const els = ref.current?.querySelectorAll(sel);
        if (!els?.length) return;
        gsap.set(els, { opacity: 0, y: 30 });
        ScrollTrigger.create({
          trigger: ref.current, start: "top 80%", once: true,
          onEnter: () => gsap.to(els, {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
          }),
        });
      });
      if (ctaRef.current) {
        gsap.set(ctaRef.current, { opacity: 0, y: 20 });
        ScrollTrigger.create({
          trigger: ctaRef.current, start: "top 85%", once: true,
          onEnter: () => gsap.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }),
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="booking-cta" ref={sectionRef} style={{ background: "#0A0A0A", borderTop: "1px solid #2A2A2A" }}>

      {/* ═══ HERO BANNER WITH IMAGE ═══ */}
      <div ref={heroRef} style={{ position: "relative", overflow: "hidden", minHeight: "340px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Image
          src="/images/plumbing-inspection.jpg"
          alt="Professional plumbing inspection"
          fill
          style={{ objectFit: "cover", objectPosition: "center 30%", opacity: 0.35 }}
          sizes="100vw"
          priority={false}
        />
        {/* Dark overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.95) 100%)", zIndex: 2 }} />

        <div style={{ position: "relative", zIndex: 3, textAlign: "center", padding: "60px 6%" }}>
          <span className="bk-hero-anim" style={{
            fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 500,
            color: "#F5C400", textTransform: "uppercase", letterSpacing: "0.2em",
            display: "block", marginBottom: "12px", opacity: 0,
          }}>Book Your Service</span>
          <h2 className="bk-hero-anim" style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 700, color: "#FFFFFF", lineHeight: 1.1, margin: "0 0 16px", opacity: 0,
          }}>Contact Us</h2>
          <p className="bk-hero-anim" style={{
            fontFamily: "var(--font-sans)", fontSize: "16px", color: "#A0A0A0",
            lineHeight: 1.7, maxWidth: "500px", margin: "0 auto", opacity: 0,
          }}>
            Need a plumber today? Call us directly or fill in the form and we&rsquo;ll reach back promptly.
          </p>
        </div>
      </div>

      {/* ═══ MAIN: CARDS + FORM ═══ */}
      <div ref={contentRef} className="bk-main" style={{
        display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "40px",
        padding: "60px 6%", alignItems: "start",
      }}>
        {/* LEFT — Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {contactCards.map((card) => (
            <motion.div key={card.title} className="bk-content-anim"
              whileHover={{ borderColor: "rgba(245,196,0,0.3)", y: -2 }}
              transition={{ duration: 0.2 }}
              style={{
                background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: "10px",
                padding: "24px", display: "flex", gap: "16px", alignItems: "flex-start",
                opacity: 0, cursor: card.href ? "pointer" : "default",
              }}
              onClick={() => card.href && (window.location.href = card.href)}
            >
              <div style={{
                width: "40px", height: "40px", borderRadius: "8px",
                background: "rgba(245,196,0,0.08)", display: "flex",
                alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <card.Icon size={18} color="#F5C400" />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: 700, color: "#FFFFFF", marginBottom: "4px" }}>{card.title}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#FFFFFF", lineHeight: 1.5 }}>{card.line1}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#A0A0A0", marginTop: "2px" }}>{card.line2}</div>
              </div>
            </motion.div>
          ))}

          {/* Same-Day badge */}
          <motion.div className="bk-content-anim"
            whileHover={{ borderColor: "rgba(245,196,0,0.4)" }}
            style={{
              background: "linear-gradient(135deg, rgba(245,196,0,0.12) 0%, rgba(10,10,10,0.95) 100%)",
              border: "1px solid rgba(245,196,0,0.2)", borderRadius: "10px",
              padding: "24px", display: "flex", gap: "16px", alignItems: "flex-start", opacity: 0,
            }}
          >
            <div style={{
              width: "40px", height: "40px", borderRadius: "8px", background: "#F5C400",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <Zap size={18} color="#0A0A0A" />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: 700, color: "#F5C400", marginBottom: "4px" }}>Same-Day Service</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#A0A0A0", lineHeight: 1.6 }}>
                For urgent issues, call directly. We often respond within hours and aim to be there the same day.
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT — Form */}
        <div className="bk-content-anim" style={{
          background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: "12px", padding: "40px", opacity: 0,
        }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 700, color: "#FFFFFF", margin: "0 0 8px" }}>Send Us a Message</h3>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#A0A0A0", margin: "0 0 32px", lineHeight: 1.6 }}>
            Describe your issue and we&rsquo;ll get back to you — usually within a few hours.
          </p>

          {submitted ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>✓</div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "#FFFFFF", marginBottom: "8px" }}>Message Ready!</h4>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#A0A0A0" }}>
                Your email client should have opened. Send the email to complete your booking.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="bk-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={labelStyle}>First Name *</label>
                  <input name="firstName" required placeholder="John" value={formData.firstName} onChange={handleChange} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                </div>
                <div>
                  <label style={labelStyle}>Last Name</label>
                  <input name="lastName" placeholder="Smith" value={formData.lastName} onChange={handleChange} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                </div>
              </div>

              <div className="bk-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input name="phone" type="tel" required placeholder="+1 403-000-0000" value={formData.phone} onChange={handleChange} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                </div>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input name="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>Service Needed</label>
                <select name="service" value={formData.service} onChange={handleChange}
                  style={{ ...inputStyle, appearance: "none", cursor: "pointer",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23A0A0A0' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center",
                  }}
                  onFocus={focusIn} onBlur={focusOut}
                >
                  <option value="" style={{ background: "#0A0A0A" }}>Select a service...</option>
                  {services.map((s) => (
                    <option key={s} value={s} style={{ background: "#0A0A0A" }}>{s}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>Describe Your Issue *</label>
                <textarea name="message" required rows={5} value={formData.message} onChange={handleChange}
                  placeholder="e.g., 'No hot water, water heater is 12 years old' or 'Kitchen drain is completely blocked'..."
                  style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                  onFocus={focusIn} onBlur={focusOut} />
              </div>

              <motion.button type="submit"
                whileHover={{ scale: 1.02, backgroundColor: "#D4A800" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: "100%", padding: "16px", background: "#F5C400", color: "#0A0A0A",
                  fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: 700,
                  border: "none", borderRadius: "6px", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                }}
              >
                <Send size={16} /> Send Message
              </motion.button>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#A0A0A0", textAlign: "center", marginTop: "12px" }}>
                We typically respond within 2-4 hours during business hours.
              </p>
            </form>
          )}
        </div>
      </div>

      {/* ═══ MAP ═══ */}
      <div ref={mapRef} style={{ padding: "0 6% 60px" }}>
        <h3 className="bk-map-anim" style={{
          fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700,
          color: "#FFFFFF", marginBottom: "16px", opacity: 0,
        }}>
          Find Us in <span style={{ color: "#F5C400" }}>Calgary, Alberta</span>
        </h3>
        <div className="bk-map-anim" style={{
          borderRadius: "12px", overflow: "hidden", border: "1px solid #2A2A2A", height: "300px", opacity: 0,
        }}>
          <iframe
            title="Brightside Plumbing Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d321619.0!2d-114.2!3d51.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537170039f843fd5%3A0x266d3bb1b652b63a!2sCalgary%2C%20AB!5e0!3m2!1sen!2sca!4v1"
            width="100%" height="100%" style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* ═══ EMERGENCY CTA ═══ */}
      <div ref={ctaRef} style={{
        background: "#1A1A1A", borderTop: "1px solid #2A2A2A",
        padding: "60px 6%", textAlign: "center", opacity: 0,
      }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "#FFFFFF", margin: "0 0 24px" }}>
          Need Immediate Help?
        </h2>
        <motion.a href="tel:+14037969658"
          whileHover={{ scale: 1.04, backgroundColor: "#D4A800" }}
          whileTap={{ scale: 0.96 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "#F5C400", color: "#0A0A0A",
            fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: 700,
            padding: "16px 32px", borderRadius: "4px", textDecoration: "none",
          }}
        >
          <Phone size={16} /> Call +1 (403) 796-9658
        </motion.a>
      </div>

      {/* ═══ RESPONSIVE ═══ */}
      <style jsx global>{`
        @media (max-width: 767px) {
          .bk-main { grid-template-columns: 1fr !important; }
          .bk-form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
