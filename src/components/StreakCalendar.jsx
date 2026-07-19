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
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-3">🔥 Streak การเรียน</h2>
      <div className="text-center mb-3">
        <span className="text-3xl font-bold text-orange-500">{currentStreak}</span>
        <span className="text-gray-500 dark:text-gray-400 ml-2">วันติดต่อกัน</span>
      </div>
      <div className="flex justify-center gap-2">
        {weekDays.map(day => {
          const isToday = day === today
          const isActive = day === lastActive
          const dayLabel = new Date(day + 'T12:00:00').toLocaleDateString('th-TH', { weekday: 'short' })
          return (
            <div key={day} className="text-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                isActive ? 'bg-orange-500 text-white' : isToday ? 'border-2 border-orange-300 text-gray-400 dark:text-gray-500' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
              }`}>
                {isActive ? '🔥' : day.split('-')[2]}
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{dayLabel}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
