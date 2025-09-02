'use client'

import { useState, useEffect } from 'react'
import { 
  PlusIcon, 
  UserIcon, 
  BuildingOfficeIcon, 
  CurrencyDollarIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { saveContact, getContacts, updateContact } from '@/lib/storage'
import URLContactImporter from '@/components/URLContactImporter'

interface Client {
  id: string
  name: string
  contactPerson?: string
  email: string
  phone?: string
  company?: string
  industry?: string
  projects: Project[]
  howMet?: string
  notes?: string
  followUpDate?: string
  relationshipType?: 'client' | 'collaborator' | 'vendor' | 'partner'
  profileUrl?: string
  createdAt: string
  updatedAt: string
}

interface Project {
  id: string
  name: string
  description: string
  projectType: string
  status: 'completed' | 'in-progress' | 'on-hold' | 'proposed'
  startDate: string
  completionDate?: string
  projectValue: number
  amountCollected: number
  paymentStatus: 'paid' | 'partial' | 'outstanding'
  paymentTerms: string
  notes?: string
}

export default function ClientManagement() {
  const [clients, setClients] = useState<Client[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    howMet: '',
    notes: ''
  })
  const [relationshipType, setRelationshipType] = useState<'collaborator' | 'vendor' | 'partner'>('collaborator')
  const [showImporter, setShowImporter] = useState(false)
  const [profileUrl, setProfileUrl] = useState('')
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    projectType: '',
    status: 'proposed' as Project['status'],
    startDate: '',
    completionDate: '',
    projectValue: '',
    amountCollected: '',
    paymentStatus: 'outstanding' as Project['paymentStatus'],
    paymentTerms: '',
    notes: ''
  })
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)

  useEffect(() => {
    loadClients()
  }, [])

  const loadClients = () => {
    const contacts = getContacts()
    // Show only collaborators/vendors/partners. Treat unknown as collaborator for backwards compatibility
    const filtered = contacts.filter(c => (c.relationshipType ?? 'collaborator') !== 'client')
    setClients(filtered as Client[])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() && !formData.email.trim()) {
      alert('Please provide at least a name or an email to add a contact.')
      return
    }
    
    const newClient: Client = {
      id: `contact_${Date.now()}`,
      name: formData.name || 'Unnamed Contact',
      contactPerson: formData.contactPerson || undefined,
      email: formData.email || '',
      phone: formData.phone || undefined,
      company: formData.company || undefined,
      industry: formData.industry || undefined,
      howMet: formData.howMet || undefined,
      notes: formData.notes || undefined,
      projects: [],
      relationshipType: editingClient?.relationshipType ?? relationshipType,
      profileUrl: profileUrl || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    if (editingClient) {
      const updatedClient = {
        ...editingClient,
        ...newClient,
        profileUrl: profileUrl || editingClient.profileUrl,
        updatedAt: new Date().toISOString()
      }
      updateContact(updatedClient)
      setEditingClient(null)
    } else {
      saveContact(newClient)
    }

    setFormData({
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      company: '',
      industry: '',
      howMet: '',
      notes: ''
    })
    setRelationshipType('collaborator')
    setShowAddForm(false)
    loadClients()
  }

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedClientId) return

    const newProject: Omit<Project, 'id'> = {
      name: projectForm.name,
      description: projectForm.description,
      projectType: projectForm.projectType,
      status: projectForm.status,
      startDate: projectForm.startDate,
      completionDate: projectForm.completionDate || undefined,
      projectValue: parseFloat(projectForm.projectValue),
      amountCollected: parseFloat(projectForm.amountCollected),
      paymentStatus: projectForm.paymentStatus,
      paymentTerms: projectForm.paymentTerms,
      notes: projectForm.notes || undefined
    }

    const client = clients.find(c => c.id === selectedClientId)
    if (client) {
      const updatedClient = {
        ...client,
        projects: [...client.projects, { ...newProject, id: Date.now().toString() }],
        updatedAt: new Date().toISOString()
      }
      updateContact(updatedClient)
      loadClients()
    }

    setProjectForm({
      name: '',
      description: '',
      projectType: '',
      status: 'proposed',
      startDate: '',
      completionDate: '',
      projectValue: '',
      amountCollected: '',
      paymentStatus: 'outstanding',
      paymentTerms: '',
      notes: ''
    })
    setShowProjectForm(false)
    setSelectedClientId(null)
  }

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />
      case 'in-progress':
        return <ClockIcon className="h-4 w-4 text-blue-500" />
      case 'on-hold':
        return <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500" />
      default:
        return <ClockIcon className="h-4 w-4 text-gray-500" />
    }
  }

  const getPaymentStatusColor = (status: Project['paymentStatus']) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-100'
      case 'partial':
        return 'text-yellow-600 bg-yellow-100'
      case 'outstanding':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const calculateTotalValue = (projects: Project[]) => {
    return projects.reduce((sum, project) => sum + project.projectValue, 0)
  }

  const calculateTotalCollected = (projects: Project[]) => {
    return projects.reduce((sum, project) => sum + project.amountCollected, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Collaborators & Vendors</h2>
          <p className="text-dark-300">Manage your collaborators, vendors, partners, and their project history</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add New Contact</span>
        </button>
        <button
          onClick={() => setShowImporter(true)}
          className="ml-3 bg-dark-700 hover:bg-dark-600 text-white px-4 py-2 rounded-lg border border-dark-600 transition-colors"
        >
          Import from URL
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-dark-800 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <UserIcon className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold text-white">{clients.length}</p>
              <p className="text-dark-300">Total Collaborators</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <BuildingOfficeIcon className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold text-white">
                {clients.reduce((sum, client) => sum + client.projects.length, 0)}
              </p>
              <p className="text-dark-300">Total Projects</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <CurrencyDollarIcon className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-2xl font-bold text-white">
                ${calculateTotalValue(clients.flatMap(c => c.projects)).toLocaleString()}
              </p>
              <p className="text-dark-300">Total Project Value</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <CheckCircleIcon className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold text-white">
                ${calculateTotalCollected(clients.flatMap(c => c.projects)).toLocaleString()}
              </p>
              <p className="text-dark-300">Total Collected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts List */}
      <div className="bg-dark-800 rounded-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Your Collaborators & Vendors</h3>
          {clients.length === 0 ? (
            <div className="text-center py-8">
              <UserIcon className="h-12 w-12 text-dark-400 mx-auto mb-4" />
              <p className="text-dark-300">No collaborators/vendors added yet. Add your first contact to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {clients.map((client) => (
                <div key={client.id} className="bg-dark-700 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        {client.profileUrl ? (
                          <a
                            href={client.profileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-semibold text-white hover:underline"
                            aria-label={`Open ${client.name} profile`}
                          >
                            {client.name}
                          </a>
                        ) : (
                          <h4 className="text-lg font-semibold text-white">{client.name}</h4>
                        )}
                        {client.industry && client.industry.trim() !== '' && (
                          <span className="text-xs px-2 py-1 rounded-full bg-accent-600/20 text-accent-300 border border-accent-600/30">
                            {client.industry}
                          </span>
                        )}
                        {(client.relationshipType || 'collaborator') && (
                          <span className="text-xs px-2 py-1 rounded-full bg-dark-600 text-dark-200 border border-dark-500 capitalize">
                            {client.relationshipType || 'collaborator'}
                          </span>
                        )}
                      </div>
                      {client.company && (
                        <p className="text-dark-300 text-sm">{client.company}</p>
                      )}
                      {client.contactPerson && (
                        <p className="text-dark-300 text-sm">Contact: {client.contactPerson}</p>
                      )}
                      <p className="text-dark-300 text-sm">{client.email}</p>
                      {client.phone && (
                        <p className="text-dark-300 text-sm">{client.phone}</p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedClientId(client.id)
                          setShowProjectForm(true)
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Add Project
                      </button>
                      <button
                        onClick={() => {
                          setEditingClient(client)
                          setFormData({
                            name: client.name,
                            contactPerson: client.contactPerson || '',
                            email: client.email,
                            phone: client.phone || '',
                            company: client.company || '',
                            industry: client.industry || '',
                            howMet: client.howMet || '',
                            notes: client.notes || ''
                          })
                          setRelationshipType((client.relationshipType as any) || 'collaborator')
                          setShowAddForm(true)
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </div>

                  {/* Projects Summary */}
                  {client.projects.length > 0 && (
                    <div className="mt-4">
                      <h5 className="text-white font-medium mb-2">Projects ({client.projects.length})</h5>
                      <div className="space-y-2">
                        {client.projects.map((project) => (
                          <div key={project.id} className="bg-dark-600 p-3 rounded">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  {getStatusIcon(project.status)}
                                  <span className="text-white font-medium">{project.name}</span>
                                  <span className={`px-2 py-1 rounded-full text-xs ${getPaymentStatusColor(project.paymentStatus)}`}>
                                    {project.paymentStatus}
                                  </span>
                                </div>
                                <p className="text-dark-300 text-sm mb-2">{project.description}</p>
                                <div className="flex items-center space-x-4 text-sm text-dark-300">
                                  <span>Value: ${project.projectValue.toLocaleString()}</span>
                                  <span>Collected: ${project.amountCollected.toLocaleString()}</span>
                                  <span>Status: {project.status}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Client Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-dark-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">
                  {editingClient ? 'Edit Contact' : 'Add New Contact'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingClient(null)
                    setFormData({
                      name: '',
                      contactPerson: '',
                      email: '',
                      phone: '',
                      company: '',
                      industry: '',
                      howMet: '',
                      notes: ''
                    })
                  }}
                  className="text-dark-300 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                     <label className="block text-white text-sm font-medium mb-2">
                       Role / Specialty
                     </label>
                     <input
                       type="text"
                       value={formData.industry}
                       onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                       placeholder="Designer, Developer, Vendor, etc."
                       className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                   </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Relationship Type
                    </label>
                    <select
                      value={relationshipType}
                      onChange={(e) => setRelationshipType(e.target.value as any)}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="collaborator">Collaborator</option>
                      <option value="vendor">Vendor</option>
                      <option value="partner">Partner</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    How You Met
                  </label>
                  <input
                    type="text"
                    value={formData.howMet}
                    onChange={(e) => setFormData({ ...formData, howMet: e.target.value })}
                    placeholder="Referral, cold outreach, networking event, etc."
                    className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Profile URL (optional)
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="url"
                      value={profileUrl}
                      onChange={(e) => setProfileUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/... or https://instagram.com/..."
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!profileUrl) return
                        setShowImporter(true)
                      }}
                      className="px-3 py-2 bg-dark-600 hover:bg-dark-500 text-white rounded-lg border border-dark-500"
                    >
                      Import
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false)
                      setEditingClient(null)
                    }}
                    className="px-4 py-2 text-dark-300 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    {editingClient 
                      ? 'Save Contact' 
                      : relationshipType === 'vendor' 
                        ? 'Add Vendor' 
                        : relationshipType === 'partner' 
                          ? 'Add Partner' 
                          : 'Add Collaborator'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* URL Importer Modal */}
      {showImporter && (
        <URLContactImporter
          initialUrl={profileUrl || undefined}
          onImport={(data: any) => {
            setFormData({
              name: data?.name || '',
              contactPerson: '',
              email: data?.email || '',
              phone: data?.phone || '',
              company: data?.company || '',
              industry: data?.industry || '',
              howMet: data?.source ? `Imported from ${data.source}` : 'Imported',
              notes: data?.profileUrl ? `Profile: ${data.profileUrl}` : (data?.bio || '')
            })
            setProfileUrl(data?.profileUrl || profileUrl)
            setRelationshipType('collaborator')
            setShowImporter(false)
            setShowAddForm(true)
          }}
          onClose={() => setShowImporter(false)}
        />
      )}

      {/* Add Project Modal */}
      {showProjectForm && selectedClientId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-dark-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Add New Project</h3>
                <button
                  onClick={() => {
                    setShowProjectForm(false)
                    setSelectedClientId(null)
                    setProjectForm({
                      name: '',
                      description: '',
                      projectType: '',
                      status: 'proposed',
                      startDate: '',
                      completionDate: '',
                      projectValue: '',
                      amountCollected: '',
                      paymentStatus: 'outstanding',
                      paymentTerms: '',
                      notes: ''
                    })
                  }}
                  className="text-dark-300 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={projectForm.name}
                      onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Project Type *
                    </label>
                    <input
                      type="text"
                      required
                      value={projectForm.projectType}
                      onChange={(e) => setProjectForm({ ...projectForm, projectType: e.target.value })}
                      placeholder="Consulting, Development, Design, etc."
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Status *
                    </label>
                    <select
                      required
                      value={projectForm.status}
                      onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value as Project['status'] })}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="proposed">Proposed</option>
                      <option value="in-progress">In Progress</option>
                      <option value="on-hold">On Hold</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={projectForm.startDate}
                      onChange={(e) => setProjectForm({ ...projectForm, startDate: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Completion Date
                    </label>
                    <input
                      type="date"
                      value={projectForm.completionDate}
                      onChange={(e) => setProjectForm({ ...projectForm, completionDate: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Project Value ($) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={projectForm.projectValue}
                      onChange={(e) => setProjectForm({ ...projectForm, projectValue: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Amount Collected ($) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={projectForm.amountCollected}
                      onChange={(e) => setProjectForm({ ...projectForm, amountCollected: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Payment Status *
                    </label>
                    <select
                      required
                      value={projectForm.paymentStatus}
                      onChange={(e) => setProjectForm({ ...projectForm, paymentStatus: e.target.value as Project['paymentStatus'] })}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="outstanding">Outstanding</option>
                      <option value="partial">Partial</option>
                      <option value="paid">Paid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Payment Terms
                    </label>
                    <input
                      type="text"
                      value={projectForm.paymentTerms}
                      onChange={(e) => setProjectForm({ ...projectForm, paymentTerms: e.target.value })}
                      placeholder="Net 30, 50% upfront, etc."
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Project Description *
                  </label>
                  <textarea
                    required
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Project Notes
                  </label>
                  <textarea
                    value={projectForm.notes}
                    onChange={(e) => setProjectForm({ ...projectForm, notes: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowProjectForm(false)
                      setSelectedClientId(null)
                    }}
                    className="px-4 py-2 text-dark-300 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Add Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
