import './SearchBar.css'

function SearchBar({ value, onChange }) {
  return (
    <div className="sb-wrap">
      <span className="sb-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </span>
      <input
        type="text"
        className="sb-input"
        placeholder="Tìm theo tên, thương hiệu..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className="sb-clear" onClick={() => onChange('')} type="button">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      )}
    </div>
  )
}

export default SearchBar
