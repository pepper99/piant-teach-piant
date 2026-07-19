# English Teaching Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a React SPA for teaching English (grammar, vocab, reading, writing, conversation) to Thai upper-elementary to middle-school students.

**Architecture:** Single-page React app with client-side routing, static JSON data files, and localStorage-based progress tracking. No backend. All content in Thai UI language.

**Tech Stack:** React 18, Vite, Tailwind CSS, React Router v6, Vitest + React Testing Library

## Global Constraints
- No backend or external API calls — fully offline-capable
- All UI text in Thai
- Responsive (mobile + desktop)
- localStorage for all user data
- Static JSON for all content data

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.js`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/index.css`
- Create: `vitest.config.js`
- Create: `src/setupTests.js`

**Interfaces:**
- Consumes: nothing (task bootstraps the project)
- Produces: runnable Vite dev server with Tailwind, React Router, and Vitest wired up

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "piant-teach-piant",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.4.8",
    "autoprefixer": "^10.4.20",
    "jsdom": "^24.1.1",
    "postcss": "^8.4.41",
    "tailwindcss": "^3.4.9",
    "vite": "^5.4.2",
    "vitest": "^2.0.5"
  }
}
```

- [ ] **Step 2: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="th">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Piant - เรียนภาษาอังกฤษ</title>
  </head>
  <body class="bg-gray-50 text-gray-900">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Create `vite.config.js`**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

- [ ] **Step 4: Create `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- [ ] **Step 5: Create `postcss.config.js`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 6: Create `vitest.config.js`**

```js
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    globals: true,
  },
})
```

- [ ] **Step 7: Create `src/setupTests.js`**

```js
import '@testing-library/jest-dom'
```

