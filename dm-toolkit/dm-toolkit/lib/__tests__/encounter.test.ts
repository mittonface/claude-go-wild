import { 
  calculateEncounterDifficulty, 
  getEncounterMultiplier, 
  calculateAdjustedXP,
  getDifficultyLabel 
} from '../encounter'

describe('Encounter Calculations', () => {
  describe('calculateEncounterDifficulty', () => {
    it('should calculate difficulty thresholds for a party', () => {
      const difficulty = calculateEncounterDifficulty(5, 4)
      
      expect(difficulty.easy).toBe(1000)     // 250 * 4
      expect(difficulty.medium).toBe(2000)   // 500 * 4
      expect(difficulty.hard).toBe(3000)     // 750 * 4
      expect(difficulty.deadly).toBe(4400)   // 1100 * 4
    })

    it('should handle different party sizes', () => {
      const smallParty = calculateEncounterDifficulty(1, 2)
      const largeParty = calculateEncounterDifficulty(1, 6)
      
      expect(smallParty.easy).toBe(50)      // 25 * 2
      expect(largeParty.easy).toBe(150)     // 25 * 6
    })
  })

  describe('getEncounterMultiplier', () => {
    it('should return correct multiplier for single monster', () => {
      expect(getEncounterMultiplier(1, 4)).toBe(1)
    })

    it('should return correct multiplier for multiple monsters', () => {
      expect(getEncounterMultiplier(2, 4)).toBe(1.5)
      expect(getEncounterMultiplier(3, 4)).toBe(2)
      expect(getEncounterMultiplier(7, 4)).toBe(2.5)
      expect(getEncounterMultiplier(11, 4)).toBe(3)
      expect(getEncounterMultiplier(15, 4)).toBe(4)
    })

    it('should adjust for small parties', () => {
      expect(getEncounterMultiplier(2, 2)).toBe(2)     // Adjusted from 1.5
      expect(getEncounterMultiplier(4, 2)).toBe(2)     // Adjusted stays at 2
    })

    it('should adjust for large parties', () => {
      expect(getEncounterMultiplier(4, 6)).toBe(1.5)   // Adjusted from 2
      expect(getEncounterMultiplier(8, 6)).toBe(2)     // Adjusted from 2.5
    })
  })

  describe('calculateAdjustedXP', () => {
    it('should calculate adjusted XP for encounters', () => {
      expect(calculateAdjustedXP(1000, 1, 4)).toBe(1000)   // 1000 * 1
      expect(calculateAdjustedXP(1000, 2, 4)).toBe(1500)   // 1000 * 1.5
      expect(calculateAdjustedXP(1000, 4, 4)).toBe(2000)   // 1000 * 2
    })
  })

  describe('getDifficultyLabel', () => {
    it('should return correct difficulty label', () => {
      const thresholds = {
        easy: 250,
        medium: 500,
        hard: 750,
        deadly: 1100
      }
      
      expect(getDifficultyLabel(100, thresholds)).toBe('Trivial')
      expect(getDifficultyLabel(300, thresholds)).toBe('Easy')
      expect(getDifficultyLabel(600, thresholds)).toBe('Medium')
      expect(getDifficultyLabel(900, thresholds)).toBe('Hard')
      expect(getDifficultyLabel(1200, thresholds)).toBe('Deadly')
    })
  })
})