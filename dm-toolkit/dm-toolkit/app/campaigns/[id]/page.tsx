'use client'

import { useState, useEffect, use, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Session {
  id: string
  title: string
  date: string
  notes: string
}

interface NPC {
  id: string
  name: string
  race: string
  class: string | null
  level: number
}

interface Encounter {
  id: string
  name: string
  difficulty: string | null
  totalXP: number
}

interface Campaign {
  id: string
  name: string
  description: string | null
  sessions: Session[]
  npcs: NPC[]
  encounters: Encounter[]
}

export default function CampaignDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = use(params)
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({ name: '', description: '' })
  const router = useRouter()

  const fetchCampaign = useCallback(async () => {
    try {
      const response = await fetch(`/api/campaigns/${id}`)
      if (response.ok) {
        const data = await response.json()
        setCampaign(data)
        setEditForm({ name: data.name, description: data.description || '' })
      } else {
        router.push('/campaigns')
      }
    } catch (error) {
      console.error('Failed to fetch campaign:', error)
    } finally {
      setLoading(false)
    }
  }, [id, router])

  useEffect(() => {
    fetchCampaign()
  }, [fetchCampaign])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/campaigns/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      })
      
      if (response.ok) {
        setIsEditing(false)
        fetchCampaign()
      }
    } catch (error) {
      console.error('Failed to update campaign:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="container mx-auto">
          <p className="text-center">Loading campaign...</p>
        </div>
      </div>
    )
  }

  if (!campaign) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="container mx-auto">
        <div className="mb-8">
          <Link
            href="/campaigns"
            className="text-purple-400 hover:text-purple-300 mb-4 inline-block"
          >
            ← Back to Campaigns
          </Link>
          
          {isEditing ? (
            <form onSubmit={handleUpdate} className="bg-gray-800 p-6 rounded-lg">
              <div className="mb-4">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="text-3xl font-bold bg-gray-700 text-white px-3 py-2 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md text-white"
                  rows={3}
                  placeholder="Campaign description..."
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition-colors"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-purple-400 mb-2">{campaign.name}</h1>
                {campaign.description && (
                  <p className="text-gray-300 text-lg">{campaign.description}</p>
                )}
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition-colors"
              >
                Edit Campaign
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-purple-300">Sessions</h2>
              <Link
                href={`/campaigns/${id}/sessions/new`}
                className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-sm transition-colors"
              >
                Add Session
              </Link>
            </div>
            {campaign.sessions.length === 0 ? (
              <p className="text-gray-400">No sessions yet</p>
            ) : (
              <ul className="space-y-2">
                {campaign.sessions.map((session) => (
                  <li key={session.id}>
                    <Link
                      href={`/campaigns/${id}/sessions/${session.id}`}
                      className="text-purple-400 hover:text-purple-300"
                    >
                      {session.title}
                    </Link>
                    <p className="text-sm text-gray-500">
                      {new Date(session.date).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-purple-300">NPCs</h2>
              <Link
                href={`/npcs?campaign=${id}`}
                className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-sm transition-colors"
              >
                Add NPC
              </Link>
            </div>
            {campaign.npcs.length === 0 ? (
              <p className="text-gray-400">No NPCs yet</p>
            ) : (
              <ul className="space-y-2">
                {campaign.npcs.map((npc) => (
                  <li key={npc.id}>
                    <Link
                      href={`/npcs/${npc.id}`}
                      className="text-purple-400 hover:text-purple-300"
                    >
                      {npc.name}
                    </Link>
                    <p className="text-sm text-gray-500">
                      Level {npc.level} {npc.race} {npc.class}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-purple-300">Encounters</h2>
              <Link
                href={`/encounters?campaign=${id}`}
                className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-sm transition-colors"
              >
                Add Encounter
              </Link>
            </div>
            {campaign.encounters.length === 0 ? (
              <p className="text-gray-400">No encounters yet</p>
            ) : (
              <ul className="space-y-2">
                {campaign.encounters.map((encounter) => (
                  <li key={encounter.id}>
                    <Link
                      href={`/encounters/${encounter.id}`}
                      className="text-purple-400 hover:text-purple-300"
                    >
                      {encounter.name}
                    </Link>
                    <p className="text-sm text-gray-500">
                      {encounter.difficulty || 'Unknown'} - {encounter.totalXP} XP
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}