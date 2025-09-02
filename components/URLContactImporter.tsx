'use client'

import { useState } from 'react'
import { 
  LinkIcon, 
  UserPlusIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  GlobeAltIcon,
  AtSymbolIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'

interface ImportedContact {
  name?: string
  email?: string
  phone?: string
  company?: string
  industry?: string
  socialMedia?: {
    twitter?: string
    instagram?: string
    linkedin?: string
    website?: string
  }
  location?: string
  bio?: string
  followers?: number
  verified?: boolean
  profileUrl: string
  source: string
}

interface URLContactImporterProps {
  onImport: (contact: ImportedContact) => void
  onClose: () => void
  initialUrl?: string
}

const URLContactImporter = ({ onImport, onClose, initialUrl }: URLContactImporterProps) => {
  const [url, setUrl] = useState(initialUrl || '')
  const [isLoading, setIsLoading] = useState(false)
  const [importedData, setImportedData] = useState<ImportedContact | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const detectPlatform = (url: string): string => {
    if (url.includes('twitter.com') || url.includes('x.com')) return 'Twitter/X'
    if (url.includes('instagram.com')) return 'Instagram'
    if (url.includes('linkedin.com')) return 'LinkedIn'
    if (url.includes('facebook.com')) return 'Facebook'
    if (url.includes('youtube.com')) return 'YouTube'
    if (url.includes('tiktok.com')) return 'TikTok'
    if (url.includes('github.com')) return 'GitHub'
    if (url.includes('behance.net')) return 'Behance'
    if (url.includes('dribbble.com')) return 'Dribbble'
    return 'Website'
  }

  const extractUsername = (url: string, platform: string): string => {
    const urlObj = new URL(url)
    const pathParts = urlObj.pathname.split('/').filter(Boolean)
    
    switch (platform) {
      case 'Twitter/X':
        return pathParts[0] || ''
      case 'Instagram':
        return pathParts[0] || ''
      case 'LinkedIn':
        return pathParts[pathParts.length - 1] || ''
      case 'YouTube':
        return pathParts[pathParts.length - 1] || ''
      case 'GitHub':
        return pathParts[0] || ''
      default:
        return pathParts[0] || ''
    }
  }

  const mockFetchProfileData = async (url: string, platform: string): Promise<ImportedContact> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const username = extractUsername(url, platform)
    
    // Mock data based on platform
    switch (platform) {
      case 'Twitter/X':
        return {
          name: `@${username}`,
          bio: `Digital entrepreneur and business strategist. Building the future of ${platform.toLowerCase()}.`,
          socialMedia: {
            twitter: url,
            website: `https://${username}.com`
          },
          followers: Math.floor(Math.random() * 100000) + 1000,
          verified: Math.random() > 0.7,
          profileUrl: url,
          source: platform
        }
      
      case 'Instagram':
        return {
          name: username.charAt(0).toUpperCase() + username.slice(1),
          bio: `Creative professional sharing insights and experiences.`,
          socialMedia: {
            instagram: url
          },
          followers: Math.floor(Math.random() * 50000) + 500,
          verified: Math.random() > 0.8,
          profileUrl: url,
          source: platform
        }
      
      case 'LinkedIn':
        return {
          name: username.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          company: 'Professional Network',
          industry: 'Technology',
          socialMedia: {
            linkedin: url
          },
          profileUrl: url,
          source: platform
        }
      
      case 'GitHub':
        return {
          name: username,
          company: 'Open Source',
          industry: 'Software Development',
                     socialMedia: {
             website: `https://${username}.dev`
           },
          followers: Math.floor(Math.random() * 5000) + 100,
          profileUrl: url,
          source: platform
        }
      
      default:
        return {
          name: username.charAt(0).toUpperCase() + username.slice(1),
          company: 'Professional',
          industry: 'Business',
          socialMedia: {
            website: url
          },
          profileUrl: url,
          source: platform
        }
    }
  }

  const handleImport = async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL')
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      
      // Validate URL
      new URL(url)
      
      const platform = detectPlatform(url)
      const profileData = await mockFetchProfileData(url, platform)
      
      setImportedData(profileData)
      setIsSuccess(true)
      
    } catch (err) {
      setError('Please enter a valid URL')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveContact = () => {
    if (importedData) {
      onImport(importedData)
      setIsSuccess(false)
      setImportedData(null)
      setUrl('')
    }
  }

  const handleClose = () => {
    setUrl('')
    setImportedData(null)
    setError(null)
    setIsSuccess(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-dark-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <LinkIcon className="h-6 w-6 mr-2 text-accent-500" />
              Import Contact from URL
            </h3>
            <button
              onClick={handleClose}
              className="text-dark-300 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* URL Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-white mb-2">
              Enter Profile URL
            </label>
            <div className="flex space-x-2">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://twitter.com/username or https://instagram.com/username"
                className="flex-1 bg-dark-700 text-white px-3 py-2 rounded-lg border border-dark-600 focus:outline-none focus:ring-2 focus:ring-accent-500"
                disabled={isLoading}
              />
              <button
                onClick={handleImport}
                disabled={isLoading || !url.trim()}
                className="bg-accent-500 hover:bg-accent-600 disabled:bg-dark-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <>
                    <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
                    Import
                  </>
                )}
              </button>
            </div>
            {error && (
              <p className="text-red-400 text-sm mt-2 flex items-center">
                <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                {error}
              </p>
            )}
          </div>

          {/* Imported Data Display */}
          {importedData && (
            <div className="mb-6">
              <div className="bg-dark-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-white">Imported Profile Data</h4>
                  <span className="text-xs bg-accent-500 text-white px-2 py-1 rounded">
                    {importedData.source}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Basic Info */}
                  <div className="space-y-3">
                    {importedData.name && (
                      <div className="flex items-center space-x-2">
                        <UserPlusIcon className="h-4 w-4 text-accent-500" />
                        <span className="text-white font-medium">{importedData.name}</span>
                      </div>
                    )}
                    
                    {importedData.company && (
                      <div className="flex items-center space-x-2">
                        <BuildingOfficeIcon className="h-4 w-4 text-dark-400" />
                        <span className="text-dark-300">{importedData.company}</span>
                      </div>
                    )}
                    
                    {importedData.industry && (
                      <div className="flex items-center space-x-2">
                        <GlobeAltIcon className="h-4 w-4 text-dark-400" />
                        <span className="text-dark-300">{importedData.industry}</span>
                      </div>
                    )}
                    
                    {importedData.location && (
                      <div className="flex items-center space-x-2">
                        <MapPinIcon className="h-4 w-4 text-dark-400" />
                        <span className="text-dark-300">{importedData.location}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Social Media & Stats */}
                  <div className="space-y-3">
                    {importedData.followers && (
                      <div className="flex items-center space-x-2">
                        <UserPlusIcon className="h-4 w-4 text-dark-400" />
                        <span className="text-dark-300">{importedData.followers.toLocaleString()} followers</span>
                      </div>
                    )}
                    
                    {importedData.verified && (
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-blue-500" />
                        <span className="text-blue-400 text-sm">Verified Account</span>
                      </div>
                    )}
                    
                    {importedData.bio && (
                      <div className="text-dark-300 text-sm">
                        {importedData.bio}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Social Media Links */}
                {importedData.socialMedia && (
                  <div className="mt-4 pt-4 border-t border-dark-600">
                    <h5 className="text-sm font-medium text-white mb-2">Social Media Links</h5>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(importedData.socialMedia).map(([platform, link]) => (
                        <a
                          key={platform}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent-400 hover:text-accent-300 text-sm flex items-center"
                        >
                          <GlobeAltIcon className="h-3 w-3 mr-1" />
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {importedData && (
              <button
                onClick={handleSaveContact}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
              >
                <UserPlusIcon className="h-4 w-4 mr-2" />
                Add to Network
              </button>
            )}
            <button
              onClick={handleClose}
              className="flex-1 bg-dark-700 hover:bg-dark-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* Success Message */}
          {isSuccess && (
            <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
              <div className="flex items-center text-green-400">
                <CheckCircleIcon className="h-5 w-5 mr-2" />
                <span className="text-sm">Profile data imported successfully!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default URLContactImporter
