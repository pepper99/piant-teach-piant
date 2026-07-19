import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ProgressContext = createContext(null)

const DEFAULT_SETTINGS = { wordsPerDay: 5 }
const DEFAULT_PROGRESS = {
  completedLessons: {},
  vocabHistory: {},
  dailyExercises: {},
  dailyVocabDate: null,
  currentVocabIds: [],
  settings: DEFAULT_SETTINGS,
  streakData: { currentStreak: 0, lastActiveDate: null },
}

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useLocalStorage('progress', DEFAULT_PROGRESS)

  const updateProgress = (updates) => {
    setProgress(prev => ({ ...prev, ...updates }))
  }

  const updateLessonProgress = (lessonId, score) => {
    const existing = progress.completedLessons[lessonId]
    const bestScore = existing ? Math.max(existing, score) : score
    updateProgress({
      completedLessons: { ...progress.completedLessons, [lessonId]: bestScore },
    })
  }

  const updateSettings = (newSettings) => {
    updateProgress({ settings: { ...progress.settings, ...newSettings } })
  }

  const resetAll = () => {
    setProgress(DEFAULT_PROGRESS)
  }

  return (
    <ProgressContext.Provider value={{ progress, updateProgress, updateLessonProgress, updateSettings, resetAll }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
