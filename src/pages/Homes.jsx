import { useContext, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FoodContext } from '../context/FoodContext'
import FoodCard from '../components/FoodCard'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import StatsCard from '../components/StatsCard'
import CardDeckGallery from '../components/CardDeckGallery'
import { getExpiryDays, isSoonExpiry, isExpired } from '../untils/expiry'
import './Homes.css'

function Home() {
  const { foods, deleteFood } = useContext(FoodContext)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [status, setStatus] = useState('all')
  const [sort, setSort] = useState('default')

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400)
    return () => clearTimeout(timer)
  }, [search])

  const filteredFoods = useMemo(() => {
    return foods
      .filter((item) => {
        const matchSearch =
          item.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          item.brand.toLowerCase().includes(debouncedSearch.toLowerCase())
        const matchCategory = category === 'all' || item.category === category
        const matchStatus   = status === 'all'   || item.status === status
        return matchSearch && matchCategory && matchStatus
      })
      .sort((a, b) => {
        if (sort === 'name-asc')    return a.name.localeCompare(b.name)
        if (sort === 'name-desc')   return b.name.localeCompare(a.name)
        if (sort === 'price-asc')   return a.price - b.price
        if (sort === 'price-desc')  return b.price - a.price
        if (sort === 'expiry-asc')  return getExpiryDays(a.expiryDate) - getExpiryDays(b.expiryDate)
        return 0
      })
  }, [foods, debouncedSearch, category, status, sort])

  const stats = useMemo(() => {
    const totalValue = foods.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const soonQty    = foods.filter(item => { const d = getExpiryDays(item.expiryDate); return isSoonExpiry(d) && !isExpired(d) }).length
    const expiredQty = foods.filter(item => isExpired(getExpiryDays(item.expiryDate))).length
    return { totalCount: foods.length, totalValue, soonQty, expiredQty }
  }, [foods])

  return (
    <div className="home-page">
      {/* ── Hero: Card Deck Gallery ── */}
      <section className="home-hero">
        <CardDeckGallery />

        {/* Hero text overlay */}
        <div className="home-hero__text">
          <div className="home-hero__pill">
            <span className="home-hero__dot" />
            Hệ thống quản lý thực phẩm
          </div>
          <h1 className="home-hero__title">
            Kiểm soát kho hàng<br/>
            <span className="home-hero__title--accent">thông minh & hiện đại</span>
          </h1>
          <p className="home-hero__sub">
            Theo dõi hàng tồn kho, hạn sử dụng và giá trị kho hàng trong thời gian thực.
          </p>
          <div className="home-hero__actions">
            <Link to="/add" className="home-hero__cta">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Thêm sản phẩm mới
            </Link>
            <a href="#products" className="home-hero__ghost">
              Xem kho hàng
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="home-stats">
        <div className="home-stats__inner">
          <StatsCard
            title="Tổng sản phẩm"
            value={stats.totalCount}
            description="Số lượng tất cả sản phẩm"
            variant="primary"
            icon="box"
          />
          <StatsCard
            title="Giá trị tồn kho"
            value={`${stats.totalValue.toLocaleString()} ₫`}
            description="Tổng giá trị hàng tồn"
            variant="success"
            icon="currency"
          />
          <StatsCard
            title="Sắp hết hạn"
            value={stats.soonQty}
            description="Sản phẩm trong 7 ngày tới"
            variant="warning"
            icon="clock"
          />
          <StatsCard
            title="Đã hết hạn"
            value={stats.expiredQty}
            description="Sản phẩm không còn dùng"
            variant="danger"
            icon="alert"
          />
        </div>
      </section>

      <hr className="home-divider" />

      {/* ── Product list ── */}
      <section className="home-products" id="products">
        <div className="home-products__inner">

          {/* Section header */}
          <div className="home-products__header">
            <div>
              <h2 className="home-products__title">Kho thực phẩm</h2>
              <p className="home-products__sub">{filteredFoods.length} sản phẩm · Cập nhật theo thời gian thực</p>
            </div>
            <Link to="/add" className="home-products__add">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Thêm mới
            </Link>
          </div>

          {/* Search & Filter */}
          <div className="home-filters">
            <SearchBar value={search} onChange={setSearch} />
            <FilterBar
              category={category} status={status} sort={sort}
              onCategoryChange={setCategory} onStatusChange={setStatus} onSortChange={setSort}
            />
          </div>

          {/* Grid */}
          {filteredFoods.length === 0 ? (
            <div className="home-empty">
              <div className="home-empty__icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <p className="home-empty__title">Không tìm thấy sản phẩm</p>
              <p className="home-empty__sub">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            </div>
          ) : (
            <div className="home-grid">
              {filteredFoods.map((food, i) => (
                <div
                  key={food.id}
                  className="home-grid__item"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <FoodCard food={food} onDelete={() => deleteFood(food.id)} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home