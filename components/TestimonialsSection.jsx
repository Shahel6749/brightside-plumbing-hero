"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════ */
/* TESTIMONIAL DATA                                       */
/* ═══════════════════════════════════════════════════════ */
const testimonials = [
  {
    id: 1,
    quote:
      "When our furnace stopped working in the cold winter month, Roshan came to fix our furnace and had our house nice and toasty within the hour. Super grateful for his professional and speedy service. Highly recommend Brightside plumbing and heating.",
    name: "Moothy Shailen",
    credential: "Local Guide · 12 reviews",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "Roshan is extremely knowledgeable, professional and helpful. He provided us with excellent service and fixed our furnace in under an hour. Would definitely recommend his services!! Thank you Roshan",
    name: "Veronica Kriwokon",
    credential: "4 reviews",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "Excellent, Honest, Professional and Outstanding Service! I couldn't be happier with the work done by Roshan. He was professional, punctual, and very knowledgeable. He quickly diagnosed the issue and clearly explained everything.",
    name: "Imrana Visram",
    credential: "Local Guide · 38 reviews",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "I have worked with several heating and plumbing companies over 20 years of home ownership and Roshan has by far been the best person to work with. He is responsive and charges honestly and fairly for both the work done and the hours charged.",
    name: "Quentin and Michelle",
    credential: "Local Guide · 14 reviews",
    rating: 5,
  },
  {
    id: 5,
    quote:
      "When faced with a tricky plumbing issue that could have resulted in costly ceiling repairs, Roshan went above and beyond to find an alternative solution. I am beyond impressed with the service provided by Roshan at Brightside Plumbing and Heating!",
    name: "Karl Heinz",
    credential: "Local Guide · 9 reviews",
    rating: 5,
  },
  {
    id: 6,
    quote:
      "I needed emergency service for a major leak in my basement during the Christmas and New Year holidays. I called Brightside and was able to get a plumber on very short notice. The service was excellent and everything was fixed to my satisfaction.",
    name: "Ross L",
    credential: "3 reviews",
    rating: 5,
  },
  {
    id: 7,
    quote:
      "We have hired Roshan 3 times now and have been extremely impressed! Pleasant, professional, honest, very reasonably priced, and excellent at what he does. We very highly recommend him!",
    name: "Christine Krzyczkowski",
    credential: "6 reviews",
    rating: 5,
  },
  {
    id: 8,
    quote:
      "Roshan was fantastic to work with and really professional. He fixed all of our plumbing issues, and now everything runs smoothly. Would recommend!",
    name: "Danial Khan",
    credential: "Local Guide · 21 reviews",
    rating: 5,
  },
];

