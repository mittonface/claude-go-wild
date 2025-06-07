'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface Session {
  id: string
  title: string
  date: string
  notes: string
  createdAt: string
  updatedAt: string
  campaign: {
    name: string
  }
}

export default function SessionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { id: campaignId, sessionId } = params
  
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (sessionId) {
      fetchSession()
    }
  }, [sessionId])

  const fetchSession = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/sessions/${sessionId}`)
      
      if (response.ok) {
        const data = await response.json()
        setSession(data)
      } else if (response.status === 404) {
        setError('Session not found')
      } else {
        setError('Failed to fetch session')
      }
    } catch (err) {
      console.error('Error fetching session:', err)
      setError('Error fetching session')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this session? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/sessions/${sessionId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        router.push(`/campaigns/${campaignId}/sessions`)
      } else {
        alert('Failed to delete session')
      }
    } catch (err) {
      console.error('Error deleting session:', err)
      alert('Error deleting session')
    }
  }

  if (loading) return <div className="p-6">Loading session...</div>
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>
  if (!session) return <div className="p-6">Session not found</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Link 
          href={`/campaigns/${campaignId}/sessions`}
          className="text-blue-600 hover:underline"
        >
          ← Back to Sessions
        </Link>
        <div className="flex justify-between items-start mt-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{session.title}</h1>
            <p className="text-gray-600 mt-2">
              Campaign: <Link href={`/campaigns/${campaignId}`} className="text-blue-600 hover:underline">
                {session.campaign.name}
              </Link>
            </p>
            <p className="text-gray-600">
              Session Date: {new Date(session.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
              })}
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/campaigns/${campaignId}/sessions/${sessionId}/edit`}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Session Notes</h2>
        {session.notes ? (
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-gray-700">
              {session.notes}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 italic">No notes recorded for this session.</p>
        )}
      </div>

      <div className="mt-6 text-sm text-gray-500 space-y-1">
        <p>Created: {new Date(session.createdAt).toLocaleString()}</p>
        {session.updatedAt !== session.createdAt && (
          <p>Last updated: {new Date(session.updatedAt).toLocaleString()}</p>
        )}
      </div>
    </div>
  )
}