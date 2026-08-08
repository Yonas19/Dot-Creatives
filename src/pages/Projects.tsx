import { useState, useEffect, useRef } from 'react'
import { useInView } from '@/shared'

// Fetch a TikTok video's poster thumbnail via the public oEmbed API once the
// card scrolls into view. No iframe is mounted until the user clicks play.
function useTikTokPoster(id: string) {
  const ref = useRef<HTMLDivElement>(null)
  const [thumb, setThumb] = useState<string | null>(null)
  const requested = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !requested.current) {
          requested.current = true
          obs.disconnect()
          const url = `https://www.tiktok.com/@tiktok/video/${id}`
          fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`)
            .then((r) => (r.ok ? r.json() : null))
            .then((data) => {
              if (data?.thumbnail_url) setThumb(data.thumbnail_url as string)
            })
            .catch(() => {})
        }
      },
      { rootMargin: '200px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [id])

  return { ref, thumb }
}

// Poster + click-to-play player: shows the fetched thumbnail behind a play
// overlay, and only mounts the TikTok iframe when the viewer clicks it.
function TikTokPlayer({ id, title }: { id: string; title: string }) {
  const { ref, thumb } = useTikTokPoster(id)
  const [playing, setPlaying] = useState(false)

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', aspectRatio: '9/16', background: '#111' }}>
      {playing ? (
        <iframe
          src={`https://www.tiktok.com/player/v1/${id}?autoplay=1&loop=1&controls=1`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          scrolling="no"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', display: 'block', overflow: 'hidden' }}
          title={title}
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${title}`}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', padding: 0, border: 'none', cursor: 'pointer', background: thumb ? `#111 url(${thumb}) center/cover no-repeat` : '#111', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
        >
          <PlayPoster title={title} thumb={thumb} />
        </button>
      )}
    </div>
  )
}

