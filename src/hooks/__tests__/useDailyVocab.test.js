import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useDailyVocab from '../useDailyVocab'

const mockVocab = vi.hoisted(() => [
  { id: 'v1', word: 'hello', lessonId: 'l1' },
  { id: 'v2', word: 'world', lessonId: 'l1' },
  { id: 'v3', word: 'cat', lessonId: 'l2' },
])

const mockLessons = vi.hoisted(() => [
  { id: 'l1', grade: 'p5' },
  { id: 'l2', grade: 'p5' },
])

vi.mock('../../data/vocabulary.json', () => ({ default: mockVocab }))
vi.mock('../../data/lessons.json', () => ({ default: mockLessons }))

describe('useDailyVocab', () => {
  const baseProgress = {
    dailyVocabDate: null,
    currentVocabIds: [],
    completedLessons: {},
    vocabHistory: {},
  }

  it('returns words when no lessons completed', () => {
    const { result } = renderHook(() =>
      useDailyVocab(2, baseProgress, vi.fn())
    )
    expect(result.current.todaysWords).toHaveLength(2)
  })

  it('markKnown updates vocab history', () => {
    const updateMock = vi.fn()
    const { result } = renderHook(() =>
      useDailyVocab(2, baseProgress, updateMock)
    )
    act(() => { result.current.markKnown('v1') })
    expect(updateMock).toHaveBeenCalled()
    const arg = updateMock.mock.calls[0][0]
    expect(arg.vocabHistory.v1.known).toBe(true)
  })
})
