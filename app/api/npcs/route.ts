import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const campaignId = searchParams.get('campaign')
    
    const npcs = await prisma.nPC.findMany({
      where: campaignId ? { campaignId } : undefined,
      orderBy: { name: 'asc' },
      include: {
        campaign: true
      }
    })
    
    return NextResponse.json(npcs)
  } catch (error) {
    console.error('Failed to fetch NPCs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch NPCs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { campaignId, name, race, class: npcClass, level, alignment, description, traits, stats } = body
    
    if (!name || !race) {
      return NextResponse.json(
        { error: 'Name and race are required' },
        { status: 400 }
      )
    }
    
    const npc = await prisma.nPC.create({
      data: {
        campaignId,
        name,
        race,
        class: npcClass,
        level: level || 1,
        alignment,
        description,
        traits,
        stats: JSON.stringify(stats)
      }
    })
    
    return NextResponse.json(npc, { status: 201 })
  } catch (error) {
    console.error('Failed to create NPC:', error)
    return NextResponse.json(
      { error: 'Failed to create NPC' },
      { status: 500 }
    )
  }
}