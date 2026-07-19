# Piant - English Teaching SPA

เป็น React SPA สำหรับสอนภาษาอังกฤษระดับ ป.5-ม.3 ไม่มี backend ใช้ localStorage เก็บข้อมูลผู้ใช้

## Tech Stack
- React 18 + Vite
- Tailwind CSS
- React Router v6
- Vitest + React Testing Library

## โครงสร้าง Project
```
src/
├── components/       # UI components (Navbar, Layout, LessonCard, VocabCard, ExerciseQuestion, StreakCalendar)
│   └── __tests__/
├── pages/            # Page components (Dashboard, Lessons, LessonDetail, DailyExercise, Vocabulary, Progress, Settings)
│   └── __tests__/
├── hooks/            # useLocalStorage, useDailyVocab, useDailyExercise
│   └── __tests__/
├── context/          # ProgressContext (global state via localStorage)
├── data/             # JSON data files — THIS IS WHERE CONTENT LIVES
│   ├── lessons.json
│   ├── vocabulary.json
│   └── exercises.json
├── utils/            # storage.js, helpers.js
│   └── __tests__/
└── App.jsx           # Route definitions
```

## Routes
| Path | Page | Purpose |
|------|------|---------|
| `/` | Dashboard | สรุปการเรียน, คำศัพท์วันนี้, แบบฝึกหัด |
| `/lessons` | Lessons | กรองบทเรียนตามระดับ+หมวด |
| `/lessons/:id` | LessonDetail | เนื้อหาบทเรียน |
| `/exercises/daily` | DailyExercise | แบบฝึกหัดประจำวัน |
| `/vocabulary` | Vocabulary | คำศัพท์วันนี้ + คำศัพท์ทั้งหมด |
| `/progress` | Progress | สถิติการเรียน |
| `/settings` | Settings | ตั้งค่า |

## Data Model — JSON Files (src/data/)

### lessons.json — Array of lesson objects
```json
{
  "id": "{topic}-{grade}-{number}",
  "title": "ชื่อบทเรียน",
  "grade": "p5|p6|m1|m2|m3",
  "gradeLabel": "ป.5|ป.6|ม.1|ม.2|ม.3",
  "topics": ["grammar"|"vocabulary"|"reading"|"writing"|"conversation"],
  "content": [
    { "type": "text", "body": "คำอธิบายภาษาไทย" },
    { "type": "example", "body": "ตัวอย่างภาษาอังกฤษ (คำแปล)" }
  ],
  "vocabularyIds": ["vocab-{lessonId}-01", "vocab-{lessonId}-02", ...],
  "exerciseIds": ["ex-{lessonId}-01", "ex-{lessonId}-02", ...]
}
```

### vocabulary.json — Array of word objects
```json
{
  "id": "vocab-{lessonId}-{number}",
  "word": "english word",
  "translation": "คำแปลภาษาไทย",
  "phonetic": "/ipa/",
  "category": "food|time|animal|adjective|action|feeling|grammar|learning|reading|writing|greeting|polite|people|etc",
  "exampleSentence": "English sentence.",
  "lessonId": "id of parent lesson"
}
```
- แต่ละบทมี **10 คำ** vocabularyIds ต้องตรงกับ vocab entries
- ใช้ ID pattern: `vocab-{lessonId}-01` ถึง `vocab-{lessonId}-10`

### exercises.json — Array of exercise objects
```json
{
  "id": "ex-{lessonId}-{number}",
  "lessonId": "id of parent lesson",
  "type": "multiple-choice"|"fill-blank"|"writing",
  "question": "ข้อคำถาม",
  "options": ["A", "B", "C", "D"],     // multiple-choice เท่านั้น, นอกนั้น []
  "correctAnswer": "คำตอบที่ถูก",
  "explanation": "คำอธิบายภาษาไทย"
}
```
- แต่ละบทมี **15 ข้อ** exerciseIds ต้องตรงกับ exercise entries
- ใช้ ID pattern: `ex-{lessonId}-01` ถึง `ex-{lessonId}-15`
- ควรมีหลากหลายประเภท: ~60% multiple-choice, ~20% fill-blank, ~20% writing

## วิธีเพิ่มบทเรียนใหม่

1. เพิ่ม object ใน `src/data/lessons.json`
   - id ต้องไม่ซ้ำ ใช้ pattern `{topic}-{grade}-{runNum}`
   - vocabularyIds: สร้าง 10 IDs pattern `vocab-{lessonId}-01` ถึง `-10`
   - exerciseIds: สร้าง 15 IDs pattern `ex-{lessonId}-01` ถึง `-15`

2. เพิ่ม vocab entries ใน `src/data/vocabulary.json`
   - สร้าง 10 entries ให้ตรงกับ vocabularyIds ที่กำหนดใน lesson

3. เพิ่ม exercises ใน `src/data/exercises.json`
   - สร้าง 15 entries ให้ตรงกับ exerciseIds ที่กำหนดใน lesson
   - กระจายประเภท: ~9 MC, ~3 fill-blank, ~3 writing

4. รัน `npm test` และ `npm run build` เพื่อ verify

## ข้อควรรู้
- UI เป็นภาษาไทยทั้งหมด
- เนื้อหาบทเรียน (content.body) อธิบายด้วยภาษาไทย, ตัวอย่างเป็นอังกฤษ
- แต่ละบทควรมี content 2-4 sections (text + example)
- vocabularyIds แต่ละบทต้องมี 10 IDs เสมอ
- exerciseIds แต่ละบทต้องมี 15 IDs เสมอ
- ใช้ `npm run dev` สำหรับ dev server
- ใช้ `npm test` รัน tests
- ใช้ `npm run build` build production

## ระดับชั้น
| code | label |
|------|-------|
| p5 | ป.5 |
| p6 | ป.6 |
| m1 | ม.1 |
| m2 | ม.2 |
| m3 | ม.3 |
