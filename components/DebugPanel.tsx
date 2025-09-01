'use client'

import { useState, useEffect } from 'react'
import logger, { LogLevel } from '@/lib/logger'
import { 
  BugAntIcon, 
  TrashIcon, 
  DocumentArrowDownIcon,
  EyeIcon,
  EyeSlashIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'

interface DebugPanelProps {
  isVisible: boolean
  onToggle: () => void
}

export default function DebugPanel({ isVisible, onToggle }: DebugPanelProps) {
  const [logs, setLogs] = useState<any[]>([])
  const [filterLevel, setFilterLevel] = useState<LogLevel | 'ALL'>('ALL')
  const [filterComponent, setFilterComponent] = useState<string>('ALL')
  const [autoRefresh, setAutoRefresh] = useState(true)

  useEffect(() => {
    if (isVisible) {
      refreshLogs()
      
      if (autoRefresh) {
        const interval = setInterval(refreshLogs, 2000) // Refresh every 2 seconds
        return () => clearInterval(interval)
      }
    }
  }, [isVisible, autoRefresh, filterLevel, filterComponent])

  const refreshLogs = () => {
    let filteredLogs = logger.getLogs()
    
    if (filterLevel !== 'ALL') {
      filteredLogs = filteredLogs.filter(log => log.level === filterLevel)
    }
    
    if (filterComponent !== 'ALL') {
      filteredLogs = filteredLogs.filter(log => log.component === filterComponent)
    }
    
    setLogs(filteredLogs.slice(-100)) // Show last 100 logs
  }

  const clearLogs = () => {
    logger.clearLogs()
    setLogs([])
  }

  const exportLogs = () => {
    const logData = logger.exportLogs()
    const blob = new Blob([logData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ceo-ai-logs-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getLevelColor = (level: LogLevel) => {
    switch (level) {
      case LogLevel.DEBUG: return 'text-gray-400'
      case LogLevel.INFO: return 'text-blue-400'
      case LogLevel.WARN: return 'text-yellow-400'
      case LogLevel.ERROR: return 'text-red-400'
      default: return 'text-white'
    }
  }

  const getComponentList = () => {
    const components = new Set(logs.map(log => log.component))
    return Array.from(components).sort()
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 w-96 h-96 bg-dark-900 border border-dark-700 rounded-lg shadow-2xl z-50">
      <div className="flex items-center justify-between p-3 border-b border-dark-700">
        <div className="flex items-center space-x-2">
          <BugAntIcon className="h-5 w-5 text-accent-500" />
          <h3 className="text-white font-medium">Debug Panel</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`p-1 rounded ${autoRefresh ? 'text-accent-500' : 'text-dark-400'}`}
            title={autoRefresh ? 'Auto-refresh enabled' : 'Auto-refresh disabled'}
          >
            {autoRefresh ? <EyeIcon className="h-4 w-4" /> : <EyeSlashIcon className="h-4 w-4" />}
          </button>
          <button
            onClick={onToggle}
            className="text-dark-400 hover:text-white"
            title="Close debug panel"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="p-3 border-b border-dark-700 space-y-2">
        <div className="flex items-center space-x-2">
          <FunnelIcon className="h-4 w-4 text-dark-400" />
          <span className="text-xs text-dark-400">Filters:</span>
        </div>
        <div className="flex space-x-2">
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value as LogLevel | 'ALL')}
            className="px-2 py-1 text-xs bg-dark-800 border border-dark-600 rounded text-white"
          >
            <option value="ALL">All Levels</option>
            <option value={LogLevel.DEBUG}>Debug</option>
            <option value={LogLevel.INFO}>Info</option>
            <option value={LogLevel.WARN}>Warn</option>
            <option value={LogLevel.ERROR}>Error</option>
          </select>
          <select
            value={filterComponent}
            onChange={(e) => setFilterComponent(e.target.value)}
            className="px-2 py-1 text-xs bg-dark-800 border border-dark-600 rounded text-white"
          >
            <option value="ALL">All Components</option>
            {getComponentList().map(component => (
              <option key={component} value={component}>{component}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="p-3 border-b border-dark-700 flex space-x-2">
        <button
          onClick={refreshLogs}
          className="px-3 py-1 text-xs bg-dark-800 hover:bg-dark-700 text-white rounded transition-colors"
        >
          Refresh
        </button>
        <button
          onClick={clearLogs}
          className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded transition-colors flex items-center space-x-1"
        >
          <TrashIcon className="h-3 w-3" />
          Clear
        </button>
        <button
          onClick={exportLogs}
          className="px-3 py-1 text-xs bg-accent-600 hover:bg-accent-700 text-white rounded transition-colors flex items-center space-x-1"
        >
          <DocumentArrowDownIcon className="h-3 w-3" />
          Export
        </button>
      </div>

      {/* Logs */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-2">
          {logs.length === 0 ? (
            <p className="text-dark-400 text-center text-sm py-8">No logs to display</p>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="text-xs bg-dark-800 p-2 rounded border-l-2 border-accent-500">
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-mono ${getLevelColor(log.level)}`}>
                    [{log.level}]
                  </span>
                  <span className="text-dark-400">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="text-white font-medium mb-1">
                  {log.component}.{log.function}
                </div>
                <div className="text-dark-300 mb-1">
                  {log.message}
                </div>
                {log.data && (
                  <details className="text-dark-400">
                    <summary className="cursor-pointer hover:text-white">Data</summary>
                    <pre className="mt-1 text-xs overflow-x-auto">
                      {JSON.stringify(log.data, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Status */}
      <div className="p-2 border-t border-dark-700 text-xs text-dark-400 text-center">
        {logs.length} logs • Session: {logs[0]?.sessionId?.slice(0, 8) || 'N/A'}
      </div>
    </div>
  )
}
