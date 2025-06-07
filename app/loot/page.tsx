'use client'

import { useState } from 'react'
import { ItemRarity, ItemType } from '@/types'
import { 
  generateLootByRarity, 
  generateLootByCR, 
  generateTreasureHoard, 
  calculateTotalValue 
} from '@/lib/loot'

interface LootItem {
  name: string
  type: ItemType
  rarity: ItemRarity
  value?: number
  description?: string
  properties?: Record<string, any>
  weight: number
}

export default function LootPage() {
  const [generatedLoot, setGeneratedLoot] = useState<LootItem[]>([])
  const [generationType, setGenerationType] = useState<'rarity' | 'cr' | 'hoard'>('rarity')
  const [selectedRarity, setSelectedRarity] = useState<ItemRarity>('Common')
  const [challengeRating, setChallengeRating] = useState(5)
  const [partyLevel, setPartyLevel] = useState(5)
  const [itemCount, setItemCount] = useState(3)

  const handleGenerateLoot = () => {
    let loot: LootItem[] = []
    
    switch (generationType) {
      case 'rarity':
        loot = generateLootByRarity(selectedRarity, itemCount)
        break
      case 'cr':
        loot = generateLootByCR(challengeRating)
        break
      case 'hoard':
        loot = generateTreasureHoard(partyLevel)
        break
    }
    
    setGeneratedLoot(loot)
  }

  const clearLoot = () => {
    setGeneratedLoot([])
  }

  const totalValue = calculateTotalValue(generatedLoot)

  const getRarityColor = (rarity: ItemRarity): string => {
    switch (rarity) {
      case 'Common': return 'text-gray-400'
      case 'Uncommon': return 'text-green-400'
      case 'Rare': return 'text-blue-400'
      case 'Very Rare': return 'text-purple-400'
      case 'Legendary': return 'text-yellow-400'
      case 'Artifact': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-purple-400 mb-8">Loot Generator</h1>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Generate Loot</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Generation Type</label>
              <div className="flex gap-4">
                <button
                  onClick={() => setGenerationType('rarity')}
                  className={`px-4 py-2 rounded transition-colors ${
                    generationType === 'rarity' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  By Rarity
                </button>
                <button
                  onClick={() => setGenerationType('cr')}
                  className={`px-4 py-2 rounded transition-colors ${
                    generationType === 'cr' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  By Challenge Rating
                </button>
                <button
                  onClick={() => setGenerationType('hoard')}
                  className={`px-4 py-2 rounded transition-colors ${
                    generationType === 'hoard' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Treasure Hoard
                </button>
              </div>
            </div>

            {generationType === 'rarity' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Item Rarity</label>
                  <select
                    value={selectedRarity}
                    onChange={(e) => setSelectedRarity(e.target.value as ItemRarity)}
                    className="w-full px-3 py-2 bg-gray-700 rounded text-white"
                  >
                    <option value="Common">Common</option>
                    <option value="Uncommon">Uncommon</option>
                    <option value="Rare">Rare</option>
                    <option value="Very Rare">Very Rare</option>
                    <option value="Legendary">Legendary</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Number of Items</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={itemCount}
                    onChange={(e) => setItemCount(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 bg-gray-700 rounded text-white"
                  />
                </div>
              </div>
            )}

            {generationType === 'cr' && (
              <div>
                <label className="block text-sm font-medium mb-2">Challenge Rating</label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={challengeRating}
                  onChange={(e) => setChallengeRating(parseInt(e.target.value) || 0)}
                  className="w-full md:w-1/2 px-3 py-2 bg-gray-700 rounded text-white"
                  placeholder="Enter CR (0-30)"
                />
                <p className="text-sm text-gray-400 mt-1">
                  Higher CR generates more valuable and rare items
                </p>
              </div>
            )}

            {generationType === 'hoard' && (
              <div>
                <label className="block text-sm font-medium mb-2">Party Level</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={partyLevel}
                  onChange={(e) => setPartyLevel(parseInt(e.target.value) || 1)}
                  className="w-full md:w-1/2 px-3 py-2 bg-gray-700 rounded text-white"
                  placeholder="Enter party level (1-20)"
                />
                <p className="text-sm text-gray-400 mt-1">
                  Generates a balanced treasure hoard appropriate for the party level
                </p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={handleGenerateLoot}
                className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded transition-colors"
              >
                Generate Loot
              </button>
              {generatedLoot.length > 0 && (
                <button
                  onClick={clearLoot}
                  className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {generatedLoot.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Generated Loot</h2>
              <div className="text-right">
                <p className="text-sm text-gray-400">Total Value</p>
                <p className="text-xl font-bold text-yellow-400">{totalValue.toLocaleString()} gp</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {generatedLoot.map((item, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <div className="flex gap-4 text-sm">
                        <span className="text-gray-400">Type: {item.type}</span>
                        <span className={`font-medium ${getRarityColor(item.rarity)}`}>
                          {item.rarity}
                        </span>
                      </div>
                    </div>
                    {item.value && (
                      <div className="text-right">
                        <p className="text-yellow-400 font-semibold">
                          {item.value.toLocaleString()} gp
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {item.description && (
                    <p className="text-gray-300 text-sm mt-2">{item.description}</p>
                  )}
                  
                  {item.properties && Object.keys(item.properties).length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-400">Properties:</p>
                      <ul className="text-sm text-gray-300 ml-4">
                        {Object.entries(item.properties).map(([key, value]) => (
                          <li key={key}>• {key}: {String(value)}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gray-900 rounded border border-gray-600">
              <h3 className="text-lg font-semibold mb-2">Quick Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Total Items:</span>
                  <span className="ml-2 font-semibold">{generatedLoot.length}</span>
                </div>
                <div>
                  <span className="text-gray-400">Total Value:</span>
                  <span className="ml-2 font-semibold text-yellow-400">
                    {totalValue.toLocaleString()} gp
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Generation Type:</span>
                  <span className="ml-2 font-semibold capitalize">{generationType}</span>
                </div>
                <div>
                  <span className="text-gray-400">Highest Rarity:</span>
                  <span className={`ml-2 font-semibold ${getRarityColor(
                    generatedLoot.reduce((highest, item) => {
                      const rarityOrder = ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary', 'Artifact']
                      return rarityOrder.indexOf(item.rarity) > rarityOrder.indexOf(highest) 
                        ? item.rarity 
                        : highest
                    }, 'Common' as ItemRarity)
                  )}`}>
                    {generatedLoot.reduce((highest, item) => {
                      const rarityOrder = ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary', 'Artifact']
                      return rarityOrder.indexOf(item.rarity) > rarityOrder.indexOf(highest) 
                        ? item.rarity 
                        : highest
                    }, 'Common' as ItemRarity)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}