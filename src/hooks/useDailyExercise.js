import { useMemo, useCallback } from 'react'
import exercises from '../data/exercises.json'
import { pickRandom, getTodayDate } from '../utils/helpers'

export default function useDailyExercise(progress, updateProgress) {
  const today = getTodayDate()
  const dailyRecord = progress.dailyExercises?.[today]

  const isDone = !!dailyRecord?.completed

  const todaysExercise = useMemo(() => {
    if (isDone) return dailyRecord?.exercises || []
    const lessonIds = Object.keys(progress.completedLessons || {})
    let available = exercises
    if (lessonIds.length > 0) {
      available = exercises.filter(e => lessonIds.includes(e.lessonId))
    }
    return pickRandom(available, 5)
  }, [today, progress.completedLessons, isDone])

  const completeExercise = useCallback((score, answeredExercises) => {
    const daily = { ...(progress.dailyExercises || {}), [today]: { completed: true, score, exercises: answeredExercises } }
    updateProgress({ dailyExercises: daily })
  }, [progress, updateProgress, today])

  return { todaysExercise, isDone, completeExercise }
}
