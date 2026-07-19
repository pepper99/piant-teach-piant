import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import useDailyExercise from '../hooks/useDailyExercise'
import ExerciseQuestion from '../components/ExerciseQuestion'
import { getTodayDate } from '../utils/helpers'

export default function DailyExercise() {
  const { progress, updateProgress, updateLessonProgress } = useProgress()
  const { todaysExercise, isDone, completeExercise } = useDailyExercise(progress, updateProgress)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (isDone) {
      const daily = progress.dailyExercises?.[getTodayDate()]
      if (daily) {
        setScore(daily.score)
        setSubmitted(true)
      }
    }
  }, [isDone])

  const handleAnswer = (exerciseId, isCorrect) => {
    setAnswers(prev => ({ ...prev, [exerciseId]: isCorrect }))
  }

  const handleSubmit = () => {
    const answered = todaysExercise.filter(e => e.id in answers).length
    if (answered < todaysExercise.length) {
      alert('กรุณาทำทุกข้อก่อนส่ง')
      return
    }
    const correct = todaysExercise.filter(e => answers[e.id] === true).length
    const total = todaysExercise.length
    const percentage = Math.round((correct / total) * 100)
    setScore(percentage)
    setSubmitted(true)
    completeExercise(percentage, todaysExercise.map(e => ({
      id: e.id,
      userCorrect: answers[e.id],
    })))
    const lessonIds = [...new Set(todaysExercise.map(e => e.lessonId))]
    lessonIds.forEach(lid => updateLessonProgress(lid, percentage))
  }

  if (submitted) {
    return (
      <div className="space-y-6 text-center py-8">
        <div className="text-6xl mb-4">{score >= 80 ? '🎉' : score >= 50 ? '👍' : '💪'}</div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">แบบฝึกหัดวันนี้</h1>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 inline-block">
          <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{score}%</p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {score >= 80 ? 'เยี่ยมมาก! ได้คะแนนดีมาก' : score >= 50 ? 'ใช้ได้เลย! ลองทำอีกครั้งพรุ่งนี้' : 'สู้ๆ! ฝึกอีกหน่อย'}
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <Link to="/" className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200">กลับหน้าแรก</Link>
          <Link to="/lessons" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">ไปเรียนต่อ</Link>
        </div>
      </div>
    )
  }

  if (isDone) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="text-6xl">✅</div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">วันนี้ทำแบบฝึกหัดแล้ว!</h1>
        <p className="text-gray-500 dark:text-gray-400">คะแนนวันนี้: {score}%</p>
        <p className="text-gray-400 dark:text-gray-500">กลับมาใหม่พรุ่งนี้นะ</p>
        <Link to="/" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">กลับหน้าแรก</Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">✍️ แบบฝึกหัดประจำวัน</h1>
      <p className="text-gray-500 dark:text-gray-400">ทำแบบฝึกหัด {todaysExercise.length} ข้อ</p>

      <div className="space-y-4">
        {todaysExercise.map((ex, i) => (
          <ExerciseQuestion key={ex.id} exercise={ex} index={i} onAnswer={handleAnswer} />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors text-lg"
      >
        ส่งคำตอบ
      </button>
    </div>
  )
}
