import { useState } from 'react'

export default function ExerciseQuestion({ exercise, index, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [writingAnswer, setWritingAnswer] = useState('')

  const handleSelect = (opt) => {
    if (selected !== null) return
    setSelected(opt)
    const isCorrect = opt === exercise.correctAnswer
    onAnswer(exercise.id, isCorrect)
    setShowAnswer(true)
  }

  const handleWritingSubmit = () => {
    if (!writingAnswer.trim()) return
    setShowAnswer(true)
    onAnswer(exercise.id, null)
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">ข้อที่ {index + 1}</p>
      <p className="text-gray-800 dark:text-gray-200 font-medium mb-3">{exercise.question}</p>

      {exercise.type === 'multiple-choice' && exercise.options?.length > 0 && (
        <div className="space-y-2">
          {exercise.options.map(opt => {
            let classes = 'block w-full text-left p-3 rounded-lg border transition-colors '
            if (selected === null) {
              classes += 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-gray-200'
            } else if (opt === exercise.correctAnswer) {
              classes += 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200'
            } else if (opt === selected) {
              classes += 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200'
            } else {
              classes += 'border-gray-200 opacity-50'
            }
            return (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className={classes}
                disabled={selected !== null}
              >
                {opt}
              </button>
            )
          })}
        </div>
      )}

      {exercise.type === 'fill-blank' && (
        <div className="space-y-2">
          <input
            type="text"
            value={writingAnswer}
            onChange={(e) => setWritingAnswer(e.target.value)}
            disabled={showAnswer}
            placeholder="พิมพ์คำตอบที่นี่..."
            className="w-full p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 dark:focus:border-blue-500"
          />
          {!showAnswer && (
            <button
              onClick={handleWritingSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              ตรวจคำตอบ
            </button>
          )}
          {showAnswer && (
            <div className={`p-3 rounded-lg ${writingAnswer.toLowerCase().trim() === exercise.correctAnswer.toLowerCase().trim() ? 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200'}`}>
              {writingAnswer.toLowerCase().trim() === exercise.correctAnswer.toLowerCase().trim()
                ? '✓ ถูกต้อง!'
                : `✗ เฉลย: ${exercise.correctAnswer}`}
            </div>
          )}
        </div>
      )}

      {exercise.type === 'writing' && (
        <div className="space-y-2">
          <textarea
            value={writingAnswer}
            onChange={(e) => setWritingAnswer(e.target.value)}
            disabled={showAnswer}
            placeholder="เขียนคำตอบที่นี่..."
            rows={3}
            className="w-full p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 dark:focus:border-blue-500"
          />
          {!showAnswer && (
            <button
              onClick={handleWritingSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              ตรวจคำตอบ
            </button>
          )}
          {showAnswer && (
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg border border-yellow-200">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">💡 ตัวอย่างคำตอบที่ถูกต้อง:</p>
              <p className="text-gray-800 dark:text-gray-200 font-medium">{exercise.correctAnswer}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{exercise.explanation}</p>
            </div>
          )}
        </div>
      )}

      {showAnswer && exercise.explanation && exercise.type === 'multiple-choice' && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{exercise.explanation}</p>
      )}
    </div>
  )
}
