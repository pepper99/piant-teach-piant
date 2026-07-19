import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProgressProvider } from '../../context/ProgressContext'
import Settings from '../Settings'

describe('Settings', () => {
  it('renders settings page', () => {
    render(
      <MemoryRouter>
        <ProgressProvider>
          <Settings />
        </ProgressProvider>
      </MemoryRouter>
    )
    expect(screen.getByText('⚙️ ตั้งค่า')).toBeInTheDocument()
    expect(screen.getByText('จำนวนคำศัพท์ต่อวัน')).toBeInTheDocument()
  })
})
