import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProgressProvider } from '../../context/ProgressContext'
import DailyExercise from '../DailyExercise'

vi.mock('../../hooks/useDailyExercise', () => ({
  default: () => ({
    todaysExercise: [
      { id: 'e1', lessonId: 'l1', type: 'multiple-choice', question: 'Test Q?', options: ['A', 'B'], correctAnswer: 'A', explanation: 'Test' }
    ],
    isDone: false,
    completeExercise: vi.fn(),
  }),
}))

describe('DailyExercise', () => {
  it('renders exercise page', () => {
    render(
      <MemoryRouter>
        <ProgressProvider>
          <DailyExercise />
        </ProgressProvider>
      </MemoryRouter>
    )
    expect(screen.getByText('✍️ แบบฝึกหัดประจำวัน')).toBeInTheDocument()
    expect(screen.getByText('Test Q?')).toBeInTheDocument()
    expect(screen.getByText('ส่งคำตอบ')).toBeInTheDocument()
  })
})
