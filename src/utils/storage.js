const PREFIX = 'piant_'

export function getItem(key) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(PREFIX + key)
  } catch {
  }
}
