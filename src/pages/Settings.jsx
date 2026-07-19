import { useProgress } from '../context/ProgressContext'
import { useNavigate } from 'react-router-dom'

export default function Settings() {
  const { progress, updateSettings, resetAll } = useProgress()
  const navigate = useNavigate()

  const handleWordsChange = (e) => {
    const val = parseInt(e.target.value, 10)
    if (val >= 1 && val <= 50) {
      updateSettings({ wordsPerDay: val })
    }
  }

  const handleReset = () => {
    if (window.confirm('แน่ใจหรือว่าต้องการรีเซ็ตข้อมูลทั้งหมด? การกระทำนี้ไม่สามารถเรียกคืนได้')) {
      resetAll()
      navigate('/')
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">⚙️ ตั้งค่า</h1>

      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            จำนวนคำศัพท์ต่อวัน
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="1"
              max="20"
              value={progress.settings.wordsPerDay}
              onChange={handleWordsChange}
              className="flex-1"
            />
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400 w-8 text-center">
              {progress.settings.wordsPerDay}
            </span>
          </div>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">ปรับ 1-20 คำต่อวัน (ค่าเริ่มต้น: 5)</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="font-bold text-red-600 dark:text-red-400 mb-3">⚠️ รีเซ็ตข้อมูล</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">ลบข้อมูลการเรียนทั้งหมดของคุณ (คะแนน, คำศัพท์, streak)</p>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
        >
          รีเซ็ตข้อมูลทั้งหมด
        </button>
      </div>
    </div>
  )
}
