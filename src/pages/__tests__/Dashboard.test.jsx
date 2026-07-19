import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProgressProvider } from '../../context/ProgressContext'
import Dashboard from '../Dashboard'

describe('Dashboard', () => {
  it('renders welcome message', () => {
    render(
      <MemoryRouter>
        <ProgressProvider>
          <Dashboard />
        </ProgressProvider>
      </MemoryRouter>
    )
    expect(screen.getByText(/มาเรียนภาษาอังกฤษกันเถอะ/)).toBeInTheDocument()
    expect(screen.getByText('📝 แบบฝึกหัดประจำวัน')).toBeInTheDocument()
  })
})
