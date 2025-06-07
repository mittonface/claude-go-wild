const firstNames = {
  male: [
    'Aldric', 'Bran', 'Cedric', 'Darius', 'Edmund', 'Felix', 'Gareth', 'Hugo',
    'Ivan', 'Jasper', 'Klaus', 'Leon', 'Magnus', 'Nikolai', 'Oscar', 'Percival',
    'Quentin', 'Roland', 'Sebastian', 'Thaddeus', 'Ulrich', 'Victor', 'Wilhelm', 'Xavier'
  ],
  female: [
    'Aria', 'Beatrice', 'Celeste', 'Diana', 'Elena', 'Freya', 'Gwendolyn', 'Helena',
    'Iris', 'Josephine', 'Katarina', 'Luna', 'Morgana', 'Nadine', 'Ophelia', 'Penelope',
    'Quinn', 'Rosalind', 'Seraphina', 'Thea', 'Ursula', 'Vivienne', 'Willow', 'Yvette'
  ]
}

const lastNames = [
  'Blackwood', 'Stormwind', 'Ironforge', 'Goldleaf', 'Silverstone', 'Redmane',
  'Whitehawk', 'Greybeard', 'Strongarm', 'Swiftblade', 'Brightshield', 'Darkwater',
  'Flameheart', 'Frostborn', 'Earthshaker', 'Windwalker', 'Moonwhisper', 'Sunblade',
  'Shadowmere', 'Lightbringer', 'Thornhill', 'Ravenclaw', 'Wolfsbane', 'Dragonborn'
]

const races = [
  'Human', 'Elf', 'Dwarf', 'Halfling', 'Dragonborn', 'Gnome', 'Half-Elf',
  'Half-Orc', 'Tiefling', 'Aasimar', 'Firbolg', 'Goliath', 'Kenku', 'Tabaxi'
]

const traits = [
  'Ambitious', 'Brave', 'Cautious', 'Diplomatic', 'Energetic', 'Friendly',
  'Grumpy', 'Honest', 'Impulsive', 'Jovial', 'Kind', 'Lazy', 'Mysterious',
  'Nervous', 'Optimistic', 'Pessimistic', 'Quiet', 'Reckless', 'Stubborn',
  'Thoughtful', 'Unfriendly', 'Vengeful', 'Wise', 'Zealous'
]

const occupations = [
  'Merchant', 'Guard', 'Innkeeper', 'Blacksmith', 'Scholar', 'Priest',
  'Thief', 'Noble', 'Farmer', 'Sailor', 'Miner', 'Hunter', 'Alchemist',
  'Bard', 'Soldier', 'Healer', 'Scribe', 'Cook', 'Carpenter', 'Messenger'
]

export function generateName(gender: 'male' | 'female' = 'male'): string {
  const firstName = firstNames[gender][Math.floor(Math.random() * firstNames[gender].length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  return `${firstName} ${lastName}`
}

export function generateRace(): string {
  return races[Math.floor(Math.random() * races.length)]
}

export function generateTraits(count: number = 3): string[] {
  const selectedTraits: string[] = []
  const availableTraits = [...traits]
  
  for (let i = 0; i < Math.min(count, traits.length); i++) {
    const index = Math.floor(Math.random() * availableTraits.length)
    selectedTraits.push(availableTraits[index])
    availableTraits.splice(index, 1)
  }
  
  return selectedTraits
}

export function generateOccupation(): string {
  return occupations[Math.floor(Math.random() * occupations.length)]
}

export function generateStats(level: number = 1): Record<string, number> {
  const baseStats = {
    strength: 10 + Math.floor(Math.random() * 8),
    dexterity: 10 + Math.floor(Math.random() * 8),
    constitution: 10 + Math.floor(Math.random() * 8),
    intelligence: 10 + Math.floor(Math.random() * 8),
    wisdom: 10 + Math.floor(Math.random() * 8),
    charisma: 10 + Math.floor(Math.random() * 8)
  }
  
  const hitDice = 8
  const conModifier = Math.floor((baseStats.constitution - 10) / 2)
  const hitPoints = hitDice + conModifier + (level - 1) * (Math.floor(hitDice / 2) + 1 + conModifier)
  
  const dexModifier = Math.floor((baseStats.dexterity - 10) / 2)
  const armorClass = 10 + dexModifier
  
  const proficiencyBonus = Math.ceil(level / 4) + 1
  
  return {
    ...baseStats,
    hitPoints: Math.max(1, hitPoints),
    armorClass,
    speed: 30,
    proficiencyBonus
  }
}

const alignments = [
  'Lawful Good', 'Neutral Good', 'Chaotic Good',
  'Lawful Neutral', 'True Neutral', 'Chaotic Neutral', 
  'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'
]

export function generateNPC(level: number = 1, gender: 'male' | 'female' = Math.random() < 0.5 ? 'male' : 'female') {
  const name = generateName(gender)
  const race = generateRace()
  const occupation = generateOccupation()
  const stats = generateStats(level)
  const traits = generateTraits(Math.floor(Math.random() * 3) + 2)
  const alignment = alignments[Math.floor(Math.random() * alignments.length)]
  
  return {
    name,
    race,
    class: occupation,
    level,
    alignment,
    stats,
    traits,
    description: `A ${level > 1 ? 'seasoned' : 'young'} ${race.toLowerCase()} ${occupation.toLowerCase()}`
  }
}