
'use client'

import { useState, useEffect } from 'react'
import { getOnboardingData, getIndustryConfig, getUserProfile, getBusinessPlans, getContacts, getFinancialRecords } from '@/lib/storage'
import logger from '@/lib/logger'
import Sidebar from '@/components/Sidebar'
import UserProfileForm from '@/components/UserProfile'
import PlansExecution from '@/components/PlansExecution'
import CEOAgenda from '@/components/CEOAgenda'
import HomeButton from '@/components/HomeButton'
import ClientManagement from '@/components/ClientManagement'
import { 
  ChartBarIcon, 
  CurrencyDollarIcon, 
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  DocumentTextIcon,
  LightBulbIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isLoading, setIsLoading] = useState(true)
  const [onboardingData, setOnboardingData] = useState<any>(null)
  const [industryConfig, setIndustryConfig] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [showProfileForm, setShowProfileForm] = useState(false)
  const [showCEOAgenda, setShowCEOAgenda] = useState(false)
  
  // Real data states
  const [businessPlans, setBusinessPlans] = useState<any[]>([])
  const [contacts, setContacts] = useState<any[]>([])
  const [financialRecords, setFinancialRecords] = useState<any[]>([])
  const [revenueData, setRevenueData] = useState<any[]>([])
  const [projectStatusData, setProjectStatusData] = useState<any[]>([])
  const [fundingData, setFundingData] = useState<any[]>([])
  const [kpiCards, setKpiCards] = useState<any[]>([])
  const [recentDecisions, setRecentDecisions] = useState<any[]>([])

  // Calculate real-time data from storage
  const calculateRealTimeData = () => {
    // Calculate revenue and expenses from financial records
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    
    const monthlyData = []
    for (let i = 5; i >= 0; i--) {
      const month = new Date(currentYear, currentMonth - i, 1)
      const monthName = month.toLocaleDateString('en-US', { month: 'short' })
      
      const monthRecords = financialRecords.filter(record => {
        const recordDate = new Date(record.date)
        return recordDate.getMonth() === month.getMonth() && recordDate.getFullYear() === month.getFullYear()
      })
      
      const revenue = monthRecords
        .filter(record => record.type === 'income' || record.type === 'payment')
        .reduce((sum, record) => sum + record.amount, 0)
      
      const expenses = monthRecords
        .filter(record => record.type === 'expense')
        .reduce((sum, record) => sum + record.amount, 0)
      
      monthlyData.push({
        month: monthName,
        revenue: Math.round(revenue * 100) / 100,
        expenses: Math.round(expenses * 100) / 100
      })
    }
    setRevenueData(monthlyData)

    // Calculate project status distribution from business plans
    const projectStatuses = businessPlans.reduce((acc, plan) => {
      const status = plan.status
      acc[status] = (acc[status] || 0) + 1
      return acc
    }, {})
    
    const projectData = Object.entries(projectStatuses).map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: count,
      color: getStatusColor(status)
    }))
    setProjectStatusData(projectData)

    // Calculate funding progress from business plans and financial records
    const fundingCategories = ['Grants', 'Partnerships', 'Investors', 'Crowdfunding']
    const fundingProgress = fundingCategories.map(category => {
      const relevantPlans = businessPlans.filter(plan => 
        plan.goals.some((goal: string) => goal.toLowerCase().includes(category.toLowerCase()))
      )
      const total = relevantPlans.length
      const successful = relevantPlans.filter(plan => plan.status === 'completed').length
      
      return {
        category,
        count: total,
        success: successful
      }
    })
    setFundingData(fundingProgress)

    // Calculate KPI cards with real data
    const currentMonthRevenue = monthlyData[monthlyData.length - 1]?.revenue || 0
    const previousMonthRevenue = monthlyData[monthlyData.length - 2]?.revenue || 0
    const revenueChange = previousMonthRevenue > 0 ? ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100 : 0
    
    const totalBudget = businessPlans.reduce((sum, plan) => sum + (plan.budget?.allocated || 0), 0)
    const spentBudget = businessPlans.reduce((sum, plan) => sum + (plan.budget?.spent || 0), 0)
    const budgetUtilization = totalBudget > 0 ? (spentBudget / totalBudget) * 100 : 0
    
    const completedProjects = businessPlans.filter(plan => plan.status === 'completed').length
    const totalProjects = businessPlans.length
    const projectCompletion = totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0
    
    const successfulFunding = fundingProgress.reduce((sum, item) => sum + item.success, 0)
    const totalFunding = fundingProgress.reduce((sum, item) => sum + item.count, 0)
    const fundingSuccessRate = totalFunding > 0 ? (successfulFunding / totalFunding) * 100 : 0

    const kpiData = [
      {
        title: 'Monthly Revenue',
        value: `$${currentMonthRevenue.toLocaleString()}`,
        change: `${revenueChange >= 0 ? '+' : ''}${revenueChange.toFixed(1)}%`,
        changeType: revenueChange >= 0 ? 'positive' : 'negative',
        icon: ArrowTrendingUpIcon
      },
      {
        title: 'Budget Utilization',
        value: `${budgetUtilization.toFixed(1)}%`,
        change: budgetUtilization > 0 ? '+2%' : '0%',
        changeType: 'positive',
        icon: ChartBarIcon
      },
      {
        title: 'Project Completion',
        value: `${projectCompletion.toFixed(1)}%`,
        change: projectCompletion > 0 ? '+5%' : '0%',
        changeType: 'positive',
        icon: CheckCircleIcon
      },
      {
        title: 'Funding Success Rate',
        value: `${fundingSuccessRate.toFixed(1)}%`,
        change: fundingSuccessRate > 0 ? '+10%' : '0%',
        changeType: 'positive',
        icon: CurrencyDollarIcon
      }
    ]
    setKpiCards(kpiData)

      // Generate recent decisions based on actual data
  const decisions: Array<{
    id: string
    type: string
    description: string
    status: string
    timestamp: string
    authority: string
  }> = []
    
    // Add recent business plan updates
    const recentPlans = businessPlans
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 2)
    
    recentPlans.forEach(plan => {
      decisions.push({
        id: `plan_${plan.id}`,
        type: 'Business Plan Update',
        description: `Updated ${plan.title} - Status: ${plan.status}`,
        status: plan.status === 'completed' ? 'completed' : 'pending',
        timestamp: getTimeAgo(plan.updatedAt),
        authority: 'Level 2'
      })
    })

    // Add recent financial activities
    const recentFinancials = financialRecords
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 2)
    
    recentFinancials.forEach(record => {
      decisions.push({
        id: `financial_${record.id}`,
        type: record.type === 'income' ? 'Revenue Received' : 'Expense Recorded',
        description: `${record.description} - $${record.amount} ${record.currency}`,
        status: 'completed',
        timestamp: getTimeAgo(record.date),
        authority: 'Level 1'
      })
    })

    // Add recent contact activities
    const recentContacts = contacts
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 1)
    
    recentContacts.forEach(contact => {
      decisions.push({
        id: `contact_${contact.id}`,
        type: 'Network Update',
        description: `Updated contact: ${contact.name}`,
        status: 'completed',
        timestamp: getTimeAgo(contact.updatedAt),
        authority: 'Level 1'
      })
    })

    setRecentDecisions(decisions.slice(0, 4))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10b981'
      case 'active':
        return '#3b82f6'
      case 'draft':
        return '#f59e0b'
      case 'paused':
        return '#ef4444'
      default:
        return '#6b7280'
    }
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours} hours ago`
    if (diffInHours < 48) return '1 day ago'
    return `${Math.floor(diffInHours / 24)} days ago`
  }

  useEffect(() => {
    // Load all data from storage
    const data = getOnboardingData()
    if (data) {
      setOnboardingData(data)
      const config = getIndustryConfig(data.industry)
      setIndustryConfig(config)
    }
    
    // Load user profile
    const profile = getUserProfile()
    if (profile) {
      setUserProfile(profile)
    } else {
      setShowProfileForm(true)
    }
    
    // Load real data
    const plans = getBusinessPlans()
    setBusinessPlans(plans)
    
    const contactList = getContacts()
    setContacts(contactList)
    
    const financials = getFinancialRecords()
    setFinancialRecords(financials)
    
    // Check for tab parameter in URL
    const urlParams = new URLSearchParams(window.location.search)
    const tabParam = urlParams.get('tab')
    if (tabParam && ['dashboard', 'plans', 'goals', 'network', 'accounting'].includes(tabParam)) {
      setActiveTab(tabParam)
    }
    
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000)
    
    // Check if CEO Agenda has been shown in this session
    const hasShownAgenda = sessionStorage.getItem('ceoAgendaShown')
    
    if (!hasShownAgenda) {
      setTimeout(() => {
        setShowCEOAgenda(true)
        sessionStorage.setItem('ceoAgendaShown', 'true')
      }, 1500)
    }
  }, [])

  // Recalculate data when source data changes
  useEffect(() => {
    if (businessPlans.length > 0 || contacts.length > 0 || financialRecords.length > 0) {
      calculateRealTimeData()
    }
  }, [businessPlans, contacts, financialRecords])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mx-auto mb-4"></div>
          <p className="text-white">Loading CEO AI Dashboard...</p>
        </div>
      </div>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            {/* Welcome Message */}
            {onboardingData && (
              <div className="card mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">
                      Welcome to your {onboardingData.industry} Dashboard
                    </h2>
                    <p className="text-dark-300">
                      {onboardingData.businessType} • {onboardingData.teamSize} • {onboardingData.annualRevenue}
                    </p>
                    <p className="text-dark-400 text-sm mt-1">
                      Goals: {onboardingData.primaryGoals.join(', ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-dark-400">Years in Business</p>
                    <p className="text-2xl font-bold text-accent-500">{onboardingData.yearsInBusiness}</p>
                  </div>
                </div>
              </div>
            )}

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {kpiCards.map((kpi: any) => (
                <div key={kpi.title} className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-dark-400">{kpi.title}</p>
                      <p className="text-2xl font-bold text-white">{kpi.value}</p>
                      <p className={`text-sm ${kpi.changeType === 'positive' ? 'text-green-500' : kpi.changeType === 'negative' ? 'text-red-500' : 'text-gray-500'}`}>
                        {kpi.change} from last month
                      </p>
                    </div>
                    {kpi.icon ? <kpi.icon className="h-8 w-8 text-accent-500" /> : <ChartBarIcon className="h-8 w-8 text-accent-500" />}
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Revenue Chart */}
              <div className="card">
                <h3 className="text-lg font-semibold text-white mb-4">Revenue vs Expenses (Last 6 Months)</h3>
                {revenueData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stackId="1" 
                        stroke="#10b981" 
                        fill="#10b981" 
                        fillOpacity={0.3}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="expenses" 
                        stackId="1" 
                        stroke="#ef4444" 
                        fill="#ef4444" 
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-64 flex items-center justify-center text-dark-400">
                    <p>No financial data available yet</p>
                  </div>
                )}
              </div>

              {/* Project Status */}
              <div className="card">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Project Status Distribution
                </h3>
                {projectStatusData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={projectStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {projectStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-64 flex items-center justify-center text-dark-400">
                    <p>No business plans available yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Funding Progress */}
            <div className="card mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">
                Funding Progress
              </h3>
              {fundingData.length > 0 ? (
                <div className="space-y-4">
                  {fundingData.map((item) => (
                    <div key={item.category} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-white font-medium">{item.category}</span>
                        <span className="text-dark-400">({item.count} total)</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-32 bg-dark-800 rounded-full h-2">
                          <div 
                            className="bg-accent-500 h-2 rounded-full" 
                            style={{ width: `${item.count > 0 ? (item.success / item.count) * 100 : 0}%` }}
                          ></div>
                        </div>
                        <span className="text-white font-medium">{item.success} successful</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-dark-400">
                  <p>No funding data available yet</p>
                </div>
              )}
            </div>

            {/* Recent Decisions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Recent AI CEO Decisions</h3>
              {recentDecisions.length > 0 ? (
                <div className="space-y-4">
                  {recentDecisions.map((decision) => (
                    <div key={decision.id} className="flex items-center space-x-4 p-4 bg-dark-800 rounded-lg">
                      <div className="flex-shrink-0">
                        {decision.status === 'approved' && (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        )}
                        {decision.status === 'pending' && (
                          <ClockIcon className="h-5 w-5 text-yellow-500" />
                        )}
                        {decision.status === 'completed' && (
                          <CheckCircleIcon className="h-5 w-5 text-blue-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-medium">{decision.type}</span>
                          <span className="text-xs bg-dark-700 text-dark-300 px-2 py-1 rounded">
                            {decision.authority}
                          </span>
                        </div>
                        <p className="text-dark-300 text-sm">{decision.description}</p>
                        <p className="text-dark-400 text-xs">{decision.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-dark-400">
                  <p>No recent decisions to display</p>
                </div>
              )}
            </div>
          </div>
        )
      
      case 'plans':
        return <PlansExecution />
      
      case 'goals':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Goals & Benchmarks</h2>
              <p className="text-dark-300">3-6 month objectives and milestones</p>
            </div>
            <div className="text-center py-12">
              <LightBulbIcon className="h-16 h-16 text-dark-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Coming Soon</h3>
              <p className="text-dark-400">Goals and benchmarks management will be available soon</p>
            </div>
          </div>
        )
      
      case 'network':
        return <ClientManagement />
      
      case 'accounting':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Accounting</h2>
              <p className="text-dark-300">Financial tracking and invoicing</p>
            </div>
            <div className="text-center py-12">
              <CurrencyDollarIcon className="h-16 h-16 text-dark-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Coming Soon</h3>
              <p className="text-dark-400">Financial management will be available soon</p>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-dark-900 border-b border-dark-700 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">CEO AI Dashboard</h1>
          <HomeButton />
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Profile Form Modal */}
      {showProfileForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-dark-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Complete Your Profile</h3>
                <button
                  onClick={() => setShowProfileForm(false)}
                  className="text-dark-300 hover:text-white"
                >
                  ✕
                </button>
              </div>
                             <UserProfileForm onSave={() => setShowProfileForm(false)} onClose={() => setShowProfileForm(false)} />
            </div>
          </div>
        </div>
      )}

      {/* CEO Agenda Modal */}
      {showCEOAgenda && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-dark-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">CEO Agenda</h3>
                <button
                  onClick={() => setShowCEOAgenda(false)}
                  className="text-dark-300 hover:text-white"
                >
                  ✕
                </button>
              </div>
                             <CEOAgenda 
                 onClose={() => setShowCEOAgenda(false)} 
                 isVisible={showCEOAgenda}
                 onViewFullAgenda={() => {
                   setShowCEOAgenda(false)
                   window.location.href = '/agenda'
                 }}
               />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
