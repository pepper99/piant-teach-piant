import { createContext, useContext, useEffect, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ProgressContext = createContext(null)

const DEFAULT_SETTINGS = { wordsPerDay: 5, darkMode: false }
const DEFAULT_PROGRESS = {
  completedLessons: {},
  vocabHistory: {},
  dailyExercises: {},
  dailyVocabDate: null,
  currentVocabIds: [],
  settings: DEFAULT_SETTINGS,
  streakData: { currentStreak: 0, lastActiveDate: null },
}

function migrateProgress(raw) {
  return {
    ...DEFAULT_PROGRESS,
    ...raw,
    settings: { ...DEFAULT_SETTINGS, ...(raw.settings || {}) },
    streakData: { ...DEFAULT_PROGRESS.streakData, ...(raw.streakData || {}) },
  }
}

export function ProgressProvider({ children }) {
  const [rawProgress, setProgress] = useLocalStorage('progress', DEFAULT_PROGRESS)
  const progress = useMemo(() => migrateProgress(rawProgress), [rawProgress])

  useEffect(() => {
    if (progress.settings.darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [progress.settings.darkMode])

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
