'use client'

import { useState } from 'react'
import { getUserProfile } from '@/lib/storage'
import {
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  PlusIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  LightBulbIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import logger from '@/lib/logger'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navigationItems = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: ChartBarIcon,
    description: 'Overview and analytics'
  },
  {
    id: 'agenda',
    name: 'Company Agenda',
    icon: CalendarIcon,
    description: 'Strategic priorities and timeline'
  },
  {
    id: 'plans',
    name: 'Plans & Execution',
    icon: DocumentTextIcon,
    description: 'Strategic and operational plans'
  },
  {
    id: 'clients',
    name: 'Clients',
    icon: UserGroupIcon,
    description: 'Client directory and projects'
  },
  {
    id: 'goals',
    name: 'Goals & Benchmarks',
    icon: LightBulbIcon,
    description: '3-6 month objectives and milestones'
  },
  {
    id: 'collaborators',
    name: 'Collaborators',
    icon: BuildingOfficeIcon,
    description: 'Collaborators, vendors, and partners'
  },
  {
    id: 'accounting',
    name: 'Accounting',
    icon: CurrencyDollarIcon,
    description: 'Financial tracking and invoicing'
  },
  {
    id: 'profile',
    name: 'Profile',
    icon: UserIcon,
    description: 'Personal settings and preferences'
  },
  {
    id: 'tax-forms',
    name: 'Tax Forms',
    icon: DocumentTextIcon,
    description: 'Tax forms and document management'
  }
  ,
  {
    id: 'documents',
    name: 'Documents',
    icon: DocumentTextIcon,
    description: 'Upload and manage business documents'
  },
  {
    id: 'contracts',
    name: 'Contracts',
    icon: DocumentTextIcon,
    description: 'Generate and store contracts'
  }
]

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const userProfile = getUserProfile()

  const toggleSidebar = () => {
    logger.trackUserAction('Sidebar', 'toggleSidebar', 'Toggle sidebar visibility', {
      currentState: isCollapsed,
      newState: !isCollapsed
    })
    setIsCollapsed(!isCollapsed)
  }

  const handleTabChange = (tabId: string) => {
    logger.trackNavigation('Sidebar', 'handleTabChange', activeTab, tabId, {
      previousTab: activeTab,
      newTab: tabId,
      isCollapsed
    })

    if (tabId === 'agenda') {
      // Navigate to dedicated agenda page
      logger.trackWorkflow('Sidebar', 'handleTabChange', 'Navigating to agenda page')
      window.location.href = '/agenda'
    } else if (tabId === 'dashboard') {
      // Navigate to main dashboard
      logger.trackWorkflow('Sidebar', 'handleTabChange', 'Navigating to dashboard page')
      window.location.href = '/dashboard'
    } else if (tabId === 'plans') {
      // Navigate to plans page
      logger.trackWorkflow('Sidebar', 'handleTabChange', 'Navigating to plans page')
      window.location.href = '/plans'
    } else if (tabId === 'clients') {
      // Navigate to clients page
      logger.trackWorkflow('Sidebar', 'handleTabChange', 'Navigating to clients page')
      window.location.href = '/clients'
    } else if (tabId === 'goals') {
      // Navigate to goals page
      logger.trackWorkflow('Sidebar', 'handleTabChange', 'Navigating to goals page')
      window.location.href = '/goals'
    } else if (tabId === 'collaborators') {
      // Navigate to collaborators page
      logger.trackWorkflow('Sidebar', 'handleTabChange', 'Navigating to collaborators page')
      window.location.href = '/collaborators'
    } else if (tabId === 'accounting') {
      // Navigate to accounting page
      logger.trackWorkflow('Sidebar', 'handleTabChange', 'Navigating to accounting page')
      window.location.href = '/accounting'
    } else if (tabId === 'profile') {
      // Navigate to profile page
      logger.trackWorkflow('Sidebar', 'handleTabChange', 'Navigating to profile page')
      window.location.href = '/profile'
    } else if (tabId === 'tax-forms') {
      // Navigate to tax forms page
      logger.trackWorkflow('Sidebar', 'handleTabChange', 'Navigating to tax forms page')
      window.location.href = '/tax-forms'
    } else if (tabId === 'documents') {
      // Navigate to documents page
      logger.trackWorkflow('Sidebar', 'handleTabChange', 'Navigating to documents page')
      window.location.href = '/documents'
    } else if (tabId === 'contracts') {
      // Navigate to contracts page
      logger.trackWorkflow('Sidebar', 'handleTabChange', 'Navigating to contracts page')
      window.location.href = '/contracts'
    } else {
      // For dashboard tabs, use the onTabChange callback
      // This ensures proper tab switching within the dashboard
      logger.trackWorkflow('Sidebar', 'handleTabChange', 'Switching dashboard tab', {
        tabId,
        method: 'onTabChange callback'
      })
      onTabChange(tabId)
    }
  }

  return (
    <>
             {/* Sidebar Toggle Button */}
       <button
         onClick={toggleSidebar}
         className="fixed top-4 left-16 z-50 p-2 bg-dark-800 rounded-lg border border-dark-700 text-white hover:bg-dark-700 transition-colors"
       >
        {isCollapsed ? (
          <Bars3Icon className="h-5 w-5" />
        ) : (
          <XMarkIcon className="h-5 w-5" />
        )}
      </button>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-dark-900 border-r border-dark-800 transition-all duration-300 z-40 ${
        isCollapsed ? 'w-16' : 'w-80'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-dark-800">
            {!isCollapsed && (
              <div className="flex items-start space-x-3">
                {userProfile?.profilePicture ? (
                  <img
                    src={userProfile.profilePicture}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center flex-shrink-0">
                    <UserIcon className="h-5 w-5 text-dark-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0 overflow-hidden">
                  <p className="text-white font-medium text-sm leading-tight mb-1 break-words">
                    {userProfile?.firstName ? `${userProfile.firstName} ${userProfile.lastName}` : 'User'}
                  </p>
                  <p className="text-dark-400 text-xs leading-tight break-words">
                    {userProfile?.companyName || 'Company'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              
              return (
                                         <button
                           key={item.id}
                           onClick={() => handleTabChange(item.id)}
                           className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                             isActive
                               ? 'bg-accent-500 text-white'
                               : 'text-dark-300 hover:bg-dark-800 hover:text-white'
                           }`}
                         >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <>
                      <div className="flex-1 text-left">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs opacity-75">{item.description}</p>
                      </div>
                      <ArrowRightIcon className="h-4 w-4" />
                    </>
                  )}
                </button>
              )
            })}
          </nav>

          {/* Quick Actions */}
          {!isCollapsed && (
            <div className="p-4 border-t border-dark-800">
              <h3 className="text-white font-medium mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => {
                    // Always navigate to dashboard with specific tab
                    window.location.href = '/dashboard?tab=plans'
                  }}
                  className="w-full flex items-center space-x-3 p-2 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
                >
                  <PlusIcon className="h-4 w-4" />
                  <span className="text-sm">New Plan</span>
                </button>
                <button 
                  onClick={() => {
                    window.location.href = '/collaborators'
                  }}
                  className="w-full flex items-center space-x-3 p-2 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
                >
                  <UserGroupIcon className="h-4 w-4" />
                  <span className="text-sm">Add Collaborator</span>
                </button>
                <button 
                  onClick={() => {
                    // Always navigate to dashboard with specific tab
                    window.location.href = '/dashboard?tab=accounting'
                  }}
                  className="w-full flex items-center space-x-3 p-2 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
                >
                  <CurrencyDollarIcon className="h-4 w-4" />
                  <span className="text-sm">New Invoice</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  )
}
