import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const campaignId = searchParams.get('campaignId')

    const encounters = await prisma.encounter.findMany({
      where: campaignId ? { campaignId } : undefined,
      include: {
        campaign: {
          select: {
            name: true
          }
        },
        npcs: {
          include: {
            npc: {
              select: {
                name: true,
                race: true,
                class: true,
                level: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(encounters)
  } catch (error) {
    console.error('Error fetching encounters:', error)
    return NextResponse.json(
      { error: 'Failed to fetch encounters' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { 
      campaignId, 
      name, 
      description, 
      difficulty, 
      totalXP, 
      partyLevel, 
      partySize,
      npcs 
    } = await request.json()

    if (!name) {
      return NextResponse.json(
        { error: 'Encounter name is required' },
        { status: 400 }
      )
    }

    const encounter = await prisma.encounter.create({
      data: {
        campaignId: campaignId || null,
        name,
        description: description || null,
        difficulty: difficulty || null,
        totalXP: totalXP || 0,
        partyLevel: partyLevel || 1,
        partySize: partySize || 4,
        npcs: npcs ? {
          create: npcs.map((npc: any) => ({
            npcId: npc.npcId,
            quantity: npc.quantity || 1,
            initiative: npc.initiative || null,
            currentHp: npc.currentHp || null,
            maxHp: npc.maxHp || null,
            notes: npc.notes || null
          }))
        } : undefined
      },
      include: {
        campaign: {
          select: {
            name: true
          }
        },
        npcs: {
          include: {
            npc: {
              select: {
                name: true,
                race: true,
                class: true,
                level: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json(encounter, { status: 201 })
  } catch (error) {
    console.error('Error creating encounter:', error)
    return NextResponse.json(
      { error: 'Failed to create encounter' },
      { status: 500 }
    )
  }
}