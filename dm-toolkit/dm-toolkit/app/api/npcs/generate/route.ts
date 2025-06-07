import { NextRequest, NextResponse } from 'next/server'
import { generateName, generateRace, generateTraits, generateOccupation, generateStats } from '@/lib/generators'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { gender = 'male', level = 1 } = body
    
    const name = generateName(gender as 'male' | 'female')
    const race = generateRace()
    const occupation = generateOccupation()
    const traits = generateTraits(3)
    const stats = generateStats(level)
    
    const generated = {
      name,
      race,
      class: occupation,
      level,
      traits: traits.join(', '),
      stats,
      description: `A ${traits[0].toLowerCase()} ${race.toLowerCase()} ${occupation.toLowerCase()}`
    }
    
    return NextResponse.json(generated)
  } catch (error) {
    console.error('Failed to generate NPC:', error)
    return NextResponse.json(
      { error: 'Failed to generate NPC' },
      { status: 500 }
    )
  }
}