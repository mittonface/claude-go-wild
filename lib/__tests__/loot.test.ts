import { 
  generateLootByRarity, 
  generateLootByCR, 
  generateTreasureHoard, 
  calculateTotalValue 
} from '../loot'
import { ItemRarity } from '@/types'

describe('Loot Generation', () => {
  describe('generateLootByRarity', () => {
    it('should generate the correct number of items', () => {
      const result = generateLootByRarity('Common', 3)
      expect(result).toHaveLength(3)
    })

    it('should generate items of the specified rarity', () => {
      const result = generateLootByRarity('Rare', 5)
      result.forEach(item => {
        expect(item.rarity).toBe('Rare')
      })
    })

    it('should handle empty table gracefully', () => {
      const result = generateLootByRarity('Artifact', 3)
      expect(result).toHaveLength(0)
    })

    it('should generate different items across multiple calls', () => {
      const result1 = generateLootByRarity('Common', 10)
      const result2 = generateLootByRarity('Common', 10)
      
      const names1 = result1.map(item => item.name).sort()
      const names2 = result2.map(item => item.name).sort()
      
      expect(names1).not.toEqual(names2)
    })
  })

  describe('generateLootByCR', () => {
    it('should generate appropriate loot for low CR', () => {
      const result = generateLootByCR(2)
      expect(result.length).toBeGreaterThan(0)
      
      const hasRareOrAbove = result.some(item => 
        ['Rare', 'Very Rare', 'Legendary'].includes(item.rarity)
      )
      expect(hasRareOrAbove).toBeFalsy()
    })

    it('should generate more valuable loot for high CR', () => {
      const lowCR = generateLootByCR(1)
      const highCR = generateLootByCR(20)
      
      const lowCRValue = calculateTotalValue(lowCR)
      const highCRValue = calculateTotalValue(highCR)
      
      expect(highCRValue).toBeGreaterThan(lowCRValue)
    })

    it('should allow legendary items for very high CR', () => {
      const results: any[] = []
      for (let i = 0; i < 20; i++) {
        results.push(...generateLootByCR(25))
      }
      
      const hasLegendary = results.some(item => item.rarity === 'Legendary')
      expect(hasLegendary).toBeTruthy()
    })

    it('should generate different results for repeated calls', () => {
      const result1 = generateLootByCR(10)
      const result2 = generateLootByCR(10)
      
      expect(result1).not.toEqual(result2)
    })
  })

  describe('generateTreasureHoard', () => {
    it('should always include coin treasure', () => {
      const result = generateTreasureHoard(5)
      const hasCoins = result.some(item => 
        item.name === 'Treasure Coins' || item.name.includes('Pieces')
      )
      expect(hasCoins).toBeTruthy()
    })

    it('should scale with party level', () => {
      const lowLevel = generateTreasureHoard(1)
      const highLevel = generateTreasureHoard(20)
      
      const lowValue = calculateTotalValue(lowLevel)
      const highValue = calculateTotalValue(highLevel)
      
      expect(highValue).toBeGreaterThan(lowValue)
    })

    it('should generate appropriate items for different levels', () => {
      const lowLevel = generateTreasureHoard(3)
      const highLevel = generateTreasureHoard(15)
      
      expect(lowLevel.length).toBeGreaterThan(0)
      expect(highLevel.length).toBeGreaterThan(0)
      
      const lowValue = calculateTotalValue(lowLevel)
      const highValue = calculateTotalValue(highLevel)
      expect(highValue).toBeGreaterThan(lowValue)
    })

    it('should have appropriate rarity distribution by level', () => {
      const lowLevel = generateTreasureHoard(2)
      const hasHighRarity = lowLevel.some(item => 
        ['Very Rare', 'Legendary'].includes(item.rarity)
      )
      expect(hasHighRarity).toBeFalsy()
      
      const results: any[] = []
      for (let i = 0; i < 10; i++) {
        results.push(...generateTreasureHoard(20))
      }
      const hasVeryRare = results.some(item => item.rarity === 'Very Rare')
      expect(hasVeryRare).toBeTruthy()
    })
  })

  describe('calculateTotalValue', () => {
    it('should return 0 for empty array', () => {
      expect(calculateTotalValue([])).toBe(0)
    })

    it('should sum all item values correctly', () => {
      const items = [
        { name: 'Item 1', type: 'Weapon', rarity: 'Common' as ItemRarity, value: 100, weight: 1 },
        { name: 'Item 2', type: 'Armor', rarity: 'Uncommon' as ItemRarity, value: 250, weight: 1 },
        { name: 'Item 3', type: 'Potion', rarity: 'Rare' as ItemRarity, value: 500, weight: 1 }
      ]
      
      expect(calculateTotalValue(items)).toBe(850)
    })

    it('should handle items without values', () => {
      const items = [
        { name: 'Item 1', type: 'Weapon', rarity: 'Common' as ItemRarity, value: 100, weight: 1 },
        { name: 'Item 2', type: 'Armor', rarity: 'Uncommon' as ItemRarity, weight: 1 },
        { name: 'Item 3', type: 'Potion', rarity: 'Rare' as ItemRarity, value: 300, weight: 1 }
      ]
      
      expect(calculateTotalValue(items)).toBe(400)
    })
  })

  describe('Loot Quality', () => {
    it('should generate items with required properties', () => {
      const result = generateLootByRarity('Uncommon', 5)
      
      result.forEach(item => {
        expect(item.name).toBeDefined()
        expect(item.type).toBeDefined()
        expect(item.rarity).toBe('Uncommon')
        expect(typeof item.weight).toBe('number')
      })
    })

    it('should have realistic value ranges', () => {
      const commonItems = generateLootByRarity('Common', 10)
      const legendaryItems = generateLootByRarity('Legendary', 5)
      
      const commonValue = calculateTotalValue(commonItems) / commonItems.length
      const legendaryValue = calculateTotalValue(legendaryItems) / legendaryItems.length
      
      expect(legendaryValue).toBeGreaterThan(commonValue * 10)
    })

    it('should maintain consistent item properties', () => {
      const result = generateLootByRarity('Rare', 1)
      if (result.length > 0) {
        const item = result[0]
        expect(item.name).toBeTruthy()
        expect(['Weapon', 'Armor', 'Potion', 'Scroll', 'Wondrous Item', 'Ring', 'Rod', 'Staff', 'Wand']).toContain(item.type)
        expect(item.weight).toBeGreaterThan(0)
      }
    })
  })
})