'use client'

import { useState, useEffect } from 'react'
import { UserProfile, saveUserProfile, updateUserProfile } from '@/lib/storage'
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  BuildingOfficeIcon,
  Cog6ToothIcon,
  PhotoIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface UserProfileFormProps {
  onClose: () => void
  onSave: () => void
}

export default function UserProfileForm({ onClose, onSave }: UserProfileFormProps) {
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    email: '',
    firstName: '',
    lastName: '',
    companyName: '',
    phone: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    preferences: {
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      theme: 'dark',
      language: 'en',
      currency: 'USD'
    }
  })

  const [isLoading, setIsLoading] = useState(false)
  const [profilePicture, setProfilePicture] = useState<string>('')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // Load existing profile if available
    const existingProfile = localStorage.getItem('ceo-ai-user-profile')
    if (existingProfile) {
      const parsed = JSON.parse(existingProfile)
      setProfile(parsed)
      setProfilePicture(parsed.profilePicture || '')
      setIsEditing(true)
    }
  }, [])

  const handleInputChange = (field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePreferenceChange = (category: string, field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences!,
        [category]: {
          ...(prev.preferences as any)[category],
          [field]: value
        }
      }
    }))
  }

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setProfilePicture(result)
        setProfile(prev => ({ ...prev, profilePicture: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isEditing) {
        updateUserProfile(profile)
      } else {
        saveUserProfile(profile as Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>)
      }
      
      setTimeout(() => {
        onSave()
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error saving profile:', error)
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-dark-900 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <UserIcon className="h-6 w-6 text-accent-500" />
              <h2 className="text-xl font-bold text-white">
                {isEditing ? 'Edit Profile' : 'Complete Your Profile'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-dark-400 hover:text-white transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-2 border-accent-500"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-dark-800 border-2 border-dark-700 flex items-center justify-center">
                    <PhotoIcon className="h-8 w-8 text-dark-400" />
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-accent-500 rounded-full p-1 cursor-pointer">
                  <PhotoIcon className="h-4 w-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <h3 className="text-white font-medium">Profile Picture</h3>
                <p className="text-dark-400 text-sm">Upload a professional photo</p>
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">First Name</label>
                <input
                  type="text"
                  value={profile.firstName || ''}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:border-accent-500 focus:outline-none"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  value={profile.lastName || ''}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:border-accent-500 focus:outline-none"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Email Address</label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-400" />
                <input
                  type="email"
                  value={profile.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full p-3 pl-10 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:border-accent-500 focus:outline-none"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Company Name</label>
              <div className="relative">
                <BuildingOfficeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-400" />
                <input
                  type="text"
                  value={profile.companyName || ''}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="w-full p-3 pl-10 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:border-accent-500 focus:outline-none"
                  placeholder="Your Company Name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Phone Number</label>
              <div className="relative">
                <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-400" />
                <input
                  type="tel"
                  value={profile.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full p-3 pl-10 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:border-accent-500 focus:outline-none"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Timezone</label>
              <select
                value={profile.timezone || ''}
                onChange={(e) => handleInputChange('timezone', e.target.value)}
                className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:border-accent-500 focus:outline-none"
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="Europe/London">London (GMT)</option>
                <option value="Europe/Paris">Paris (CET)</option>
                <option value="Asia/Tokyo">Tokyo (JST)</option>
                <option value="Asia/Shanghai">Shanghai (CST)</option>
              </select>
            </div>

            {/* Preferences */}
            <div className="border-t border-dark-700 pt-6">
              <div className="flex items-center space-x-2 mb-4">
                <Cog6ToothIcon className="h-5 w-5 text-accent-500" />
                <h3 className="text-white font-medium">Preferences</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Notifications */}
                <div>
                  <h4 className="text-white font-medium mb-3">Notifications</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={profile.preferences?.notifications.email || false}
                        onChange={(e) => handlePreferenceChange('notifications', 'email', e.target.checked)}
                        className="rounded border-dark-600 bg-dark-800 text-accent-500 focus:ring-accent-500"
                      />
                      <span className="text-dark-300">Email notifications</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={profile.preferences?.notifications.push || false}
                        onChange={(e) => handlePreferenceChange('notifications', 'push', e.target.checked)}
                        className="rounded border-dark-600 bg-dark-800 text-accent-500 focus:ring-accent-500"
                      />
                      <span className="text-dark-300">Push notifications</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={profile.preferences?.notifications.sms || false}
                        onChange={(e) => handlePreferenceChange('notifications', 'sms', e.target.checked)}
                        className="rounded border-dark-600 bg-dark-800 text-accent-500 focus:ring-accent-500"
                      />
                      <span className="text-dark-300">SMS notifications</span>
                    </label>
                  </div>
                </div>

                {/* Display Settings */}
                <div>
                  <h4 className="text-white font-medium mb-3">Display</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-dark-300 text-sm mb-1">Theme</label>
                      <select
                        value={profile.preferences?.theme || 'dark'}
                        onChange={(e) => handlePreferenceChange('theme', 'theme', e.target.value)}
                        className="w-full p-2 bg-dark-800 border border-dark-700 rounded text-white text-sm focus:border-accent-500 focus:outline-none"
                      >
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-dark-300 text-sm mb-1">Currency</label>
                      <select
                        value={profile.preferences?.currency || 'USD'}
                        onChange={(e) => handlePreferenceChange('currency', 'currency', e.target.value)}
                        className="w-full p-2 bg-dark-800 border border-dark-700 rounded text-white text-sm focus:border-accent-500 focus:outline-none"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="JPY">JPY (¥)</option>
                        <option value="CAD">CAD (C$)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-dark-700">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-dark-600 text-white rounded-lg hover:border-dark-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-accent-500 hover:bg-accent-400 text-white rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <CheckIcon className="h-4 w-4" />
                    <span>{isEditing ? 'Update Profile' : 'Save Profile'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
