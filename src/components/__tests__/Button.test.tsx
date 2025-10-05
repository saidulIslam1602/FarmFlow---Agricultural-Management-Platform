import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '../ui/Button'

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn()
    const user = userEvent.setup()
    
    render(<Button onClick={handleClick}>Click me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    await user.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>)
    let button = screen.getByRole('button')
    expect(button).toHaveClass('btn-primary')
    
    rerender(<Button variant="secondary">Secondary</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('btn-secondary')
    
    rerender(<Button variant="outline">Outline</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('border', 'border-gray-300')
    
    rerender(<Button variant="ghost">Ghost</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('hover:bg-gray-100')
  })

  it('applies size classes correctly', () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    let button = screen.getByRole('button')
    expect(button).toHaveClass('h-8', 'px-3', 'text-xs')
    
    rerender(<Button size="md">Medium</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('h-10', 'px-4', 'text-sm')
    
    rerender(<Button size="lg">Large</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('h-12', 'px-6', 'text-base')
  })

  it('disables button when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('renders with icon when provided', () => {
    const TestIcon = () => <svg data-testid="test-icon" />
    render(<Button icon={<TestIcon />}>With Icon</Button>)
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
    expect(screen.getByText('With Icon')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })
})