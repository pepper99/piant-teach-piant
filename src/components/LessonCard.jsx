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
