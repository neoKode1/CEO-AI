'use client'

import { useRouter } from 'next/navigation'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function LandingPage() {
  const router = useRouter()

  const handleSignIn = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
          CEO AI
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Universal Business Intelligence Assistant
        </p>
        
        <button
          onClick={handleSignIn}
          className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-black bg-white rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-2xl hover:shadow-white/20 hover:scale-105"
        >
          Enter Dashboard
          <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="mt-8 text-sm text-gray-500">
          Autonomous operations with human oversight
        </p>
      </div>
    </div>
  )
}
