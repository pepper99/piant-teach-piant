import { describe, it, expect } from 'vitest'
import { shuffleArray, groupBy, getTodayDate, pickRandom } from '../helpers'

describe('shuffleArray', () => {
  it('returns array of same length', () => {
    const arr = [1, 2, 3, 4, 5]
    expect(shuffleArray(arr)).toHaveLength(5)
  })

  it('does not mutate original', () => {
    const arr = [1, 2, 3]
    const copy = [...arr]
    shuffleArray(arr)
    expect(arr).toEqual(copy)
  })

  it('contains same elements', () => {
    const arr = [1, 2, 3, 4, 5]
    expect(shuffleArray(arr).sort()).toEqual(arr.sort())
  })
})

describe('groupBy', () => {
  const items = [
    { type: 'a', val: 1 },
    { type: 'b', val: 2 },
    { type: 'a', val: 3 },
  ]

  it('groups by given key', () => {
    const result = groupBy(items, 'type')
    expect(result.a).toHaveLength(2)
    expect(result.b).toHaveLength(1)
  })
})

describe('getTodayDate', () => {
  it('returns YYYY-MM-DD format', () => {
    expect(getTodayDate()).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})

describe('pickRandom', () => {
  it('returns n items', () => {
    const arr = [1, 2, 3, 4, 5]
    expect(pickRandom(arr, 3)).toHaveLength(3)
  })

  it('returns all items if n > length', () => {
    const arr = [1, 2]
    expect(pickRandom(arr, 5)).toHaveLength(2)
  })
})
