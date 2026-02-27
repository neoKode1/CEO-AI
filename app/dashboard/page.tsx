'use client'

import { useState, useEffect } from 'react'
import { getOnboardingData, getContacts } from '@/lib/storage'
import Sidebar from '@/components/Sidebar'
import HomeButton from '@/components/HomeButton'
import {
  ChartBarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  BriefcaseIcon,
  ChartPieIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'

interface DashboardData {
  totalRevenue: number
  totalExpenses: number
  netProfit: number
  profitMargin: number
  activeClients: number
  activeProjects: number
  completedProjects: number
  pendingInvoices: number
  upcomingDeadlines: number
  clientConcentration: number
  topClient: string
  projectHealth: string
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [data, setData] = useState<DashboardData>({
    totalRevenue: 0,
    totalExpenses: 0,
    netProfit: 0,
    profitMargin: 0,
    activeClients: 0,
    activeProjects: 0,
    completedProjects: 0,
    pendingInvoices: 0,
    upcomingDeadlines: 0,
    clientConcentration: 0,
    topClient: '',
    projectHealth: 'good',
  })
  const [onboardingData, setOnboardingData] = useState<any>(null)

  useEffect(() => {
    const onboarding = getOnboardingData()
    setOnboardingData(onboarding)
    
    const contacts = getContacts()
    
    // Calculate dashboard metrics
    const revenue = 125000
    const expenses = 45000
    const profit = revenue - expenses
    const margin = (profit / revenue) * 100

    setData({
      totalRevenue: revenue,
      totalExpenses: expenses,
      netProfit: profit,
      profitMargin: margin,
      activeClients: contacts.length,
      activeProjects: Math.floor(contacts.length * 1.5),
      completedProjects: Math.floor(contacts.length * 3),
      pendingInvoices: Math.floor(contacts.length * 0.3),
      upcomingDeadlines: 12,
      clientConcentration: 35,
      topClient: contacts[0]?.company || 'TechStart Inc.',
      projectHealth: 'good',
    })
  }, [])

  const handleTabChange = (tab: string) => {
    if (tab === 'dashboard') {
      return
    }
    window.location.href = `/${tab}`
  }

  const StatCard = ({ title, value, subtitle, icon: Icon, trend, trendValue, color = 'blue' }: any) => (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-gray-700 transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <p className={`text-3xl font-bold text-${color}-400 mb-2`}>{value}</p>
          {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${
              trend === 'up' ? 'text-green-400' : 'text-red-400'
            }`}>
              {trend === 'up' ? (
                <ArrowTrendingUpIcon className="w-4 h-4" />
              ) : (
                <ArrowTrendingDownIcon className="w-4 h-4" />
              )}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-900/20`}>
          <Icon className={`w-6 h-6 text-${color}-400`} />
        </div>
      </div>
    </div>
  )

  const InsightCard = ({ title, description, status, priority }: any) => (
    <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 hover:border-gray-700 transition-all">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${
          priority === 'high' ? 'bg-red-900/20' :
          priority === 'medium' ? 'bg-yellow-900/20' : 'bg-green-900/20'
        }`}>
          {priority === 'high' ? (
            <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
          ) : priority === 'medium' ? (
            <ChartBarIcon className="w-5 h-5 text-yellow-400" />
          ) : (
            <CheckCircleIcon className="w-5 h-5 text-green-400" />
          )}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-white mb-1">{title}</h4>
          <p className="text-sm text-gray-400">{description}</p>
          <span className={`inline-block mt-2 text-xs px-2 py-1 rounded ${
            status === 'action-required' ? 'bg-red-900/20 text-red-400' :
            status === 'monitor' ? 'bg-yellow-900/20 text-yellow-400' :
            'bg-green-900/20 text-green-400'
          }`}>
            {status}
          </span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      
      <div className="flex-1 ml-64">
        <div className="p-8">
          <HomeButton />
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Executive Dashboard
            </h1>
            <p className="text-gray-400">
              {onboardingData?.businessName || 'Your Business'} - {onboardingData?.industry || 'Business'} Intelligence
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Revenue"
              value={`$${data.totalRevenue.toLocaleString()}`}
              subtitle="Last 30 days"
              icon={CurrencyDollarIcon}
              trend="up"
              trendValue="+12.5%"
              color="green"
            />
            <StatCard
              title="Net Profit"
              value={`$${data.netProfit.toLocaleString()}`}
              subtitle={`${data.profitMargin.toFixed(1)}% margin`}
              icon={ChartPieIcon}
              trend="up"
              trendValue="+8.3%"
              color="blue"
            />
            <StatCard
              title="Active Projects"
              value={data.activeProjects}
              subtitle={`${data.completedProjects} completed`}
              icon={BriefcaseIcon}
              color="purple"
            />
            <StatCard
              title="Active Clients"
              value={data.activeClients}
              subtitle={`${data.pendingInvoices} pending invoices`}
              icon={UserGroupIcon}
              color="yellow"
            />
          </div>

          {/* Strategic Insights */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <ChartBarIcon className="w-6 h-6 text-blue-400" />
              Strategic Insights
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <InsightCard
                title="Financial Health"
                description={`Strong profit margin of ${data.profitMargin.toFixed(1)}%. Revenue trending upward with controlled expenses.`}
                status="healthy"
                priority="low"
              />
              <InsightCard
                title="Client Concentration Risk"
                description={`${data.topClient} represents ${data.clientConcentration}% of revenue. Consider diversifying client base.`}
                status="monitor"
                priority="medium"
              />
              <InsightCard
                title="Project Pipeline Health"
                description={`${data.activeProjects} active projects with strong completion rate. Pipeline is healthy.`}
                status="healthy"
                priority="low"
              />
              <InsightCard
                title="Upcoming Deadlines"
                description={`${data.upcomingDeadlines} tasks and milestones due in the next 7 days. Review priority items.`}
                status="action-required"
                priority="high"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <CalendarIcon className="w-6 h-6 text-blue-400" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => handleTabChange('agenda')}
                className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-blue-500 transition-all group"
              >
                <CalendarIcon className="w-8 h-8 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white mb-1">View Agenda</h3>
                <p className="text-sm text-gray-400">Check today's priorities</p>
              </button>
              
              <button
                onClick={() => handleTabChange('clients')}
                className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-purple-500 transition-all group"
              >
                <UserGroupIcon className="w-8 h-8 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white mb-1">Manage Clients</h3>
                <p className="text-sm text-gray-400">Update client records</p>
              </button>
              
              <button
                onClick={() => handleTabChange('accounting')}
                className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-green-500 transition-all group"
              >
                <CurrencyDollarIcon className="w-8 h-8 text-green-400 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white mb-1">Review Finances</h3>
                <p className="text-sm text-gray-400">Check accounting</p>
              </button>
              
              <button
                onClick={() => handleTabChange('goals')}
                className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-yellow-500 transition-all group"
              >
                <DocumentTextIcon className="w-8 h-8 text-yellow-400 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white mb-1">Track Goals</h3>
                <p className="text-sm text-gray-400">Monitor progress</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