// Reusable poster overlay (play ring + callout) shared by the players.
function PlayPoster({ title, thumb }: { title: string; thumb?: string | null }) {
  return (
    <>
      <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.15))' }} />
      <span style={{ position: 'relative', width: 60, height: 60, borderRadius: '50%', background: 'rgba(124,58,237,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(124,58,237,0.5)' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><polygon points="6 4 20 12 6 20 6 4" /></svg>
      </span>
      <span style={{ position: 'relative', fontSize: '12px', fontWeight: 600, color: '#fff', letterSpacing: '0.04em', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
        Play Video
      </span>
    </>
  )
}

// Instagram Reel: same click-to-play concept — no iframe until the viewer
// clicks. Instagram oEmbed needs an access token, so we use the play poster.
function InstagramPlayer({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <iframe
        src={`https://www.instagram.com/reel/${id}/embed/`}
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        style={{ width: '100%', aspectRatio: '9/16', border: 'none', display: 'block', overflow: 'hidden' }}
        title={title}
        scrolling="no"
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${title}`}
      style={{ position: 'relative', width: '100%', aspectRatio: '9/16', padding: 0, border: 'none', cursor: 'pointer', background: '#111', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
    >
      <PlayPoster title={title} />
    </button>
  )
}

const SERVICE_TABS = ['Digital Marketing', 'Wedding Films', 'Birthday Party', 'School Event', 'Modeling Shoots', 'Photography']

type ProjectItem = { id: number; service: string; type: 'image' | 'tiktok' | 'instagram'; src: string; title: string; aspect: 'landscape' | 'portrait'; category?: string; description?: string; tags?: string[] }

const DM_VIDEOS: ProjectItem[] = [
  {
    id: 18, service: 'Digital Marketing', type: 'tiktok', src: '7496731421680176389', title: 'VERO LOUNGE — Grand Opening', aspect: 'portrait',
    category: 'Events & Nightlife',
    description: "It's finally here — GRAND OPENING DAY! The vibe starts now.",
    tags: ['#verolounge', '#grandopening', '#mekelle', '#nightlife'],
  },
  {
    id: 20, service: 'Digital Marketing', type: 'tiktok', src: '7650164674947829013', title: 'VERO LOUNGE', aspect: 'portrait',
    category: 'Events & Nightlife',
    description: 'The energy at VERO LOUNGE — experience it for yourself.',
    tags: ['#verolounge', '#mekelle', '#tigraytiktok'],
  },
  {
    id: 21, service: 'Digital Marketing', type: 'tiktok', src: '7650042524341472533', title: 'VERO LOUNGE', aspect: 'portrait',
    category: 'Events & Nightlife',
    description: 'Another night, another unforgettable moment at VERO.',
    tags: ['#verolounge', '#nightlife', '#habeshatiktok'],
  },
  {
    id: 22, service: 'Digital Marketing', type: 'tiktok', src: '7646395544331422997', title: 'VERO LOUNGE', aspect: 'portrait',
    category: 'Events & Nightlife',
    description: 'Bringing the finest vibes to Mekelle — every single night.',
    tags: ['#verolounge', '#mekelle', '#ethiopiantiktok'],
  },
  {
    id: 23, service: 'Digital Marketing', type: 'tiktok', src: '7644873621244038421', title: 'VERO LOUNGE', aspect: 'portrait',
    category: 'Events & Nightlife',
    description: 'The lounge that defines the scene. Come see why.',
    tags: ['#verolounge', '#tigraytiktok', '#nightout'],
  },
  {
    id: 24, service: 'Digital Marketing', type: 'tiktok', src: '7642596075878092052', title: 'VERO LOUNGE', aspect: 'portrait',
    category: 'Events & Nightlife',
    description: 'Lights, music, and memories made at VERO LOUNGE.',
    tags: ['#verolounge', '#mekelle', '#fyp'],
  },
  {
    id: 25, service: 'Digital Marketing', type: 'tiktok', src: '7617497044097322247', title: 'Star Dental Clinic', aspect: 'portrait',
    category: 'Healthcare & Wellness',
    description: 'Professional dental care in Mekelle — your smile is our priority.',
    tags: ['#stardentalclinic', '#mekelle', '#dental', '#tigraytiktok'],
  },
  {
    id: 26, service: 'Digital Marketing', type: 'tiktok', src: '7621554676625870088', title: 'Star Dental Clinic', aspect: 'portrait',
    category: 'Healthcare & Wellness',
    description: 'Transform your smile with expert dental services at Star Dental Clinic.',
    tags: ['#stardentalclinic', '#mekelle', '#dental', '#ethiopia'],
  },
  {
    id: 27, service: 'Digital Marketing', type: 'tiktok', src: '7622608759247981842', title: 'Star Dental Clinic', aspect: 'portrait',
    category: 'Healthcare & Wellness',
    description: 'Quality dental care you can trust — Star Dental Clinic, Mekelle.',
    tags: ['#stardentalclinic', '#mekelle', '#healthcare', '#tigraytiktok'],
  },
  {
    id: 28, service: 'Digital Marketing', type: 'tiktok', src: '7508027588133080326', title: 'Sapiens Mekelle', aspect: 'portrait',
    category: 'Lifestyle & Brand',
    description: 'Sapiens Mekelle — redefining the experience.',
    tags: ['#sapiens', '#mekelle', '#tigraytiktok'],
  },
  {
    id: 29, service: 'Digital Marketing', type: 'tiktok', src: '7510265358004210949', title: 'Sapiens Mekelle', aspect: 'portrait',
    category: 'Lifestyle & Brand',
    description: 'The vibe, the look, the feel — Sapiens Mekelle.',
    tags: ['#sapiens', '#mekelle', '#ethiopia'],
  },
  {
    id: 30, service: 'Digital Marketing', type: 'tiktok', src: '7511752002368589062', title: 'Sapiens Mekelle', aspect: 'portrait',
    category: 'Lifestyle & Brand',
    description: 'Creating content that connects — Sapiens Mekelle.',
    tags: ['#sapiens', '#mekelle', '#habeshatiktok'],
  },
  {
    id: 31, service: 'Digital Marketing', type: 'tiktok', src: '7513122356114623749', title: 'Sapiens Mekelle', aspect: 'portrait',
    category: 'Lifestyle & Brand',
    description: 'Bold visuals, authentic stories — Sapiens Mekelle.',
    tags: ['#sapiens', '#mekelle', '#tigraytiktok'],
  },
  {
    id: 32, service: 'Digital Marketing', type: 'tiktok', src: '7520653220448980280', title: 'Sapiens Mekelle', aspect: 'portrait',
    category: 'Lifestyle & Brand',
    description: 'Elevating brands through powerful digital content.',
    tags: ['#sapiens', '#mekelle', '#fyp'],
  },
  {
    id: 33, service: 'Digital Marketing', type: 'tiktok', src: '7537904244184173880', title: 'TAD Burger', aspect: 'portrait',
    category: 'Food & Beverage',
    description: 'Juicy, bold, and unforgettable — TAD Burger is here.',
    tags: ['#tadburger', '#mekelle', '#food', '#tigraytiktok'],
  },
  {
    id: 34, service: 'Digital Marketing', type: 'tiktok', src: '7582802292856868108', title: 'TAD Burger', aspect: 'portrait',
    category: 'Food & Beverage',
    description: 'Every bite tells a story — TAD Burger, Mekelle.',
    tags: ['#tadburger', '#mekelle', '#burger', '#ethiopia'],
  },
  {
    id: 35, service: 'Digital Marketing', type: 'tiktok', src: '7586981674747956491', title: 'TAD Burger', aspect: 'portrait',
    category: 'Food & Beverage',
    description: 'Fresh ingredients, bold flavors — that\'s the TAD way.',
    tags: ['#tadburger', '#mekelle', '#foodie', '#habeshatiktok'],
  },
  {
    id: 36, service: 'Digital Marketing', type: 'tiktok', src: '7557715509840760075', title: 'TAD Burger', aspect: 'portrait',
    category: 'Food & Beverage',
    description: 'Come hungry, leave happy — TAD Burger Mekelle.',
    tags: ['#tadburger', '#mekelle', '#food', '#fyp'],
  },
  {
    id: 37, service: 'Digital Marketing', type: 'tiktok', src: '7558312036585737484', title: 'TAD Burger', aspect: 'portrait',
    category: 'Food & Beverage',
    description: 'The burger experience Mekelle has been waiting for.',
    tags: ['#tadburger', '#mekelle', '#burger', '#tigraytiktok'],
  },
  {
    id: 38, service: 'Digital Marketing', type: 'tiktok', src: '7523621089914670341', title: 'MT Fashion', aspect: 'portrait',
    category: 'Fashion & Style',
    description: 'Style that speaks — MT Fashion, setting trends in Mekelle.',
    tags: ['#mtfashion', '#mekelle', '#fashion', '#tigraytiktok'],
  },
  {
    id: 39, service: 'Digital Marketing', type: 'tiktok', src: '7533260138187099398', title: 'MT Fashion', aspect: 'portrait',
    category: 'Fashion & Style',
    description: 'New arrivals, fresh looks — MT Fashion has you covered.',
    tags: ['#mtfashion', '#mekelle', '#style', '#ethiopia'],
  },
  {
    id: 40, service: 'Digital Marketing', type: 'tiktok', src: '7558512123010223416', title: 'MT Fashion', aspect: 'portrait',
    category: 'Fashion & Style',
    description: 'Dress to impress — MT Fashion Mekelle.',
    tags: ['#mtfashion', '#mekelle', '#fashion', '#habeshatiktok'],
  },
  {
    id: 41, service: 'Digital Marketing', type: 'tiktok', src: '7578393430720646411', title: 'MT Fashion', aspect: 'portrait',
    category: 'Fashion & Style',
    description: 'Elevate your wardrobe with MT Fashion\'s latest collection.',
    tags: ['#mtfashion', '#mekelle', '#ootd', '#tigraytiktok'],
  },
  {
    id: 42, service: 'Digital Marketing', type: 'tiktok', src: '7599207256592305415', title: 'MT Fashion', aspect: 'portrait',
    category: 'Fashion & Style',
    description: 'Fashion-forward and always on trend — MT Fashion.',
    tags: ['#mtfashion', '#mekelle', '#fashion', '#fyp'],
  },
  {
    id: 43, service: 'Digital Marketing', type: 'tiktok', src: '7636765504325160210', title: 'MT Fashion', aspect: 'portrait',
    category: 'Fashion & Style',
    description: 'Your style, your statement — MT Fashion Mekelle.',
    tags: ['#mtfashion', '#mekelle', '#style', '#ethiopia'],
  },
  {
    id: 44, service: 'Digital Marketing', type: 'tiktok', src: '7645931388486602002', title: 'MT Fashion', aspect: 'portrait',
    category: 'Fashion & Style',
    description: 'Curated fashion for every occasion — MT Fashion.',
    tags: ['#mtfashion', '#mekelle', '#fashion', '#tigraytiktok'],
  },
  {
    id: 45, service: 'Digital Marketing', type: 'tiktok', src: '7658928586774023431', title: 'MT Fashion', aspect: 'portrait',
    category: 'Fashion & Style',
    description: 'Bold, vibrant, and uniquely you — MT Fashion.',
    tags: ['#mtfashion', '#mekelle', '#ootd', '#habeshatiktok'],
  },
  {
    id: 46, service: 'Digital Marketing', type: 'tiktok', src: '7620035904320621831', title: 'MT Fashion', aspect: 'portrait',
    category: 'Fashion & Style',
    description: 'The fashion destination of Mekelle — MT Fashion.',
    tags: ['#mtfashion', '#mekelle', '#fashion', '#fyp'],
  },
  {
    id: 47, service: 'Digital Marketing', type: 'tiktok', src: '7492070324331187511', title: 'Regalia Emporium', aspect: 'portrait',
    category: 'Fashion & Luxury',
    description: 'Luxury redefined — Regalia Emporium, curated for the bold.',
    tags: ['#regalia', '#mekelle', '#luxury', '#tigraytiktok'],
  },
  {
    id: 48, service: 'Digital Marketing', type: 'tiktok', src: '7593370174737222968', title: 'Regalia Emporium', aspect: 'portrait',
    category: 'Fashion & Luxury',
    description: 'Exclusive collections for those who demand the best.',
    tags: ['#regalia', '#mekelle', '#fashion', '#ethiopia'],
  },
  {
    id: 49, service: 'Digital Marketing', type: 'tiktok', src: '7632549905692626194', title: 'Regalia Emporium', aspect: 'portrait',
    category: 'Fashion & Luxury',
    description: 'Elevate every moment with Regalia Emporium.',
    tags: ['#regalia', '#mekelle', '#luxury', '#habeshatiktok'],
  },
  {
    id: 50, service: 'Digital Marketing', type: 'tiktok', src: '7634935069966126354', title: 'Regalia Emporium', aspect: 'portrait',
    category: 'Fashion & Luxury',
    description: 'Where elegance meets culture — Regalia Emporium.',
    tags: ['#regalia', '#mekelle', '#style', '#tigraytiktok'],
  },
  {
    id: 51, service: 'Digital Marketing', type: 'tiktok', src: '7660934359276490005', title: 'Regalia Emporium', aspect: 'portrait',
    category: 'Fashion & Luxury',
    description: 'Timeless pieces, bold statements — Regalia Emporium.',
    tags: ['#regalia', '#mekelle', '#luxury', '#fyp'],
  },
  {
    id: 52, service: 'Digital Marketing', type: 'tiktok', src: '7602292805913939218', title: 'Urban Cafe Mekelle', aspect: 'portrait',
    category: 'Food & Beverage',
    description: 'Your favourite spot in Mekelle — Urban Cafe, where every sip counts.',
    tags: ['#urbancafe', '#mekelle', '#coffee', '#tigraytiktok'],
  },
  {
    id: 53, service: 'Digital Marketing', type: 'tiktok', src: '7598549079563537682', title: 'Urban Cafe Mekelle', aspect: 'portrait',
    category: 'Food & Beverage',
    description: 'Good vibes, great coffee — Urban Cafe Mekelle.',
    tags: ['#urbancafe', '#mekelle', '#cafe', '#ethiopia'],
  },
  {
    id: 54, service: 'Digital Marketing', type: 'tiktok', src: '7596331861798817035', title: 'Urban Cafe Mekelle', aspect: 'portrait',
    category: 'Food & Beverage',
    description: 'The perfect blend of atmosphere and flavour at Urban Cafe.',
    tags: ['#urbancafe', '#mekelle', '#coffeetime', '#habeshatiktok'],
  },
  {
    id: 55, service: 'Digital Marketing', type: 'tiktok', src: '7588179485984312587', title: 'Urban Cafe Mekelle', aspect: 'portrait',
    category: 'Food & Beverage',
    description: 'Mekelle\'s go-to cafe for coffee lovers — Urban Cafe.',
    tags: ['#urbancafe', '#mekelle', '#coffee', '#fyp'],
  },
  {
    id: 56, service: 'Digital Marketing', type: 'tiktok', src: '7584074303356849419', title: 'Urban Cafe Mekelle', aspect: 'portrait',
    category: 'Food & Beverage',
    description: 'Sit back, relax, and enjoy the Urban Cafe experience.',
    tags: ['#urbancafe', '#mekelle', '#cafe', '#tigraytiktok'],
  },
  {
    id: 57, service: 'Digital Marketing', type: 'tiktok', src: '7514269172709379333', title: "Montorio's Lounge", aspect: 'portrait',
    category: 'Events & Nightlife',
    description: "Where the night comes alive — Montorio's Lounge, Mekelle.",
    tags: ['#montorios', '#mekelle', '#nightlife', '#tigraytiktok'],
  },
  {
    id: 58, service: 'Digital Marketing', type: 'tiktok', src: '7517213153537576197', title: "Montorio's Lounge", aspect: 'portrait',
    category: 'Events & Nightlife',
    description: "Premium atmosphere, unforgettable nights — Montorio's Lounge.",
    tags: ['#montorios', '#mekelle', '#lounge', '#ethiopia'],
  },
  {
    id: 59, service: 'Digital Marketing', type: 'tiktok', src: '7530564054721563960', title: "Montorio's Lounge", aspect: 'portrait',
    category: 'Events & Nightlife',
    description: "The lounge experience redefined — Montorio's Mekelle.",
    tags: ['#montorios', '#mekelle', '#nightout', '#habeshatiktok'],
  },
  {
    id: 60, service: 'Digital Marketing', type: 'tiktok', src: '7577438810854690104', title: "Montorio's Lounge", aspect: 'portrait',
    category: 'Events & Nightlife',
    description: "Good music, great company — Montorio's Lounge.",
    tags: ['#montorios', '#mekelle', '#nightlife', '#fyp'],
  },
  {
    id: 61, service: 'Digital Marketing', type: 'tiktok', src: '7589660566231207179', title: "Montorio's Lounge", aspect: 'portrait',
    category: 'Events & Nightlife',
    description: "Every night is a special occasion at Montorio's Lounge.",
    tags: ['#montorios', '#mekelle', '#lounge', '#tigraytiktok'],
  },
  {
    id: 62, service: 'Digital Marketing', type: 'tiktok', src: '7594850297340628280', title: "Montorio's Lounge", aspect: 'portrait',
    category: 'Events & Nightlife',
    description: "Mekelle's finest lounge — come experience Montorio's.",
    tags: ['#montorios', '#mekelle', '#nightlife', '#ethiopia'],
  },
]

const MODELING_VIDEOS: ProjectItem[] = [
  {
    id: 8, service: 'Modeling Shoots', type: 'tiktok', src: '7670778321734552839', title: 'DOT Films — Modeling', aspect: 'portrait',
    category: 'Modeling & Fashion',
    description: 'Cinematic modeling shoot — where style meets storytelling.',
    tags: ['#dotfilms', '#modelingshoot', '#fashion', '#mekelle'],
  },
  {
    id: 9, service: 'Modeling Shoots', type: 'tiktok', src: '7670043325566602503', title: 'DOT Films — Modeling', aspect: 'portrait',
    category: 'Modeling & Fashion',
    description: 'Bold looks, sharp angles — a modeling reel by DOT Films.',
    tags: ['#dotfilms', '#modeling', '#cinematic', '#tigraytiktok'],
  },
  {
    id: 10, service: 'Modeling Shoots', type: 'tiktok', src: '7633097597581790465', title: 'DOT Films — Modeling', aspect: 'portrait',
    category: 'Modeling & Fashion',
    description: 'Every frame a statement — DOT Films modeling production.',
    tags: ['#dotfilms', '#modelingshoot', '#habeshatiktok'],
  },
  {
    id: 70, service: 'Modeling Shoots', type: 'tiktok', src: '7592642679712894264', title: 'DOT Films — Modeling', aspect: 'portrait',
    category: 'Modeling & Fashion',
    description: 'Fashion-forward visuals crafted by DOT Films.',
    tags: ['#dotfilms', '#fashion', '#mekelle', '#fyp'],
  },
  {
    id: 71, service: 'Modeling Shoots', type: 'tiktok', src: '7585420752732572939', title: 'DOT Films — Modeling', aspect: 'portrait',
    category: 'Modeling & Fashion',
    description: 'Lighting, motion, and mood — DOT Films modeling reel.',
    tags: ['#dotfilms', '#modeling', '#cinematicvideo', '#ethiopia'],
  },
  {
    id: 72, service: 'Modeling Shoots', type: 'tiktok', src: '7568874944969444620', title: 'DOT Films — Modeling', aspect: 'portrait',
    category: 'Modeling & Fashion',
    description: 'Authentic beauty captured on camera by DOT Films.',
    tags: ['#dotfilms', '#modelingshoot', '#tigraytiktok'],
  },
  {
    id: 73, service: 'Modeling Shoots', type: 'tiktok', src: '7543534181079371014', title: 'DOT Films — Modeling', aspect: 'portrait',
    category: 'Modeling & Fashion',
    description: 'Visual storytelling through fashion and form.',
    tags: ['#dotfilms', '#fashion', '#mekelle', '#habeshatiktok'],
  },
  {
    id: 74, service: 'Modeling Shoots', type: 'tiktok', src: '7540906760756907270', title: 'DOT Films — Modeling', aspect: 'portrait',
    category: 'Modeling & Fashion',
    description: 'The art of the shoot — DOT Films behind the lens.',
    tags: ['#dotfilms', '#modeling', '#cinematography', '#ethiopia'],
  },
  {
    id: 75, service: 'Modeling Shoots', type: 'tiktok', src: '7541659662576323846', title: 'DOT Films — Modeling', aspect: 'portrait',
    category: 'Modeling & Fashion',
    description: 'Confidence, color, and creativity — DOT Films modeling.',
    tags: ['#dotfilms', '#modelingshoot', '#fyp'],
  },
  {
    id: 76, service: 'Modeling Shoots', type: 'tiktok', src: '7512316819923832120', title: 'DOT Films — Modeling', aspect: 'portrait',
    category: 'Modeling & Fashion',
    description: 'Elevating modeling content in Mekelle and beyond.',
    tags: ['#dotfilms', '#mekelle', '#modeling', '#tigraytiktok'],
  },
]

const WEDDING_VIDEOS: ProjectItem[] = [
  {
    id: 77, service: 'Wedding Films', type: 'tiktok', src: '7644792519728827656', title: 'DOT Films — Wedding', aspect: 'portrait',
    category: 'Wedding Films',
    description: 'Every moment, beautifully preserved by DOT Films.',
    tags: ['#dotfilms', '#weddingfilm', '#tigraytiktok'],
  },
  {
    id: 78, service: 'Wedding Films', type: 'tiktok', src: '7644420136610385170', title: 'DOT Films — Wedding', aspect: 'portrait',
    category: 'Wedding Films',
    description: 'Timeless memories, cinematic storytelling.',
    tags: ['#dotfilms', '#wedding', '#mekelle', '#habeshatiktok'],
  },
  {
    id: 79, service: 'Wedding Films', type: 'tiktok', src: '7644048321438354706', title: 'DOT Films — Wedding', aspect: 'portrait',
    category: 'Wedding Films',
    description: 'Love stories told through the lens of DOT Films.',
    tags: ['#dotfilms', '#weddingfilm', '#ethiopia', '#fyp'],
  },
  {
    id: 80, service: 'Wedding Films', type: 'tiktok', src: '7632614775784000788', title: 'DOT Films — Wedding', aspect: 'portrait',
    category: 'Wedding Films',
    description: "A day you'll never forget — a film you'll always treasure.",
    tags: ['#dotfilms', '#weddingfilm', '#tigraytiktok', '#mekelle'],
  },
  {
    id: 81, service: 'Wedding Films', type: 'tiktok', src: '7571323982473907512', title: 'DOT Films — Wedding', aspect: 'portrait',
    category: 'Wedding Films',
    description: 'Raw emotion, stunning visuals — wedding films by DOT.',
    tags: ['#dotfilms', '#wedding', '#cinematicfilm', '#habeshatiktok'],
  },
  {
    id: 82, service: 'Wedding Films', type: 'tiktok', src: '7557959316213402891', title: 'DOT Films — Wedding', aspect: 'portrait',
    category: 'Wedding Films',
    description: 'Two souls, one story — captured for a lifetime.',
    tags: ['#dotfilms', '#weddingfilm', '#mekelle', '#ethiopia'],
  },
  {
    id: 83, service: 'Wedding Films', type: 'tiktok', src: '7527699012162424120', title: 'DOT Films — Wedding', aspect: 'portrait',
    category: 'Wedding Films',
    description: 'Celebrating love the cinematic way.',
    tags: ['#dotfilms', '#wedding', '#fyp', '#tigraytiktok'],
  },
  {
    id: 84, service: 'Wedding Films', type: 'tiktok', src: '7503414739884674359', title: 'DOT Films — Wedding', aspect: 'portrait',
    category: 'Wedding Films',
    description: 'Every glance, every tear, every smile — preserved forever.',
    tags: ['#dotfilms', '#weddingfilm', '#habeshatiktok'],
  },
  {
    id: 85, service: 'Wedding Films', type: 'tiktok', src: '7505064637197602054', title: 'DOT Films — Wedding', aspect: 'portrait',
    category: 'Wedding Films',
    description: 'Your wedding day, retold through stunning cinema.',
    tags: ['#dotfilms', '#wedding', '#mekelle', '#ethiopia'],
  },
  {
    id: 86, service: 'Wedding Films', type: 'tiktok', src: '7567237504043207947', title: 'DOT Films — Wedding', aspect: 'portrait',
    category: 'Wedding Films',
    description: 'Crafting wedding films that last beyond generations.',
    tags: ['#dotfilms', '#weddingfilm', '#tigraytiktok', '#fyp'],
  },
]

const SCHOOL_VIDEOS: ProjectItem[] = [
  {
    id: 90, service: 'School Event', type: 'tiktok', src: '7504161487066238214', title: 'Sheba 25 Seniors', aspect: 'portrait',
    category: 'School Event',
    description: 'Celebrating the Sheba Class of 2025 — memories that last a lifetime.',
    tags: ['#dotfilms', '#schoolevents', '#seniors', '#mekelle'],
  },
  {
    id: 91, service: 'School Event', type: 'tiktok', src: '7533135291566050565', title: 'Sheba 25 Seniors', aspect: 'portrait',
    category: 'School Event',
    description: 'The energy of graduation day, captured frame by frame.',
    tags: ['#dotfilms', '#schoolevents', '#graduation', '#tigraytiktok'],
  },
  {
    id: 92, service: 'School Event', type: 'tiktok', src: '7534246282349743366', title: 'Senior Class Highlights', aspect: 'portrait',
    category: 'School Event',
    description: 'Unforgettable moments from a milestone year.',
    tags: ['#dotfilms', '#schoolevents', '#seniors', '#habeshatiktok'],
  },
  {
    id: 93, service: 'School Event', type: 'tiktok', src: '7574804278208892172', title: 'Class of 12th', aspect: 'portrait',
    category: 'School Event',
    description: 'Where school spirit meets cinematic storytelling.',
    tags: ['#dotfilms', '#schoolevents', '#classof2025', '#mekelle'],
  },
  {
    id: 94, service: 'School Event', type: 'tiktok', src: '7575814016967183628', title: 'Class of 12th', aspect: 'portrait',
    category: 'School Event',
    description: 'The best days of school, relived through film.',
    tags: ['#dotfilms', '#schoolevents', '#seniors', '#ethiopia'],
  },
  {
    id: 95, service: 'School Event', type: 'tiktok', src: '7586322586901007628', title: 'Class of 12th', aspect: 'portrait',
    category: 'School Event',
    description: 'Every cheer, every smile — a celebration on screen.',
    tags: ['#dotfilms', '#schoolevents', '#graduation', '#tigraytiktok'],
  },
  {
    id: 96, service: 'School Event', type: 'tiktok', src: '7588419084723784971', title: 'Class of 12th', aspect: 'portrait',
    category: 'School Event',
    description: 'Sending off the seniors in true cinematic style.',
    tags: ['#dotfilms', '#schoolevents', '#seniors', '#fyp'],
  },
]

const BIRTHDAY_VIDEOS: ProjectItem[] = [
  {
    id: 97, service: 'Birthday Party', type: 'tiktok', src: '7648901410188201224', title: 'Birthday Celebration', aspect: 'portrait',
    category: 'Birthday Party',
    description: 'A birthday moment worth remembering — lights, laughter, and pure joy.',
    tags: ['#dotfilms', '#birthdayparty', '#mekelle', '#tigraytiktok'],
  },
  {
    id: 98, service: 'Birthday Party', type: 'tiktok', src: '7642583255308307719', title: 'Birthday Celebration', aspect: 'portrait',
    category: 'Birthday Party',
    description: 'Every detail of the celebration, captured in cinematic style.',
    tags: ['#dotfilms', '#birthdayparty', '#habeshatiktok', '#fyp'],
  },
  {
    id: 99, service: 'Birthday Party', type: 'tiktok', src: '7641861434523028754', title: 'Birthday Celebration', aspect: 'portrait',
    category: 'Birthday Party',
    description: 'The energy of the party, the warmth of the people — all on film.',
    tags: ['#dotfilms', '#birthdayparty', '#ethiopia', '#mekelle'],
  },
  {
    id: 100, service: 'Birthday Party', type: 'tiktok', src: '7640076199829441800', title: 'Birthday Celebration', aspect: 'portrait',
    category: 'Birthday Party',
    description: 'Relive the best moments from a night to remember.',
    tags: ['#dotfilms', '#birthdayparty', '#tigraytiktok', '#memories'],
  },
  {
    id: 101, service: 'Birthday Party', type: 'tiktok', src: '7597290147687730444', title: 'Birthday Celebration', aspect: 'portrait',
    category: 'Birthday Party',
    description: 'Smiles, surprises, and celebrations — documented with heart.',
    tags: ['#dotfilms', '#birthdayparty', '#mekelle', '#habeshatiktok'],
  },
  {
    id: 102, service: 'Birthday Party', type: 'tiktok', src: '7591432154798722316', title: 'Birthday Celebration', aspect: 'portrait',
    category: 'Birthday Party',
    description: 'A special day deserves a cinematic story — this is yours.',
    tags: ['#dotfilms', '#birthdayparty', '#ethiopia', '#fyp'],
  },
]

const PROJECTS: ProjectItem[] = [

  ...WEDDING_VIDEOS,
  ...MODELING_VIDEOS,
  ...DM_VIDEOS,
  ...SCHOOL_VIDEOS,
  ...BIRTHDAY_VIDEOS,
]

function TikTokCard({ item }: { item: ProjectItem }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        alignSelf: 'start',
        borderRadius: '20px',
        overflow: 'hidden',
        background: '#111',
        border: `1px solid ${hovered ? 'rgba(196,181,253,0.35)' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: hovered ? '0 24px 64px rgba(124,58,237,0.25)' : '0 4px 24px rgba(0,0,0,0.5)',
        transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Video player */}
      <TikTokPlayer id={item.src} title={item.title} />

      {/* Info panel */}
      <div style={{ padding: '20px 20px 18px' }}>
        {item.category && (
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#a78bfa', display: 'block', marginBottom: '8px' }}>
            {item.category}
          </span>
        )}
        <h3 style={{ margin: '0 0 10px', fontSize: '15px', fontWeight: 700, color: '#fff', fontFamily: 'Poppins, sans-serif', lineHeight: 1.35 }}>
          {item.title}
        </h3>
        {item.description && (
          <p style={{ margin: '0 0 14px', fontSize: '13px', lineHeight: 1.6, color: '#6b7280' }}>
            {item.description}
          </p>
        )}
        {item.tags && item.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {item.tags.map(tag => (
              <span key={tag} style={{ fontSize: '11px', fontWeight: 500, color: '#7c3aed', background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)', borderRadius: '999px', padding: '3px 10px' }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ProjectCard({ item }: { item: ProjectItem }) {
  const [hovered, setHovered] = useState(false)
  const isPortrait = item.aspect === 'portrait'

  if (item.type === 'instagram') {
    return (
      <div
        style={{ alignSelf: 'start', borderRadius: '16px', overflow: 'hidden', border: `1px solid ${hovered ? 'rgba(196,181,253,0.3)' : 'rgba(255,255,255,0.07)'}`, boxShadow: hovered ? '0 20px 60px rgba(124,58,237,0.2)' : '0 4px 20px rgba(0,0,0,0.4)', transition: 'border 0.35s ease, box-shadow 0.35s ease', background: '#111' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <InstagramPlayer id={item.src} title={item.title} />
      </div>
    )
  }

  if (item.type === 'tiktok' && !item.category) {
    return (
      <div
        style={{ alignSelf: 'start', borderRadius: '16px', overflow: 'hidden', border: `1px solid ${hovered ? 'rgba(196,181,253,0.3)' : 'rgba(255,255,255,0.07)'}`, boxShadow: hovered ? '0 20px 60px rgba(124,58,237,0.2)' : '0 4px 20px rgba(0,0,0,0.4)', transition: 'border 0.35s ease, box-shadow 0.35s ease', background: '#111' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <TikTokPlayer id={item.src} title={item.title} />
      </div>
    )
  }

  return (
    <div
      className={isPortrait ? 'row-span-2' : ''}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '16px', overflow: 'hidden', position: 'relative',
        background: '#111',
        border: `1px solid ${hovered ? 'rgba(196,181,253,0.3)' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hovered ? '0 20px 60px rgba(124,58,237,0.2)' : '0 4px 20px rgba(0,0,0,0.4)',
        transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        height: '100%', minHeight: isPortrait ? '420px' : '200px',
      }}
    >
      <img
        src={item.src} alt={item.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)', minHeight: isPortrait ? '420px' : '200px' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: hovered ? 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)' : 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)', transition: 'background 0.35s ease' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px', transform: hovered ? 'translateY(0)' : 'translateY(4px)', opacity: hovered ? 1 : 0.7, transition: 'all 0.3s ease' }}>
        <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#fff', fontFamily: 'Poppins, sans-serif' }}>{item.title}</p>
        <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#c4b5fd' }}>{item.service}</p>
      </div>
    </div>
  )
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState('Digital Marketing')
  const { ref, visible } = useInView(0.05)

  const isTikTokGrid = activeTab === 'Digital Marketing' || activeTab === 'Modeling Shoots' || activeTab === 'Wedding Films' || activeTab === 'School Event' || activeTab === 'Birthday Party'
  const filtered = PROJECTS.filter(p => p.service === activeTab)

  return (
    <section className="min-h-screen pt-28 pb-24" style={{ background: '#0a0a0a' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          ref={ref}
          style={{ textAlign: 'center', marginBottom: '48px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)', transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)' }}
        >
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#7c3aed', display: 'block', marginBottom: '12px' }}>Our Work</span>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', margin: '0 0 16px' }}>
            Featured <span className="text-gradient">Projects</span>
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '1rem', maxWidth: '480px', margin: '0 auto' }}>
            A selection of work across every service we offer.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '48px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s' }}>
          {SERVICE_TABS.map((tab) => {
            const active = tab === activeTab
            return (
              <button
                key={tab}
                data-tab={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '9px 20px', borderRadius: '999px', fontSize: '13px', fontWeight: 600,
                  fontFamily: 'Poppins, sans-serif', cursor: 'pointer',
                  border: active ? '1px solid transparent' : '1px solid rgba(255,255,255,0.12)',
                  background: active ? 'linear-gradient(135deg, #7c3aed, #a78bfa)' : 'rgba(255,255,255,0.04)',
                  color: active ? '#fff' : '#9ca3af',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.2s ease',
                  boxShadow: active ? '0 0 24px rgba(124,58,237,0.35)' : 'none',
                }}
              >
                {tab}
              </button>
            )
          })}
        </div>

        {/* TikTok card grid — Digital Marketing & Modeling Shoots */}
        {isTikTokGrid && (
          <div
            className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4" style={{ gap: '10px', alignItems: 'start', opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease 0.2s' }}
          >
            {filtered.map(item => <TikTokCard key={item.id} item={item} />)}
          </div>
        )}

        {/* All other categories — masonry grid */}
        {!isTikTokGrid && (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4" style={{ gridAutoRows: 'minmax(200px, auto)', gap: '10px', alignItems: 'start', opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease 0.2s' }}>
              {filtered.map((item) => <ProjectCard key={item.id} item={item} />)}
            </div>
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '80px 0', color: '#4b5563' }}>
                <p style={{ fontSize: '1rem' }}>No projects yet for this category.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
