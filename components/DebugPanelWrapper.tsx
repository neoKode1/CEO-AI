'use client'

import { useState } from 'react'
import DebugPanel from './DebugPanel'
import { BugAntIcon } from '@heroicons/react/24/outline'

export default function DebugPanelWrapper() {
  const [isDebugVisible, setIsDebugVisible] = useState(false)

  const toggleDebug = () => {
    setIsDebugVisible(!isDebugVisible)
  }

  return (
    <>
      {/* Debug Toggle Button */}
      <button
        onClick={toggleDebug}
        className="fixed bottom-4 right-32 z-40 p-3 bg-dark-800 hover:bg-dark-700 border border-dark-600 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        title="Toggle Debug Panel"
      >
        <BugAntIcon className="h-6 w-6 text-accent-500" />
      </button>

      {/* Debug Panel */}
      <DebugPanel 
        isVisible={isDebugVisible} 
        onToggle={toggleDebug} 
      />
    </>
  )
}
