import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  saveOnboardingData,
  getOnboardingData,
  clearOnboardingData,
  saveContact,
  getContacts,
  updateContact,
  removeContact,
  saveBusinessPlan,
  getBusinessPlans,
  updateBusinessPlan,
  saveUserProfile,
  getUserProfile,
  updateUserProfile,
  isLocalStorageAvailable,
  saveFinancialRecord,
  getFinancialRecords,
  getDocuments,
  saveDocument,
  removeDocument,
  type OnboardingData,
  type Contact,
  type BusinessPlan,
  type UserProfile,
  type FinancialRecord,
  type DocumentItem,
} from '../storage'

describe('Storage Layer', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    vi.clearAllMocks()
  })

  describe('isLocalStorageAvailable', () => {
    it('should return true when localStorage is available', () => {
      expect(isLocalStorageAvailable()).toBe(true)
    })
  })

  describe('Onboarding Data', () => {
    const mockOnboardingData: Omit<OnboardingData, 'completedAt'> = {
      industry: 'Technology/Software',
      businessType: 'SaaS',
      yearsInBusiness: '2-5',
      teamSize: '10-50',
      annualRevenue: '$500K-$1M',
      primaryGoals: ['Increase Revenue', 'Expand Team'],
      currentChallenges: ['Cash Flow', 'Hiring'],
      technologyComfort: 'Advanced',
    }

    it('should save onboarding data with completedAt timestamp', () => {
      saveOnboardingData(mockOnboardingData)
      const saved = getOnboardingData()

      expect(saved).toBeTruthy()
      expect(saved?.industry).toBe('Technology/Software')
      expect(saved?.completedAt).toBeTruthy()
      expect(new Date(saved!.completedAt).getTime()).toBeLessThanOrEqual(Date.now())
    })

    it('should retrieve saved onboarding data', () => {
      saveOnboardingData(mockOnboardingData)
      const retrieved = getOnboardingData()

      expect(retrieved).toMatchObject(mockOnboardingData)
    })

    it('should return null when no onboarding data exists', () => {
      expect(getOnboardingData()).toBeNull()
    })

    it('should clear onboarding data', () => {
      saveOnboardingData(mockOnboardingData)
      expect(getOnboardingData()).toBeTruthy()

      clearOnboardingData()
      expect(getOnboardingData()).toBeNull()
    })
  })

  describe('User Profile', () => {
    const mockProfile: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'> = {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      companyName: 'Test Corp',
      phone: '+1234567890',
      timezone: 'America/New_York',
      preferences: {
        notifications: {
          email: true,
          push: false,
          sms: false,
        },
        theme: 'dark',
        language: 'en',
        currency: 'USD',
      },
    }

    it('should save user profile with generated id and timestamps', () => {
      saveUserProfile(mockProfile)
      const saved = getUserProfile()

      expect(saved).toBeTruthy()
      expect(saved?.id).toMatch(/^user_\d+$/)
      expect(saved?.email).toBe('test@example.com')
      expect(saved?.createdAt).toBeTruthy()
      expect(saved?.updatedAt).toBeTruthy()
    })

    it('should update user profile', async () => {
      saveUserProfile(mockProfile)
      const original = getUserProfile()

      // Wait 1ms to ensure different timestamp
      await new Promise(resolve => setTimeout(resolve, 1))

      updateUserProfile({ firstName: 'Jane' })
      const updated = getUserProfile()

      expect(updated?.firstName).toBe('Jane')
      expect(updated?.lastName).toBe('Doe')
      expect(updated?.updatedAt).not.toBe(original?.updatedAt)
    })

    it('should return null when no profile exists', () => {
      expect(getUserProfile()).toBeNull()
    })
  })

  describe('Contacts', () => {
    const mockContact: Contact = {
      id: 'contact_1',
      name: 'Acme Corp',
      contactPerson: 'Jane Smith',
      email: 'jane@acme.com',
      phone: '+1234567890',
      company: 'Acme Corp',
      industry: 'Technology',
      projects: [],
      relationshipType: 'client',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    it('should save a contact', () => {
      saveContact(mockContact)
      const contacts = getContacts()

      expect(contacts).toHaveLength(1)
      expect(contacts[0]).toMatchObject(mockContact)
    })

    it('should retrieve all contacts', () => {
      saveContact(mockContact)
      saveContact({ ...mockContact, id: 'contact_2', name: 'Beta Inc' })

      const contacts = getContacts()
      expect(contacts).toHaveLength(2)
    })

    it('should update a contact', () => {
      saveContact(mockContact)

      const updated = { ...mockContact, name: 'Acme Corporation' }
      updateContact(updated)

      const contacts = getContacts()
      expect(contacts[0].name).toBe('Acme Corporation')
    })

    it('should remove a contact', () => {
      saveContact(mockContact)
      expect(getContacts()).toHaveLength(1)

      removeContact('contact_1')
      expect(getContacts()).toHaveLength(0)
    })

    it('should return empty array when no contacts exist', () => {
      expect(getContacts()).toEqual([])
    })
  })

  describe('Business Plans', () => {
    const mockPlan: Omit<BusinessPlan, 'id' | 'createdAt' | 'updatedAt'> = {
      title: 'Q1 Growth Plan',
      description: 'Expand market share',
      type: 'strategic',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      goals: ['Increase revenue by 20%', 'Hire 5 new employees'],
      milestones: [],
      budget: {
        allocated: 100000,
        spent: 25000,
        currency: 'USD',
      },
    }

    it('should save business plan with generated id and timestamps', () => {
      saveBusinessPlan(mockPlan)
      const plans = getBusinessPlans()

      expect(plans).toHaveLength(1)
      expect(plans[0].id).toMatch(/^plan_\d+$/)
      expect(plans[0].title).toBe('Q1 Growth Plan')
      expect(plans[0].createdAt).toBeTruthy()
    })

    it('should update business plan', () => {
      saveBusinessPlan(mockPlan)
      const plans = getBusinessPlans()
      const planId = plans[0].id

      updateBusinessPlan(planId, { status: 'completed' })

      const updated = getBusinessPlans()
      expect(updated[0].status).toBe('completed')
      expect(updated[0].updatedAt).toBeTruthy()
    })

    it('should return empty array when no plans exist', () => {
      expect(getBusinessPlans()).toEqual([])
    })
  })

  describe('Financial Records', () => {
    const mockRecord: Omit<FinancialRecord, 'id' | 'createdAt'> = {
      type: 'income',
      amount: 5000,
      currency: 'USD',
      description: 'Client payment',
      category: 'Revenue',
      date: '2024-01-15',
      status: 'completed',
    }

    it('should save financial record with generated id and timestamp', () => {
      saveFinancialRecord(mockRecord)
      const records = getFinancialRecords()

      expect(records).toHaveLength(1)
      expect(records[0].id).toMatch(/^financial_\d+$/)
      expect(records[0].amount).toBe(5000)
      expect(records[0].createdAt).toBeTruthy()
    })

    it('should return empty array when no records exist', () => {
      expect(getFinancialRecords()).toEqual([])
    })
  })

  describe('Documents', () => {
    const mockDocument: Omit<DocumentItem, 'id' | 'uploadedAt'> = {
      filename: 'contract.pdf',
      mimeType: 'application/pdf',
      sizeBytes: 1024000,
      category: 'contract',
      notes: 'Important contract',
      dataUrl: 'data:application/pdf;base64,encodeddata',
    }

    it('should save document with generated id and timestamp', () => {
      saveDocument(mockDocument)
      const docs = getDocuments()

      expect(docs).toHaveLength(1)
      expect(docs[0].id).toMatch(/^doc_\d+$/)
      expect(docs[0].filename).toBe('contract.pdf')
      expect(docs[0].uploadedAt).toBeTruthy()
    })

    it('should remove document', () => {
      saveDocument(mockDocument)
      const docs = getDocuments()
      const docId = docs[0].id

      removeDocument(docId)
      expect(getDocuments()).toHaveLength(0)
    })

    it('should return empty array when no documents exist', () => {
      expect(getDocuments()).toEqual([])
    })
  })
})
