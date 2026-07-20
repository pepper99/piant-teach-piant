import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useDailyExercise from '../useDailyExercise'

const mockExercises = vi.hoisted(() => [
  { id: 'e1', lessonId: 'l1', question: 'Q1' },
  { id: 'e2', lessonId: 'l1', question: 'Q2' },
  { id: 'e3', lessonId: 'l2', question: 'Q3' },
])

const mockLessons = vi.hoisted(() => [
  { id: 'l1', grade: 'p5' },
  { id: 'l2', grade: 'p5' },
])

vi.mock('../../data/exercises.json', () => ({ default: mockExercises }))
vi.mock('../../data/lessons.json', () => ({ default: mockLessons }))

describe('useDailyExercise', () => {
  it('returns exercises when not done', () => {
    const { result } = renderHook(() =>
      useDailyExercise({ dailyExercises: {}, completedLessons: { l1: 80 } }, vi.fn())
    )
    expect(result.current.todaysExercise).toHaveLength(2)
    expect(result.current.isDone).toBe(false)
  })

  it('marks as done after completeExercise', () => {
    const updateMock = vi.fn()
    const { result } = renderHook(() =>
      useDailyExercise({ dailyExercises: {}, completedLessons: {} }, updateMock)
    )
    act(() => { result.current.completeExercise(4, []) })
    expect(updateMock).toHaveBeenCalled()
  })

  it('returns isDone=true when already completed today', () => {
    const today = new Date().toISOString().split('T')[0]
    const { result } = renderHook(() =>
      useDailyExercise(
        { dailyExercises: { [today]: { completed: true, score: 5, exercises: [] } }, completedLessons: {} },
        vi.fn()
      )
    )
    expect(result.current.isDone).toBe(true)
  })
})
