import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PriorityBadge } from './PriorityBadge'

describe('PriorityBadge', () => {
  it('renders Low', () => {
    render(<PriorityBadge priority="low" />)
    expect(screen.getByText('Low')).toBeInTheDocument()
  })

  it('renders Medium', () => {
    render(<PriorityBadge priority="medium" />)
    expect(screen.getByText('Medium')).toBeInTheDocument()
  })

  it('renders High', () => {
    render(<PriorityBadge priority="high" />)
    expect(screen.getByText('High')).toBeInTheDocument()
  })
})
