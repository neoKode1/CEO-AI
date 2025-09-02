'use client'

import { useEffect, useMemo, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import HomeButton from '@/components/HomeButton'
import {
  DocumentCheckIcon,
  PencilSquareIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline'
import {
  getContracts,
  saveContract,
  updateContract,
  removeContract,
  type ContractItem
} from '@/lib/storage'

type Purpose = ContractItem['purpose']

export default function ContractsPage() {
  const [activeTab, setActiveTab] = useState('contracts')
  const [contracts, setContracts] = useState<ContractItem[]>([])

  const [title, setTitle] = useState('')
  const [purpose, setPurpose] = useState<Purpose>('service-agreement')
  const [companyName, setCompanyName] = useState('')
  const [counterpartyName, setCounterpartyName] = useState('')
  const [effectiveDate, setEffectiveDate] = useState('')
  const [governingLaw, setGoverningLaw] = useState('')
  const [paymentTerms, setPaymentTerms] = useState('')
  const [scope, setScope] = useState('')
  const [termination, setTermination] = useState('')
  const [additionalClauses, setAdditionalClauses] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    setContracts(getContracts())
  }, [])

  const template = useMemo(() => buildTemplate({
    purpose,
    companyName,
    counterpartyName,
    effectiveDate,
    governingLaw,
    paymentTerms,
    scope,
    termination,
    additionalClauses
  }), [purpose, companyName, counterpartyName, effectiveDate, governingLaw, paymentTerms, scope, termination, additionalClauses])

  useEffect(() => {
    setContent(template)
  }, [template])

  const handleGenerate = () => {
    const finalTitle = title.trim() || defaultTitleFor(purpose)
    saveContract({
      title: finalTitle,
      purpose,
      parties: { companyName, counterpartyName },
      effectiveDate,
      governingLaw,
      paymentTerms,
      scope,
      termination,
      additionalClauses,
      content
    })
    clearForm()
    setContracts(getContracts())
  }

  const clearForm = () => {
    setTitle('')
    setPurpose('service-agreement')
    setCompanyName('')
    setCounterpartyName('')
    setEffectiveDate('')
    setGoverningLaw('')
    setPaymentTerms('')
    setScope('')
    setTermination('')
    setAdditionalClauses('')
    setContent('')
  }

  const handleDelete = (id: string) => {
    removeContract(id)
    setContracts(getContracts())
  }

  const handleDownload = (c: ContractItem) => {
    const blob = new Blob([c.content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${c.title.replace(/[^a-z0-9-_]+/gi, '_')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleDuplicate = (c: ContractItem) => {
    saveContract({
      title: `${c.title} (Copy)`,
      purpose: c.purpose,
      parties: c.parties,
      effectiveDate: c.effectiveDate,
      governingLaw: c.governingLaw,
      paymentTerms: c.paymentTerms,
      scope: c.scope,
      termination: c.termination,
      additionalClauses: c.additionalClauses,
      content: c.content
    })
    setContracts(getContracts())
  }

  return (
    <div className="min-h-screen bg-black">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <HomeButton />

      <header className="bg-dark-900 border-b border-dark-800 ml-16 lg:ml-80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <DocumentCheckIcon className="h-6 w-6 text-accent-500" />
              <h1 className="text-2xl font-bold gradient-text">Contract Generator</h1>
              <span className="text-sm text-dark-400">Create and store basic contracts</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 ml-16 lg:ml-80">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-white font-semibold mb-4">Contract Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-dark-300 mb-2">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Services Agreement with Acme Co."
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm focus:border-accent-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Purpose</label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value as Purpose)}
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm focus:border-accent-500 focus:outline-none"
                >
                  <option value="service-agreement">Service Agreement</option>
                  <option value="nda">NDA</option>
                  <option value="employment">Employment Agreement</option>
                  <option value="msa">Master Services Agreement (MSA)</option>
                  <option value="sow">Statement of Work (SOW)</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Effective Date</label>
                <input
                  type="date"
                  value={effectiveDate}
                  onChange={(e) => setEffectiveDate(e.target.value)}
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm focus:border-accent-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Your Company</label>
                <input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Your company name"
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm focus:border-accent-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Counterparty</label>
                <input
                  value={counterpartyName}
                  onChange={(e) => setCounterpartyName(e.target.value)}
                  placeholder="The other party"
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm focus:border-accent-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Governing Law</label>
                <input
                  value={governingLaw}
                  onChange={(e) => setGoverningLaw(e.target.value)}
                  placeholder="e.g., Delaware, California, etc."
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm focus:border-accent-500 focus:outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-dark-300 mb-2">Scope / Description</label>
                <textarea
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm h-20 resize-none focus:border-accent-500 focus:outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-dark-300 mb-2">Payment Terms</label>
                <textarea
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value)}
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm h-20 resize-none focus:border-accent-500 focus:outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-dark-300 mb-2">Termination</label>
                <textarea
                  value={termination}
                  onChange={(e) => setTermination(e.target.value)}
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm h-20 resize-none focus:border-accent-500 focus:outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-dark-300 mb-2">Additional Clauses</label>
                <textarea
                  value={additionalClauses}
                  onChange={(e) => setAdditionalClauses(e.target.value)}
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm h-20 resize-none focus:border-accent-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white font-semibold">Preview</h2>
                <button
                  onClick={handleGenerate}
                  className="px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg text-sm"
                  aria-label="Generate contract"
                >
                  Save Contract
                </button>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-[420px] px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm leading-6 focus:border-accent-500 focus:outline-none"
              />
              <p className="text-xs text-dark-400 mt-2">Disclaimer: This is a basic template and not legal advice. Consult a qualified attorney for legal matters.</p>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-semibold">Saved Contracts</h2>
                <span className="text-dark-400 text-sm">{contracts.length} items</span>
              </div>
            </div>

            <div className="space-y-3">
              {contracts.map((c) => (
                <div key={c.id} className="card">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 pr-4">
                      <p className="text-white font-medium truncate">{c.title}</p>
                      <p className="text-xs text-dark-400">{c.purpose} • Effective: {c.effectiveDate || 'N/A'} • {c.parties.companyName} ↔ {c.parties.counterpartyName}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDuplicate(c)}
                        className="px-3 py-1.5 text-sm bg-dark-800 border border-dark-700 rounded-lg text-white hover:bg-dark-700"
                        aria-label={`Duplicate ${c.title}`}
                      >
                        <span className="inline-flex items-center space-x-1"><DocumentDuplicateIcon className="h-4 w-4" /><span>Duplicate</span></span>
                      </button>
                      <button
                        onClick={() => handleDownload(c)}
                        className="px-3 py-1.5 text-sm bg-dark-800 border border-dark-700 rounded-lg text-white hover:bg-dark-700"
                        aria-label={`Download ${c.title}`}
                      >
                        <span className="inline-flex items-center space-x-1"><ArrowDownTrayIcon className="h-4 w-4" /><span>Download</span></span>
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="px-3 py-1.5 text-sm bg-red-900/30 border border-red-800 rounded-lg text-red-300 hover:bg-red-900/40"
                        aria-label={`Delete ${c.title}`}
                      >
                        <span className="inline-flex items-center space-x-1"><TrashIcon className="h-4 w-4" /><span>Delete</span></span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {contracts.length === 0 && (
                <div className="text-center py-12 card">
                  <PencilSquareIcon className="h-12 w-12 text-dark-600 mx-auto mb-3" />
                  <p className="text-white font-medium">No contracts yet</p>
                  <p className="text-dark-400 text-sm">Fill the form and save your first contract</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function defaultTitleFor(purpose: Purpose) {
  switch (purpose) {
    case 'nda': return 'Non-Disclosure Agreement'
    case 'employment': return 'Employment Agreement'
    case 'msa': return 'Master Services Agreement'
    case 'sow': return 'Statement of Work'
    case 'service-agreement': return 'Services Agreement'
    default: return 'Custom Agreement'
  }
}

function buildTemplate(params: {
  purpose: Purpose
  companyName: string
  counterpartyName: string
  effectiveDate: string
  governingLaw?: string
  paymentTerms?: string
  scope?: string
  termination?: string
  additionalClauses?: string
}) {
  const {
    purpose,
    companyName,
    counterpartyName,
    effectiveDate,
    governingLaw,
    paymentTerms,
    scope,
    termination,
    additionalClauses
  } = params

  const header = `${defaultTitleFor(purpose)}\n\n`
  const parties = `This ${defaultTitleFor(purpose)} ("Agreement") is entered into by and between ${companyName || '[Your Company]'} and ${counterpartyName || '[Counterparty]'} effective ${effectiveDate || '[Effective Date]'}.\n\n`
  const sections = [
    { title: '1. Scope', body: scope || '[Describe the services, deliverables, or obligations here.]' },
    { title: '2. Payment Terms', body: paymentTerms || '[Describe payment amounts, schedules, and invoicing terms here.]' },
    { title: '3. Confidentiality', body: 'Each party agrees to keep confidential information confidential and use it solely for the purposes of performing under this Agreement.' },
    { title: '4. Term and Termination', body: termination || 'This Agreement shall remain in effect until completion of the obligations described herein, unless terminated earlier by either party upon written notice.' },
    { title: '5. Intellectual Property', body: 'Unless otherwise agreed, each party retains ownership of its pre-existing intellectual property. Deliverables may be licensed or assigned as specified in writing.' },
    { title: '6. Limitation of Liability', body: 'Neither party shall be liable for indirect, incidental, special, or consequential damages arising out of or related to this Agreement.' },
    { title: '7. Governing Law', body: governingLaw || '[Specify governing law and venue.]' },
  ]

  if (additionalClauses && additionalClauses.trim()) {
    sections.push({ title: '8. Additional Clauses', body: additionalClauses })
  }

  const body = sections
    .map(s => `${s.title}\n${s.body}\n`)
    .join('\n')

  const signature = `\nIN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the date first above written.\n\n${companyName || '[Your Company]'}\nBy: ____________________________\n\n${counterpartyName || '[Counterparty]'}\nBy: ____________________________\n`

  return header + parties + body + signature
}


