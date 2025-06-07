'use client'

import { useEffect, useState } from 'react'
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

export default function EditSessionPage() {
  const params = useParams()
  const router = useRouter()
  const { id: campaignId, sessionId } = params
  
  const [session, setSession] = useState<Session | null>(null)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
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
        setTitle(data.title)
        setDate(data.date.split('T')[0]) // Extract date part
        setNotes(data.notes)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) {
      setError('Session title is required')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`/api/sessions/${sessionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title.trim(),
          date,
          notes: notes.trim()
        })
      })

      if (response.ok) {
        router.push(`/campaigns/${campaignId}/sessions/${sessionId}`)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to update session')
      }
    } catch (err) {
      console.error('Error updating session:', err)
      setError('Error updating session')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="p-6">Loading session...</div>
  if (error && !session) return <div className="p-6 text-red-600">Error: {error}</div>
  if (!session) return <div className="p-6">Session not found</div>

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <Link 
          href={`/campaigns/${campaignId}/sessions/${sessionId}`}
          className="text-blue-600 hover:underline"
        >
          ← Back to Session
        </Link>
        <h1 className="text-3xl font-bold mt-2">Edit Session</h1>
        <p className="text-gray-600">
          Campaign: {session.campaign.name}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Session Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter session title..."
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
            Session Date *
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
            Session Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={8}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Record what happened in this session..."
          />
          <p className="text-sm text-gray-500 mt-1">
            Use this space to record key events, story developments, combat encounters, and player decisions.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
          <Link
            href={`/campaigns/${campaignId}/sessions/${sessionId}`}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}