- [ ] **Step 8: Create `src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 9: Create `src/main.jsx`**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

- [ ] **Step 10: Create `src/App.jsx`**

```jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Lessons from './pages/Lessons'
import LessonDetail from './pages/LessonDetail'
import DailyExercise from './pages/DailyExercise'
import Vocabulary from './pages/Vocabulary'
import Progress from './pages/Progress'
import Settings from './pages/Settings'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/lessons/:id" element={<LessonDetail />} />
        <Route path="/exercises/daily" element={<DailyExercise />} />
        <Route path="/vocabulary" element={<Vocabulary />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
```

- [ ] **Step 11: Install dependencies**

Run: `npm install`
Expected: node_modules created, no errors

- [ ] **Step 12: Verify project runs**

Run: `npm run dev`
Expected: Vite dev server starts without errors (Ctrl+C to stop)

- [ ] **Step 13: Verify tests run**

Run: `npm test`
Expected: No test files yet — exits with "No test files found" (not a failure)

---

### Task 2: Data Files + Utilities

**Files:**
- Create: `src/data/lessons.json`
- Create: `src/data/vocabulary.json`
- Create: `src/data/exercises.json`
- Create: `src/utils/storage.js`
- Create: `src/utils/helpers.js`
- Create: `src/utils/__tests__/helpers.test.js`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `lessons.json` — array of lesson objects
  - `vocabulary.json` — array of word objects
  - `exercises.json` — array of exercise objects
  - `storage.js` — exports: `getItem(key)`, `setItem(key, value)`, `removeItem(key)`
  - `helpers.js` — exports: `shuffleArray(arr)`, `groupBy(arr, key)`, `getTodayDate()`, `pickRandom(arr, n)`

- [ ] **Step 1: Create `src/utils/storage.js`**

```js
const PREFIX = 'piant_'

export function getItem(key) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // localStorage full or unavailable — silently fail
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(PREFIX + key)
  } catch {
    // silently fail
  }
}
```

- [ ] **Step 2: Create `src/utils/helpers.js`**

```js
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
```

- [ ] **Step 3: Write tests for helpers**

Create `src/utils/__tests__/helpers.test.js`:

```js
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
```

- [ ] **Step 4: Run tests**

Run: `npm test`
Expected: all 7 tests pass

- [ ] **Step 5: Create `src/data/lessons.json` (sample data)**

```json
[
  {
    "id": "grammar-p5-001",
    "title": "Present Simple Tense",
    "grade": "p5",
    "gradeLabel": "ป.5",
    "topics": ["grammar"],
    "content": [
      {
        "type": "text",
        "body": "Present Simple Tense ใช้กับเหตุการณ์ที่เกิดขึ้นเป็นประจำ กิจวัตรประจำวัน หรือความจริงทั่วไป"
      },
      {
        "type": "example",
        "body": "โครงสร้าง: Subject + Verb (เติม s/es ใน He/She/It)"
      },
      {
        "type": "example",
        "body": "I eat breakfast every day. (ฉันกินข้าวเช้าทุกวัน)"
      },
      {
        "type": "example",
        "body": "She reads a book every night. (เธออ่านหนังสือทุกคืน)"
      }
    ],
    "vocabularyIds": ["vocab-p5-001", "vocab-p5-002"],
    "exerciseIds": ["ex-grammar-p5-001", "ex-grammar-p5-002"]
  },
  {
    "id": "vocab-p5-001",
    "title": "คำศัพท์พื้นฐาน อาหาร",
    "grade": "p5",
    "gradeLabel": "ป.5",
    "topics": ["vocabulary"],
    "content": [
      {
        "type": "text",
        "body": "มาทำความรู้จักคำศัพท์เกี่ยวกับอาหารกันเถอะ!"
      }
    ],
    "vocabularyIds": ["vocab-p5-001", "vocab-p5-002"],
    "exerciseIds": ["ex-vocab-p5-001"]
  },
  {
    "id": "reading-p5-001",
    "title": "My Pet Cat",
    "grade": "p5",
    "gradeLabel": "ป.5",
    "topics": ["reading"],
    "content": [
      {
        "type": "text",
        "body": "I have a pet cat. Her name is Mimi. She is white and fluffy. She likes to play with a red ball. Every morning, Mimi wakes me up. I love my cat very much."
      },
      {
        "type": "example",
        "body": "คำศัพท์น่ารู้: pet (สัตว์เลี้ยง), fluffy (นุ่มฟู), wake up (ปลุก)"
      }
    ],
    "vocabularyIds": ["vocab-p5-003", "vocab-p5-004"],
    "exerciseIds": ["ex-reading-p5-001"]
  },
  {
    "id": "grammar-p6-001",
    "title": "Past Simple Tense",
    "grade": "p6",
    "gradeLabel": "ป.6",
    "topics": ["grammar"],
    "content": [
      {
        "type": "text",
        "body": "Past Simple Tense ใช้กับเหตุการณ์ที่เกิดขึ้นและจบลงแล้วในอดีต"
      },
      {
        "type": "example",
        "body": "โครงสร้าง: Subject + Verb ช่อง 2"
      },
      {
        "type": "example",
        "body": "I visited my grandmother yesterday. (ฉันไปเยี่ยมคุณยายเมื่อวาน)"
      },
      {
        "type": "example",
        "body": "They played football last Sunday. (พวกเขาเล่นฟุตบอลวันอาทิตย์ที่แล้ว)"
      }
    ],
    "vocabularyIds": ["vocab-p6-001", "vocab-p6-002"],
    "exerciseIds": ["ex-grammar-p6-001"]
  },
  {
    "id": "conversation-m1-001",
    "title": "Introducing Yourself",
    "grade": "m1",
    "gradeLabel": "ม.1",
    "topics": ["conversation"],
    "content": [
      {
        "type": "text",
        "body": "การเรียนรู้วิธีแนะนำตัวเองเป็นสิ่งสำคัญในการสนทนาภาษาอังกฤษ"
      },
      {
        "type": "example",
        "body": "A: Hello! My name is John. What's your name?"
      },
      {
        "type": "example",
        "body": "B: Hi John! I'm Sarah. Nice to meet you."
      },
      {
        "type": "example",
        "body": "A: Nice to meet you too. Where are you from?"
      },
      {
        "type": "example",
        "body": "B: I'm from Thailand."
      }
    ],
    "vocabularyIds": ["vocab-m1-001", "vocab-m1-002"],
    "exerciseIds": ["ex-conv-m1-001"]
  }
]
```

- [ ] **Step 6: Create `src/data/vocabulary.json`**

```json
[
  { "id": "vocab-p5-001", "word": "breakfast", "translation": "อาหารเช้า", "phonetic": "/ˈbrekfəst/", "category": "food", "exampleSentence": "I eat breakfast at 7 o'clock.", "lessonId": "grammar-p5-001" },
  { "id": "vocab-p5-002", "word": "every day", "translation": "ทุกวัน", "phonetic": "/ˈevri deɪ/", "category": "time", "exampleSentence": "I go to school every day.", "lessonId": "grammar-p5-001" },
  { "id": "vocab-p5-003", "word": "pet", "translation": "สัตว์เลี้ยง", "phonetic": "/pet/", "category": "animal", "exampleSentence": "I have a pet dog.", "lessonId": "reading-p5-001" },
  { "id": "vocab-p5-004", "word": "fluffy", "translation": "นุ่มฟู", "phonetic": "/ˈflʌfi/", "category": "adjective", "exampleSentence": "My cat is soft and fluffy.", "lessonId": "reading-p5-001" },
  { "id": "vocab-p6-001", "word": "yesterday", "translation": "เมื่อวานนี้", "phonetic": "/ˈjestərdeɪ/", "category": "time", "exampleSentence": "I went to the park yesterday.", "lessonId": "grammar-p6-001" },
  { "id": "vocab-p6-002", "word": "visited", "translation": "ไปเยี่ยม", "phonetic": "/ˈvɪzɪtɪd/", "category": "action", "exampleSentence": "We visited our grandparents.", "lessonId": "grammar-p6-001" },
  { "id": "vocab-m1-001", "word": "introduce", "translation": "แนะนำ", "phonetic": "/ˌɪntrəˈdjuːs/", "category": "action", "exampleSentence": "Let me introduce myself.", "lessonId": "conversation-m1-001" },
  { "id": "vocab-m1-002", "word": "pleased", "translation": "ยินดี", "phonetic": "/pliːzd/", "category": "feeling", "exampleSentence": "Pleased to meet you!", "lessonId": "conversation-m1-001" }
]
```

- [ ] **Step 7: Create `src/data/exercises.json`**

```json
[
  {
    "id": "ex-grammar-p5-001",
    "lessonId": "grammar-p5-001",
    "type": "multiple-choice",
    "question": "She ___ breakfast every morning.",
    "options": ["eat", "eats", "eating", "ate"],
    "correctAnswer": "eats",
    "explanation": "He/She/It ต้องเติม s ที่คำกริยา"
  },
  {
    "id": "ex-grammar-p5-002",
    "lessonId": "grammar-p5-001",
    "type": "fill-blank",
    "question": "I ___ (go) to school every day. (เติมคำในช่องว่าง)",
    "options": [],
    "correctAnswer": "go",
    "explanation": "I ใช้กริยารูปปกติ ไม่เติม s"
  },
  {
    "id": "ex-vocab-p5-001",
    "lessonId": "vocab-p5-001",
    "type": "multiple-choice",
    "question": "\"Breakfast\" แปลว่าอะไร?",
    "options": ["อาหารกลางวัน", "อาหารเย็น", "อาหารเช้า", "ขนม"],
    "correctAnswer": "อาหารเช้า",
    "explanation": "Breakfast = อาหารเช้า (break + fast)"
  },
  {
    "id": "ex-reading-p5-001",
    "lessonId": "reading-p5-001",
    "type": "multiple-choice",
    "question": "What is the cat's name?",
    "options": ["Mimi", "Fluffy", "Kitty", "Mama"],
    "correctAnswer": "Mimi",
    "explanation": "จากเรื่อง: Her name is Mimi."
  },
  {
    "id": "ex-grammar-p6-001",
    "lessonId": "grammar-p6-001",
    "type": "multiple-choice",
    "question": "I ___ my grandmother yesterday.",
    "options": ["visit", "visits", "visiting", "visited"],
    "correctAnswer": "visited",
    "explanation": "Past simple ใช้ V2 (visit → visited)"
  },
  {
    "id": "ex-conv-m1-001",
    "lessonId": "conversation-m1-001",
    "type": "multiple-choice",
    "question": "\"Nice to meet you\" แปลว่าอะไร?",
    "options": ["ยินดีที่ได้รู้จัก", "แล้วพบกันใหม่", "ขอบคุณมาก", "ขอโทษนะ"],
    "correctAnswer": "ยินดีที่ได้รู้จัก",
    "explanation": "Nice to meet you = ยินดีที่ได้รู้จัก"
  },
  {
    "id": "ex-grammar-p5-003",
    "lessonId": "grammar-p5-001",
    "type": "writing",
    "question": "เขียนประโยค Present Simple Tense โดยใช้คำว่า \"play\" และ \"every Sunday\"",
    "options": [],
    "correctAnswer": "I play football every Sunday.",
    "explanation": "ตัวอย่าง: I play football every Sunday."
  }
]
```

---

### Task 3: Hooks + ProgressContext

**Files:**
- Create: `src/hooks/useLocalStorage.js`
- Create: `src/hooks/useDailyVocab.js`
- Create: `src/hooks/useDailyExercise.js`
- Create: `src/context/ProgressContext.jsx`
- Create: `src/hooks/__tests__/useDailyVocab.test.js`
- Create: `src/hooks/__tests__/useDailyExercise.test.js`

**Interfaces:**
- Consumes: `getItem`, `setItem`, `getTodayDate`, `pickRandom`, `shuffleArray` from utils; JSON data files
- Produces:
  - `useLocalStorage(key, initialValue)` — returns `[value, setValue]`
  - `useDailyVocab(wordsPerDay, lessonId?)` — returns `{ todaysWords, markKnown, markUnknown, stats }`
  - `useDailyExercise()` — returns `{ todaysExercise, isDone, completeExercise }`
  - `ProgressProvider` + `useProgress()` — context with `{ progress, updateLessonProgress, settings, updateSettings, vocabHistory, ... }`

- [ ] **Step 1: Write and test `useLocalStorage`**

Create `src/hooks/useLocalStorage.js`:

```js
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
```

Create `src/hooks/__tests__/useLocalStorage.test.js`:

```js
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
```

- [ ] **Step 2: Run tests**

Run: `npm test`
Expected: all tests pass

- [ ] **Step 3: Write and test `useDailyVocab`**

Create `src/hooks/useDailyVocab.js`:

```js
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
```

Create `src/hooks/__tests__/useDailyVocab.test.js`:

```js
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useDailyVocab from '../useDailyVocab'

