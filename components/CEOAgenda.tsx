'use client'

import { useState, useEffect } from 'react'
import { getOnboardingData, getBusinessPlans } from '@/lib/storage'
import {
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  XMarkIcon,
  ChartBarIcon,
  UserGroupIcon,
  LightBulbIcon,
  BellIcon
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

interface CEOAgendaProps {
  onClose: () => void
  isVisible: boolean
  onViewFullAgenda: () => void
}

export default function CEOAgenda({ onClose, isVisible, onViewFullAgenda }: CEOAgendaProps) {
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([])
  const [onboardingData, setOnboardingData] = useState<any>(null)
  const [businessPlans, setBusinessPlans] = useState<any[]>([])

  useEffect(() => {
    const data = getOnboardingData()
    const plans = getBusinessPlans()
    setOnboardingData(data)
    setBusinessPlans(plans)
    
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
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />
      case 'in-progress':
        return <ArrowTrendingUpIcon className="h-4 w-4 text-blue-500" />
      case 'overdue':
        return <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
      default:
        return <ClockIcon className="h-4 w-4 text-yellow-500" />
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

  const highPriorityItems = agendaItems.filter(item => item.priority === 'high').slice(0, 3)
  const overdueItems = agendaItems.filter(item => {
    const dueDate = new Date(item.dueDate)
    const today = new Date()
    return dueDate < today && item.status !== 'completed'
  }).slice(0, 2)

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-dark-900 rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-accent-500/10 rounded-lg">
                <BellIcon className="h-6 w-6 text-accent-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">CEO Reminder</h2>
                <p className="text-dark-400 text-sm">
                  Your strategic priorities and upcoming deadlines
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-dark-400 hover:text-white transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-dark-800 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                <span className="text-white font-semibold text-lg">
                  {agendaItems.filter(item => item.priority === 'high').length}
                </span>
              </div>
              <p className="text-dark-400 text-sm">High Priority</p>
            </div>
            <div className="bg-dark-800 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <ArrowTrendingUpIcon className="h-5 w-5 text-blue-500" />
                <span className="text-white font-semibold text-lg">
                  {agendaItems.filter(item => item.status === 'in-progress').length}
                </span>
              </div>
              <p className="text-dark-400 text-sm">In Progress</p>
            </div>
            <div className="bg-dark-800 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <CalendarIcon className="h-5 w-5 text-yellow-500" />
                <span className="text-white font-semibold text-lg">
                  {overdueItems.length}
                </span>
              </div>
              <p className="text-dark-400 text-sm">Overdue</p>
            </div>
          </div>

          {/* High Priority Items Preview */}
          {highPriorityItems.length > 0 && (
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <LightBulbIcon className="h-4 w-4 text-accent-500" />
                <span>Top Priorities</span>
              </h3>
              <div className="space-y-3">
                {highPriorityItems.map((item) => (
                  <div key={item.id} className="bg-dark-800 rounded-lg p-3 border border-dark-700">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(item.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`text-xs px-2 py-1 rounded border ${getPriorityColor(item.priority)}`}>
                            {item.priority}
                          </span>
                          <span className="text-xs bg-dark-700 text-dark-300 px-2 py-1 rounded">
                            {item.category}
                          </span>
                        </div>
                        <h4 className="text-white font-medium text-sm mb-1">{item.title}</h4>
                        <div className="flex items-center space-x-2 text-xs text-dark-400">
                          <CalendarIcon className="h-3 w-3" />
                          <span>{formatDate(item.dueDate)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Overdue Items Alert */}
          {overdueItems.length > 0 && (
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
                <span>Overdue Items</span>
              </h3>
              <div className="space-y-3">
                {overdueItems.map((item) => (
                  <div key={item.id} className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium text-sm mb-1">{item.title}</h4>
                        <div className="flex items-center space-x-2 text-xs text-red-400">
                          <CalendarIcon className="h-3 w-3" />
                          <span>{formatDate(item.dueDate)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-dark-700">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-dark-600 text-white rounded-lg hover:border-dark-500 transition-colors"
            >
              Dismiss
            </button>
            <button
              onClick={onViewFullAgenda}
              className="flex-1 px-4 py-3 bg-accent-500 hover:bg-accent-400 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <ChartBarIcon className="h-4 w-4" />
              <span>View Full Agenda</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
