import { useState, useEffect, useRef } from 'react'


export const ADOBE: Record<string, { color: string; bg: string }> = {
  Pr: { color: '#9999FF', bg: '#9999FF15' },
  Ae: { color: '#9BB4FF', bg: '#9BB4FF15' },
  Ps: { color: '#31A8FF', bg: '#31A8FF15' },
  Lr: { color: '#31C5F0', bg: '#31C5F015' },
  Ai: { color: '#FF9A00', bg: '#FF9A0015' },
}

export const SERVICES = [
  { id: 1, title: 'Digital Marketing', description: 'Data-driven campaigns that amplify your brand across every digital channel — turning scrollers into loyal customers.', tools: ['Pr', 'Ae', 'Ps', 'Ai'], accent: '#7c3aed' },
  { id: 2, title: 'Wedding Films', description: 'Cinematic wedding films and photography that preserve every emotion — your love story told beautifully, forever.', tools: ['Pr', 'Lr', 'Ps'], accent: '#a855f7' },
  { id: 3, title: 'Content Creation', description: 'Scroll-stopping short-form videos, reels, and social content engineered for engagement and brand growth.', tools: ['Pr', 'Ae', 'Ps', 'Ai'], accent: '#6d28d9' },
  { id: 4, title: 'School Events', description: 'Full-scale event coverage from graduations to competitions — capturing every milestone with precision and energy.', tools: ['Pr', 'Ae', 'Lr'], accent: '#7c3aed' },
  { id: 5, title: 'Modeling Shoots', description: 'Professional modeling shoots with cinematic direction — portfolios and brand imagery that command attention.', tools: ['Ps', 'Lr', 'Ae', 'Ai'], accent: '#8b5cf6' },
  { id: 6, title: 'Photography', description: 'From portraits to product shots — our lenses capture light, emotion, and story in every single frame.', tools: ['Ps', 'Lr', 'Ai'], accent: '#7c3aed' },
]

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

export function AdobeIcon({ short }: { short: string }) {
  const { color, bg } = ADOBE[short] ?? { color: '#fff', bg: '#ffffff10' }
  return (
    <div
      title={short}
      style={{
        width: '40px', height: '40px', borderRadius: '8px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '12px', fontWeight: 900, userSelect: 'none',
        background: bg, border: `1px solid ${color}40`, color,
        fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.02em',
      }}
    >
      {short}
    </div>
  )
}

export function ServiceCard({ services, index }: { services: typeof SERVICES; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { ref: wrapRef, visible } = useInView()
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const accent = services[0].accent

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    setTilt({ x: ((e.clientY - top) / height - 0.5) * -12, y: ((e.clientX - left) / width - 0.5) * 12 })
  }

  return (
    <div
      ref={(node) => { (wrapRef as React.MutableRefObject<HTMLDivElement | null>).current = node }}
      style={{
        perspective: '900px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(48px)',
        transition: `opacity 0.6s ease ${index * 120}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms`,
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false) }}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? 'scale(1.015)' : 'scale(1)'}`,
          transition: hovered ? 'transform 0.1s ease' : 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
          borderRadius: '24px',
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: `1px solid ${hovered ? accent + '55' : 'rgba(255,255,255,0.09)'}`,
          boxShadow: hovered ? `0 32px 80px ${accent}22, inset 0 1px 0 rgba(255,255,255,0.13)` : '0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
          overflow: 'hidden', position: 'relative', cursor: 'default',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: '24px', background: `radial-gradient(ellipse at ${50 + tilt.y * 3}% ${50 + tilt.x * -3}%, rgba(255,255,255,0.06) 0%, transparent 65%)`, transition: 'background 0.1s ease' }} />
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '260px', height: '260px', borderRadius: '50%', pointerEvents: 'none', background: `radial-gradient(circle, ${accent}28 0%, transparent 70%)`, opacity: hovered ? 1 : 0.35, transition: 'opacity 0.4s ease' }} />
        <div style={{ height: '2px', background: `linear-gradient(90deg, transparent, ${accent}, #c4b5fd, transparent)`, opacity: hovered ? 1 : 0.25, transition: 'opacity 0.4s ease' }} />

        <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {services.map((svc, i) => (
            <div key={svc.id}>
              {i > 0 && <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', margin: '24px 0' }} />}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0, background: `linear-gradient(135deg, ${svc.accent}, #c4b5fd)` }} />
                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.15rem', color: '#fff', margin: 0 }}>{svc.title}</h3>
                </div>
                <p style={{ fontSize: '0.85rem', lineHeight: '1.6', color: '#9ca3af', margin: 0, paddingLeft: '18px' }}>{svc.description}</p>
                <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', paddingLeft: '18px' }}>
                  {svc.tools.map((t) => <AdobeIcon key={`${svc.id}-${t}`} short={t} />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
