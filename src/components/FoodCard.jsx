import { Link } from 'react-router-dom'
import { getExpiryDays, isExpired, isSoonExpiry } from '../untils/expiry'
import './FoodCard.css'

function FoodCard({ food, onDelete }) {
  const expiryDays = getExpiryDays(food.expiryDate)
  const expired = isExpired(expiryDays)
  const soonExpiry = isSoonExpiry(expiryDays)

  let statusLabel = 'Còn hạn'
  let statusClass = 'fc-badge--green'
  if (expired) {
    statusLabel = 'Hết hạn'
    statusClass = 'fc-badge--red'
  } else if (soonExpiry) {
    statusLabel = `Còn ${expiryDays} ngày`
    statusClass = 'fc-badge--yellow'
  }

  return (
    <div className={`fc-card ${expired ? 'fc-card--expired' : ''}`}>
      {/* Image */}
      <div className="fc-img-wrap">
        <img src={food.image} alt={food.name} className="fc-img" />
        <div className="fc-img-overlay" />
        {/* Category pill */}
        <span className="fc-category">{food.category}</span>
        {/* Expiry badge */}
        <span className={`fc-badge ${statusClass}`}>{statusLabel}</span>
      </div>

      {/* Body */}
      <div className="fc-body">
        <div className="fc-top">
          <h3 className="fc-name">{food.name}</h3>
          <p className="fc-brand">{food.brand}</p>
        </div>

        <div className="fc-meta">
          <div className="fc-meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span>{food.expiryDate}</span>
          </div>
          <div className="fc-meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            <span>SL: {food.quantity} {food.unit}</span>
          </div>
        </div>

        <div className="fc-divider" />

        <div className="fc-footer">
          <div className="fc-price-wrap">
            <p className="fc-price">{food.price.toLocaleString()}<span>₫</span></p>
            <span className={`fc-stock-badge ${food.status === 'Còn hàng' ? 'fc-stock--in' : 'fc-stock--out'}`}>
              {food.status}
            </span>
          </div>

          <div className="fc-actions">
            <Link to={`/detail/${food.id}`} className="fc-btn fc-btn--primary" title="Xem chi tiết">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </Link>
            <Link to={`/edit/${food.id}`} className="fc-btn fc-btn--ghost" title="Chỉnh sửa">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </Link>
            <button type="button" className="fc-btn fc-btn--danger" onClick={onDelete} title="Xóa">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6"/><path d="M14 11v6"/>
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodCard