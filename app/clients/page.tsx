'use client'

import { useEffect, useMemo, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import HomeButton from '@/components/HomeButton'
import {
  UserGroupIcon,
  UserIcon,
  BuildingOfficeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  TrashIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline'
import {
  getContacts,
  saveContact,
  updateContact,
  removeContact,
  type Contact
} from '@/lib/storage'
import URLContactImporter from '@/components/URLContactImporter'

export default function ClientsPage() {
  const [activeTab, setActiveTab] = useState('clients')
  const [clients, setClients] = useState<Contact[]>([])
  const [query, setQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Contact | null>(null)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', contactPerson: '', notes: ''
  })
  const [showImporter, setShowImporter] = useState(false)
  const [profileUrl, setProfileUrl] = useState('')

  useEffect(() => {
    load()
  }, [])

  const load = () => {
    const all = getContacts()
    const onlyClients = all.filter(c => (c.relationshipType || 'client') === 'client')
    setClients(onlyClients)
  }

  const filtered = useMemo(() => {
    if (!query.trim()) return clients
    const q = query.toLowerCase()
    return clients.filter(c =>
      [c.name, c.email, c.company, c.contactPerson, c.notes]
        .filter(Boolean)
        .some(v => String(v).toLowerCase().includes(q))
    )
  }, [clients, query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() && !form.email.trim()) {
      alert('Please provide at least a name or an email to add a client.')
      return
    }
    const base: Contact = {
      id: editing?.id || `contact_${Date.now()}`,
      name: form.name || 'Unnamed Client',
      email: form.email || '',
      phone: form.phone || undefined,
      company: form.company || undefined,
      contactPerson: form.contactPerson || undefined,
      industry: undefined,
      projects: editing?.projects || [],
      howMet: undefined,
      notes: form.notes || undefined,
      profileUrl: profileUrl || undefined,
      relationshipType: 'client',
      createdAt: editing?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    if (editing) {
      updateContact(base)
    } else {
      saveContact(base)
    }
    setShowForm(false)
    setEditing(null)
    setForm({ name: '', email: '', phone: '', company: '', contactPerson: '', notes: '' })
    setProfileUrl('')
    load()
  }

  const handleDelete = (id: string) => {
    removeContact(id)
    load()
  }

  return (
    <div className="min-h-screen bg-black">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <HomeButton />

      <header className="bg-dark-900 border-b border-dark-800 ml-16 lg:ml-80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <UserGroupIcon className="h-6 w-6 text-accent-500" />
              <h1 className="text-2xl font-bold gradient-text">Clients</h1>
              <span className="text-sm text-dark-400">Client directory and projects</span>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <PlusIcon className="h-4 w-4" />
              <span>Add Client</span>
            </button>
            <button
              onClick={() => setShowImporter(true)}
              className="ml-3 px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white hover:bg-dark-700"
            >
              Import from URL
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 ml-16 lg:ml-80">
        <div className="card mb-6">
          <div className="flex items-center space-x-2">
            <MagnifyingGlassIcon className="h-5 w-5 text-dark-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search clients by name, email, company..."
              className="flex-1 bg-dark-800 border border-dark-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-500"
            />
            <div className="text-dark-400 text-sm">{filtered.length} results</div>
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map(c => (
            <div key={c.id} className="card">
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  {c.profileUrl ? (
                    <a
                      href={c.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-medium truncate hover:underline"
                      aria-label={`Open ${c.name} profile`}
                    >
                      {c.name}
                    </a>
                  ) : (
                    <p className="text-white font-medium truncate">{c.name}</p>
                  )}
                  <p className="text-xs text-dark-400">{c.email}</p>
                  {c.company && (
                    <p className="text-xs text-dark-400 flex items-center space-x-1">
                      <BuildingOfficeIcon className="h-4 w-4" />
                      <span>{c.company}</span>
                    </p>
                  )}
                  {c.contactPerson && (
                    <p className="text-xs text-dark-400 flex items-center space-x-1">
                      <UserIcon className="h-4 w-4" />
                      <span>Contact: {c.contactPerson}</span>
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setEditing(c)
                      setForm({
                        name: c.name,
                        email: c.email,
                        phone: c.phone || '',
                        company: c.company || '',
                        contactPerson: c.contactPerson || '',
                        notes: c.notes || ''
                      })
                      setProfileUrl(c.profileUrl || '')
                      setShowForm(true)
                    }}
                    className="px-3 py-1.5 text-sm bg-dark-800 border border-dark-700 rounded-lg text-white hover:bg-dark-700"
                  >
                    <span className="inline-flex items-center space-x-1"><PencilSquareIcon className="h-4 w-4" /><span>Edit</span></span>
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="px-3 py-1.5 text-sm bg-red-900/30 border border-red-800 rounded-lg text-red-300 hover:bg-red-900/40"
                  >
                    <span className="inline-flex items-center space-x-1"><TrashIcon className="h-4 w-4" /><span>Delete</span></span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12 card">
              <UserIcon className="h-12 w-12 text-dark-600 mx-auto mb-3" />
              <p className="text-white font-medium">No clients found</p>
              <p className="text-dark-400 text-sm">Add your first client to get started</p>
            </div>
          )}
        </div>
      </main>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-dark-900 border border-dark-800 rounded-lg w-full max-w-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">{editing ? 'Edit Client' : 'Add Client'}</h3>
                <button onClick={() => { setShowForm(false); setEditing(null) }} className="text-dark-300 hover:text-white">✕</button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-dark-300 mb-1">Name</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm text-dark-300 mb-1">Email</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm text-dark-300 mb-1">Phone</label>
                    <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm text-dark-300 mb-1">Company</label>
                    <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-dark-300 mb-1">Contact Person</label>
                    <input value={form.contactPerson} onChange={(e) => setForm({ ...form, contactPerson: e.target.value })} className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-dark-300 mb-1">Notes</label>
                    <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm h-20 resize-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-dark-300 mb-1">Profile URL (optional)</label>
                    <div className="flex space-x-2">
                      <input
                        value={profileUrl}
                        onChange={(e) => setProfileUrl(e.target.value)}
                        placeholder="https://linkedin.com/in/... or https://instagram.com/..."
                        className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => { if (profileUrl) setShowImporter(true) }}
                        className="px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white hover:bg-dark-600"
                      >
                        Import
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-3">
                  <button type="button" onClick={() => { setShowForm(false); setEditing(null) }} className="px-4 py-2 text-dark-300 hover:text-white">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg">{editing ? 'Save' : 'Add Client'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showImporter && (
        <URLContactImporter
          initialUrl={profileUrl || undefined}
          onImport={(data: any) => {
            setForm({
              name: data?.name || '',
              email: data?.email || '',
              phone: data?.phone || '',
              company: data?.company || '',
              contactPerson: '',
              notes: data?.bio || ''
            })
            setProfileUrl(data?.profileUrl || profileUrl)
            setEditing(null)
            setShowImporter(false)
            setShowForm(true)
          }}
          onClose={() => setShowImporter(false)}
        />
      )}
    </div>
  )
}


