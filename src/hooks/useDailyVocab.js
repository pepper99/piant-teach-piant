import { useMemo, useCallback } from 'react'
import vocabulary from '../data/vocabulary.json'
import { pickRandom, getTodayDate } from '../utils/helpers'

export default function useDailyVocab(wordsPerDay, progress, updateProgress) {
  const today = getTodayDate()
  const lastVocabDate = progress.dailyVocabDate
  const currentIds = progress.currentVocabIds || []

  const needsNewSet = lastVocabDate !== today || currentIds.length === 0

  const todaysWords = useMemo(() => {
    if (needsNewSet) {
      const lessonIds = Object.keys(progress.completedLessons || {})
      let eligible = vocabulary
      if (lessonIds.length > 0) {
        eligible = vocabulary.filter(w => lessonIds.includes(w.lessonId))
      }
      if (eligible.length === 0) eligible = vocabulary
      const picked = pickRandom(eligible, wordsPerDay)
      return picked
    }
    return vocabulary.filter(w => currentIds.includes(w.id))
  }, [today, wordsPerDay, progress.completedLessons])

  const markKnown = useCallback((wordId) => {
    const history = progress.vocabHistory || {}
    updateProgress({
      vocabHistory: {
        ...history,
        [wordId]: { ...history[wordId], known: true, reviewCount: (history[wordId]?.reviewCount || 0) + 1, lastSeen: today }
      }
    })
  }, [progress, updateProgress, today])

  const markUnknown = useCallback((wordId) => {
    const history = progress.vocabHistory || {}
    updateProgress({
      vocabHistory: {
        ...history,
        [wordId]: { ...history[wordId], known: false, reviewCount: (history[wordId]?.reviewCount || 0) + 1, lastSeen: today }
      }
    })
  }, [progress, updateProgress, today])

  const knownCount = Object.values(progress.vocabHistory || {}).filter(v => v.known).length

  return { todaysWords, markKnown, markUnknown, stats: { knownCount, totalSeen: Object.keys(progress.vocabHistory || {}).length } }
}
