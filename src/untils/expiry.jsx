export const getExpiryDays = (expiryDate) => {
  if (!expiryDate) return Infinity
  const expiry = new Date(`${expiryDate}T00:00:00`)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diff = expiry.getTime() - today.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export const isSoonExpiry = (days) => days >= 0 && days <= 7
export const isExpired = (days) => days < 0
