export const useSimpleCache = () => {
  const CACHE_EXPIRY_MS = 5 * 60 * 1000 // 5分钟

  const getCache = <T>(key: string): T | null => {
    // import.meta.server is the Nuxt 3 way to check for server-side
    // However, to be safe and standard across potential environments or older checks:
    if (import.meta.server || typeof window === 'undefined') return null
    try {
      const cached = localStorage.getItem(key)
      if (!cached) return null
      const { data, expiry } = JSON.parse(cached)
      if (Date.now() > expiry) {
        localStorage.removeItem(key)
        return null
      }
      return data as T
    } catch {
      return null
    }
  }

  const setCache = <T>(key: string, data: T): void => {
    if (import.meta.server || typeof window === 'undefined') return
    try {
      localStorage.setItem(key, JSON.stringify({
        data,
        expiry: Date.now() + CACHE_EXPIRY_MS
      }))
    } catch {
      // ignore quota exceeded or other errors
    }
  }

  return { getCache, setCache }
}
