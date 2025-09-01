'use client'

import { useState, useEffect } from 'react'
import { getUserProfile } from '@/lib/storage'
import HomeButton from '@/components/HomeButton'
import Sidebar from '@/components/Sidebar'
import UserProfileForm from '@/components/UserProfile'
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  Cog6ToothIcon,
  PhotoIcon,
  CheckIcon,
  XMarkIcon,
  PencilIcon
} from '@heroicons/react/24/outline'

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState<any>(null)
  const [showProfileForm, setShowProfileForm] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  const handleTabChange = (tab: string) => {
    if (tab === 'profile') {
      // Stay on profile page
      return
    }
    // Navigate to other pages
    window.location.href = `/${tab === 'dashboard' ? 'dashboard' : tab}`
  }

  useEffect(() => {
    // Load user profile
    const profile = getUserProfile()
    if (profile) {
      setUserProfile(profile)
    } else {
      // Show profile form if no profile exists
      setShowProfileForm(true)
    }
  }, [])

  const handleProfileSave = () => {
    const profile = getUserProfile()
    if (profile) {
      setUserProfile(profile)
      setShowProfileForm(false)
    }
  }

  const handleProfileClose = () => {
    setShowProfileForm(false)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-dark-900 border-b border-dark-700 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Profile Management</h1>
          <HomeButton />
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Main Content */}
        <div className="flex-1 p-6">
          {showProfileForm ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-dark-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  {userProfile ? 'Edit Profile' : 'Complete Your Profile'}
                </h2>
                <UserProfileForm 
                  onClose={handleProfileClose}
                  onSave={handleProfileSave}
                />
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              {/* Profile Overview */}
              <div className="bg-dark-800 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
                  <button
                    onClick={() => setShowProfileForm(true)}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <PencilIcon className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                </div>

                {userProfile && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Profile Picture */}
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative">
                        {userProfile.profilePicture ? (
                          <img
                            src={userProfile.profilePicture}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-dark-600"
                          />
                        ) : (
                          <div className="w-32 h-32 rounded-full bg-dark-600 flex items-center justify-center">
                            <UserIcon className="w-16 h-16 text-dark-400" />
                          </div>
                        )}
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-semibold text-white">
                          {userProfile.firstName} {userProfile.lastName}
                        </h3>
                        <p className="text-dark-300">{userProfile.email}</p>
                      </div>
                    </div>

                    {/* Profile Details */}
                    <div className="space-y-4">
                      <div className="bg-dark-700 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-white mb-3">Personal Information</h4>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <UserIcon className="w-5 h-5 text-blue-400" />
                            <span className="text-dark-300">Name:</span>
                            <span className="text-white">{userProfile.firstName} {userProfile.lastName}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <EnvelopeIcon className="w-5 h-5 text-blue-400" />
                            <span className="text-dark-300">Email:</span>
                            <span className="text-white">{userProfile.email}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <PhoneIcon className="w-5 h-5 text-blue-400" />
                            <span className="text-dark-300">Phone:</span>
                            <span className="text-white">{userProfile.phone || 'Not provided'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-dark-700 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-white mb-3">Company Information</h4>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <BuildingOfficeIcon className="w-5 h-5 text-green-400" />
                            <span className="text-dark-300">Company:</span>
                            <span className="text-white">{userProfile.companyName || 'Not provided'}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Cog6ToothIcon className="w-5 h-5 text-green-400" />
                            <span className="text-dark-300">Timezone:</span>
                            <span className="text-white">{userProfile.timezone || 'Not set'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-dark-700 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-white mb-3">Preferences</h4>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <span className="text-dark-300">Theme:</span>
                            <span className="text-white capitalize">{userProfile.preferences?.theme || 'dark'}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-dark-300">Language:</span>
                            <span className="text-white capitalize">{userProfile.preferences?.language || 'en'}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-dark-300">Currency:</span>
                            <span className="text-white">{userProfile.preferences?.currency || 'USD'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-dark-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setShowProfileForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition-colors text-center"
                  >
                    <PencilIcon className="w-8 h-8 mx-auto mb-2" />
                    <span>Edit Profile</span>
                  </button>
                  <button
                    onClick={() => window.location.href = '/dashboard'}
                    className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg transition-colors text-center"
                  >
                    <UserIcon className="w-8 h-8 mx-auto mb-2" />
                    <span>View Dashboard</span>
                  </button>
                  <button
                    onClick={() => window.location.href = '/settings'}
                    className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg transition-colors text-center"
                  >
                    <Cog6ToothIcon className="w-8 h-8 mx-auto mb-2" />
                    <span>Settings</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
