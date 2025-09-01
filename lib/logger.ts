// Comprehensive logging utility for CEO AI workflow tracking

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

export interface LogEntry {
  timestamp: string
  level: LogLevel
  component: string
  function: string
  message: string
  data?: any
  userId?: string
  sessionId?: string
}

class Logger {
  private logs: LogEntry[] = []
  private maxLogs = 1000 // Keep last 1000 logs in memory
  private isDevelopment = process.env.NODE_ENV === 'development'
  private isBrowser = false

  constructor() {
    // Check if we're in browser environment
    this.isBrowser = typeof window !== 'undefined'
    
    // Only load logs if in browser
    if (this.isBrowser) {
      this.loadLogs()
    }
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  private sessionId = this.generateSessionId()

  private formatTimestamp(): string {
    return new Date().toISOString()
  }

  private addLog(level: LogLevel, component: string, functionName: string, message: string, data?: any) {
    const logEntry: LogEntry = {
      timestamp: this.formatTimestamp(),
      level,
      component,
      function: functionName,
      message,
      data,
      sessionId: this.sessionId
    }

    this.logs.push(logEntry)

    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs)
    }

    // Console output for development
    if (this.isDevelopment) {
      const prefix = `[${logEntry.timestamp}] [${level}] [${component}.${functionName}]`
      switch (level) {
        case LogLevel.DEBUG:
          console.debug(prefix, message, data || '')
          break
        case LogLevel.INFO:
          console.info(prefix, message, data || '')
          break
        case LogLevel.WARN:
          console.warn(prefix, message, data || '')
          break
        case LogLevel.ERROR:
          console.error(prefix, message, data || '')
          break
      }
    }

    // Store in localStorage for persistence across sessions (only in browser)
    if (this.isBrowser) {
      try {
        localStorage.setItem('ceo-ai-logs', JSON.stringify(this.logs))
      } catch (error) {
        console.warn('Failed to save logs to localStorage:', error)
      }
    }
  }

  debug(component: string, functionName: string, message: string, data?: any) {
    this.addLog(LogLevel.DEBUG, component, functionName, message, data)
  }

  info(component: string, functionName: string, message: string, data?: any) {
    this.addLog(LogLevel.INFO, component, functionName, message, data)
  }

  warn(component: string, functionName: string, message: string, data?: any) {
    this.addLog(LogLevel.WARN, component, functionName, message, data)
  }

  error(component: string, functionName: string, message: string, data?: any) {
    this.addLog(LogLevel.ERROR, component, functionName, message, data)
  }

  // Workflow tracking methods
  trackWorkflow(component: string, functionName: string, workflowStep: string, data?: any) {
    this.info(component, functionName, `🔄 WORKFLOW: ${workflowStep}`, data)
  }

  trackNavigation(component: string, functionName: string, from: string, to: string, data?: any) {
    this.info(component, functionName, `🧭 NAVIGATION: ${from} → ${to}`, data)
  }

  trackUserAction(component: string, functionName: string, action: string, data?: any) {
    this.info(component, functionName, `👤 USER ACTION: ${action}`, data)
  }

  trackDataOperation(component: string, functionName: string, operation: string, data?: any) {
    this.info(component, functionName, `💾 DATA: ${operation}`, data)
  }

  trackAIInteraction(component: string, functionName: string, interaction: string, data?: any) {
    this.info(component, functionName, `🤖 AI: ${interaction}`, data)
  }

  // Get logs for debugging
  getLogs(level?: LogLevel, component?: string, limit?: number): LogEntry[] {
    let filteredLogs = this.logs

    if (level) {
      filteredLogs = filteredLogs.filter(log => log.level === level)
    }

    if (component) {
      filteredLogs = filteredLogs.filter(log => log.component === component)
    }

    if (limit) {
      filteredLogs = filteredLogs.slice(-limit)
    }

    return filteredLogs
  }

  // Export logs for debugging
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2)
  }

  // Clear logs
  clearLogs() {
    this.logs = []
    if (this.isBrowser) {
      try {
        localStorage.removeItem('ceo-ai-logs')
      } catch (error) {
        console.warn('Failed to clear logs from localStorage:', error)
      }
    }
  }

  // Load logs from localStorage on initialization
  loadLogs() {
    if (!this.isBrowser) return
    
    try {
      const savedLogs = localStorage.getItem('ceo-ai-logs')
      if (savedLogs) {
        this.logs = JSON.parse(savedLogs)
        this.info('Logger', 'loadLogs', `Loaded ${this.logs.length} saved logs`)
      }
    } catch (error) {
      console.warn('Failed to load logs from localStorage:', error)
    }
  }
}

// Initialize logger
const logger = new Logger()

export default logger
