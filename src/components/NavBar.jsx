import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './NavBar.css'

function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar-dark-luxury ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <NavLink to="/" className="navbar-logo">
          <span className="navbar-logo__icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                fill="url(#logoGrad)" />
              <circle cx="12" cy="9" r="2.5" fill="#000" opacity="0.6"/>
              <defs>
                <linearGradient id="logoGrad" x1="5" y1="2" x2="19" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#34d399"/>
                  <stop offset="1" stopColor="#10b981"/>
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="navbar-logo__text">
            <span className="navbar-logo__main">FoodVault</span>
            <span className="navbar-logo__sub">Quản lý thực phẩm</span>
          </span>
        </NavLink>

        {/* Desktop nav */}
        <ul className="navbar-links">
          <li>
            <NavLink end className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'} to="/">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Trang chủ
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'} to="/add">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="16"/>
                <line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
              Thêm mới
            </NavLink>
          </li>
        </ul>

        {/* Add button */}
        <NavLink to="/add" className="navbar-cta">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Thêm sản phẩm
        </NavLink>

        {/* Mobile toggle */}
        <button className={`navbar-burger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`navbar-mobile-menu ${menuOpen ? 'navbar-mobile-menu--open' : ''}`}>
        <NavLink end to="/" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'mobile-link mobile-link--active' : 'mobile-link'}>
          Trang chủ
        </NavLink>
        <NavLink to="/add" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'mobile-link mobile-link--active' : 'mobile-link'}>
          Thêm mới
        </NavLink>
      </div>
    </nav>
  )
}

export default NavBar
