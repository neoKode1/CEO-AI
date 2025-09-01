'use client'

import { HomeIcon } from '@heroicons/react/24/outline'

interface HomeButtonProps {
  className?: string
}

export default function HomeButton({ className = '' }: HomeButtonProps) {
  const handleHomeClick = () => {
    window.location.href = '/dashboard'
  }

  return (
    <button
      onClick={handleHomeClick}
      className={`fixed top-4 left-4 z-50 p-2 bg-dark-800 rounded-lg border border-dark-700 text-white hover:bg-accent-500 hover:border-accent-400 transition-all duration-200 ${className}`}
      title="Go to Dashboard"
    >
      <HomeIcon className="h-5 w-5" />
    </button>
  )
}
