'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShieldCheck, Waves, GitMerge, Droplets, AlertCircle,
  Settings, Droplet, Wind, Flame, Thermometer, Zap,
  Wrench, X, Phone, ArrowRight
} from 'lucide-react'

/* ─────────────────────────────── */
/* ICON MAP                        */
/* ─────────────────────────────── */
const iconMap = {
  ShieldCheck, Waves, GitMerge, Droplets, AlertCircle,
  Settings, Droplet, Wind, Flame, Thermometer, Zap, Wrench
}

/* ─────────────────────────────── */
/* SERVICE DATA                    */
/* ─────────────────────────────── */
const services = [
  {
    id: '01',
    name: 'Backflow Device Testing & Installation',
    shortDesc: 'Cross Connection Certified. City of Calgary compliance reporting.',
    fullDesc: 'Protect your home\'s water supply from contamination. Roshan is Cross Connection Certified and handles all backflow preventer testing, installation, and compliance reporting to City of Calgary standards. Backflow prevention is critical for any home connected to irrigation systems, pools, or commercial equipment.',
    icon: 'ShieldCheck',
    image: '/images/services/backflow-device-testing.png',
    tag: 'Certified Service'
  },
  {
    id: '02',
    name: 'Drain Cleaning',
    shortDesc: 'Professional-grade equipment clears the problem at the source.',
    fullDesc: 'Slow drains, complete blockages, or recurring backups — Roshan clears the problem at the source, not just the symptom. Using professional-grade equipment for kitchen drains, bathroom drains, floor drains, and more. Whether it\'s grease buildup, hair, foreign objects, or root intrusion — the problem gets solved permanently.',
    icon: 'Waves',
    image: '/images/services/drain-cleaning.webp',
    tag: 'Fast Response'
  },
  {
    id: '03',
    name: 'Sewer & Water Line Replacements',
    shortDesc: 'Full replacements with minimal disruption. Honest assessment.',
    fullDesc: 'When repair isn\'t enough, Roshan handles full sewer and water main line replacements with minimal disruption to your property. Every assessment is honest — no unnecessary excavation, no upselling. You\'ll know exactly what needs to be done and why before any work begins.',
    icon: 'GitMerge',
    image: '/images/services/sewer-water-line-replacement.png',
    tag: 'Major Works'
  },
  {
    id: '04',
    name: 'Water Leaks',
    shortDesc: 'Rapid diagnosis before small leaks become costly disasters.',
    fullDesc: 'A small leak can become a costly disaster within hours. Roshan provides rapid diagnosis and reliable repair for pipe leaks, joint failures, hidden leaks behind walls, and water damage prevention. Available for emergency calls including evenings, weekends, and holidays.',
    icon: 'Droplets',
    image: '/images/services/water-leaks.png',
    tag: 'Emergency Available'
  },
  {
    id: '05',
    name: 'Toilet Trouble',
    shortDesc: 'Fast diagnosis and repair. Full replacement also available.',
    fullDesc: 'Running, leaking, clogged, or not flushing properly — Roshan diagnoses and repairs all toilet issues quickly and affordably. Full replacement and installation also available. Every job is done cleanly with no mess left behind.',
    icon: 'AlertCircle',
    image: '/images/services/toilet.webp',
    tag: 'Quick Fix'
  },
  {
    id: '06',
    name: 'Garburators',
    shortDesc: 'Properly connected and fully tested before leaving your home.',
    fullDesc: 'Installation, repair, and replacement of kitchen garburators. Roshan ensures proper connection to your drain system and fully tests the unit before leaving your home. Includes all plumbing connections and leak testing under pressure.',
    icon: 'Settings',
    image: '/images/services/garburators.png',
    tag: 'Installation'
  },
  {
    id: '07',
    name: 'Sinks & Faucets',
    shortDesc: 'Faucet upgrades, bidet installation, fixture work done right.',
    fullDesc: 'From a dripping faucet to a full kitchen or bathroom sink installation — Roshan handles all fixture work with care and precision. Faucet upgrades, bidet installation, undermount sink replacement, and more. Every installation is tested for leaks before the job is complete.',
    icon: 'Droplet',
    image: '/images/services/sinks-faucets.png',
    tag: 'Installation'
  },
  {
    id: '08',
    name: 'Washing Machine Hook-Ups',
    shortDesc: 'All connections done safely and to code.',
    fullDesc: 'New washer installation or moving your laundry setup? Roshan handles all supply line and drain connections safely and to code. This includes hot and cold supply lines, drain hose routing, valve installation, and a full pressure test to ensure everything is sealed correctly.',
    icon: 'Wind',
    image: '/images/services/washing-machine.jpg',
    tag: 'Installation'
  },
  {
    id: '09',
    name: 'Furnace Repair & Heating',
    shortDesc: 'Class A Gasfitter. Often repaired same day.',
    fullDesc: 'Calgary winters are no time for a furnace failure. Roshan is a Class A Gasfitter Journeyman who diagnoses and repairs furnace issues fast — often same day. From ignition failures to heat exchanger issues, gas valve problems to pilot light failures. Your family stays warm.',
    icon: 'Flame',
    image: '/images/services/furnace.webp',
    tag: 'Emergency Available'
  },
  {
    id: '10',
    name: 'Thermostat Installation',
    shortDesc: 'Smart thermostat upgrades including smart home models.',
    fullDesc: 'Upgrade to a smart thermostat or replace a faulty unit. Roshan handles all thermostat wiring and configuration, including smart home compatible models like Nest, Ecobee, and Honeywell. Full testing and setup included.',
    icon: 'Thermometer',
    image: '/images/services/thermostat-installation.png',
    tag: 'Smart Home'
  },
  {
    id: '11',
    name: 'Hot Water Tank Installation & Repair',
    shortDesc: 'Conventional and tankless from all major brands.',
    fullDesc: 'No hot water is never acceptable. Roshan installs, repairs, and replaces hot water tanks from all major brands — conventional and tankless. Fast turnaround guaranteed. Includes all gas line connections, water supply hookups, and full system testing.',
    icon: 'Zap',
    image: '/images/services/hot-water-tank.jpeg',
    tag: 'Fast Turnaround'
  },
  {
    id: '12',
    name: 'Troubleshooting & General Plumbing',
    shortDesc: '20+ years means he\'s seen and solved everything.',
    fullDesc: 'Not sure what the problem is? That\'s fine. Roshan will diagnose it. With 20+ years of experience, he\'s seen — and solved — everything. From mysterious sounds in pipes to pressure problems, from failed shut-off valves to whole-home plumbing inspections.',
    icon: 'Wrench',
    image: '/images/services/general-troubleshooting.png',
    tag: 'General Service'
  }
]

