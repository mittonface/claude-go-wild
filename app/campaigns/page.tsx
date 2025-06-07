'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Campaign {
  id: string
  name: string
  description: string | null
  createdAt: string
  updatedAt: string
  _count: {
    sessions: number
    npcs: number
    encounters: number
  }
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newCampaign, setNewCampaign] = useState({ name: '', description: '' })

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('/api/campaigns')
      const data = await response.json()
      setCampaigns(data)
    } catch (error) {
      console.error('Failed to fetch campaigns:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCampaign)
      })
      
      if (response.ok) {
        setNewCampaign({ name: '', description: '' })
        setShowCreateForm(false)
        fetchCampaigns()
      }
    } catch (error) {
      console.error('Failed to create campaign:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this campaign?')) return
    
    try {
      const response = await fetch(`/api/campaigns/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        fetchCampaigns()
      }
    } catch (error) {
      console.error('Failed to delete campaign:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="container mx-auto">
          <p className="text-center text-gray-600">Loading campaigns...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Campaigns</h1>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="btn-primary"
          >
            {showCreateForm ? 'Cancel' : 'New Campaign'}
          </button>
        </div>

        {showCreateForm && (
          <form onSubmit={handleCreate} className="bg-white p-6 rounded-lg mb-8 border border-gray-200">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700">
                Campaign Name
              </label>
              <input
                type="text"
                id="name"
                value={newCampaign.name}
                onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                className="input-modern"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium mb-2 text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={newCampaign.description}
                onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                className="input-modern"
                rows={3}
              />
            </div>
            <button
              type="submit"
              className="btn-primary"
            >
              Create Campaign
            </button>
          </form>
        )}

        {campaigns.length === 0 ? (
          <p className="text-center text-gray-600">No campaigns yet. Create your first campaign!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="card-modern p-6">
                <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                  {campaign.name}
                </h2>
                {campaign.description && (
                  <p className="text-gray-600 mb-4">{campaign.description}</p>
                )}
                <div className="text-sm text-gray-500 mb-4">
                  <p>{campaign._count.sessions} sessions</p>
                  <p>{campaign._count.npcs} NPCs</p>
                  <p>{campaign._count.encounters} encounters</p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/campaigns/${campaign.id}`}
                    className="btn-primary text-sm"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(campaign.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}