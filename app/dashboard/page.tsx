
'use client'

import { useState, useEffect } from 'react'
import { getOnboardingData, getIndustryConfig, getUserProfile } from '@/lib/storage'
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

// Mock data for charts
const revenueData = [
  { month: 'Jan', revenue: 1200, expenses: 800 },
  { month: 'Feb', revenue: 1800, expenses: 1200 },
  { month: 'Mar', revenue: 2200, expenses: 1400 },
  { month: 'Apr', revenue: 2800, expenses: 1600 },
  { month: 'May', revenue: 3200, expenses: 1800 },
  { month: 'Jun', revenue: 3800, expenses: 2000 },
]

const projectStatusData = [
  { name: 'In Production', value: 3, color: '#10b981' },
  { name: 'Pre-Production', value: 2, color: '#f59e0b' },
  { name: 'Post-Production', value: 1, color: '#3b82f6' },
  { name: 'On Hold', value: 1, color: '#ef4444' },
]

const fundingData = [
  { category: 'Grants Applied', count: 8, success: 2 },
  { category: 'Partnerships', count: 5, success: 1 },
  { category: 'Investors', count: 3, success: 0 },
  { category: 'Crowdfunding', count: 2, success: 1 },
]

const recentDecisions = [
  {
    id: 1,
    type: 'Budget Allocation',
    description: 'Approved $200 for social media advertising campaign',
    status: 'approved',
    timestamp: '2 hours ago',
    authority: 'Level 1'
  },
  {
    id: 2,
    type: 'Content Creation',
    description: 'Generated 5 social media posts for next week',
    status: 'completed',
    timestamp: '4 hours ago',
    authority: 'Level 1'
  },
  {
    id: 3,
    type: 'Funding Research',
    description: 'Identified 3 new grant opportunities',
    status: 'pending',
    timestamp: '6 hours ago',
    authority: 'Level 2'
  },
  {
    id: 4,
    type: 'Vendor Negotiation',
    description: 'Requested 15% discount from equipment supplier',
    status: 'pending',
    timestamp: '1 day ago',
    authority: 'Level 2'
  }
]

const kpiCards = [
  {
    title: 'Monthly Revenue',
    value: '$3,800',
    change: '+15%',
    changeType: 'positive',
    icon: ArrowTrendingUpIcon
  },
  {
    title: 'Budget Utilization',
    value: '24%',
    change: '+2%',
    changeType: 'positive',
    icon: ChartBarIcon
  },
  {
    title: 'Project Completion',
    value: '85%',
    change: '+5%',
    changeType: 'positive',
    icon: CheckCircleIcon
  },
  {
    title: 'Funding Success Rate',
    value: '25%',
    change: '+10%',
    changeType: 'positive',
    icon: CurrencyDollarIcon
  }
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isLoading, setIsLoading] = useState(true)
  const [onboardingData, setOnboardingData] = useState<any>(null)
  const [industryConfig, setIndustryConfig] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [showProfileForm, setShowProfileForm] = useState(false)
  const [showCEOAgenda, setShowCEOAgenda] = useState(false)

  useEffect(() => {
    // Load onboarding data from storage
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
      // Show profile form if no profile exists
      setShowProfileForm(true)
    }
    
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
    
    // Show CEO Agenda reminder after a short delay only if not shown in this session
    if (!hasShownAgenda) {
      setTimeout(() => {
        setShowCEOAgenda(true)
        // Mark as shown in this session
        sessionStorage.setItem('ceoAgendaShown', 'true')
      }, 1500)
    }
  }, [])

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
              {(industryConfig?.kpiCards || kpiCards).map((kpi: any) => (
                <div key={kpi.title} className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-dark-400">{kpi.title}</p>
                      <p className="text-2xl font-bold text-white">{kpi.value}</p>
                      <p className={`text-sm ${kpi.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
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
                <h3 className="text-lg font-semibold text-white mb-4">Revenue vs Expenses</h3>
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
              </div>

              {/* Project Status */}
              <div className="card">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {(industryConfig?.projectStatuses || ['Planning', 'Active', 'Review', 'Completed']).join(' / ')} Distribution
                </h3>
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
              </div>
            </div>

            {/* Funding Progress */}
            <div className="card mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">
                {(industryConfig?.fundingCategories || ['Grants', 'Investors', 'Partnerships', 'Loans']).join(' / ')} Progress
              </h3>
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
                          style={{ width: `${(item.success / item.count) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-white font-medium">{item.success} successful</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Decisions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Recent AI CEO Decisions</h3>
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
              <LightBulbIcon className="h-16 w-16 text-dark-600 mx-auto mb-4" />
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
              <CurrencyDollarIcon className="h-16 w-16 text-dark-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Coming Soon</h3>
              <p className="text-dark-400">Financial management will be available soon</p>
            </div>
          </div>
        )
      
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
                <p className="text-dark-300">Manage your personal information and preferences</p>
              </div>
              <button
                onClick={() => setShowProfileForm(true)}
                className="px-4 py-2 bg-accent-500 hover:bg-accent-400 text-white rounded-lg transition-colors"
              >
                Edit Profile
              </button>
            </div>
            {userProfile && (
              <div className="card">
                <div className="flex items-center space-x-4">
                  {userProfile.profilePicture ? (
                    <img
                      src={userProfile.profilePicture}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center">
                      <UserIcon className="h-10 w-10 text-dark-400" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {userProfile.firstName} {userProfile.lastName}
                    </h3>
                    <p className="text-dark-300">{userProfile.email}</p>
                    <p className="text-dark-400">{userProfile.companyName}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      
      default:
        return null
    }
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
              <h1 className="text-2xl font-bold gradient-text">CEO AI Dashboard</h1>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                 <span className="text-sm text-dark-400">CEO AI Online</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                                 <p className="text-sm text-dark-400">{onboardingData?.industry || 'Your Business'}</p>
                 <p className="text-xs text-dark-500">{onboardingData?.businessType || 'Business'} + CEO AI</p>
              </div>
            </div>
          </div>
        </div>
      </header>

             {/* Main Content */}
       <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 ml-16 lg:ml-80">
                  {renderTabContent()}
       </main>

                        {/* Profile Form Modal */}
                 {showProfileForm && (
                   <UserProfileForm
                     onClose={() => setShowProfileForm(false)}
                     onSave={() => {
                       setShowProfileForm(false)
                       setUserProfile(getUserProfile())
                     }}
                   />
                 )}

                 {/* CEO Agenda Reminder Modal */}
                 <CEOAgenda
                   isVisible={showCEOAgenda}
                   onClose={() => setShowCEOAgenda(false)}
                   onViewFullAgenda={() => {
                     setShowCEOAgenda(false)
                     window.location.href = '/agenda'
                   }}
                 />
     </div>
   )
}
