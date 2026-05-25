export const loadStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch (error) {
    console.warn('Không thể đọc LocalStorage:', error)
    return fallback
  }
}

export const saveStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.warn('Không thể ghi LocalStorage:', error)
  }
}
