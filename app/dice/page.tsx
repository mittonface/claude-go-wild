'use client'

import { useState, useEffect } from 'react'

interface DiceRoll {
  id: string
  formula: string
  result: string
  total: number
  details: string
  createdAt: string
}

interface RollDetails {
  rolls: number[]
  modifier?: number
  advantage?: boolean
  disadvantage?: boolean
}

const commonRolls = [
  'd20', '2d6', '1d8+2', '3d4+3', '4d6', '1d12', '2d10', '1d100'
]

export default function DicePage() {
  const [formula, setFormula] = useState('')
  const [history, setHistory] = useState<DiceRoll[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [advantage, setAdvantage] = useState(false)
  const [disadvantage, setDisadvantage] = useState(false)
  const [lastRoll, setLastRoll] = useState<{ rolls: number[], total: number } | null>(null)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      setError(null)
      const response = await fetch('/api/dice')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setHistory(data)
    } catch (error) {
      console.error('Failed to fetch dice roll history:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch dice roll history')
    } finally {
      setLoading(false)
    }
  }

  const handleRoll = async (rollFormula: string = formula) => {
    if (!rollFormula) return
    
    try {
      setError(null)
      const response = await fetch('/api/dice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          formula: rollFormula, 
          advantage: advantage && !disadvantage,
          disadvantage: disadvantage && !advantage
        })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setLastRoll({ rolls: data.rolls, total: data.total })
      fetchHistory()
    } catch (error) {
      console.error('Failed to roll dice:', error)
      setError(error instanceof Error ? error.message : 'Failed to roll dice')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleRoll()
  }

  const parseDetails = (detailsString: string): RollDetails => {
    try {
      return JSON.parse(detailsString)
    } catch {
      return { rolls: [] }
    }
  }

  if (error && !loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-purple-400 mb-8">Dice Roller</h1>
          <div className="bg-red-900 bg-opacity-30 border border-red-500 rounded-lg p-4">
            <p className="text-red-300">Error loading dice roller: {error}</p>
            <button 
              onClick={() => {setError(null); fetchHistory()}}
              className="mt-4 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-purple-400 mb-8">Dice Roller</h1>

        {error && (
          <div className="bg-red-900 bg-opacity-30 border border-red-500 rounded-lg p-4 mb-8">
            <p className="text-red-300">Error: {error}</p>
          </div>
        )}

        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={formula}
                onChange={(e) => setFormula(e.target.value)}
                placeholder="Enter dice formula (e.g., 1d20+5)"
                className="flex-1 px-4 py-2 bg-gray-700 rounded-md text-white"
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-md transition-colors"
              >
                Roll
              </button>
            </div>
            
            <div className="flex gap-4 mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={advantage}
                  onChange={(e) => {
                    setAdvantage(e.target.checked)
                    if (e.target.checked) setDisadvantage(false)
                  }}
                  className="mr-2"
                />
                Advantage
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={disadvantage}
                  onChange={(e) => {
                    setDisadvantage(e.target.checked)
                    if (e.target.checked) setAdvantage(false)
                  }}
                  className="mr-2"
                />
                Disadvantage
              </label>
            </div>
          </form>

          <div className="flex flex-wrap gap-2">
            {commonRolls.map((roll) => (
              <button
                key={roll}
                onClick={() => handleRoll(roll)}
                className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm transition-colors"
              >
                {roll}
              </button>
            ))}
          </div>
        </div>

        {lastRoll && (
          <div className="bg-purple-900 bg-opacity-30 rounded-lg p-6 mb-8 text-center">
            <div className="text-5xl font-bold text-purple-300 mb-2">
              {lastRoll.total}
            </div>
            <div className="text-gray-300">
              Rolls: {lastRoll.rolls.join(', ')}
            </div>
          </div>
        )}

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">Roll History</h2>
          
          {loading ? (
            <p className="text-gray-400">Loading history...</p>
          ) : history.length === 0 ? (
            <p className="text-gray-400">No rolls yet</p>
          ) : (
            <div className="space-y-2">
              {history.map((roll) => {
                const details = parseDetails(roll.details)
                return (
                  <div key={roll.id} className="bg-gray-700 rounded p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-mono text-purple-300">{roll.formula}</span>
                        {details.advantage && (
                          <span className="ml-2 text-xs bg-green-600 px-2 py-1 rounded">ADV</span>
                        )}
                        {details.disadvantage && (
                          <span className="ml-2 text-xs bg-red-600 px-2 py-1 rounded">DIS</span>
                        )}
                      </div>
                      <div className="text-xl font-bold text-purple-400">{roll.total}</div>
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      Rolls: {details.rolls.join(', ')}
                      {details.modifier && details.modifier !== 0 && (
                        <span> {details.modifier > 0 ? '+' : ''}{details.modifier}</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(roll.createdAt).toLocaleString()}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}