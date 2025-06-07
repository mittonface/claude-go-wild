import { ItemRarity, ItemType } from '@/types'

interface LootTableEntry {
  name: string
  type: ItemType
  rarity: ItemRarity
  value?: number
  description?: string
  properties?: Record<string, any>
  weight: number
}

const commonItems: LootTableEntry[] = [
  { name: 'Copper Pieces', type: 'Wondrous Item', rarity: 'Common', value: 1, weight: 50, description: '2d6 × 100 copper pieces' },
  { name: 'Silver Pieces', type: 'Wondrous Item', rarity: 'Common', value: 10, weight: 30, description: '2d4 × 10 silver pieces' },
  { name: 'Simple Weapon', type: 'Weapon', rarity: 'Common', value: 2, weight: 20, description: 'A basic weapon like a dagger or club' },
  { name: 'Rations', type: 'Wondrous Item', rarity: 'Common', value: 2, weight: 15, description: 'Travel rations (1d4 days)' },
  { name: 'Rope (50 feet)', type: 'Wondrous Item', rarity: 'Common', value: 2, weight: 10, description: 'Hempen rope' },
  { name: 'Torch', type: 'Wondrous Item', rarity: 'Common', value: 1, weight: 15, description: '1d6 torches' },
  { name: 'Healing Potion', type: 'Potion', rarity: 'Common', value: 50, weight: 10, description: 'Potion of Healing (2d4+2 hp)' }
]

const uncommonItems: LootTableEntry[] = [
  { name: 'Gold Pieces', type: 'Wondrous Item', rarity: 'Uncommon', value: 100, weight: 40, description: '2d6 × 10 gold pieces' },
  { name: 'Bag of Holding', type: 'Wondrous Item', rarity: 'Uncommon', value: 4000, weight: 5, description: 'A magical bag that can hold 500 pounds' },
  { name: 'Cloak of Elvenkind', type: 'Wondrous Item', rarity: 'Uncommon', value: 1000, weight: 3, description: 'Advantage on Stealth checks' },
  { name: 'Boots of Speed', type: 'Wondrous Item', rarity: 'Uncommon', value: 800, weight: 4, description: 'Double movement speed for 10 minutes' },
  { name: '+1 Weapon', type: 'Weapon', rarity: 'Uncommon', value: 1000, weight: 8, description: 'A weapon with +1 enhancement bonus' },
  { name: 'Scroll of Fireball', type: 'Scroll', rarity: 'Uncommon', value: 150, weight: 10, description: 'Spell scroll (3rd level)' },
  { name: 'Potion of Greater Healing', type: 'Potion', rarity: 'Uncommon', value: 150, weight: 15, description: 'Restores 4d4+4 hit points' }
]

const rareItems: LootTableEntry[] = [
  { name: 'Platinum Pieces', type: 'Wondrous Item', rarity: 'Rare', value: 1000, weight: 30, description: '1d4 × 10 platinum pieces' },
  { name: 'Ring of Protection', type: 'Ring', rarity: 'Rare', value: 3500, weight: 8, description: '+1 bonus to AC and saving throws' },
  { name: 'Wand of Magic Missiles', type: 'Wand', rarity: 'Rare', value: 3000, weight: 6, description: '7 charges, regains 1d6+1 daily' },
  { name: 'Amulet of Health', type: 'Wondrous Item', rarity: 'Rare', value: 8000, weight: 4, description: 'Constitution becomes 19' },
  { name: '+2 Weapon', type: 'Weapon', rarity: 'Rare', value: 4000, weight: 5, description: 'A weapon with +2 enhancement bonus' },
  { name: 'Gem', type: 'Wondrous Item', rarity: 'Rare', value: 1000, weight: 10, description: 'A valuable gemstone worth 1000 gp' },
  { name: 'Spell Scroll (5th level)', type: 'Scroll', rarity: 'Rare', value: 1000, weight: 7, description: 'Contains a 5th level spell' }
]

const veryRareItems: LootTableEntry[] = [
  { name: 'Rod of Lordly Might', type: 'Rod', rarity: 'Very Rare', value: 28000, weight: 3, description: 'A versatile magical rod with multiple functions' },
  { name: 'Staff of Power', type: 'Staff', rarity: 'Very Rare', value: 95500, weight: 2, description: 'Powerful staff with spell storage' },
  { name: '+3 Weapon', type: 'Weapon', rarity: 'Very Rare', value: 12000, weight: 4, description: 'A weapon with +3 enhancement bonus' },
  { name: 'Cloak of Invisibility', type: 'Wondrous Item', rarity: 'Very Rare', value: 80000, weight: 2, description: 'Grants invisibility at will' },
  { name: 'Manual of Bodily Health', type: 'Wondrous Item', rarity: 'Very Rare', value: 137500, weight: 1, description: 'Increases Constitution by 2' },
  { name: 'Art Object', type: 'Wondrous Item', rarity: 'Very Rare', value: 7500, weight: 5, description: 'Valuable art piece worth 7500 gp' }
]

