import { DiceRollResult } from '@/types'

export function rollDice(formula: string): DiceRollResult {
  const diceRegex = /(\d+)d(\d+)([+-]\d+)?/i
  const match = formula.match(diceRegex)
  
  if (!match) {
    throw new Error('Invalid dice formula')
  }
  
  const [, numDice, numSides, modifierStr] = match
  const dice = parseInt(numDice)
  const sides = parseInt(numSides)
  const modifier = modifierStr ? parseInt(modifierStr) : 0
  
  const rolls: number[] = []
  for (let i = 0; i < dice; i++) {
    rolls.push(Math.floor(Math.random() * sides) + 1)
  }
  
  const total = rolls.reduce((sum, roll) => sum + roll, 0) + modifier
  
  return {
    formula,
    rolls,
    total,
    modifier
  }
}

export function rollMultiple(formulas: string[]): DiceRollResult[] {
  return formulas.map(rollDice)
}

export function rollAdvantage(formula: string): DiceRollResult {
  const roll1 = rollDice(formula)
  const roll2 = rollDice(formula)
  return roll1.total >= roll2.total ? roll1 : roll2
}

export function rollDisadvantage(formula: string): DiceRollResult {
  const roll1 = rollDice(formula)
  const roll2 = rollDice(formula)
  return roll1.total <= roll2.total ? roll1 : roll2
}