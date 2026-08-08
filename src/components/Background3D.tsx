import { useEffect, useRef } from 'react'

/**
 * Dependency-free 3D particle field rendered to a fixed canvas.
 * Particles live in a 3D cube, are projected with perspective, and the
 * whole cloud rotates + dollies based on scroll position — so the depth
 * of the scene visibly shifts as the user scrolls the page.
 */
export default function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const COUNT = 150
    const SPREAD = 1000
    type P = { x: number; y: number; z: number }
    const pts: P[] = Array.from({ length: COUNT }, () => ({
      x: (Math.random() - 0.5) * SPREAD,
      y: (Math.random() - 0.5) * SPREAD,
      z: (Math.random() - 0.5) * SPREAD,
    }))

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    let raf = 0
    let t = 0

    const render = () => {
      t += 0.0016
      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight)
      const scroll = Math.min(1, window.scrollY / maxScroll)

      // Scroll drives rotation and camera dolly; time adds gentle drift.
      const rotY = t + scroll * Math.PI * 1.4
      const rotX = Math.sin(t * 0.6) * 0.25 + scroll * 0.9
      const camZ = 620 - scroll * 260
      const focal = 620

      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)

      ctx.clearRect(0, 0, w, h)

      const cx = w / 2
      const cy = h / 2

      const projected: { sx: number; sy: number; s: number; a: number }[] = []

      for (const p of pts) {
        // rotate around Y
        let x = p.x * cosY - p.z * sinY
        let z = p.x * sinY + p.z * cosY
        let y = p.y
        // rotate around X
        const y2 = y * cosX - z * sinX
        z = y * sinX + z * cosX
        y = y2

        const zc = z + camZ
        if (zc <= 1) continue
        const scale = focal / zc
        const sx = cx + x * scale
        const sy = cy + y * scale
        const depth = 1 - zc / (SPREAD + camZ)
        projected.push({ sx, sy, s: scale, a: Math.max(0, Math.min(1, depth)) })
      }

      // faint connecting lines between nearby points -> 3D lattice feel
      ctx.lineWidth = 1
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i]
          const b = projected[j]
          const dx = a.sx - b.sx
          const dy = a.sy - b.sy
          const d2 = dx * dx + dy * dy
          if (d2 < 120 * 120) {
            const alpha = (1 - Math.sqrt(d2) / 120) * 0.16 * Math.min(a.a, b.a)
            if (alpha <= 0.01) continue
            ctx.strokeStyle = `rgba(139,92,246,${alpha})`
            ctx.beginPath()
            ctx.moveTo(a.sx, a.sy)
            ctx.lineTo(b.sx, b.sy)
            ctx.stroke()
          }
        }
      }

      // glowing particles
      for (const q of projected) {
        const r = Math.max(0.6, q.s * 2.2)
        const alpha = 0.15 + q.a * 0.7
        const g = ctx.createRadialGradient(q.sx, q.sy, 0, q.sx, q.sy, r * 3)
        g.addColorStop(0, `rgba(196,181,253,${alpha})`)
        g.addColorStop(1, 'rgba(124,58,237,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(q.sx, q.sy, r * 3, 0, Math.PI * 2)
        ctx.fill()
      }

      if (!reduce) raf = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
