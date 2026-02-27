'use client'

import { useState, useEffect } from 'react'
import { getOnboardingData } from '@/lib/storage'
import HomeButton from '@/components/HomeButton'
import Sidebar from '@/components/Sidebar'
import { ChartBarIcon, CurrencyDollarIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface BudgetCategory {
  id: string
  name: string
  allocated: number
  spent: number
  remaining: number
  percentage: number
}

export default function BudgetPage() {
  const [activeTab, setActiveTab] = useState('budget')
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([])
  const [onboardingData, setOnboardingData] = useState<any>(null)
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  useEffect(() => {
    const onboarding = getOnboardingData()
    setOnboardingData(onboarding)
    generateSampleBudget()
  }, [])

  const generateSampleBudget = () => {
    const categories: BudgetCategory[] = [
      {
        id: 'cat_1',
        name: 'Operations',
        allocated: 15000,
        spent: 12500,
        remaining: 2500,
        percentage: 83.3
      },
      {
        id: 'cat_2',
        name: 'Marketing',
        allocated: 8000,
        spent: 6200,
        remaining: 1800,
        percentage: 77.5
      },
      {
        id: 'cat_3',
        name: 'Salaries',
        allocated: 35000,
        spent: 35000,
        remaining: 0,
        percentage: 100
      },
      {
        id: 'cat_4',
        name: 'Technology',
        allocated: 5000,
        spent: 3800,
        remaining: 1200,
        percentage: 76
      },
      {
        id: 'cat_5',
        name: 'Office & Supplies',
        allocated: 3000,
        spent: 2100,
        remaining: 900,
        percentage: 70
      },
      {
        id: 'cat_6',
        name: 'Professional Services',
        allocated: 4000,
        spent: 4500,
        remaining: -500,
        percentage: 112.5
      }
    ]
    setBudgetCategories(categories)
  }

  const handleTabChange = (tab: string) => {
    if (tab === 'budget') {
      return
    }
    window.location.href = `/${tab === 'dashboard' ? 'dashboard' : tab}`
  }

  const totalAllocated = budgetCategories.reduce((sum, cat) => sum + cat.allocated, 0)
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0)
  const totalRemaining = totalAllocated - totalSpent
  const overallPercentage = (totalSpent / totalAllocated) * 100
  const overBudgetCategories = budgetCategories.filter(cat => cat.percentage > 100)
  const criticalCategories = budgetCategories.filter(cat => cat.percentage > 90 && cat.percentage <= 100)

  const getProgressColor = (percentage: number) => {
    if (percentage > 100) return 'bg-red-500'
    if (percentage > 90) return 'bg-yellow-500'
    if (percentage > 75) return 'bg-blue-500'
    return 'bg-green-500'
  }

  return (
    <div className="flex h-screen bg-black">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-black border-b border-gray-800">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Budget Management</h1>
                <p className="mt-1 text-gray-400">Track spending and optimize resource allocation</p>
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white"
                >
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
                <HomeButton />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-black">
          <div className="px-8 py-6 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Allocated</p>
                    <p className="text-2xl font-bold text-white mt-1">${totalAllocated.toLocaleString()}</p>
                  </div>
                  <CurrencyDollarIcon className="h-8 w-8 text-blue-400" />
                </div>
                <p className="text-gray-400 text-sm mt-2">Monthly budget</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Spent</p>
                    <p className="text-2xl font-bold text-white mt-1">${totalSpent.toLocaleString()}</p>
                  </div>
                  <ArrowTrendingDownIcon className="h-8 w-8 text-red-400" />
                </div>
                <p className="text-red-400 text-sm mt-2">{overallPercentage.toFixed(1)}% of budget</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Remaining</p>
                    <p className="text-2xl font-bold text-white mt-1">${totalRemaining.toLocaleString()}</p>
                  </div>
                  <ArrowTrendingUpIcon className="h-8 w-8 text-green-400" />
                </div>
                <p className="text-green-400 text-sm mt-2">{(100 - overallPercentage).toFixed(1)}% available</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Alerts</p>
                    <p className="text-2xl font-bold text-white mt-1">{overBudgetCategories.length + criticalCategories.length}</p>
                  </div>
                  <ExclamationTriangleIcon className="h-8 w-8 text-yellow-400" />
                </div>
                <p className="text-yellow-400 text-sm mt-2">Categories need attention</p>
              </div>
            </div>

            {/* Alerts Section */}
            {(overBudgetCategories.length > 0 || criticalCategories.length > 0) && (
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Budget Alerts</h2>
                <div className="space-y-3">
                  {overBudgetCategories.map(cat => (
                    <div key={cat.id} className="flex items-center gap-3 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                      <ExclamationTriangleIcon className="h-5 w-5 text-red-400 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-white font-medium">{cat.name}</p>
                        <p className="text-sm text-red-400">Over budget by ${Math.abs(cat.remaining).toLocaleString()} ({cat.percentage.toFixed(1)}%)</p>
                      </div>
                    </div>
                  ))}
                  {criticalCategories.map(cat => (
                    <div key={cat.id} className="flex items-center gap-3 p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                      <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-white font-medium">{cat.name}</p>
                        <p className="text-sm text-yellow-400">Nearing budget limit: ${cat.remaining.toLocaleString()} remaining ({cat.percentage.toFixed(1)}%)</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Budget Categories */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-6">Budget by Category</h2>
              <div className="space-y-6">
                {budgetCategories.map((category) => (
                  <div key={category.id}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <ChartBarIcon className="h-5 w-5 text-gray-400" />
                        <span className="text-white font-medium">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">
                          ${category.spent.toLocaleString()} / ${category.allocated.toLocaleString()}
                        </p>
                        <p className={`text-sm ${
                          category.percentage > 100 ? 'text-red-400' :
                          category.percentage > 90 ? 'text-yellow-400' :
                          'text-gray-400'
                        }`}>
                          {category.percentage.toFixed(1)}% used
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${getProgressColor(category.percentage)}`}
                        style={{ width: `${Math.min(category.percentage, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className={`text-sm ${
                        category.remaining < 0 ? 'text-red-400' :
                        category.percentage > 90 ? 'text-yellow-400' :
                        'text-green-400'
                      }`}>
                        {category.remaining < 0 ? 'Over' : 'Remaining'}: ${Math.abs(category.remaining).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget Breakdown Table */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white">Detailed Breakdown</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Allocated</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Spent</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Remaining</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">% Used</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {budgetCategories.map((category) => (
                      <tr key={category.id} className="hover:bg-gray-800/30">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{category.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">${category.allocated.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-semibold">${category.spent.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={category.remaining < 0 ? 'text-red-400' : 'text-green-400'}>
                            ${Math.abs(category.remaining).toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{category.percentage.toFixed(1)}%</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            category.percentage > 100 ? 'text-red-400 bg-red-900/20' :
                            category.percentage > 90 ? 'text-yellow-400 bg-yellow-900/20' :
                            category.percentage > 75 ? 'text-blue-400 bg-blue-900/20' :
                            'text-green-400 bg-green-900/20'
                          }`}>
                            {category.percentage > 100 ? 'Over Budget' :
                             category.percentage > 90 ? 'Critical' :
                             category.percentage > 75 ? 'On Track' :
                             'Healthy'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