const mockVocab = [
  { id: 'v1', word: 'hello', lessonId: 'l1' },
  { id: 'v2', word: 'world', lessonId: 'l1' },
  { id: 'v3', word: 'cat', lessonId: 'l2' },
]

vi.mock('../../data/vocabulary.json', () => ({ default: mockVocab }))

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
```

- [ ] **Step 4: Write and test `useDailyExercise`**

Create `src/hooks/useDailyExercise.js`:

```js
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
```

Create `src/hooks/__tests__/useDailyExercise.test.js`:

```js
import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useDailyExercise from '../useDailyExercise'

const mockExercises = [
  { id: 'e1', lessonId: 'l1', question: 'Q1' },
  { id: 'e2', lessonId: 'l1', question: 'Q2' },
  { id: 'e3', lessonId: 'l2', question: 'Q3' },
]

vi.mock('../../data/exercises.json', () => ({ default: mockExercises }))

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
```

- [ ] **Step 5: Run tests**

Run: `npm test`
Expected: all tests pass

- [ ] **Step 6: Create `src/context/ProgressContext.jsx`**

```jsx
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
```

- [ ] **Step 7: Wire ProgressProvider into `src/main.jsx`**

Edit `src/main.jsx`:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ProgressProvider } from './context/ProgressContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProgressProvider>
        <App />
      </ProgressProvider>
    </BrowserRouter>
  </React.StrictMode>
)
```

- [ ] **Step 8: Run tests**

Run: `npm test`
Expected: all tests pass

---

### Task 4: Layout + Navigation

**Files:**
- Create: `src/components/Layout.jsx`
- Create: `src/components/Navbar.jsx`
- Create: `src/components/__tests__/Layout.test.jsx`

**Interfaces:**
- Consumes: React Router, ProgressContext
- Produces: `<Layout>` wrapper with Navbar + content area, `<Navbar>` with navigation links

- [ ] **Step 1: Create `src/components/Navbar.jsx`**

```jsx
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/', label: 'หน้าแรก', icon: '🏠' },
  { path: '/lessons', label: 'บทเรียน', icon: '📚' },
  { path: '/exercises/daily', label: 'แบบฝึกหัด', icon: '✍️' },
  { path: '/vocabulary', label: 'คำศัพท์', icon: '📖' },
  { path: '/progress', label: 'ความคืบหน้า', icon: '📊' },
  { path: '/settings', label: 'ตั้งค่า', icon: '⚙️' },
]

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Piant
          </Link>
          <div className="flex gap-1 overflow-x-auto">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Create `src/components/Layout.jsx`**

```jsx
import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}
```

- [ ] **Step 3: Write and run Layout test**

Create `src/components/__tests__/Layout.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Layout from '../Layout'

describe('Layout', () => {
  it('renders navbar and children', () => {
    render(
      <MemoryRouter>
        <Layout><p>Hello</p></Layout>
      </MemoryRouter>
    )
    expect(screen.getByText('Piant')).toBeInTheDocument()
    expect(screen.getByText('Hello')).toBeInTheDocument()
    expect(screen.getByText('บทเรียน')).toBeInTheDocument()
  })
})
```

Run: `npm test`
Expected: all tests pass

---

### Task 5: Dashboard Page

**Files:**
- Create: `src/pages/Dashboard.jsx`
- Create: `src/pages/__tests__/Dashboard.test.jsx`

**Interfaces:**
- Consumes: `useProgress`, `useDailyVocab`
- Produces: Dashboard page component

- [ ] **Step 1: Create `src/pages/Dashboard.jsx`**

```jsx
import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import useDailyVocab from '../hooks/useDailyVocab'
import lessons from '../data/lessons.json'