/* ─────────────────────────────── */
/* MAIN PAGE COMPONENT             */
/* ─────────────────────────────── */
export default function ServicesPage() {
  const [selected, setSelected] = useState(null)

  // Lock body scroll when card is open
  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  // ESC key to close
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <main style={{ background: '#0A0A0A', minHeight: '100vh' }}>

      {/* ── PAGE HEADER ── */}
      <section style={{
        padding: '140px 6% 60px',
        borderBottom: '1px solid #2A2A2A'
      }}>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 11, color: '#F5C400',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          marginBottom: 16
        }}>
          WHAT WE OFFER
        </p>
        <h1 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(40px, 5vw, 72px)',
          color: '#FFFFFF',
          lineHeight: 1.05,
          marginBottom: 20,
          maxWidth: 700
        }}>
          Full-Service Plumbing,<br />
          Gas Fitting & Heating.
        </h1>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 17, color: '#A0A0A0',
          lineHeight: 1.75, maxWidth: 560
        }}>
          Every service performed personally by Roshan — a Red Seal Plumber
          and Class A Gasfitter with over 20 years of experience in Calgary homes.
          Click any service to learn more.
        </p>
      </section>

      {/* ── SERVICES GRID ── */}
      <section style={{ padding: '60px 6% 80px' }}>
        <div className="services-grid-inner" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          background: '#2A2A2A',
          border: '1px solid #2A2A2A',
          borderRadius: 12,
          overflow: 'hidden'
        }}>
          {services.map((service) => {
            const Icon = iconMap[service.icon]
            return (
              <motion.div
                key={service.id}
                layoutId={`card-container-${service.id}`}
                onClick={() => setSelected(service)}
                whileHover={{ backgroundColor: '#111111' }}
                style={{
                  background: '#0A0A0A',
                  padding: '40px 36px',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: 260,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Background image texture */}
                <img
                  src={service.image}
                  alt=""
                  aria-hidden
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    opacity: 0.06,
                    filter: 'grayscale(100%)',
                    pointerEvents: 'none'
                  }}
                />

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 11, color: '#333',
                    letterSpacing: '0.15em',
                    marginBottom: 20
                  }}>
                    {service.id}
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    {Icon && <Icon size={30} color="#F5C400" />}
                  </div>

                  <h3 style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700, fontSize: 18,
                    color: '#FFFFFF', marginBottom: 10, lineHeight: 1.3
                  }}>
                    {service.name}
                  </h3>

                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13, color: '#A0A0A0',
                    lineHeight: 1.65, flex: 1, marginBottom: 20
                  }}>
                    {service.shortDesc}
                  </p>

                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 12, color: '#F5C400', fontWeight: 500
                  }}>
                    Learn More <ArrowRight size={12} />
                  </div>
                </div>

                {/* Bottom accent line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.4 }}
                  style={{
                    position: 'absolute', bottom: 0, left: 0,
                    height: 2, background: '#F5C400'
                  }}
                />
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ── EXPANDED OVERLAY ── */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelected(null)}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.88)',
                backdropFilter: 'blur(6px)',
                zIndex: 998,
                cursor: 'pointer'
              }}
            />

            {/* Expanded Card */}
            <motion.div
              key={`expanded-${selected.id}`}
              layoutId={`card-container-${selected.id}`}
              style={{
                position: 'fixed',
                top: '3%', left: '3%',
                right: '3%', bottom: '3%',
                zIndex: 999,
                borderRadius: 16,
                overflow: 'hidden',
                background: '#0A0A0A',
                border: '1px solid #2A2A2A',
                display: 'flex',
                flexDirection: 'row'
              }}
              transition={{
                layout: {
                  type: 'spring',
                  stiffness: 280,
                  damping: 28
                }
              }}
            >
              {/* LEFT — Full Image */}
              <div style={{
                width: '45%',
                position: 'relative',
                overflow: 'hidden',
                flexShrink: 0
              }}>
                <motion.img
                  src={selected.image}
                  alt={selected.name}
                  initial={{ scale: 1.08, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover'
                  }}
                />
                {/* Fade to right */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to right, rgba(10,10,10,0) 50%, rgba(10,10,10,1) 100%)'
                }} />
                {/* Service tag badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  style={{
                    position: 'absolute', bottom: 28, left: 28,
                    background: 'rgba(245,196,0,0.15)',
                    border: '1px solid rgba(245,196,0,0.3)',
                    borderRadius: 20, padding: '6px 16px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500, fontSize: 12, color: '#F5C400',
                    backdropFilter: 'blur(8px)'
                  }}
                >
                  {selected.tag}
                </motion.div>
              </div>

              {/* RIGHT — Content */}
              <div style={{
                flex: 1,
                padding: '56px 48px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                {/* Icon + Number */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}
                >
                  {(() => { const Icon = iconMap[selected.icon]; return Icon ? <Icon size={40} color="#F5C400" /> : null })()}
                  <span style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 13, color: '#333', letterSpacing: '0.15em'
                  }}>
                    {selected.id} / 12
                  </span>
                </motion.div>

                {/* Service Name */}
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.5 }}
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: 'clamp(28px, 3vw, 46px)',
                    color: '#FFFFFF', lineHeight: 1.1, marginBottom: 24
                  }}
                >
                  {selected.name}
                </motion.h2>

                {/* Divider */}
                <motion.div
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                  style={{ height: 1, background: '#2A2A2A', marginBottom: 24 }}
                />

                {/* Full Description */}
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 16, color: '#A0A0A0',
                    lineHeight: 1.8, marginBottom: 36
                  }}
                >
                  {selected.fullDesc}
                </motion.p>

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.48, duration: 0.5 }}
                  style={{
                    display: 'flex', gap: 10,
                    flexWrap: 'wrap', marginBottom: 36
                  }}
                >
                  {[selected.tag, 'Personal Service', 'No Subcontractors'].map((tag) => (
                    <span key={tag} style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid #2A2A2A',
                      borderRadius: 20, padding: '6px 14px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500, fontSize: 12, color: '#A0A0A0'
                    }}>
                      {tag}
                    </span>
                  ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.5 }}
                >
                  <motion.a
                    href="tel:+14037969658"
                    whileHover={{ scale: 1.04, backgroundColor: '#D4A800' }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 10,
                      background: '#F5C400', color: '#0A0A0A',
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontWeight: 700, fontSize: 14,
                      padding: '14px 28px', borderRadius: 4,
                      textDecoration: 'none', marginBottom: 12
                    }}
                  >
                    <Phone size={16} /> Call Now — (403) 796-9658
                  </motion.a>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 12, color: '#333', marginTop: 8
                  }}>
                    Press Esc or click outside to close
                  </p>
                </motion.div>
              </div>

              {/* CLOSE BUTTON */}
              <motion.button
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: 'rgba(245,196,0,0.15)',
                  borderColor: '#F5C400'
                }}
                onClick={() => setSelected(null)}
                style={{
                  position: 'absolute', top: 20, right: 20,
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid #2A2A2A',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', cursor: 'pointer',
                  zIndex: 10
                }}
              >
                <X size={18} color="#FFFFFF" />
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </main>
  )
}
