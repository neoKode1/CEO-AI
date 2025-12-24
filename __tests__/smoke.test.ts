import { describe, it, expect } from 'vitest'

describe('Smoke Tests', () => {
  describe('Critical Imports', () => {
    it('should import storage module', async () => {
      const storage = await import('../lib/storage')
      expect(storage).toBeDefined()
      expect(storage.getOnboardingData).toBeDefined()
      expect(storage.getContacts).toBeDefined()
      expect(storage.getBusinessPlans).toBeDefined()
    })

    it('should import logger module', async () => {
      const { default: logger } = await import('../lib/logger')
      expect(logger).toBeDefined()
      expect(logger.info).toBeDefined()
      expect(logger.error).toBeDefined()
    })
  })

  describe('Environment', () => {
    it('should have localStorage available in test environment', () => {
      expect(localStorage).toBeDefined()
      expect(typeof localStorage.getItem).toBe('function')
      expect(typeof localStorage.setItem).toBe('function')
    })

    it('should have sessionStorage available in test environment', () => {
      expect(sessionStorage).toBeDefined()
      expect(typeof sessionStorage.getItem).toBe('function')
      expect(typeof sessionStorage.setItem).toBe('function')
    })
  })

  describe('Basic Functionality', () => {
    it('should be able to save and retrieve data from localStorage', () => {
      const testKey = 'test-key'
      const testValue = 'test-value'
      
      localStorage.setItem(testKey, testValue)
      const retrieved = localStorage.getItem(testKey)
      
      expect(retrieved).toBe(testValue)
      
      localStorage.removeItem(testKey)
    })

    it('should be able to save and parse JSON data', () => {
      const testKey = 'test-json'
      const testData = { name: 'Test', value: 123 }
      
      localStorage.setItem(testKey, JSON.stringify(testData))
      const retrieved = JSON.parse(localStorage.getItem(testKey) || '{}')
      
      expect(retrieved).toEqual(testData)
      
      localStorage.removeItem(testKey)
    })
  })
})

