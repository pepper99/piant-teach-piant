import { useState } from 'react'
import { useProgress } from '../context/ProgressContext'
import useDailyVocab from '../hooks/useDailyVocab'
import VocabCard from '../components/VocabCard'
import vocabulary from '../data/vocabulary.json'
import { groupBy } from '../utils/helpers'

const categoryLabels = {
  food: 'อาหาร',
  time: 'เวลา',
  animal: 'สัตว์',
  adjective: 'คำคุณศัพท์',
  action: 'คำกริยา',
  feeling: 'ความรู้สึก',
}

export default function Vocabulary() {
  const { progress, updateProgress } = useProgress()
  const { todaysWords, markKnown, markUnknown, stats } = useDailyVocab(
    progress.settings.wordsPerDay, progress, updateProgress
  )
  const [tab, setTab] = useState('today')
  const groupedVocab = groupBy(vocabulary, 'category')

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">📖 คำศัพท์</h1>

      <div className="flex gap-2">
        <button
          onClick={() => setTab('today')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${tab === 'today' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 dark:border-gray-600'}`}
        >
          คำศัพท์วันนี้ ({todaysWords.length})
        </button>
        <button
          onClick={() => setTab('all')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${tab === 'all' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 dark:border-gray-600'}`}
        >
          คำศัพท์ทั้งหมด
        </button>
      </div>

      <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
        <span>รู้แล้ว: <strong className="text-green-600 dark:text-green-400">{stats.knownCount}</strong> คำ</span>
        <span>เคยเรียน: <strong className="text-blue-600 dark:text-blue-400">{stats.totalSeen}</strong> คำ</span>
        <span>ทั้งหมด: <strong>{vocabulary.length}</strong> คำ</span>
      </div>

      {tab === 'today' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {todaysWords.map(w => (
            <VocabCard key={w.id} word={w} onKnown={markKnown} onUnknown={markUnknown} />
          ))}
        </div>
      )}

      {tab === 'all' && (
        <div className="space-y-6">
          {Object.entries(groupedVocab).map(([category, words]) => (
            <div key={category}>
              <h2 className="font-bold text-gray-700 dark:text-gray-300 mb-2">{categoryLabels[category] || category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {words.map(w => (
                  <div key={w.id} className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{w.word}</span>
                      <span className="text-gray-400 dark:text-gray-500 ml-2 text-sm">{w.phonetic}</span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{w.translation}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
