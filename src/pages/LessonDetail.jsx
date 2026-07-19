import { useParams, Link } from 'react-router-dom'
import lessons from '../data/lessons.json'
import vocabulary from '../data/vocabulary.json'
import { useProgress } from '../context/ProgressContext'

export default function LessonDetail() {
  const { id } = useParams()
  const { progress, updateLessonProgress } = useProgress()
  const lesson = lessons.find(l => l.id === id)

  if (!lesson) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">ไม่พบบทเรียนนี้</p>
        <Link to="/lessons" className="text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block">กลับไปหน้าบทเรียน</Link>
      </div>
    )
  }

  const lessonVocab = vocabulary.filter(v => lesson.vocabularyIds.includes(v.id))
  const isCompleted = id in progress.completedLessons

  const handleComplete = () => {
    updateLessonProgress(id, 100)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link to="/lessons" className="hover:underline">บทเรียน</Link>
        <span>/</span>
        <span>{lesson.title}</span>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{lesson.title}</h1>
          <span className="text-sm bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">{lesson.gradeLabel}</span>
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
          <span className="px-4 py-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-lg text-sm">✅ เรียนแล้ว</span>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
        {lesson.content.map((section, i) => (
          <div key={i} className={section.type === 'example' ? 'pl-4 border-l-4 border-blue-300 text-gray-700 dark:text-gray-300' : 'text-gray-800 dark:text-gray-200'}>
            {section.body}
          </div>
        ))}
      </div>

      {lessonVocab.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-3">📖 คำศัพท์ในบทนี้</h2>
          <div className="space-y-2">
            {lessonVocab.map(v => (
              <div key={v.id} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{v.word}</span>
                  <span className="text-gray-400 dark:text-gray-500 ml-2 text-sm">{v.phonetic}</span>
                </div>
                <span className="text-gray-600 dark:text-gray-300">{v.translation}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
