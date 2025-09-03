'use client'

import { useState, useEffect, useMemo } from 'react'
import HomeButton from '@/components/HomeButton'
import Sidebar from '@/components/Sidebar'
import { 
  FolderIcon,
  PlusIcon,
  CalendarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  PhotoIcon
} from '@heroicons/react/24/outline'
import { getAllProjects, getContacts, addProjectToContact, type ClientProject } from '@/lib/storage'

const computeProjectStats = (projects: ClientProject[]) => {
  const total = projects.length
  const toNum = (n: any) => (typeof n === 'number' && !Number.isNaN(n) ? n : 0)
  const totalBudget = projects.reduce((sum, p) => sum + toNum(p.projectValue), 0)
  const totalSpent = projects.reduce((sum, p) => sum + toNum(p.amountCollected), 0)
  return {
    total,
    inProduction: projects.filter(p => p.status === 'in-progress').length,
    preProduction: projects.filter(p => p.status === 'proposed').length,
    postProduction: projects.filter(p => p.status === 'on-hold').length,
    completed: projects.filter(p => p.status === 'completed').length,
    totalBudget,
    totalSpent
  }
}

const resourceAllocation = [
  { name: 'Chad Neo', role: 'Director/Producer', projects: 3, hours: 40 },
  { name: 'Sarah Chen', role: 'Cinematographer', projects: 2, hours: 35 },
  { name: 'Mike Rodriguez', role: 'Editor', projects: 2, hours: 30 },
  { name: 'Alex Johnson', role: 'Production Assistant', projects: 1, hours: 20 },
  { name: 'Lisa Wang', role: 'Sound Designer', projects: 1, hours: 15 }
]

