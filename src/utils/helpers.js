export function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const k = item[key]
    if (!acc[k]) acc[k] = []
    acc[k].push(item)
    return acc
  }, {})
}

export function getTodayDate() {
  return new Date().toISOString().split('T')[0]
}

export function pickRandom(arr, n) {
  const shuffled = shuffleArray(arr)
  return shuffled.slice(0, Math.min(n, arr.length))
}
