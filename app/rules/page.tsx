export default function RulesPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-purple-400 mb-8">Quick Rules Reference</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-purple-300 mb-4">Conditions</h2>
            <ul className="space-y-2 text-gray-300">
              <li><strong>Blinded:</strong> Can&apos;t see, auto-fail sight checks, attacks have disadvantage</li>
              <li><strong>Charmed:</strong> Can&apos;t attack charmer, charmer has advantage on social checks</li>
              <li><strong>Frightened:</strong> Disadvantage while source is in sight, can&apos;t move closer</li>
              <li><strong>Grappled:</strong> Speed becomes 0, can&apos;t benefit from speed bonuses</li>
              <li><strong>Paralyzed:</strong> Incapacitated, can&apos;t move or speak, auto-fail STR/DEX saves</li>
              <li><strong>Prone:</strong> Melee attacks have advantage, ranged have disadvantage</li>
              <li><strong>Stunned:</strong> Incapacitated, can&apos;t move, can speak only falteringly</li>
            </ul>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-purple-300 mb-4">Actions in Combat</h2>
            <ul className="space-y-2 text-gray-300">
              <li><strong>Attack:</strong> Make one melee or ranged attack</li>
              <li><strong>Cast a Spell:</strong> Cast a spell with casting time of 1 action</li>
              <li><strong>Dash:</strong> Gain extra movement equal to your speed</li>
              <li><strong>Dodge:</strong> Attacks against you have disadvantage</li>
              <li><strong>Help:</strong> Give ally advantage on next ability check or attack</li>
              <li><strong>Hide:</strong> Make a Stealth check to become hidden</li>
              <li><strong>Ready:</strong> Prepare to act using your reaction</li>
              <li><strong>Search:</strong> Devote attention to finding something</li>
            </ul>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-purple-300 mb-4">Skill DCs</h2>
            <ul className="space-y-2 text-gray-300">
              <li><strong>Very Easy:</strong> DC 5</li>
              <li><strong>Easy:</strong> DC 10</li>
              <li><strong>Medium:</strong> DC 15</li>
              <li><strong>Hard:</strong> DC 20</li>
              <li><strong>Very Hard:</strong> DC 25</li>
              <li><strong>Nearly Impossible:</strong> DC 30</li>
            </ul>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-purple-300 mb-4">Rest & Recovery</h2>
            <ul className="space-y-2 text-gray-300">
              <li><strong>Short Rest:</strong> 1 hour, roll Hit Dice to recover HP</li>
              <li><strong>Long Rest:</strong> 8 hours, regain all HP and half Hit Dice</li>
              <li><strong>Hit Dice:</strong> 1 per level, regain half on long rest</li>
              <li><strong>Exhaustion:</strong> 6 levels, each gives cumulative penalties</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}