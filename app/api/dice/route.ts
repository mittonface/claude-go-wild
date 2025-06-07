import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { rollDice, rollAdvantage, rollDisadvantage } from '@/lib/dice'

export async function GET() {
  try {
    const rolls = await prisma.diceRoll.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50
    })
    
    return NextResponse.json(rolls)
  } catch (error) {
    console.error('Failed to fetch dice rolls:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dice rolls' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { formula, advantage, disadvantage } = body
    
    if (!formula) {
      return NextResponse.json(
        { error: 'Dice formula is required' },
        { status: 400 }
      )
    }
    
    let result
    try {
      if (advantage) {
        result = rollAdvantage(formula)
      } else if (disadvantage) {
        result = rollDisadvantage(formula)
      } else {
        result = rollDice(formula)
      }
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid dice formula' },
        { status: 400 }
      )
    }
    
    const savedRoll = await prisma.diceRoll.create({
      data: {
        formula,
        result: result.rolls.join(', '),
        total: result.total,
        details: JSON.stringify({
          rolls: result.rolls,
          modifier: result.modifier,
          advantage,
          disadvantage
        })
      }
    })
    
    return NextResponse.json({ ...savedRoll, ...result }, { status: 201 })
  } catch (error) {
    console.error('Failed to roll dice:', error)
    return NextResponse.json(
      { error: 'Failed to roll dice' },
      { status: 500 }
    )
  }
}