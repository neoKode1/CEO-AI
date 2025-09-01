'use client'

import { useState, useEffect } from 'react'
import HomeButton from '@/components/HomeButton'
import Sidebar from '@/components/Sidebar'
import { 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  PlusIcon,
  ChartBarIcon,
  CalculatorIcon
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

// Mock budget data
const budgetData = {
  totalBudget: 15600,
  spent: 3744,
  remaining: 11856,
  monthlyBudget: 1300,
  monthlySpent: 312,
  monthlyRemaining: 988
}

const expenseCategories = [
  { name: 'AI CEO Technical Stack', budget: 1800, spent: 432, color: '#10b981' },
  { name: 'Marketing & Lead Generation', budget: 4680, spent: 1123, color: '#3b82f6' },
  { name: 'Production & Equipment', budget: 6240, spent: 1498, color: '#f59e0b' },
  { name: 'Legal & Professional', budget: 1560, spent: 374, color: '#ef4444' },
  { name: 'Reserve Fund', budget: 1320, spent: 317, color: '#8b5cf6' }
]

const monthlyExpenses = [
  { month: 'Jan', budget: 1300, actual: 1200, variance: 100 },
  { month: 'Feb', budget: 1300, actual: 1350, variance: -50 },
  { month: 'Mar', budget: 1300, actual: 1180, variance: 120 },
  { month: 'Apr', budget: 1300, actual: 1420, variance: -120 },
  { month: 'May', budget: 1300, actual: 1250, variance: 50 },
  { month: 'Jun', budget: 1300, actual: 1310, variance: -10 }
]

const recentTransactions = [
  {
    id: 1,
    description: 'Social Media Advertising',
    amount: 200,
    category: 'Marketing',
    date: '2024-01-15',
    status: 'approved',
    authority: 'Level 1'
  },
  {
    id: 2,
    description: 'Equipment Rental',
    amount: 450,
    category: 'Production',
    date: '2024-01-14',
    status: 'pending',
    authority: 'Level 2'
  },
  {
    id: 3,
    description: 'Legal Consultation',
    amount: 300,
    category: 'Legal',
    date: '2024-01-13',
    status: 'approved',
    authority: 'Level 2'
  },
  {
    id: 4,
    description: 'Software Subscription',
    amount: 150,
    category: 'Technical',
    date: '2024-01-12',
    status: 'completed',
    authority: 'Level 1'
  }
]

const aiRecommendations = [
  {
    id: 1,
    type: 'Cost Optimization',
    title: 'Vendor Negotiation Opportunity',
    description: 'Contact equipment suppliers for 15% bulk discount on rentals',
    potentialSavings: 675,
    priority: 'high',
    status: 'pending'
  },
  {
    id: 2,
    type: 'Budget Reallocation',
    title: 'Marketing Budget Increase',
    description: 'Increase social media budget by $200/month based on ROI analysis',
    potentialSavings: -200,
    priority: 'medium',
    status: 'approved'
  },
  {
    id: 3,
    type: 'Efficiency',
    title: 'Automation Implementation',
    description: 'Implement automated invoicing to reduce administrative costs',
    potentialSavings: 120,
    priority: 'low',
    status: 'pending'
  }
]

export default function BudgetPage() {
  const [activeTab, setActiveTab] = useState('budget')
  const [showAddExpense, setShowAddExpense] = useState(false)
  const [periodFilter, setPeriodFilter] = useState<string>('overview')

  useEffect(() => {
    // Check for period parameter in URL
    const urlParams = new URLSearchParams(window.location.search)
    const periodParam = urlParams.get('period')
    if (periodParam === 'last-week' || periodParam === 'next-week') {
      setPeriodFilter(periodParam)
    }
  }, [])

  const budgetUtilization = (budgetData.spent / budgetData.totalBudget) * 100
  const monthlyUtilization = (budgetData.monthlySpent / budgetData.monthlyBudget) * 100

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
              <h1 className="text-2xl font-bold gradient-text">Budget Manager</h1>
              <div className="flex items-center space-x-2">
                <CurrencyDollarIcon className="h-5 w-5 text-accent-500" />
                <span className="text-sm text-dark-400">Financial Oversight</span>
              </div>
            </div>
            <button 
              onClick={() => setShowAddExpense(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <PlusIcon className="h-4 w-4" />
              <span>Add Expense</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 ml-16 lg:ml-80">
        {/* Budget Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-400">Total Budget</p>
                <p className="text-2xl font-bold text-white">${budgetData.totalBudget.toLocaleString()}</p>
                <p className="text-sm text-dark-400">Annual allocation</p>
              </div>
              <CurrencyDollarIcon className="h-8 w-8 text-accent-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-400">Spent</p>
                <p className="text-2xl font-bold text-white">${budgetData.spent.toLocaleString()}</p>
                <p className="text-sm text-green-500">{budgetUtilization.toFixed(1)}% utilized</p>
              </div>
                              <ArrowTrendingUpIcon className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-400">Remaining</p>
                <p className="text-2xl font-bold text-white">${budgetData.remaining.toLocaleString()}</p>
                <p className="text-sm text-dark-400">Available funds</p>
              </div>
              <ChartBarIcon className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-400">Monthly Budget</p>
                <p className="text-2xl font-bold text-white">${budgetData.monthlyBudget.toLocaleString()}</p>
                <p className="text-sm text-yellow-500">{monthlyUtilization.toFixed(1)}% used</p>
              </div>
              <CalculatorIcon className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Budget vs Actual */}
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Monthly Budget vs Actual</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyExpenses}>
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
                <Bar dataKey="budget" fill="#3b82f6" opacity={0.7} />
                <Bar dataKey="actual" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Expense Categories */}
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Budget Allocation by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseCategories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, spent, budget }) => `${name} $${spent}/${budget}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="spent"
                >
                  {expenseCategories.map((entry, index) => (
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

        {/* AI Recommendations */}
        <div className="card mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">AI CEO Recommendations</h3>
          <div className="space-y-4">
            {aiRecommendations.map((recommendation) => (
              <div key={recommendation.id} className="flex items-center space-x-4 p-4 bg-dark-800 rounded-lg">
                <div className="flex-shrink-0">
                  {recommendation.priority === 'high' && (
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                  )}
                  {recommendation.priority === 'medium' && (
                    <ArrowTrendingUpIcon className="h-5 w-5 text-yellow-500" />
                  )}
                  {recommendation.priority === 'low' && (
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">{recommendation.title}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      recommendation.priority === 'high' ? 'bg-red-900 text-red-300' :
                      recommendation.priority === 'medium' ? 'bg-yellow-900 text-yellow-300' :
                      'bg-green-900 text-green-300'
                    }`}>
                      {recommendation.priority}
                    </span>
                    <span className="text-xs bg-dark-700 text-dark-300 px-2 py-1 rounded">
                      {recommendation.status}
                    </span>
                  </div>
                  <p className="text-dark-300 text-sm">{recommendation.description}</p>
                  <p className={`text-sm ${recommendation.potentialSavings > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    Potential {recommendation.potentialSavings > 0 ? 'savings' : 'cost'}: ${Math.abs(recommendation.potentialSavings)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-800">
                  <th className="text-left py-3 px-4 text-dark-400 font-medium">Description</th>
                  <th className="text-left py-3 px-4 text-dark-400 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 text-dark-400 font-medium">Category</th>
                  <th className="text-left py-3 px-4 text-dark-400 font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-dark-400 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-dark-400 font-medium">Authority</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-dark-800">
                    <td className="py-3 px-4 text-white">{transaction.description}</td>
                    <td className="py-3 px-4 text-white">${transaction.amount}</td>
                    <td className="py-3 px-4 text-dark-300">{transaction.category}</td>
                    <td className="py-3 px-4 text-dark-300">{transaction.date}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded ${
                        transaction.status === 'approved' ? 'bg-green-900 text-green-300' :
                        transaction.status === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                        'bg-blue-900 text-blue-300'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-dark-300">{transaction.authority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Expense Modal */}
      {showAddExpense && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-dark-900 border border-dark-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">Add New Expense</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Description
                </label>
                <input 
                  type="text" 
                  className="input-field w-full"
                  placeholder="Enter expense description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Amount
                </label>
                <input 
                  type="number" 
                  className="input-field w-full"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Category
                </label>
                <select className="input-field w-full">
                  <option>Marketing & Lead Generation</option>
                  <option>Production & Equipment</option>
                  <option>AI CEO Technical Stack</option>
                  <option>Legal & Professional</option>
                  <option>Reserve Fund</option>
                </select>
              </div>
              <div className="flex space-x-3">
                <button 
                  type="button"
                  onClick={() => setShowAddExpense(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="btn-primary flex-1"
                >
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
