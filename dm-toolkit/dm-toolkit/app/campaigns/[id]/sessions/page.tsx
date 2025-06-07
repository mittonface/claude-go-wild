'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface Session {
  id: string
  title: string
  date: string
  notes: string
  campaign: {
    name: string
  }
}

interface Campaign {
  id: string
  name: string
  description?: string
}

export default function SessionsPage() {
  const params = useParams()
  const router = useRouter()
  const campaignId = params.id as string
  const [sessions, setSessions] = useState<Session[]>([])
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCampaign = useCallback(async () => {
    try {
      const response = await fetch(`/api/campaigns/${campaignId}`)
      if (response.ok) {
        const data = await response.json()
        setCampaign(data)
      }
    } catch (err) {
      console.error('Error fetching campaign:', err)
    }
  }, [campaignId])

  const fetchSessions = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/sessions?campaignId=${campaignId}`)
      if (response.ok) {
        const data = await response.json()
        setSessions(data)
      } else {
        setError('Failed to fetch sessions')
      }
    } catch (err) {
      setError('Error fetching sessions')
      console.error('Error fetching sessions:', err)
    } finally {
      setLoading(false)
    }
  }, [campaignId])

  useEffect(() => {
    if (campaignId) {
      fetchCampaign()
      fetchSessions()
    }
  }, [campaignId, fetchCampaign, fetchSessions])

  const handleDeleteSession = async (sessionId: string) => {
    if (!confirm('Are you sure you want to delete this session?')) return

    try {
      const response = await fetch(`/api/sessions/${sessionId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setSessions(sessions.filter(session => session.id !== sessionId))
      } else {
        alert('Failed to delete session')
      }
    } catch (err) {
      console.error('Error deleting session:', err)
      alert('Error deleting session')
    }
  }

  if (loading) return <div className="p-6">Loading sessions...</div>
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link href={`/campaigns/${campaignId}`} className="text-blue-600 hover:underline">
            ← Back to Campaign
          </Link>
          <h1 className="text-3xl font-bold mt-2">
            Sessions for {campaign?.name || 'Campaign'}
          </h1>
        </div>
        <Link
          href={`/campaigns/${campaignId}/sessions/new`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          New Session
        </Link>
      </div>

      {sessions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">No sessions recorded yet.</p>
          <Link
            href={`/campaigns/${campaignId}/sessions/new`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Your First Session
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-blue-600">
                    <Link
                      href={`/campaigns/${campaignId}/sessions/${session.id}`}
                      className="hover:underline"
                    >
                      {session.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {new Date(session.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      weekday: 'long'
                    })}
                  </p>
                  {session.notes && (
                    <p className="text-gray-700 mt-2 line-clamp-3">
                      {session.notes.length > 150 
                        ? `${session.notes.substring(0, 150)}...` 
                        : session.notes}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <Link
                    href={`/campaigns/${campaignId}/sessions/${session.id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteSession(session.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}