import { generateNPC } from '../generators'

describe('NPC Generator', () => {
  describe('generateNPC', () => {
    it('should generate an NPC with all required properties', () => {
      const npc = generateNPC()
      
      expect(npc.name).toBeDefined()
      expect(typeof npc.name).toBe('string')
      expect(npc.name.length).toBeGreaterThan(0)
      
      expect(npc.race).toBeDefined()
      expect(typeof npc.race).toBe('string')
      
      expect(npc.class).toBeDefined()
      expect(typeof npc.class).toBe('string')
      
      expect(npc.level).toBeDefined()
      expect(typeof npc.level).toBe('number')
      expect(npc.level).toBeGreaterThanOrEqual(1)
      expect(npc.level).toBeLessThanOrEqual(20)
      
      expect(npc.alignment).toBeDefined()
      expect(typeof npc.alignment).toBe('string')
      
      expect(npc.stats).toBeDefined()
      expect(typeof npc.stats).toBe('object')
      
      expect(npc.traits).toBeDefined()
      expect(Array.isArray(npc.traits)).toBe(true)
    })

    it('should generate different NPCs on repeated calls', () => {
      const npc1 = generateNPC()
      const npc2 = generateNPC()
      
      expect(npc1.name).not.toBe(npc2.name)
    })

    it('should respect level parameter', () => {
      const npc = generateNPC(10)
      expect(npc.level).toBe(10)
    })

    it('should respect gender parameter', () => {
      const maleNPC = generateNPC(1, 'male')
      const femaleNPC = generateNPC(1, 'female')
      
      expect(maleNPC.name).toBeDefined()
      expect(femaleNPC.name).toBeDefined()
    })

    it('should generate valid stat blocks', () => {
      const npc = generateNPC()
      
      expect(npc.stats.strength).toBeGreaterThanOrEqual(3)
      expect(npc.stats.strength).toBeLessThanOrEqual(18)
      
      expect(npc.stats.dexterity).toBeGreaterThanOrEqual(3)
      expect(npc.stats.dexterity).toBeLessThanOrEqual(18)
      
      expect(npc.stats.constitution).toBeGreaterThanOrEqual(3)
      expect(npc.stats.constitution).toBeLessThanOrEqual(18)
      
      expect(npc.stats.intelligence).toBeGreaterThanOrEqual(3)
      expect(npc.stats.intelligence).toBeLessThanOrEqual(18)
      
      expect(npc.stats.wisdom).toBeGreaterThanOrEqual(3)
      expect(npc.stats.wisdom).toBeLessThanOrEqual(18)
      
      expect(npc.stats.charisma).toBeGreaterThanOrEqual(3)
      expect(npc.stats.charisma).toBeLessThanOrEqual(18)
      
      expect(npc.stats.armorClass).toBeGreaterThanOrEqual(10)
      expect(npc.stats.hitPoints).toBeGreaterThan(0)
      expect(npc.stats.speed).toBeGreaterThan(0)
      expect(npc.stats.proficiencyBonus).toBeGreaterThanOrEqual(2)
    })

    it('should generate higher level NPCs with better stats', () => {
      const lowLevelNPC = generateNPC(1)
      const highLevelNPC = generateNPC(20)
      
      expect(highLevelNPC.stats.hitPoints).toBeGreaterThan(lowLevelNPC.stats.hitPoints)
      expect(highLevelNPC.stats.proficiencyBonus).toBeGreaterThan(lowLevelNPC.stats.proficiencyBonus)
    })

    it('should generate valid alignments', () => {
      const validAlignments = [
        'Lawful Good', 'Neutral Good', 'Chaotic Good',
        'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
        'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'
      ]
      
      for (let i = 0; i < 10; i++) {
        const npc = generateNPC()
        expect(validAlignments).toContain(npc.alignment)
      }
    })

    it('should generate reasonable trait counts', () => {
      const npc = generateNPC()
      expect(npc.traits.length).toBeGreaterThanOrEqual(1)
      expect(npc.traits.length).toBeLessThanOrEqual(5)
      
      npc.traits.forEach(trait => {
        expect(typeof trait).toBe('string')
        expect(trait.length).toBeGreaterThan(0)
      })
    })
  })
})