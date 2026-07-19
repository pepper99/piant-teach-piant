import { useProgress } from '../context/ProgressContext'
import StreakCalendar from '../components/StreakCalendar'
import lessons from '../data/lessons.json'

export default function Progress() {
  const { progress } = useProgress()
  const completedCount = Object.keys(progress.completedLessons).length
  const totalLessons = lessons.length
  const today = new Date().toISOString().split('T')[0]
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