/* ═══════════════════════════════════════════════════════ */
/* COMPONENT                                              */
/* ═══════════════════════════════════════════════════════ */
export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const carouselRef = useRef(null);
  const ctaFooterRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);
  const userInteracted = useRef(false);

  /* How many cards visible at current breakpoint */
  const getVisibleCount = useCallback(() => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1200) return 2;
    return 3;
  }, []);

  /* Total "pages" in the carousel */
  const getMaxIndex = useCallback(() => {
    const visible = getVisibleCount();
    return Math.max(0, testimonials.length - visible);
  }, [getVisibleCount]);

  /* Scroll carousel to a given index */
  const scrollToIndex = useCallback(
    (index) => {
      const carousel = carouselRef.current;
      if (!carousel) return;
      const visible = getVisibleCount();
      const cardWidth = carousel.scrollWidth / testimonials.length;
      const target = cardWidth * index;

      gsap.to(carousel, {
        scrollLeft: target,
        duration: 0.8,
        ease: "power2.inOut",
      });
      setActiveIndex(index);
    },
    [getVisibleCount]
  );

  /* Auto-rotate */
  const startAutoRotate = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (userInteracted.current) return;
      setActiveIndex((prev) => {
        const maxIdx = getMaxIndex();
        const next = prev >= maxIdx ? 0 : prev + 1;
        const carousel = carouselRef.current;
        if (carousel) {
          const cardWidth = carousel.scrollWidth / testimonials.length;
          gsap.to(carousel, {
            scrollLeft: cardWidth * next,
            duration: 0.8,
            ease: "power2.inOut",
          });
        }
        return next;
      });
    }, 5000);
  }, [getMaxIndex]);

  /* Dot click */
  const handleDotClick = useCallback(
    (index) => {
      userInteracted.current = true;
      scrollToIndex(index);
      /* Resume auto after 10s idle */
      setTimeout(() => {
        userInteracted.current = false;
      }, 10000);
    },
    [scrollToIndex]
  );

  /* ─── GSAP ENTRANCE + AUTO-ROTATE ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Intro stagger */
      if (introRef.current) {
        const introChildren = introRef.current.querySelectorAll(".intro-anim");
        if (introChildren.length) {
          gsap.set(introChildren, { opacity: 0, y: 30 });
          ScrollTrigger.create({
            trigger: introRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => {
              gsap.to(introChildren, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.12,
                ease: "power3.out",
              });
            },
          });
        }
      }

      /* Card entrance stagger */
      const cards = carouselRef.current?.querySelectorAll(".testimonial-card");
      if (cards?.length) {
        gsap.set(cards, { opacity: 0, y: 40 });
        ScrollTrigger.create({
          trigger: carouselRef.current,
          start: "top 75%",
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power3.out",
              clearProps: "transform,opacity",
            });
          },
        });
      }

      /* CTA footer entrance */
      if (ctaFooterRef.current) {
        gsap.set(ctaFooterRef.current, { opacity: 0, y: 20 });
        ScrollTrigger.create({
          trigger: ctaFooterRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(ctaFooterRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            });
          },
        });
      }
    }, sectionRef);

    startAutoRotate();

    return () => {
      ctx.revert();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoRotate]);

  /* ─── RENDER ─── */
  return (
    <section
      id="testimonials"
      ref={sectionRef}
      style={{
        background: "#0A0A0A",
        borderTop: "1px solid #2A2A2A",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ═══════════════════════════════════════════ */}
      {/* SECTION INTRO                              */}
      {/* ═══════════════════════════════════════════ */}
      <div
        ref={introRef}
        style={{
          padding: "80px 6% 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "40px",
        }}
      >
        {/* Left column */}
        <div style={{ maxWidth: "500px" }}>
          <span
            className="intro-anim"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 500,
              color: "#F5C400",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              display: "block",
              marginBottom: "16px",
              opacity: 0,
            }}
          >
            What Calgary Is Saying
          </span>
          <h2
            className="intro-anim"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 4vw, 56px)",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.08,
              margin: 0,
              opacity: 0,
            }}
          >
            40 Five-Star Reviews.
            <br />
            Zero Exceptions.
          </h2>
        </div>

        {/* Right column — overall rating */}
        <div
          className="intro-anim"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "8px",
            opacity: 0,
          }}
        >
          {/* Stars */}
          <div style={{ display: "flex", gap: "4px" }}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={36}
                color="#F5C400"
                fill="#F5C400"
                strokeWidth={0}
              />
            ))}
          </div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "48px",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1,
            }}
          >
            5.0
            <span
              style={{
                fontSize: "24px",
                fontWeight: 500,
                color: "#A0A0A0",
                marginLeft: "4px",
              }}
            >
              / 5.0
            </span>
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              fontWeight: 500,
              color: "#A0A0A0",
            }}
          >
            40 Verified Google Reviews
          </span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* TESTIMONIALS CAROUSEL                      */}
      {/* ═══════════════════════════════════════════ */}
      <div
        ref={carouselRef}
        className="testimonials-carousel"
        style={{
          display: "flex",
          gap: "24px",
          overflowX: "hidden",
          padding: "40px 6%",
          scrollBehavior: "auto",
        }}
      >
        {testimonials.map((t) => (
          <motion.div
            key={t.id}
            className="testimonial-card"
            whileHover={{
              y: -8,
              boxShadow: "0 24px 80px rgba(245, 196, 0, 0.12)",
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              flex: "0 0 calc(33.333% - 16px)",
              minWidth: "300px",
              padding: "48px",
              background:
                "linear-gradient(135deg, rgba(26,26,26,0.9) 0%, rgba(10,10,10,0.95) 100%)",
              border: "1px solid #2A2A2A",
              borderRadius: "12px",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Decorative quote mark */}
            <span
              style={{
                position: "absolute",
                top: "16px",
                right: "24px",
                fontFamily: "var(--font-display)",
                fontSize: "64px",
                fontWeight: 700,
                color: "rgba(245,196,0,0.08)",
                lineHeight: 0.5,
                zIndex: 1,
                userSelect: "none",
              }}
            >
              &ldquo;
            </span>

            {/* Content */}
            <div style={{ position: "relative", zIndex: 10 }}>
              {/* Stars */}
              <motion.div
                style={{ display: "flex", gap: "4px", marginBottom: "16px" }}
                whileHover={{ scale: 1.15, rotate: 8 }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
              >
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    color="#F5C400"
                    fill="#F5C400"
                    strokeWidth={0}
                  />
                ))}
              </motion.div>

              {/* Quote */}
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "#FFFFFF",
                  lineHeight: 1.75,
                  margin: "0 0 24px",
                }}
              >
                {t.quote}
              </p>
            </div>

            {/* Reviewer info */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                position: "relative",
                zIndex: 10,
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #F5C400, #D4A800)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#0A0A0A",
                    textTransform: "uppercase",
                  }}
                >
                  {t.name.charAt(0)}
                </span>
              </div>

              {/* Name & credential */}
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    lineHeight: 1.3,
                  }}
                >
                  {t.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#A0A0A0",
                    marginTop: "2px",
                  }}
                >
                  {t.credential}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* CAROUSEL INDICATORS                        */}
      {/* ═══════════════════════════════════════════ */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          padding: "0 6% 40px",
        }}
      >
        {testimonials.map((_, i) => {
          const maxIdx = getMaxIndex();
          const isActive = i <= maxIdx && i === activeIndex;
          const isClickable = i <= maxIdx;

          return (
            <button
              key={i}
              onClick={() => isClickable && handleDotClick(i)}
              aria-label={`Go to review ${i + 1}`}
              style={{
                width: isActive ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: isActive
                  ? "#F5C400"
                  : isClickable
                  ? "#2A2A2A"
                  : "rgba(42,42,42,0.4)",
                border: "none",
                padding: 0,
                cursor: isClickable ? "pointer" : "default",
                transition: "background 0.3s ease, width 0.3s ease",
              }}
              onMouseEnter={(e) => {
                if (!isActive && isClickable) {
                  e.currentTarget.style.background = "#A0A0A0";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive && isClickable) {
                  e.currentTarget.style.background = "#2A2A2A";
                }
              }}
            />
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* CTA FOOTER                                 */}
      {/* ═══════════════════════════════════════════ */}
      <div
        ref={ctaFooterRef}
        style={{
          background: "#1A1A1A",
          borderTop: "1px solid #2A2A2A",
          padding: "48px 6%",
          textAlign: "center",
          opacity: 0,
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "24px",
            fontWeight: 700,
            color: "#FFFFFF",
            margin: "0 0 16px",
          }}
        >
          Want to Read All 40 Reviews?
        </h3>
        <motion.a
          href="https://www.google.com/maps/place/Brightside+Plumbing+and+Heating"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ color: "#D4A800", x: 4 }}
          transition={{ duration: 0.2 }}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            fontWeight: 500,
            color: "#F5C400",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          See All Reviews on Google
          <ArrowRight size={16} />
        </motion.a>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* RESPONSIVE CSS                             */}
      {/* ═══════════════════════════════════════════ */}
      <style jsx global>{`
        @media (max-width: 1199px) {
          .testimonials-carousel .testimonial-card {
            flex: 0 0 calc(50% - 12px) !important;
          }
        }
        @media (max-width: 767px) {
          .testimonials-carousel .testimonial-card {
            flex: 0 0 100% !important;
            min-width: unset !important;
            padding: 32px 20px !important;
          }
          .testimonials-carousel .testimonial-card .reviewer-avatar {
            width: 36px !important;
            height: 36px !important;
          }
        }
      `}</style>
    </section>
  );
}
