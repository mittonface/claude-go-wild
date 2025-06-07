'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { 
  calculateEncounterDifficulty, 
  calculateAdjustedXP, 
  getDifficultyLabel 
} from '@/lib/encounter'

interface NPC {
  id: string
  name: string
  race: string
  class: string | null
  level: number
  stats: string
}

interface EncounterNPC {
  npcId: string
  npc: NPC
  quantity: number
  initiative?: number | null
  currentHp?: number | null
  maxHp?: number | null
  notes?: string | null
}

interface Encounter {
  id: string
  name: string
  description: string | null
  difficulty: string | null
  totalXP: number
  partyLevel: number
  partySize: number
  campaign?: {
    name: string
  } | null
  npcs: EncounterNPC[]
}

interface Campaign {
  id: string
  name: string
}

export default function EncountersPage() {
  const searchParams = useSearchParams()
  const campaignFilter = searchParams?.get('campaign')
  
  const [encounters, setEncounters] = useState<Encounter[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [npcs, setNpcs] = useState<NPC[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newEncounter, setNewEncounter] = useState({
    name: '',
    description: '',
    campaignId: campaignFilter || '',
    partyLevel: 5,
    partySize: 4,
    selectedNpcs: [] as { npcId: string; quantity: number }[]
  })

  useEffect(() => {
    fetchData()
  }, [campaignFilter])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [encountersRes, campaignsRes, npcsRes] = await Promise.all([
        fetch(`/api/encounters${campaignFilter ? `?campaignId=${campaignFilter}` : ''}`),
        fetch('/api/campaigns'),
        fetch('/api/npcs')
      ])

      if (encountersRes.ok) setEncounters(await encountersRes.json())
      if (campaignsRes.ok) setCampaigns(await campaignsRes.json())
      if (npcsRes.ok) setNpcs(await npcsRes.json())
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateEncounterStats = (encounter: Encounter) => {
    const thresholds = calculateEncounterDifficulty(encounter.partyLevel, encounter.partySize)
    const adjustedXP = calculateAdjustedXP(encounter.totalXP, encounter.npcs.length, encounter.partySize)
    const difficulty = getDifficultyLabel(adjustedXP, thresholds)
    
    return { thresholds, adjustedXP, difficulty }
  }

  const handleCreateEncounter = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newEncounter.name.trim()) return

    try {
      const response = await fetch('/api/encounters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newEncounter.name.trim(),
          description: newEncounter.description.trim(),
          campaignId: newEncounter.campaignId || null,
          partyLevel: newEncounter.partyLevel,
          partySize: newEncounter.partySize,
          npcs: newEncounter.selectedNpcs.length > 0 ? newEncounter.selectedNpcs : undefined
        })
      })

      if (response.ok) {
        setShowCreateForm(false)
        setNewEncounter({
          name: '',
          description: '',
          campaignId: campaignFilter || '',
          partyLevel: 5,
          partySize: 4,
          selectedNpcs: []
        })
        fetchData()
      }
    } catch (error) {
      console.error('Error creating encounter:', error)
    }
  }

  const addNpcToEncounter = (npcId: string) => {
    const existingIndex = newEncounter.selectedNpcs.findIndex(n => n.npcId === npcId)
    if (existingIndex >= 0) {
      const updated = [...newEncounter.selectedNpcs]
      updated[existingIndex].quantity += 1
      setNewEncounter({ ...newEncounter, selectedNpcs: updated })
    } else {
      setNewEncounter({
        ...newEncounter,
        selectedNpcs: [...newEncounter.selectedNpcs, { npcId, quantity: 1 }]
      })
    }
  }

  const removeNpcFromEncounter = (npcId: string) => {
    setNewEncounter({
      ...newEncounter,
      selectedNpcs: newEncounter.selectedNpcs.filter(n => n.npcId !== npcId)
    })
  }

  if (loading) return <div className="p-6">Loading encounters...</div>

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-purple-400">Encounter Builder</h1>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition-colors"
          >
            Create Encounter
          </button>
        </div>

        {campaignFilter && (
          <div className="mb-6">
            <p className="text-gray-300">
              Showing encounters for: {campaigns.find(c => c.id === campaignFilter)?.name}
            </p>
            <Link href="/encounters" className="text-purple-400 hover:text-purple-300">
              View all encounters
            </Link>
          </div>
        )}

        {showCreateForm && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Create New Encounter</h2>
            <form onSubmit={handleCreateEncounter} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Encounter Name *</label>
                  <input
                    type="text"
                    value={newEncounter.name}
                    onChange={(e) => setNewEncounter({ ...newEncounter, name: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 rounded text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Campaign</label>
                  <select
                    value={newEncounter.campaignId}
                    onChange={(e) => setNewEncounter({ ...newEncounter, campaignId: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 rounded text-white"
                  >
                    <option value="">No Campaign</option>
                    {campaigns.map(campaign => (
                      <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={newEncounter.description}
                  onChange={(e) => setNewEncounter({ ...newEncounter, description: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 rounded text-white"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Party Level</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={newEncounter.partyLevel}
                    onChange={(e) => setNewEncounter({ ...newEncounter, partyLevel: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Party Size</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newEncounter.partySize}
                    onChange={(e) => setNewEncounter({ ...newEncounter, partySize: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-700 rounded text-white"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition-colors"
                >
                  Create Encounter
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {encounters.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">No encounters created yet.</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition-colors"
            >
              Create Your First Encounter
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {encounters.map((encounter) => {
              const stats = calculateEncounterStats(encounter)
              return (
                <div key={encounter.id} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-purple-300">
                        <Link href={`/encounters/${encounter.id}`} className="hover:underline">
                          {encounter.name}
                        </Link>
                      </h3>
                      {encounter.campaign && (
                        <p className="text-gray-400">Campaign: {encounter.campaign.name}</p>
                      )}
                      {encounter.description && (
                        <p className="text-gray-300 mt-2">{encounter.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded text-sm font-medium ${
                        stats.difficulty === 'Deadly' ? 'bg-red-600' :
                        stats.difficulty === 'Hard' ? 'bg-orange-600' :
                        stats.difficulty === 'Medium' ? 'bg-yellow-600' :
                        stats.difficulty === 'Easy' ? 'bg-green-600' :
                        'bg-gray-600'
                      }`}>
                        {stats.difficulty}
                      </div>
                      <p className="text-gray-400 text-sm mt-1">{stats.adjustedXP} XP</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Party Level:</span>
                      <span className="ml-2">{encounter.partyLevel}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Party Size:</span>
                      <span className="ml-2">{encounter.partySize}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">NPCs:</span>
                      <span className="ml-2">{encounter.npcs.length}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Base XP:</span>
                      <span className="ml-2">{encounter.totalXP}</span>
                    </div>
                  </div>

                  {encounter.npcs.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">NPCs in Encounter:</h4>
                      <div className="flex flex-wrap gap-2">
                        {encounter.npcs.map((encounterNpc) => (
                          <div key={encounterNpc.npc.id} className="bg-gray-700 px-3 py-1 rounded text-sm">
                            {encounterNpc.quantity}x {encounterNpc.npc.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}