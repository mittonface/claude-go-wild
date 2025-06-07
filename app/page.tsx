import Link from 'next/link'

const features = [
  {
    href: '/campaigns',
    title: 'Campaigns',
    description: 'Manage your campaigns, track session notes, and organize your adventures',
    icon: '📖',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    href: '/npcs',
    title: 'NPC Generator',
    description: 'Create unique NPCs with generated names, traits, and stat blocks',
    icon: '👥',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    href: '/encounters',
    title: 'Encounter Builder',
    description: 'Build balanced encounters with CR calculator and initiative tracker',
    icon: '⚔️',
    gradient: 'from-red-500 to-orange-500'
  },
  {
    href: '/dice',
    title: 'Dice Roller',
    description: 'Roll dice with custom formulas and keep a history of your rolls',
    icon: '🎲',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    href: '/loot',
    title: 'Loot Generator',
    description: 'Generate treasure hoards and magic items for your party',
    icon: '💰',
    gradient: 'from-yellow-500 to-amber-500'
  },
  {
    href: '/rules',
    title: 'Quick Rules',
    description: 'Fast access to commonly referenced rules and conditions',
    icon: '📜',
    gradient: 'from-indigo-500 to-purple-500'
  }
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 rounded-lg mb-6">
            <span className="text-xl text-white">⚡</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 heading-gradient">
            DM Toolkit
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Your complete <span className="text-purple-600 font-semibold">Dungeons & Dragons</span> campaign management solution
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link href="/campaigns" className="btn-primary">
              Get Started
            </Link>
            <Link href="/dice" className="btn-secondary">
              Try Dice Roller
            </Link>
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="group card-modern p-6 block"
            >
              <div className="flex items-center mb-4">
                <div className={`w-10 h-10 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center`}>
                  <span className="text-lg">{feature.icon}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 ml-3">
                  {feature.title}
                </h2>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                {feature.description}
              </p>
              
              <div className="flex items-center text-purple-600">
                <span className="text-sm font-medium">Explore</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="glass-effect rounded-lg p-6 max-w-xl mx-auto">
            <h3 className="text-2xl font-bold mb-3 heading-gradient">
              Ready to enhance your campaigns?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of DMs using our toolkit to create unforgettable adventures.
            </p>
            <Link href="/campaigns" className="btn-primary">
              Start Your Journey
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}