export default function Dashboard() {
  const { progress, updateProgress } = useProgress()
  const { todaysWords, stats } = useDailyVocab(progress.settings.wordsPerDay, progress, updateProgress)
  const completedCount = Object.keys(progress.completedLessons).length
  const totalLessons = lessons.length

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">สวัสดี! มาเรียนภาษาอังกฤษกันเถอะ 🎉</h1>

      {/* Daily Exercise CTA */}
      <Link
        to="/exercises/daily"
        className="block p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
      >
        <h2 className="text-lg font-bold">📝 แบบฝึกหัดประจำวัน</h2>
        <p className="text-blue-100 mt-1">มาทำแบบฝึกหัดกันเถอะ!</p>
      </Link>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-2xl font-bold text-blue-600">{completedCount}/{totalLessons}</p>
          <p className="text-sm text-gray-500">บทเรียนที่เรียนแล้ว</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-2xl font-bold text-green-600">{stats.knownCount}</p>
          <p className="text-sm text-gray-500">คำศัพท์ที่รู้แล้ว</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-2xl font-bold text-purple-600">{stats.totalSeen}</p>
          <p className="text-sm text-gray-500">คำศัพท์ที่เคยเจอ</p>
        </div>
      </div>

      {/* Today's Words Preview */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-gray-800">📖 คำศัพท์วันนี้</h2>
          <Link to="/vocabulary" className="text-sm text-blue-600 hover:underline">ดูทั้งหมด</Link>
        </div>
        <div className="space-y-2">
          {todaysWords.slice(0, 3).map(w => (
            <div key={w.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-800">{w.word}</span>
              <span className="text-gray-500">{w.translation}</span>
            </div>
          ))}
          {todaysWords.length > 3 && (
            <p className="text-sm text-gray-400 text-center">+ อีก {todaysWords.length - 3} คำ</p>
          )}
        </div>
      </div>

      {/* Recent Lessons */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-gray-800">📚 บทเรียนล่าสุด</h2>
          <Link to="/lessons" className="text-sm text-blue-600 hover:underline">ดูทั้งหมด</Link>
        </div>
        <div className="space-y-2">
          {lessons.slice(0, 3).map(lesson => (
            <Link
              key={lesson.id}
              to={`/lessons/${lesson.id}`}
              className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">{lesson.title}</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {lesson.gradeLabel}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create and run Dashboard test**

Create `src/pages/__tests__/Dashboard.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProgressProvider } from '../../context/ProgressContext'
import Dashboard from '../Dashboard'

describe('Dashboard', () => {
  it('renders welcome message', () => {
    render(
      <MemoryRouter>
        <ProgressProvider>
          <Dashboard />
        </ProgressProvider>
      </MemoryRouter>
    )
    expect(screen.getByText(/มาเรียนภาษาอังกฤษกันเถอะ/)).toBeInTheDocument()
    expect(screen.getByText('📝 แบบฝึกหัดประจำวัน')).toBeInTheDocument()
  })
})
```

Run: `npm test`
Expected: all tests pass

---

### Task 6: Lessons + Lesson Detail Pages

**Files:**
- Create: `src/pages/Lessons.jsx`
- Create: `src/pages/LessonDetail.jsx`
- Create: `src/components/LessonCard.jsx`
- Create: `src/pages/__tests__/Lessons.test.jsx`

**Interfaces:**
- Consumes: `lessons.json`, `vocabulary.json`, `exercises.json`, `useProgress`
- Produces: Lessons browsing page + Lesson detail page

- [ ] **Step 1: Create `src/components/LessonCard.jsx`**

```jsx
import { Link } from 'react-router-dom'

export default function LessonCard({ lesson, isCompleted, bestScore }) {
  return (
    <Link
      to={`/lessons/${lesson.id}`}
      className="block bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-800">{lesson.title}</h3>
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full whitespace-nowrap">
          {lesson.gradeLabel}
        </span>
      </div>
      <div className="flex gap-1 flex-wrap">
        {lesson.topics.map(t => (
          <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            {t === 'grammar' ? 'ไวยากรณ์' : t === 'vocabulary' ? 'คำศัพท์' : t === 'reading' ? 'การอ่าน' : t === 'writing' ? 'การเขียน' : 'บทสนทนา'}
          </span>
        ))}
      </div>
      {isCompleted && (
        <div className="mt-2 text-sm text-green-600">
          ✅ เรียนแล้ว {bestScore !== undefined && `| คะแนนสูงสุด: ${bestScore}%`}
        </div>
      )}
    </Link>
  )
}
```

- [ ] **Step 2: Create `src/pages/Lessons.jsx`**

```jsx
import { useState } from 'react'
import lessons from '../data/lessons.json'
import { useProgress } from '../context/ProgressContext'
import LessonCard from '../components/LessonCard'

const grades = [
  { value: 'all', label: 'ทั้งหมด' },
  { value: 'p5', label: 'ป.5' },
  { value: 'p6', label: 'ป.6' },
  { value: 'm1', label: 'ม.1' },
  { value: 'm2', label: 'ม.2' },
  { value: 'm3', label: 'ม.3' },
]

const topicFilters = [
  { value: 'all', label: 'ทั้งหมด' },
  { value: 'grammar', label: 'ไวยากรณ์' },
  { value: 'vocabulary', label: 'คำศัพท์' },
  { value: 'reading', label: 'การอ่าน' },
  { value: 'writing', label: 'การเขียน' },
  { value: 'conversation', label: 'บทสนทนา' },
]

export default function Lessons() {
  const [gradeFilter, setGradeFilter] = useState('all')
  const [topicFilter, setTopicFilter] = useState('all')
  const { progress } = useProgress()

  const filtered = lessons.filter(lesson => {
    if (gradeFilter !== 'all' && lesson.grade !== gradeFilter) return false
    if (topicFilter !== 'all' && !lesson.topics.includes(topicFilter)) return false
    return true
  })

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">📚 บทเรียนทั้งหมด</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex gap-1 flex-wrap">
          {grades.map(g => (
            <button
              key={g.value}
              onClick={() => setGradeFilter(g.value)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                gradeFilter === g.value ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1 flex-wrap">
          {topicFilters.map(t => (
            <button
              key={t.value}
              onClick={() => setTopicFilter(t.value)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                topicFilter === t.value ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lesson Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(lesson => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            isCompleted={lesson.id in progress.completedLessons}
            bestScore={progress.completedLessons[lesson.id]}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-8">ไม่พบบทเรียนที่ตรงกับเงื่อนไข</p>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Create `src/pages/LessonDetail.jsx`**

```jsx
import { useParams, Link } from 'react-router-dom'
import lessons from '../data/lessons.json'
import vocabulary from '../data/vocabulary.json'
import exercises from '../data/exercises.json'
import { useProgress } from '../context/ProgressContext'

export default function LessonDetail() {
  const { id } = useParams()
  const { progress, updateLessonProgress } = useProgress()
  const lesson = lessons.find(l => l.id === id)

  if (!lesson) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">ไม่พบบทเรียนนี้</p>
        <Link to="/lessons" className="text-blue-600 hover:underline mt-2 inline-block">กลับไปหน้าบทเรียน</Link>
      </div>
    )
  }

  const lessonVocab = vocabulary.filter(v => lesson.vocabularyIds.includes(v.id))
  const lessonExercises = exercises.filter(e => lesson.exerciseIds.includes(e.id))
  const isCompleted = id in progress.completedLessons

  const handleComplete = () => {
    updateLessonProgress(id, 100)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/lessons" className="hover:underline">บทเรียน</Link>
        <span>/</span>
        <span>{lesson.title}</span>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{lesson.title}</h1>
          <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{lesson.gradeLabel}</span>
        </div>
        {!isCompleted && (
          <button
            onClick={handleComplete}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            ✅ เรียนแล้ว
          </button>
        )}
        {isCompleted && (
          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm">✅ เรียนแล้ว</span>
        )}
      </div>

      {/* Lesson Content */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 space-y-4">
        {lesson.content.map((section, i) => (
          <div key={i} className={section.type === 'example' ? 'pl-4 border-l-4 border-blue-300 text-gray-700' : 'text-gray-800'}>
            {section.body}
          </div>
        ))}
      </div>

      {/* Vocabulary */}
      {lessonVocab.length > 0 && (
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 mb-3">📖 คำศัพท์ในบทนี้</h2>
          <div className="space-y-2">
            {lessonVocab.map(v => (
              <div key={v.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-800">{v.word}</span>
                  <span className="text-gray-400 ml-2 text-sm">{v.phonetic}</span>
                </div>
                <span className="text-gray-600">{v.translation}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Exercises */}
      {lessonExercises.length > 0 && (
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 mb-3">✍️ แบบฝึกหัดท้ายบท</h2>
          <div className="space-y-4">
            {lessonExercises.map(ex => (
              <div key={ex.id} className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-800 mb-2">{ex.question}</p>
                {ex.options?.length > 0 && (
                  <div className="space-y-1 ml-4">
                    {ex.options.map((opt, i) => (
                      <label key={i} className="block text-gray-600">
                        <input type="radio" name={ex.id} className="mr-2" />
                        {opt}
                      </label>
                    ))}
                  </div>
                )}
                {ex.explanation && (
                  <details className="mt-2">
                    <summary className="text-sm text-blue-600 cursor-pointer">ดูเฉลย</summary>
                    <p className="text-sm text-green-700 mt-1">เฉลย: {ex.correctAnswer}</p>
                    <p className="text-sm text-gray-500">{ex.explanation}</p>
                  </details>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Create and run Lessons test**

Create `src/pages/__tests__/Lessons.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProgressProvider } from '../../context/ProgressContext'
import Lessons from '../Lessons'

describe('Lessons', () => {
  it('renders lesson list with filters', () => {
    render(
      <MemoryRouter>
        <ProgressProvider>
          <Lessons />
        </ProgressProvider>
      </MemoryRouter>
    )
    expect(screen.getByText('📚 บทเรียนทั้งหมด')).toBeInTheDocument()
    expect(screen.getByText('Present Simple Tense')).toBeInTheDocument()
  })
})
```

Run: `npm test`
Expected: all tests pass

---

### Task 7: Daily Exercise Page

**Files:**
- Create: `src/pages/DailyExercise.jsx`
- Create: `src/components/ExerciseQuestion.jsx`
- Create: `src/pages/__tests__/DailyExercise.test.jsx`

**Interfaces:**
- Consumes: `useProgress`, `useDailyExercise`
- Produces: Daily exercise page with interactive questions and scoring

- [ ] **Step 1: Create `src/components/ExerciseQuestion.jsx`**

```jsx
import { useState } from 'react'

export default function ExerciseQuestion({ exercise, index, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [writingAnswer, setWritingAnswer] = useState('')

  const handleSelect = (opt) => {
    if (selected !== null) return
    setSelected(opt)
    const isCorrect = opt === exercise.correctAnswer
    onAnswer(exercise.id, isCorrect)
    setShowAnswer(true)
  }

  const handleWritingSubmit = () => {
    if (!writingAnswer.trim()) return
    setShowAnswer(true)
    onAnswer(exercise.id, null) // writing exercises not auto-graded
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <p className="text-sm text-gray-500 mb-1">ข้อที่ {index + 1}</p>
      <p className="text-gray-800 font-medium mb-3">{exercise.question}</p>

      {exercise.type === 'multiple-choice' && exercise.options?.length > 0 && (
        <div className="space-y-2">
          {exercise.options.map(opt => {
            let classes = 'block w-full text-left p-3 rounded-lg border transition-colors '
            if (selected === null) {
              classes += 'border-gray-200 hover:bg-gray-50 cursor-pointer'
            } else if (opt === exercise.correctAnswer) {
              classes += 'border-green-500 bg-green-50 text-green-800'
            } else if (opt === selected) {
              classes += 'border-red-500 bg-red-50 text-red-800'
            } else {
              classes += 'border-gray-200 opacity-50'
            }
            return (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className={classes}
                disabled={selected !== null}
              >
                {opt}
              </button>
            )
          })}
        </div>
      )}

      {exercise.type === 'fill-blank' && (
        <div className="space-y-2">
          <input
            type="text"
            value={writingAnswer}
            onChange={(e) => setWritingAnswer(e.target.value)}
            disabled={showAnswer}
            placeholder="พิมพ์คำตอบที่นี่..."
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
          />
          {!showAnswer && (
            <button
              onClick={handleWritingSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              ตรวจคำตอบ
            </button>
          )}
          {showAnswer && (
            <div className={`p-3 rounded-lg ${writingAnswer.toLowerCase().trim() === exercise.correctAnswer.toLowerCase().trim() ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {writingAnswer.toLowerCase().trim() === exercise.correctAnswer.toLowerCase().trim()
                ? '✓ ถูกต้อง!'
                : `✗ เฉลย: ${exercise.correctAnswer}`}
            </div>
          )}
        </div>
      )}

      {exercise.type === 'writing' && (
        <div className="space-y-2">
          <textarea
            value={writingAnswer}
            onChange={(e) => setWritingAnswer(e.target.value)}
            disabled={showAnswer}
            placeholder="เขียนคำตอบที่นี่..."
            rows={3}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
          />
          {!showAnswer && (
            <button
              onClick={handleWritingSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              ตรวจคำตอบ
            </button>
          )}
          {showAnswer && (
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-gray-600 mb-1">💡 ตัวอย่างคำตอบที่ถูกต้อง:</p>
              <p className="text-gray-800 font-medium">{exercise.correctAnswer}</p>
              <p className="text-sm text-gray-500 mt-1">{exercise.explanation}</p>
            </div>
          )}
        </div>
      )}

      {showAnswer && exercise.explanation && exercise.type === 'multiple-choice' && (
        <p className="text-sm text-gray-500 mt-2">{exercise.explanation}</p>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Create `src/pages/DailyExercise.jsx`**

```jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import useDailyExercise from '../hooks/useDailyExercise'
import ExerciseQuestion from '../components/ExerciseQuestion'
import { getTodayDate } from '../utils/helpers'

export default function DailyExercise() {
  const { progress, updateProgress, updateLessonProgress } = useProgress()
  const { todaysExercise, isDone, completeExercise } = useDailyExercise(progress, updateProgress)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (isDone) {
      const daily = progress.dailyExercises?.[getTodayDate()]
      if (daily) {
        setScore(daily.score)
        setSubmitted(true)
      }
    }
  }, [isDone])

  const handleAnswer = (exerciseId, isCorrect) => {
    setAnswers(prev => ({ ...prev, [exerciseId]: isCorrect }))
  }

  const handleSubmit = () => {
    const answered = todaysExercise.filter(e => e.id in answers).length
    if (answered < todaysExercise.length) {
      alert('กรุณาทำทุกข้อก่อนส่ง')
      return
    }
    const correct = todaysExercise.filter(e => answers[e.id] === true).length
    const total = todaysExercise.length
    const percentage = Math.round((correct / total) * 100)
    setScore(percentage)
    setSubmitted(true)
    completeExercise(percentage, todaysExercise.map(e => ({
      id: e.id,
      userCorrect: answers[e.id],
    })))
    // Update progress for related lessons
    const lessonIds = [...new Set(todaysExercise.map(e => e.lessonId))]
    lessonIds.forEach(lid => updateLessonProgress(lid, percentage))
  }

  if (submitted) {
    return (
      <div className="space-y-6 text-center py-8">
        <div className="text-6xl mb-4">{score >= 80 ? '🎉' : score >= 50 ? '👍' : '💪'}</div>
        <h1 className="text-2xl font-bold text-gray-800">แบบฝึกหัดวันนี้</h1>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 inline-block">
          <p className="text-4xl font-bold text-blue-600">{score}%</p>
          <p className="text-gray-500 mt-2">
            {score >= 80 ? 'เยี่ยมมาก! ได้คะแนนดีมาก' : score >= 50 ? 'ใช้ได้เลย! ลองทำอีกครั้งพรุ่งนี้' : 'สู้ๆ! ฝึกอีกหน่อย'}
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <Link to="/" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">กลับหน้าแรก</Link>
          <Link to="/lessons" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">ไปเรียนต่อ</Link>
        </div>
      </div>
    )
  }

  if (isDone) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="text-6xl">✅</div>
        <h1 className="text-2xl font-bold text-gray-800">วันนี้ทำแบบฝึกหัดแล้ว!</h1>
        <p className="text-gray-500">คะแนนวันนี้: {score}%</p>
        <p className="text-gray-400">กลับมาใหม่พรุ่งนี้นะ</p>
        <Link to="/" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">กลับหน้าแรก</Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">✍️ แบบฝึกหัดประจำวัน</h1>
      <p className="text-gray-500">ทำแบบฝึกหัด {todaysExercise.length} ข้อ</p>

      <div className="space-y-4">
        {todaysExercise.map((ex, i) => (
          <ExerciseQuestion key={ex.id} exercise={ex} index={i} onAnswer={handleAnswer} />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors text-lg"
      >
        ส่งคำตอบ
      </button>
    </div>
  )
}
```

- [ ] **Step 3: Create and run DailyExercise test**

Create `src/pages/__tests__/DailyExercise.test.jsx`:

```jsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProgressProvider } from '../../context/ProgressContext'
import DailyExercise from '../DailyExercise'

vi.mock('../../hooks/useDailyExercise', () => ({
  default: () => ({
    todaysExercise: [
      { id: 'e1', lessonId: 'l1', type: 'multiple-choice', question: 'Test Q?', options: ['A', 'B'], correctAnswer: 'A', explanation: 'Test' }
    ],
    isDone: false,
    completeExercise: vi.fn(),
  }),
}))

describe('DailyExercise', () => {
  it('renders exercise page', () => {
    render(
      <MemoryRouter>
        <ProgressProvider>
          <DailyExercise />
        </ProgressProvider>
      </MemoryRouter>
    )
    expect(screen.getByText('✍️ แบบฝึกหัดประจำวัน')).toBeInTheDocument()
    expect(screen.getByText('Test Q?')).toBeInTheDocument()
    expect(screen.getByText('ส่งคำตอบ')).toBeInTheDocument()
  })
})
```

Run: `npm test`
Expected: all tests pass

---

### Task 8: Vocabulary Page

**Files:**
- Create: `src/pages/Vocabulary.jsx`
- Create: `src/components/VocabCard.jsx`
- Create: `src/pages/__tests__/Vocabulary.test.jsx`

**Interfaces:**
- Consumes: `useProgress`, `useDailyVocab`
- Produces: Vocabulary page showing today's words and all words by category

- [ ] **Step 1: Create `src/components/VocabCard.jsx`**

```jsx
import { useState } from 'react'

export default function VocabCard({ word, onKnown, onUnknown, showActions = true }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{word.word}</h3>
            {word.phonetic && (
              <p className="text-sm text-gray-400">{word.phonetic}</p>
            )}
          </div>
          <button
            onClick={() => setFlipped(!flipped)}
            className="text-sm text-blue-600 hover:underline"
          >
            {flipped ? 'ซ่อนคำแปล' : 'ดูคำแปล'}
          </button>
        </div>

        {flipped && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <p className="text-gray-800 font-medium">{word.translation}</p>
            <p className="text-gray-600 text-sm mt-1">{word.exampleSentence}</p>
          </div>
        )}
      </div>

      {showActions && (
        <div className="flex border-t border-gray-100">
          <button
            onClick={() => onUnknown?.(word.id)}
            className="flex-1 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            ❌ ยังไม่แม่น
          </button>
          <button
            onClick={() => onKnown?.(word.id)}
            className="flex-1 py-2 text-sm text-green-600 hover:bg-green-50 transition-colors border-l border-gray-100"
          >
            ✅ รู้แล้ว
          </button>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Create `src/pages/Vocabulary.jsx`**

```jsx
import { useState } from 'react'
import { useProgress } from '../context/ProgressContext'
import useDailyVocab from '../hooks/useDailyVocab'
import VocabCard from '../components/VocabCard'
import vocabulary from '../data/vocabulary.json'
import { groupBy } from '../utils/helpers'

const categoryLabels = {
  food: 'อาหาร',
  time: 'เวลา',
  animal: 'สัตว์',
  adjective: 'คำคุณศัพท์',
  action: 'คำกริยา',
  feeling: 'ความรู้สึก',
}

export default function Vocabulary() {
  const { progress, updateProgress } = useProgress()
  const { todaysWords, markKnown, markUnknown, stats } = useDailyVocab(
    progress.settings.wordsPerDay, progress, updateProgress
  )
  const [tab, setTab] = useState('today')
  const groupedVocab = groupBy(vocabulary, 'category')

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">📖 คำศัพท์</h1>

      {/* Tab Switch */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab('today')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${tab === 'today' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
        >
          คำศัพท์วันนี้ ({todaysWords.length})
        </button>
        <button
          onClick={() => setTab('all')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${tab === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
        >
          คำศัพท์ทั้งหมด
        </button>
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-sm text-gray-500">
        <span>รู้แล้ว: <strong className="text-green-600">{stats.knownCount}</strong> คำ</span>
        <span>เคยเรียน: <strong className="text-blue-600">{stats.totalSeen}</strong> คำ</span>
        <span>ทั้งหมด: <strong>{vocabulary.length}</strong> คำ</span>
      </div>

      {tab === 'today' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {todaysWords.map(w => (
            <VocabCard key={w.id} word={w} onKnown={markKnown} onUnknown={markUnknown} />
          ))}
        </div>
      )}

      {tab === 'all' && (
        <div className="space-y-6">
          {Object.entries(groupedVocab).map(([category, words]) => (
            <div key={category}>
              <h2 className="font-bold text-gray-700 mb-2">{categoryLabels[category] || category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {words.map(w => (
                  <div key={w.id} className="bg-white p-3 rounded-lg border border-gray-100 flex justify-between items-center">
                    <div>
                      <span className="font-medium text-gray-800">{w.word}</span>
                      <span className="text-gray-400 ml-2 text-sm">{w.phonetic}</span>
                    </div>
                    <span className="text-gray-600 text-sm">{w.translation}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Create and run Vocabulary test**

Create `src/pages/__tests__/Vocabulary.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProgressProvider } from '../../context/ProgressContext'
import Vocabulary from '../Vocabulary'

describe('Vocabulary', () => {
  it('renders vocabulary page', () => {
    render(
      <MemoryRouter>
        <ProgressProvider>
          <Vocabulary />
        </ProgressProvider>
      </MemoryRouter>
    )
    expect(screen.getByText('📖 คำศัพท์')).toBeInTheDocument()
    expect(screen.getByText(/คำศัพท์วันนี้/)).toBeInTheDocument()
  })
})
```

Run: `npm test`
Expected: all tests pass

---

### Task 9: Progress + Settings Pages

**Files:**
- Create: `src/pages/Progress.jsx`
- Create: `src/components/StreakCalendar.jsx`
- Create: `src/pages/Settings.jsx`
- Create: `src/pages/__tests__/Settings.test.jsx`

**Interfaces:**
- Consumes: `useProgress`
- Produces: Progress statistics page and Settings page

- [ ] **Step 1: Create `src/components/StreakCalendar.jsx`**

```jsx
import { useMemo } from 'react'
import { getTodayDate } from '../utils/helpers'

export default function StreakCalendar({ streakData }) {
  const today = getTodayDate()
  const currentStreak = streakData?.currentStreak || 0
  const lastActive = streakData?.lastActiveDate

  const weekDays = useMemo(() => {
    const days = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      days.push(d.toISOString().split('T')[0])
    }
    return days
  }, [])

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <h2 className="font-bold text-gray-800 mb-3">🔥 Streak การเรียน</h2>
      <div className="text-center mb-3">
        <span className="text-3xl font-bold text-orange-500">{currentStreak}</span>
        <span className="text-gray-500 ml-2">วันติดต่อกัน</span>
      </div>
      <div className="flex justify-center gap-2">
        {weekDays.map(day => {
          const isToday = day === today
          const isActive = day === lastActive
          const dayLabel = new Date(day + 'T12:00:00').toLocaleDateString('th-TH', { weekday: 'short' })
          return (
            <div key={day} className="text-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                isActive ? 'bg-orange-500 text-white' : isToday ? 'border-2 border-orange-300 text-gray-400' : 'bg-gray-100 text-gray-400'
              }`}>
                {isActive ? '🔥' : day.split('-')[2]}
              </div>
              <p className="text-xs text-gray-400 mt-1">{dayLabel}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `src/pages/Progress.jsx`**

```jsx
import { useProgress } from '../context/ProgressContext'
import StreakCalendar from '../components/StreakCalendar'
import lessons from '../data/lessons.json'
import vocabulary from '../data/vocabulary.json'
import { getTodayDate } from '../utils/helpers'

export default function Progress() {
  const { progress } = useProgress()
  const completedCount = Object.keys(progress.completedLessons).length
  const totalLessons = lessons.length
  const today = getTodayDate()
  const todayExercise = progress.dailyExercises?.[today]
  const vocabSeen = Object.keys(progress.vocabHistory || {}).length
  const vocabKnown = Object.values(progress.vocabHistory || {}).filter(v => v.known).length

  const recentDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    return {
      date: dateStr,
      label: d.toLocaleDateString('th-TH', { weekday: 'short', day: 'numeric' }),
      exercise: progress.dailyExercises?.[dateStr],
    }
  })

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">📊 ความคืบหน้า</h1>

      <StreakCalendar streakData={progress.streakData} />

      {/* Overall Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
          <p className="text-2xl font-bold text-blue-600">{completedCount}/{totalLessons}</p>
          <p className="text-sm text-gray-500">บทเรียน</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
          <p className="text-2xl font-bold text-green-600">{vocabKnown}</p>
          <p className="text-sm text-gray-500">ศัพท์ที่รู้</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
          <p className="text-2xl font-bold text-purple-600">{vocabSeen}</p>
          <p className="text-sm text-gray-500">ศัพท์ที่เคยเจอ</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
          <p className="text-2xl font-bold text-orange-600">{todayExercise?.score ?? '-'}%</p>
          <p className="text-sm text-gray-500">คะแนนวันนี้</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-800 mb-3">กิจกรรม 7 วันล่าสุด</h2>
        <div className="space-y-2">
          {recentDays.map(day => (
            <div key={day.date} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
              <span className="text-gray-700">{day.label}</span>
              {day.exercise ? (
                <span className="text-sm text-green-600">✅ ทำแล้ว {day.exercise.score}%</span>
              ) : (
                <span className="text-sm text-gray-400">—</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lesson Scores */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-800 mb-3">คะแนนบทเรียน</h2>
        <div className="space-y-2">
          {Object.entries(progress.completedLessons).map(([lessonId, score]) => {
            const lesson = lessons.find(l => l.id === lessonId)
            return (
              <div key={lessonId} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{lesson?.title || lessonId}</span>
                <span className="text-sm text-blue-600 font-medium">{score}%</span>
              </div>
            )
          })}
          {Object.keys(progress.completedLessons).length === 0 && (
            <p className="text-gray-400 text-center py-4">ยังไม่ได้เรียนบทเรียนใดเลย</p>
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create `src/pages/Settings.jsx`**

```jsx
import { useProgress } from '../context/ProgressContext'
import { useNavigate } from 'react-router-dom'

export default function Settings() {
  const { progress, updateSettings, resetAll } = useProgress()
  const navigate = useNavigate()

  const handleWordsChange = (e) => {
    const val = parseInt(e.target.value, 10)
    if (val >= 1 && val <= 50) {
      updateSettings({ wordsPerDay: val })
    }
  }

  const handleReset = () => {
    if (window.confirm('แน่ใจหรือว่าต้องการรีเซ็ตข้อมูลทั้งหมด? การกระทำนี้ไม่สามารถเรียกคืนได้')) {
      resetAll()
      navigate('/')
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">⚙️ ตั้งค่า</h1>

      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            จำนวนคำศัพท์ต่อวัน
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="1"
              max="20"
              value={progress.settings.wordsPerDay}
              onChange={handleWordsChange}
              className="flex-1"
            />
            <span className="text-lg font-bold text-blue-600 w-8 text-center">
              {progress.settings.wordsPerDay}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">ปรับ 1-20 คำต่อวัน (ค่าเริ่มต้น: 5)</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h2 className="font-bold text-red-600 mb-3">⚠️ รีเซ็ตข้อมูล</h2>
        <p className="text-sm text-gray-500 mb-3">ลบข้อมูลการเรียนทั้งหมดของคุณ (คะแนน, คำศัพท์, streak)</p>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
        >
          รีเซ็ตข้อมูลทั้งหมด
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create and run Settings test**

Create `src/pages/__tests__/Settings.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProgressProvider } from '../../context/ProgressContext'
import Settings from '../Settings'

describe('Settings', () => {
  it('renders settings page', () => {
    render(
      <MemoryRouter>
        <ProgressProvider>
          <Settings />
        </ProgressProvider>
      </MemoryRouter>
    )
    expect(screen.getByText('⚙️ ตั้งค่า')).toBeInTheDocument()
    expect(screen.getByText('จำนวนคำศัพท์ต่อวัน')).toBeInTheDocument()
    expect(screen.getByText('รีเซ็ตข้อมูลทั้งหมด')).toBeInTheDocument()
  })
})
```

Run: `npm test`
Expected: all tests pass

---

### Task 10: Polish, Responsive & Final Testing

**Files:**
- Modify: all pages and components (responsive tweaks as needed)

**Interfaces:**
- Consumes: all previous tasks
- Produces: production-ready app

- [ ] **Step 1: Run full test suite**

Run: `npm test`
Expected: all tests pass

- [ ] **Step 2: Build for production**

Run: `npm run build`
Expected: `dist/` folder created with no errors

- [ ] **Step 3: Final check — manually review each page renders**

Run: `npm run preview`
Expected: app serves correctly on localhost

- [ ] **Step 4: Remove any unused imports**

Run: `npx vite build` — should build without warnings about unused imports
