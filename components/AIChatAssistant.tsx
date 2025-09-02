'use client'

import { useState, useRef, useEffect } from 'react'
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon, MicrophoneIcon } from '@heroicons/react/24/outline'
import { 
  getContacts, 
  getBusinessPlans, 
  getFinancialRecords, 
  getOnboardingData,
  getUserProfile 
} from '@/lib/storage'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  navigateTo?: string
  navigationCompleted?: boolean
  navigationMessage?: string
}

interface AIChatAssistantProps {
  className?: string
}

const AIChatAssistant = ({ className = '' }: AIChatAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your CEO AI Assistant. I can analyze your business data, answer questions about clients, projects, finances, and help you navigate to relevant information. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<any>(null)
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Try standard SpeechRecognition first, then webkit fallback
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      
      if (SpeechRecognition) {
        console.log('🎤 Speech recognition available, initializing...')
        recognitionRef.current = new SpeechRecognition()
        
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = 'en-US'
        
        recognitionRef.current.onresult = (event: any) => {
          console.log('🎤 Speech recognition result:', event.results[0][0].transcript)
          const transcript = event.results[0][0].transcript
          setTranscript(transcript)
          handleVoiceCommand(transcript)
        }
        
        recognitionRef.current.onerror = (event: any) => {
          console.error('🎤 Speech recognition error:', event.error)
          setIsListening(false)
        }
        
        recognitionRef.current.onend = () => {
          console.log('🎤 Speech recognition ended')
          setIsListening(false)
        }
        
        recognitionRef.current.onstart = () => {
          console.log('🎤 Speech recognition started')
        }
        
        console.log('🎤 Speech recognition initialized successfully')
      } else {
        console.error('🎤 Speech recognition not supported in this browser')
        alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.')
      }
    }
  }, [])

  // Toggle voice recognition
  const toggleListening = () => {
    console.log('🎤 Toggle listening clicked, current state:', isListening)
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  // Start voice recognition
  const startListening = async () => {
    console.log('🎤 Starting voice recognition...')
    
    // Check microphone permissions first
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach(track => track.stop()) // Stop the stream immediately
      console.log('🎤 Microphone permission granted')
    } catch (error) {
      console.error('🎤 Microphone permission denied:', error)
      alert('Please allow microphone access to use voice recognition')
      return
    }
    
    if (!recognitionRef.current) {
      console.error('🎤 No recognition ref available')
      return
    }
    
    try {
      recognitionRef.current.start()
      setIsListening(true)
      setTranscript('')
      console.log('🎤 Voice recognition started successfully')
    } catch (error) {
      console.error('🎤 Error starting voice recognition:', error)
    }
  }

  // Stop voice recognition
  const stopListening = () => {
    if (!recognitionRef.current) return
    
    try {
      recognitionRef.current.stop()
      setIsListening(false)
    } catch (error) {
      console.error('Error stopping voice recognition:', error)
    }
  }

  // Speak response using text-to-speech
  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)
      
      synthesisRef.current = utterance
      window.speechSynthesis.speak(utterance)
    }
  }

  // CEO-level strategic analysis and insights
  const generateCEOInsights = (contacts: any[], projects: any[], financialRecords: any[], businessPlans: any[]) => {
    const insights: string[] = []
    
    // Revenue analysis and trends
    const totalRevenue = financialRecords.filter(r => r.type === 'income').reduce((sum: number, r: any) => sum + r.amount, 0)
    const totalExpenses = financialRecords.filter(r => r.type === 'expense').reduce((sum: number, r: any) => sum + r.amount, 0)
    const profitMargin = totalRevenue > 0 ? ((totalRevenue - totalExpenses) / totalRevenue * 100).toFixed(1) : '0'
    
    if (totalRevenue > 0) {
      const marginNum = parseFloat(profitMargin)
      insights.push(`💰 **Financial Health**: Your profit margin is ${profitMargin}%. ${marginNum > 20 ? 'Excellent profitability!' : marginNum > 10 ? 'Good profitability, consider cost optimization.' : 'Focus on increasing revenue or reducing costs.'}`)
    }
    
    // Client concentration risk
    const totalProjectValue = projects.reduce((sum: number, p: any) => sum + p.projectValue, 0)
    if (contacts.length > 0) {
      const topClient = contacts.reduce((max: { name: string; value: number }, contact: any) => {
        const clientValue = contact.projects.reduce((sum: number, p: any) => sum + p.projectValue, 0)
        return clientValue > max.value ? { name: contact.name, value: clientValue } : max
      }, { name: '', value: 0 })
      
      const concentrationRisk = (topClient.value / totalProjectValue * 100).toFixed(1)
      if (parseFloat(concentrationRisk) > 50) {
        insights.push(`⚠️ **Client Concentration Risk**: ${topClient.name} represents ${concentrationRisk}% of your project value. Consider diversifying your client base.`)
      }
    }
    
    // Project pipeline health
    const activeProjects = projects.filter(p => p.status === 'in-progress')
    const completedProjects = projects.filter(p => p.status === 'completed')
    const completionRate = projects.length > 0 ? (completedProjects.length / projects.length * 100).toFixed(1) : '0'
    
    insights.push(`📊 **Project Pipeline**: ${completionRate}% completion rate with ${activeProjects.length} active projects. ${activeProjects.length < 3 ? 'Consider expanding your project pipeline.' : 'Good project flow maintained.'}`)
    
    // Cash flow analysis
    const totalCollected = projects.reduce((sum: number, p: any) => sum + p.amountCollected, 0)
    const outstandingAmount = totalProjectValue - totalCollected
    const collectionRate = totalProjectValue > 0 ? (totalCollected / totalProjectValue * 100).toFixed(1) : '0'
    
    if (outstandingAmount > 0) {
      insights.push(`💳 **Cash Flow**: ${collectionRate}% collection rate. Outstanding amount: $${outstandingAmount.toLocaleString()}. Focus on improving payment collection.`)
    }
    
    // Strategic recommendations
    if (businessPlans.filter(p => p.status === 'active').length === 0) {
      insights.push(`🎯 **Strategic Planning**: No active business plans detected. Consider developing a strategic roadmap for the next 6-12 months.`)
    }
    
    if (contacts.length < 5) {
      insights.push(`🤝 **Business Development**: Limited client base (${contacts.length} clients). Focus on networking and client acquisition strategies.`)
    }
    
    return insights
  }

  // Lightweight intent classification to guide responses and navigation
  type AssistantIntent = 'navigation' | 'data_query' | 'app_info' | 'smalltalk' | 'unknown'

  const classifyIntent = (message: string): AssistantIntent => {
    const m = message.toLowerCase().trim()
    if (!m) return 'unknown'

    // Clear navigation verbs + targets
    const navVerbs = ['navigate to', 'take me to', 'go to', 'open', 'view', 'show me']
    const pages = ['agenda', 'dashboard', 'plans', 'goals', 'clients', 'network', 'collaborators', 'vendors', 'accounting', 'profile', 'tax', 'team', 'projects', 'communications', 'marketing', 'funding', 'budget']
    const isNavVerb = navVerbs.some(v => m.includes(v))
    const mentionsPage = pages.some(p => m.includes(p))
    if (isNavVerb && mentionsPage) return 'navigation'

    // Data queries
    const dataMarkers = ['how many', 'what is', 'list', 'count', 'revenue', 'income', 'expenses', 'clients', 'projects', 'overdue', 'high priority', 'budget', 'analytics']
    if (dataMarkers.some(w => m.includes(w))) return 'data_query'

    // App info / help
    if (m.includes('help') || m.includes('what can') || m.includes('how do i') || m.includes('features') || m.includes('where can i')) return 'app_info'

    // Small talk
    const smallTalk = ['hello', 'hi', 'hey', 'thank', 'how are you', 'good morning', 'good evening']
    if (smallTalk.some(w => m.includes(w))) return 'smalltalk'

    // Fallback
    return 'unknown'
  }

  // Determine probable navigation target and confidence
  const determineNavigationTarget = (message: string): { route?: string; label?: string; confidence: number } => {
    const m = message.toLowerCase()
    const candidates: Array<{ test: boolean; route: string; label: string }> = [
      { test: m.includes('agenda'), route: '/agenda', label: 'Company Agenda' },
      { test: m.includes('dashboard') || m.includes('home') || m.includes('main'), route: '/dashboard', label: 'Dashboard' },
      { test: m.includes('plan'), route: '/plans', label: 'Plans & Execution' },
      { test: m.includes('goal') || m.includes('benchmark') || m.includes('milestone'), route: '/goals', label: 'Goals & Benchmarks' },
      { test: m.includes('client'), route: '/clients', label: 'Clients' },
      { test: m.includes('collaborator') || m.includes('vendor') || m.includes('network') || m.includes('contacts') || m.includes('people'), route: '/collaborators', label: 'Collaborators & Vendors' },
      { test: m.includes('accounting') || m.includes('invoice') || m.includes('payment'), route: '/accounting', label: 'Accounting' },
      { test: m.includes('profile') || m.includes('settings'), route: '/profile', label: 'Profile' },
      { test: m.includes('tax'), route: '/tax-forms', label: 'Tax Forms' },
      { test: m.includes('team'), route: '/team', label: 'Team' },
      { test: m.includes('project'), route: '/projects', label: 'Projects' },
      { test: m.includes('communication'), route: '/communications', label: 'Communications' },
      { test: m.includes('marketing'), route: '/marketing', label: 'Marketing' },
      { test: m.includes('funding') || m.includes('investment'), route: '/funding', label: 'Funding' },
      { test: m.includes('budget'), route: '/budget', label: 'Budget' }
    ]
    const match = candidates.find(c => c.test)
    if (!match) return { confidence: 0 }

    // Confidence: boost when nav verbs present
    const navVerbs = ['navigate to', 'take me to', 'go to', 'open', 'view', 'show me']
    const hasVerb = navVerbs.some(v => m.includes(v))
    return { route: match.route, label: match.label, confidence: hasVerb ? 0.95 : 0.6 }
  }

  // Handle voice commands
  const handleVoiceCommand = async (command: string) => {
    console.log('🎤 Voice command received:', command)
    
    // Add user's voice command to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      text: `🎤 "${command}"`,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    
    // Open chat to show the conversation
    setIsOpen(true)
    
    // Process the command
    setIsLoading(true)
    
    try {
      const aiResponse = await generateAIResponse(command)
      console.log('🤖 Voice command AI Response received:', aiResponse)
      
      const newAIMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.message,
        isUser: false,
        timestamp: new Date(),
        navigateTo: aiResponse.navigateTo
      }

      setMessages(prev => [...prev, newAIMessage])

      // Speak the response if it's a simple answer
      if (aiResponse.message.length < 200 && !aiResponse.navigateTo) {
        // speakResponse(aiResponse.message) // This function is not defined in the original file
      }

      // Navigate if the AI response includes navigation
      if (aiResponse.navigateTo) {
        console.log('🧭 Navigation triggered to:', aiResponse.navigateTo)
        const navigateTo = aiResponse.navigateTo
        setTimeout(() => {
          // Show navigation notification
          const notification = document.createElement('div')
          notification.className = 'fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-[60] animate-in slide-in-from-right'
          notification.textContent = 'Navigating to requested page...'
          document.body.appendChild(notification)

          // Remove notification after 3 seconds
          setTimeout(() => {
            notification.remove()
          }, 3000)

          // Navigate to the page
          console.log('🧭 Executing navigation to:', navigateTo)
          window.location.href = navigateTo
        }, 1000)
      }
    } catch (error) {
      console.error('Error generating AI response:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I encountered an error while processing your request. Please try again or ask a different question.",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Enhanced AI response function that analyzes actual data
  const generateAIResponse = async (userMessage: string): Promise<{ message: string; navigateTo?: string }> => {
    console.log('🤖 Generating AI response for:', userMessage)
    
    // Get all available data
    const contacts = getContacts()
    const projects = contacts.flatMap(contact => contact.projects)
    const financialRecords = getFinancialRecords()
    const businessPlans = getBusinessPlans()
    const onboardingData = getOnboardingData()
    const userProfile = getUserProfile()

    const lowerMessage = userMessage.toLowerCase()
    console.log('🤖 Lowercase message:', lowerMessage)

    // First, classify intent and decide strategy
    const intent = classifyIntent(userMessage)
    const navGuess = determineNavigationTarget(userMessage)

    // Handle small talk more conversationally
    if (intent === 'smalltalk') {
      if (lowerMessage.includes('thank')) {
        return { message: "You're welcome! If you want, I can also pull up your dashboard or a specific area." }
      }
      return { message: "Hi! I’m here to help with insights, navigation, and your data. What would you like to do?" }
    }

    // Provide app info in a friendly way
    if (intent === 'app_info') {
      return {
        message: "I can do three things for you: 1) Navigate anywhere in the app, 2) Answer questions about your data (revenue, clients, deadlines), and 3) Explain features or how-tos. Tell me something like ‘navigate to clients’, ‘what’s my total revenue?’, or ‘how do I add a collaborator?’."
      }
    }

    // Fast-path: confident navigation
    if (intent === 'navigation' && navGuess.route && navGuess.confidence >= 0.9) {
      return { message: `Navigating to ${navGuess.label}...`, navigateTo: navGuess.route }
    }

    // Ambiguous navigation mention → confirm rather than auto-navigate
    if (navGuess.route && navGuess.confidence > 0 && navGuess.confidence < 0.9) {
      return { message: `Do you want me to open ${navGuess.label}, or would you like a quick summary first? Say “open ${navGuess.label}” or “summary”.` }
    }

    // CEO-level strategic analysis requests
    if (lowerMessage.includes('strategy') || lowerMessage.includes('strategic') || lowerMessage.includes('insights') ||
        lowerMessage.includes('analysis') || lowerMessage.includes('overview') || lowerMessage.includes('summary') ||
        lowerMessage.includes('ceo') || lowerMessage.includes('executive') || lowerMessage.includes('business health')) {
      
      const insights = generateCEOInsights(contacts, projects, financialRecords, businessPlans)
      const companyName = userProfile?.companyName || 'Your Business'
      const industry = onboardingData?.industry || 'General'
      
      let response = `🏢 **CEO Executive Summary - ${companyName}**\n🏷️ **Industry**: ${industry}\n\n`
      
      // Key metrics
      const totalRevenue = financialRecords.filter(r => r.type === 'income').reduce((sum, r) => sum + r.amount, 0)
      const totalClients = contacts.length
      const activeProjects = projects.filter(p => p.status === 'in-progress').length
      
      response += `📊 **Key Metrics**:\n• Total Revenue: $${totalRevenue.toLocaleString()}\n• Active Clients: ${totalClients}\n• Active Projects: ${activeProjects}\n\n`
      
      // Strategic insights
      response += `🎯 **Strategic Insights**:\n${insights.map((insight: string) => `• ${insight}`).join('\n')}\n\n`
      
      response += `Would you like me to dive deeper into any specific area or show you detailed analytics?`
      
      return {
        message: response,
        navigateTo: '/dashboard'
      }
    }

    // Revenue and financial analysis (data query intent)
    if (lowerMessage.includes('revenue') || lowerMessage.includes('income') || lowerMessage.includes('earned')) {
      const totalRevenue = financialRecords
        .filter(record => record.type === 'income')
        .reduce((sum, record) => sum + record.amount, 0)
      
      const totalCollected = projects.reduce((sum, project) => sum + project.amountCollected, 0)
      const totalOutstanding = projects.reduce((sum, project) => sum + (project.projectValue - project.amountCollected), 0)
      
      return {
        message: `Based on your data:\n\n💰 **Total Revenue**: $${totalRevenue.toLocaleString()}\n💳 **Amount Collected**: $${totalCollected.toLocaleString()}\n⏳ **Outstanding**: $${totalOutstanding.toLocaleString()}\n\nWould you like me to show you detailed financial breakdowns?`,
        navigateTo: '/accounting'
      }
    }

    // Client and project analysis
    if ((lowerMessage.includes('client') || lowerMessage.includes('customer')) || lowerMessage.includes('project')) {
      const totalClients = contacts.length
      const activeProjects = projects.filter(p => p.status === 'in-progress').length
      const completedProjects = projects.filter(p => p.status === 'completed').length
      const totalProjectValue = projects.reduce((sum, p) => sum + p.projectValue, 0)
      
      return {
        message: `📊 **Client & Project Overview**:\n\n👥 **Total Clients**: ${totalClients}\n🚀 **Active Projects**: ${activeProjects}\n✅ **Completed Projects**: ${completedProjects}\n💵 **Total Project Value**: $${totalProjectValue.toLocaleString()}\n\nI can show you detailed client information or specific project statuses.`,
        navigateTo: lowerMessage.includes('client') || lowerMessage.includes('customer') ? '/clients' : '/collaborators'
      }
    }

    // Enhanced client and project recognition with natural language variations
    if (lowerMessage.includes('client') || lowerMessage.includes('clients') || 
        lowerMessage.includes('client list') || lowerMessage.includes('client list') ||
        lowerMessage.includes('customer') || lowerMessage.includes('customers') ||
        lowerMessage.includes('contact') || lowerMessage.includes('contacts') ||
        lowerMessage.includes('network') || lowerMessage.includes('people')) {
      
      const totalClients = contacts.length
      const activeProjects = projects.filter(p => p.status === 'in-progress').length
      const completedProjects = projects.filter(p => p.status === 'completed').length
      const totalProjectValue = projects.reduce((sum, p) => sum + p.projectValue, 0)
      
      return {
        message: `📊 **Client & Network Overview**:\n\n👥 **Total Clients**: ${totalClients}\n🚀 **Active Projects**: ${activeProjects}\n✅ **Completed Projects**: ${completedProjects}\n💵 **Total Project Value**: $${totalProjectValue.toLocaleString()}\n\nI can show you detailed client information, contact details, and project statuses.`,
        navigateTo: (lowerMessage.includes('client') || lowerMessage.includes('clients') || lowerMessage.includes('customer') || lowerMessage.includes('customers')) ? '/clients' : '/collaborators'
      }
    }

    // Enhanced project recognition with natural language variations
    if (lowerMessage.includes('project') || lowerMessage.includes('projects') || 
        lowerMessage.includes('all my projects') || lowerMessage.includes('my projects') ||
        lowerMessage.includes('work') || lowerMessage.includes('jobs') ||
        lowerMessage.includes('tasks') || lowerMessage.includes('assignments')) {
      
      const totalProjects = projects.length
      const activeProjects = projects.filter(p => p.status === 'in-progress').length
      const completedProjects = projects.filter(p => p.status === 'completed').length
      const onHoldProjects = projects.filter(p => p.status === 'on-hold').length
      const totalProjectValue = projects.reduce((sum, p) => sum + p.projectValue, 0)
      const totalCollected = projects.reduce((sum, p) => sum + p.amountCollected, 0)
      
      let response = `🚀 **Project Overview**:\n\n📊 **Total Projects**: ${totalProjects}\n🔄 **Active**: ${activeProjects}\n✅ **Completed**: ${completedProjects}\n⏸️ **On Hold**: ${onHoldProjects}\n💵 **Total Value**: $${totalProjectValue.toLocaleString()}\n💰 **Amount Collected**: $${totalCollected.toLocaleString()}\n\n`
      
      // If asking about all projects, show breakdown by client
      if (lowerMessage.includes('all') || lowerMessage.includes('my projects')) {
        const projectsByClient = contacts.map(contact => ({
          clientName: contact.name,
          projectCount: contact.projects.length,
          activeCount: contact.projects.filter(p => p.status === 'in-progress').length
        })).filter(client => client.projectCount > 0)
        
        if (projectsByClient.length > 0) {
          response += `**Projects by Client**:\n`
          projectsByClient.forEach(client => {
            response += `• ${client.clientName}: ${client.projectCount} projects (${client.activeCount} active)\n`
          })
        }
      }
      
      response += `\nI can show you detailed project information organized by client.`
      
      return {
        message: response,
        navigateTo: '/collaborators'
      }
    }

    // High priority agenda items
    if (lowerMessage.includes('high priority') || lowerMessage.includes('urgent') || lowerMessage.includes('important')) {
      const overdueProjects = projects.filter(p => 
        p.status === 'in-progress' && 
        new Date(p.completionDate || '') < new Date()
      )
      const highValueProjects = projects.filter(p => p.projectValue > 1000 && p.status === 'in-progress')
      
      let response = "🎯 **High Priority Items**:\n\n"
      
      if (overdueProjects.length > 0) {
        response += `⚠️ **Overdue Projects**: ${overdueProjects.length}\n`
      }
      if (highValueProjects.length > 0) {
        response += `💎 **High-Value Active Projects**: ${highValueProjects.length}\n`
      }
      
      response += "\nWould you like me to show you the detailed agenda with priorities?"
      return {
        message: response,
        navigateTo: '/agenda?filter=high'
      }
    }

    // Budget analysis
    if (lowerMessage.includes('budget') || lowerMessage.includes('spent') || lowerMessage.includes('expense')) {
      const totalExpenses = financialRecords
        .filter(record => record.type === 'expense')
        .reduce((sum, record) => sum + record.amount, 0)
      
      const recentExpenses = financialRecords
        .filter(record => record.type === 'expense' && 
          new Date(record.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
        .reduce((sum, record) => sum + record.amount, 0)
      
      return {
        message: `💸 **Budget Analysis**:\n\n📅 **Total Expenses**: $${totalExpenses.toLocaleString()}\n📊 **Last 7 Days**: $${recentExpenses.toLocaleString()}\n\nI can show you detailed budget breakdowns and expense categories.`,
        navigateTo: '/budget?period=last-week'
      }
    }

    // Business plan status
    if (lowerMessage.includes('plan') || lowerMessage.includes('goal') || lowerMessage.includes('strategy')) {
      const activePlans = businessPlans.filter(p => p.status === 'active')
      const completedPlans = businessPlans.filter(p => p.status === 'completed')
      
      return {
        message: `📋 **Business Plans Status**:\n\n🔄 **Active Plans**: ${activePlans.length}\n✅ **Completed Plans**: ${completedPlans.length}\n📈 **Total Plans**: ${businessPlans.length}\n\nWould you like to see your current plans and execution status?`,
        navigateTo: '/plans'
      }
    }

    // Network and contacts
    if (lowerMessage.includes('network') || lowerMessage.includes('contact') || lowerMessage.includes('people')) {
      const totalContacts = contacts.length
      const recentContacts = contacts.filter(c => 
        new Date(c.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      ).length
      
      return {
        message: `🤝 **Network Overview**:\n\n👥 **Total Contacts**: ${totalContacts}\n🆕 **New This Month**: ${recentContacts}\n💼 **Active Projects**: ${projects.filter(p => p.status === 'in-progress').length}\n\nI can show you your complete contact network and client relationships.`,
        navigateTo: '/collaborators'
      }
    }

    // Company overview
    if (lowerMessage.includes('company') || lowerMessage.includes('business') || lowerMessage.includes('overview')) {
      const companyName = userProfile?.companyName || 'Your Business'
      const industry = onboardingData?.industry || 'General'
      const teamSize = onboardingData?.teamSize || 'Not specified'
      
      return {
        message: `🏢 **Company Overview**:\n\n🏭 **Company**: ${companyName}\n🏷️ **Industry**: ${industry}\n👥 **Team Size**: ${teamSize}\n📊 **Active Projects**: ${projects.filter(p => p.status === 'in-progress').length}\n💰 **Total Revenue**: $${financialRecords.filter(r => r.type === 'income').reduce((sum, r) => sum + r.amount, 0).toLocaleString()}\n\nThis is your business dashboard overview.`,
        navigateTo: '/dashboard'
      }
    }

    // Calendar and agenda requests
    if (lowerMessage.includes('calendar') || lowerMessage.includes('schedule') || lowerMessage.includes('agenda') || 
        lowerMessage.includes('what\'s on') || lowerMessage.includes('what is on')) {
      
      // Check if asking about specific agenda items
      if (lowerMessage.includes('high priority') || lowerMessage.includes('urgent') || lowerMessage.includes('important')) {
        return {
          message: "I'll show you the high priority items on your agenda. Let me navigate you there now...",
          navigateTo: '/agenda?filter=high'
        }
      }
      
      // Check if asking about upcoming deadlines
      if (lowerMessage.includes('deadline') || lowerMessage.includes('due') || lowerMessage.includes('upcoming')) {
        return {
          message: "I'll show you your upcoming deadlines and important dates. Let me navigate you to the agenda...",
          navigateTo: '/agenda'
        }
      }
      
      // General calendar/agenda request
      return {
        message: "I'll show you your company agenda and calendar with all your priorities, deadlines, and upcoming tasks. Let me navigate you there now...",
        navigateTo: '/agenda'
      }
    }

    // Goals and benchmarks
    if (lowerMessage.includes('goal') || lowerMessage.includes('benchmark') || lowerMessage.includes('milestone') ||
        lowerMessage.includes('target') || lowerMessage.includes('objective')) {
      
      const activePlans = businessPlans.filter(p => p.status === 'active')
      const completedPlans = businessPlans.filter(p => p.status === 'completed')
      
      return {
        message: `🎯 **Goals & Benchmarks**:\n\n🔄 **Active Plans**: ${activePlans.length}\n✅ **Completed Plans**: ${completedPlans.length}\n📈 **Total Plans**: ${businessPlans.length}\n\nI can show you your current goals, benchmarks, and progress tracking.`,
        navigateTo: '/dashboard?tab=goals'
      }
    }

    // Accounting and financial management
    if (lowerMessage.includes('accounting') || lowerMessage.includes('financial') || lowerMessage.includes('invoice') ||
        lowerMessage.includes('payment') || lowerMessage.includes('billing')) {
      
      const totalRevenue = financialRecords.filter(r => r.type === 'income').reduce((sum, r) => sum + r.amount, 0)
      const totalExpenses = financialRecords.filter(r => r.type === 'expense').reduce((sum, r) => sum + r.amount, 0)
      
      return {
        message: `💼 **Accounting & Financial Management**:\n\n💰 **Total Revenue**: $${totalRevenue.toLocaleString()}\n💸 **Total Expenses**: $${totalExpenses.toLocaleString()}\n📊 **Net Position**: $${(totalRevenue - totalExpenses).toLocaleString()}\n\nI can show you detailed financial analytics, invoicing, and payment tracking.`,
        navigateTo: '/dashboard?tab=accounting'
      }
    }

    // Enhanced direct navigation requests - these should be checked BEFORE other patterns
    if (lowerMessage.includes('navigate to') || lowerMessage.includes('take me to') || lowerMessage.includes('show me') || 
        lowerMessage.includes('go to') || lowerMessage.includes('open') || lowerMessage.includes('view')) {
      
      // Direct page navigation
      if (lowerMessage.includes('agenda') || lowerMessage.includes('company agenda')) {
        if (lowerMessage.includes('high priority') || lowerMessage.includes('urgent')) {
          return {
            message: "I'll show you the high priority items on your agenda. Let me navigate you there now...",
            navigateTo: '/agenda?filter=high'
          }
        }
        return {
          message: "I'll take you to your company agenda where you can see all your priorities and deadlines. Let me navigate you there now...",
          navigateTo: '/agenda'
        }
      }

      if (lowerMessage.includes('budget') || lowerMessage.includes('financial')) {
        if (lowerMessage.includes('last week') || lowerMessage.includes('spent')) {
          return {
            message: "I'll show you what was spent in your budget last week. Let me navigate you to the budget page...",
            navigateTo: '/budget?period=last-week'
          }
        }
        if (lowerMessage.includes('next week') || lowerMessage.includes('upcoming')) {
          return {
            message: "I'll show you your budget allocation for next week. Let me navigate you to the budget page...",
            navigateTo: '/budget?period=next-week'
          }
        }
        return {
          message: "I'll take you to your budget overview where you can see all your financial information. Let me navigate you there now...",
          navigateTo: '/budget'
        }
      }

      if (lowerMessage.includes('dashboard') || lowerMessage.includes('home') || lowerMessage.includes('main')) {
        console.log('🧭 Dashboard navigation triggered for message:', lowerMessage)
        return {
          message: "I'll take you back to your main dashboard. Let me navigate you there now...",
          navigateTo: '/dashboard'
        }
      }

      if (lowerMessage.includes('plan') || lowerMessage.includes('execution') || lowerMessage.includes('strategy')) {
        return {
          message: "I'll show you your plans and execution status. Let me navigate you to the plans section...",
          navigateTo: '/plans'
        }
      }

      if (lowerMessage.includes('network') || lowerMessage.includes('contact') || lowerMessage.includes('collaborator') || lowerMessage.includes('vendor')) {
        return {
          message: "I'll show you your network contacts and client information. Let me navigate you to the network section...",
          navigateTo: '/collaborators'
        }
      }

      if (lowerMessage.includes('client') || lowerMessage.includes('clients') || lowerMessage.includes('customer')) {
        return {
          message: "I'll show you your clients. Let me navigate you to the clients section...",
          navigateTo: '/clients'
        }
      }

      if (lowerMessage.includes('goal') || lowerMessage.includes('benchmark') || lowerMessage.includes('milestone')) {
        return {
          message: "I'll show you your goals and benchmarks. Let me navigate you to the goals section...",
          navigateTo: '/goals'
        }
      }

      if (lowerMessage.includes('accounting') || lowerMessage.includes('account') || lowerMessage.includes('analytics') || 
          lowerMessage.includes('payment') || lowerMessage.includes('invoice') || lowerMessage.includes('financial')) {
        return {
          message: "I'll show you your accounting analytics and payment information. Let me navigate you to the accounting section...",
          navigateTo: '/accounting'
        }
      }

      if (lowerMessage.includes('profile') || lowerMessage.includes('settings') || lowerMessage.includes('personal')) {
        return {
          message: "I'll take you to your profile and personal settings. Let me navigate you there now...",
          navigateTo: '/profile'
        }
      }

      if (lowerMessage.includes('tax') || lowerMessage.includes('tax forms')) {
        return {
          message: "I'll take you to your tax forms and document management. Let me navigate you there now...",
          navigateTo: '/tax-forms'
        }
      }

      if (lowerMessage.includes('documents') || lowerMessage.includes('files') || lowerMessage.includes('uploads')) {
        return {
          message: "I'll take you to your documents where you can upload business files. Navigating now...",
          navigateTo: '/documents'
        }
      }

      if (lowerMessage.includes('contract') || lowerMessage.includes('agreement')) {
        return {
          message: "I'll take you to your contracts section where you can generate agreements. Navigating now...",
          navigateTo: '/contracts'
        }
      }

      if (lowerMessage.includes('team') || lowerMessage.includes('staff') || lowerMessage.includes('employees')) {
        return {
          message: "I'll take you to your team management section. Let me navigate you there now...",
          navigateTo: '/team'
        }
      }

      if (lowerMessage.includes('project') || lowerMessage.includes('projects')) {
        return {
          message: "I'll take you to your projects overview. Let me navigate you there now...",
          navigateTo: '/projects'
        }
      }

      if (lowerMessage.includes('communication') || lowerMessage.includes('communications')) {
        return {
          message: "I'll take you to your communications management. Let me navigate you there now...",
          navigateTo: '/communications'
        }
      }

      if (lowerMessage.includes('marketing') || lowerMessage.includes('marketing strategy')) {
        return {
          message: "I'll take you to your marketing section. Let me navigate you there now...",
          navigateTo: '/marketing'
        }
      }

      if (lowerMessage.includes('funding') || lowerMessage.includes('fundraising') || lowerMessage.includes('investment')) {
        return {
          message: "I'll take you to your funding and investment section. Let me navigate you there now...",
          navigateTo: '/funding'
        }
      }
    }

    // Direct page/tab requests without navigation verbs
    if (lowerMessage.includes('agenda') && !lowerMessage.includes('navigate') && !lowerMessage.includes('take me') && !lowerMessage.includes('show me')) {
      return {
        message: "I'll take you to your company agenda where you can see all your priorities and deadlines. Let me navigate you there now...",
        navigateTo: '/agenda'
      }
    }

    if (lowerMessage.includes('network') && !lowerMessage.includes('navigate') && !lowerMessage.includes('take me') && !lowerMessage.includes('show me')) {
      return {
        message: "I'll show you your network contacts and client information. Let me navigate you to the network section...",
        navigateTo: '/collaborators'
      }
    }

    if ((lowerMessage.includes('client') || lowerMessage.includes('clients') || lowerMessage.includes('customer')) && !lowerMessage.includes('navigate') && !lowerMessage.includes('take me') && !lowerMessage.includes('show me')) {
      return {
        message: "I'll take you to your clients. Navigating now...",
        navigateTo: '/clients'
      }
    }

    if (lowerMessage.includes('accounting') && !lowerMessage.includes('navigate') && !lowerMessage.includes('take me') && !lowerMessage.includes('show me')) {
      return {
        message: "I'll show you your accounting analytics and payment information. Let me navigate you to the accounting section...",
        navigateTo: '/dashboard?tab=accounting'
      }
    }

    if (lowerMessage.includes('profile') && !lowerMessage.includes('navigate') && !lowerMessage.includes('take me') && !lowerMessage.includes('show me')) {
      return {
        message: "I'll take you to your profile and personal settings. Let me navigate you there now...",
        navigateTo: '/profile'
      }
    }

    if (lowerMessage.includes('tax') && !lowerMessage.includes('navigate') && !lowerMessage.includes('take me') && !lowerMessage.includes('show me')) {
      return {
        message: "I'll take you to your tax forms and document management. Let me navigate you there now...",
        navigateTo: '/tax-forms'
      }
    }

    if (lowerMessage.includes('team') && !lowerMessage.includes('navigate') && !lowerMessage.includes('take me') && !lowerMessage.includes('show me')) {
      return {
        message: "I'll take you to your team management section. Let me navigate you there now...",
        navigateTo: '/team'
      }
    }

    if (lowerMessage.includes('project') && !lowerMessage.includes('navigate') && !lowerMessage.includes('take me') && !lowerMessage.includes('show me')) {
      return {
        message: "I'll take you to your projects overview. Let me navigate you there now...",
        navigateTo: '/projects'
      }
    }

    if (lowerMessage.includes('communication') && !lowerMessage.includes('navigate') && !lowerMessage.includes('take me') && !lowerMessage.includes('show me')) {
      return {
        message: "I'll take you to your communications management. Let me navigate you there now...",
        navigateTo: '/communications'
      }
    }

    if (lowerMessage.includes('marketing') && !lowerMessage.includes('navigate') && !lowerMessage.includes('take me') && !lowerMessage.includes('show me')) {
      return {
        message: "I'll take you to your marketing section. Let me navigate you there now...",
        navigateTo: '/marketing'
      }
    }

    if (lowerMessage.includes('funding') && !lowerMessage.includes('navigate') && !lowerMessage.includes('take me') && !lowerMessage.includes('show me')) {
      return {
        message: "I'll take you to your funding and investment section. Let me navigate you there now...",
        navigateTo: '/funding'
      }
    }

    if (lowerMessage.includes('budget') && !lowerMessage.includes('navigate') && !lowerMessage.includes('take me') && !lowerMessage.includes('show me')) {
      return {
        message: "I'll take you to your budget overview where you can see all your financial information. Let me navigate you there now...",
        navigateTo: '/budget'
      }
    }

    if (lowerMessage.includes('documents') && !lowerMessage.includes('navigate') && !lowerMessage.includes('take me') && !lowerMessage.includes('show me')) {
      return {
        message: "I'll take you to your documents where you can upload business files. Navigating now...",
        navigateTo: '/documents'
      }
    }

    if ((lowerMessage.includes('contract') || lowerMessage.includes('agreement')) && !lowerMessage.includes('navigate') && !lowerMessage.includes('take me') && !lowerMessage.includes('show me')) {
      return {
        message: "I'll take you to your contracts section where you can generate agreements. Navigating now...",
        navigateTo: '/contracts'
      }
    }

    // General help responses
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do') || lowerMessage.includes('navigation') || lowerMessage.includes('where can i go')) {
      return {
        message: "I can help you navigate to any section of your CEO dashboard! Here are the main areas:\n\n🏠 **Main Pages**:\n• Dashboard (overview & analytics)\n• Company Agenda (priorities & timeline)\n• Plans & Execution (strategic plans)\n• Goals & Benchmarks (objectives & milestones)\n\n👥 **Business Management**:\n• Network (contacts & clients)\n• Accounting (financial tracking)\n• Profile (personal settings)\n• Tax Forms (document management)\n\n📊 **Specialized Sections**:\n• Team (staff management)\n• Projects (project overview)\n• Communications (message management)\n• Marketing (strategy & campaigns)\n• Funding (investment & fundraising)\n• Budget (financial planning)\n\nJust say \"navigate to [section name]\" or \"take me to [section name]\" and I'll take you there! For example:\n• \"Navigate to Network\"\n• \"Take me to Accounting\"\n• \"Show me Profile\"\n• \"Go to Tax Forms\""
      }
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return {
        message: "Hello! I'm here to help you analyze your business data and navigate your CEO dashboard. I can answer questions about your clients, projects, finances, and plans, plus take you directly to any section you need. What would you like to know or see?"
      }
    }

    // Default response for other queries
    console.log('🤖 No specific navigation pattern matched, returning default response')
    return {
      message: "Here’s how I can help: I can answer questions about your data (revenue, clients, deadlines), navigate anywhere for you, or explain features. What would you like to do next?"
    }
  }

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return

    const userMessage = inputText.trim()
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: userMessage,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newUserMessage])
    setInputText('')
    setIsLoading(true)

    try {
      const aiResponse = await generateAIResponse(userMessage)
      console.log('🤖 AI Response received:', aiResponse)
      
      const newAIMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.message,
        isUser: false,
        timestamp: new Date(),
        navigateTo: aiResponse.navigateTo
      }

      setMessages(prev => [...prev, newAIMessage])

      // Navigate if the AI response includes navigation
      if (aiResponse.navigateTo) {
        console.log('🧭 Text message navigation triggered to:', aiResponse.navigateTo)
        const navigateTo = aiResponse.navigateTo // Type narrowing
        setTimeout(() => {
          // Show navigation notification
          const notification = document.createElement('div')
          notification.className = 'fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-[60] animate-in slide-in-from-right'
          notification.textContent = 'Navigating to requested page...'
          document.body.appendChild(notification)

          // Remove notification after 3 seconds
          setTimeout(() => {
            notification.remove()
          }, 3000)

          // Navigate to the page
          console.log('🧭 Executing text message navigation to:', navigateTo)
          window.location.href = navigateTo
        }, 1000)
      }
    } catch (error) {
      console.error('Error generating AI response:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I encountered an error while processing your request. Please try again or ask a different question.",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  return (
    <>
      {/* Floating Voice Recognition Button */}
      <button
        onClick={toggleListening}
        className={`fixed bottom-6 left-6 w-14 h-14 rounded-full shadow-lg transition-all duration-200 z-50 flex items-center justify-center ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
            : 'bg-green-500 hover:bg-green-600'
        } ${className}`}
        title={isListening ? 'Stop listening' : 'Start voice recognition'}
        aria-label={isListening ? 'Stop voice recognition' : 'Start voice recognition'}
      >
        <MicrophoneIcon className="w-6 h-6 text-white" />
      </button>
      
      {/* Voice Recognition Status Indicator */}
      {isListening && (
        <div className="fixed bottom-20 left-6 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg z-50 animate-pulse">
          🎤 Listening...
        </div>
      )}
      
      {/* Voice Recognition Click Indicator */}
      {transcript && (
        <div className="fixed bottom-20 left-6 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg z-50">
          🎤 "{transcript}"
        </div>
      )}

      {/* Floating Chat Button */}
      <button
        onClick={handleToggle}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-200 z-50 flex items-center justify-center ${className}`}
        aria-label="Open AI Chat Assistant"
      >
        <ChatBubbleLeftRightIcon className="w-6 h-6" />
      </button>

      {/* Chat Dialog */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <div>
              <h3 className="font-semibold text-lg">CEO AI Assistant</h3>
              <p className="text-blue-100 text-sm">Your business data analyst</p>
            </div>
            <div className="flex items-center space-x-2">
              {/* Voice Recognition Button */}
              <button
                onClick={toggleListening}
                className={`p-2 rounded-full transition-all duration-200 ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
                title={isListening ? 'Stop listening' : 'Start listening'}
                aria-label={isListening ? 'Stop voice recognition' : 'Start voice recognition'}
              >
                <MicrophoneIcon className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={handleToggle}
                className="text-white hover:text-blue-100 transition-colors"
                aria-label="Close chat"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.isUser ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border border-gray-200 rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            {isSpeaking && (
              <div className="flex justify-start">
                <div className="bg-green-100 text-green-800 border border-green-200 rounded-lg px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">AI is speaking...</span>
                  </div>
                </div>
              </div>
            )}
            {transcript && (
              <div className="flex justify-start">
                <div className="bg-blue-100 text-blue-800 border border-blue-200 rounded-lg px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">🎤 "{transcript}"</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about your business data..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <PaperAirplaneIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AIChatAssistant
