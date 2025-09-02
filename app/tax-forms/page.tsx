'use client'

import { useState, useEffect } from 'react'
import { 
  PlusIcon, 
  DocumentIcon,
  DocumentTextIcon,
  DocumentArrowUpIcon,
  CalendarIcon,
  TagIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import HomeButton from '@/components/HomeButton'
import Sidebar from '@/components/Sidebar'

interface TaxDocument {
  id: string
  name: string
  type: 'tax-form' | 'receipt' | 'invoice' | 'contract' | 'other'
  category: 'personal' | 'business' | 'investment' | 'property' | 'other'
  status: 'pending' | 'completed' | 'overdue' | 'draft'
  dueDate?: string
  uploadDate: string
  fileSize: string
  fileType: string
  description: string
  tags: string[]
  isImportant: boolean
}

export default function TaxFormsPage() {
  const [activeTab, setActiveTab] = useState('tax-forms')
  const [documents, setDocuments] = useState<TaxDocument[]>([])
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<TaxDocument | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  // Mock data for demonstration
  useEffect(() => {
    setDocuments([
      {
        id: '1',
        name: '2024 Personal Tax Return',
        type: 'tax-form',
        category: 'personal',
        status: 'pending',
        dueDate: '2025-04-15',
        uploadDate: '2024-12-01',
        fileSize: '2.4 MB',
        fileType: 'PDF',
        description: 'Personal income tax return for 2024 tax year',
        tags: ['tax-return', 'personal', '2024'],
        isImportant: true
      },
      {
        id: '2',
        name: 'Business Expense Receipts Q4',
        type: 'receipt',
        category: 'business',
        status: 'completed',
        uploadDate: '2024-11-30',
        fileSize: '5.1 MB',
        fileType: 'ZIP',
        description: 'Quarterly business expense receipts and documentation',
        tags: ['expenses', 'business', 'Q4', 'receipts'],
        isImportant: false
      },
      {
        id: '3',
        name: 'Investment Portfolio Summary',
        type: 'other',
        category: 'investment',
        status: 'completed',
        uploadDate: '2024-12-15',
        fileSize: '1.8 MB',
        fileType: 'PDF',
        description: 'Annual investment portfolio summary and tax implications',
        tags: ['investments', 'portfolio', 'annual'],
        isImportant: true
      },
      {
        id: '4',
        name: 'Property Tax Assessment',
        type: 'tax-form',
        category: 'property',
        status: 'overdue',
        dueDate: '2024-12-31',
        uploadDate: '2024-10-15',
        fileSize: '3.2 MB',
        fileType: 'PDF',
        description: 'Annual property tax assessment and payment records',
        tags: ['property', 'tax', 'assessment'],
        isImportant: true
      }
    ])
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />
      case 'overdue':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
      case 'draft':
        return <DocumentTextIcon className="h-5 w-5 text-blue-500" />
      default:
        return <DocumentIcon className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-900/20'
      case 'pending':
        return 'text-yellow-600 bg-yellow-900/20'
      case 'overdue':
        return 'text-red-600 bg-red-900/20'
      case 'draft':
        return 'text-blue-600 bg-blue-900/20'
      default:
        return 'text-gray-600 bg-gray-900/20'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tax-form':
        return <DocumentTextIcon className="h-6 w-6 text-red-500" />
      case 'receipt':
        return <DocumentArrowUpIcon className="h-6 w-6 text-green-500" />
      case 'invoice':
        return <DocumentIcon className="h-6 w-6 text-blue-500" />
      case 'contract':
        return <DocumentTextIcon className="h-6 w-6 text-purple-500" />
      default:
        return <DocumentIcon className="h-6 w-6 text-gray-500" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'personal':
        return 'text-blue-400 bg-blue-900/20'
      case 'business':
        return 'text-green-400 bg-green-900/20'
      case 'investment':
        return 'text-purple-400 bg-purple-900/20'
      case 'property':
        return 'text-orange-400 bg-orange-900/20'
      default:
        return 'text-gray-400 bg-gray-900/20'
    }
  }

  const calculateStats = () => {
    const total = documents.length
    const pending = documents.filter(d => d.status === 'pending').length
    const overdue = documents.filter(d => d.status === 'overdue').length
    const completed = documents.filter(d => d.status === 'completed').length
    const important = documents.filter(d => d.isImportant).length

    return { total, pending, overdue, completed, important }
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = filterType === 'all' || doc.type === filterType
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus
    return matchesSearch && matchesType && matchesCategory && matchesStatus
  })

  const handleTabChange = (tab: string) => {
    if (tab === 'tax-forms') {
      return
    }
    window.location.href = `/${tab === 'dashboard' ? 'dashboard' : tab}`
  }

  const stats = calculateStats()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-dark-900 border-b border-dark-700 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Tax Forms & Documents</h1>
          <HomeButton />
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">Document Management</h2>
              <p className="text-dark-300">Manage your tax forms, receipts, contracts, and important documents</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{stats.total}</div>
                  <div className="text-dark-300 text-sm">Total Documents</div>
                </div>
              </div>
              <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{stats.pending}</div>
                  <div className="text-dark-300 text-sm">Pending</div>
                </div>
              </div>
              <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{stats.overdue}</div>
                  <div className="text-dark-300 text-sm">Overdue</div>
                </div>
              </div>
              <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{stats.completed}</div>
                  <div className="text-dark-300 text-sm">Completed</div>
                </div>
              </div>
              <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{stats.important}</div>
                  <div className="text-dark-300 text-sm">Important</div>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-dark-800 rounded-lg p-4 mb-6 border border-dark-700">
              <div className="flex flex-wrap items-center space-x-4">
                {/* Search */}
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <DocumentIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
                    <input
                      type="text"
                      placeholder="Search documents, descriptions, or tags..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-dark-700 text-white pl-10 pr-4 py-2 rounded-lg border border-dark-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Filters */}
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-dark-700 text-white px-3 py-2 rounded-lg border border-dark-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="tax-form">Tax Forms</option>
                  <option value="receipt">Receipts</option>
                  <option value="invoice">Invoices</option>
                  <option value="contract">Contracts</option>
                  <option value="other">Other</option>
                </select>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-dark-700 text-white px-3 py-2 rounded-lg border border-dark-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="personal">Personal</option>
                  <option value="business">Business</option>
                  <option value="investment">Investment</option>
                  <option value="property">Property</option>
                  <option value="other">Other</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-dark-700 text-white px-3 py-2 rounded-lg border border-dark-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="overdue">Overdue</option>
                  <option value="draft">Draft</option>
                </select>

                {/* Upload Button */}
                <button 
                  onClick={() => setShowUploadForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <PlusIcon className="w-4 h-4" />
                  <span>Upload Document</span>
                </button>
              </div>
            </div>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((document) => (
                <div key={document.id} className="bg-dark-800 rounded-lg p-6 border border-dark-700 hover:border-dark-600 transition-colors">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-dark-700 rounded-lg">
                        {getTypeIcon(document.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">{document.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                            {document.status.toUpperCase()}
                          </span>
                          {document.isImportant && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium text-red-400 bg-red-900/20">
                              IMPORTANT
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Document Info */}
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-dark-300">Category:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(document.category)}`}>
                        {document.category}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-dark-300">File Type:</span>
                      <span className="text-white">{document.fileType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-dark-300">Size:</span>
                      <span className="text-white">{document.fileSize}</span>
                    </div>
                    {document.dueDate && (
                      <div className="flex justify-between text-sm">
                        <span className="text-dark-300">Due Date:</span>
                        <span className={`${document.status === 'overdue' ? 'text-red-400' : 'text-white'}`}>
                          {new Date(document.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-dark-300">Uploaded:</span>
                      <span className="text-white">{new Date(document.uploadDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <p className="text-sm text-dark-300 line-clamp-2">{document.description}</p>
                  </div>

                  {/* Tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {document.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-900/20 text-blue-400 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                      {document.tags.length > 3 && (
                        <span className="px-2 py-1 bg-dark-700 text-dark-300 text-xs rounded-full">
                          +{document.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2">
                      <EyeIcon className="w-4 h-4" />
                      <span>View</span>
                    </button>
                    <button className="px-3 py-2 text-dark-300 hover:text-white hover:bg-dark-700 rounded-lg transition-colors" title="Download">
                                              <ArrowDownTrayIcon className="h-4 w-4" />
                    </button>
                    <button className="px-3 py-2 text-dark-300 hover:text-white hover:bg-dark-700 rounded-lg transition-colors" title="Edit">
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button className="px-3 py-2 text-dark-300 hover:text-white hover:bg-dark-700 rounded-lg transition-colors" title="Delete">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <DocumentIcon className="w-16 h-16 text-dark-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No documents found</h3>
                <p className="text-dark-300 mb-4">
                  Try adjusting your search or filters, or upload your first document
                </p>
                <button 
                  onClick={() => setShowUploadForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Upload Your First Document
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Document Modal */}
      {showUploadForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-dark-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Upload New Document</h3>
                <button
                  onClick={() => setShowUploadForm(false)}
                  className="text-dark-300 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Document Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter document name"
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Document Type *
                    </label>
                    <select className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="tax-form">Tax Form</option>
                      <option value="receipt">Receipt</option>
                      <option value="invoice">Invoice</option>
                      <option value="contract">Contract</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Category *
                    </label>
                    <select className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="personal">Personal</option>
                      <option value="business">Business</option>
                      <option value="investment">Investment</option>
                      <option value="property">Property</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Due Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter document description"
                    className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    placeholder="Enter tags separated by commas"
                    className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    File Upload *
                  </label>
                  <div className="border-2 border-dashed border-dark-600 rounded-lg p-6 text-center">
                    <DocumentArrowUpIcon className="w-12 h-12 text-dark-400 mx-auto mb-4" />
                    <p className="text-dark-300 mb-2">Drag and drop your file here, or click to browse</p>
                    <button
                      type="button"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Choose File
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="important"
                    className="w-4 h-4 text-blue-600 bg-dark-700 border-dark-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="important" className="text-white text-sm">
                    Mark as important document
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowUploadForm(false)}
                    className="px-4 py-2 text-dark-300 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Upload Document
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
