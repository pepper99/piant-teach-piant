import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useLocalStorage from '../useLocalStorage'

const localStorageMock = (() => {
  let store = {}
  return {
    getItem: vi.fn((key) => store[key] ?? null),
    setItem: vi.fn((key, value) => { store[key] = value }),
    removeItem: vi.fn((key) => { delete store[key] }),
    clear: vi.fn(() => { store = {} }),
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  it('returns initial value when nothing stored', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'hello'))
    expect(result.current[0]).toBe('hello')
  })

  it('updates stored value', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'hello'))
    act(() => { result.current[1]('world') })
    expect(result.current[0]).toBe('world')
  })
})
