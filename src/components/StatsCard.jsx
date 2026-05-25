import './StatsCard.css'

const ICONS = {
  box: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
  currency: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  clock: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  alert: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  )
}

const VARIANT_MAP = {
  primary: { cls: 'sc--primary', label: 'Total' },
  success: { cls: 'sc--success', label: 'Value' },
  warning: { cls: 'sc--warning', label: 'Soon' },
  danger:  { cls: 'sc--danger',  label: 'Expired' },
}

function StatsCard({ title, value, description, variant = 'primary', icon = 'box' }) {
  const v = VARIANT_MAP[variant] || VARIANT_MAP.primary
  return (
    <div className={`sc-card ${v.cls}`}>
      <div className="sc-icon-wrap">
        {ICONS[icon] || ICONS.box}
      </div>
      <div className="sc-body">
        <p className="sc-title">{title}</p>
        <p className="sc-value">{value}</p>
        <p className="sc-desc">{description}</p>
      </div>
      <div className="sc-glow" />
    </div>
  )
}

export default StatsCard
