export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  avatar?: string
  createdAt: Date
  lastActive: Date
}

export interface Document {
  id: string
  name: string
  type: 'pdf' | 'docx' | 'notion' | 'gdoc'
  size: number
  uploadedAt: Date
  uploadedBy: string
  indexed: boolean
  chunks: number
}

export interface Query {
  id: string
  question: string
  answer: string
  userId: string
  documentSources: string[]
  confidence: number
  helpful?: boolean
  timestamp: Date
  responseTime: number
}

export interface Analytics {
  totalQueries: number
  totalUsers: number
  totalDocuments: number
  avgResponseTime: number
  popularQueries: { query: string; count: number }[]
  dailyQueries: { date: string; count: number }[]
  userActivity: { userId: string; name: string; queries: number }[]
  lowConfidenceQueries: Query[]
}

export interface SearchSuggestion {
  text: string
  type: 'recent' | 'trending' | 'autocomplete'
}

export interface ConversationMessage {
  id: string
  type: 'question' | 'answer'
  content: string
  sources?: { name: string; excerpt: string; confidence: number }[]
  timestamp: Date
  helpful?: boolean
}