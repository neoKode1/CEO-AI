'use client'

import { useState } from 'react'
import { saveOnboardingData } from '@/lib/storage'
import HomeButton from '@/components/HomeButton'
import { 
  BuildingOfficeIcon,
  UserIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ClockIcon,
  LightBulbIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

interface OnboardingData {
  industry: string
  businessType: string
  yearsInBusiness: string
  teamSize: string
  annualRevenue: string
  primaryGoals: string[]
  currentChallenges: string[]
  technologyComfort: string
}

const industries = [
  'Technology/Software',
  'Healthcare',
  'Manufacturing',
  'Retail/E-commerce',
  'Professional Services',
  'Creative/Media',
  'Food & Beverage',
  'Real Estate',
  'Education',
  'Finance',
  'Non-profit',
  'Other'
]

const businessTypes = [
  'Sole Proprietor',
  'Partnership',
  'LLC',
  'Corporation',
  'Non-profit',
  'Startup'
]

const teamSizes = [
  'Just me (1 person)',
  '2-5 employees',
  '6-10 employees',
  '11-25 employees',
  '26-50 employees',
  '51-100 employees',
  '100+ employees'
]

const revenueRanges = [
  'Under $50K',
  '$50K - $100K',
  '$100K - $250K',
  '$250K - $500K',
  '$500K - $1M',
  '$1M - $5M',
  '$5M+'
]

const primaryGoals = [
  'Increase Revenue',
  'Reduce Costs',
  'Improve Efficiency',
  'Expand Market',
  'Develop New Products',
  'Improve Customer Satisfaction',
  'Streamline Operations',
  'Secure Funding'
]

const currentChallenges = [
  'Limited Budget',
  'Time Management',
  'Finding Customers',
  'Scaling Operations',
  'Technology Integration',
  'Team Management',
  'Regulatory Compliance',
  'Competition'
]

const technologyComfort = [
  'Very Comfortable',
  'Somewhat Comfortable',
  'Neutral',
  'Somewhat Uncomfortable',
  'Very Uncomfortable'
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    industry: '',
    businessType: '',
    yearsInBusiness: '',
    teamSize: '',
    annualRevenue: '',
    primaryGoals: [],
    currentChallenges: [],
    technologyComfort: ''
  })

  const [isLoading, setIsLoading] = useState(false)

  const updateData = (field: keyof OnboardingData, value: any) => {
    setOnboardingData(prev => ({ ...prev, [field]: value }))
  }

  const handleGoalToggle = (goal: string) => {
    setOnboardingData(prev => ({
      ...prev,
      primaryGoals: prev.primaryGoals.includes(goal)
        ? prev.primaryGoals.filter(g => g !== goal)
        : [...prev.primaryGoals, goal]
    }))
  }

  const handleChallengeToggle = (challenge: string) => {
    setOnboardingData(prev => ({
      ...prev,
      currentChallenges: prev.currentChallenges.includes(challenge)
        ? prev.currentChallenges.filter(c => c !== challenge)
        : [...prev.currentChallenges, challenge]
    }))
  }

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    setIsLoading(true)
    
    try {
      // Save onboarding data to browser storage
      saveOnboardingData(onboardingData)
      
      // Simulate processing time
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 2000)
    } catch (error) {
      console.error('Error saving onboarding data:', error)
      // Still redirect even if save fails
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 2000)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <BuildingOfficeIcon className="h-16 w-16 text-accent-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">What industry are you in?</h2>
              <p className="text-dark-300">This helps CEO AI understand your business context</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => updateData('industry', industry)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    onboardingData.industry === industry
                      ? 'border-accent-500 bg-accent-500/10 text-accent-400'
                      : 'border-dark-700 bg-dark-800 text-white hover:border-dark-600'
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <UserIcon className="h-16 w-16 text-accent-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Tell us about your business</h2>
              <p className="text-dark-300">Help us understand your business structure</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-3">Business Type</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {businessTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => updateData('businessType', type)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        onboardingData.businessType === type
                          ? 'border-accent-500 bg-accent-500/10 text-accent-400'
                          : 'border-dark-700 bg-dark-800 text-white hover:border-dark-600'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-white font-medium mb-3">Years in Business</label>
                <input
                  type="text"
                  value={onboardingData.yearsInBusiness}
                  onChange={(e) => updateData('yearsInBusiness', e.target.value)}
                  placeholder="e.g., 2 years, 5 years, 10+ years"
                  className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:border-accent-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <ChartBarIcon className="h-16 w-16 text-accent-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Scale & Capacity</h2>
              <p className="text-dark-300">Understanding your current scale helps with recommendations</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-3">Team Size</label>
                <div className="grid grid-cols-1 gap-3">
                  {teamSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => updateData('teamSize', size)}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        onboardingData.teamSize === size
                          ? 'border-accent-500 bg-accent-500/10 text-accent-400'
                          : 'border-dark-700 bg-dark-800 text-white hover:border-dark-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-white font-medium mb-3">Annual Revenue</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {revenueRanges.map((range) => (
                    <button
                      key={range}
                      onClick={() => updateData('annualRevenue', range)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        onboardingData.annualRevenue === range
                          ? 'border-accent-500 bg-accent-500/10 text-accent-400'
                          : 'border-dark-700 bg-dark-800 text-white hover:border-dark-600'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <LightBulbIcon className="h-16 w-16 text-accent-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">What are your primary goals?</h2>
              <p className="text-dark-300">Select all that apply - CEO AI will prioritize these</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {primaryGoals.map((goal) => (
                <button
                  key={goal}
                  onClick={() => handleGoalToggle(goal)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    onboardingData.primaryGoals.includes(goal)
                      ? 'border-accent-500 bg-accent-500/10 text-accent-400'
                      : 'border-dark-700 bg-dark-800 text-white hover:border-dark-600'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <ClockIcon className="h-16 w-16 text-accent-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">What challenges are you facing?</h2>
              <p className="text-dark-300">CEO AI will help address these specific issues</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentChallenges.map((challenge) => (
                <button
                  key={challenge}
                  onClick={() => handleChallengeToggle(challenge)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    onboardingData.currentChallenges.includes(challenge)
                      ? 'border-accent-500 bg-accent-500/10 text-accent-400'
                      : 'border-dark-700 bg-dark-800 text-white hover:border-dark-600'
                  }`}
                >
                  {challenge}
                </button>
              ))}
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CurrencyDollarIcon className="h-16 w-16 text-accent-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Technology Comfort Level</h2>
              <p className="text-dark-300">This helps CEO AI tailor its recommendations to your comfort level</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {technologyComfort.map((level) => (
                <button
                  key={level}
                  onClick={() => updateData('technologyComfort', level)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    onboardingData.technologyComfort === level
                      ? 'border-accent-500 bg-accent-500/10 text-accent-400'
                      : 'border-dark-700 bg-dark-800 text-white hover:border-dark-600'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800">
      {/* Home Button */}
      <HomeButton />
      
      {/* Header */}
      <header className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold gradient-text">
                  CEO AI
                </h1>
                <p className="text-sm text-dark-400">Universal Business Intelligence</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-dark-400">Step {currentStep} of 6</span>
            <span className="text-sm text-dark-400">{Math.round((currentStep / 6) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-dark-800 rounded-full h-2">
            <div 
              className="bg-accent-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 6) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Onboarding Content */}
        <div className="card">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg border-2 transition-all ${
              currentStep === 1
                ? 'border-dark-700 text-dark-500 cursor-not-allowed'
                : 'border-dark-600 text-white hover:border-dark-500'
            }`}
          >
            Back
          </button>
          
          <button
            onClick={handleNext}
            disabled={isLoading}
            className="px-6 py-3 bg-accent-500 hover:bg-accent-400 text-white rounded-lg transition-all flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Setting up your dashboard...</span>
              </>
            ) : (
              <>
                <span>{currentStep === 6 ? 'Complete Setup' : 'Next'}</span>
                <ArrowRightIcon className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </main>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mx-auto mb-4"></div>
            <p className="text-white">Customizing your CEO AI dashboard...</p>
            <p className="text-dark-400 text-sm mt-2">Based on your {onboardingData.industry} business</p>
          </div>
        </div>
      )}
    </div>
  )
}
