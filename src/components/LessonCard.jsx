import { Link } from 'react-router-dom'

export default function LessonCard({ lesson, isCompleted, bestScore }) {
  return (
    <Link
      to={`/lessons/${lesson.id}`}
      className="block bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-800 dark:text-gray-200">{lesson.title}</h3>
        <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full whitespace-nowrap">
          {lesson.gradeLabel}
        </span>
      </div>
      <div className="flex gap-1 flex-wrap">
        {lesson.topics.map(t => (
          <span key={t} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
            {t === 'grammar' ? 'ไวยากรณ์' : t === 'vocabulary' ? 'คำศัพท์' : t === 'reading' ? 'การอ่าน' : t === 'writing' ? 'การเขียน' : 'บทสนทนา'}
          </span>
        ))}
      </div>
      {isCompleted && (
        <div className="mt-2 text-sm text-green-600 dark:text-green-400">
          ✅ เรียนแล้ว {bestScore !== undefined && `| คะแนนสูงสุด: ${bestScore}%`}
        </div>
      )}
    </Link>
  )
}