const upcomingMilestones = [
  { project: 'Project Alpha', milestone: 'Sound Design Complete', date: '2024-01-25', status: 'upcoming' },
  { project: 'Project Beta', milestone: 'Location Scouting Complete', date: '2024-01-30', status: 'upcoming' },
  { project: 'Project Gamma', milestone: 'Client Approval', date: '2024-02-15', status: 'upcoming' },
  { project: 'Project Alpha', milestone: 'Color Grading Complete', date: '2024-02-28', status: 'upcoming' }
]

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showAddProject, setShowAddProject] = useState(false)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [allProjects, setAllProjects] = useState<ClientProject[]>([])
  const [filterClientId, setFilterClientId] = useState<string>('all')
  const [addForm, setAddForm] = useState({
    clientId: '',
    name: '',
    description: '',
    projectType: '',
    status: 'proposed' as 'completed' | 'in-progress' | 'on-hold' | 'proposed',
    startDate: '',
    completionDate: '',
    projectValue: '',
    amountCollected: '',
    paymentStatus: 'outstanding' as 'paid' | 'partial' | 'outstanding',
    paymentTerms: ''
  })

  useEffect(() => {
    setAllProjects(getAllProjects())
  }, [])

  const contacts = getContacts()
  const visibleProjects = useMemo(() => {
    if (filterClientId === 'all') return allProjects
    return allProjects.filter(p => p.clientId === filterClientId)
  }, [allProjects, filterClientId])
  const projectStats = computeProjectStats(visibleProjects)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-production': return 'bg-green-900 text-green-300'
      case 'pre-production': return 'bg-yellow-900 text-yellow-300'
      case 'post-production': return 'bg-blue-900 text-blue-300'
      case 'completed': return 'bg-gray-900 text-gray-300'
      case 'on-hold': return 'bg-red-900 text-red-300'
      case 'completed': return 'bg-green-900 text-green-300'
      case 'in-progress': return 'bg-blue-900 text-blue-300'
      case 'pending': return 'bg-yellow-900 text-yellow-300'
      default: return 'bg-dark-700 text-dark-300'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 60) return 'bg-blue-500'
    if (progress >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
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
              <h1 className="text-2xl font-bold gradient-text">Project Manager</h1>
              <div className="flex items-center space-x-2">
                <FolderIcon className="h-5 w-5 text-accent-500" />
                <span className="text-sm text-dark-400">Workflow & Resources</span>
              </div>
            </div>
            <button 
              onClick={() => setShowAddProject(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <PlusIcon className="h-4 w-4" />
              <span>Add Project</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 ml-16 lg:ml-80">
        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-400">Total Projects</p>
                <p className="text-2xl font-bold text-white">{projectStats.total}</p>
                <p className="text-sm text-dark-400">Active</p>
              </div>
              <FolderIcon className="h-8 w-8 text-accent-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-400">Total Budget</p>
                <p className="text-2xl font-bold text-white">${(projectStats.totalBudget / 1000).toFixed(0)}k</p>
                <p className="text-sm text-dark-400">Allocated</p>
              </div>
              <CurrencyDollarIcon className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-400">Budget Used</p>
                <p className="text-2xl font-bold text-white">{((projectStats.totalSpent / projectStats.totalBudget) * 100).toFixed(0)}%</p>
                <p className="text-sm text-dark-400">${(projectStats.totalSpent / 1000).toFixed(0)}k spent</p>
              </div>
              <ChartBarIcon className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-400">Team Members</p>
                <p className="text-2xl font-bold text-white">{resourceAllocation.length}</p>
                <p className="text-sm text-dark-400">Active</p>
              </div>
              <UserGroupIcon className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-dark-800 rounded-lg p-1 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-accent-600 text-white'
                : 'text-dark-300 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'projects'
                ? 'bg-accent-600 text-white'
                : 'text-dark-300 hover:text-white'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'resources'
                ? 'bg-accent-600 text-white'
                : 'text-dark-300 hover:text-white'
            }`}
          >
            Resources
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'timeline'
                ? 'bg-accent-600 text-white'
                : 'text-dark-300 hover:text-white'
            }`}
          >
            Timeline
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Project Status Distribution */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Project Status Distribution</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-dark-800 rounded-lg">
                  <p className="text-2xl font-bold text-green-500">{projectStats.inProduction}</p>
                  <p className="text-dark-400 text-sm">In Production</p>
                </div>
                <div className="text-center p-4 bg-dark-800 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-500">{projectStats.preProduction}</p>
                  <p className="text-dark-400 text-sm">Pre-Production</p>
                </div>
                <div className="text-center p-4 bg-dark-800 rounded-lg">
                  <p className="text-2xl font-bold text-blue-500">{projectStats.postProduction}</p>
                  <p className="text-dark-400 text-sm">Post-Production</p>
                </div>
                <div className="text-center p-4 bg-dark-800 rounded-lg">
                  <p className="text-2xl font-bold text-gray-500">{projectStats.completed}</p>
                  <p className="text-dark-400 text-sm">Completed</p>
                </div>
              </div>
            </div>

            {/* Upcoming Milestones */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Upcoming Milestones</h3>
              <div className="space-y-4">
                {upcomingMilestones.map((milestone, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-dark-800 rounded-lg">
                    <div className="flex-shrink-0">
                      <CalendarIcon className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">{milestone.milestone}</span>
                        <span className="text-dark-400 text-sm">- {milestone.project}</span>
                      </div>
                      <p className="text-dark-400 text-sm">Due: {milestone.date}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(milestone.status)}`}>
                      {milestone.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            {visibleProjects.map((project) => (
              <div key={project.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(project.status)}`}>
                        {project.status.replace('-', ' ')}
                      </span>
                    </div>
                    <p className="text-dark-300 mb-3">{project.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-dark-400">Progress</span>
                        <span className="text-white">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-dark-800 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-dark-400">Budget:</span>
                        <span className="text-white ml-2">${project.budget.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-dark-400">Spent:</span>
                        <span className="text-white ml-2">${project.spent.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-dark-400">Start:</span>
                        <span className="text-white ml-2">{project.startDate}</span>
                      </div>
                      <div>
                        <span className="text-dark-400">End:</span>
                        <span className="text-white ml-2">{project.endDate}</span>
                      </div>
                    </div>

                    <div className="mt-4 text-sm text-dark-400">
                      <span className="mr-2">Client:</span>
                      <span className="text-white">{project.clientName}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                      className="btn-secondary text-sm"
                    >
                      {selectedProject === project.id ? 'Hide Tasks' : 'View Tasks'}
                    </button>
                  </div>
                </div>

                {/* Tasks (expandable) */}
                {selectedProject === project.id && (
                  <div className="mt-4 pt-4 border-t border-dark-800">
                    <h4 className="text-white font-medium mb-3">Meta</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-dark-400">Payment:</span>
                        <span className="text-white ml-2">{project.paymentStatus}</span>
                      </div>
                      {project.paymentTerms && (
                        <div>
                          <span className="text-dark-400">Terms:</span>
                          <span className="text-white ml-2">{project.paymentTerms}</span>
                        </div>
                      )}
                      {project.notes && (
                        <div className="md:col-span-2">
                          <span className="text-dark-400">Notes:</span>
                          <span className="text-white ml-2">{project.notes}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Resource Allocation</h3>
              <div className="space-y-4">
                {resourceAllocation.map((resource) => (
                  <div key={resource.name} className="flex items-center justify-between p-4 bg-dark-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-accent-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {resource.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{resource.name}</p>
                        <p className="text-dark-400 text-sm">{resource.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{resource.projects} projects</p>
                      <p className="text-dark-400 text-sm">{resource.hours}h/week</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Project Timeline</h3>
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.id} className="border-l-2 border-dark-700 pl-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-3 h-3 bg-accent-500 rounded-full"></div>
                    <h4 className="text-white font-medium">{project.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(project.status)}`}>
                      {project.status.replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-dark-400 text-sm mb-2">{project.startDate} - {project.endDate}</p>
                  <div className="w-full bg-dark-800 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Add Project Modal */}
      {showAddProject && (
        <div className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-dark-900 border border-dark-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">Add New Project</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (!addForm.clientId || !addForm.name) return
                const created = addProjectToContact(addForm.clientId, {
                  name: addForm.name,
                  description: addForm.description,
                  projectType: addForm.projectType,
                  status: addForm.status,
                  startDate: addForm.startDate,
                  completionDate: addForm.completionDate || undefined,
                  projectValue: parseFloat(addForm.projectValue || '0') || 0,
                  amountCollected: parseFloat(addForm.amountCollected || '0') || 0,
                  paymentStatus: addForm.paymentStatus,
                  paymentTerms: addForm.paymentTerms,
                  notes: undefined
                })
                if (created) {
                  setAllProjects(getAllProjects())
                  setShowAddProject(false)
                  setAddForm({
                    clientId: '', name: '', description: '', projectType: '', status: 'proposed', startDate: '', completionDate: '', projectValue: '', amountCollected: '', paymentStatus: 'outstanding', paymentTerms: ''
                  })
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Client
                </label>
                <select
                  value={addForm.clientId}
                  onChange={(e) => setAddForm({ ...addForm, clientId: e.target.value })}
                  className="input-field w-full"
                >
                  <option value="">Select client</option>
                  {contacts.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Project Name
                </label>
                <input
                  value={addForm.name}
                  onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                  type="text"
                  className="input-field w-full"
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Description
                </label>
                <textarea
                  value={addForm.description}
                  onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
                  className="input-field w-full h-20 resize-none"
                  placeholder="Enter project description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Budget
                  </label>
                  <input
                    value={addForm.projectValue}
                    onChange={(e) => setAddForm({ ...addForm, projectValue: e.target.value })}
                    type="number"
                    className="input-field w-full"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Status
                  </label>
                  <select
                    value={addForm.status}
                    onChange={(e) => setAddForm({ ...addForm, status: e.target.value as any })}
                    className="input-field w-full"
                  >
                    <option value="proposed">Proposed</option>
                    <option value="in-progress">In Progress</option>
                    <option value="on-hold">On Hold</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Start Date
                  </label>
                  <input
                    value={addForm.startDate}
                    onChange={(e) => setAddForm({ ...addForm, startDate: e.target.value })}
                    type="date"
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    End Date
                  </label>
                  <input
                    value={addForm.completionDate}
                    onChange={(e) => setAddForm({ ...addForm, completionDate: e.target.value })}
                    type="date"
                    className="input-field w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Amount Collected</label>
                  <input
                    value={addForm.amountCollected}
                    onChange={(e) => setAddForm({ ...addForm, amountCollected: e.target.value })}
                    type="number"
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Payment Status</label>
                  <select
                    value={addForm.paymentStatus}
                    onChange={(e) => setAddForm({ ...addForm, paymentStatus: e.target.value as any })}
                    className="input-field w-full"
                  >
                    <option value="outstanding">Outstanding</option>
                    <option value="partial">Partial</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Payment Terms</label>
                <input
                  value={addForm.paymentTerms}
                  onChange={(e) => setAddForm({ ...addForm, paymentTerms: e.target.value })}
                  className="input-field w-full"
                  placeholder="Net 30, 50% upfront, etc."
                />
              </div>
              <div className="flex space-x-3">
                <button 
                  type="button"
                  onClick={() => setShowAddProject(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="btn-primary flex-1"
                >
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
