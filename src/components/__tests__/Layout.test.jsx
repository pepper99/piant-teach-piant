import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Layout from '../Layout'

describe('Layout', () => {
  it('renders navbar and children', () => {
    render(
      <MemoryRouter>
        <Layout><p>Hello</p></Layout>
      </MemoryRouter>
    )
    expect(screen.getByText('Piant')).toBeInTheDocument()
    expect(screen.getByText('Hello')).toBeInTheDocument()
    expect(screen.getByText('บทเรียน')).toBeInTheDocument()
  })
})
