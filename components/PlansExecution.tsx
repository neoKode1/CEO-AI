'use client'

import { useState, useEffect } from 'react'
import { BusinessPlan, getBusinessPlans, saveBusinessPlan } from '@/lib/storage'
import {
  PlusIcon,
  DocumentTextIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  PauseIcon,
  PlayIcon
} from '@heroicons/react/24/outline'

export default function PlansExecution() {
  const [plans, setPlans] = useState<BusinessPlan[]>([])
  const [showNewPlanForm, setShowNewPlanForm] = useState(false)
  const [newPlan, setNewPlan] = useState<Partial<BusinessPlan>>({
    title: '',
    description: '',
    type: 'strategic',
    status: 'draft',
    startDate: '',
    endDate: '',
    goals: [],
    milestones: [],
    budget: {
      allocated: 0,
      spent: 0,
      currency: 'USD'
    }
  })

  useEffect(() => {
    const existingPlans = getBusinessPlans()
    setPlans(existingPlans)
  }, [])

  const handleCreatePlan = () => {
    if (newPlan.title && newPlan.description) {
      saveBusinessPlan(newPlan as Omit<BusinessPlan, 'id' | 'createdAt' | 'updatedAt'>)
      setPlans(getBusinessPlans())
      setNewPlan({
        title: '',
        description: '',
        type: 'strategic',
        status: 'draft',
        startDate: '',
        endDate: '',
        goals: [],
        milestones: [],
        budget: {
          allocated: 0,
          spent: 0,
          currency: 'USD'
        }
      })
      setShowNewPlanForm(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <PlayIcon className="h-5 w-5 text-green-500" />
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-blue-500" />
      case 'paused':
        return <PauseIcon className="h-5 w-5 text-yellow-500" />
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-400 border-green-500/20'
      case 'completed':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'paused':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Plans & Execution</h2>
          <p className="text-dark-300">Manage your strategic and operational plans</p>
        </div>
        <button
          onClick={() => setShowNewPlanForm(true)}
          className="px-4 py-2 bg-accent-500 hover:bg-accent-400 text-white rounded-lg flex items-center space-x-2 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>New Plan</span>
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <DocumentTextIcon className="h-5 w-5 text-accent-500" />
                <span className="text-xs bg-dark-700 text-dark-300 px-2 py-1 rounded">
                  {plan.type}
                </span>
              </div>
              {getStatusIcon(plan.status)}
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-2">{plan.title}</h3>
            <p className="text-dark-300 text-sm mb-4">{plan.description}</p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-dark-400">
                <CalendarIcon className="h-4 w-4" />
                <span>{new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-dark-400">
                <CurrencyDollarIcon className="h-4 w-4" />
                <span>${plan.budget.spent.toLocaleString()} / ${plan.budget.allocated.toLocaleString()}</span>
              </div>
              
              <div className="w-full bg-dark-800 rounded-full h-2">
                <div
                  className="bg-accent-500 h-2 rounded-full"
                  style={{ width: `${Math.min((plan.budget.spent / plan.budget.allocated) * 100, 100)}%` }}
                ></div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(plan.status)}`}>
                  {plan.status}
                </span>
                <span className="text-xs text-dark-400">
                  {plan.milestones.length} milestones
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {plans.length === 0 && (
        <div className="text-center py-12">
          <DocumentTextIcon className="h-16 w-16 text-dark-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No plans yet</h3>
          <p className="text-dark-400 mb-6">Create your first business plan to get started</p>
          <button
            onClick={() => setShowNewPlanForm(true)}
            className="px-6 py-3 bg-accent-500 hover:bg-accent-400 text-white rounded-lg flex items-center space-x-2 mx-auto transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Create First Plan</span>
          </button>
        </div>
      )}

      {/* New Plan Modal */}
      {showNewPlanForm && (
        <div className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-dark-900 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-6">Create New Plan</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">Plan Title</label>
                  <input
                    type="text"
                    value={newPlan.title}
                    onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
                    className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:border-accent-500 focus:outline-none"
                    placeholder="Enter plan title"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Description</label>
                  <textarea
                    value={newPlan.description}
                    onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                    className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:border-accent-500 focus:outline-none"
                    placeholder="Describe your plan"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Plan Type</label>
                    <select
                      value={newPlan.type}
                      onChange={(e) => setNewPlan({ ...newPlan, type: e.target.value as any })}
                      className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:border-accent-500 focus:outline-none"
                    >
                      <option value="strategic">Strategic</option>
                      <option value="operational">Operational</option>
                      <option value="financial">Financial</option>
                      <option value="marketing">Marketing</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Status</label>
                    <select
                      value={newPlan.status}
                      onChange={(e) => setNewPlan({ ...newPlan, status: e.target.value as any })}
                      className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:border-accent-500 focus:outline-none"
                    >
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                      <option value="paused">Paused</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Start Date</label>
                    <input
                      type="date"
                      value={newPlan.startDate}
                      onChange={(e) => setNewPlan({ ...newPlan, startDate: e.target.value })}
                      className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:border-accent-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">End Date</label>
                    <input
                      type="date"
                      value={newPlan.endDate}
                      onChange={(e) => setNewPlan({ ...newPlan, endDate: e.target.value })}
                      className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:border-accent-500 focus:outline-none"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Budget Allocation</label>
                  <input
                    type="number"
                    value={newPlan.budget?.allocated || 0}
                    onChange={(e) => setNewPlan({ 
                      ...newPlan, 
                      budget: { 
                        ...newPlan.budget!, 
                        allocated: parseFloat(e.target.value) || 0 
                      } 
                    })}
                    className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:border-accent-500 focus:outline-none"
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowNewPlanForm(false)}
                  className="px-6 py-3 border border-dark-600 text-white rounded-lg hover:border-dark-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePlan}
                  className="px-6 py-3 bg-accent-500 hover:bg-accent-400 text-white rounded-lg transition-colors"
                >
                  Create Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
