import { cn, formatNumber, generateId } from '../utils'

describe('Utils', () => {
  describe('cn (classNames utility)', () => {
    it('merges class names correctly', () => {
      const result = cn('class1', 'class2')
      expect(result).toContain('class1')
      expect(result).toContain('class2')
    })

    it('handles conditional classes', () => {
      const result = cn('class1', false && 'class2', 'class3')
      expect(result).toContain('class1')
      expect(result).toContain('class3')
      expect(result).not.toContain('class2')
    })

    it('handles undefined and null values', () => {
      const result = cn('class1', undefined, null, 'class2')
      expect(result).toContain('class1')
      expect(result).toContain('class2')
    })
  })

  describe('formatNumber', () => {
    it('formats numbers with default 2 decimals', () => {
      expect(formatNumber(1000)).toBe('1000.00')
      expect(formatNumber(1234.5678)).toBe('1234.57')
    })

    it('formats numbers with custom decimals', () => {
      expect(formatNumber(1234.5678, 0)).toBe('1235')
      expect(formatNumber(1234.5678, 3)).toBe('1234.568')
    })

    it('handles zero and negative numbers', () => {
      expect(formatNumber(0)).toBe('0.00')
      expect(formatNumber(-1000)).toBe('-1000.00')
      expect(formatNumber(-1234.56, 1)).toBe('-1234.6')
    })
  })

  describe('generateId', () => {
    it('generates unique IDs', () => {
      const id1 = generateId()
      const id2 = generateId()
      
      expect(id1).toBeTruthy()
      expect(id2).toBeTruthy()
      expect(id1).not.toBe(id2)
    })

    it('returns a string', () => {
      const id = generateId()
      expect(typeof id).toBe('string')
      expect(id.length).toBeGreaterThan(0)
    })
  })
})