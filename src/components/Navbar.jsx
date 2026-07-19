import { Link, useLocation } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'

const navItems = [
  { path: '/', label: 'หน้าแรก', icon: '🏠' },
  { path: '/lessons', label: 'บทเรียน', icon: '📚' },
  { path: '/exercises/daily', label: 'แบบฝึกหัด', icon: '✍️' },
  { path: '/vocabulary', label: 'คำศัพท์', icon: '📖' },
  { path: '/progress', label: 'ความคืบหน้า', icon: '📊' },
  { path: '/settings', label: 'ตั้งค่า', icon: '⚙️' },
]

export default function Navbar() {
  const location = useLocation()
  const { progress, updateSettings } = useProgress()

  const isDark = document.documentElement.classList.contains('dark') || progress.settings.darkMode

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Piant teach Piant
          </Link>
          <div className="flex items-center gap-1 overflow-x-auto">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                const next = !document.documentElement.classList.contains('dark')
                document.documentElement.classList.toggle('dark')
                updateSettings({ darkMode: next })
              }}
              className="ml-2 p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title={isDark ? 'โหมดสว่าง' : 'โหมดมืด'}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
