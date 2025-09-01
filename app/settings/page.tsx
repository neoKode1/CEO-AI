'use client'

import { useState, useEffect } from 'react'
import HomeButton from '@/components/HomeButton'
import Sidebar from '@/components/Sidebar'
import { 
  CogIcon,
  ShieldCheckIcon,
  BellIcon,
  UserIcon,
  KeyIcon,
  GlobeAltIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

// Mock settings data
const aiCeoSettings = {
  authorityLevel: 'phase-1',
  decisionThreshold: 200,
  notificationFrequency: 'daily',
  autoApproval: false,
  riskTolerance: 'conservative',
  learningMode: true
}

const systemSettings = {
  theme: 'dark',
  language: 'en',
  timezone: 'America/Los_Angeles',
  dateFormat: 'MM/DD/YYYY',
  currency: 'USD',
  notifications: {
    email: true,
    push: true,
    sms: false
  }
}

const securitySettings = {
  twoFactorAuth: true,
  sessionTimeout: 30,
  passwordExpiry: 90,
  loginAttempts: 5,
  ipWhitelist: ['192.168.1.1', '10.0.0.1']
}

const integrations = [
  { name: 'OpenAI API', status: 'connected', lastSync: '2024-01-15 14:30' },
  { name: 'Zapier', status: 'connected', lastSync: '2024-01-15 12:15' },
  { name: 'Discord', status: 'connected', lastSync: '2024-01-15 10:45' },
  { name: 'Google Analytics', status: 'disconnected', lastSync: 'Never' },
  { name: 'HubSpot CRM', status: 'pending', lastSync: '2024-01-14 16:20' }
]

const backupSettings = {
  autoBackup: true,
  backupFrequency: 'daily',
  retentionPeriod: 30,
  lastBackup: '2024-01-15 02:00',
  nextBackup: '2024-01-16 02:00',
  storageUsed: '2.4 GB',
  totalStorage: '10 GB'
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('ai-ceo')
  const [showApiKeyModal, setShowApiKeyModal] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-900 text-green-300'
      case 'disconnected': return 'bg-red-900 text-red-300'
      case 'pending': return 'bg-yellow-900 text-yellow-300'
      default: return 'bg-dark-700 text-dark-300'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircleIcon className="h-4 w-4 text-green-500" />
      case 'disconnected': return <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
      case 'pending': return <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500" />
      default: return <ExclamationTriangleIcon className="h-4 w-4 text-gray-500" />
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
              <h1 className="text-2xl font-bold gradient-text">Settings</h1>
              <div className="flex items-center space-x-2">
                <CogIcon className="h-5 w-5 text-accent-500" />
                <span className="text-sm text-dark-400">System Configuration</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 ml-16 lg:ml-80">
        {/* Tabs */}
        <div className="flex space-x-1 bg-dark-800 rounded-lg p-1 mb-8">
          <button
            onClick={() => setActiveTab('ai-ceo')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'ai-ceo'
                ? 'bg-accent-600 text-white'
                : 'text-dark-300 hover:text-white'
            }`}
          >
            AI CEO
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'system'
                ? 'bg-accent-600 text-white'
                : 'text-dark-300 hover:text-white'
            }`}
          >
            System
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'security'
                ? 'bg-accent-600 text-white'
                : 'text-dark-300 hover:text-white'
            }`}
          >
            Security
          </button>
          <button
            onClick={() => setActiveTab('integrations')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'integrations'
                ? 'bg-accent-600 text-white'
                : 'text-dark-300 hover:text-white'
            }`}
          >
            Integrations
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'backup'
                ? 'bg-accent-600 text-white'
                : 'text-dark-300 hover:text-white'
            }`}
          >
            Backup
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'ai-ceo' && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">AI CEO Configuration</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Authority Level
                  </label>
                  <select className="input-field w-full">
                    <option value="phase-1">Phase 1 - Limited Autonomy</option>
                    <option value="phase-2">Phase 2 - Enhanced Autonomy</option>
                    <option value="phase-3">Phase 3 - Full Autonomy</option>
                  </select>
                  <p className="text-dark-400 text-sm mt-1">Current: Phase 1 - Expenses under $200, routine operations</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Decision Threshold ($)
                  </label>
                  <input 
                    type="number" 
                    className="input-field w-full"
                    defaultValue={aiCeoSettings.decisionThreshold}
                  />
                  <p className="text-dark-400 text-sm mt-1">Amount above which decisions require human approval</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Notification Frequency
                  </label>
                  <select className="input-field w-full">
                    <option value="realtime">Real-time</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-dark-300">Auto-Approval</label>
                    <p className="text-dark-400 text-sm">Allow AI to approve decisions within threshold</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={aiCeoSettings.autoApproval} />
                    <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Risk Tolerance
                  </label>
                  <select className="input-field w-full">
                    <option value="conservative">Conservative</option>
                    <option value="moderate">Moderate</option>
                    <option value="aggressive">Aggressive</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-dark-300">Learning Mode</label>
                    <p className="text-dark-400 text-sm">Allow AI to learn from decisions and improve</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={aiCeoSettings.learningMode} />
                    <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">System Preferences</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Theme
                  </label>
                  <select className="input-field w-full">
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Language
                  </label>
                  <select className="input-field w-full">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Timezone
                  </label>
                  <select className="input-field w-full">
                    <option value="America/Los_Angeles">Pacific Time</option>
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Date Format
                  </label>
                  <select className="input-field w-full">
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Currency
                  </label>
                  <select className="input-field w-full">
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="CAD">CAD (C$)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-dark-300">Email Notifications</label>
                    <p className="text-dark-400 text-sm">Receive notifications via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={systemSettings.notifications.email} />
                    <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-dark-300">Push Notifications</label>
                    <p className="text-dark-400 text-sm">Receive push notifications in browser</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={systemSettings.notifications.push} />
                    <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-dark-300">SMS Notifications</label>
                    <p className="text-dark-400 text-sm">Receive notifications via SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={systemSettings.notifications.sms} />
                    <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Security Settings</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-dark-300">Two-Factor Authentication</label>
                    <p className="text-dark-400 text-sm">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={securitySettings.twoFactorAuth} />
                    <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Session Timeout (minutes)
                  </label>
                  <input 
                    type="number" 
                    className="input-field w-full"
                    defaultValue={securitySettings.sessionTimeout}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Password Expiry (days)
                  </label>
                  <input 
                    type="number" 
                    className="input-field w-full"
                    defaultValue={securitySettings.passwordExpiry}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Max Login Attempts
                  </label>
                  <input 
                    type="number" 
                    className="input-field w-full"
                    defaultValue={securitySettings.loginAttempts}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    IP Whitelist
                  </label>
                  <textarea 
                    className="input-field w-full h-20 resize-none"
                    defaultValue={securitySettings.ipWhitelist.join('\n')}
                    placeholder="Enter IP addresses (one per line)"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">API Integrations</h3>
              <div className="space-y-4">
                {integrations.map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between p-4 bg-dark-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(integration.status)}
                      <div>
                        <p className="text-white font-medium">{integration.name}</p>
                        <p className="text-dark-400 text-sm">Last sync: {integration.lastSync}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(integration.status)}`}>
                        {integration.status}
                      </span>
                      <button className="btn-secondary text-sm">Configure</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">API Keys</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-dark-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <KeyIcon className="h-5 w-5 text-accent-500" />
                    <div>
                      <p className="text-white font-medium">OpenAI API Key</p>
                      <p className="text-dark-400 text-sm">Used for AI content generation</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowApiKeyModal(true)}
                    className="btn-primary text-sm"
                  >
                    Manage
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-dark-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <KeyIcon className="h-5 w-5 text-accent-500" />
                    <div>
                      <p className="text-white font-medium">Zapier Webhook</p>
                      <p className="text-dark-400 text-sm">Used for automation workflows</p>
                    </div>
                  </div>
                  <button className="btn-secondary text-sm">Configure</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'backup' && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Backup Settings</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-dark-300">Auto Backup</label>
                    <p className="text-dark-400 text-sm">Automatically backup data</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={backupSettings.autoBackup} />
                    <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Backup Frequency
                  </label>
                  <select className="input-field w-full">
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Retention Period (days)
                  </label>
                  <input 
                    type="number" 
                    className="input-field w-full"
                    defaultValue={backupSettings.retentionPeriod}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-dark-800 rounded-lg">
                    <p className="text-sm text-dark-400">Last Backup</p>
                    <p className="text-white font-medium">{backupSettings.lastBackup}</p>
                  </div>
                  <div className="p-4 bg-dark-800 rounded-lg">
                    <p className="text-sm text-dark-400">Next Backup</p>
                    <p className="text-white font-medium">{backupSettings.nextBackup}</p>
                  </div>
                </div>

                <div className="p-4 bg-dark-800 rounded-lg">
                  <p className="text-sm text-dark-400 mb-2">Storage Usage</p>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 bg-dark-700 rounded-full h-2">
                      <div 
                        className="bg-accent-500 h-2 rounded-full" 
                        style={{ width: `${(parseFloat(backupSettings.storageUsed) / parseFloat(backupSettings.totalStorage)) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-white text-sm">
                      {backupSettings.storageUsed} / {backupSettings.totalStorage}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="btn-primary">Create Manual Backup</button>
                  <button className="btn-secondary">Restore from Backup</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* API Key Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-dark-900 border border-dark-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">Manage API Keys</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  OpenAI API Key
                </label>
                <input 
                  type="password" 
                  className="input-field w-full"
                  placeholder="sk-..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Anthropic API Key
                </label>
                <input 
                  type="password" 
                  className="input-field w-full"
                  placeholder="sk-ant-..."
                />
              </div>
              <div className="flex space-x-3">
                <button 
                  type="button"
                  onClick={() => setShowApiKeyModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="btn-primary flex-1"
                >
                  Save Keys
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
