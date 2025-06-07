'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/campaigns', label: 'Campaigns', icon: '📖' },
  { href: '/npcs', label: 'NPCs', icon: '👥' },
  { href: '/encounters', label: 'Encounters', icon: '⚔️' },
  { href: '/dice', label: 'Dice', icon: '🎲' },
  { href: '/loot', label: 'Loot', icon: '💰' },
  { href: '/rules', label: 'Rules', icon: '📜' }
]

export default function Navigation() {
  const pathname = usePathname()
  
  return (
    <nav className="glass-effect border-b border-white/10 sticky top-0 z-50 backdrop-blur-xl">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="group flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300 transform group-hover:scale-105">
              <span className="text-white font-bold text-lg">⚡</span>
            </div>
            <span className="text-2xl font-bold heading-gradient">
              DM Toolkit
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  pathname === item.href
                    ? 'bg-primary-600/20 text-primary-300 shadow-glow border border-primary-500/30'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/20'
                }`}
              >
                <span className="text-lg group-hover:animate-bounce">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}