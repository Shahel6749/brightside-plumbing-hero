"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView, animate } from "framer-motion";
import {
  DollarSign,
  Clock,
  Award,
  Zap,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Stats Data ─── */
const stats = [
  { target: 20, suffix: "+", label: "Years of Experience" },
  { target: 40, suffix: "", label: "Five-Star Google Reviews" },
  { target: 100, suffix: "%", label: "Personal Service — Every Job" },
];

/* ─── Feature Rows (Split Panel) ─── */
const featureRows = [
  {
    Icon: DollarSign,
    title: "Honest Pricing",
    body: "Fair quotes with no hidden fees, no upselling, no unnecessary work. What Roshan quotes is what you pay.",
  },
  {
    Icon: Clock,
    title: "Rapid Response",
    body: "Available for urgent calls including evenings, weekends, and holidays. Emergencies don't wait — neither does Roshan.",
  },
  {
    Icon: Award,
    title: "Fully Certified",
    body: "Red Seal Plumber. Class A Gasfitter. Cross Connection Certified. 20+ years in Calgary homes. Your home is in expert hands.",
  },
];

/* ─── Feature Cards (Row 3) ─── */
const featureCards = [
  {
    Icon: DollarSign,
    headline: "Honest Pricing",
    body: "You get a fair quote with no hidden fees, no upselling, and no unnecessary work. What Roshan quotes is what you pay.",
    tag: "Fair & Transparent",
  },
  {
    Icon: Zap,
    headline: "Rapid Response",
    body: "Plumbing emergencies don't wait for business hours. Roshan is available for urgent calls including evenings, weekends, and holidays.",
    tag: "Available 24/7",
  },
  {
    Icon: ShieldCheck,
    headline: "Certified Expert",
    body: "Red Seal Plumber. Class A Gasfitter. Cross Connection Certified. 20+ years in the field. Your home is in expert hands.",
    tag: "Red Seal Certified",
  },
];

/* ═══════════════════════════════════════════════ */
/* ANIMATED COUNTER                                */
/* ═══════════════════════════════════════════════ */
function AnimatedCounter({ target, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(0, target, {
        duration: 2.0,
        ease: "easeOut",
        onUpdate: (value) => setDisplay(Math.round(value)),
      });
      return controls.stop;
    }
  }, [inView, target]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════ */
/* MAIN COMPONENT                                  */
/* ═══════════════════════════════════════════════ */
export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const imagePanelRef = useRef(null);
  const contentRef = useRef(null);
  const statsBarRef = useRef(null);
  const cardsGridRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Image panel — slide from left */
      if (imagePanelRef.current) {
        gsap.from(imagePanelRef.current, {
          scrollTrigger: {
            trigger: imagePanelRef.current,
            start: "top 80%",
            once: true,
          },
          x: -60,
          opacity: 0,
          duration: 1.0,
          ease: "power3.out",
          force3D: true,
        });
      }

      /* Content panel — stagger from right */
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
            once: true,
          },
          x: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          force3D: true,
        });
      }

      /* Stats bar — fade up */
      if (statsBarRef.current) {
        gsap.from(statsBarRef.current, {
          scrollTrigger: {
            trigger: statsBarRef.current,
            start: "top 85%",
            once: true,
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          force3D: true,
        });
      }

      /* Feature cards — cascade */
      const cards = cardsGridRef.current?.querySelectorAll(".feature-card");
      if (cards?.length) {
        gsap.set(cards, { opacity: 0, y: 40 });
        ScrollTrigger.create({
          trigger: cardsGridRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.12,
              ease: "power3.out",
              clearProps: "transform,opacity",
            });
          },
        });
      }

      /* Quote block — fade up */
      if (quoteRef.current) {
        gsap.from(quoteRef.current, {
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 80%",
            once: true,
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          force3D: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      style={{
        background: "#0A0A0A",
        borderTop: "1px solid #2A2A2A",
      }}
    >
      {/* ═══════════════════════════════════════════ */}
      {/* ROW 1 — SPLIT LAYOUT                       */}
      {/* ═══════════════════════════════════════════ */}
      <div className="wcu-split">
        {/* LEFT — Image Panel */}
        <div
          ref={imagePanelRef}
          className="wcu-image-panel"
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: "500px",
          }}
        >
          <img
            src="/images/why-choose-us.png"
            alt="Roshan inspecting plumbing system"
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              position: "absolute",
              inset: 0,
            }}
          />

          {/* Overlay 1 — dark vignette */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.6) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Overlay 2 — right fade */}
          <div
            className="wcu-right-fade"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(10,10,10,0) 60%, rgba(10,10,10,1) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Floating badge */}
          <div
            style={{
              position: "absolute",
              bottom: "32px",
              left: "32px",
              background: "rgba(10,10,10,0.85)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(245,196,0,0.25)",
              borderRadius: "10px",
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              zIndex: 10,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "42px",
                fontWeight: 700,
                color: "#F5C400",
                lineHeight: 1,
              }}
            >
              20+
            </span>
            <div>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#A0A0A0",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  display: "block",
                  marginBottom: "2px",
                }}
              >
                Years of
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                Experience
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT — Content Panel */}
        <div
          ref={contentRef}
          className="wcu-content-panel"
          style={{
            background: "#0A0A0A",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Eyebrow */}
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
            WHY BRIGHTSIDE
          </span>

          {/* Headline */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 3.5vw, 52px)",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.08,
              margin: "0 0 20px 0",
            }}
          >
            You Deal With the Owner.
            <br />
            Every Single Time.
          </h2>

          {/* Body */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "16px",
              fontWeight: 400,
              color: "#A0A0A0",
              lineHeight: 1.75,
              maxWidth: "460px",
              margin: "0 0 40px 0",
            }}
          >
            No call centres. No dispatched strangers. When you book Brightside,
            Roshan shows up — the Red Seal Plumber and Class A Gasfitter with
            over two decades of hands-on experience.
          </p>

          {/* Feature Rows */}
          <div>
            {featureRows.map((feat, i) => (
              <div
                key={feat.title}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  marginBottom: i < featureRows.length - 1 ? "28px" : "0",
                  paddingBottom: i < featureRows.length - 1 ? "28px" : "0",
                  borderBottom:
                    i < featureRows.length - 1
                      ? "1px solid #2A2A2A"
                      : "none",
                }}
              >
                {/* Icon circle */}
                <motion.div
                  whileHover={{
                    backgroundColor: "rgba(245,196,0,0.2)",
                    scale: 1.08,
                  }}
                  transition={{ duration: 0.2 }}
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "rgba(245,196,0,0.1)",
                    border: "1px solid rgba(245,196,0,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <feat.Icon size={20} style={{ color: "#F5C400" }} />
                </motion.div>

                {/* Text */}
                <div>
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      margin: "0 0 6px 0",
                    }}
                  >
                    {feat.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#A0A0A0",
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {feat.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.a
            href="/book"
            whileHover={{ scale: 1.03, backgroundColor: "#D4A800" }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#F5C400",
              color: "#0A0A0A",
              fontFamily: "var(--font-display)",
              fontSize: "14px",
              fontWeight: 700,
              padding: "14px 28px",
              borderRadius: "4px",
              textDecoration: "none",
              cursor: "pointer",
              border: "none",
              marginTop: "32px",
              width: "fit-content",
            }}
          >
            Book Your Service
            <ArrowRight size={16} />
          </motion.a>
        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* ROW 2 — STATS BAR                          */}
      {/* ═══════════════════════════════════════════ */}
      <div
        ref={statsBarRef}
        className="wcu-stats-bar"
        style={{
          background: "#1A1A1A",
          borderTop: "1px solid #2A2A2A",
          borderBottom: "1px solid #2A2A2A",
          padding: "56px 6%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "40px",
        }}
      >
        {stats.map((stat, i) => (
          <div key={stat.label} style={{ display: "contents" }}>
            {/* Stat */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(48px, 6vw, 80px)",
                  fontWeight: 700,
                  color: "#F5C400",
                  lineHeight: 1,
                  marginBottom: "8px",
                }}
              >
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#A0A0A0",
                  letterSpacing: "0.05em",
                }}
              >
                {stat.label}
              </div>
            </div>

            {/* Divider (not after last) */}
            {i < stats.length - 1 && (
              <div
                className="wcu-stat-divider"
                style={{
                  width: "1px",
                  height: "60px",
                  background: "#2A2A2A",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* ROW 3 — FEATURE CARDS                      */}
      {/* ═══════════════════════════════════════════ */}
      <div
        className="wcu-cards-wrapper"
        style={{
          padding: "80px 0",
          borderTop: "1px solid #2A2A2A",
        }}
      >
        <div
          ref={cardsGridRef}
          className="wcu-cards-grid"
          style={{
            display: "grid",
            gap: "1px",
            backgroundColor: "#2A2A2A",
            border: "1px solid #2A2A2A",
            borderRadius: "12px",
            overflow: "hidden",
            margin: "0 6%",
          }}
        >
          {featureCards.map((card) => (
            <motion.div
              key={card.headline}
              className="feature-card wcu-card-inner"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                background: "#0A0A0A",
                padding: "48px 40px",
                position: "relative",
                overflow: "hidden",
                opacity: 0,
              }}
            >
              <card.Icon
                size={36}
                style={{ color: "#F5C400", marginBottom: "0" }}
              />
              <h4
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  margin: "20px 0 12px",
                  lineHeight: 1.2,
                }}
              >
                {card.headline}
              </h4>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "15px",
                  fontWeight: 400,
                  color: "#A0A0A0",
                  lineHeight: 1.7,
                  margin: "0",
                }}
              >
                {card.body}
              </p>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#F5C400",
                  background: "rgba(245,196,0,0.08)",
                  border: "1px solid rgba(245,196,0,0.15)",
                  borderRadius: "20px",
                  padding: "4px 12px",
                  display: "inline-block",
                  marginTop: "24px",
                }}
              >
                {card.tag}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* ROW 4 — QUOTE BLOCK                        */}
      {/* ═══════════════════════════════════════════ */}
      <div
        ref={quoteRef}
        style={{
          background: "#0A0A0A",
          borderTop: "1px solid #2A2A2A",
          padding: "80px 6%",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* Decorative quote mark */}
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "120px",
              fontWeight: 700,
              color: "rgba(245,196,0,0.15)",
              lineHeight: 0.8,
              display: "block",
              marginBottom: "-20px",
              userSelect: "none",
            }}
          >
            &ldquo;
          </span>

          {/* Quote text */}
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(20px, 2.5vw, 28px)",
              fontWeight: 500,
              color: "#FFFFFF",
              lineHeight: 1.6,
              fontStyle: "italic",
              margin: 0,
            }}
          >
            I built this business on doing things right. Fair pricing, no
            shortcuts, and treating every home like it&apos;s my own. That&apos;s
            not a slogan — that&apos;s how I work.
          </p>

          {/* Yellow line */}
          <div
            style={{
              width: "40px",
              height: "2px",
              background: "#F5C400",
              margin: "24px auto 16px",
            }}
          />

          {/* Attribution */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              fontWeight: 500,
              color: "#A0A0A0",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            — Roshan, Founder &amp; Certified Technician
            <br />
            Brightside Plumbing and Heating
          </p>
        </div>
      </div>
    </section>
  );
}
