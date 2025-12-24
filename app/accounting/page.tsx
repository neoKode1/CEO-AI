'use client'

import { useState, useEffect } from 'react'
import { getContacts, getOnboardingData } from '@/lib/storage'
import HomeButton from '@/components/HomeButton'
import Sidebar from '@/components/Sidebar'
import {
  CurrencyDollarIcon,
  PlusIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline'

interface Invoice {
  id: string
  number: string
  clientName: string
  clientEmail: string
  amount: number
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  issueDate: string
  dueDate: string
  items: Array<{
    id: string
    description: string
    quantity: number
    rate: number
    amount: number
  }>
  notes: string
}

interface Transaction {
  id: string
  date: string
  description: string
  type: 'income' | 'expense'
  category: string
  amount: number
  account: string
  status: 'completed' | 'pending' | 'cancelled'
}

export default function AccountingPage() {
  const [activeTab, setActiveTab] = useState('accounting')
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [onboardingData, setOnboardingData] = useState<any>(null)
  const [filterInvoiceStatus, setFilterInvoiceStatus] = useState<string>('all')
  const [filterTransactionType, setFilterTransactionType] = useState<string>('all')
  const [selectedPeriod, setSelectedPeriod] = useState<string>('month')

  useEffect(() => {
    const contacts = getContacts()
    const onboarding = getOnboardingData()
    setOnboardingData(onboarding)
    
    // Generate sample data if none exist
    generateSampleData(contacts, onboarding)
  }, [])

  const generateSampleData = (contacts: any[], onboarding: any) => {
    // Generate sample invoices
    const sampleInvoices: Invoice[] = [
      {
        id: 'inv_1',
        number: 'INV-2024-001',
        clientName: 'TechStart Inc.',
        clientEmail: 'billing@techstart.com',
        amount: 2500,
        status: 'paid',
        issueDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        items: [
          { id: 'item_1', description: 'Website Development', quantity: 1, rate: 2000, amount: 2000 },
          { id: 'item_2', description: 'SEO Optimization', quantity: 1, rate: 500, amount: 500 }
        ],
        notes: 'Payment received on time. Great client to work with.'
      },
      {
        id: 'inv_2',
        number: 'INV-2024-002',
        clientName: 'HealthCare Solutions',
        clientEmail: 'accounts@healthcare.com',
        amount: 1800,
        status: 'sent',
        issueDate: new Date().toISOString(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        items: [
          { id: 'item_3', description: 'Brand Identity Design', quantity: 1, rate: 1200, amount: 1200 },
          { id: 'item_4', description: 'Marketing Materials', quantity: 1, rate: 600, amount: 600 }
        ],
        notes: 'Brand redesign project. Client approved final designs.'
      },
      {
        id: 'inv_3',
        number: 'INV-2024-003',
        clientName: 'E-Commerce Plus',
        clientEmail: 'finance@ecommerceplus.com',
        amount: 3200,
        status: 'overdue',
        issueDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        items: [
          { id: 'item_5', description: 'E-commerce Platform', quantity: 1, rate: 2500, amount: 2500 },
          { id: 'item_6', description: 'Payment Integration', quantity: 1, rate: 700, amount: 700 }
        ],
        notes: 'Platform completed and deployed. Following up on payment.'
      }
    ]

    // Generate sample transactions
    const sampleTransactions: Transaction[] = [
      {
        id: 'txn_1',
        date: new Date().toISOString(),
        description: 'Payment from TechStart Inc.',
        type: 'income',
        category: 'Client Payment',
        amount: 2500,
        account: 'Business Checking',
        status: 'completed'
      },
      {
        id: 'txn_2',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Adobe Creative Suite Subscription',
        type: 'expense',
        category: 'Software',
        amount: 52.99,
        account: 'Business Credit Card',
        status: 'completed'
      },
      {
        id: 'txn_3',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Office Supplies',
        type: 'expense',
        category: 'Office',
        amount: 125.50,
        account: 'Business Credit Card',
        status: 'completed'
      },
      {
        id: 'txn_4',
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Payment from HealthCare Solutions',
        type: 'income',
        category: 'Client Payment',
        amount: 1800,
        account: 'Business Checking',
        status: 'completed'
      }
    ]

    setInvoices(sampleInvoices)
    setTransactions(sampleTransactions)
  }

  const handleTabChange = (tab: string) => {
    if (tab === 'accounting') {
      return
    }
    window.location.href = `/${tab === 'dashboard' ? 'dashboard' : tab}`
  }

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-400 bg-green-900/20'
      case 'sent': return 'text-blue-400 bg-blue-900/20'
      case 'overdue': return 'text-red-400 bg-red-900/20'
      case 'draft': return 'text-yellow-400 bg-yellow-900/20'
      case 'cancelled': return 'text-gray-400 bg-gray-900/20'
      default: return 'text-gray-400 bg-gray-900/20'
    }
  }

  const getTransactionTypeColor = (type: string) => {
    return type === 'income' 
      ? 'text-green-400 bg-green-900/20' 
      : 'text-red-400 bg-red-900/20'
  }

  const filteredInvoices = invoices.filter(invoice => {
    if (filterInvoiceStatus !== 'all' && invoice.status !== filterInvoiceStatus) return false
    return true
  })

  const filteredTransactions = transactions.filter(transaction => {
    if (filterTransactionType !== 'all' && transaction.type !== filterTransactionType) return false
    return true
  })

  const stats = {
    totalInvoices: invoices.length,
    paidInvoices: invoices.filter(inv => inv.status === 'paid').length,
    overdueInvoices: invoices.filter(inv => inv.status === 'overdue').length,
    totalRevenue: invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0),
    pendingAmount: invoices.filter(inv => inv.status === 'sent').reduce((sum, inv) => sum + inv.amount, 0),
    overdueAmount: invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0)
  }

  const financialSummary = {
    totalIncome: transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
    totalExpenses: transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
    netIncome: transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0) - 
               transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
  }

  const getDaysOverdue = (dueDate: string) => {
    const days = Math.ceil((new Date().getTime() - new Date(dueDate).getTime()) / (1000 * 60 * 60 * 24))
    return days > 0 ? days : 0
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-dark-900 border-b border-dark-700 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Accounting</h1>
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
              <h2 className="text-3xl font-bold text-white mb-2">Financial Tracking & Invoicing</h2>
              <p className="text-dark-300">Manage your invoices, track income and expenses, and monitor your financial health</p>
            </div>

            {/* Financial Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                <div className="flex items-center space-x-3 mb-4">
                  <ArrowTrendingUpIcon className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">${financialSummary.totalIncome.toLocaleString()}</p>
                    <p className="text-dark-300 text-sm">Total Income</p>
                  </div>
                </div>
              </div>
              <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                <div className="flex items-center space-x-3 mb-4">
                  <ArrowTrendingDownIcon className="w-8 h-8 text-red-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">${financialSummary.totalExpenses.toLocaleString()}</p>
                    <p className="text-dark-300 text-sm">Total Expenses</p>
                  </div>
                </div>
              </div>
              <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                <div className="flex items-center space-x-3 mb-4">
                  <BanknotesIcon className="w-8 h-8 text-blue-400" />
                  <div>
                    <p className={`text-2xl font-bold ${financialSummary.netIncome >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      ${financialSummary.netIncome.toLocaleString()}
                    </p>
                    <p className="text-dark-300 text-sm">Net Income</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                <div className="flex items-center space-x-3">
                  <DocumentTextIcon className="w-8 h-8 text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.totalInvoices}</p>
                    <p className="text-dark-300 text-sm">Total Invoices</p>
                  </div>
                </div>
              </div>
              <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.paidInvoices}</p>
                    <p className="text-dark-300 text-sm">Paid</p>
                  </div>
                </div>
              </div>
              <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                <div className="flex items-center space-x-3">
                  <ExclamationTriangleIcon className="w-8 h-8 text-red-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.overdueInvoices}</p>
                    <p className="text-dark-300 text-sm">Overdue</p>
                  </div>
                </div>
              </div>
              <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                <div className="flex items-center space-x-3">
                  <CurrencyDollarIcon className="w-8 h-8 text-yellow-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">${stats.pendingAmount.toLocaleString()}</p>
                    <p className="text-dark-300 text-sm">Pending</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoices Section */}
            <div className="bg-dark-800 rounded-lg p-6 mb-6 border border-dark-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Invoices</h3>
                <div className="flex items-center space-x-4">
                  <select
                    value={filterInvoiceStatus}
                    onChange={(e) => setFilterInvoiceStatus(e.target.value)}
                    className="bg-dark-700 text-white px-3 py-2 rounded-lg border border-dark-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                    <PlusIcon className="w-4 h-4" />
                    <span>New Invoice</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredInvoices.map((invoice) => (
                  <div key={invoice.id} className="bg-dark-700 rounded-lg p-4 hover:bg-dark-600 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getInvoiceStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                        <span className="text-lg font-semibold text-white">{invoice.number}</span>
                        <span className="text-dark-300">|</span>
                        <span className="text-white">{invoice.clientName}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-white">${invoice.amount.toLocaleString()}</p>
                        <p className="text-sm text-dark-300">
                          Due: {new Date(invoice.dueDate).toLocaleDateString()}
                          {invoice.status === 'overdue' && (
                            <span className="text-red-400 ml-2">
                              ({getDaysOverdue(invoice.dueDate)} days overdue)
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-dark-300">Client Email: {invoice.clientEmail}</p>
                        <p className="text-dark-300">Issue Date: {new Date(invoice.issueDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-dark-300">Items: {invoice.items.length}</p>
                        {invoice.notes && (
                          <p className="text-dark-300">Notes: {invoice.notes}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Recent Transactions</h3>
                <select
                  value={filterTransactionType}
                  onChange={(e) => setFilterTransactionType(e.target.value)}
                  className="bg-dark-700 text-white px-3 py-2 rounded-lg border border-dark-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div className="space-y-3">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between bg-dark-700 rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTransactionTypeColor(transaction.type)}`}>
                        {transaction.type}
                      </span>
                      <div>
                        <p className="text-white font-medium">{transaction.description}</p>
                        <p className="text-sm text-dark-300">{transaction.category} • {transaction.account}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-semibold ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-dark-300">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
