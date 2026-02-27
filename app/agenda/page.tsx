'use client'

import { useState, useEffect } from 'react'
import { getOnboardingData } from '@/lib/storage'
import HomeButton from '@/components/HomeButton'
import Sidebar from '@/components/Sidebar'
import { PlusIcon, CalendarIcon, ClockIcon, FlagIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface AgendaItem {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled'
  deadline: string
  category: string
  assignedTo: string
  notes: string
}

export default function AgendaPage() {
  const [activeTab, setActiveTab] = useState('agenda')
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([])
  const [onboardingData, setOnboardingData] = useState<any>(null)
  const [filterPriority, setFilterPriority] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    const onboarding = getOnboardingData()
    setOnboardingData(onboarding)
    generateSampleAgenda(onboarding)
  }, [])

  const generateSampleAgenda = (onboarding: any) => {
    const sampleItems: AgendaItem[] = [
      {
        id: 'item_1',
        title: 'Q1 Strategic Planning Meeting',
        description: 'Review annual goals and set Q1 objectives with leadership team',
        priority: 'high',
        status: 'pending',
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'Strategy',
        assignedTo: 'Leadership Team',
        notes: 'Prepare quarterly forecast and budget review'
      },
      {
        id: 'item_2',
        title: 'Client Onboarding: TechStart Inc.',
        description: 'Complete onboarding process and initial project kickoff',
        priority: 'high',
        status: 'in-progress',
        deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'Client Management',
        assignedTo: 'Sales Team',
        notes: 'Contract signed, awaiting project scope finalization'
      },
      {
        id: 'item_3',
        title: 'Website Redesign Phase 1',
        description: 'Complete design mockups and get client approval',
        priority: 'medium',
        status: 'in-progress',
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'Projects',
        assignedTo: 'Design Team',
        notes: 'Client feedback received, implementing revisions'
      },
      {
        id: 'item_4',
        title: 'Monthly Financial Review',
        description: 'Review P&L statements and cash flow projections',
        priority: 'high',
        status: 'pending',
        deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'Finance',
        assignedTo: 'Finance Team',
        notes: 'Prepare variance analysis for board meeting'
      },
      {
        id: 'item_5',
        title: 'Team Building Event Planning',
        description: 'Organize quarterly team building activity',
        priority: 'low',
        status: 'pending',
        deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'HR',
        assignedTo: 'HR Team',
        notes: 'Budget approved, venue selection in progress'
      },
      {
        id: 'item_6',
        title: 'Marketing Campaign Launch',
        description: 'Launch new social media marketing campaign',
        priority: 'medium',
        status: 'completed',
        deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'Marketing',
        assignedTo: 'Marketing Team',
        notes: 'Campaign live, tracking metrics and engagement'
      }
    ]

    setAgendaItems(sampleItems)
  }

  const handleTabChange = (tab: string) => {
    if (tab === 'agenda') {
      return
    }
    window.location.href = `/${tab === 'dashboard' ? 'dashboard' : tab}`
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-900/20'
      case 'medium': return 'text-yellow-400 bg-yellow-900/20'
      case 'low': return 'text-green-400 bg-green-900/20'
      default: return 'text-gray-400 bg-gray-900/20'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-900/20'
      case 'in-progress': return 'text-blue-400 bg-blue-900/20'
      case 'pending': return 'text-yellow-400 bg-yellow-900/20'
      case 'cancelled': return 'text-gray-400 bg-gray-900/20'
      default: return 'text-gray-400 bg-gray-900/20'
    }
  }

  const isOverdue = (deadline: string) => {
    return new Date(deadline) < new Date() && agendaItems.find(item => item.deadline === deadline)?.status !== 'completed'
  }

  const filteredItems = agendaItems.filter(item => {
    if (filterPriority !== 'all' && item.priority !== filterPriority) return false
    if (filterStatus !== 'all' && item.status !== filterStatus) return false
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false
    return true
  })

  const categories = Array.from(new Set(agendaItems.map(item => item.category)))
  const highPriorityCount = agendaItems.filter(item => item.priority === 'high' && item.status !== 'completed').length
  const overdueCount = agendaItems.filter(item => isOverdue(item.deadline)).length
  const inProgressCount = agendaItems.filter(item => item.status === 'in-progress').length
  const completedCount = agendaItems.filter(item => item.status === 'completed').length

  return (
    <div className="flex h-screen bg-black">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-black border-b border-gray-800">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Company Agenda</h1>
                <p className="mt-1 text-gray-400">Strategic priorities and action items</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  New Item
                </button>
                <HomeButton />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-black">
          <div className="px-8 py-6 space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">High Priority</p>
                    <p className="text-2xl font-bold text-white mt-1">{highPriorityCount}</p>
                  </div>
                  <FlagIcon className="h-8 w-8 text-red-400" />
                </div>
                <p className="text-red-400 text-sm mt-2">Requires attention</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Overdue</p>
                    <p className="text-2xl font-bold text-white mt-1">{overdueCount}</p>
                  </div>
                  <ClockIcon className="h-8 w-8 text-yellow-400" />
                </div>
                <p className="text-yellow-400 text-sm mt-2">Past deadline</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">In Progress</p>
                    <p className="text-2xl font-bold text-white mt-1">{inProgressCount}</p>
                  </div>
                  <CalendarIcon className="h-8 w-8 text-blue-400" />
                </div>
                <p className="text-blue-400 text-sm mt-2">Active items</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Completed</p>
                    <p className="text-2xl font-bold text-white mt-1">{completedCount}</p>
                  </div>
                  <CheckCircleIcon className="h-8 w-8 text-green-400" />
                </div>
                <p className="text-green-400 text-sm mt-2">This month</p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white"
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Agenda Items */}
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getPriorityColor(item.priority)}`}>
                          {item.priority.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                          {item.status.replace('-', ' ').toUpperCase()}
                        </span>
                        {isOverdue(item.deadline) && (
                          <span className="px-3 py-1 text-xs font-semibold rounded-full text-red-400 bg-red-900/20">
                            OVERDUE
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 mb-3">{item.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          <span>Deadline: {new Date(item.deadline).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Category:</span>
                          <span>{item.category}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Assigned to:</span>
                          <span>{item.assignedTo}</span>
                        </div>
                      </div>
                      {item.notes && (
                        <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
                          <p className="text-sm text-gray-400"><span className="font-medium text-gray-300">Notes:</span> {item.notes}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-400 hover:bg-blue-900/20 rounded-lg transition-colors">
                        <CheckCircleIcon className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:bg-gray-800 rounded-lg transition-colors">
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
