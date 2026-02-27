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

  const filteredInvoices = invoices.filter(invoice => 
    filterInvoiceStatus === 'all' || invoice.status === filterInvoiceStatus
  )

  const filteredTransactions = transactions.filter(transaction =>
    filterTransactionType === 'all' || transaction.type === filterTransactionType
  )

  const totalRevenue = transactions
    .filter(t => t.type === 'income' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter(t => t.type === 'expense' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)

  const netProfit = totalRevenue - totalExpenses
  const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0

  const outstandingInvoices = invoices
    .filter(inv => inv.status === 'sent' || inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.amount, 0)

  const overdueInvoices = invoices.filter(inv => inv.status === 'overdue')

  return (
    <div className="flex h-screen bg-black">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-black border-b border-gray-800">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Accounting & Finance</h1>
                <p className="mt-1 text-gray-400">Manage invoices, transactions, and financial reporting</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  New Invoice
                </button>
                <HomeButton />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-black">
          <div className="px-8 py-6 space-y-6">
            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold text-white mt-1">${totalRevenue.toLocaleString()}</p>
                  </div>
                  <ArrowTrendingUpIcon className="h-8 w-8 text-green-400" />
                </div>
                <p className="text-green-400 text-sm mt-2">↑ 12% from last month</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Expenses</p>
                    <p className="text-2xl font-bold text-white mt-1">${totalExpenses.toLocaleString()}</p>
                  </div>
                  <ArrowTrendingDownIcon className="h-8 w-8 text-red-400" />
                </div>
                <p className="text-red-400 text-sm mt-2">↓ 5% from last month</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Net Profit</p>
                    <p className="text-2xl font-bold text-white mt-1">${netProfit.toLocaleString()}</p>
                  </div>
                  <CurrencyDollarIcon className="h-8 w-8 text-blue-400" />
                </div>
                <p className="text-blue-400 text-sm mt-2">{profitMargin.toFixed(1)}% margin</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Outstanding</p>
                    <p className="text-2xl font-bold text-white mt-1">${outstandingInvoices.toLocaleString()}</p>
                  </div>
                  <BanknotesIcon className="h-8 w-8 text-yellow-400" />
                </div>
                <p className="text-yellow-400 text-sm mt-2">{overdueInvoices.length} overdue</p>
              </div>
            </div>

            {/* Invoices Section */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg">
              <div className="p-6 border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Invoices</h2>
                  <div className="flex items-center gap-4">
                    <select
                      value={filterInvoiceStatus}
                      onChange={(e) => setFilterInvoiceStatus(e.target.value)}
                      className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    >
                      <option value="all">All Status</option>
                      <option value="draft">Draft</option>
                      <option value="sent">Sent</option>
                      <option value="paid">Paid</option>
                      <option value="overdue">Overdue</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Invoice #</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Issue Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Due Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {filteredInvoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-gray-800/30">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                          {invoice.number}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-white">{invoice.clientName}</div>
                            <div className="text-sm text-gray-400">{invoice.clientEmail}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-semibold">
                          ${invoice.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getInvoiceStatusColor(invoice.status)}`}>
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {new Date(invoice.issueDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {new Date(invoice.dueDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          <button className="text-blue-400 hover:text-blue-300">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Transactions Section */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg">
              <div className="p-6 border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
                  <div className="flex items-center gap-4">
                    <select
                      value={filterTransactionType}
                      onChange={(e) => setFilterTransactionType(e.target.value)}
                      className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    >
                      <option value="all">All Types</option>
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Account</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-800/30">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {transaction.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {transaction.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {transaction.account}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-semibold ${
                            transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            transaction.status === 'completed' 
                              ? 'text-green-400 bg-green-900/20'
                              : transaction.status === 'pending'
                              ? 'text-yellow-400 bg-yellow-900/20'
                              : 'text-gray-400 bg-gray-900/20'
                          }`}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
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
