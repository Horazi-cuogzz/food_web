import { useEffect, useRef, useState } from 'react'
import MotionFooter from './MotionFooter'
import './CardDeckGallery.css'

const cards = [
  {
    id: 1,
    image: '/card_milk.png',
    label: 'Sữa Tươi Vinamilk',
    sub: 'Dairy Premium · 100% Nguyên chất sạch tự nhiên',
    price: '35.000 ₫',
    cta: 'Xem nguồn gốc',
    color: '#f5a623',
    glow: 'rgba(245,166,35,0.3)',
  },
  {
    id: 2,
    image: '/card_tomato.png',
    label: 'Cà Chua Hữu Cơ',
    sub: 'Organic Vegetables · Đạt tiêu chuẩn chất lượng cao',
    price: '18.000 ₫',
    cta: 'Xem chứng nhận',
    color: '#e74c3c',
    glow: 'rgba(231,76,60,0.3)',
  },
  {
    id: 3,
    image: '/card_cookies.png',
    label: 'Bánh Quy Bơ Giòn',
    sub: 'Artisan Bakery · Công thức Pháp thượng hạng',
    price: '45.000 ₫',
    cta: 'Khám phá vị bánh',
    color: '#d4a843',
    glow: 'rgba(212,168,67,0.3)',
  },
  {
    id: 4,
    image: '/card_orange.png',
    label: 'Nước Cam Ép Tươi',
    sub: 'Fresh Juice · 100% Vitamin C tự nhiên từ vườn',
    price: '27.000 ₫',
    cta: 'Xem quy trình ép',
    color: '#e67e22',
    glow: 'rgba(230,126,34,0.3)',
  },
  {
    id: 5,
    image: '/card_veggie.png',
    label: 'Rau Xanh Hỗn Hợp',
    sub: 'Green Harvest · Thu hoạch hữu cơ buổi sáng',
    price: '15.000 ₫',
    cta: 'Kiểm tra độ tươi',
    color: '#27ae60',
    glow: 'rgba(39,174,96,0.3)',
  },
  {
    id: 6,
    image: '/card_sushi.png',
    label: 'Sushi Premium',
    sub: 'Premium Quality · Nguyên liệu nhập khẩu tươi sống',
    price: 'Thượng hạng',
    cta: 'Khám phá ngay',
    color: '#8e44ad',
    glow: 'rgba(142,68,173,0.3)',
  },
]

export default function CardDeckGallery() {
  const containerRef = useRef(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const handleMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      setMouse({ x, y })
    }
    const el = containerRef.current
    el?.addEventListener('mousemove', handleMove)
    return () => el?.removeEventListener('mousemove', handleMove)
  }, [])

  // Layer configs: translateX, translateY, translateZ, rotateX, rotateY, rotateZ, scale, animClass
  const layers = [
    { tx: -260, ty: 60,  tz: -180, rx: 12,  ry: -18, rz: -8,  scale: 0.82, anim: 'float-a', delay: '0s' },
    { tx:  200, ty: -80, tz: -140, rx: -10, ry: 14,  rz:  6,  scale: 0.86, anim: 'float-b', delay: '0.8s' },
    { tx: -120, ty: -100,tz: -80,  rx: 8,   ry: -10, rz: -4,  scale: 0.90, anim: 'float-c', delay: '1.4s' },
    { tx:  160, ty:  90, tz: -60,  rx: -6,  ry: 12,  rz:  3,  scale: 0.92, anim: 'float-a', delay: '2s' },
    { tx: -60,  ty:  50, tz: -30,  rx: 4,   ry: -8,  rz: -2,  scale: 0.96, anim: 'float-b', delay: '0.4s' },
    { tx:  20,  ty: -20, tz:  0,   rx: 0,   ry: 0,   rz:  0,  scale: 1.00, anim: 'float-hero', delay: '0s' },
  ]

  // Determine active card for the premium bottom panel
  const activeCard = cards.find((c) => c.id === hovered) || cards[5]

  return (
    <div className="cdg-wrapper" ref={containerRef}>
      {/* Background ambient orbs */}
      <div className="cdg-orb cdg-orb-1" />
      <div className="cdg-orb cdg-orb-2" />
      <div className="cdg-orb cdg-orb-3" />

      {/* Particle grid */}
      <div className="cdg-grid" />

      {/* Scene */}
      <div className="cdg-scene">
        {cards.map((card, i) => {
          const l = layers[i]
          const isHero = i === 5
          const isHov = hovered === card.id
          const parallaxX = mouse.x * (isHero ? 12 : 6 - i * 0.6)
          const parallaxY = mouse.y * (isHero ? 8 : 4 - i * 0.4)

          return (
            <div
              key={card.id}
              className={`cdg-card ${l.anim} ${isHero ? 'cdg-card--hero' : ''} ${isHov ? 'cdg-card--hov' : ''}`}
              style={{
                '--tx': `${l.tx + parallaxX}px`,
                '--ty': `${l.ty + parallaxY}px`,
                '--tz': `${l.tz}px`,
                '--rx': `${l.rx}deg`,
                '--ry': `${l.ry}deg`,
                '--rz': `${l.rz}deg`,
                '--sc': l.scale,
                '--glow': card.glow,
                '--accent': card.color,
                animationDelay: l.delay,
                zIndex: i + 1,
              }}
              onMouseEnter={() => setHovered(card.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Glass overlay */}
              <div className="cdg-card__glass" />

              {/* Image */}
              <img
                className="cdg-card__img"
                src={card.image}
                alt={card.label}
                draggable={false}
              />

              {/* Glow ring */}
              <div className="cdg-card__glow-ring" />

              {/* Shine sweep */}
              <div className="cdg-card__shine" />

              {/* Label */}
              <div className="cdg-card__label">
                <div className="cdg-card__dot" />
                <div>
                  <p className="cdg-card__name">{card.label}</p>
                  <p className="cdg-card__sub">{card.sub}</p>
                </div>
              </div>

              {/* Corner accent */}
              <div className="cdg-card__corner-tl" />
              <div className="cdg-card__corner-br" />
            </div>
          )
        })}
      </div>

      {/* Premium Animated Bottom Panel Layout */}
      <div className="cdg-footer-wrapper">
        <MotionFooter
          title={activeCard.label}
          subtitle={activeCard.sub}
          price={activeCard.price}
          cta={activeCard.cta}
          accent={activeCard.color}
          onClick={() => console.log('Navigating to', activeCard.label)}
        />
      </div>
    </div>
  )
}
