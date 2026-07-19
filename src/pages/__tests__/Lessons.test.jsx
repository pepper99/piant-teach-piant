import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProgressProvider } from '../../context/ProgressContext'
import Lessons from '../Lessons'

describe('Lessons', () => {
  it('renders lesson list with filters', () => {
    render(
      <MemoryRouter>
        <ProgressProvider>
          <Lessons />
        </ProgressProvider>
      </MemoryRouter>
    )
    expect(screen.getByText('📚 บทเรียนทั้งหมด')).toBeInTheDocument()
    expect(screen.getByText('Present Simple Tense')).toBeInTheDocument()
  })
})
