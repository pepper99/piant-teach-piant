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
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">สวัสดี! มาเรียนภาษาอังกฤษกันเถอะ 🎉</h1>

      <Link
        to="/exercises/daily"
        className="block p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
      >
        <h2 className="text-lg font-bold">📝 แบบฝึกหัดประจำวัน</h2>
        <p className="text-blue-100 mt-1">มาทำแบบฝึกหัดกันเถอะ!</p>
      </Link>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{completedCount}/{totalLessons}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">บทเรียนที่เรียนแล้ว</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.knownCount}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">คำศัพท์ที่รู้แล้ว</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.totalSeen}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">คำศัพท์ที่เคยเจอ</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-gray-800 dark:text-gray-200">📖 คำศัพท์วันนี้</h2>
          <Link to="/vocabulary" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">ดูทั้งหมด</Link>
        </div>
        <div className="space-y-2">
          {todaysWords.slice(0, 3).map(w => (
            <div key={w.id} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <span className="font-medium text-gray-800 dark:text-gray-200">{w.word}</span>
              <span className="text-gray-500 dark:text-gray-400">{w.translation}</span>
            </div>
          ))}
          {todaysWords.length > 3 && (
            <p className="text-sm text-gray-400 dark:text-gray-500 text-center">+ อีก {todaysWords.length - 3} คำ</p>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-gray-800 dark:text-gray-200">📚 บทเรียนล่าสุด</h2>
          <Link to="/lessons" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">ดูทั้งหมด</Link>
        </div>
        <div className="space-y-2">
          {lessons.slice(0, 3).map(lesson => (
            <Link
              key={lesson.id}
              to={`/lessons/${lesson.id}`}
              className="block p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:bg-gray-700 transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800 dark:text-gray-200">{lesson.title}</span>
                <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
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
