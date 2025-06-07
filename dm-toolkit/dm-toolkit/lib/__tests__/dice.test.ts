import { rollDice, rollAdvantage, rollDisadvantage } from '../dice'

describe('Dice Rolling', () => {
  describe('rollDice', () => {
    it('should roll a single die', () => {
      const result = rollDice('1d20')
      expect(result.formula).toBe('1d20')
      expect(result.rolls).toHaveLength(1)
      expect(result.rolls[0]).toBeGreaterThanOrEqual(1)
      expect(result.rolls[0]).toBeLessThanOrEqual(20)
      expect(result.total).toBe(result.rolls[0])
      expect(result.modifier).toBe(0)
    })

    it('should roll multiple dice', () => {
      const result = rollDice('3d6')
      expect(result.rolls).toHaveLength(3)
      result.rolls.forEach(roll => {
        expect(roll).toBeGreaterThanOrEqual(1)
        expect(roll).toBeLessThanOrEqual(6)
      })
      expect(result.total).toBe(result.rolls.reduce((sum, roll) => sum + roll, 0))
    })

    it('should handle positive modifiers', () => {
      const result = rollDice('1d20+5')
      expect(result.modifier).toBe(5)
      expect(result.total).toBe(result.rolls[0] + 5)
    })

    it('should handle negative modifiers', () => {
      const result = rollDice('1d20-3')
      expect(result.modifier).toBe(-3)
      expect(result.total).toBe(result.rolls[0] - 3)
    })

    it('should throw error for invalid formula', () => {
      expect(() => rollDice('invalid')).toThrow('Invalid dice formula')
      expect(() => rollDice('abc')).toThrow('Invalid dice formula')
      expect(() => rollDice('')).toThrow('Invalid dice formula')
    })
  })

  describe('rollAdvantage', () => {
    it('should return the higher of two rolls', () => {
      const results: number[] = []
      for (let i = 0; i < 10; i++) {
        const result = rollAdvantage('1d20')
        results.push(result.total)
      }
      
      const average = results.reduce((sum, val) => sum + val, 0) / results.length
      expect(average).toBeGreaterThan(10) // Should trend higher than average
    })
  })

  describe('rollDisadvantage', () => {
    it('should return the lower of two rolls', () => {
      const results: number[] = []
      for (let i = 0; i < 10; i++) {
        const result = rollDisadvantage('1d20')
        results.push(result.total)
      }
      
      const average = results.reduce((sum, val) => sum + val, 0) / results.length
      expect(average).toBeLessThan(11) // Should trend lower than average
    })
  })
})