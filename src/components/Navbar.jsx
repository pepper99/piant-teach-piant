import { Link, useLocation } from 'react-router-dom'

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

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Piant
          </Link>
          <div className="flex gap-1 overflow-x-auto">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
