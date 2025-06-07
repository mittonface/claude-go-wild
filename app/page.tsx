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
    <main className="min-h-screen text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl shadow-glow-lg mb-8 transform hover:scale-110 transition-transform duration-300">
            <span className="text-3xl">⚡</span>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-bold mb-6 heading-gradient leading-tight">
            DM Toolkit
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Your complete <span className="text-primary-400 font-semibold">Dungeons & Dragons</span> campaign management solution
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/campaigns" className="btn-primary">
              Get Started
            </Link>
            <Link href="/dice" className="btn-secondary">
              Try Dice Roller
            </Link>
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="group card-modern p-8 hover:transform hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h2 className="text-2xl font-bold text-white ml-4 group-hover:text-primary-300 transition-colors duration-300">
                  {feature.title}
                </h2>
              </div>
              
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>
              
              <div className="mt-6 flex items-center text-primary-400 group-hover:text-primary-300 transition-colors duration-300">
                <span className="text-sm font-medium">Explore</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-20 animate-fade-in-up">
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto border border-primary-500/20">
            <h3 className="text-3xl font-bold mb-4 heading-gradient">
              Ready to enhance your campaigns?
            </h3>
            <p className="text-gray-300 mb-6">
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