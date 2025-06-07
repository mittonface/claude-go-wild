export interface Stats {
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
  armorClass: number
  hitPoints: number
  speed: number
  proficiencyBonus: number
  challengeRating?: number
  experiencePoints?: number
}

export interface DiceRollResult {
  formula: string
  rolls: number[]
  total: number
  modifier?: number
}

export interface EncounterDifficulty {
  easy: number
  medium: number
  hard: number
  deadly: number
}

export type Alignment = 
  | 'Lawful Good' | 'Neutral Good' | 'Chaotic Good'
  | 'Lawful Neutral' | 'True Neutral' | 'Chaotic Neutral'
  | 'Lawful Evil' | 'Neutral Evil' | 'Chaotic Evil'

export type ItemRarity = 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Legendary' | 'Artifact'

export type ItemType = 'Weapon' | 'Armor' | 'Potion' | 'Scroll' | 'Wondrous Item' | 'Ring' | 'Rod' | 'Staff' | 'Wand'