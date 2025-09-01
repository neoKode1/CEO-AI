'use client'

import { useState, useEffect } from 'react'
import HomeButton from '@/components/HomeButton'
import Sidebar from '@/components/Sidebar'
import { 
  MagnifyingGlassIcon,
  PlusIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  StarIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'

// Mock funding opportunities data
const fundingOpportunities = [
  {
    id: 1,
    name: 'National Endowment for the Arts Grant',
    amount: 25000,
    deadline: '2024-03-15',
    category: 'Federal Grant',
    status: 'researching',
    match: 95,
    description: 'Supporting innovative film projects that explore contemporary themes',
    requirements: ['Non-profit status', 'Detailed project proposal', 'Budget breakdown'],
    applied: false
  },
  {
    id: 2,
    name: 'Sundance Institute Documentary Fund',
    amount: 50000,
    deadline: '2024-04-30',
    category: 'Foundation Grant',
    status: 'applied',
    match: 88,
    description: 'Funding for documentary filmmakers working on social impact projects',
    requirements: ['Documentary focus', 'Social impact angle', 'Previous work samples'],
    applied: true
  },
  {
    id: 3,
    name: 'Kickstarter Campaign',
    amount: 15000,
    deadline: '2024-02-28',
    category: 'Crowdfunding',
    status: 'planning',
    match: 92,
    description: 'Community-funded project with tiered rewards for backers',
    requirements: ['Compelling pitch video', 'Reward tiers', 'Marketing strategy'],
    applied: false
  },
  {
    id: 4,
    name: 'Film Independent Spirit Awards',
    amount: 35000,
    deadline: '2024-05-15',
    category: 'Award',
    status: 'researching',
    match: 78,
    description: 'Annual awards recognizing independent filmmakers',
    requirements: ['Independent production', 'Original screenplay', 'Festival submission'],
    applied: false
  },
  {
    id: 5,
    name: 'Amazon Studios Development Deal',
    amount: 100000,
    deadline: '2024-06-30',
    category: 'Partnership',
    status: 'researching',
    match: 85,
    description: 'Development funding for streaming platform content',
    requirements: ['Series concept', 'Pilot script', 'Production timeline'],
    applied: false
  }
]

const applicationStatuses = [
  { id: 1, name: 'Sundance Institute Documentary Fund', status: 'submitted', date: '2024-01-10', nextStep: 'Follow up in 2 weeks' },
  { id: 2, name: 'Local Arts Council Grant', status: 'approved', date: '2024-01-05', nextStep: 'Contract signing' },
  { id: 3, name: 'Independent Film Fund', status: 'rejected', date: '2024-01-02', nextStep: 'Review feedback' }
]

const aiInsights = [
  {
    id: 1,
    type: 'Opportunity Alert',
    title: 'New Grant Opportunity Identified',
    description: 'California Arts Council has opened applications for film projects',
    potentialAmount: 20000,
    deadline: '2024-03-01',
    priority: 'high'
  },
  {
    id: 2,
    type: 'Application Strategy',
    title: 'Optimize Sundance Application',
    description: 'Based on previous winners, emphasize social impact narrative',
    potentialAmount: 0,
    deadline: null,
    priority: 'medium'
  },
  {
    id: 3,
    type: 'Partnership Opportunity',
    title: 'Netflix Documentary Initiative',
    description: 'New program for emerging documentary filmmakers',
    potentialAmount: 75000,
    deadline: '2024-04-15',
    priority: 'high'
  }
]

const fundingStats = {
  totalOpportunities: 12,
  applied: 3,
  approved: 1,
  pending: 2,
  totalPotential: 185000
}

export default function FundingPage() {
  const [activeTab, setActiveTab] = useState('opportunities')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [showAddOpportunity, setShowAddOpportunity] = useState(false)

  const filteredOpportunities = fundingOpportunities.filter(opportunity => {
    const matchesSearch = opportunity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || opportunity.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-900 text-blue-300'
      case 'approved': return 'bg-green-900 text-green-300'
      case 'rejected': return 'bg-red-900 text-red-300'
      case 'researching': return 'bg-yellow-900 text-yellow-300'
      case 'planning': return 'bg-purple-900 text-purple-300'
      default: return 'bg-dark-700 text-dark-300'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500'
      case 'medium': return 'text-yellow-500'
      case 'low': return 'text-green-500'
      default: return 'text-dark-400'
    }
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Home Button */}
      <HomeButton />
      
      {/* Header */}
      <header className="bg-dark-900 border-b border-dark-800 ml-16 lg:ml-80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold gradient-text">Funding Database</h1>
              <div className="flex items-center space-x-2">
                <MagnifyingGlassIcon className="h-5 w-5 text-accent-500" />
                <span className="text-sm text-dark-400">Grant Research & Applications</span>
              </div>
            </div>
            <button 
              onClick={() => setShowAddOpportunity(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <PlusIcon className="h-4 w-4" />
              <span>Add Opportunity</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 ml-16 lg:ml-80">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-400">Total Opportunities</p>
                <p className="text-2xl font-bold text-white">{fundingStats.totalOpportunities}</p>
                <p className="text-sm text-dark-400">Identified</p>
              </div>
              <MagnifyingGlassIcon className="h-8 w-8 text-accent-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-400">Applications</p>
                <p className="text-2xl font-bold text-white">{fundingStats.applied}</p>
                <p className="text-sm text-blue-500">Submitted</p>
              </div>
              <DocumentTextIcon className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-400">Success Rate</p>
                <p className="text-2xl font-bold text-white">{((fundingStats.approved / fundingStats.applied) * 100).toFixed(0)}%</p>
                <p className="text-sm text-green-500">Approved</p>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-400">Potential Funding</p>
                <p className="text-2xl font-bold text-white">${(fundingStats.totalPotential / 1000).toFixed(0)}k</p>
                <p className="text-sm text-dark-400">Total value</p>
              </div>
              <CurrencyDollarIcon className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-dark-800 rounded-lg p-1 mb-8">
          <button
            onClick={() => setActiveTab('opportunities')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'opportunities'
                ? 'bg-accent-600 text-white'
                : 'text-dark-300 hover:text-white'
            }`}
          >
            Opportunities
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'applications'
                ? 'bg-accent-600 text-white'
                : 'text-dark-300 hover:text-white'
            }`}
          >
            Applications
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'insights'
                ? 'bg-accent-600 text-white'
                : 'text-dark-300 hover:text-white'
            }`}
          >
            AI Insights
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-400" />
            <input
              type="text"
              placeholder="Search opportunities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field w-full pl-10"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="input-field md:w-48"
          >
            <option value="all">All Categories</option>
            <option value="Federal Grant">Federal Grant</option>
            <option value="Foundation Grant">Foundation Grant</option>
            <option value="Crowdfunding">Crowdfunding</option>
            <option value="Award">Award</option>
            <option value="Partnership">Partnership</option>
          </select>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'opportunities' && (
          <div className="space-y-6">
            {filteredOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="card">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{opportunity.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(opportunity.status)}`}>
                        {opportunity.status}
                      </span>
                      <div className="flex items-center space-x-1">
                        <StarIcon className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-dark-400">{opportunity.match}% match</span>
                      </div>
                    </div>
                    <p className="text-dark-300 mb-3">{opportunity.description}</p>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center space-x-1">
                        <CurrencyDollarIcon className="h-4 w-4 text-green-500" />
                        <span className="text-white">${opportunity.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="h-4 w-4 text-red-500" />
                        <span className="text-dark-400">Deadline: {opportunity.deadline}</span>
                      </div>
                      <span className="text-dark-400">{opportunity.category}</span>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm text-dark-400 mb-2">Requirements:</p>
                      <div className="flex flex-wrap gap-2">
                        {opportunity.requirements.map((req, index) => (
                          <span key={index} className="text-xs bg-dark-800 text-dark-300 px-2 py-1 rounded">
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="ml-6">
                    {!opportunity.applied ? (
                      <button className="btn-primary">
                        Apply Now
                      </button>
                    ) : (
                      <button className="btn-secondary">
                        View Application
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Application Status</h3>
            <div className="space-y-4">
              {applicationStatuses.map((application) => (
                <div key={application.id} className="flex items-center space-x-4 p-4 bg-dark-800 rounded-lg">
                  <div className="flex-shrink-0">
                    {application.status === 'approved' && (
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    )}
                    {application.status === 'submitted' && (
                      <ClockIcon className="h-5 w-5 text-blue-500" />
                    )}
                    {application.status === 'rejected' && (
                      <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">{application.name}</span>
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </div>
                    <p className="text-dark-300 text-sm">Submitted: {application.date}</p>
                    <p className="text-dark-400 text-sm">Next: {application.nextStep}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-6">
            {aiInsights.map((insight) => (
              <div key={insight.id} className="card">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <ExclamationTriangleIcon className={`h-6 w-6 ${getPriorityColor(insight.priority)}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-white font-medium">{insight.title}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        insight.priority === 'high' ? 'bg-red-900 text-red-300' :
                        insight.priority === 'medium' ? 'bg-yellow-900 text-yellow-300' :
                        'bg-green-900 text-green-300'
                      }`}>
                        {insight.priority} priority
                      </span>
                    </div>
                    <p className="text-dark-300 mb-3">{insight.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      {insight.potentialAmount > 0 && (
                        <div className="flex items-center space-x-1">
                          <CurrencyDollarIcon className="h-4 w-4 text-green-500" />
                          <span className="text-white">${insight.potentialAmount.toLocaleString()}</span>
                        </div>
                      )}
                      {insight.deadline && (
                        <div className="flex items-center space-x-1">
                          <CalendarIcon className="h-4 w-4 text-red-500" />
                          <span className="text-dark-400">Deadline: {insight.deadline}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button className="btn-primary">
                    Take Action
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add Opportunity Modal */}
      {showAddOpportunity && (
        <div className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-dark-900 border border-dark-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">Add Funding Opportunity</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Opportunity Name
                </label>
                <input 
                  type="text" 
                  className="input-field w-full"
                  placeholder="Enter opportunity name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Amount
                </label>
                <input 
                  type="number" 
                  className="input-field w-full"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Category
                </label>
                <select className="input-field w-full">
                  <option>Federal Grant</option>
                  <option>Foundation Grant</option>
                  <option>Crowdfunding</option>
                  <option>Award</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Deadline
                </label>
                <input 
                  type="date" 
                  className="input-field w-full"
                />
              </div>
              <div className="flex space-x-3">
                <button 
                  type="button"
                  onClick={() => setShowAddOpportunity(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="btn-primary flex-1"
                >
                  Add Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
