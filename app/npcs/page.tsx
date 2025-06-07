'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface NPC {
  id: string
  name: string
  race: string
  class: string | null
  level: number
  alignment: string | null
  description: string | null
  traits: string | null
  stats: string
  campaign?: {
    id: string
    name: string
  }
}

interface GeneratedNPC {
  name: string
  race: string
  class: string
  level: number
  traits: string
  stats: Record<string, number>
  description: string
}

function NPCsContent() {
  const searchParams = useSearchParams()
  const campaignId = searchParams.get('campaign')
  
  const [npcs, setNpcs] = useState<NPC[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [generatedNPC, setGeneratedNPC] = useState<GeneratedNPC | null>(null)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [level, setLevel] = useState(1)

  const fetchNPCs = useCallback(async () => {
    try {
      const url = campaignId ? `/api/npcs?campaign=${campaignId}` : '/api/npcs'
      const response = await fetch(url)
      const data = await response.json()
      setNpcs(data)
    } catch (error) {
      console.error('Failed to fetch NPCs:', error)
    } finally {
      setLoading(false)
    }
  }, [campaignId])

  useEffect(() => {
    fetchNPCs()
  }, [fetchNPCs])

  const generateNPC = async () => {
    try {
      const response = await fetch('/api/npcs/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gender, level })
      })
      
      if (response.ok) {
        const data = await response.json()
        setGeneratedNPC(data)
        setShowCreateForm(true)
      }
    } catch (error) {
      console.error('Failed to generate NPC:', error)
    }
  }

  const saveNPC = async () => {
    if (!generatedNPC) return
    
    try {
      const response = await fetch('/api/npcs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...generatedNPC,
          campaignId,
          stats: generatedNPC.stats
        })
      })
      
      if (response.ok) {
        setShowCreateForm(false)
        setGeneratedNPC(null)
        fetchNPCs()
      }
    } catch (error) {
      console.error('Failed to save NPC:', error)
    }
  }

  const renderStats = (statsString: string) => {
    try {
      const stats = JSON.parse(statsString)
      return (
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div>STR: {stats.strength}</div>
          <div>DEX: {stats.dexterity}</div>
          <div>CON: {stats.constitution}</div>
          <div>INT: {stats.intelligence}</div>
          <div>WIS: {stats.wisdom}</div>
          <div>CHA: {stats.charisma}</div>
          <div className="col-span-3 mt-2 pt-2 border-t border-gray-600">
            <div>AC: {stats.armorClass}</div>
            <div>HP: {stats.hitPoints}</div>
            <div>Speed: {stats.speed}ft</div>
          </div>
        </div>
      )
    } catch {
      return <p className="text-sm text-gray-400">Invalid stats</p>
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="container mx-auto">
          <p className="text-center">Loading NPCs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-purple-400">NPCs</h1>
          <div className="flex gap-2">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as 'male' | 'female')}
              className="px-3 py-2 bg-gray-700 rounded-md"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input
              type="number"
              value={level}
              onChange={(e) => setLevel(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              max="20"
              className="w-20 px-3 py-2 bg-gray-700 rounded-md"
              placeholder="Level"
            />
            <button
              onClick={generateNPC}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition-colors"
            >
              Generate NPC
            </button>
          </div>
        </div>

        {showCreateForm && generatedNPC && (
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-300">Generated NPC</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p><strong>Name:</strong> {generatedNPC.name}</p>
                <p><strong>Race:</strong> {generatedNPC.race}</p>
                <p><strong>Class:</strong> {generatedNPC.class}</p>
                <p><strong>Level:</strong> {generatedNPC.level}</p>
                <p><strong>Traits:</strong> {generatedNPC.traits}</p>
                <p><strong>Description:</strong> {generatedNPC.description}</p>
              </div>
              <div>
                <strong>Stats:</strong>
                {renderStats(JSON.stringify(generatedNPC.stats))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={saveNPC}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition-colors"
              >
                Save NPC
              </button>
              <button
                onClick={generateNPC}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md transition-colors"
              >
                Regenerate
              </button>
              <button
                onClick={() => {
                  setShowCreateForm(false)
                  setGeneratedNPC(null)
                }}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {npcs.length === 0 ? (
          <p className="text-center text-gray-400">No NPCs yet. Generate your first NPC!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {npcs.map((npc) => (
              <div key={npc.id} className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-2 text-purple-300">
                  {npc.name}
                </h2>
                <p className="text-gray-400 mb-2">
                  Level {npc.level} {npc.race} {npc.class}
                </p>
                {npc.traits && (
                  <p className="text-sm text-gray-500 mb-2">Traits: {npc.traits}</p>
                )}
                {npc.campaign && (
                  <p className="text-sm text-gray-500 mb-4">
                    Campaign: 
                    <Link 
                      href={`/campaigns/${npc.campaign.id}`}
                      className="text-purple-400 hover:text-purple-300 ml-1"
                    >
                      {npc.campaign.name}
                    </Link>
                  </p>
                )}
                <div className="mt-4">
                  {renderStats(npc.stats)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function NPCsPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading NPCs...</div>}>
      <NPCsContent />
    </Suspense>
  )
}