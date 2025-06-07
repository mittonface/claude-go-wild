import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const campaignId = searchParams.get('campaignId')

    const sessions = await prisma.session.findMany({
      where: campaignId ? { campaignId } : undefined,
      include: {
        campaign: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    })

    return NextResponse.json(sessions)
  } catch (error) {
    console.error('Error fetching sessions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { campaignId, title, date, notes } = await request.json()

    if (!campaignId || !title || !date) {
      return NextResponse.json(
        { error: 'Campaign ID, title, and date are required' },
        { status: 400 }
      )
    }

    const session = await prisma.session.create({
      data: {
        campaignId,
        title,
        date: new Date(date),
        notes: notes || ''
      },
      include: {
        campaign: {
          select: {
            name: true
          }
        }
      }
    })

    return NextResponse.json(session, { status: 201 })
  } catch (error) {
    console.error('Error creating session:', error)
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    )
  }
}