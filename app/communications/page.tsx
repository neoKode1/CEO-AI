'use client'

import { useState, useEffect } from 'react'
import HomeButton from '@/components/HomeButton'
import Sidebar from '@/components/Sidebar'
import { 
  ChatBubbleLeftRightIcon,
  PlusIcon,
  PaperAirplaneIcon,
  EnvelopeIcon,
  PhoneIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  MegaphoneIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'

// Mock communication data
const recentCommunications = [
  {
    id: 1,
    type: 'email',
    recipient: 'Sundance Institute',
    subject: 'Documentary Fund Application Follow-up',
    status: 'sent',
    timestamp: '2024-01-15 14:30',
    priority: 'high',
    content: 'Following up on our application for the Documentary Fund...'
  },
  {
    id: 2,
    type: 'meeting',
    recipient: 'Tech Startup Client',
    subject: 'Project Gamma Review Meeting',
    status: 'scheduled',
    timestamp: '2024-01-20 10:00',
    priority: 'medium',
    content: 'Scheduled client review meeting for Project Gamma commercial...'
  },
  {
    id: 3,
    type: 'phone',
    recipient: 'Equipment Supplier',
    subject: 'Bulk Discount Negotiation',
    status: 'completed',
    timestamp: '2024-01-14 16:45',
    priority: 'high',
    content: 'Discussed bulk discount options for equipment rentals...'
  },
  {
    id: 4,
    type: 'email',
    recipient: 'Potential Investor',
    subject: 'Investment Opportunity Presentation',
    status: 'draft',
    timestamp: '2024-01-16 09:15',
    priority: 'high',
    content: 'Preparing investment presentation for potential funding...'
  }
]

const clientCommunications = [
  {
    id: 1,
    client: 'Tech Startup',
    project: 'Project Gamma',
    lastContact: '2024-01-15',
    nextFollowUp: '2024-01-22',
    status: 'active',
    priority: 'high'
  },
  {
    id: 2,
    client: 'Local Arts Council',
    project: 'Grant Application',
    lastContact: '2024-01-10',
    nextFollowUp: '2024-01-25',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: 3,
    client: 'Independent Film Fund',
    project: 'Documentary Funding',
    lastContact: '2024-01-05',
    nextFollowUp: '2024-01-30',
    status: 'completed',
    priority: 'low'
  }
]

const aiGeneratedMessages = [
  {
    id: 1,
    type: 'follow-up',
    recipient: 'Sundance Institute',
    subject: 'Application Status Inquiry',
    content: 'Dear Sundance Institute Team, I hope this email finds you well. I am writing to follow up on our recent application for the Documentary Fund...',
    tone: 'professional',
    status: 'ready'
  },
  {
    id: 2,
    type: 'proposal',
    recipient: 'Potential Client',
    subject: 'Project Proposal - AI Documentary',
    content: 'Thank you for your interest in our innovative approach to documentary filmmaking. We are excited to present our proposal for...',
    tone: 'enthusiastic',
    status: 'draft'
  },
  {
    id: 3,
    type: 'update',
    recipient: 'Project Alpha Team',
    subject: 'Weekly Progress Update',
    content: 'Team, here\'s our weekly progress update for Project Alpha. We\'ve made significant progress on the post-production phase...',
    tone: 'informal',
    status: 'ready'
  }
]

const communicationStats = {
  total: 24,
  sent: 18,
  pending: 4,
  scheduled: 2,
  responseRate: 85
}

const templates = [
  {
    id: 1,
    name: 'Grant Application Follow-up',
    category: 'funding',
    content: 'Dear [Organization], I hope this email finds you well. I am writing to follow up on our recent application...'
  },
  {
    id: 2,
    name: 'Client Project Update',
    category: 'client',
    content: 'Hi [Client Name], I wanted to provide you with an update on [Project Name]. We have made excellent progress...'
  },
  {
    id: 3,
    name: 'Team Meeting Invitation',
    category: 'internal',
    content: 'Team, I\'d like to schedule a meeting to discuss [Topic]. Please let me know your availability...'
  }
]

export default function CommunicationsPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showNewMessage, setShowNewMessage] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-900 text-green-300'
      case 'scheduled': return 'bg-blue-900 text-blue-300'
      case 'draft': return 'bg-yellow-900 text-yellow-300'
      case 'pending': return 'bg-orange-900 text-orange-300'
      case 'completed': return 'bg-gray-900 text-gray-300'
      case 'active': return 'bg-green-900 text-green-300'
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <EnvelopeIcon className="h-5 w-5 text-blue-500" />
      case 'phone': return <PhoneIcon className="h-5 w-5 text-green-500" />
      case 'meeting': return <VideoCameraIcon className="h-5 w-5 text-purple-500" />
      case 'follow-up': return <ClockIcon className="h-5 w-5 text-yellow-500" />
      case 'proposal': return <DocumentTextIcon className="h-5 w-5 text-red-500" />
      case 'update': return <MegaphoneIcon className="h-5 w-5 text-accent-500" />
      default: return <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-500" />
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
              <h1 className="text-2xl font-bold gradient-text">Communications</h1>
              <div className="flex items-center space-x-2">
                <ChatBubbleLeftRightIcon className="h-5 w-5 text-accent-500" />
                <span className="text-sm text-dark-400">Internal & External Messaging</span>
              </div>
            </div>
            <button 
              onClick={() => setShowNewMessage(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <PlusIcon className="h-4 w-4" />
              <span>New Message</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 ml-16 lg:ml-80">
        {/* Communication Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-400">Total Communications</p>
                <p className="text-2xl font-bold text-white">{communicationStats.total}</p>
                <p className="text-sm text-dark-400">This month</p>
              </div>
              <ChatBubbleLeftRightIcon className="h-8 w-8 text-accent-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-400">Response Rate</p>
                <p className="text-2xl font-bold text-white">{communicationStats.responseRate}%</p>
                <p className="text-sm text-green-500">Excellent</p>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-400">Pending</p>
                <p className="text-2xl font-bold text-white">{communicationStats.pending}</p>
                <p className="text-sm text-yellow-500">Requires attention</p>
              </div>
              <ClockIcon className="h-8 w-8 text-yellow-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-400">Scheduled</p>
                <p className="text-2xl font-bold text-white">{communicationStats.scheduled}</p>
                <p className="text-sm text-blue-500">Upcoming</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-blue-500" />
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
            onClick={() => setActiveTab('recent')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'recent'
                ? 'bg-accent-600 text-white'
                : 'text-dark-300 hover:text-white'
            }`}
          >
            Recent
          </button>
          <button
            onClick={() => setActiveTab('clients')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'clients'
                ? 'bg-accent-600 text-white'
                : 'text-dark-300 hover:text-white'
            }`}
          >
            Clients
          </button>
          <button
            onClick={() => setActiveTab('ai-messages')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'ai-messages'
                ? 'bg-accent-600 text-white'
                : 'text-dark-300 hover:text-white'
            }`}
          >
            AI Messages
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Communication Activity */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Communication Activity</h3>
              <div className="space-y-4">
                {recentCommunications.slice(0, 3).map((comm) => (
                  <div key={comm.id} className="flex items-center space-x-4 p-4 bg-dark-800 rounded-lg">
                    <div className="flex-shrink-0">
                      {getTypeIcon(comm.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">{comm.subject}</span>
                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(comm.status)}`}>
                          {comm.status}
                        </span>
                        <span className={`text-xs ${getPriorityColor(comm.priority)}`}>
                          {comm.priority} priority
                        </span>
                      </div>
                      <p className="text-dark-300 text-sm">{comm.recipient}</p>
                      <p className="text-dark-400 text-xs">{comm.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Communication Templates */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <div key={template.id} className="p-4 bg-dark-800 rounded-lg">
                    <h4 className="text-white font-medium mb-2">{template.name}</h4>
                    <p className="text-dark-400 text-sm mb-3">{template.content.substring(0, 100)}...</p>
                    <button className="btn-primary text-sm w-full">Use Template</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recent' && (
          <div className="space-y-6">
            {recentCommunications.map((comm) => (
              <div key={comm.id} className="card">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    {getTypeIcon(comm.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-white font-medium">{comm.subject}</h4>
                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(comm.status)}`}>
                          {comm.status}
                        </span>
                        <span className={`text-xs ${getPriorityColor(comm.priority)}`}>
                          {comm.priority} priority
                        </span>
                      </div>
                      <p className="text-dark-300 mb-2">To: {comm.recipient}</p>
                      <p className="text-dark-400 text-sm mb-3">{comm.content}</p>
                      <p className="text-dark-500 text-xs">{comm.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="btn-secondary text-sm">View</button>
                    <button className="btn-primary text-sm">Reply</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'clients' && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Client Communications</h3>
              <div className="space-y-4">
                {clientCommunications.map((client) => (
                  <div key={client.id} className="flex items-center justify-between p-4 bg-dark-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-accent-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {client.client.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{client.client}</p>
                        <p className="text-dark-400 text-sm">{client.project}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(client.status)}`}>
                          {client.status}
                        </span>
                        <span className={`text-xs ${getPriorityColor(client.priority)}`}>
                          {client.priority}
                        </span>
                      </div>
                      <p className="text-dark-400 text-sm">Last: {client.lastContact}</p>
                      <p className="text-dark-400 text-sm">Next: {client.nextFollowUp}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn-secondary text-sm">View History</button>
                      <button className="btn-primary text-sm">Contact</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ai-messages' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">AI-Generated Messages</h3>
              <button className="btn-primary">Generate New Message</button>
            </div>
            
            {aiGeneratedMessages.map((message) => (
              <div key={message.id} className="card">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    {getTypeIcon(message.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-white font-medium">{message.subject}</h4>
                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(message.status)}`}>
                          {message.status}
                        </span>
                        <span className="text-xs bg-purple-900 text-purple-300 px-2 py-1 rounded">
                          {message.tone}
                        </span>
                      </div>
                      <p className="text-dark-300 mb-2">To: {message.recipient}</p>
                      <p className="text-dark-400 text-sm mb-3">{message.content}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="btn-secondary text-sm">Edit</button>
                    <button className="btn-primary text-sm">Send</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* New Message Modal */}
      {showNewMessage && (
        <div className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-dark-900 border border-dark-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">New Message</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Type
                </label>
                <select className="input-field w-full">
                  <option>Email</option>
                  <option>Phone Call</option>
                  <option>Meeting</option>
                  <option>Follow-up</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Recipient
                </label>
                <input 
                  type="text" 
                  className="input-field w-full"
                  placeholder="Enter recipient name or email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Subject
                </label>
                <input 
                  type="text" 
                  className="input-field w-full"
                  placeholder="Enter message subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Priority
                </label>
                <select className="input-field w-full">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Message
                </label>
                <textarea 
                  className="input-field w-full h-32 resize-none"
                  placeholder="Enter your message..."
                />
              </div>
              <div className="flex space-x-3">
                <button 
                  type="button"
                  onClick={() => setShowNewMessage(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="btn-primary flex-1"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
