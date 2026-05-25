import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import './MotionFooter.css'

/* ─── Easing curve ─── */
const EASE = [0.22, 1, 0.36, 1]

/* ─── Framer Motion Variants ─── */
const panelVariants = {
  rest:  { y: 0,  transition: { duration: 0.55, ease: EASE } },
  hover: { y: -4, transition: { duration: 0.55, ease: EASE } },
}

const titleVariants = {
  rest:  { y: 0,  transition: { duration: 0.5, ease: EASE } },
  hover: { y: -10, transition: { duration: 0.5, ease: EASE } },
}

const subtitleVariants = {
  rest:  { y: 22, opacity: 0, filter: 'blur(4px)', transition: { duration: 0.45, ease: EASE } },
  hover: { y: 0,  opacity: 1, filter: 'blur(0px)', transition: { duration: 0.55, ease: EASE, delay: 0.06 } },
}

const ctaVariants = {
  rest:  { y: 14, opacity: 0, filter: 'blur(3px)', transition: { duration: 0.4, ease: EASE } },
  hover: { y: 0,  opacity: 1, filter: 'blur(0px)', transition: { duration: 0.55, ease: EASE, delay: 0.14 } },
}

const arrowVariants = {
  rest:  { x: 0,  transition: { duration: 0.4, ease: EASE } },
  hover: { x: 5,  transition: { duration: 0.4, ease: EASE, delay: 0.18 } },
}

const priceVariants = {
  rest:  { scale: 1,   opacity: 1, transition: { duration: 0.4, ease: EASE } },
  hover: { scale: 1.04, opacity: 0.9, transition: { duration: 0.45, ease: EASE } },
}

const glowVariants = {
  rest:  { opacity: 0,   transition: { duration: 0.4 } },
  hover: { opacity: 1,   transition: { duration: 0.4 } },
}

const borderVariants = {
  rest:  { opacity: 0.5, transition: { duration: 0.4 } },
  hover: { opacity: 1,   transition: { duration: 0.4 } },
}

/**
 * MotionFooter — Premium animated bottom panel
 * Props: title, subtitle, price, cta, accent, onClick
 */
export default function MotionFooter({
  title    = 'Premium Item',
  subtitle = 'Luxury Collection',
  price    = '₫59.000',
  cta      = 'Xem chi tiết',
  accent   = '#10b981',
  onClick,
}) {
  const ctaRef = useRef(null)

  /* Magnetic CTA effect */
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 300, damping: 28 })
  const sy = useSpring(my, { stiffness: 300, damping: 28 })

  const handleCtaMove = (e) => {
    const rect = ctaRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width  / 2
    const cy = rect.top  + rect.height / 2
    mx.set((e.clientX - cx) * 0.22)
    my.set((e.clientY - cy) * 0.22)
  }
  const handleCtaLeave = () => { mx.set(0); my.set(0) }

  return (
    <motion.div
      className="mf-panel"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Ambient glow on hover */}
      <motion.div
        className="mf-glow"
        variants={glowVariants}
        style={{ '--accent': accent }}
      />

      {/* Top border accent */}
      <motion.div className="mf-border-accent" variants={borderVariants} style={{ '--accent': accent }} />

      {/* Panel lift */}
      <motion.div className="mf-inner" variants={panelVariants}>

        {/* Row 1: Title + Price */}
        <div className="mf-row mf-row--main">
          {/* Title */}
          <motion.div className="mf-title-wrap" variants={titleVariants}>
            <h3 className="mf-title">{title}</h3>
          </motion.div>

          {/* Price */}
          <motion.div className="mf-price-wrap" variants={priceVariants}>
            <span className="mf-price" style={{ color: accent }}>{price}</span>
          </motion.div>
        </div>

        {/* Row 2: Subtitle (masked reveal) */}
        <div className="mf-reveal-mask">
          <motion.p className="mf-subtitle" variants={subtitleVariants}>
            {subtitle}
          </motion.p>
        </div>

        {/* Row 3: CTA */}
        <div className="mf-reveal-mask">
          <motion.div className="mf-cta-wrap" variants={ctaVariants}>
            <motion.button
              ref={ctaRef}
              className="mf-cta"
              style={{ x: sx, y: sy, '--accent': accent }}
              onMouseMove={handleCtaMove}
              onMouseLeave={handleCtaLeave}
              onClick={onClick}
            >
              <span className="mf-cta-text">{cta}</span>
              <motion.span className="mf-arrow" variants={arrowVariants}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </motion.span>
            </motion.button>
          </motion.div>
        </div>

      </motion.div>
    </motion.div>
  )
}
