/**
 * useContacts Hook
 * 
 * React hook for managing contacts with state management.
 * Provides CRUD operations with loading and error states.
 * 
 * @layer Hooks
 * @dependencies lib/services/contactService
 */

import { useState, useEffect, useCallback } from 'react'
import { contactService } from '@/lib/services/contactService'
import type { Contact } from '@/lib/storage'

interface UseContactsReturn {
  contacts: Contact[]
  loading: boolean
  error: string | null
  createContact: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Contact>
  updateContact: (id: string, updates: Partial<Contact>) => Promise<Contact>
  deleteContact: (id: string) => Promise<void>
  getContactById: (id: string) => Contact | null
  searchContacts: (query: string) => Contact[]
  getContactsByType: (type: Contact['relationshipType']) => Contact[]
  reload: () => void
}

/**
 * Custom hook for contact management
 * 
 * @example
 * ```tsx
 * function ContactList() {
 *   const { contacts, loading, error, createContact } = useContacts()
 *   
 *   if (loading) return <div>Loading...</div>
 *   if (error) return <div>Error: {error}</div>
 *   
 *   return <div>{contacts.map(c => <div key={c.id}>{c.name}</div>)}</div>
 * }
 * ```
 */
export function useContacts(): UseContactsReturn {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load contacts
  const loadContacts = useCallback(() => {
    try {
      setLoading(true)
      setError(null)
      const data = contactService.getAll()
      setContacts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load contacts')
    } finally {
      setLoading(false)
    }
  }, [])

  // Load on mount
  useEffect(() => {
    loadContacts()
  }, [loadContacts])

  // Create contact
  const createContact = useCallback(
    async (contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => {
      try {
        const newContact = contactService.create(contactData)
        setContacts((prev) => [newContact, ...prev])
        return newContact
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create contact'
        setError(errorMessage)
        throw new Error(errorMessage)
      }
    },
    []
  )

  // Update contact
  const updateContact = useCallback(async (id: string, updates: Partial<Contact>) => {
    try {
      const updated = contactService.update(id, updates)
      setContacts((prev) => prev.map((contact) => (contact.id === id ? updated : contact)))
      return updated
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update contact'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }, [])

  // Delete contact
  const deleteContact = useCallback(async (id: string) => {
    try {
      contactService.delete(id)
      setContacts((prev) => prev.filter((contact) => contact.id !== id))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete contact'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }, [])

  // Get contact by ID
  const getContactById = useCallback(
    (id: string): Contact | null => {
      return contacts.find((c) => c.id === id) || null
    },
    [contacts]
  )

  // Search contacts
  const searchContacts = useCallback(
    (query: string): Contact[] => {
      return contactService.search(query)
    },
    []
  )

  // Get contacts by type
  const getContactsByType = useCallback(
    (type: Contact['relationshipType']): Contact[] => {
      return contacts.filter((c) => c.relationshipType === type)
    },
    [contacts]
  )

  return {
    contacts,
    loading,
    error,
    createContact,
    updateContact,
    deleteContact,
    getContactById,
    searchContacts,
    getContactsByType,
    reload: loadContacts,
  }
}

