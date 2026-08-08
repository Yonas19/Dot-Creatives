import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router'
import logoImg from '@/imports/1-removebg-preview.png'
import heroBg from '@/imports/hero2__1___1_.mp4'
import aboutVid from '@/imports/1003__3_-copy-copy-1.mp4'
import bts1 from '@/imports/IMG_0285.PNG'
import bts2 from '@/imports/IMG_0286.PNG'
import bts3 from '@/imports/IMG_0287.PNG'
import bts4 from '@/imports/IMG_0288.PNG'
import spotlightImg from '@/imports/IMG_0292.JPG'
import { SERVICES, ServiceCard } from '@/shared'

const PREVIEW_VIDEOS = [
  { id: 'dm1',  src: '7496731421680176389', label: 'Digital Marketing',  title: 'VERO LOUNGE — Grand Opening' },
  { id: 'dm2',  src: '7617497044097322247', label: 'Digital Marketing',  title: 'Star Dental Clinic' },
  { id: 'wf1',  src: '7644792519728827656', label: 'Wedding Films',       title: 'DOT Films — Wedding' },
  { id: 'wf2',  src: '7644420136610385170', label: 'Wedding Films',       title: 'DOT Films — Wedding' },
  { id: 'bp1',  src: '7648901410188201224', label: 'Birthday Party',      title: 'Birthday Celebration' },
  { id: 'bp2',  src: '7642583255308307719', label: 'Birthday Party',      title: 'Birthday Celebration' },
  { id: 'se1',  src: '7504161487066238214', label: 'School Event',        title: 'Sheba 25 Seniors' },
  { id: 'se2',  src: '7533135291566050565', label: 'School Event',        title: 'Sheba 25 Seniors' },
  { id: 'ms1',  src: '7670778321734552839', label: 'Modeling Shoots',     title: 'DOT Films — Modeling' },
  { id: 'ms2',  src: '7670043325566602503', label: 'Modeling Shoots',     title: 'DOT Films — Modeling' },
]

function PreviewCard({ src, label, title }: { src: string; label: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [thumb, setThumb] = useState<string | null>(null)
  const [playing, setPlaying] = useState(false)
  const requested = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !requested.current) {
        requested.current = true
        obs.disconnect()
        fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(`https://www.tiktok.com/@tiktok/video/${src}`)}`)
          .then(r => r.ok ? r.json() : null)
          .then(data => { if (data?.thumbnail_url) setThumb(data.thumbnail_url) })
          .catch(() => {})
      }
    }, { rootMargin: '200px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [src])

  return (
    <div ref={ref} style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', background: '#111', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '9/16' }}>
        {playing ? (
          <iframe
            src={`https://www.tiktok.com/player/v1/${src}?autoplay=1&loop=1&controls=1`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen scrolling="no"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', display: 'block' }}
            title={title}
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${title}`}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', padding: 0, border: 'none', cursor: 'pointer', background: thumb ? `#111 url(${thumb}) center/cover no-repeat` : '#111', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
          >
            <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.1))' }} />
            <span style={{ position: 'relative', width: 52, height: 52, borderRadius: '50%', background: 'rgba(124,58,237,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(124,58,237,0.5)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="6 4 20 12 6 20 6 4" /></svg>
            </span>
            <span style={{ position: 'relative', fontSize: '11px', fontWeight: 600, color: '#fff', letterSpacing: '0.04em' }}>Play</span>
          </button>
        )}
      </div>
      <div style={{ padding: '14px 16px' }}>
        <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7c3aed', display: 'block', marginBottom: '4px' }}>{label}</span>
        <span style={{ fontSize: '13px', fontWeight: 500, color: '#e5e7eb', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</span>
      </div>
    </div>
  )
}

const TEAM = [
  { img: bts1, label: 'On location — restaurant shoot' },
  { img: bts2, label: 'BTS — Bella Dental campaign' },
  { img: bts3, label: 'Food styling — eatery feature' },
  { img: bts4, label: 'Rain or shine — cafe set' },
]

