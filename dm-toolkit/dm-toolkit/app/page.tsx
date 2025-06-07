import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-6xl font-bold text-center mb-8 text-purple-400">
          DM Toolkit
        </h1>
        <p className="text-xl text-center mb-12 text-gray-300">
          Your complete Dungeons & Dragons campaign management solution
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Link href="/campaigns" className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold mb-3 text-purple-300">Campaigns</h2>
            <p className="text-gray-400">Manage your campaigns, track session notes, and organize your adventures</p>
          </Link>
          
          <Link href="/npcs" className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold mb-3 text-purple-300">NPC Generator</h2>
            <p className="text-gray-400">Create unique NPCs with generated names, traits, and stat blocks</p>
          </Link>
          
          <Link href="/encounters" className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold mb-3 text-purple-300">Encounter Builder</h2>
            <p className="text-gray-400">Build balanced encounters with CR calculator and initiative tracker</p>
          </Link>
          
          <Link href="/dice" className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold mb-3 text-purple-300">Dice Roller</h2>
            <p className="text-gray-400">Roll dice with custom formulas and keep a history of your rolls</p>
          </Link>
          
          <Link href="/loot" className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold mb-3 text-purple-300">Loot Generator</h2>
            <p className="text-gray-400">Generate treasure hoards and magic items for your party</p>
          </Link>
          
          <Link href="/rules" className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold mb-3 text-purple-300">Quick Rules</h2>
            <p className="text-gray-400">Fast access to commonly referenced rules and conditions</p>
          </Link>
        </div>
      </div>
    </main>
  )
}