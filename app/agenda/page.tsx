'use client'

import { useState, useEffect } from 'react'
import { getOnboardingData, getBusinessPlans } from '@/lib/storage'
import HomeButton from '@/components/HomeButton'
import Sidebar from '@/components/Sidebar'
import {
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  UserGroupIcon,
  LightBulbIcon,
  FunnelIcon,
  PlusIcon
} from '@heroicons/react/24/outline'

interface AgendaItem {
  id: string
  type: 'priority' | 'goal' | 'benchmark' | 'deadline'
  title: string
  description: string
  dueDate: string
  status: 'pending' | 'in-progress' | 'completed' | 'overdue'
  priority: 'high' | 'medium' | 'low'
  category: string
  progress?: number
}

export default function AgendaPage() {
  const [activeTab, setActiveTab] = useState('agenda')
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([])
  const [onboardingData, setOnboardingData] = useState<any>(null)
  const [businessPlans, setBusinessPlans] = useState<any[]>([])
  const [filterType, setFilterType] = useState<string>('all')
  const [filterPriority, setFilterPriority] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  useEffect(() => {
    const data = getOnboardingData()
    const plans = getBusinessPlans()
    setOnboardingData(data)
    setBusinessPlans(plans)
    
    // Check for filter parameter in URL
    const urlParams = new URLSearchParams(window.location.search)
    const filterParam = urlParams.get('filter')
    if (filterParam === 'high') {
      setFilterPriority('high')
    }
    
    // Generate CEO agenda based on onboarding data and business plans
    generateCEOAgenda(data, plans)
  }, [])

  const generateCEOAgenda = (onboardingData: any, plans: any[]) => {
    const today = new Date()
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    const nextMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
    const nextQuarter = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000)

    const generatedAgenda: AgendaItem[] = []

    // Company Priorities (based on onboarding goals and challenges)
    if (onboardingData?.primaryGoals) {
      onboardingData.primaryGoals.forEach((goal: string, index: number) => {
        generatedAgenda.push({
          id: `priority_${index}`,
          type: 'priority',
          title: `Strategic Priority: ${goal}`,
          description: `Focus on achieving ${goal.toLowerCase()} to drive business growth and success.`,
          dueDate: nextQuarter.toISOString(),
          status: 'pending',
          priority: 'high',
          category: 'Strategic Planning'
        })
      })
    }

    // Immediate Actions (based on challenges)
    if (onboardingData?.currentChallenges) {
      onboardingData.currentChallenges.forEach((challenge: string, index: number) => {
        generatedAgenda.push({
          id: `action_${index}`,
          type: 'benchmark',
          title: `Address: ${challenge}`,
          description: `Develop and implement solutions to overcome ${challenge.toLowerCase()}.`,
          dueDate: nextMonth.toISOString(),
          status: 'in-progress',
          priority: 'high',
          category: 'Problem Resolution',
          progress: 25
        })
      })
    }

    // Business Plan Milestones
    plans.forEach((plan, planIndex) => {
      if (plan.milestones && plan.milestones.length > 0) {
        plan.milestones.forEach((milestone: any, milestoneIndex: number) => {
          generatedAgenda.push({
            id: `milestone_${planIndex}_${milestoneIndex}`,
            type: 'benchmark',
            title: milestone.title,
            description: milestone.description,
            dueDate: milestone.dueDate,
            status: milestone.status,
            priority: milestone.priority,
            category: `${plan.type} Plan`,
            progress: milestone.status === 'completed' ? 100 : 
                     milestone.status === 'in-progress' ? 50 : 0
          })
        })
      }
    })

    // Industry-specific benchmarks
    if (onboardingData?.industry) {
      const industryBenchmarks = getIndustryBenchmarks(onboardingData.industry)
      industryBenchmarks.forEach((benchmark, index) => {
        generatedAgenda.push({
          id: `benchmark_${index}`,
          type: 'benchmark',
          title: benchmark.title,
          description: benchmark.description,
          dueDate: benchmark.dueDate,
          status: 'pending',
          priority: benchmark.priority,
          category: 'Industry Standards'
        })
      })
    }

    // Financial milestones
    generatedAgenda.push({
      id: 'financial_review',
      type: 'deadline',
      title: 'Monthly Financial Review',
      description: 'Review revenue, expenses, and budget utilization for strategic decision making.',
      dueDate: nextWeek.toISOString(),
      status: 'pending',
      priority: 'high',
      category: 'Financial Management'
    })

    // Team and operational items
    if (onboardingData?.teamSize && onboardingData.teamSize !== 'Solo Entrepreneur') {
      generatedAgenda.push({
        id: 'team_performance',
        type: 'goal',
        title: 'Team Performance Review',
        description: 'Assess team productivity and identify areas for improvement and training.',
        dueDate: nextMonth.toISOString(),
        status: 'pending',
        priority: 'medium',
        category: 'Team Management'
      })
    }

    setAgendaItems(generatedAgenda.sort((a, b) => {
      // Sort by priority first, then by due date
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
      if (priorityDiff !== 0) return priorityDiff
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    }))
  }

  const getIndustryBenchmarks = (industry: string) => {
    const benchmarks: any[] = []
    
    switch (industry) {
      case 'Technology/Software':
        benchmarks.push(
          {
            title: 'Product Development Sprint',
            description: 'Complete current development sprint and plan next iteration.',
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
            priority: 'high'
          },
          {
            title: 'User Feedback Analysis',
            description: 'Review user feedback and implement critical improvements.',
            dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
            priority: 'medium'
          }
        )
        break
      case 'Healthcare':
        benchmarks.push(
          {
            title: 'Patient Satisfaction Survey',
            description: 'Conduct patient satisfaction survey and analyze results.',
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            priority: 'high'
          },
          {
            title: 'Compliance Review',
            description: 'Review and update compliance procedures and documentation.',
            dueDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
            priority: 'high'
          }
        )
        break
      case 'Manufacturing':
        benchmarks.push(
          {
            title: 'Quality Control Audit',
            description: 'Conduct quality control audit and implement improvements.',
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
            priority: 'high'
          },
          {
            title: 'Supply Chain Review',
            description: 'Review supply chain efficiency and identify optimization opportunities.',
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            priority: 'medium'
          }
        )
        break
      default:
        benchmarks.push(
          {
            title: 'Business Process Review',
            description: 'Review current business processes and identify optimization opportunities.',
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            priority: 'medium'
          }
        )
    }
    
    return benchmarks
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case 'in-progress':
        return <ArrowTrendingUpIcon className="h-5 w-5 text-blue-500" />
      case 'overdue':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
      default:
        return <ClockIcon className="h-5 w-5 text-yellow-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/10 text-red-400 border-red-500/20'
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      case 'low':
        return 'bg-green-500/10 text-green-400 border-green-500/20'
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'priority':
        return <LightBulbIcon className="h-4 w-4" />
      case 'goal':
        return <ChartBarIcon className="h-4 w-4" />
      case 'benchmark':
        return <CheckCircleIcon className="h-4 w-4" />
      case 'deadline':
        return <CalendarIcon className="h-4 w-4" />
      default:
        return <ClockIcon className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`
    if (diffDays === 0) return 'Due today'
    if (diffDays === 1) return 'Due tomorrow'
    if (diffDays <= 7) return `Due in ${diffDays} days`
    if (diffDays <= 30) return `Due in ${Math.ceil(diffDays / 7)} weeks`
    return `Due in ${Math.ceil(diffDays / 30)} months`
  }

  const filteredItems = agendaItems.filter(item => {
    if (filterType !== 'all' && item.type !== filterType) return false
    if (filterPriority !== 'all' && item.priority !== filterPriority) return false
    if (filterStatus !== 'all' && item.status !== filterStatus) return false
    return true
  })

  const stats = {
    total: agendaItems.length,
    highPriority: agendaItems.filter(item => item.priority === 'high').length,
    inProgress: agendaItems.filter(item => item.status === 'in-progress').length,
    completed: agendaItems.filter(item => item.status === 'completed').length,
    overdue: agendaItems.filter(item => {
      const dueDate = new Date(item.dueDate)
      const today = new Date()
      return dueDate < today && item.status !== 'completed'
    }).length
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Home Button */}
      <HomeButton />
      
      {/* Header */}
      <header className="bg-dark-900 border-b border-dark-800 ml-16 lg:ml-80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold gradient-text">Company Agenda</h1>
              <div className="flex items-center space-x-2">
                <ChartBarIcon className="h-5 w-5 text-accent-500" />
                <span className="text-sm text-dark-400">Strategic Priorities & Timeline</span>
              </div>
            </div>
            <button className="btn-primary flex items-center space-x-2">
              <PlusIcon className="h-4 w-4" />
              <span>Add Item</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 ml-16 lg:ml-80">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-400">Total Items</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <ChartBarIcon className="h-8 w-8 text-accent-500" />
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-400">High Priority</p>
                <p className="text-2xl font-bold text-white">{stats.highPriority}</p>
              </div>
              <ExclamationTriangleIcon className="h-8 w-8 text-red-500" />
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-400">In Progress</p>
                <p className="text-2xl font-bold text-white">{stats.inProgress}</p>
              </div>
              <ArrowTrendingUpIcon className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-400">Completed</p>
                <p className="text-2xl font-bold text-white">{stats.completed}</p>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-400">Overdue</p>
                <p className="text-2xl font-bold text-white">{stats.overdue}</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5 text-dark-400" />
              <span className="text-white font-medium">Filters:</span>
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm focus:border-accent-500 focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="priority">Priorities</option>
              <option value="goal">Goals</option>
              <option value="benchmark">Benchmarks</option>
              <option value="deadline">Deadlines</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm focus:border-accent-500 focus:outline-none"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm focus:border-accent-500 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>

        {/* Agenda Items */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(item.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center space-x-1">
                        {getTypeIcon(item.type)}
                        <span className="text-xs bg-dark-700 text-dark-300 px-2 py-1 rounded">
                          {item.type}
                        </span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded border ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                      <span className="text-xs bg-dark-700 text-dark-300 px-2 py-1 rounded">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                    <p className="text-dark-300 text-sm mb-3">{item.description}</p>
                    
                    {/* Progress Bar */}
                    {item.progress !== undefined && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs text-dark-400 mb-1">
                          <span>Progress</span>
                          <span>{item.progress}%</span>
                        </div>
                        <div className="w-full bg-dark-700 rounded-full h-2">
                          <div
                            className="bg-accent-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-4 text-xs text-dark-400">
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="h-3 w-3" />
                        <span>{formatDate(item.dueDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <ChartBarIcon className="h-16 w-16 text-dark-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No items found</h3>
            <p className="text-dark-400">Try adjusting your filters or add new agenda items</p>
          </div>
        )}
      </main>
    </div>
  )
}