export default function Home() {
  return (
    <>
      <div className="relative" style={{ zIndex: 1 }}>
      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#0a0a0a' }}>
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }}>
          <source src={heroBg} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ zIndex: 1, background: 'linear-gradient(to right, rgba(0,0,0,0.80) 40%, rgba(0,0,0,0.35) 100%)' }} />
        <div className="absolute inset-0" style={{ zIndex: 1, background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, transparent 55%)' }} />
        <div className="absolute inset-0" style={{ zIndex: 1, backgroundImage: 'radial-gradient(at 10% 30%, rgba(124, 58, 237, 0.15) 0%, rgba(0, 0, 0, 0) 60%)' }} />

        <div className="relative w-full max-w-7xl mx-auto px-6 pt-24 pb-16" style={{ zIndex: 2 }}>
          <div className="max-w-2xl">
            <img src={logoImg} alt="DOT CREATIVE" className="w-auto" style={{ height: 'clamp(240px, 44vw, 480px)', marginTop: '0px', marginRight: '-15px', marginLeft: '-5px', marginBottom: '-31px' }} />
            <p className="text-lg md:text-2xl leading-relaxed mb-8 font-light" style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'Poppins, sans-serif' }}>
              We bring your vision to life through{' '}
              <span style={{ color: '#c4b5fd', fontWeight: 500 }}>stunning visuals</span> and{' '}
              <span style={{ color: '#c4b5fd', fontWeight: 500 }}>digital storytelling</span> that moves people.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#service" className="px-8 py-3.5 rounded-full font-semibold text-sm" style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)', color: '#fff', boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}>
                Our Services
              </a>
              <Link to="/projects" className="px-8 py-3.5 rounded-full font-semibold text-sm" style={{ border: '1px solid rgba(196,181,253,0.5)', color: '#c4b5fd' }}>
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-12" style={{ background: 'rgba(10,10,10,0.55)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: '#7c3aed' }}>About Us</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                We Are <span className="text-gradient">DOT CREATIVE</span>
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: '#9ca3af' }}>
                We curate cinematic masterworks, immersive event chronicles, and evocative brand narratives. By harmonizing technical mastery with creative intuition, we forge unparalleled visual experiences.
              </p>
              <div className="flex items-center gap-4 mt-2">
                <a href="https://www.tiktok.com/@dotfilms?is_from_webapp=1&sender_device=pc" target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }} aria-label="TikTok">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.35 6.35 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z"/></svg>
                </a>
                <a href="https://www.instagram.com/dot_film_production?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }} aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#ffffff" stroke="none"/></svg>
                </a>
              </div>
            </div>
            <div className="relative">
              <video autoPlay muted loop playsInline className="w-full rounded-2xl object-cover" style={{ height: '400px', border: '1px solid rgba(255,255,255,0.08)', display: 'block' }}>
                <source src={aboutVid} type="video/mp4" />
              </video>
              <div className="absolute -bottom-4 -left-4 px-5 py-4 rounded-xl" style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}>
                <div className="text-2xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>3+</div>
                <div className="text-xs opacity-90">Years of Excellence</div>
              </div>
              <div className="absolute -top-4 -right-4 px-5 py-4 rounded-xl" style={{ background: '#1a1a1a', border: '1px solid rgba(196,181,253,0.2)' }}>
                <div className="text-2xl font-bold text-gradient" style={{ fontFamily: 'Poppins, sans-serif' }}>200+</div>
                <div className="text-xs" style={{ color: '#9ca3af' }}>Projects Completed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="service" className="py-12" style={{ background: 'rgba(10,10,10,0.68)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl mb-4 bubble-text">
              Our Services
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ perspective: '1200px' }}>
            <ServiceCard services={SERVICES.slice(0, 3)} index={0} />
            <ServiceCard services={SERVICES.slice(3, 6)} index={1} />
          </div>
        </div>
      </section>

      {/* ── OUR PROJECTS PREVIEW ── */}
      <section className="py-12" style={{ background: 'rgba(15,15,15,0.72)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#7c3aed', display: 'block', marginBottom: '12px' }}>Our Work</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '1rem', maxWidth: '480px', margin: '0 auto' }}>
              A glimpse across every category we cover — from weddings to brand campaigns.
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-5" style={{ gap: '12px', alignItems: 'start' }}>
            {PREVIEW_VIDEOS.map(v => (
              <PreviewCard key={v.id} src={v.src} label={v.label} title={v.title} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link
              to="/projects"
              style={{ display: 'inline-block', padding: '14px 40px', borderRadius: '999px', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '15px', background: 'linear-gradient(135deg, #7c3aed, #a78bfa)', color: '#fff', boxShadow: '0 0 32px rgba(124,58,237,0.4)', textDecoration: 'none', letterSpacing: '0.02em' }}
            >
              All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* ── SPOTLIGHT ── */}
      <section className="py-12" style={{ background: 'rgba(10,10,10,0.55)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6 md:gap-14 items-center">
            <div className="relative" style={{ perspective: '1400px' }}>
              <div
                className="relative overflow-hidden transition-transform duration-500 hover:-translate-y-2"
                style={{
                  clipPath: 'polygon(0 6%, 90% 0, 100% 92%, 8% 100%)',
                  borderRadius: '28px 60px 28px 60px',
                  transform: 'rotate(-2.5deg)',
                  boxShadow: '0 30px 80px rgba(124,58,237,0.28)',
                }}
              >
                <img src={spotlightImg} alt="DOT Creative filming a wedding celebration" className="w-full object-cover" style={{ height: 'clamp(200px, 40vw, 520px)', display: 'block' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.55) 0%, transparent 45%)' }} />
              </div>
              <div
                className="absolute -z-10"
                style={{ inset: '-18px', borderRadius: '32px 70px 32px 70px', border: '1px solid rgba(196,181,253,0.25)', transform: 'rotate(-2.5deg)' }}
              />
            </div>

            <div>
              <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: '#7c3aed' }}>Spotlight</span>
              <h2 className="text-xl md:text-5xl font-bold mb-3 md:mb-6 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Moments That <span className="text-gradient">Last Forever</span>
              </h2>
              <p className="text-xs md:text-base leading-relaxed mb-4 md:mb-6 hidden md:block" style={{ color: '#9ca3af' }}>
                From the first dance to the quiet glances in between, we capture weddings the way they feel — cinematic, intimate, and alive. Every frame is lit, framed, and edited to keep the emotion of the day long after the celebration ends.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Wedding Films', 'Live Event Coverage', 'Cinematic Editing'].map(tag => (
                  <span key={tag} className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(196,181,253,0.2)', color: '#c4b5fd' }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM / BTS ── */}
      <section id="team" className="py-12" style={{ background: 'rgba(15,15,15,0.72)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: '#7c3aed' }}>Behind The Scenes</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Meet The <span className="text-gradient">Team</span>
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: '#9ca3af' }}>
              The people behind the lens — passionate creators who live for authentic storytelling.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map((member, i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl group" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                <img src={member.img} alt={member.label} className="w-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ height: '260px' }} />
                <div className="absolute inset-0 transition-opacity duration-300" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)', opacity: 0.7 }} />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.85)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-sm font-medium" style={{ color: '#e5e7eb' }}>{member.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
    </>
  )
}
