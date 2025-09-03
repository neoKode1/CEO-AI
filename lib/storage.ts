import logger from './logger'

// Simple storage utility for onboarding data
export interface OnboardingData {
  industry: string
  businessType: string
  yearsInBusiness: string
  teamSize: string
  annualRevenue: string
  primaryGoals: string[]
  currentChallenges: string[]
  technologyComfort: string
  completedAt: string
}

export interface UserProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  companyName: string
  profilePicture?: string
  phone?: string
  timezone: string
  preferences: {
    notifications: {
      email: boolean
      push: boolean
      sms: boolean
    }
    theme: 'dark' | 'light' | 'auto'
    language: string
    currency: string
  }
  createdAt: string
  updatedAt: string
}

export interface BusinessPlan {
  id: string
  title: string
  description: string
  type: 'strategic' | 'operational' | 'financial' | 'marketing'
  status: 'draft' | 'active' | 'completed' | 'paused'
  startDate: string
  endDate: string
  goals: string[]
  milestones: {
    id: string
    title: string
    description: string
    dueDate: string
    status: 'pending' | 'in-progress' | 'completed' | 'overdue'
    priority: 'low' | 'medium' | 'high'
  }[]
  budget: {
    allocated: number
    spent: number
    currency: string
  }
  createdAt: string
  updatedAt: string
}

export interface Contact {
  id: string
  name: string
  contactPerson?: string
  email: string
  phone?: string
  company?: string
  industry?: string
  projects: Project[]
  howMet?: string
  notes?: string
  followUpDate?: string
  relationshipType?: 'client' | 'collaborator' | 'vendor' | 'partner'
  profileUrl?: string
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  name: string
  description: string
  projectType: string
  status: 'completed' | 'in-progress' | 'on-hold' | 'proposed'
  startDate: string
  completionDate?: string
  projectValue: number
  amountCollected: number
  paymentStatus: 'paid' | 'partial' | 'outstanding'
  paymentTerms: string
  notes?: string
}

export interface FinancialRecord {
  id: string
  type: 'income' | 'expense' | 'invoice' | 'payment'
  amount: number
  currency: string
  description: string
  category: string
  date: string
  status: 'pending' | 'completed' | 'overdue' | 'cancelled'
  reference?: string
  notes?: string
  createdAt: string
}

export const saveOnboardingData = (data: Omit<OnboardingData, 'completedAt'>) => {
  const onboardingData: OnboardingData = {
    ...data,
    completedAt: new Date().toISOString()
  }

  logger.trackDataOperation('Storage', 'saveOnboardingData', 'Saving onboarding data', {
    industry: onboardingData.industry,
    businessType: onboardingData.businessType,
    teamSize: onboardingData.teamSize
  })
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('ceo-ai-onboarding', JSON.stringify(onboardingData))
    logger.trackDataOperation('Storage', 'saveOnboardingData', 'Onboarding data saved successfully')
  }
}

export const getOnboardingData = (): OnboardingData | null => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('ceo-ai-onboarding')
    return data ? JSON.parse(data) : null
  }
  return null
}

export const clearOnboardingData = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('ceo-ai-onboarding')
  }
}

