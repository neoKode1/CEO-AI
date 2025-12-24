/**
 * Contact Service
 * 
 * Business logic layer for contact management.
 * Provides validation, transformation, and business rules for contacts.
 * 
 * @layer Service
 * @dependencies lib/storage, lib/logger
 */

import {
  getContacts,
  saveContact,
  updateContact,
  removeContact,
  type Contact,
  type Project,
} from '@/lib/storage'
import logger from '@/lib/logger'
import { ValidationError, NotFoundError } from '@/lib/errors'

/**
 * Contact Service
 * Handles all contact-related business logic
 */
export const contactService = {
  /**
   * Get all contacts
   */
  getAll: (): Contact[] => {
    logger.trackDataOperation('ContactService', 'getAll', 'Fetching all contacts')
    return getContacts()
  },

  /**
   * Get contact by ID
   */
  getById: (id: string): Contact | null => {
    const contacts = getContacts()
    const contact = contacts.find((c) => c.id === id)
    
    if (!contact) {
      logger.warn('ContactService', 'getById', `Contact not found: ${id}`)
    }
    
    return contact || null
  },

  /**
   * Get contacts by relationship type
   */
  getByType: (type: Contact['relationshipType']): Contact[] => {
    const contacts = getContacts()
    return contacts.filter((c) => c.relationshipType === type)
  },

  /**
   * Search contacts by name or email
   */
  search: (query: string): Contact[] => {
    const contacts = getContacts()
    const lowerQuery = query.toLowerCase()
    
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(lowerQuery) ||
        c.email.toLowerCase().includes(lowerQuery) ||
        c.company?.toLowerCase().includes(lowerQuery)
    )
  },

  /**
   * Create a new contact with validation
   */
  create: (contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>): Contact => {
    // Validation
    if (!contactData.name || contactData.name.trim() === '') {
      throw new ValidationError('Contact name is required', 'name')
    }

    if (!contactData.email || contactData.email.trim() === '') {
      throw new ValidationError('Contact email is required', 'email')
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(contactData.email)) {
      throw new ValidationError('Invalid email format', 'email')
    }

    // Check for duplicate email
    const existingContacts = getContacts()
    const duplicate = existingContacts.find(
      (c) => c.email.toLowerCase() === contactData.email.toLowerCase()
    )

    if (duplicate) {
      throw new ValidationError(`Contact with email ${contactData.email} already exists`, 'email')
    }
    
    // Create contact
    const newContact: Contact = {
      ...contactData,
      id: `contact_${Date.now()}`,
      projects: contactData.projects || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    saveContact(newContact)
    
    logger.trackDataOperation('ContactService', 'create', 'Created new contact', {
      contactId: newContact.id,
      contactName: newContact.name,
    })
    
    return newContact
  },

  /**
   * Update an existing contact
   */
  update: (id: string, updates: Partial<Contact>): Contact => {
    const contact = contactService.getById(id)

    if (!contact) {
      throw new NotFoundError('Contact', id)
    }

    // Validate email if being updated
    if (updates.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(updates.email)) {
        throw new ValidationError('Invalid email format', 'email')
      }
    }
    
    const updatedContact: Contact = {
      ...contact,
      ...updates,
      id: contact.id, // Prevent ID change
      createdAt: contact.createdAt, // Prevent createdAt change
      updatedAt: new Date().toISOString(),
    }
    
    updateContact(updatedContact)
    
    logger.trackDataOperation('ContactService', 'update', 'Updated contact', {
      contactId: id,
    })
    
    return updatedContact
  },

  /**
   * Delete a contact
   */
  delete: (id: string): void => {
    const contact = contactService.getById(id)

    if (!contact) {
      throw new NotFoundError('Contact', id)
    }
    
    removeContact(id)
    
    logger.trackDataOperation('ContactService', 'delete', 'Deleted contact', {
      contactId: id,
      contactName: contact.name,
    })
  },
}

