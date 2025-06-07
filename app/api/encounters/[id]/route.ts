import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const encounter = await prisma.encounter.findUnique({
      where: { id },
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
                level: true,
                stats: true
              }
            }
          }
        }
      }
    })

    if (!encounter) {
      return NextResponse.json(
        { error: 'Encounter not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(encounter)
  } catch (error) {
    console.error('Error fetching encounter:', error)
    return NextResponse.json(
      { error: 'Failed to fetch encounter' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { 
      name, 
      description, 
      difficulty, 
      totalXP, 
      partyLevel, 
      partySize 
    } = await request.json()

    const encounter = await prisma.encounter.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(difficulty !== undefined && { difficulty }),
        ...(totalXP !== undefined && { totalXP }),
        ...(partyLevel !== undefined && { partyLevel }),
        ...(partySize !== undefined && { partySize })
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

    return NextResponse.json(encounter)
  } catch (error) {
    console.error('Error updating encounter:', error)
    return NextResponse.json(
      { error: 'Failed to update encounter' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.encounter.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting encounter:', error)
    return NextResponse.json(
      { error: 'Failed to delete encounter' },
      { status: 500 }
    )
  }
}