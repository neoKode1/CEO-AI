import { describe, it, expect } from 'vitest'
import logger from '../logger'

describe('Logger', () => {
  describe('Logger Instance', () => {
    it('should be defined', () => {
      expect(logger).toBeDefined()
    })

    it('should have all required methods', () => {
      const requiredMethods = [
        'debug',
        'info',
        'warn',
        'error',
        'trackUserAction',
        'trackNavigation',
        'trackDataOperation',
      ]

      requiredMethods.forEach((method) => {
        expect(logger).toHaveProperty(method)
        expect(typeof logger[method as keyof typeof logger]).toBe('function')
      })
    })
  })
})
