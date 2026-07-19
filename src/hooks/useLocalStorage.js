import { useState, useCallback } from 'react'
import { getItem, setItem } from '../utils/storage'

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const existing = getItem(key)
    return existing !== null ? existing : initialValue
  })

  const setValue = useCallback((value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value
    setStoredValue(valueToStore)
    setItem(key, valueToStore)
  }, [key, storedValue])

  return [storedValue, setValue]
}
