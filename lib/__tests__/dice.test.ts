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
      // Mock Math.random to return deterministic values
      const originalRandom = Math.random
      Math.random = jest.fn()
        .mockReturnValueOnce(0.05)  // First roll: 2
        .mockReturnValueOnce(0.95)  // Second roll: 20
      
      const result = rollAdvantage('1d20')
      expect(result.total).toBe(20) // Should return the higher roll
      
      Math.random = originalRandom
    })

    it('should handle ties by returning first roll', () => {
      const originalRandom = Math.random
      Math.random = jest.fn()
        .mockReturnValueOnce(0.5)   // First roll: 11
        .mockReturnValueOnce(0.5)   // Second roll: 11
      
      const result = rollAdvantage('1d20')
      expect(result.total).toBe(11) // Should return first roll on tie
      
      Math.random = originalRandom
    })
  })

  describe('rollDisadvantage', () => {
    it('should return the lower of two rolls', () => {
      // Mock Math.random to return deterministic values
      const originalRandom = Math.random
      Math.random = jest.fn()
        .mockReturnValueOnce(0.05)  // First roll: 2
        .mockReturnValueOnce(0.95)  // Second roll: 20
      
      const result = rollDisadvantage('1d20')
      expect(result.total).toBe(2) // Should return the lower roll
      
      Math.random = originalRandom
    })

    it('should handle ties by returning first roll', () => {
      const originalRandom = Math.random
      Math.random = jest.fn()
        .mockReturnValueOnce(0.5)   // First roll: 11
        .mockReturnValueOnce(0.5)   // Second roll: 11
      
      const result = rollDisadvantage('1d20')
      expect(result.total).toBe(11) // Should return first roll on tie
      
      Math.random = originalRandom
    })
  })
})