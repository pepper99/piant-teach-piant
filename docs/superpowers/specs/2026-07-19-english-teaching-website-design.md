# English Teaching Website (React SPA)

## Overview
Static React SPA สำหรับสอนภาษาอังกฤษระดับประถมปลายถึงมัธยมต้น ไม่มี backend ข้อมูลทั้งหมดเก็บใน localStorage

## Tech Stack
- **Framework:** React 18 + Vite
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **State Management:** React Context + localStorage
- **Data:** Static JSON files

## Target Users
นักเรียนไทยระดับ ป.5 - ม.3 ที่ต้องการเรียนภาษาอังกฤษเพิ่มเติม

## Content Focus
- ไวยากรณ์ (Grammar)
- คำศัพท์ (Vocabulary)
- การอ่าน (Reading)
- การเขียน (Writing)
- บทสนทนา (Conversation)

## Routes / Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Dashboard | ภาพรวม, คำศัพท์วันนี้, ปุ่มทำแบบฝึกหัด, ความคืบหน้า |
| `/lessons` | Lessons | กรองตามระดับชั้น + หมวดหัวข้อ |
| `/lessons/:id` | Lesson Detail | เนื้อหาบทเรียน + แบบฝึกหัดท้ายบท |
| `/exercises/daily` | Daily Exercise | แบบฝึกหัดประจำวัน 5-10 ข้อ |
| `/vocabulary` | Vocabulary | คำศัพท์วันนี้ + คำศัพท์ตามหมวด |
| `/progress` | Progress | สถิติการเรียน |
| `/settings` | Settings | ตั้งค่า: จำนวนคำต่อวัน, รีเซ็ตข้อมูล |

## Data Model

### Lesson
```ts
{
  id: string;
  title: string;
  grade: "p5" | "p6" | "m1" | "m2" | "m3";
  topics: string[];         // grammar, vocabulary, reading, writing, conversation
  content: LessonSection[]; // sections of lesson content (text + examples)
  vocabularyIds: string[];
  exerciseIds: string[];
}
```

### Word
```ts
{
  id: string;
  word: string;
  translation: string;
  phonetic?: string;
  category: string;
  exampleSentence: string;
  lessonId: string;
}
```

### Exercise
```ts
{
  id: string;
  lessonId: string;
  type: "multiple-choice" | "fill-blank" | "writing";
  question: string;
  options?: string[];      // for multiple-choice
  correctAnswer: string;
  explanation?: string;
}
```

### User Progress (localStorage)
```ts
{
  completedLessons: Record<string, number>;       // lessonId -> bestScore
  vocabHistory: Record<string, VocabEntry>;       // wordId -> { lastSeen, reviewCount, known }
  dailyExercises: Record<string, DailyEntry>;     // date -> { completed, score, exercises[] }
  dailyVocabDate: string;                         // last vocab generation date
  currentVocabIds: string[];                      // today's vocab word IDs
  settings: { wordsPerDay: number };
  streakData: { currentStreak: number; lastActiveDate: string };
}
```

## Key Features

### 1. Dashboard
- แสดงคำศัพท์วันนี้แบบสรุป (กดดูเพิ่มเติมไปหน้า /vocabulary)
- ปุ่ม "ทำแบบฝึกหัดประจำวัน"
- รายการบทเรียนล่าสุด
- ความคืบหน้า: เรียนไปแล้ว X จาก Y บท
- Streak การเข้าใช้

### 2. Lessons
- กรองตามระดับชั้น (ป.5, ป.6, ม.1, ม.2, ม.3)
- กรองตามหมวดหัวข้อ (Grammar, Vocabulary, Reading, Writing, Conversation)
- การ์ดแสดงบทเรียน: ชื่อ, ระดับ, หมวด, ความคืบหน้า (เรียนแล้ว/ยัง)

### 3. Lesson Detail
- แสดงเนื้อหาบทเรียน (ข้อความ + ตัวอย่าง)
- คำศัพท์ท้ายบท
- แบบฝึกหัดท้ายบท
- ปุ่ม "ทำเครื่องหมายว่าเรียนแล้ว"

### 4. Daily Exercise
- สุ่มข้อสอบ 5-10 ข้อจากบทเรียนที่เรียนไปแล้ว + บทเรียนปัจจุบัน
- รองรับ 3 แบบ: multiple-choice, fill-blank, writing
- ตรวจอัตโนมัติ (multiple-choice, fill-blank) / writing ให้ดูเฉลย
- แสดงคะแนนและเฉลยหลังทำเสร็จ
- วันละ 1 ครั้งเท่านั้น (เช็ควันที่ใน localStorage)

### 5. Vocabulary
- แสดงคำศัพท์วันนี้ (จำนวนตาม settings)
- แต่ละคำ: ศัพท์ → กดเปิดคำแปล → ประโยคตัวอย่าง
- ปุ่ม "รู้แล้ว" / "ยังไม่แม่น"
- ระบบเลือกคำจากหมวดของบทเรียนที่กำลังเรียน (หรือสุ่มถ้ายังไม่มี)
- ทวนซ้ำคำที่ "ยังไม่แม่น" ตอนท้าย

### 6. Progress
- กราฟ/สถิติ: บทที่เรียนแล้ว, คะแนนแบบฝึกหัด, จำนวนคำศัพท์ที่รู้แล้ว
- Streak ปฏิทิน

### 7. Settings
- ตั้งค่าจำนวนคำศัพท์ต่อวัน (default 5)
- รีเซ็ตข้อมูลทั้งหมด

## UI Language
ภาษาไทยทั้งแอป (เนื้อหาบทเรียนเป็นภาษาอังกฤษตามธรรมชาติ)

## Content Structure
เน้นการแบ่งตามระดับชั้นก่อน แล้วค่อยเลือกหมวดหัวข้อ:
- ป.5: พื้นฐาน Grammar, ศัพท์ง่าย, บทสนทนาง่าย
- ป.6: ต่อยอดจาก ป.5
- ม.1: Grammar กลาง, Reading สั้น, Writing สั้น
- ม.2: Grammar ซับซ้อนขึ้น, Reading ยาวขึ้น
- ม.3: เตรียมสอบ, Grammar เข้มข้น, Writing เรียงความ

## Non-Functional Requirements
- ทำงานแบบ offline ได้ (ไม่มี external API calls)
- responsive รองรับมือถือ
- ไม่มี dependency ที่ต้องใช้ backend
