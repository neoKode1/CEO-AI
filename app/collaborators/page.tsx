'use client'

import Sidebar from '@/components/Sidebar'
import HomeButton from '@/components/HomeButton'
import ClientManagement from '@/components/ClientManagement'
import { UserGroupIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function CollaboratorsPage() {
  const [activeTab, setActiveTab] = useState('collaborators')
  return (
    <div className="min-h-screen bg-black">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <HomeButton />

      <header className="bg-dark-900 border-b border-dark-800 ml-16 lg:ml-80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center space-x-3">
            <UserGroupIcon className="h-6 w-6 text-accent-500" />
            <h1 className="text-2xl font-bold gradient-text">Collaborators & Vendors</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 ml-16 lg:ml-80">
        <ClientManagement />
      </main>
    </div>
  )
}