// User Profile Management
export const saveUserProfile = (profile: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>) => {
  const userProfile: UserProfile = {
    ...profile,
    id: `user_${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem('ceo-ai-user-profile', JSON.stringify(userProfile))
  }
}

export const getUserProfile = (): UserProfile | null => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('ceo-ai-user-profile')
    return data ? JSON.parse(data) : null
  }
  return null
}

export const updateUserProfile = (updates: Partial<UserProfile>) => {
  const currentProfile = getUserProfile()
  if (currentProfile) {
    const updatedProfile: UserProfile = {
      ...currentProfile,
      ...updates,
      updatedAt: new Date().toISOString()
    }
    localStorage.setItem('ceo-ai-user-profile', JSON.stringify(updatedProfile))
  }
}

// Business Plans Management
export const saveBusinessPlan = (plan: Omit<BusinessPlan, 'id' | 'createdAt' | 'updatedAt'>) => {
  const businessPlan: BusinessPlan = {
    ...plan,
    id: `plan_${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  if (typeof window !== 'undefined') {
    const existingPlans = getBusinessPlans()
    existingPlans.push(businessPlan)
    localStorage.setItem('ceo-ai-business-plans', JSON.stringify(existingPlans))
  }
}

export const getBusinessPlans = (): BusinessPlan[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('ceo-ai-business-plans')
    return data ? JSON.parse(data) : []
  }
  return []
}

export const updateBusinessPlan = (planId: string, updates: Partial<BusinessPlan>) => {
  const plans = getBusinessPlans()
  const planIndex = plans.findIndex(plan => plan.id === planId)
  if (planIndex !== -1) {
    plans[planIndex] = {
      ...plans[planIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    localStorage.setItem('ceo-ai-business-plans', JSON.stringify(plans))
  }
}

// Contacts Management
export const saveContact = (contact: Contact) => {
  logger.trackDataOperation('Storage', 'saveContact', 'Saving new contact', {
    contactId: contact.id,
    contactName: contact.name,
    contactEmail: contact.email
  })
  
  if (typeof window !== 'undefined') {
    try {
      const existingContacts = getContacts()
      existingContacts.push(contact)
      localStorage.setItem('ceo-ai-contacts', JSON.stringify(existingContacts))
    } catch (err) {
      logger.trackDataOperation('Storage', 'saveContact', 'Failed to save contact to localStorage', {
        error: String(err)
      })
    }
    logger.trackDataOperation('Storage', 'saveContact', 'Contact saved successfully')
  }
}

export const getContacts = (): Contact[] => {
  logger.trackDataOperation('Storage', 'getContacts', 'Retrieving contacts from storage')
  
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('ceo-ai-contacts')
    if (stored) {
      const contacts: Contact[] = JSON.parse(stored)
      // Migration: default missing relationshipType to 'client' and lift profile URL out of notes
      let mutated = false
      const migrated = contacts.map((c) => {
        let updated: Contact = c as Contact
        if (!('relationshipType' in updated) || !updated.relationshipType) {
          updated = { ...updated, relationshipType: 'client' as Contact['relationshipType'] }
          mutated = true
        }
        if (!updated.profileUrl && typeof updated.notes === 'string') {
          const match = updated.notes.match(/Profile:\s*(\S+)/)
          if (match && match[1]) {
            updated = { ...updated, profileUrl: match[1] }
            mutated = true
          }
        }
        return updated
      })
      if (mutated) {
        localStorage.setItem('ceo-ai-contacts', JSON.stringify(migrated))
        logger.trackDataOperation('Storage', 'getContacts', 'Migrated contacts to include relationshipType=client for legacy records', {
          migratedCount: migrated.filter(c => c.relationshipType === 'client').length
        })
        return migrated
      }
      logger.trackDataOperation('Storage', 'getContacts', 'Contacts retrieved successfully', {
        count: contacts.length
      })
      return contacts
    }
  }
  
  logger.trackDataOperation('Storage', 'getContacts', 'No contacts found, returning empty array')
  return []
}

export const isLocalStorageAvailable = (): boolean => {
  try {
    if (typeof window === 'undefined') return false
    const testKey = '__ceo_ai_storage_test__'
    localStorage.setItem(testKey, '1')
    localStorage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}

export const updateContact = (updatedContact: Contact) => {
  if (typeof window !== 'undefined') {
    try {
      const existingContacts = getContacts()
      const contactIndex = existingContacts.findIndex(contact => contact.id === updatedContact.id)
      
      if (contactIndex !== -1) {
        existingContacts[contactIndex] = updatedContact
        localStorage.setItem('ceo-ai-contacts', JSON.stringify(existingContacts))
      }
    } catch (err) {
      logger.trackDataOperation('Storage', 'updateContact', 'Failed to update contact in localStorage', {
        error: String(err)
      })
    }
  }
}

export const removeContact = (contactId: string) => {
  if (typeof window !== 'undefined') {
    const existingContacts = getContacts().filter(contact => contact.id !== contactId)
    localStorage.setItem('ceo-ai-contacts', JSON.stringify(existingContacts))
  }
}

// Aggregate all projects with their owning client
export interface ClientProject extends Project {
  clientId: string
  clientName: string
}

export const getAllProjects = (): ClientProject[] => {
  const contacts = getContacts()
  const projects: ClientProject[] = []
  contacts.forEach(contact => {
    contact.projects.forEach(p => {
      projects.push({ ...p, clientId: contact.id, clientName: contact.name })
    })
  })
  return projects
}

// Add a project to a client by id and return the created project with id
export const addProjectToContact = (contactId: string, project: Omit<Project, 'id'>): Project | null => {
  const contacts = getContacts()
  const idx = contacts.findIndex(c => c.id === contactId)
  if (idx === -1) return null
  const newProject: Project = { ...project, id: Date.now().toString() }
  const updated = { ...contacts[idx] }
  updated.projects = [...updated.projects, newProject]
  updateContact(updated)
  return newProject
}

// Financial Records Management
export const saveFinancialRecord = (record: Omit<FinancialRecord, 'id' | 'createdAt'>) => {
  const financialRecord: FinancialRecord = {
    ...record,
    id: `financial_${Date.now()}`,
    createdAt: new Date().toISOString()
  }

  if (typeof window !== 'undefined') {
    const existingRecords = getFinancialRecords()
    existingRecords.push(financialRecord)
    localStorage.setItem('ceo-ai-financial-records', JSON.stringify(existingRecords))
  }
}

export const getFinancialRecords = (): FinancialRecord[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('ceo-ai-financial-records')
    return data ? JSON.parse(data) : []
  }
  return []
}

// Industry-specific configurations
export const getIndustryConfig = (industry: string) => {
  const configs: Record<string, any> = {
    'Technology/Software': {
      kpiCards: [
        { title: 'Monthly Recurring Revenue', value: '$0', change: '+0%', changeType: 'neutral' },
        { title: 'Customer Acquisition Cost', value: '$0', change: '+0%', changeType: 'neutral' },
        { title: 'Churn Rate', value: '0%', change: '+0%', changeType: 'neutral' },
        { title: 'Active Users', value: '0', change: '+0%', changeType: 'neutral' }
      ],
      projectStatuses: ['Development', 'Testing', 'Deployed', 'On Hold'],
      fundingCategories: ['Angel Investors', 'Venture Capital', 'Crowdfunding', 'Grants']
    },
    'Healthcare': {
      kpiCards: [
        { title: 'Patient Satisfaction', value: '0%', change: '+0%', changeType: 'neutral' },
        { title: 'Revenue per Patient', value: '$0', change: '+0%', changeType: 'neutral' },
        { title: 'Appointment Utilization', value: '0%', change: '+0%', changeType: 'neutral' },
        { title: 'Insurance Claims', value: '0', change: '+0%', changeType: 'neutral' }
      ],
      projectStatuses: ['Planning', 'Implementation', 'Active', 'Review'],
      fundingCategories: ['Government Grants', 'Private Equity', 'Philanthropy', 'Partnerships']
    },
    'Manufacturing': {
      kpiCards: [
        { title: 'Production Efficiency', value: '0%', change: '+0%', changeType: 'neutral' },
        { title: 'Quality Score', value: '0%', change: '+0%', changeType: 'neutral' },
        { title: 'Inventory Turnover', value: '0x', change: '+0%', changeType: 'neutral' },
        { title: 'On-Time Delivery', value: '0%', change: '+0%', changeType: 'neutral' }
      ],
      projectStatuses: ['Design', 'Production', 'Quality Check', 'Shipping'],
      fundingCategories: ['Equipment Loans', 'Trade Credit', 'Government Programs', 'Private Investment']
    },
    'Retail/E-commerce': {
      kpiCards: [
        { title: 'Conversion Rate', value: '0%', change: '+0%', changeType: 'neutral' },
        { title: 'Average Order Value', value: '$0', change: '+0%', changeType: 'neutral' },
        { title: 'Customer Lifetime Value', value: '$0', change: '+0%', changeType: 'neutral' },
        { title: 'Return Rate', value: '0%', change: '+0%', changeType: 'neutral' }
      ],
      projectStatuses: ['Planning', 'Active', 'Promotion', 'Analysis'],
      fundingCategories: ['Business Loans', 'Inventory Financing', 'Crowdfunding', 'Angel Investors']
    },
    'Professional Services': {
      kpiCards: [
        { title: 'Billable Hours', value: '0h', change: '+0%', changeType: 'neutral' },
        { title: 'Client Retention', value: '0%', change: '+0%', changeType: 'neutral' },
        { title: 'Project Profitability', value: '0%', change: '+0%', changeType: 'neutral' },
        { title: 'New Clients', value: '0', change: '+0%', changeType: 'neutral' }
      ],
      projectStatuses: ['Proposal', 'Active', 'Review', 'Completed'],
      fundingCategories: ['Business Lines of Credit', 'Equipment Financing', 'Angel Investors', 'Partnerships']
    },
    'Creative/Media': {
      kpiCards: [
        { title: 'Project Completion Rate', value: '0%', change: '+0%', changeType: 'neutral' },
        { title: 'Client Satisfaction', value: '0%', change: '+0%', changeType: 'neutral' },
        { title: 'Revenue per Project', value: '$0', change: '+0%', changeType: 'neutral' },
        { title: 'Portfolio Growth', value: '0%', change: '+0%', changeType: 'neutral' }
      ],
      projectStatuses: ['Concept', 'Production', 'Review', 'Delivery'],
      fundingCategories: ['Grants', 'Crowdfunding', 'Angel Investors', 'Partnerships']
    }
  }

  return configs[industry] || {
    kpiCards: [
      { title: 'Monthly Revenue', value: '$0', change: '+0%', changeType: 'neutral' },
      { title: 'Customer Satisfaction', value: '0%', change: '+0%', changeType: 'neutral' },
      { title: 'Operational Efficiency', value: '0%', change: '+0%', changeType: 'neutral' },
      { title: 'Growth Rate', value: '0%', change: '+0%', changeType: 'neutral' }
    ],
    projectStatuses: ['Planning', 'Active', 'Review', 'Completed'],
    fundingCategories: ['Business Loans', 'Grants', 'Investors', 'Partnerships']
  }
}

// Documents & Contracts Storage

export interface DocumentItem {
  id: string
  filename: string
  mimeType: string
  sizeBytes: number
  category: 'license' | 'contract' | 'financial' | 'official' | 'other'
  notes?: string
  uploadedAt: string
  // Base64 data URL (data:<mime>;base64,...) for preview/download; large files may impact storage size
  dataUrl: string
}

export interface ContractItem {
  id: string
  title: string
  purpose:
    | 'nda'
    | 'service-agreement'
    | 'employment'
    | 'msa'
    | 'sow'
    | 'custom'
  parties: {
    companyName: string
    counterpartyName: string
  }
  effectiveDate: string
  governingLaw?: string
  paymentTerms?: string
  scope?: string
  termination?: string
  additionalClauses?: string
  content: string
  createdAt: string
  updatedAt: string
}

const DOCUMENTS_KEY = 'ceo-ai-documents'
const CONTRACTS_KEY = 'ceo-ai-contracts'

export const getDocuments = (): DocumentItem[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(DOCUMENTS_KEY)
    return data ? JSON.parse(data) : []
  }
  return []
}

export const saveDocument = (doc: Omit<DocumentItem, 'id' | 'uploadedAt'>) => {
  const documentItem: DocumentItem = {
    ...doc,
    id: `doc_${Date.now()}`,
    uploadedAt: new Date().toISOString()
  }
  if (typeof window !== 'undefined') {
    const existing = getDocuments()
    existing.unshift(documentItem)
    localStorage.setItem(DOCUMENTS_KEY, JSON.stringify(existing))
  }
}

export const removeDocument = (documentId: string) => {
  if (typeof window !== 'undefined') {
    const existing = getDocuments().filter(d => d.id !== documentId)
    localStorage.setItem(DOCUMENTS_KEY, JSON.stringify(existing))
  }
}

export const getContracts = (): ContractItem[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(CONTRACTS_KEY)
    return data ? JSON.parse(data) : []
  }
  return []
}

export const saveContract = (contract: Omit<ContractItem, 'id' | 'createdAt' | 'updatedAt'>) => {
  const newContract: ContractItem = {
    ...contract,
    id: `contract_${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  if (typeof window !== 'undefined') {
    const existing = getContracts()
    existing.unshift(newContract)
    localStorage.setItem(CONTRACTS_KEY, JSON.stringify(existing))
  }
}

export const updateContract = (contractId: string, updates: Partial<ContractItem>) => {
  if (typeof window !== 'undefined') {
    const existing = getContracts()
    const idx = existing.findIndex(c => c.id === contractId)
    if (idx !== -1) {
      existing[idx] = {
        ...existing[idx],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      localStorage.setItem(CONTRACTS_KEY, JSON.stringify(existing))
    }
  }
}

export const removeContract = (contractId: string) => {
  if (typeof window !== 'undefined') {
    const existing = getContracts().filter(c => c.id !== contractId)
    localStorage.setItem(CONTRACTS_KEY, JSON.stringify(existing))
  }
}