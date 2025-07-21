import { useState, useEffect } from 'react'
import { Analytics } from '@/types'

const mockAnalytics: Analytics = {
  totalQueries: 1247,
  totalUsers: 89,
  totalDocuments: 156,
  avgResponseTime: 2.3,
  popularQueries: [
    { query: 'How to submit expense reports?', count: 45 },
    { query: 'Company vacation policy', count: 38 },
    { query: 'IT support contact', count: 32 },
    { query: 'Remote work guidelines', count: 28 },
    { query: 'Benefits overview', count: 24 }
  ],
  dailyQueries: [
    { date: '2024-01-15', count: 23 },
    { date: '2024-01-16', count: 31 },
    { date: '2024-01-17', count: 28 },
    { date: '2024-01-18', count: 42 },
    { date: '2024-01-19', count: 35 },
    { date: '2024-01-20', count: 19 },
    { date: '2024-01-21', count: 8 }
  ],
  userActivity: [
    { userId: '1', name: 'Sarah Chen', queries: 23 },
    { userId: '2', name: 'Mike Rodriguez', queries: 19 },
    { userId: '3', name: 'Emma Wilson', queries: 17 },
    { userId: '4', name: 'David Kim', queries: 15 },
    { userId: '5', name: 'Lisa Johnson', queries: 12 }
  ],
  lowConfidenceQueries: []
}

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAnalytics(mockAnalytics)
      setIsLoading(false)
    }, 1000)
  }, [])

  return {
    analytics,
    isLoading
  }
}