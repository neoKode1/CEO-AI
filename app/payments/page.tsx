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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-dark-800 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CurrencyDollarIcon className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold text-white">${calculateTotalRevenue().toLocaleString()}</p>
                    <p className="text-dark-300">Total Revenue</p>
                  </div>
                </div>
              </div>
              <div className="bg-dark-800 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ArrowTrendingUpIcon className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold text-white">{invoices.filter(i => i.status === 'paid').length}</p>
                    <p className="text-dark-300">Paid Invoices</p>
                  </div>
                </div>
              </div>
              <div className="bg-dark-800 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ArrowTrendingDownIcon className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold text-white">{invoices.filter(i => i.status === 'overdue').length}</p>
                    <p className="text-dark-300">Overdue</p>
                  </div>
                </div>
              </div>
              <div className="bg-dark-800 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <QrCodeIcon className="h-8 w-8 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold text-white">{cryptoWallets.filter(w => w.isActive).length}</p>
                    <p className="text-dark-300">Active Crypto Wallets</p>
                  </div>
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
                      <div key={invoice.id} className="bg-dark-700 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              {getStatusIcon(invoice.status)}
                              <h4 className="text-white font-medium">{invoice.clientName}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(invoice.status)}`}>
                                {invoice.status}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-dark-300">
                              <span>Amount: ${invoice.amount.toLocaleString()} {invoice.currency}</span>
                              {invoice.cryptoAmount && (
                                <span>Crypto: {invoice.cryptoAmount} {invoice.cryptoCurrency}</span>
                              )}
                              <span>Due: {new Date(invoice.dueDate).toLocaleDateString()}</span>
                              <span>Method: {invoice.paymentMethod}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="p-2 text-dark-300 hover:text-white transition-colors">
                              <EyeIcon className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-dark-300 hover:text-white transition-colors">
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-dark-300 hover:text-white transition-colors">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-dark-800 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <QrCodeIcon className="h-8 w-8 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold text-white">{cryptoWallets.filter(w => w.isActive).length}</p>
                    <p className="text-dark-300">Active Wallets</p>
                  </div>
                </div>
              </div>
              <div className="bg-dark-800 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CurrencyDollarIcon className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold text-white">{calculateCryptoRevenue().toFixed(4)}</p>
                    <p className="text-dark-300">Total Crypto Revenue</p>
                  </div>
                </div>
              </div>
              <div className="bg-dark-800 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ArrowTrendingUpIcon className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold text-white">{payments.filter(p => p.cryptoAmount && p.status === 'completed').length}</p>
                    <p className="text-dark-300">Crypto Payments</p>
                  </div>
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
                      <div key={wallet.id} className="bg-dark-700 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-white font-medium text-lg">{wallet.currency} Wallet</h4>
                            <p className="text-dark-300 text-sm">Balance: {wallet.balance} {wallet.currency}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${wallet.isActive ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'}`}>
                            {wallet.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        
                        <div className="mb-4">
                          <p className="text-dark-300 text-sm mb-2">Wallet Address:</p>
                          <div className="flex items-center space-x-2">
                            <code className="bg-dark-600 px-2 py-1 rounded text-xs text-white font-mono">
                              {wallet.address.slice(0, 8)}...{wallet.address.slice(-6)}
                            </code>
                            <button className="p-1 text-dark-300 hover:text-white transition-colors">
                              <ClipboardDocumentIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-dark-300 text-sm mb-2">QR Code for Payments:</p>
                          <div className="bg-white p-2 rounded inline-block">
                            <img 
                              src={wallet.qrCode} 
                              alt={`${wallet.currency} QR Code`}
                              className="w-24 h-24"
                            />
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors">
                            View Transactions
                          </button>
                          <button className="px-3 py-2 text-dark-300 hover:text-white transition-colors">
                            <PencilIcon className="h-4 w-4" />
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
                    <div key={method.id} className="bg-dark-700 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-3">
                          {method.type === 'crypto' && <QrCodeIcon className="h-6 w-6 text-purple-500" />}
                          {method.type === 'bank' && <BanknotesIcon className="h-6 w-6 text-green-500" />}
                          {method.type === 'card' && <CreditCardIcon className="h-6 w-6 text-blue-500" />}
                          <div>
                            <h4 className="text-white font-medium">{method.name}</h4>
                            <p className="text-dark-300 text-sm">{method.details}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${method.isActive ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'}`}>
                          {method.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors">
                          {method.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button className="px-3 py-2 text-dark-300 hover:text-white transition-colors">
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button className="px-3 py-2 text-dark-300 hover:text-white transition-colors">
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
