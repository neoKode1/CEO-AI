'use client'

import { useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import HomeButton from '@/components/HomeButton'
import {
  DocumentArrowUpIcon,
  FolderIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  DocumentTextIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import {
  saveDocument,
  getDocuments,
  removeDocument,
  type DocumentItem
} from '@/lib/storage'

type UploadCategory = DocumentItem['category']

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState('documents')
  const [documents, setDocuments] = useState<DocumentItem[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<UploadCategory>('official')
  const [notes, setNotes] = useState('')
  const [filterCategory, setFilterCategory] = useState<'all' | UploadCategory>('all')

  useEffect(() => {
    const docs = getDocuments()
    setDocuments(docs)
  }, [])

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    const files = Array.from(e.target.files)
    setIsUploading(true)

    for (const file of files) {
      const dataUrl = await readFileAsDataUrl(file)
      saveDocument({
        filename: file.name,
        mimeType: file.type || 'application/octet-stream',
        sizeBytes: file.size,
        category: selectedCategory,
        notes: notes.trim() ? notes.trim() : undefined,
        dataUrl
      })
    }

    setNotes('')
    ;(e.target as HTMLInputElement).value = ''
    setDocuments(getDocuments())
    setIsUploading(false)
  }

  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result))
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleRemove = (id: string) => {
    removeDocument(id)
    setDocuments(getDocuments())
  }

  const handleDownload = (doc: DocumentItem) => {
    const link = document.createElement('a')
    link.href = doc.dataUrl
    link.download = doc.filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredDocs = documents.filter(d => filterCategory === 'all' ? true : d.category === filterCategory)

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
  }

  return (
    <div className="min-h-screen bg-black">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <HomeButton />

      <header className="bg-dark-900 border-b border-dark-800 ml-16 lg:ml-80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <DocumentTextIcon className="h-6 w-6 text-accent-500" />
              <h1 className="text-2xl font-bold gradient-text">Documents</h1>
              <span className="text-sm text-dark-400">Upload and manage business documents</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 ml-16 lg:ml-80">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <DocumentArrowUpIcon className="h-5 w-5 text-accent-500" />
                <span>Upload Documents</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as UploadCategory)}
                    className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm focus:border-accent-500 focus:outline-none"
                    aria-label="Select document category"
                  >
                    <option value="official">Official</option>
                    <option value="license">Business License</option>
                    <option value="contract">Contract</option>
                    <option value="financial">Financial</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Notes (optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm h-20 resize-none focus:border-accent-500 focus:outline-none"
                    placeholder="Add a short description or tags"
                    aria-label="Document notes"
                  />
                </div>

                <label
                  tabIndex={0}
                  aria-label="Upload files"
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { (document.getElementById('file-input') as HTMLInputElement)?.click() } }}
                  className={`flex items-center justify-center w-full px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isUploading ? 'border-dark-700 text-dark-400' : 'border-dark-700 text-dark-300 hover:border-accent-600 hover:text-white'}`}
                >
                  <input
                    id="file-input"
                    type="file"
                    multiple
                    onChange={handleFileInputChange}
                    className="hidden"
                    aria-hidden="true"
                  />
                  <div className="flex items-center space-x-2">
                    <DocumentArrowUpIcon className="h-5 w-5" />
                    <span>{isUploading ? 'Uploading...' : 'Click to upload or drag files here'}</span>
                  </div>
                </label>

                <div className="flex items-center text-xs text-dark-400 space-x-2">
                  <CheckCircleIcon className="h-4 w-4" />
                  <span>Stored locally in your browser</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="card mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FolderIcon className="h-5 w-5 text-accent-500" />
                  <h2 className="text-white font-semibold">Your Documents</h2>
                  <span className="text-dark-400 text-sm">{filteredDocs.length} items</span>
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value as any)}
                  className="px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm focus:border-accent-500 focus:outline-none"
                  aria-label="Filter documents by category"
                >
                  <option value="all">All</option>
                  <option value="official">Official</option>
                  <option value="license">Business License</option>
                  <option value="contract">Contract</option>
                  <option value="financial">Financial</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredDocs.map((doc) => (
                <div key={doc.id} className="card">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-white font-medium truncate">{doc.filename}</p>
                      <p className="text-xs text-dark-400">
                        {doc.category} • {doc.mimeType || 'file'} • {formatBytes(doc.sizeBytes)}
                      </p>
                      {doc.notes && (
                        <p className="text-xs text-dark-300 mt-1">{doc.notes}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDownload(doc)}
                        className="px-3 py-1.5 text-sm bg-dark-800 border border-dark-700 rounded-lg text-white hover:bg-dark-700"
                        aria-label={`Download ${doc.filename}`}
                      >
                        <span className="inline-flex items-center space-x-1"><ArrowDownTrayIcon className="h-4 w-4" /><span>Download</span></span>
                      </button>
                      <button
                        onClick={() => handleRemove(doc.id)}
                        className="px-3 py-1.5 text-sm bg-red-900/30 border border-red-800 rounded-lg text-red-300 hover:bg-red-900/40"
                        aria-label={`Delete ${doc.filename}`}
                      >
                        <span className="inline-flex items-center space-x-1"><TrashIcon className="h-4 w-4" /><span>Delete</span></span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredDocs.length === 0 && (
                <div className="text-center py-12 card">
                  <DocumentTextIcon className="h-12 w-12 text-dark-600 mx-auto mb-3" />
                  <p className="text-white font-medium">No documents yet</p>
                  <p className="text-dark-400 text-sm">Upload files to see them here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


