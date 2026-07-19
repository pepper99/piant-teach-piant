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
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">📚 บทเรียนทั้งหมด</h1>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex gap-1 flex-wrap">
          {grades.map(g => (
            <button
              key={g.value}
              onClick={() => setGradeFilter(g.value)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                gradeFilter === g.value ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 dark:border-gray-600 hover:bg-gray-50'
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
                topicFilter === t.value ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 dark:border-gray-600 hover:bg-gray-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

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
        <p className="text-center text-gray-400 dark:text-gray-500 py-8">ไม่พบบทเรียนที่ตรงกับเงื่อนไข</p>
      )}
    </div>
  )
}
