import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProgressProvider } from '../../context/ProgressContext'
import Layout from '../Layout'

describe('Layout', () => {
  it('renders navbar and children', () => {
    render(
      <MemoryRouter>
        <ProgressProvider>
          <Layout><p>Hello</p></Layout>
        </ProgressProvider>
      </MemoryRouter>
    )
    expect(screen.getByText('Piant teach Piant')).toBeInTheDocument()
    expect(screen.getByText('Hello')).toBeInTheDocument()
    expect(screen.getByText('บทเรียน')).toBeInTheDocument()
  })
})