const legendaryItems: LootTableEntry[] = [
  { name: 'Holy Avenger', type: 'Weapon', rarity: 'Legendary', value: 165000, weight: 2, description: 'Legendary paladin sword' },
  { name: 'Ring of Wishes', type: 'Ring', rarity: 'Legendary', value: 250000, weight: 1, description: 'Grants 3 wishes' },
  { name: 'Deck of Many Things', type: 'Wondrous Item', rarity: 'Legendary', value: 50000, weight: 1, description: 'Dangerous magical deck of cards' },
  { name: 'Sphere of Annihilation', type: 'Wondrous Item', rarity: 'Legendary', value: 200000, weight: 1, description: 'A 2-foot-diameter sphere of nothingness' }
]

const lootTables: Record<ItemRarity, LootTableEntry[]> = {
  'Common': commonItems,
  'Uncommon': uncommonItems,
  'Rare': rareItems,
  'Very Rare': veryRareItems,
  'Legendary': legendaryItems,
  'Artifact': [] // Artifacts are unique and not randomly generated
}

export function generateLootByRarity(rarity: ItemRarity, count: number = 1): LootTableEntry[] {
  const table = lootTables[rarity]
  if (!table || table.length === 0) return []

  const results: LootTableEntry[] = []
  
  for (let i = 0; i < count; i++) {
    const totalWeight = table.reduce((sum, item) => sum + item.weight, 0)
    const roll = Math.random() * totalWeight
    
    let currentWeight = 0
    for (const item of table) {
      currentWeight += item.weight
      if (roll <= currentWeight) {
        results.push(item)
        break
      }
    }
  }
  
  return results
}

export function generateLootByCR(challengeRating: number): LootTableEntry[] {
  const results: LootTableEntry[] = []
  
  if (challengeRating <= 4) {
    // CR 0-4: Mostly common items, few uncommon
    results.push(...generateLootByRarity('Common', Math.floor(Math.random() * 3) + 1))
    if (Math.random() < 0.3) {
      results.push(...generateLootByRarity('Uncommon', 1))
    }
  } else if (challengeRating <= 10) {
    // CR 5-10: Common and uncommon, some rare
    results.push(...generateLootByRarity('Common', Math.floor(Math.random() * 2) + 1))
    results.push(...generateLootByRarity('Uncommon', Math.floor(Math.random() * 2) + 1))
    if (Math.random() < 0.4) {
      results.push(...generateLootByRarity('Rare', 1))
    }
  } else if (challengeRating <= 16) {
    // CR 11-16: Uncommon and rare, some very rare
    results.push(...generateLootByRarity('Uncommon', Math.floor(Math.random() * 2) + 1))
    results.push(...generateLootByRarity('Rare', Math.floor(Math.random() * 2) + 1))
    if (Math.random() < 0.3) {
      results.push(...generateLootByRarity('Very Rare', 1))
    }
  } else {
    // CR 17+: Rare, very rare, and legendary
    results.push(...generateLootByRarity('Rare', Math.floor(Math.random() * 2) + 1))
    results.push(...generateLootByRarity('Very Rare', Math.floor(Math.random() * 2) + 1))
    if (Math.random() < 0.2) {
      results.push(...generateLootByRarity('Legendary', 1))
    }
  }
  
  return results
}

export function generateTreasureHoard(partyLevel: number): LootTableEntry[] {
  const results: LootTableEntry[] = []
  
  // Base coins
  const coinMultiplier = Math.max(1, Math.floor(partyLevel / 4))
  results.push({
    name: 'Treasure Coins',
    type: 'Wondrous Item',
    rarity: 'Common',
    value: (Math.floor(Math.random() * 6) + 1) * 100 * coinMultiplier,
    weight: 100,
    description: `Mixed coins worth ${(Math.floor(Math.random() * 6) + 1) * 100 * coinMultiplier} gp`
  })
  
  // Magic items based on party level
  if (partyLevel <= 4) {
    results.push(...generateLootByRarity('Common', Math.floor(Math.random() * 3) + 1))
    if (Math.random() < 0.5) results.push(...generateLootByRarity('Uncommon', 1))
  } else if (partyLevel <= 10) {
    results.push(...generateLootByRarity('Uncommon', Math.floor(Math.random() * 3) + 1))
    if (Math.random() < 0.6) results.push(...generateLootByRarity('Rare', 1))
  } else if (partyLevel <= 16) {
    results.push(...generateLootByRarity('Rare', Math.floor(Math.random() * 2) + 1))
    if (Math.random() < 0.4) results.push(...generateLootByRarity('Very Rare', 1))
  } else {
    results.push(...generateLootByRarity('Very Rare', Math.floor(Math.random() * 2) + 1))
    if (Math.random() < 0.2) results.push(...generateLootByRarity('Legendary', 1))
  }
  
  return results
}

export function calculateTotalValue(loot: LootTableEntry[]): number {
  return loot.reduce((total, item) => total + (item.value || 0), 0)
}