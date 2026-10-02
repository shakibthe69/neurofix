import * as THREE from 'three'

/**
 * Draws the device screens shown on the 3D laptop and smartphone.
 *
 * These are painted procedurally with the 2D canvas API rather than loaded as
 * images: no extra network requests, no font dependency (we only need system
 * sans-serif + geometric shapes), and they stay crisp at any resolution.
 */

const BRAND = '#3478F6'
const VIOLET = '#8054F6'
const INK = '#080D19'
const INK_SOFT = '#0D1425'

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + w, y, x + w, y + h, radius)
  ctx.arcTo(x + w, y + h, x, y + h, radius)
  ctx.arcTo(x, y + h, x, y, radius)
  ctx.arcTo(x, y, x + w, y, radius)
  ctx.closePath()
}

function fillRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  fill: string | CanvasGradient,
) {
  roundRect(ctx, x, y, w, h, r)
  ctx.fillStyle = fill
  ctx.fill()
}

function glow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string,
  alpha = 0.55,
) {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
  gradient.addColorStop(0, color)
  gradient.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.globalAlpha = alpha
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
  ctx.globalAlpha = 1
}

/** Wide 16:10 screen: a mock Neurofix marketing landing page. */
function createLaptopScreenCanvas(): HTMLCanvasElement {
  const W = 1200
  const H = 750
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas

  // Background + ambient brand glows
  const bg = ctx.createLinearGradient(0, 0, W, H)
  bg.addColorStop(0, '#080D19')
  bg.addColorStop(1, '#0D1425')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  glow(ctx, W * 0.78, H * 0.2, 340, BRAND, 0.5)
  glow(ctx, W * 0.95, H * 0.62, 300, VIOLET, 0.42)

  // Subtle grid
  ctx.strokeStyle = 'rgba(255,255,255,0.045)'
  ctx.lineWidth = 1
  for (let x = 0; x < W; x += 48) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, H)
    ctx.stroke()
  }
  for (let y = 0; y < H; y += 48) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(W, y)
    ctx.stroke()
  }

  // ---- Navbar ----
  const logoGrad = ctx.createLinearGradient(56, 40, 90, 74)
  logoGrad.addColorStop(0, BRAND)
  logoGrad.addColorStop(1, VIOLET)
  fillRoundRect(ctx, 56, 40, 34, 34, 10, logoGrad)

  ctx.fillStyle = '#FFFFFF'
  ctx.font = '700 26px system-ui, -apple-system, Segoe UI, sans-serif'
  ctx.textBaseline = 'middle'
  ctx.fillText('Neurofix', 102, 58)

  ctx.fillStyle = 'rgba(226,232,240,0.75)'
  ctx.font = '500 17px system-ui, -apple-system, Segoe UI, sans-serif'
  const navLabels = ['Home', 'Services', 'Portfolio', 'About', 'Contact']
  let navX = 460
  for (const label of navLabels) {
    ctx.fillText(label, navX, 58)
    navX += ctx.measureText(label).width + 40
  }

  const ctaGrad = ctx.createLinearGradient(1010, 40, 1144, 74)
  ctaGrad.addColorStop(0, BRAND)
  ctaGrad.addColorStop(1, VIOLET)
  fillRoundRect(ctx, 1010, 40, 134, 36, 18, ctaGrad)

  // ---- Hero copy ----
  fillRoundRect(ctx, 56, 148, 250, 30, 15, 'rgba(52,120,246,0.16)')
  ctx.fillStyle = '#8FAEFF'
  ctx.font = '600 13px system-ui, -apple-system, Segoe UI, sans-serif'
  ctx.fillText('YOUR IDEAS + OUR CODE', 76, 163)

  ctx.fillStyle = '#FFFFFF'
  ctx.font = '800 46px system-ui, -apple-system, Segoe UI, sans-serif'
  ctx.fillText('Build Modern Web &', 56, 238)

  const headlineGrad = ctx.createLinearGradient(56, 262, 520, 300)
  headlineGrad.addColorStop(0, BRAND)
  headlineGrad.addColorStop(1, VIOLET)
  ctx.fillStyle = headlineGrad
  ctx.fillText('Application Solutions', 56, 296)

  ctx.fillStyle = 'rgba(148,163,184,0.92)'
  ctx.font = '400 18px system-ui, -apple-system, Segoe UI, sans-serif'
  ctx.fillText('Design, development and support for products that', 56, 348)
  ctx.fillText('grow with your business.', 56, 376)

  // Primary + secondary CTA pills
  fillRoundRect(ctx, 56, 412, 160, 46, 23, ctaGrad)
  ctx.fillStyle = '#FFFFFF'
  ctx.font = '600 16px system-ui, -apple-system, Segoe UI, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('Get Started', 136, 436)
  ctx.textAlign = 'left'

  fillRoundRect(ctx, 232, 412, 168, 46, 23, 'rgba(255,255,255,0.06)')
  ctx.strokeStyle = 'rgba(255,255,255,0.2)'
  ctx.lineWidth = 1
  roundRect(ctx, 232, 412, 168, 46, 23)
  ctx.stroke()
  ctx.fillStyle = 'rgba(226,232,240,0.86)'
  ctx.font = '600 16px system-ui, -apple-system, Segoe UI, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('View Our Work', 316, 436)
  ctx.textAlign = 'left'

  // ---- Abstract "3D" panel on the right ----
  const panelGrad = ctx.createLinearGradient(660, 130, 1080, 520)
  panelGrad.addColorStop(0, 'rgba(52,120,246,0.22)')
  panelGrad.addColorStop(1, 'rgba(128,84,246,0.14)')
  fillRoundRect(ctx, 660, 130, 440, 400, 28, panelGrad)
  ctx.strokeStyle = 'rgba(255,255,255,0.12)'
  ctx.lineWidth = 1.5
  roundRect(ctx, 660, 130, 440, 400, 28)
  ctx.stroke()

  // Ring
  ctx.save()
  ctx.translate(880, 300)
  ctx.rotate(-0.35)
  ctx.strokeStyle = 'rgba(143,174,255,0.85)'
  ctx.lineWidth = 6
  ctx.beginPath()
  ctx.ellipse(0, 0, 190, 64, 0, 0, Math.PI * 2)
  ctx.stroke()
  ctx.strokeStyle = 'rgba(158,123,250,0.7)'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.ellipse(0, 0, 150, 50, 0, 0, Math.PI * 2)
  ctx.stroke()
  ctx.restore()

  // Glass sphere
  const sphere = ctx.createRadialGradient(830, 250, 6, 870, 300, 90)
  sphere.addColorStop(0, 'rgba(255,255,255,0.95)')
  sphere.addColorStop(0.35, 'rgba(94,140,250,0.85)')
  sphere.addColorStop(1, 'rgba(128,84,246,0.15)')
  ctx.fillStyle = sphere
  ctx.beginPath()
  ctx.arc(870, 300, 86, 0, Math.PI * 2)
  ctx.fill()

  // Floating chips
  const chips = [
    { x: 1060, y: 180, label: 'React' },
    { x: 1030, y: 470, label: 'Node.js' },
    { x: 712, y: 470, label: 'Flutter' },
  ]
  ctx.font = '600 16px system-ui, -apple-system, Segoe UI, sans-serif'
  for (const chip of chips) {
    const w = ctx.measureText(chip.label).width + 34
    fillRoundRect(ctx, chip.x - w / 2, chip.y - 18, w, 36, 18, 'rgba(255,255,255,0.12)')
    ctx.fillStyle = '#E2E8F0'
    ctx.fillText(chip.label, chip.x - w / 2 + 17, chip.y)
  }

  // ---- Bottom feature cards ----
  const cardY = 570
  const cardLabels = ['Web Development', 'App Development', 'UI/UX Design']
  cardLabels.forEach((label, index) => {
    const x = 56 + index * 190
    fillRoundRect(ctx, x, cardY, 170, 128, 18, 'rgba(255,255,255,0.055)')
    ctx.strokeStyle = 'rgba(255,255,255,0.1)'
    ctx.lineWidth = 1
    roundRect(ctx, x, cardY, 170, 128, 18)
    ctx.stroke()

    fillRoundRect(ctx, x + 18, cardY + 18, 34, 34, 11, 'rgba(52,120,246,0.35)')
    ctx.fillStyle = '#FFFFFF'
    ctx.font = '600 15px system-ui, -apple-system, Segoe UI, sans-serif'
    ctx.fillText(label, x + 18, cardY + 86)

    ctx.fillStyle = 'rgba(148,163,184,0.8)'
    ctx.font = '400 12px system-ui, -apple-system, Segoe UI, sans-serif'
    ctx.fillText('Design • Build • Support', x + 18, cardY + 108)
  })

  return canvas
}

