'use client'

import { useState, useEffect } from 'react'
import HomeButton from '@/components/HomeButton'
import Sidebar from '@/components/Sidebar'
import { 
  UserGroupIcon,
  PlusIcon,
  UserIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  StarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  CalendarIcon,
  DocumentTextIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline'

// Mock team data
const teamMembers = [
  {
    id: 1,
    name: 'Chad Neo',
    role: 'CEO & Director',
    type: 'full-time',
    hourlyRate: 75,
    hoursThisWeek: 40,
    projects: ['Project Alpha', 'Project Beta', 'Project Gamma'],
    performance: 95,
    availability: 'available',
    skills: ['Directing', 'Producing', 'Screenwriting', 'Project Management'],
    contact: { email: 'chad@darkorchestrafilms.com', phone: '+1 (555) 123-4567' }
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Cinematographer',
    type: 'contractor',
    hourlyRate: 65,
    hoursThisWeek: 35,
    projects: ['Project Alpha', 'Project Gamma'],
    performance: 88,
    availability: 'available',
    skills: ['Cinematography', 'Lighting', 'Camera Operation', 'Color Grading'],
    contact: { email: 'sarah@darkorchestrafilms.com', phone: '+1 (555) 234-5678' }
  },
  {
    id: 3,
    name: 'Mike Rodriguez',
    role: 'Editor',
    type: 'contractor',
    hourlyRate: 55,
    hoursThisWeek: 30,
    projects: ['Project Alpha', 'Project Gamma'],
    performance: 92,
    availability: 'busy',
    skills: ['Video Editing', 'Sound Design', 'Post-Production', 'Color Correction'],
    contact: { email: 'mike@darkorchestrafilms.com', phone: '+1 (555) 345-6789' }
  },
  {
    id: 4,
    name: 'Alex Johnson',
    role: 'Production Assistant',
    type: 'part-time',
    hourlyRate: 25,
    hoursThisWeek: 20,
    projects: ['Project Beta'],
    performance: 78,
    availability: 'available',
    skills: ['Production Support', 'Location Scouting', 'Equipment Management'],
    contact: { email: 'alex@darkorchestrafilms.com', phone: '+1 (555) 456-7890' }
  },
  {
    id: 5,
    name: 'Lisa Wang',
    role: 'Sound Designer',
    type: 'contractor',
    hourlyRate: 60,
    hoursThisWeek: 15,
    projects: ['Project Gamma'],
    performance: 85,
    availability: 'available',
    skills: ['Sound Design', 'Audio Mixing', 'Foley', 'Music Composition'],
    contact: { email: 'lisa@darkorchestrafilms.com', phone: '+1 (555) 567-8901' }
  }
]

const teamStats = {
  totalMembers: 5,
  fullTime: 1,
  contractors: 3,
  partTime: 1,
  totalHours: 140,
  totalCost: 8750
}

const upcomingSchedules = [
  { member: 'Sarah Chen', project: 'Project Alpha', date: '2024-01-20', hours: 8, type: 'filming' },
  { member: 'Mike Rodriguez', project: 'Project Gamma', date: '2024-01-21', hours: 6, type: 'editing' },
  { member: 'Chad Neo', project: 'Project Beta', date: '2024-01-22', hours: 4, type: 'meeting' },
  { member: 'Alex Johnson', project: 'Project Beta', date: '2024-01-23', hours: 8, type: 'location' }
]

const performanceMetrics = [
  { member: 'Chad Neo', projects: 3, hours: 40, quality: 95, efficiency: 92 },
  { member: 'Sarah Chen', projects: 2, hours: 35, quality: 88, efficiency: 85 },
  { member: 'Mike Rodriguez', projects: 2, hours: 30, quality: 92, efficiency: 90 },
  { member: 'Alex Johnson', projects: 1, hours: 20, quality: 78, efficiency: 75 },
  { member: 'Lisa Wang', projects: 1, hours: 15, quality: 85, efficiency: 88 }
]

const skillGaps = [
  { skill: 'AI Integration', needed: 'high', available: 'low', members: ['Chad Neo'] },
  { skill: '3D Animation', needed: 'medium', available: 'none', members: [] },
  { skill: 'Drone Operation', needed: 'medium', available: 'low', members: ['Sarah Chen'] },
  { skill: 'VR/AR Development', needed: 'low', available: 'none', members: [] }
]

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showAddMember, setShowAddMember] = useState(false)
  const [selectedMember, setSelectedMember] = useState<number | null>(null)

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-900 text-green-300'
      case 'busy': return 'bg-yellow-900 text-yellow-300'
      case 'unavailable': return 'bg-red-900 text-red-300'
      default: return 'bg-dark-700 text-dark-300'
    }
  }

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-500'
    if (performance >= 80) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-blue-900 text-blue-300'
      case 'contractor': return 'bg-purple-900 text-purple-300'
      case 'part-time': return 'bg-orange-900 text-orange-300'
      default: return 'bg-dark-700 text-dark-300'
    }
  }

  const getScheduleTypeIcon = (type: string) => {
    switch (type) {
      case 'filming': return <VideoCameraIcon className="h-4 w-4 text-red-500" />
      case 'editing': return <DocumentTextIcon className="h-4 w-4 text-blue-500" />
      case 'meeting': return <UserGroupIcon className="h-4 w-4 text-green-500" />
      case 'location': return <CalendarIcon className="h-4 w-4 text-yellow-500" />
      default: return <ClockIcon className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Home Button */}
      <HomeButton />
      
      {/* Header */}
      <header className="bg-dark-900 border-b border-dark-800 ml-16 lg:ml-80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold gradient-text">Team Management</h1>
              <div className="flex items-center space-x-2">
                <UserGroupIcon className="h-5 w-5 text-accent-500" />
                <span className="text-sm text-dark-400">Staff & Contractor Oversight</span>
              </div>
            </div>
            <button 
              onClick={() => setShowAddMember(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <PlusIcon className="h-4 w-4" />
              <span>Add Member</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 ml-16 lg:ml-80">
        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-400">Total Team</p>
                <p className="text-2xl font-bold text-white">{teamStats.totalMembers}</p>
                <p className="text-sm text-dark-400">Members</p>
              </div>
              <UserGroupIcon className="h-8 w-8 text-accent-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-400">Total Hours</p>
                <p className="text-2xl font-bold text-white">{teamStats.totalHours}</p>
                <p className="text-sm text-dark-400">This week</p>
              </div>
              <ClockIcon className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-400">Weekly Cost</p>
                <p className="text-2xl font-bold text-white">${(teamStats.totalCost / 1000).toFixed(1)}k</p>
                <p className="text-sm text-dark-400">Labor cost</p>
              </div>
              <CurrencyDollarIcon className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-400">Avg Performance</p>
                <p className="text-2xl font-bold text-white">87%</p>
                <p className="text-sm text-green-500">Excellent</p>
              </div>
              <ChartBarIcon className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-dark-800 rounded-lg p-1 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-accent-600 text-white'
                : 'text-dark-300 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'members'
                ? 'bg-accent-600 text-white'
                : 'text-dark-300 hover:text-white'
            }`}
          >
            Team Members
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'schedule'
                ? 'bg-accent-600 text-white'
                : 'text-dark-300 hover:text-white'
            }`}
          >
            Schedule
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'performance'
                ? 'bg-accent-600 text-white'
                : 'text-dark-300 hover:text-white'
            }`}
          >
            Performance
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Team Composition */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Team Composition</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-dark-800 rounded-lg">
                  <p className="text-2xl font-bold text-blue-500">{teamStats.fullTime}</p>
                  <p className="text-dark-400 text-sm">Full-Time</p>
                </div>
                <div className="text-center p-4 bg-dark-800 rounded-lg">
                  <p className="text-2xl font-bold text-purple-500">{teamStats.contractors}</p>
                  <p className="text-dark-400 text-sm">Contractors</p>
                </div>
                <div className="text-center p-4 bg-dark-800 rounded-lg">
                  <p className="text-2xl font-bold text-orange-500">{teamStats.partTime}</p>
                  <p className="text-dark-400 text-sm">Part-Time</p>
                </div>
              </div>
            </div>

            {/* Skill Gaps */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Skill Gap Analysis</h3>
              <div className="space-y-4">
                {skillGaps.map((gap, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-dark-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-accent-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {gap.skill.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{gap.skill}</p>
                        <p className="text-dark-400 text-sm">
                          {gap.members.length > 0 ? `Available: ${gap.members.join(', ')}` : 'No team members available'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          gap.needed === 'high' ? 'bg-red-900 text-red-300' :
                          gap.needed === 'medium' ? 'bg-yellow-900 text-yellow-300' :
                          'bg-green-900 text-green-300'
                        }`}>
                          {gap.needed} need
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          gap.available === 'none' ? 'bg-red-900 text-red-300' :
                          gap.available === 'low' ? 'bg-yellow-900 text-yellow-300' :
                          'bg-green-900 text-green-300'
                        }`}>
                          {gap.available} available
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="space-y-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="card">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${getTypeColor(member.type)}`}>
                          {member.type}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${getAvailabilityColor(member.availability)}`}>
                          {member.availability}
                        </span>
                      </div>
                      <p className="text-dark-300 mb-2">{member.role}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-dark-400">Rate:</span>
                          <span className="text-white ml-2">${member.hourlyRate}/hr</span>
                        </div>
                        <div>
                          <span className="text-dark-400">Hours:</span>
                          <span className="text-white ml-2">{member.hoursThisWeek}/week</span>
                        </div>
                        <div>
                          <span className="text-dark-400">Projects:</span>
                          <span className="text-white ml-2">{member.projects.length}</span>
                        </div>
                        <div>
                          <span className="text-dark-400">Performance:</span>
                          <span className={`ml-2 ${getPerformanceColor(member.performance)}`}>
                            {member.performance}%
                          </span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm text-dark-400 mb-1">Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {member.skills.map((skill) => (
                            <span key={skill} className="text-xs bg-dark-800 text-dark-300 px-2 py-1 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm text-dark-400 mb-1">Projects:</p>
                        <div className="flex flex-wrap gap-2">
                          {member.projects.map((project) => (
                            <span key={project} className="text-xs bg-accent-900 text-accent-300 px-2 py-1 rounded">
                              {project}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
                      className="btn-secondary text-sm"
                    >
                      {selectedMember === member.id ? 'Hide Details' : 'View Details'}
                    </button>
                    <button className="btn-primary text-sm">Edit</button>
                  </div>
                </div>

                {/* Member Details (expandable) */}
                {selectedMember === member.id && (
                  <div className="mt-4 pt-4 border-t border-dark-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-white font-medium mb-3">Contact Information</h4>
                        <div className="space-y-2">
                          <p className="text-dark-300 text-sm">
                            <span className="text-dark-400">Email:</span> {member.contact.email}
                          </p>
                          <p className="text-dark-300 text-sm">
                            <span className="text-dark-400">Phone:</span> {member.contact.phone}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-3">Performance Metrics</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-dark-400 text-sm">Quality Score:</span>
                            <span className={`text-sm ${getPerformanceColor(member.performance)}`}>
                              {member.performance}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-dark-400 text-sm">Weekly Hours:</span>
                            <span className="text-white text-sm">{member.hoursThisWeek}h</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-dark-400 text-sm">Hourly Rate:</span>
                            <span className="text-white text-sm">${member.hourlyRate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Upcoming Schedule</h3>
              <div className="space-y-4">
                {upcomingSchedules.map((schedule, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-dark-800 rounded-lg">
                    <div className="flex-shrink-0">
                      {getScheduleTypeIcon(schedule.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">{schedule.member}</span>
                        <span className="text-dark-400">-</span>
                        <span className="text-white">{schedule.project}</span>
                      </div>
                      <p className="text-dark-400 text-sm capitalize">{schedule.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{schedule.date}</p>
                      <p className="text-dark-400 text-sm">{schedule.hours}h</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
              <div className="space-y-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-dark-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-accent-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {metric.member.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{metric.member}</p>
                        <p className="text-dark-400 text-sm">{metric.projects} projects</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-dark-400">Quality:</span>
                          <span className={`ml-1 ${getPerformanceColor(metric.quality)}`}>
                            {metric.quality}%
                          </span>
                        </div>
                        <div>
                          <span className="text-dark-400">Efficiency:</span>
                          <span className={`ml-1 ${getPerformanceColor(metric.efficiency)}`}>
                            {metric.efficiency}%
                          </span>
                        </div>
                        <div>
                          <span className="text-dark-400">Hours:</span>
                          <span className="text-white ml-1">{metric.hours}h</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-dark-900 border border-dark-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">Add Team Member</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Full Name
                </label>
                <input 
                  type="text" 
                  className="input-field w-full"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Role
                </label>
                <input 
                  type="text" 
                  className="input-field w-full"
                  placeholder="Enter role/title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Employment Type
                </label>
                <select className="input-field w-full">
                  <option>Full-Time</option>
                  <option>Part-Time</option>
                  <option>Contractor</option>
                  <option>Freelancer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Hourly Rate
                </label>
                <input 
                  type="number" 
                  className="input-field w-full"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Email
                </label>
                <input 
                  type="email" 
                  className="input-field w-full"
                  placeholder="Enter email address"
                />
              </div>
              <div className="flex space-x-3">
                <button 
                  type="button"
                  onClick={() => setShowAddMember(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="btn-primary flex-1"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
