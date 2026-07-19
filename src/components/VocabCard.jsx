import { useState } from 'react'

export default function VocabCard({ word, onKnown, onUnknown, showActions = true }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{word.word}</h3>
            {word.phonetic && (
              <p className="text-sm text-gray-400">{word.phonetic}</p>
            )}
          </div>
          <button
            onClick={() => setFlipped(!flipped)}
            className="text-sm text-blue-600 hover:underline"
          >
            {flipped ? 'ซ่อนคำแปล' : 'ดูคำแปล'}
          </button>
        </div>

        {flipped && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <p className="text-gray-800 font-medium">{word.translation}</p>
            <p className="text-gray-600 text-sm mt-1">{word.exampleSentence}</p>
          </div>
        )}
      </div>

      {showActions && (
        <div className="flex border-t border-gray-100">
          <button
            onClick={() => onUnknown?.(word.id)}
            className="flex-1 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            ❌ ยังไม่แม่น
          </button>
          <button
            onClick={() => onKnown?.(word.id)}
            className="flex-1 py-2 text-sm text-green-600 hover:bg-green-50 transition-colors border-l border-gray-100"
          >
            ✅ รู้แล้ว
          </button>
        </div>
      )}
    </div>
  )
}
