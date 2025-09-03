'use client'

import { useState, useEffect } from 'react'
import { getOnboardingData, getGoals, createGoal, updateGoal, deleteGoal, addGoalMilestone, updateGoalMilestone, deleteGoalMilestone, type GoalItem } from '@/lib/storage'
import HomeButton from '@/components/HomeButton'
import Sidebar from '@/components/Sidebar'
import {
  LightBulbIcon,
  PlusIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
  TagIcon,
  ChartBarIcon,
  FlagIcon
} from '@heroicons/react/24/outline'

interface Goal {
  id: string
  title: string
  description: string
  category: 'revenue' | 'growth' | 'operational' | 'personal' | 'team'
  target: number
  current: number
  unit: string
  deadline: string
  status: 'not-started' | 'in-progress' | 'on-track' | 'at-risk' | 'completed'
  priority: 'high' | 'medium' | 'low'
  milestones: Array<{
    id: string
    title: string
    target: number
    current: number
    dueDate: string
    status: 'pending' | 'in-progress' | 'completed'
  }>
  notes: string
  createdAt: string
}

export default function GoalsPage() {
  const [activeTab, setActiveTab] = useState('goals')
  const [goals, setGoals] = useState<GoalItem[]>([])
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [editingGoal, setEditingGoal] = useState<GoalItem | null>(null)
  const [goalForm, setGoalForm] = useState({
    title: '', description: '', category: 'growth' as GoalItem['category'], target: '', current: '', unit: '', deadline: '', status: 'not-started' as GoalItem['status'], priority: 'medium' as GoalItem['priority'], notes: ''
  })
  const [onboardingData, setOnboardingData] = useState<any>(null)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterPriority, setFilterPriority] = useState<string>('all')

  useEffect(() => {
    const onboarding = getOnboardingData()
    setOnboardingData(onboarding)
    
    const saved = getGoals()
    if (saved.length > 0) {
      setGoals(saved)
    } else {
      generateSampleGoals(onboarding)
    }
  }, [])

  const generateSampleGoals = (onboarding: any) => {
    const sampleGoals: Goal[] = [
      {
        id: 'goal_1',
        title: 'Increase Monthly Revenue',
        description: 'Grow monthly recurring revenue by 25% through new client acquisition and upselling existing clients.',
        category: 'revenue',
        target: 50000,
        current: 32000,
        unit: 'USD',
        deadline: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'on-track',
        priority: 'high',
        milestones: [
          { id: 'm1', title: 'Reach $35K MRR', target: 35000, current: 32000, dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), status: 'in-progress' },
          { id: 'm2', title: 'Reach $40K MRR', target: 40000, current: 32000, dueDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(), status: 'pending' },
          { id: 'm3', title: 'Reach $50K MRR', target: 50000, current: 32000, dueDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(), status: 'pending' }
        ],
        notes: 'Focus on high-value clients and referral programs. Track conversion rates weekly.',
        createdAt: new Date().toISOString()
      },
      {
        id: 'goal_2',
        title: 'Expand Client Base',
        description: 'Add 15 new clients across different industries to diversify revenue streams.',
        category: 'growth',
        target: 15,
        current: 8,
        unit: 'clients',
        deadline: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'in-progress',
        priority: 'high',
        milestones: [
          { id: 'm4', title: 'Add 5 new clients', target: 5, current: 3, dueDate: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString(), status: 'in-progress' },
          { id: 'm5', title: 'Add 10 new clients', target: 10, current: 8, dueDate: new Date(Date.now() + 80 * 24 * 60 * 60 * 1000).toISOString(), status: 'in-progress' },
          { id: 'm6', title: 'Add 15 new clients', target: 15, current: 8, dueDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(), status: 'pending' }
        ],
        notes: 'Focus on industries: tech startups, healthcare, and e-commerce. Use LinkedIn and networking events.',
        createdAt: new Date().toISOString()
      },
      {
        id: 'goal_3',
        title: 'Improve Customer Satisfaction',
        description: 'Achieve 95% customer satisfaction score through improved service delivery and communication.',
        category: 'operational',
        target: 95,
        current: 87,
        unit: '%',
        deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'on-track',
        priority: 'medium',
        milestones: [
          { id: 'm7', title: 'Reach 90% satisfaction', target: 90, current: 87, dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), status: 'in-progress' },
          { id: 'm8', title: 'Reach 95% satisfaction', target: 95, current: 87, dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), status: 'pending' }
        ],
        notes: 'Implement weekly check-ins, improve response times, and add customer feedback surveys.',
        createdAt: new Date().toISOString()
      },
      {
        id: 'goal_4',
        title: 'Launch New Service Line',
        description: 'Develop and launch a new consulting service for small business digital transformation.',
        category: 'growth',
        target: 1,
        current: 0,
        unit: 'service',
        deadline: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'not-started',
        priority: 'medium',
        milestones: [
          { id: 'm9', title: 'Service Design Complete', target: 1, current: 0, dueDate: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000).toISOString(), status: 'pending' },
          { id: 'm10', title: 'Pilot Program', target: 1, current: 0, dueDate: new Date(Date.now() + 100 * 24 * 60 * 60 * 1000).toISOString(), status: 'pending' },
          { id: 'm11', title: 'Full Launch', target: 1, current: 0, dueDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000).toISOString(), status: 'pending' }
        ],
        notes: 'Research market demand, design service packages, and create marketing materials.',
        createdAt: new Date().toISOString()
      }
    ]
    const seeded = sampleGoals as unknown as GoalItem[]
    localStorage.setItem('ceo-ai-goals', JSON.stringify(seeded))
    setGoals(seeded)
  }

  const handleTabChange = (tab: string) => {
    if (tab === 'goals') {
      return
    }
    window.location.href = `/${tab === 'dashboard' ? 'dashboard' : tab}`
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'revenue': return 'text-green-400 bg-green-900/20'
      case 'growth': return 'text-blue-400 bg-blue-900/20'
      case 'operational': return 'text-purple-400 bg-purple-900/20'
      case 'personal': return 'text-yellow-400 bg-yellow-900/20'
      case 'team': return 'text-pink-400 bg-pink-900/20'
      default: return 'text-gray-400 bg-gray-900/20'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-900/20'
      case 'on-track': return 'text-blue-400 bg-blue-900/20'
      case 'in-progress': return 'text-yellow-400 bg-yellow-900/20'
      case 'at-risk': return 'text-red-400 bg-red-900/20'
      case 'not-started': return 'text-gray-400 bg-gray-900/20'
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

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const getDaysRemaining = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    return days > 0 ? days : 0
  }

  // Milestone actions (lightweight prompt-based UI for speed)
  const handleAddMilestone = (goalId: string) => {
    const title = window.prompt('Milestone title:') || ''
    if (!title.trim()) return
    const target = Number(window.prompt('Target value (number):') || '0') || 0
    const current = Number(window.prompt('Current value (number):') || '0') || 0
    const dueDate = window.prompt('Due date (YYYY-MM-DD):') || ''
    const status = (window.prompt('Status (pending | in-progress | completed):') || 'pending').toLowerCase()
    addGoalMilestone(goalId, {
      title,
      target,
      current,
      dueDate: dueDate ? new Date(dueDate).toISOString() : new Date().toISOString(),
      status: (status === 'in-progress' || status === 'completed') ? (status as any) : 'pending'
    })
    setGoals(getGoals())
  }

  const handleEditMilestone = (goalId: string, milestone: { id: string; title: string; target: number; current: number; dueDate: string; status: 'pending' | 'in-progress' | 'completed' }) => {
    const title = window.prompt('Milestone title:', milestone.title) || milestone.title
    const target = Number(window.prompt('Target value (number):', String(milestone.target)) || String(milestone.target)) || milestone.target
    const current = Number(window.prompt('Current value (number):', String(milestone.current)) || String(milestone.current)) || milestone.current
    const dueStr = window.prompt('Due date (YYYY-MM-DD):', milestone.dueDate.split('T')[0]) || milestone.dueDate.split('T')[0]
    const status = (window.prompt('Status (pending | in-progress | completed):', milestone.status) || milestone.status).toLowerCase()
    updateGoalMilestone(goalId, {
      id: milestone.id,
      title,
      target,
      current,
      dueDate: dueStr ? new Date(dueStr).toISOString() : milestone.dueDate,
      status: (status === 'in-progress' || status === 'completed') ? (status as any) : 'pending'
    })
    setGoals(getGoals())
  }

  const handleDeleteMilestone = (goalId: string, milestoneId: string) => {
    if (!window.confirm('Delete this milestone?')) return
    deleteGoalMilestone(goalId, milestoneId)
    setGoals(getGoals())
  }

  const filteredGoals = goals.filter(goal => {
    if (filterCategory !== 'all' && goal.category !== filterCategory) return false
    if (filterStatus !== 'all' && goal.status !== filterStatus) return false
    if (filterPriority !== 'all' && goal.priority !== filterPriority) return false
    return true
  })

  const stats = {
    total: goals.length,
    completed: goals.filter(g => g.status === 'completed').length,
    onTrack: goals.filter(g => g.status === 'on-track').length,
    atRisk: goals.filter(g => g.status === 'at-risk').length,
    highPriority: goals.filter(g => g.priority === 'high').length
  }

  const overallProgress = goals.length > 0 
    ? goals.reduce((sum, goal) => sum + getProgressPercentage(goal.current, goal.target), 0) / goals.length
    : 0

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-dark-900 border-b border-dark-700 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Goals & Benchmarks</h1>
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
              <h2 className="text-3xl font-bold text-white mb-2">Strategic Goals & Milestones</h2>
              <p className="text-dark-300">Track your 3-6 month objectives, measure progress, and achieve your business milestones</p>
            </div>

            {/* Overall Progress */}
            <div className="bg-dark-800 rounded-lg p-6 mb-6 border border-dark-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Overall Progress</h3>
                <span className="text-2xl font-bold text-blue-400">{overallProgress.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-dark-700 rounded-full h-3 mb-2">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
              <p className="text-dark-300 text-sm">Average progress across all active goals</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                <div className="flex items-center space-x-3">
                  <TagIcon className="w-8 h-8 text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.total}</p>
                    <p className="text-dark-300 text-sm">Total Goals</p>
                  </div>
                </div>
              </div>
              <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.completed}</p>
                    <p className="text-dark-300 text-sm">Completed</p>
                  </div>
                </div>
              </div>
              <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                <div className="flex items-center space-x-3">
                  <ArrowTrendingUpIcon className="w-8 h-8 text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.onTrack}</p>
                    <p className="text-dark-300 text-sm">On Track</p>
                  </div>
                </div>
              </div>
              <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                <div className="flex items-center space-x-3">
                  <ExclamationTriangleIcon className="w-8 h-8 text-red-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.atRisk}</p>
                    <p className="text-dark-300 text-sm">At Risk</p>
                  </div>
                </div>
              </div>
              <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                <div className="flex items-center space-x-3">
                  <FlagIcon className="w-8 h-8 text-red-400" />
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
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-dark-700 text-white px-3 py-2 rounded-lg border border-dark-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="revenue">Revenue</option>
                  <option value="growth">Growth</option>
                  <option value="operational">Operational</option>
                  <option value="personal">Personal</option>
                  <option value="team">Team</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-dark-700 text-white px-3 py-2 rounded-lg border border-dark-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="on-track">On Track</option>
                  <option value="at-risk">At Risk</option>
                  <option value="completed">Completed</option>
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
                <button onClick={() => { setEditingGoal(null); setGoalForm({ title: '', description: '', category: 'growth', target: '', current: '', unit: '', deadline: '', status: 'not-started', priority: 'medium', notes: '' }); setShowGoalModal(true) }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                  <PlusIcon className="w-4 h-4" />
                  <span>New Goal</span>
                </button>
              </div>
            </div>

            {/* Goals List */}
            <div className="space-y-6">
              {filteredGoals.map((goal) => (
                <div key={goal.id} className="bg-dark-800 rounded-lg p-6 border border-dark-700 hover:border-dark-600 transition-colors">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(goal.category)}`}>
                          {goal.category}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                          {goal.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                          {goal.priority}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{goal.title}</h3>
                      <p className="text-dark-300 mb-3">{goal.description}</p>
                    </div>
                  </div>

                  {/* Progress Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-dark-700 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-dark-300">Progress</span>
                        <span className="text-sm font-medium text-white">
                          {goal.current.toLocaleString()} / {goal.target.toLocaleString()} {goal.unit}
                        </span>
                      </div>
                      <div className="w-full bg-dark-600 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getProgressPercentage(goal.current, goal.target)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-dark-400 mt-1">
                        {getProgressPercentage(goal.current, goal.target).toFixed(1)}% complete
                      </p>
                    </div>
                    <div className="bg-dark-700 rounded-lg p-3">
                      <div className="text-center">
                        <p className="text-sm text-dark-300 mb-1">Deadline</p>
                        <p className="text-lg font-semibold text-white">
                          {new Date(goal.deadline).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-dark-400">
                          {getDaysRemaining(goal.deadline)} days remaining
                        </p>
                      </div>
                    </div>
                    <div className="bg-dark-700 rounded-lg p-3">
                      <div className="text-center">
                        <p className="text-sm text-dark-300 mb-1">Milestones</p>
                        <p className="text-lg font-semibold text-white">
                          {goal.milestones.filter(m => m.status === 'completed').length} / {goal.milestones.length}
                        </p>
                        <p className="text-xs text-dark-400">completed</p>
                      </div>
                    </div>
                  </div>

                  {/* Milestones */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-white">Milestones</h4>
                      <button onClick={() => handleAddMilestone(goal.id)} className="px-3 py-1 rounded bg-dark-700 text-white hover:bg-dark-600 text-xs">Add Milestone</button>
                    </div>
                    <div className="space-y-2">
                      {goal.milestones.map((milestone) => (
                        <div key={milestone.id} className="flex items-center justify-between bg-dark-700 rounded-lg px-3 py-2">
                          <div className="flex-1">
                            <span className="text-sm text-white">{milestone.title}</span>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-dark-300">
                                {milestone.current.toLocaleString()} / {milestone.target.toLocaleString()}
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
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-dark-400 mr-2">Due: {new Date(milestone.dueDate).toLocaleDateString()}</span>
                            <button onClick={() => handleEditMilestone(goal.id, milestone)} className="px-2 py-1 rounded bg-dark-600 text-white hover:bg-dark-500 text-xs">Edit</button>
                            <button onClick={() => handleDeleteMilestone(goal.id, milestone.id)} className="px-2 py-1 rounded bg-red-900/30 text-red-300 border border-red-800 hover:bg-red-900/40 text-xs">Delete</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  {goal.notes && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-white mb-2">Notes</h4>
                      <p className="text-sm text-dark-300 bg-dark-700 rounded-lg p-3">{goal.notes}</p>
                    </div>
                  )}

                  {/* Created Date */}
                  <div className="flex items-center justify-between text-xs text-dark-400">
                    <span>Created: {new Date(goal.createdAt).toLocaleDateString()}</span>
                    <div className="space-x-2">
                      <button onClick={() => { setEditingGoal(goal); setGoalForm({ title: goal.title, description: goal.description, category: goal.category, target: String(goal.target), current: String(goal.current), unit: goal.unit, deadline: goal.deadline.split('T')[0], status: goal.status, priority: goal.priority, notes: goal.notes }); setShowGoalModal(true) }} className="px-3 py-1 rounded bg-dark-700 text-white hover:bg-dark-600">Edit</button>
                      <button onClick={() => { deleteGoal(goal.id); setGoals(getGoals()) }} className="px-3 py-1 rounded bg-red-900/30 text-red-300 border border-red-800 hover:bg-red-900/40">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredGoals.length === 0 && (
              <div className="text-center py-12">
                <LightBulbIcon className="w-16 h-16 text-dark-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No goals found</h3>
                <p className="text-dark-300 mb-4">Try adjusting your filters or create your first goal</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
                  Create Your First Goal
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Goal Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-dark-900 border border-dark-800 rounded-lg w-full max-w-2xl">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold">{editingGoal ? 'Edit Goal' : 'New Goal'}</h3>
                <button onClick={() => setShowGoalModal(false)} className="text-dark-300 hover:text-white">✕</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-dark-300 mb-1">Title</label>
                  <input value={goalForm.title} onChange={(e) => setGoalForm({ ...goalForm, title: e.target.value })} className="input-field w-full" />
                </div>
                <div>
                  <label className="block text-sm text-dark-300 mb-1">Category</label>
                  <select value={goalForm.category} onChange={(e) => setGoalForm({ ...goalForm, category: e.target.value as any })} className="input-field w-full">
                    <option value="revenue">Revenue</option>
                    <option value="growth">Growth</option>
                    <option value="operational">Operational</option>
                    <option value="personal">Personal</option>
                    <option value="team">Team</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-dark-300 mb-1">Target</label>
                  <input type="number" value={goalForm.target} onChange={(e) => setGoalForm({ ...goalForm, target: e.target.value })} className="input-field w-full" />
                </div>
                <div>
                  <label className="block text-sm text-dark-300 mb-1">Current</label>
                  <input type="number" value={goalForm.current} onChange={(e) => setGoalForm({ ...goalForm, current: e.target.value })} className="input-field w-full" />
                </div>
                <div>
                  <label className="block text-sm text-dark-300 mb-1">Unit</label>
                  <input value={goalForm.unit} onChange={(e) => setGoalForm({ ...goalForm, unit: e.target.value })} className="input-field w-full" />
                </div>
                <div>
                  <label className="block text-sm text-dark-300 mb-1">Deadline</label>
                  <input type="date" value={goalForm.deadline} onChange={(e) => setGoalForm({ ...goalForm, deadline: e.target.value })} className="input-field w-full" />
                </div>
                <div>
                  <label className="block text-sm text-dark-300 mb-1">Status</label>
                  <select value={goalForm.status} onChange={(e) => setGoalForm({ ...goalForm, status: e.target.value as any })} className="input-field w-full">
                    <option value="not-started">Not Started</option>
                    <option value="in-progress">In Progress</option>
                    <option value="on-track">On Track</option>
                    <option value="at-risk">At Risk</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-dark-300 mb-1">Priority</label>
                  <select value={goalForm.priority} onChange={(e) => setGoalForm({ ...goalForm, priority: e.target.value as any })} className="input-field w-full">
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-dark-300 mb-1">Description</label>
                  <textarea value={goalForm.description} onChange={(e) => setGoalForm({ ...goalForm, description: e.target.value })} className="input-field w-full h-20 resize-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-dark-300 mb-1">Notes</label>
                  <textarea value={goalForm.notes} onChange={(e) => setGoalForm({ ...goalForm, notes: e.target.value })} className="input-field w-full h-20 resize-none" />
                </div>
              </div>
              <div className="flex items-center justify-end space-x-3 pt-2">
                <button onClick={() => setShowGoalModal(false)} className="px-4 py-2 text-dark-300 hover:text-white">Cancel</button>
                <button onClick={() => {
                  if (editingGoal) {
                    const updated: GoalItem = { ...editingGoal, title: goalForm.title, description: goalForm.description, category: goalForm.category, target: Number(goalForm.target)||0, current: Number(goalForm.current)||0, unit: goalForm.unit, deadline: goalForm.deadline ? new Date(goalForm.deadline).toISOString() : editingGoal.deadline, status: goalForm.status, priority: goalForm.priority, notes: goalForm.notes }
                    updateGoal(updated)
                    setGoals(getGoals())
                  } else {
                    const created = createGoal({ title: goalForm.title, description: goalForm.description, category: goalForm.category, target: Number(goalForm.target)||0, current: Number(goalForm.current)||0, unit: goalForm.unit, deadline: goalForm.deadline ? new Date(goalForm.deadline).toISOString() : new Date().toISOString(), status: goalForm.status, priority: goalForm.priority, milestones: [], notes: goalForm.notes })
                    setGoals([created, ...goals])
                  }
                  setShowGoalModal(false)
                }} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">{editingGoal ? 'Save Goal' : 'Create Goal'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
