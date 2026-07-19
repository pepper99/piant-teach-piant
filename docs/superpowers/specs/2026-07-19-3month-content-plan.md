# 3-Month English Content Expansion Plan

## Goal
Expand lesson content from 5 → 60 lessons (3 months, 5 days/week) covering ป.5-ม.3

## Structure
- **60 total lessons** — 12 per grade level
- **Each grade:** 4 Grammar + 2 Vocabulary + 2 Reading + 2 Writing + 2 Conversation
- **Each lesson:** Content (2-4 sections) + 2 vocabulary words + 1 exercise
- **Total:** ~120 new vocabulary words, ~60 new exercises

## Content Model (per lesson)
```json
{
  "id": "{topic}-{grade}-{number}",
  "title": "string",
  "grade": "p5|p6|m1|m2|m3",
  "gradeLabel": "ป.5|ป.6|ม.1|ม.2|ม.3",
  "topics": ["grammar|vocabulary|reading|writing|conversation"],
  "content": [{ "type": "text|example", "body": "string" }],
  "vocabularyIds": ["vocab-{id}"],
  "exerciseIds": ["ex-{id}"]
}
```

## Curriculum By Grade

### ป.5 — 12 บท
1. Grammar: Present Simple Tense (复习)
2. Grammar: Present Continuous Tense
3. Grammar: Articles a/an/the
4. Grammar: Plural Nouns
5. Vocabulary: Food & Drinks
6. Vocabulary: Animals
7. Reading: My School
8. Reading: My Family
9. Writing: My Daily Routine
10. Writing: Describing My Pet
11. Conversation: Greetings & Introductions
12. Conversation: Talking About Favorites

### ป.6 — 12 บท
1. Grammar: Past Simple Tense (复习)
2. Grammar: Future with "will"
3. Grammar: Comparative Adjectives
4. Grammar: There is / There are
5. Vocabulary: Weather & Seasons
6. Vocabulary: Clothes
7. Reading: My Last Holiday
8. Reading: A Letter to a Friend
9. Writing: My Weekend
10. Writing: Describing a Place
11. Conversation: Making Plans
12. Conversation: Ordering Food

### ม.1 — 12 บท
1. Grammar: Present Perfect Tense
2. Grammar: Past Continuous Tense
3. Grammar: Modal Verbs (can/must/should)
4. Grammar: Possessive Pronouns
5. Vocabulary: Hobbies & Interests
6. Vocabulary: School Subjects
7. Reading: A Biography
8. Reading: A Short Story
9. Writing: An Email
10. Writing: A Diary Entry
11. Conversation: Asking for Directions
12. Conversation: Shopping

### ม.2 — 12 บท
1. Grammar: Passive Voice
2. Grammar: Conditionals Type 1 & 2
3. Grammar: Relative Clauses
4. Grammar: Reported Speech
5. Vocabulary: Environment
6. Vocabulary: Health & Body
7. Reading: News Article
8. Reading: Travel Blog
9. Writing: Opinion Paragraph
10. Writing: A Summary
11. Conversation: Giving Opinions
12. Conversation: At the Doctor's

### ม.3 — 12 บท
1. Grammar: All Tenses Review
2. Grammar: Conditionals Type 3
3. Grammar: Wish Clauses
4. Grammar: Connectors & Transitions
5. Vocabulary: Society & Culture
6. Vocabulary: Science & Technology
7. Reading: Longer Passage
8. Reading: Poem Basics
9. Writing: Formal Letter
10. Writing: Short Essay
11. Conversation: Job Interview
12. Conversation: Making a Phone Call

## Vocabulary
~24 words per grade, 120 total. Each word follows existing schema:
```json
{ "id": "vocab-{id}", "word": "...", "translation": "...", "phonetic": "/.../", "category": "string", "exampleSentence": "...", "lessonId": "lesson-{id}" }
```

## Exercises
~12 per grade, 60 total. Mix of multiple-choice, fill-blank, writing.
```json
{ "id": "ex-{id}", "lessonId": "lesson-{id}", "type": "multiple-choice|fill-blank|writing", "question": "...", "options": [...], "correctAnswer": "...", "explanation": "..." }
```
