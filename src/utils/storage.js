export const storageGet = (key, fallback = null) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export const storageSet = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

export const storageRemove = (key) => {
  try {
    localStorage.removeItem(key)
  } catch {}
}


