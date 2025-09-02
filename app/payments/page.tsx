'use client'

import { useState, useEffect } from 'react'
import { 
  PlusIcon, 
  CurrencyDollarIcon, 
  CreditCardIcon,
  BanknotesIcon,
  QrCodeIcon,
  ClipboardDocumentIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'
import HomeButton from '@/components/HomeButton'
import Sidebar from '@/components/Sidebar'

interface PaymentMethod {
  id: string
  type: 'crypto' | 'bank' | 'card' | 'paypal'
  name: string
  details: string
  isActive: boolean
  createdAt: string
}

interface CryptoWallet {
  id: string
  currency: string
  address: string
  qrCode: string
  balance: number
  isActive: boolean
  createdAt: string
}

interface Invoice {
  id: string
  clientName: string
  amount: number
  currency: string
  cryptoAmount?: number
  cryptoCurrency?: string
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  dueDate: string
  paymentMethod: string
  createdAt: string
}

interface Payment {
  id: string
  invoiceId: string
  amount: number
  currency: string
  cryptoAmount?: number
  cryptoCurrency?: string
  paymentMethod: string
  status: 'pending' | 'completed' | 'failed'
  transactionHash?: string
  receivedAt: string
}

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showAddInvoice, setShowAddInvoice] = useState(false)
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false)
  const [showAddCryptoWallet, setShowAddCryptoWallet] = useState(false)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [cryptoWallets, setCryptoWallets] = useState<CryptoWallet[]>([])

  // Mock data for demonstration
  useEffect(() => {
    setInvoices([
      {
        id: '1',
        clientName: 'TechCorp Solutions',
        amount: 2500,
        currency: 'USD',
        cryptoAmount: 0.15,
        cryptoCurrency: 'ETH',
        status: 'paid',
        dueDate: '2024-01-15',
        paymentMethod: 'Ethereum',
        createdAt: '2024-01-01'
      },
      {
        id: '2',
        clientName: 'Design Studio Pro',
        amount: 1200,
        currency: 'USD',
        status: 'sent',
        dueDate: '2024-01-20',
        paymentMethod: 'Bank Transfer',
        createdAt: '2024-01-05'
      },
      {
        id: '3',
        clientName: 'Marketing Masters',
        amount: 800,
        currency: 'USD',
        cryptoAmount: 0.008,
        cryptoCurrency: 'BTC',
        status: 'overdue',
        dueDate: '2024-01-10',
        paymentMethod: 'Bitcoin',
        createdAt: '2024-01-02'
      }
    ])

    setPayments([
      {
        id: '1',
        invoiceId: '1',
        amount: 2500,
        currency: 'USD',
        cryptoAmount: 0.15,
        cryptoCurrency: 'ETH',
        paymentMethod: 'Ethereum',
        status: 'completed',
        transactionHash: '0x1234...5678',
        receivedAt: '2024-01-15'
      }
    ])

    setPaymentMethods([
      {
        id: '1',
        type: 'crypto',
        name: 'Bitcoin',
        details: 'BTC Wallet',
        isActive: true,
        createdAt: '2024-01-01'
      },
      {
        id: '2',
        type: 'crypto',
        name: 'Ethereum',
        details: 'ETH Wallet',
        isActive: true,
        createdAt: '2024-01-01'
      },
      {
        id: '3',
        type: 'bank',
        name: 'Bank Transfer',
        details: 'Chase Bank ****1234',
        isActive: true,
        createdAt: '2024-01-01'
      },
      {
        id: '4',
        type: 'card',
        name: 'Credit Card',
        details: 'Visa ****5678',
        isActive: true,
        createdAt: '2024-01-01'
      }
    ])

    setCryptoWallets([
      {
        id: '1',
        currency: 'BTC',
        address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmIi8+PHRleHQgeD0iMTAwIiB5PSIxMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzAwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QlRDIFFSIENvZGU8L3RleHQ+PC9zdmc+',
        balance: 0.25,
        isActive: true,
        createdAt: '2024-01-01'
      },
      {
        id: '2',
        currency: 'ETH',
        address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
        qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmIi8+PHRleHQgeD0iMTAwIiB5PSIxMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzAwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RVRIIFFSIENvZGU8L3RleHQ+PC9zdmc+',
        balance: 2.5,
        isActive: true,
        createdAt: '2024-01-01'
      }
    ])
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case 'pending':
      case 'sent':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />
      case 'overdue':
      case 'failed':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'pending':
      case 'sent':
        return 'text-yellow-600 bg-yellow-100'
      case 'overdue':
      case 'failed':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const calculateTotalRevenue = () => {
    return payments
      .filter(p => p.status === 'completed')
      .reduce((sum, payment) => sum + payment.amount, 0)
  }

  const calculateCryptoRevenue = () => {
    return payments
      .filter(p => p.status === 'completed' && p.cryptoAmount)
      .reduce((sum, payment) => sum + (payment.cryptoAmount || 0), 0)
  }

  const calculateMonthlyRevenue = () => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    
    return payments
      .filter(p => p.status === 'completed')
      .filter(p => {
        const paymentDate = new Date(p.receivedAt)
        return paymentDate.getMonth() === currentMonth && paymentDate.getFullYear() === currentYear
      })
      .reduce((sum, payment) => sum + payment.amount, 0)
  }

  const calculatePendingRevenue = () => {
    return invoices
      .filter(i => i.status === 'sent')
      .reduce((sum, invoice) => sum + invoice.amount, 0)
  }

  const calculateOverdueRevenue = () => {
    return invoices
      .filter(i => i.status === 'overdue')
      .reduce((sum, invoice) => sum + invoice.amount, 0)
  }

  const getRevenueGrowth = () => {
    const currentMonth = calculateMonthlyRevenue()
    const lastMonth = payments
      .filter(p => p.status === 'completed')
      .filter(p => {
        const paymentDate = new Date(p.receivedAt)
        const lastMonthDate = new Date()
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1)
        return paymentDate.getMonth() === lastMonthDate.getMonth() && paymentDate.getFullYear() === lastMonthDate.getFullYear()
      })
      .reduce((sum, payment) => sum + payment.amount, 0)
    
    if (lastMonth === 0) return 0
    return ((currentMonth - lastMonth) / lastMonth) * 100
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-white">${calculateTotalRevenue().toLocaleString()}</p>
                    <p className="text-dark-300 text-sm">Total Revenue</p>
                  </div>
                  <div className="p-3 bg-green-500/20 rounded-lg">
                    <CurrencyDollarIcon className="h-8 w-8 text-green-500" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className={`${getRevenueGrowth() >= 0 ? 'text-green-400' : 'text-red-400'} flex items-center`}>
                    {getRevenueGrowth() >= 0 ? '↗' : '↘'} {Math.abs(getRevenueGrowth()).toFixed(1)}%
                  </span>
                  <span className="text-dark-400 ml-2">vs last month</span>
                </div>
              </div>
              
              <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-white">${calculateMonthlyRevenue().toLocaleString()}</p>
                    <p className="text-dark-300 text-sm">This Month</p>
                  </div>
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <ArrowTrendingUpIcon className="h-8 w-8 text-blue-500" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-dark-400">Current month revenue</p>
                </div>
              </div>
              
              <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-white">${calculatePendingRevenue().toLocaleString()}</p>
                    <p className="text-dark-300 text-sm">Pending</p>
                  </div>
                  <div className="p-3 bg-yellow-500/20 rounded-lg">
                    <ClockIcon className="h-8 w-8 text-yellow-500" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-dark-400">Awaiting payment</p>
                </div>
              </div>
              
              <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-white">${calculateOverdueRevenue().toLocaleString()}</p>
                    <p className="text-dark-300 text-sm">Overdue</p>
                  </div>
                  <div className="p-3 bg-red-500/20 rounded-lg">
                    <ExclamationTriangleIcon className="h-8 w-8 text-red-500" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-dark-400">Past due invoices</p>
                </div>
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
              <h3 className="text-lg font-semibold text-white mb-4">Revenue Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    ${calculateTotalRevenue().toLocaleString()}
                  </div>
                  <div className="text-dark-300 text-sm">Total Revenue</div>
                  <div className="text-xs text-dark-400 mt-1">All time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    ${calculateMonthlyRevenue().toLocaleString()}
                  </div>
                  <div className="text-dark-300 text-sm">This Month</div>
                  <div className="text-xs text-dark-400 mt-1">
                    {getRevenueGrowth() >= 0 ? '+' : ''}{getRevenueGrowth().toFixed(1)}% vs last month
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    {cryptoWallets.filter(w => w.isActive).length}
                  </div>
                  <div className="text-dark-300 text-sm">Active Crypto Wallets</div>
                  <div className="text-xs text-dark-400 mt-1">Ready for payments</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-dark-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Payment Activity</h3>
              <div className="space-y-3">
                {payments.slice(0, 5).map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 bg-dark-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(payment.status)}
                      <div>
                        <p className="text-white font-medium">
                          ${payment.amount.toLocaleString()} {payment.currency}
                          {payment.cryptoAmount && (
                            <span className="text-dark-300 ml-2">
                              ({payment.cryptoAmount} {payment.cryptoCurrency})
                            </span>
                          )}
                        </p>
                        <p className="text-dark-300 text-sm">{payment.paymentMethod}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                      <p className="text-dark-400 text-xs mt-1">
                        {new Date(payment.receivedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'invoices':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Invoices</h2>
                <p className="text-dark-300">Manage your client invoices and payments</p>
              </div>
              <button
                onClick={() => setShowAddInvoice(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <PlusIcon className="h-5 w-5" />
                <span>New Invoice</span>
              </button>
            </div>

            {/* Invoice Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{invoices.length}</div>
                  <div className="text-dark-300 text-sm">Total Invoices</div>
                </div>
              </div>
              <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{invoices.filter(i => i.status === 'paid').length}</div>
                  <div className="text-dark-300 text-sm">Paid</div>
                </div>
              </div>
              <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{invoices.filter(i => i.status === 'sent').length}</div>
                  <div className="text-dark-300 text-sm">Pending</div>
                </div>
              </div>
              <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{invoices.filter(i => i.status === 'overdue').length}</div>
                  <div className="text-dark-300 text-sm">Overdue</div>
                </div>
              </div>
            </div>

            <div className="bg-dark-800 rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">All Invoices</h3>
                {invoices.length === 0 ? (
                  <div className="text-center py-8">
                    <DocumentTextIcon className="h-12 w-12 text-dark-400 mx-auto mb-4" />
                    <p className="text-dark-300">No invoices created yet. Create your first invoice to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {invoices.map((invoice) => (
                      <div key={invoice.id} className="bg-dark-700 p-6 rounded-lg border border-dark-600 hover:border-dark-500 transition-colors">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              {getStatusIcon(invoice.status)}
                              <h4 className="text-white font-semibold text-lg">{invoice.clientName}</h4>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                                {invoice.status.toUpperCase()}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-dark-300">Amount:</span>
                                  <span className="text-white font-medium">${invoice.amount.toLocaleString()} {invoice.currency}</span>
                                </div>
                                {invoice.cryptoAmount && (
                                  <div className="flex justify-between">
                                    <span className="text-dark-300">Crypto:</span>
                                    <span className="text-purple-400 font-medium">{invoice.cryptoAmount} {invoice.cryptoCurrency}</span>
                                  </div>
                                )}
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-dark-300">Due Date:</span>
                                  <span className="text-white">{new Date(invoice.dueDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-dark-300">Method:</span>
                                  <span className="text-white">{invoice.paymentMethod}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <button className="p-2 text-dark-300 hover:text-white hover:bg-dark-600 rounded-lg transition-colors" title="View Invoice">
                              <EyeIcon className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-dark-300 hover:text-white hover:bg-dark-600 rounded-lg transition-colors" title="Edit Invoice">
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-dark-300 hover:text-white hover:bg-dark-600 rounded-lg transition-colors" title="Delete Invoice">
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case 'crypto':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Cryptocurrency Payments</h2>
                <p className="text-dark-300">Accept and manage crypto payments</p>
              </div>
              <button
                onClick={() => setShowAddCryptoWallet(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <PlusIcon className="h-5 w-5" />
                <span>Add Crypto Wallet</span>
              </button>
            </div>

            {/* Crypto Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{cryptoWallets.filter(w => w.isActive).length}</div>
                  <div className="text-dark-300 text-sm">Active Wallets</div>
                </div>
              </div>
              <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{payments.filter(p => p.status === 'completed' && p.cryptoAmount).length}</div>
                  <div className="text-dark-300 text-sm">Crypto Payments</div>
                </div>
              </div>
              <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{cryptoWallets.reduce((sum, w) => sum + w.balance, 0).toFixed(8)}</div>
                  <div className="text-dark-300 text-sm">Total Balance</div>
                </div>
              </div>
              <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">${calculateCryptoRevenue().toLocaleString()}</div>
                  <div className="text-dark-300 text-sm">Crypto Revenue</div>
                </div>
              </div>
            </div>

            {/* Crypto Wallets */}
            <div className="bg-dark-800 rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Your Crypto Wallets</h3>
                {cryptoWallets.length === 0 ? (
                  <div className="text-center py-8">
                    <QrCodeIcon className="h-12 w-12 text-dark-400 mx-auto mb-4" />
                    <p className="text-dark-300">No crypto wallets added yet. Add your first wallet to start accepting crypto payments!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cryptoWallets.map((wallet) => (
                      <div key={wallet.id} className="bg-dark-700 p-6 rounded-lg border border-dark-600 hover:border-dark-500 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-3 bg-purple-500/20 rounded-lg">
                              <QrCodeIcon className="h-8 w-8 text-purple-500" />
                            </div>
                            <div>
                              <h4 className="text-white font-semibold text-lg">{wallet.currency} Wallet</h4>
                              <p className="text-dark-300 text-sm">Cryptocurrency Wallet</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${wallet.isActive ? 'text-green-600 bg-green-900/20' : 'text-gray-600 bg-gray-900/20'}`}>
                            {wallet.isActive ? 'ACTIVE' : 'INACTIVE'}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-dark-300 text-sm">Balance:</span>
                              <span className="text-white font-semibold">{wallet.balance.toFixed(8)} {wallet.currency}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-dark-300 text-sm">Status:</span>
                              <span className={`text-sm ${wallet.isActive ? 'text-green-400' : 'text-gray-400'}`}>
                                {wallet.isActive ? 'Ready for payments' : 'Disabled'}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-dark-300 text-sm">Address:</span>
                              <span className="text-dark-400 text-xs font-mono truncate max-w-32">{wallet.address}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-dark-300 text-sm">Created:</span>
                              <span className="text-dark-400 text-xs">{new Date(wallet.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-dark-300 text-sm mb-3">QR Code for Payments:</p>
                          <div className="bg-white p-3 rounded-lg inline-block">
                            <img 
                              src={wallet.qrCode} 
                              alt={`${wallet.currency} QR Code`}
                              className="w-20 h-20"
                            />
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm transition-colors">
                            Copy Address
                          </button>
                          <button className="px-3 py-2 text-dark-300 hover:text-white hover:bg-dark-600 rounded-lg transition-colors" title="Edit Wallet">
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button className="px-3 py-2 text-dark-300 hover:text-white hover:bg-dark-600 rounded-lg transition-colors" title="Delete Wallet">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Crypto Payment History */}
            <div className="bg-dark-800 rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Crypto Payment History</h3>
                <div className="space-y-3">
                  {payments
                    .filter(p => p.cryptoAmount)
                    .map((payment) => (
                      <div key={payment.id} className="bg-dark-700 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(payment.status)}
                            <div>
                              <p className="text-white font-medium">
                                {payment.cryptoAmount} {payment.cryptoCurrency}
                                <span className="text-dark-300 ml-2">
                                  (${payment.amount.toLocaleString()} {payment.currency})
                                </span>
                              </p>
                              <p className="text-dark-300 text-sm">
                                {payment.transactionHash && (
                                  <span>TX: {payment.transactionHash}</span>
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(payment.status)}`}>
                              {payment.status}
                            </span>
                            <p className="text-dark-400 text-xs mt-1">
                              {new Date(payment.receivedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 'methods':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Payment Methods</h2>
                <p className="text-dark-300">Manage your accepted payment methods</p>
              </div>
              <button
                onClick={() => setShowAddPaymentMethod(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <PlusIcon className="h-5 w-5" />
                <span>Add Payment Method</span>
              </button>
            </div>

            <div className="bg-dark-800 rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">All Payment Methods</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="bg-dark-700 p-6 rounded-lg border border-dark-600 hover:border-dark-500 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-3 rounded-lg">
                            {method.type === 'crypto' && <div className="bg-purple-500/20"><QrCodeIcon className="h-6 w-6 text-purple-500" /></div>}
                            {method.type === 'bank' && <div className="bg-green-500/20"><BanknotesIcon className="h-6 w-6 text-green-500" /></div>}
                            {method.type === 'card' && <div className="bg-blue-500/20"><CreditCardIcon className="h-6 w-6 text-blue-500" /></div>}
                          </div>
                          <div>
                            <h4 className="text-white font-semibold text-lg">{method.name}</h4>
                            <p className="text-dark-300 text-sm">{method.details}</p>
                            <p className="text-dark-400 text-xs mt-1">Type: {method.type}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${method.isActive ? 'text-green-600 bg-green-900/20' : 'text-gray-600 bg-gray-900/20'}`}>
                          {method.isActive ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-dark-300">Created:</span>
                          <span className="text-dark-400">{new Date(method.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors">
                          {method.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button className="px-3 py-2 text-dark-300 hover:text-white hover:bg-dark-600 rounded-lg transition-colors" title="Edit Method">
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button className="px-3 py-2 text-dark-300 hover:text-white hover:bg-dark-600 rounded-lg transition-colors" title="Delete Method">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

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
              <h1 className="text-2xl font-bold gradient-text">Payments & Crypto</h1>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-dark-400">Payment System Online</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-dark-400">Total Revenue</p>
                <p className="text-xs text-dark-500">${calculateTotalRevenue().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 ml-16 lg:ml-80">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'invoices', label: 'Invoices' },
            { id: 'crypto', label: 'Cryptocurrency' },
            { id: 'methods', label: 'Payment Methods' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-dark-300 hover:text-white hover:bg-dark-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {renderTabContent()}
      </main>

      {/* Add Invoice Modal */}
      {showAddInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-dark-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Create New Invoice</h3>
                <button
                  onClick={() => setShowAddInvoice(false)}
                  className="text-dark-300 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Amount *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Currency *
                    </label>
                    <select className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Due Date *
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Payment Method
                  </label>
                  <select className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="bank">Bank Transfer</option>
                    <option value="card">Credit Card</option>
                    <option value="crypto">Cryptocurrency</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddInvoice(false)}
                    className="px-4 py-2 text-dark-300 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Create Invoice
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Crypto Wallet Modal */}
      {showAddCryptoWallet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-dark-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Add Cryptocurrency Wallet</h3>
                <button
                  onClick={() => setShowAddCryptoWallet(false)}
                  className="text-dark-300 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Cryptocurrency *
                    </label>
                    <select className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="BTC">Bitcoin (BTC)</option>
                      <option value="ETH">Ethereum (ETH)</option>
                      <option value="USDT">Tether (USDT)</option>
                      <option value="USDC">USD Coin (USDC)</option>
                      <option value="SOL">Solana (SOL)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Wallet Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter wallet address"
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Initial Balance
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.00000001"
                    placeholder="0.00000000"
                    className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddCryptoWallet(false)}
                    className="px-4 py-2 text-dark-300 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Add Wallet
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
