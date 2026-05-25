import './FilterBar.css'

function FilterBar({ category, status, sort, onCategoryChange, onStatusChange, onSortChange }) {
  return (
    <div className="fb-wrap">
      <div className="fb-group">
        <label className="fb-label">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
          </svg>
          Loại
        </label>
        <select className="fb-select" value={category} onChange={(e) => onCategoryChange(e.target.value)}>
          <option value="all">Tất cả</option>
          <option value="Rau củ">Rau củ</option>
          <option value="Đồ uống">Đồ uống</option>
          <option value="Bánh kẹo">Bánh kẹo</option>
          <option value="Gia vị">Gia vị</option>
          <option value="Khác">Khác</option>
        </select>
      </div>

      <div className="fb-group">
        <label className="fb-label">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          Trạng thái
        </label>
        <select className="fb-select" value={status} onChange={(e) => onStatusChange(e.target.value)}>
          <option value="all">Tất cả</option>
          <option value="Còn hàng">Còn hàng</option>
          <option value="Hết hàng">Hết hàng</option>
        </select>
      </div>

      <div className="fb-group">
        <label className="fb-label">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
            <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
            <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
          </svg>
          Sắp xếp
        </label>
        <select className="fb-select" value={sort} onChange={(e) => onSortChange(e.target.value)}>
          <option value="default">Mặc định</option>
          <option value="name-asc">Tên A → Z</option>
          <option value="name-desc">Tên Z → A</option>
          <option value="price-asc">Giá tăng dần</option>
          <option value="price-desc">Giá giảm dần</option>
          <option value="expiry-asc">Hạn sớm nhất</option>
        </select>
      </div>
    </div>
  )
}

export default FilterBar
