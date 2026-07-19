import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProgressProvider } from '../../context/ProgressContext'
import Vocabulary from '../Vocabulary'

describe('Vocabulary', () => {
  it('renders vocabulary page', () => {
    render(
      <MemoryRouter>
        <ProgressProvider>
          <Vocabulary />
        </ProgressProvider>
      </MemoryRouter>
    )
    expect(screen.getByText('📖 คำศัพท์')).toBeInTheDocument()
    expect(screen.getByText(/คำศัพท์วันนี้/)).toBeInTheDocument()
  })
})
