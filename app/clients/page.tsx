'use client'

import { useState, useEffect } from 'react'
import { getContacts, getOnboardingData } from '@/lib/storage'
import HomeButton from '@/components/HomeButton'
import Sidebar from '@/components/Sidebar'
import { UserGroupIcon, BuildingOfficeIcon, EnvelopeIcon, PhoneIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline'

interface Client {
  id: string
  name: string
  email: string
  phone: string
  company: string
  status: 'active' | 'inactive' | 'pending'
  projectCount: number
  totalRevenue: number
  lastContact: string
  nextMeeting?: string
}

export default function ClientsPage() {
  const [activeTab, setActiveTab] = useState('clients')
  const [clients, setClients] = useState<Client[]>([])
  const [onboardingData, setOnboardingData] = useState<any>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const contacts = getContacts()
    const onboarding = getOnboardingData()
    setOnboardingData(onboarding)
    generateClientData(contacts)
  }, [])

  const generateClientData = (contacts: any[]) => {
    const sampleClients: Client[] = [
      {
        id: 'client_1',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@techstart.com',
        phone: '+1 (555) 123-4567',
        company: 'TechStart Inc.',
        status: 'active',
        projectCount: 3,
        totalRevenue: 125000,
        lastContact: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        nextMeeting: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'client_2',
        name: 'Michael Chen',
        email: 'mchen@healthcare.com',
        phone: '+1 (555) 234-5678',
        company: 'HealthCare Solutions',
        status: 'active',
        projectCount: 2,
        totalRevenue: 85000,
        lastContact: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        nextMeeting: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'client_3',
        name: 'Emily Rodriguez',
        email: 'emily.r@ecommerceplus.com',
        phone: '+1 (555) 345-6789',
        company: 'E-Commerce Plus',
        status: 'pending',
        projectCount: 1,
        totalRevenue: 45000,
        lastContact: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'client_4',
        name: 'David Williams',
        email: 'dwilliams@consulting.com',
        phone: '+1 (555) 456-7890',
        company: 'Strategic Consulting Group',
        status: 'active',
        projectCount: 4,
        totalRevenue: 180000,
        lastContact: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        nextMeeting: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'client_5',
        name: 'Lisa Anderson',
        email: 'landerson@financetech.com',
        phone: '+1 (555) 567-8901',
        company: 'FinanceTech Solutions',
        status: 'inactive',
        projectCount: 1,
        totalRevenue: 35000,
        lastContact: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
    setClients(sampleClients)
  }

  const handleTabChange = (tab: string) => {
    if (tab === 'clients') {
      return
    }
    window.location.href = `/${tab === 'dashboard' ? 'dashboard' : tab}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-900/20'
      case 'inactive': return 'text-gray-400 bg-gray-900/20'
      case 'pending': return 'text-yellow-400 bg-yellow-900/20'
      default: return 'text-gray-400 bg-gray-900/20'
    }
  }

  const filteredClients = clients.filter(client => {
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const activeClients = clients.filter(c => c.status === 'active').length
  const totalRevenue = clients.reduce((sum, c) => sum + c.totalRevenue, 0)
  const totalProjects = clients.reduce((sum, c) => sum + c.projectCount, 0)
  const avgRevenuePerClient = clients.length > 0 ? totalRevenue / clients.length : 0

  return (
    <div className="flex h-screen bg-black">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-black border-b border-gray-800">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Client Management</h1>
                <p className="mt-1 text-gray-400">Manage relationships and track client engagement</p>
              </div>
              <HomeButton />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-black">
          <div className="px-8 py-6 space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Clients</p>
                    <p className="text-2xl font-bold text-white mt-1">{clients.length}</p>
                  </div>
                  <UserGroupIcon className="h-8 w-8 text-blue-400" />
                </div>
                <p className="text-blue-400 text-sm mt-2">{activeClients} active</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold text-white mt-1">${totalRevenue.toLocaleString()}</p>
                  </div>
                  <CheckCircleIcon className="h-8 w-8 text-green-400" />
                </div>
                <p className="text-green-400 text-sm mt-2">All time</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Active Projects</p>
                    <p className="text-2xl font-bold text-white mt-1">{totalProjects}</p>
                  </div>
                  <ClockIcon className="h-8 w-8 text-yellow-400" />
                </div>
                <p className="text-yellow-400 text-sm mt-2">In progress</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Avg Revenue</p>
                    <p className="text-2xl font-bold text-white mt-1">${avgRevenuePerClient.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                  </div>
                  <BuildingOfficeIcon className="h-8 w-8 text-purple-400" />
                </div>
                <p className="text-purple-400 text-sm mt-2">Per client</p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 flex-1 max-w-md"
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {/* Client Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClients.map((client) => (
                <div key={client.id} className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{client.name}</h3>
                        <p className="text-gray-400 text-sm">{client.company}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(client.status)}`}>
                      {client.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <EnvelopeIcon className="h-4 w-4" />
                      <span>{client.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <PhoneIcon className="h-4 w-4" />
                      <span>{client.phone}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-800 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Projects</span>
                      <span className="text-white font-semibold">{client.projectCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Total Revenue</span>
                      <span className="text-green-400 font-semibold">${client.totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Last Contact</span>
                      <span className="text-white">{new Date(client.lastContact).toLocaleDateString()}</span>
                    </div>
                    {client.nextMeeting && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Next Meeting</span>
                        <span className="text-blue-400">{new Date(client.nextMeeting).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                      Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