/** Tall 1:2 screen: a mock mobile application UI. */
function createPhoneScreenCanvas(): HTMLCanvasElement {
  const W = 520
  const H = 1040
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas

  const bg = ctx.createLinearGradient(0, 0, W * 0.6, H)
  bg.addColorStop(0, INK)
  bg.addColorStop(1, INK_SOFT)
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  glow(ctx, W * 0.15, 140, 240, BRAND, 0.5)
  glow(ctx, W * 0.95, H * 0.7, 260, VIOLET, 0.38)

  ctx.textBaseline = 'middle'

  // Status bar
  ctx.fillStyle = 'rgba(226,232,240,0.85)'
  ctx.font = '600 15px system-ui, -apple-system, Segoe UI, sans-serif'
  ctx.fillText('9:41', 40, 44)
  fillRoundRect(ctx, W - 92, 34, 52, 20, 10, 'rgba(226,232,240,0.28)')

  // Header row
  fillRoundRect(ctx, 36, 96, 44, 44, 14, 'rgba(52,120,246,0.3)')
  ctx.fillStyle = '#FFFFFF'
  ctx.font = '700 22px system-ui, -apple-system, Segoe UI, sans-serif'
  ctx.fillText('Neurofix', 96, 118)

  ctx.fillStyle = 'rgba(148,163,184,0.9)'
  ctx.font = '400 15px system-ui, -apple-system, Segoe UI, sans-serif'
  ctx.fillText('Good morning, Shakib', 96, 142)

  // Search field
  fillRoundRect(ctx, 36, 180, W - 72, 52, 16, 'rgba(255,255,255,0.07)')
  ctx.strokeStyle = 'rgba(255,255,255,0.1)'
  ctx.lineWidth = 1
  roundRect(ctx, 36, 180, W - 72, 52, 16)
  ctx.stroke()
  ctx.fillStyle = 'rgba(148,163,184,0.75)'
  ctx.font = '400 16px system-ui, -apple-system, Segoe UI, sans-serif'
  ctx.fillText('Search projects…', 62, 207)

  // Gradient feature banner
  const banner = ctx.createLinearGradient(36, 260, W - 36, 380)
  banner.addColorStop(0, BRAND)
  banner.addColorStop(1, VIOLET)
  fillRoundRect(ctx, 36, 260, W - 72, 128, 22, banner)
  ctx.fillStyle = 'rgba(255,255,255,0.95)'
  ctx.font = '700 22px system-ui, -apple-system, Segoe UI, sans-serif'
  ctx.fillText('Build something', 62, 312)
  ctx.fillText('great today', 62, 342)

  // Stat cards
  const stats = [
    { label: 'Projects', value: '12' },
    { label: 'Active', value: '05' },
  ]
  stats.forEach((stat, index) => {
    const x = 36 + index * ((W - 72) / 2 + 12)
    const w = (W - 84) / 2
    fillRoundRect(ctx, x, 412, w, 104, 20, 'rgba(255,255,255,0.06)')
    ctx.fillStyle = '#FFFFFF'
    ctx.font = '800 30px system-ui, -apple-system, Segoe UI, sans-serif'
    ctx.fillText(stat.value, x + 22, 452)
    ctx.fillStyle = 'rgba(148,163,184,0.9)'
    ctx.font = '500 14px system-ui, -apple-system, Segoe UI, sans-serif'
    ctx.fillText(stat.label, x + 22, 484)
  })

  // List section
  ctx.fillStyle = 'rgba(226,232,240,0.9)'
  ctx.font = '600 17px system-ui, -apple-system, Segoe UI, sans-serif'
  ctx.fillText('Recent activity', 36, 568)

  const rows = ['Website redesign', 'Mobile app release', 'API integration']
  rows.forEach((row, index) => {
    const y = 600 + index * 92
    fillRoundRect(ctx, 36, y, W - 72, 76, 18, 'rgba(255,255,255,0.055)')
    fillRoundRect(ctx, 52, y + 18, 40, 40, 13, index === 0 ? 'rgba(52,120,246,0.45)' : index === 1 ? 'rgba(128,84,246,0.45)' : 'rgba(52,120,246,0.25)')
    ctx.fillStyle = '#E2E8F0'
    ctx.font = '500 15px system-ui, -apple-system, Segoe UI, sans-serif'
    ctx.fillText(row, 108, y + 32)
    ctx.fillStyle = 'rgba(148,163,184,0.75)'
    ctx.font = '400 13px system-ui, -apple-system, Segoe UI, sans-serif'
    ctx.fillText('Updated recently', 108, y + 54)
  })

  // Bottom tab bar
  fillRoundRect(ctx, 36, H - 92, W - 72, 60, 20, 'rgba(255,255,255,0.07)')
  for (let i = 0; i < 4; i++) {
    const cx = 36 + (W - 72) * ((i + 0.5) / 4)
    const active = i === 0
    ctx.fillStyle = active ? 'rgba(94,140,250,0.95)' : 'rgba(148,163,184,0.55)'
    ctx.beginPath()
    ctx.arc(cx, H - 62, active ? 9 : 7, 0, Math.PI * 2)
    ctx.fill()
  }

  return canvas
}

/** Turns a canvas into a ready-to-use, colour-correct Texture. */
function toTexture(canvas: HTMLCanvasElement, anisotropy: number): THREE.CanvasTexture {
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = anisotropy
  texture.generateMipmaps = false
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.needsUpdate = true
  return texture
}

export function createLaptopScreenTexture(anisotropy = 4): THREE.CanvasTexture {
  return toTexture(createLaptopScreenCanvas(), anisotropy)
}

export function createPhoneScreenTexture(anisotropy = 4): THREE.CanvasTexture {
  return toTexture(createPhoneScreenCanvas(), anisotropy)
}
