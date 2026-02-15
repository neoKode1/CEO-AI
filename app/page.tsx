'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  ChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  BanknotesIcon,
  ClipboardDocumentCheckIcon,
  MegaphoneIcon,
  BriefcaseIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  SparklesIcon,
  MicrophoneIcon,
  BoltIcon,
} from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

export default function LandingPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      icon: MicrophoneIcon,
      title: 'Voice Recognition & AI Assistant',
      description: 'Natural language processing with intelligent routing and text-to-speech responses',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: ChartBarIcon,
      title: 'Business Intelligence Dashboard',
      description: 'Dynamic analytics with CEO-level insights and real-time performance metrics',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: UserGroupIcon,
      title: 'Network & Client Management',
      description: 'Comprehensive client database with project tracking and relationship management',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Financial Management',
      description: 'Revenue tracking, budget analysis, and payment monitoring with multi-currency support',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
    },
    {
      icon: CalendarIcon,
      title: 'Agenda & Priority Management',
      description: 'Strategic task orchestration with deadline tracking and priority identification',
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
    },
    {
      icon: BriefcaseIcon,
      title: 'Plans & Execution',
      description: 'Business plan management with goal setting and strategic roadmap development',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
    },
  ]

  const modules = [
    { icon: ChartBarIcon, name: 'Dashboard', path: '/dashboard', color: 'text-blue-400' },
    { icon: ClipboardDocumentCheckIcon, name: 'Goals', path: '/goals', color: 'text-purple-400' },
    { icon: UserGroupIcon, name: 'Clients', path: '/clients', color: 'text-green-400' },
    { icon: CurrencyDollarIcon, name: 'Budget', path: '/budget', color: 'text-yellow-400' },
    { icon: CalendarIcon, name: 'Agenda', path: '/agenda', color: 'text-pink-400' },
    { icon: DocumentTextIcon, name: 'Contracts', path: '/contracts', color: 'text-cyan-400' },
    { icon: BanknotesIcon, name: 'Accounting', path: '/accounting', color: 'text-emerald-400' },
    { icon: BriefcaseIcon, name: 'Collaborators', path: '/collaborators', color: 'text-orange-400' },
    { icon: MegaphoneIcon, name: 'Marketing', path: '/marketing', color: 'text-red-400' },
    { icon: ChatBubbleLeftRightIcon, name: 'Communications', path: '/communications', color: 'text-indigo-400' },
  ]

  const stats = [
    { label: 'Business Modules', value: '10+' },
    { label: 'AI-Powered Features', value: '20+' },
    { label: 'Real-time Analytics', value: '100%' },
    { label: 'Voice Commands', value: 'Unlimited' },
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <SparklesIcon className="h-8 w-8 text-purple-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                CEO AI
              </span>
            </div>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all flex items-center space-x-2 font-medium"
            >
              <span>Get Started</span>
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
            <BoltIcon className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-purple-400 font-medium">Universal Business Intelligence Assistant</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
              CEO AI
            </span>
            <br />
            <span className="text-gray-100">Your Intelligent Business Partner</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            A comprehensive, industry-agnostic AI-powered business management system. 
            Built with Next.js, featuring advanced voice recognition, real-time analytics, and strategic insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => router.push('/dashboard')}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all flex items-center space-x-2 font-medium text-lg shadow-lg shadow-purple-500/50"
            >
              <span>Launch Dashboard</span>
              <ArrowRightIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all font-medium text-lg border border-gray-700"
            >
              Explore Features
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to manage and grow your business intelligently
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all"
            >
              <div className={`${feature.bgColor} rounded-lg w-12 h-12 flex items-center justify-center mb-4`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modules Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Core Business Modules
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Integrated tools for every aspect of your business operations
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {modules.map((module, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              onClick={() => router.push(module.path)}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 hover:bg-gray-800 transition-all group"
            >
              <module.icon className={`h-8 w-8 ${module.color} mx-auto mb-3 group-hover:scale-110 transition-transform`} />
              <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{module.name}</div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/20 rounded-2xl p-12 text-center"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-100">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Start using CEO AI today and experience the power of intelligent business management
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all flex items-center space-x-2 font-medium text-lg mx-auto shadow-lg shadow-purple-500/50"
          >
            <span>Get Started Now</span>
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <SparklesIcon className="h-6 w-6 text-purple-400" />
              <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                CEO AI
              </span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 CEO AI. Built with Next.js, React, and TypeScript.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
