'use client'

import { useRouter } from 'next/navigation'
import { ArrowRightIcon, SparklesIcon, MicrophoneIcon, ChartBarIcon } from '@heroicons/react/24/outline'

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Branding */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-7xl lg:text-8xl font-bold text-white">
                  CEO AI
                </h1>
                <div className="h-1 w-32 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500"></div>
              </div>

              <p className="text-2xl text-gray-300 font-light leading-relaxed">
                Your intelligent business management assistant.
              </p>

              <div className="space-y-4 text-gray-400">
                <div className="flex items-start space-x-3">
                  <MicrophoneIcon className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                  <p>Voice-powered navigation and AI assistance for hands-free control</p>
                </div>
                <div className="flex items-start space-x-3">
                  <ChartBarIcon className="w-6 h-6 text-pink-400 flex-shrink-0 mt-1" />
                  <p>Real-time analytics and strategic insights at CEO level</p>
                </div>
                <div className="flex items-start space-x-3">
                  <SparklesIcon className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <p>Comprehensive business intelligence across all operations</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-purple-500/50"
                >
                  <span>Get Started</span>
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="px-8 py-4 bg-white/5 text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 border border-white/10 backdrop-blur-sm"
                >
                  View Demo
                </button>
              </div>
            </div>

            {/* Right side - Feature highlights */}
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <h3 className="text-xl font-semibold text-white mb-2">Voice Recognition</h3>
                <p className="text-gray-400">Speak naturally to navigate your business data and get instant insights</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <h3 className="text-xl font-semibold text-white mb-2">Business Intelligence</h3>
                <p className="text-gray-400">Track finances, clients, projects, and goals in one unified platform</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <h3 className="text-xl font-semibold text-white mb-2">Strategic Analytics</h3>
                <p className="text-gray-400">CEO-level insights with real-time performance metrics and forecasting</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <h3 className="text-xl font-semibold text-white mb-2">Industry Agnostic</h3>
                <p className="text-gray-400">Adapts to any business type with customizable dashboards and workflows</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
