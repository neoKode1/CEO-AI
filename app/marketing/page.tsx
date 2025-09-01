'use client'

import { useState, useEffect } from 'react'
import HomeButton from '@/components/HomeButton'
import Sidebar from '@/components/Sidebar'
import { 
  MegaphoneIcon,
  PlusIcon,
  CalendarIcon,
  ChartBarIcon,
  GlobeAltIcon,
  PhotoIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  ShareIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline'

// Mock marketing data
const socialMediaStats = {
  instagram: { followers: 2840, engagement: 4.2, posts: 156 },
  twitter: { followers: 1890, engagement: 3.8, posts: 89 },
  linkedin: { followers: 420, engagement: 2.1, posts: 23 },
  youtube: { followers: 1250, engagement: 6.5, posts: 12 }
}

const contentCalendar = [
  {
    id: 1,
    title: 'Behind the Scenes - Project Alpha',
    type: 'video',
    platform: 'instagram',
    scheduledDate: '2024-01-20',
    status: 'scheduled',
    content: 'Exclusive behind-the-scenes look at our latest project...'
  },
  {
    id: 2,
    title: 'Industry Insights - AI in Film',
    type: 'article',
    platform: 'linkedin',
    scheduledDate: '2024-01-22',
    status: 'draft',
    content: 'Exploring how artificial intelligence is revolutionizing...'
  },
  {
    id: 3,
    title: 'Project Update - Funding Milestone',
    type: 'post',
    platform: 'twitter',
    scheduledDate: '2024-01-25',
    status: 'scheduled',
    content: 'Excited to announce we\'ve secured additional funding...'
  },
  {
    id: 4,
    title: 'Team Spotlight - Director Interview',
    type: 'video',
    platform: 'youtube',
    scheduledDate: '2024-01-28',
    status: 'in-progress',
    content: 'Sitting down with our director to discuss the creative vision...'
  }
]

const aiGeneratedContent = [
  {
    id: 1,
    type: 'social-post',
    title: 'Film Industry Trends 2024',
    content: 'The film industry is evolving rapidly with AI integration, streaming platforms, and new storytelling techniques. Dark Orchestra Films is at the forefront of this innovation...',
    platforms: ['linkedin', 'twitter'],
    engagement: 89,
    status: 'ready'
  },
  {
    id: 2,
    type: 'blog-post',
    title: 'The Future of Independent Filmmaking',
    content: 'Independent filmmakers face unique challenges in today\'s digital landscape. From funding to distribution, the landscape has changed dramatically...',
    platforms: ['website', 'medium'],
    engagement: 156,
    status: 'draft'
  },
  {
    id: 3,
    type: 'video-script',
    title: 'Project Showcase Video',
    content: 'Opening with dramatic music and stunning visuals of our latest project. Voiceover: "In a world where storytelling meets technology..."',
    platforms: ['youtube', 'instagram'],
    engagement: 234,
    status: 'ready'
  }
]

const marketingCampaigns = [
  {
    id: 1,
    name: 'Project Alpha Launch',
    status: 'active',
    budget: 2000,
    spent: 1200,
    reach: 45000,
    engagement: 1200,
    roi: 3.2
  },
  {
    id: 2,
    name: 'Brand Awareness Q1',
    status: 'planning',
    budget: 1500,
    spent: 0,
    reach: 0,
    engagement: 0,
    roi: 0
  },
  {
    id: 3,
    name: 'Funding Campaign',
    status: 'completed',
    budget: 800,
    spent: 800,
    reach: 28000,
    engagement: 890,
    roi: 2.8
  }
]

const performanceMetrics = [
  { month: 'Oct', reach: 12000, engagement: 450, conversions: 12 },
  { month: 'Nov', reach: 18000, engagement: 680, conversions: 18 },
  { month: 'Dec', reach: 22000, engagement: 890, conversions: 25 },
  { month: 'Jan', reach: 28000, engagement: 1200, conversions: 32 }
]

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showCreateContent, setShowCreateContent] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState('all')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-900 text-blue-300'
      case 'draft': return 'bg-yellow-900 text-yellow-300'
      case 'in-progress': return 'bg-purple-900 text-purple-300'
      case 'published': return 'bg-green-900 text-green-300'
      case 'active': return 'bg-green-900 text-green-300'
      case 'planning': return 'bg-yellow-900 text-yellow-300'
      case 'completed': return 'bg-gray-900 text-gray-300'
      default: return 'bg-dark-700 text-dark-300'
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return '📸'
      case 'twitter': return '🐦'
      case 'linkedin': return '💼'
      case 'youtube': return '📺'
      case 'website': return '🌐'
      case 'medium': return '📝'
      default: return '📱'
    }
  }

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <VideoCameraIcon className="h-5 w-5 text-red-500" />
      case 'article': return <DocumentTextIcon className="h-5 w-5 text-blue-500" />
      case 'post': return <ShareIcon className="h-5 w-5 text-green-500" />
      case 'social-post': return <MegaphoneIcon className="h-5 w-5 text-purple-500" />
      case 'blog-post': return <DocumentTextIcon className="h-5 w-5 text-blue-500" />
      case 'video-script': return <VideoCameraIcon className="h-5 w-5 text-red-500" />
      default: return <DocumentTextIcon className="h-5 w-5 text-gray-500" />
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
              <h1 className="text-2xl font-bold gradient-text">Marketing Hub</h1>
              <div className="flex items-center space-x-2">
                <MegaphoneIcon className="h-5 w-5 text-accent-500" />
                <span className="text-sm text-dark-400">Content & Social Media</span>
              </div>
            </div>
            <button 
              onClick={() => setShowCreateContent(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <PlusIcon className="h-4 w-4" />
              <span>Create Content</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 ml-16 lg:ml-80">
        {/* Social Media Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(socialMediaStats).map(([platform, stats]) => (
            <div key={platform} className="card">
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl">{getPlatformIcon(platform)}</div>
                <span className="text-sm text-dark-400 capitalize">{platform}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-dark-400 text-sm">Followers</span>
                  <span className="text-white font-medium">{stats.followers.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-400 text-sm">Engagement</span>
                  <span className="text-green-500 font-medium">{stats.engagement}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-400 text-sm">Posts</span>
                  <span className="text-white font-medium">{stats.posts}</span>
                </div>
              </div>
            </div>
          ))}
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
            onClick={() => setActiveTab('calendar')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'calendar'
                ? 'bg-accent-600 text-white'
                : 'text-dark-300 hover:text-white'
            }`}
          >
            Content Calendar
          </button>
          <button
            onClick={() => setActiveTab('ai-content')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'ai-content'
                ? 'bg-accent-600 text-white'
                : 'text-dark-300 hover:text-white'
            }`}
          >
            AI Content
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'campaigns'
                ? 'bg-accent-600 text-white'
                : 'text-dark-300 hover:text-white'
            }`}
          >
            Campaigns
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Performance Chart */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Marketing Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">28k</p>
                  <p className="text-dark-400">Monthly Reach</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">1.2k</p>
                  <p className="text-dark-400">Engagement</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">32</p>
                  <p className="text-dark-400">Conversions</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-dark-800 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <EyeIcon className="h-5 w-5 text-blue-500" />
                    <span className="text-white">Instagram post reached 2,400 people</span>
                  </div>
                  <span className="text-dark-400 text-sm">2 hours ago</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-dark-800 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <HeartIcon className="h-5 w-5 text-red-500" />
                    <span className="text-white">LinkedIn article got 45 reactions</span>
                  </div>
                  <span className="text-dark-400 text-sm">1 day ago</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-dark-800 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <ChatBubbleLeftIcon className="h-5 w-5 text-green-500" />
                    <span className="text-white">Twitter thread generated 12 replies</span>
                  </div>
                  <span className="text-dark-400 text-sm">3 days ago</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Content Calendar</h3>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="input-field w-48"
              >
                <option value="all">All Platforms</option>
                <option value="instagram">Instagram</option>
                <option value="twitter">Twitter</option>
                <option value="linkedin">LinkedIn</option>
                <option value="youtube">YouTube</option>
              </select>
            </div>
            
            {contentCalendar
              .filter(item => selectedPlatform === 'all' || item.platform === selectedPlatform)
              .map((item) => (
                <div key={item.id} className="card">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      {getContentTypeIcon(item.type)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-white font-medium">{item.title}</h4>
                          <span className={`text-xs px-2 py-1 rounded ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                          <span className="text-dark-400 text-sm capitalize">{item.platform}</span>
                        </div>
                        <p className="text-dark-300 text-sm mb-2">{item.content}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <CalendarIcon className="h-4 w-4 text-dark-400" />
                            <span className="text-dark-400">{item.scheduledDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn-secondary text-sm">Edit</button>
                      <button className="btn-primary text-sm">Schedule</button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {activeTab === 'ai-content' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">AI-Generated Content</h3>
              <button className="btn-primary">Generate New Content</button>
            </div>
            
            {aiGeneratedContent.map((item) => (
              <div key={item.id} className="card">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    {getContentTypeIcon(item.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-white font-medium">{item.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-dark-300 text-sm mb-3">{item.content}</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-dark-400 text-sm">Platforms:</span>
                          <div className="flex space-x-1">
                            {item.platforms.map((platform) => (
                              <span key={platform} className="text-sm">
                                {getPlatformIcon(platform)}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ChartBarIcon className="h-4 w-4 text-dark-400" />
                          <span className="text-dark-400 text-sm">{item.engagement} engagement</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="btn-secondary text-sm">Edit</button>
                    <button className="btn-primary text-sm">Publish</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Marketing Campaigns</h3>
              <button className="btn-primary">Create Campaign</button>
            </div>
            
            {marketingCampaigns.map((campaign) => (
              <div key={campaign.id} className="card">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-white font-medium">{campaign.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-dark-400">Budget:</span>
                        <span className="text-white ml-2">${campaign.budget}</span>
                      </div>
                      <div>
                        <span className="text-dark-400">Spent:</span>
                        <span className="text-white ml-2">${campaign.spent}</span>
                      </div>
                      <div>
                        <span className="text-dark-400">Reach:</span>
                        <span className="text-white ml-2">{campaign.reach.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-dark-400">ROI:</span>
                        <span className="text-green-500 ml-2">{campaign.roi}x</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="btn-secondary text-sm">View Details</button>
                    <button className="btn-primary text-sm">Edit</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create Content Modal */}
      {showCreateContent && (
        <div className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-dark-900 border border-dark-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">Create New Content</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Content Type
                </label>
                <select className="input-field w-full">
                  <option>Social Media Post</option>
                  <option>Blog Article</option>
                  <option>Video Script</option>
                  <option>Newsletter</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Platform
                </label>
                <select className="input-field w-full">
                  <option>Instagram</option>
                  <option>Twitter</option>
                  <option>LinkedIn</option>
                  <option>YouTube</option>
                  <option>Website</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Title
                </label>
                <input 
                  type="text" 
                  className="input-field w-full"
                  placeholder="Enter content title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Content
                </label>
                <textarea 
                  className="input-field w-full h-32 resize-none"
                  placeholder="Enter content description or brief..."
                />
              </div>
              <div className="flex space-x-3">
                <button 
                  type="button"
                  onClick={() => setShowCreateContent(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="btn-primary flex-1"
                >
                  Create Content
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
