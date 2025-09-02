'use client'

import { useState, useEffect } from 'react'
import { getBusinessPlans, getOnboardingData } from '@/lib/storage'
import HomeButton from '@/components/HomeButton'
import Sidebar from '@/components/Sidebar'
import {
  DocumentTextIcon,
  PlusIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline'

interface BusinessPlan {
  id: string
  title: string
  description: string
  type: 'strategic' | 'operational' | 'financial' | 'marketing'
  status: 'draft' | 'active' | 'completed' | 'on-hold'
  priority: 'high' | 'medium' | 'low'
  startDate: string
  endDate: string
  progress: number
  budget?: number
  team?: string[]
  milestones?: Array<{
    id: string
    title: string
    dueDate: string
    status: 'pending' | 'in-progress' | 'completed'
  }>
}

export default function PlansPage() {
  const [activeTab, setActiveTab] = useState('plans')
  const [plans, setPlans] = useState<BusinessPlan[]>([])
  const [onboardingData, setOnboardingData] = useState<any>(null)
  const [filterType, setFilterType] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterPriority, setFilterPriority] = useState<string>('all')

  useEffect(() => {
    const plansData = getBusinessPlans()
    const onboarding = getOnboardingData()
    
    // Convert storage plans to local format
    const convertedPlans = plansData.map(plan => ({
      id: plan.id,
      title: plan.title,
      description: plan.description,
      type: plan.type,
      status: (plan.status === 'paused' ? 'on-hold' : plan.status) as 'draft' | 'active' | 'completed' | 'on-hold',
      priority: 'medium' as const, // Default priority
      startDate: plan.startDate,
      endDate: plan.endDate,
      progress: 0, // Default progress
      budget: plan.budget?.allocated || 0,
      team: [],
             milestones: plan.milestones.map(m => ({
         id: m.id,
         title: m.title,
         dueDate: m.dueDate,
         status: (m.status === 'completed' ? 'completed' : 
                 m.status === 'in-progress' ? 'in-progress' : 'pending') as 'completed' | 'in-progress' | 'pending'
       }))
    }))
    
    setPlans(convertedPlans)
    setOnboardingData(onboarding)
    
    // Generate sample plans if none exist
    if (plansData.length === 0) {
      generateSamplePlans(onboarding)
    }
  }, [])

  const generateSamplePlans = (onboarding: any) => {
    const samplePlans: BusinessPlan[] = [
      {
        id: 'plan_1',
        title: 'Market Expansion Strategy',
        description: 'Develop and execute a comprehensive plan to expand into new markets and increase market share.',
        type: 'strategic',
        status: 'active',
        priority: 'high',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
        progress: 35,
        budget: 50000,
        team: ['Marketing', 'Sales', 'Operations'],
        milestones: [
          { id: 'm1', title: 'Market Research Complete', dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), status: 'completed' },
          { id: 'm2', title: 'Strategy Development', dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), status: 'in-progress' },
          { id: 'm3', title: 'Implementation Phase', dueDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(), status: 'pending' }
        ]
      },
      {
        id: 'plan_2',
        title: 'Operational Efficiency Improvement',
        description: 'Streamline business processes and reduce operational costs by 20%.',
        type: 'operational',
        status: 'active',
        priority: 'medium',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        progress: 60,
        budget: 25000,
        team: ['Operations', 'IT', 'HR'],
        milestones: [
          { id: 'm4', title: 'Process Audit', dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), status: 'completed' },
          { id: 'm5', title: 'Implementation', dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), status: 'in-progress' }
        ]
      },
      {
        id: 'plan_3',
        title: 'Financial Stability Plan',
        description: 'Establish robust financial controls and improve cash flow management.',
        type: 'financial',
        status: 'draft',
        priority: 'high',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(),
        progress: 15,
        budget: 15000,
        team: ['Finance', 'Accounting'],
        milestones: [
          { id: 'm6', title: 'Financial Assessment', dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), status: 'pending' }
        ]
      }
    ]
    setPlans(samplePlans)
  }

  const handleTabChange = (tab: string) => {
    if (tab === 'plans') {
      return
    }
    window.location.href = `/${tab === 'dashboard' ? 'dashboard' : tab}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-900/20'
      case 'completed': return 'text-blue-400 bg-blue-900/20'
      case 'draft': return 'text-yellow-400 bg-yellow-900/20'
      case 'on-hold': return 'text-red-400 bg-red-900/20'
      default: return 'text-gray-400 bg-gray-900/20'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-900/20'
      case 'medium': return 'text-yellow-400 bg-yellow-900/20'
      case 'low': return 'text-green-400 bg-green-900/20'
      default: return 'text-gray-400 bg-gray-900/20'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'strategic': return 'text-purple-400 bg-purple-900/20'
      case 'operational': return 'text-blue-400 bg-blue-900/20'
      case 'financial': return 'text-green-400 bg-green-900/20'
      case 'marketing': return 'text-pink-400 bg-pink-900/20'
      default: return 'text-gray-400 bg-gray-900/20'
    }
  }

  const filteredPlans = plans.filter(plan => {
    if (filterType !== 'all' && plan.type !== filterType) return false
    if (filterStatus !== 'all' && plan.status !== filterStatus) return false
    if (filterPriority !== 'all' && plan.priority !== filterPriority) return false
    return true
  })

  const stats = {
    total: plans.length,
    active: plans.filter(p => p.status === 'active').length,
    completed: plans.filter(p => p.status === 'completed').length,
    draft: plans.filter(p => p.status === 'draft').length,
    highPriority: plans.filter(p => p.priority === 'high').length
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-dark-900 border-b border-dark-700 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Plans & Execution</h1>
          <HomeButton />
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">Strategic & Operational Plans</h2>
              <p className="text-dark-300">Manage your business plans, track execution progress, and achieve strategic objectives</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                <div className="flex items-center space-x-3">
                  <DocumentTextIcon className="w-8 h-8 text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.total}</p>
                    <p className="text-dark-300 text-sm">Total Plans</p>
                  </div>
                </div>
              </div>
              <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                <div className="flex items-center space-x-3">
                  <ArrowTrendingUpIcon className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.active}</p>
                    <p className="text-dark-300 text-sm">Active</p>
                  </div>
                </div>
              </div>
              <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-8 h-8 text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.completed}</p>
                    <p className="text-dark-300 text-sm">Completed</p>
                  </div>
                </div>
              </div>
              <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                <div className="flex items-center space-x-3">
                  <ClockIcon className="w-8 h-8 text-yellow-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.draft}</p>
                    <p className="text-dark-300 text-sm">Draft</p>
                  </div>
                </div>
              </div>
              <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                <div className="flex items-center space-x-3">
                  <ExclamationTriangleIcon className="w-8 h-8 text-red-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.highPriority}</p>
                    <p className="text-dark-300 text-sm">High Priority</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-dark-800 rounded-lg p-4 mb-6 border border-dark-700">
              <div className="flex flex-wrap items-center space-x-4">
                <span className="text-white font-medium">Filters:</span>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-dark-700 text-white px-3 py-2 rounded-lg border border-dark-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="strategic">Strategic</option>
                  <option value="operational">Operational</option>
                  <option value="financial">Financial</option>
                  <option value="marketing">Marketing</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-dark-700 text-white px-3 py-2 rounded-lg border border-dark-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="on-hold">On Hold</option>
                </select>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="bg-dark-700 text-white px-3 py-2 rounded-lg border border-dark-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                  <PlusIcon className="w-4 h-4" />
                  <span>New Plan</span>
                </button>
              </div>
            </div>

            {/* Plans List */}
            <div className="space-y-4">
              {filteredPlans.map((plan) => (
                <div key={plan.id} className="bg-dark-800 rounded-lg p-6 border border-dark-700 hover:border-dark-600 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{plan.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
                          {plan.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(plan.priority)}`}>
                          {plan.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(plan.type)}`}>
                          {plan.type}
                        </span>
                      </div>
                      <p className="text-dark-300 mb-3">{plan.description}</p>
                      
                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-dark-300">Progress</span>
                          <span className="text-sm text-white">{plan.progress}%</span>
                        </div>
                        <div className="w-full bg-dark-700 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${plan.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Plan Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <CalendarIcon className="w-4 h-4 text-blue-400" />
                          <span className="text-dark-300">Start:</span>
                          <span className="text-white">{new Date(plan.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CalendarIcon className="w-4 h-4 text-green-400" />
                          <span className="text-dark-300">End:</span>
                          <span className="text-white">{new Date(plan.endDate).toLocaleDateString()}</span>
                        </div>
                        {plan.budget && (
                          <div className="flex items-center space-x-2">
                            <CurrencyDollarIcon className="w-4 h-4 text-green-400" />
                            <span className="text-dark-300">Budget:</span>
                            <span className="text-white">${plan.budget.toLocaleString()}</span>
                          </div>
                        )}
                      </div>

                      {/* Team */}
                      {plan.team && (
                        <div className="mt-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <UserGroupIcon className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-dark-300">Team:</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {plan.team.map((member, index) => (
                              <span key={index} className="px-2 py-1 bg-dark-700 text-white text-xs rounded-full">
                                {member}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Milestones */}
                      {plan.milestones && plan.milestones.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-white mb-2">Milestones</h4>
                          <div className="space-y-2">
                            {plan.milestones.map((milestone) => (
                              <div key={milestone.id} className="flex items-center justify-between bg-dark-700 rounded-lg px-3 py-2">
                                <span className="text-sm text-white">{milestone.title}</span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-dark-300">
                                    {new Date(milestone.dueDate).toLocaleDateString()}
                                  </span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    milestone.status === 'completed' ? 'text-green-400 bg-green-900/20' :
                                    milestone.status === 'in-progress' ? 'text-blue-400 bg-blue-900/20' :
                                    'text-yellow-400 bg-yellow-900/20'
                                  }`}>
                                    {milestone.status}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPlans.length === 0 && (
              <div className="text-center py-12">
                <DocumentTextIcon className="w-16 h-16 text-dark-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No plans found</h3>
                <p className="text-dark-300 mb-4">Try adjusting your filters or create a new plan</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
                  Create Your First Plan
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
