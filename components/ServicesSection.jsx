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
    fullDesc: 'Backflow prevention is one of the most critical — and most overlooked — aspects of residential plumbing safety. If your home is connected to an irrigation system, a swimming pool fill line, a boiler, or any commercial-grade equipment, a certified backflow preventer is required by the City of Calgary to protect the municipal water supply from contamination. Roshan is Cross Connection Certified and handles every step of the process: initial assessment, device selection, professional installation, annual testing, and full compliance reporting filed directly with the city. He uses calibrated test kits and follows the latest CSA and municipal standards to ensure your device passes inspection the first time. Whether you need a new installation or your existing device is due for its annual test, the entire process is handled personally — no subcontractors, no shortcuts.',
    icon: 'ShieldCheck',
    image: '/images/services/backflow-device-testing.png',
    tag: 'Certified Service'
  },
  {
    id: '02',
    name: 'Drain Cleaning',
    shortDesc: 'Professional-grade equipment clears the problem at the source.',
    fullDesc: 'A slow drain is more than an inconvenience — it\'s often the first sign of a deeper blockage that will only get worse with time. Roshan uses professional-grade drain cleaning equipment to clear the problem at its source, not just push it further down the line. Kitchen drains clogged with grease and food buildup, bathroom drains blocked by hair and soap residue, basement floor drains backed up from sediment — he\'s cleared thousands of them across Calgary. The process starts with a thorough assessment to identify the type and location of the blockage. From there, Roshan selects the right approach: mechanical snaking for solid obstructions, high-pressure water jetting for grease-lined pipes, or camera inspection for persistent or recurring issues. Every drain is tested for proper flow before the job is considered complete, and he\'ll walk you through what caused the problem so you can prevent it from happening again.',
    icon: 'Waves',
    image: '/images/services/drain-cleaning.webp',
    tag: 'Fast Response'
  },
  {
    id: '03',
    name: 'Sewer & Water Line Replacements',
    shortDesc: 'Full replacements with minimal disruption. Honest assessment.',
    fullDesc: 'Sewer and water main line failures are among the most serious plumbing issues a homeowner can face — and unfortunately, they\'re also among the most commonly misdiagnosed and overcharged. Roshan takes a different approach. Every assessment starts with an honest evaluation of the actual condition of your lines, often using camera inspection to confirm the problem before recommending any excavation. When replacement is genuinely needed, he handles the full scope of work: careful excavation, removal of the damaged line, installation of new high-quality piping rated for Calgary\'s freeze-thaw cycles, proper bedding and backfill, and restoration of the disturbed area. Roshan coordinates with the City of Calgary for any required permits and inspections, and he keeps you informed at every stage. The goal is always minimal disruption to your property and maximum longevity of the new installation. No unnecessary digging, no inflated quotes — just the work that actually needs to be done.',
    icon: 'GitMerge',
    image: '/images/services/sewer-water-line-replacement.png',
    tag: 'Major Works'
  },
  {
    id: '04',
    name: 'Water Leaks',
    shortDesc: 'Rapid diagnosis before small leaks become costly disasters.',
    fullDesc: 'Water leaks are deceptive — a small drip behind a wall or under a cabinet can quietly cause thousands of dollars in structural damage, mold growth, and elevated water bills before you even notice it. Roshan provides rapid, accurate leak diagnosis using a combination of visual inspection, pressure testing, and moisture detection to pinpoint the exact source. Once located, the repair is performed immediately using quality fittings and materials rated for long-term durability. He handles everything from pinhole pipe leaks and corroded joint failures to supply line ruptures and hidden leaks behind drywall or beneath flooring. If water damage has already occurred, Roshan will advise on the extent and recommend next steps for remediation. Emergency service is available evenings, weekends, and holidays — because leaks don\'t wait for business hours. Every repair is pressure-tested before completion to ensure the fix holds.',
    icon: 'Droplets',
    image: '/images/services/water-leaks.png',
    tag: 'Emergency Available'
  },
  {
    id: '05',
    name: 'Toilet Trouble',
    shortDesc: 'Fast diagnosis and repair. Full replacement also available.',
    fullDesc: 'A malfunctioning toilet is one of the most disruptive problems in any home — and one of the most common calls Roshan receives. Whether it\'s running continuously and driving up your water bill, leaking at the base and damaging your flooring, failing to flush properly, or completely clogged beyond what a plunger can handle, Roshan diagnoses the root cause quickly and fixes it right the first time. Common repairs include flapper and fill valve replacement, wax ring seals, flush mechanism rebuilds, and clearing deep obstructions that household tools can\'t reach. If your toilet is old, cracked, or beyond economical repair, Roshan also handles full toilet replacement and installation — including removal of the old unit, inspection of the flange and drain connection, and installation of your new fixture with a fresh wax seal and supply line. Every job is done cleanly, tested thoroughly, and the work area is left spotless.',
    icon: 'AlertCircle',
    image: '/images/services/toilet.webp',
    tag: 'Quick Fix'
  },
  {
    id: '06',
    name: 'Garburators',
    shortDesc: 'Properly connected and fully tested before leaving your home.',
    fullDesc: 'Garburator issues range from simple jams to complete motor failure, and improper installation is one of the most common causes of kitchen drain problems. Roshan installs, repairs, and replaces garburators from all major brands, ensuring proper electrical connection, secure mounting to your sink flange, and correct alignment with your drain and dishwasher discharge line. Every installation includes a full leak test under pressure and operational testing to confirm the unit runs smoothly without vibration or noise. If your existing garburator is jammed, leaking from the bottom, or making grinding noises, Roshan will assess whether a repair or replacement makes more economic sense — and give you an honest recommendation either way. He also handles upgrades from older, underpowered units to newer, quieter models with better grinding capacity. The entire process is typically completed in a single visit.',
    icon: 'Settings',
    image: '/images/services/garburators.png',
    tag: 'Installation'
  },
  {
    id: '07',
    name: 'Sinks & Faucets',
    shortDesc: 'Faucet upgrades, bidet installation, fixture work done right.',
    fullDesc: 'Fixture work requires precision — a poorly installed faucet or sink will leak, corrode, and create problems that cost far more to fix down the road. Roshan handles every type of sink and faucet job with the care and attention it deserves. Whether it\'s replacing a dripping kitchen faucet, installing a new undermount bathroom sink, upgrading to a touchless faucet, or adding a bidet attachment to an existing toilet, every installation is done to manufacturer specifications with proper supply line connections, drain assembly, and silicone sealing. He works with fixtures you\'ve already purchased or can recommend quality options that fit your budget and style. For older homes with non-standard plumbing, Roshan has the experience to adapt connections without cutting corners. Every installation is pressure-tested and inspected for leaks before the job is signed off. Cleanup is thorough — you\'ll never know he was there except for the new fixture.',
    icon: 'Droplet',
    image: '/images/services/sinks-faucets.png',
    tag: 'Installation'
  },
  {
    id: '08',
    name: 'Washing Machine Hook-Ups',
    shortDesc: 'All connections done safely and to code.',
    fullDesc: 'Installing a new washing machine or relocating your laundry setup to a different part of your home requires more than just plugging in hoses — it requires properly rated supply lines, correct drain routing, functioning shut-off valves, and connections that meet current building code. Roshan handles the complete hook-up process: installation of braided stainless steel supply lines for both hot and cold water, proper drain hose routing with the correct standpipe height and air gap to prevent backflow, and installation or replacement of quarter-turn shut-off valves for easy emergency access. If you\'re moving your laundry to a new location, he can extend or reroute water supply and drain lines as needed. Every connection is pressure-tested and inspected for leaks before he leaves. Roshan also checks your existing plumbing to ensure it can handle the flow demands of your new machine — especially important when upgrading to high-efficiency or commercial-grade washers.',
    icon: 'Wind',
    image: '/images/services/washing-machine.jpg',
    tag: 'Installation'
  },
  {
    id: '09',
    name: 'Furnace Repair & Heating',
    shortDesc: 'Class A Gasfitter. Often repaired same day.',
    fullDesc: 'When your furnace fails in a Calgary winter, every hour matters. Roshan is a Class A Gasfitter Journeyman with over two decades of experience diagnosing and repairing residential heating systems — and he understands the urgency. From ignition failures and faulty flame sensors to cracked heat exchangers, malfunctioning gas valves, blower motor issues, and thermocouple replacements, Roshan has seen and fixed it all. He carries common replacement parts in his service vehicle, which means many repairs are completed the same day — no waiting for parts to be ordered, no second visits. Every repair includes a full system safety check: gas pressure testing, combustion analysis, flue inspection, and carbon monoxide testing to ensure your furnace is not only working but operating safely. If your furnace is beyond repair, Roshan will give you an honest assessment and can handle full furnace replacement including all gas line connections, venting, and thermostat integration.',
    icon: 'Flame',
    image: '/images/services/furnace.webp',
    tag: 'Emergency Available'
  },
  {
    id: '10',
    name: 'Thermostat Installation',
    shortDesc: 'Smart thermostat upgrades including smart home models.',
    fullDesc: 'A properly installed thermostat is the command center of your home\'s heating and cooling system — and upgrading to a modern smart thermostat can significantly reduce your energy bills while improving comfort. Roshan handles all thermostat installations, from basic programmable models to advanced smart home systems including Google Nest, Ecobee, and Honeywell Home. The installation process includes safe removal of your old unit, inspection of existing wiring to confirm compatibility, installation of any required C-wire or adapter kits, mounting and leveling the new thermostat, and full configuration of schedules, temperature settings, and Wi-Fi connectivity. Roshan tests the complete heating and cooling cycle after installation to confirm the thermostat is communicating correctly with your furnace and air conditioning system. If your home has a multi-zone system or requires additional wiring, he has the expertise to handle the added complexity. You\'ll walk away with a fully functional, properly calibrated thermostat — and Roshan will make sure you know how to use it.',
    icon: 'Thermometer',
    image: '/images/services/thermostat-installation.png',
    tag: 'Smart Home'
  },
  {
    id: '11',
    name: 'Hot Water Tank Installation & Repair',
    shortDesc: 'Conventional and tankless from all major brands.',
    fullDesc: 'Losing hot water is never convenient, and in Calgary\'s climate it can be a genuine emergency. Roshan installs, repairs, and replaces hot water tanks from all major manufacturers — both conventional tank-style and modern tankless on-demand systems. For repairs, he diagnoses the issue quickly: whether it\'s a failed heating element, a faulty thermostat, sediment buildup reducing efficiency, a leaking pressure relief valve, or a tank that\'s reached the end of its lifespan. When replacement is needed, Roshan handles the full process: safe disconnection and removal of the old unit, installation of the new tank with all required gas or electrical connections, water supply hookups, proper venting for gas models, expansion tank installation where required by code, and a complete system test including temperature calibration and leak inspection. He\'ll help you choose the right size and type for your household\'s hot water demand. Fast turnaround is guaranteed — most replacements are completed within a single visit so your family isn\'t left without hot water overnight.',
    icon: 'Zap',
    image: '/images/services/hot-water-tank.jpeg',
    tag: 'Fast Turnaround'
  },
  {
    id: '12',
    name: 'Troubleshooting & General Plumbing',
    shortDesc: '20+ years means he\'s seen and solved everything.',
    fullDesc: 'Not every plumbing problem comes with an obvious diagnosis — and that\'s exactly where Roshan\'s 20+ years of hands-on experience become your greatest asset. Strange banging noises in your pipes? It could be water hammer, thermal expansion, or loose mounting straps. Low water pressure throughout the house? The cause might be a partially closed main valve, corroded galvanized pipes, a failing pressure regulator, or even a municipal supply issue. Roshan approaches every troubleshooting call methodically: he listens to your description of the problem, performs a systematic inspection of the relevant systems, and uses diagnostic tools including pressure gauges, camera inspection, and leak detection equipment to pinpoint the root cause. From there, he explains what he\'s found in plain language and gives you a clear, honest recommendation for repair. He also performs whole-home plumbing inspections for homebuyers, renovation planning, and preventive maintenance — identifying potential problems before they become expensive emergencies. No job is too unusual and no question is too small.',
    icon: 'Wrench',
    image: '/images/services/general-troubleshooting.png',
    tag: 'General Service'
  }
]

/* ─────────────────────────────── */
/* MAIN SECTION COMPONENT          */
/* ─────────────────────────────── */
export default function ServicesSection() {
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
    <section id="services" style={{ background: '#0A0A0A' }}>

      {/* ── SECTION HEADER ── */}
      <div style={{
        padding: '80px 6% 60px',
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
        <h2 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(40px, 5vw, 72px)',
          color: '#FFFFFF',
          lineHeight: 1.05,
          marginBottom: 20,
          maxWidth: 900
        }}>
          Full-Service Plumbing, Gas Fitting & Heating.
        </h2>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 17, color: '#A0A0A0',
          lineHeight: 1.75, maxWidth: 560
        }}>
          Every service performed personally by Roshan — a Red Seal Plumber
          and Class A Gasfitter with over 20 years of experience in Calgary homes.
          Click any service to learn more.
        </p>
      </div>

      {/* ── SERVICES GRID ── */}
      <div style={{ padding: '60px 6% 80px' }}>
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
      </div>

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
              className="services-expanded-card"
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
              <div className="services-expanded-image" style={{
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
              <div className="services-expanded-content" style={{
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

    </section>
  )
}
