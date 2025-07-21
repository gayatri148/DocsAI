import React, { useState, useEffect, ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Download, 
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Clock,
  User,
  AlertCircle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { formatDate, formatRelativeTime } from '@/lib/utils'

export function QueryLogs() {
  // Dummy queries data
  const [queries] = useState<any[]>([
    {
      id: 1,
      userName: 'Mike Rodriguez',
      question: 'What is the company vacation policy?',
      answer: 'Our vacation policy allows 15-25 days PTO...',
      confidence: 0.91,
      helpful: true,
      responseTime: 1.2,
      documentSources: ['Employee Handbook.pdf'],
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
    },
    {
      id: 2,
      userName: 'Emma Wilson',
      question: 'How to access the VPN?',
      answer: 'To access the company VPN, you need to...',
      confidence: 0.77,
      helpful: false,
      responseTime: 2.1,
      documentSources: ['IT Security Manual.pdf'],
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: 3,
      userName: 'David Kim',
      question: 'Remote work equipment policy',
      answer: 'The remote work equipment policy states...',
      confidence: 0.87,
      helpful: true,
      responseTime: 1.5,
      documentSources: ['Remote Work Guidelines.pdf'],
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
    },
    {
      id: 4,
      userName: 'Lisa Johnson',
      question: 'Health insurance enrollment process',
      answer: 'To enroll in health insurance...',
      confidence: 0.85,
      helpful: true,
      responseTime: 1.8,
      documentSources: ['Benefits Guide.pdf'],
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'low-confidence' | 'negative-feedback'>('all');

  const filteredQueries = queries.filter((query: any) => {
    const matchesSearch = query.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      query.userName.toLowerCase().includes(searchQuery.toLowerCase());
    switch (filterType) {
      case 'low-confidence':
        return matchesSearch && query.confidence < 0.8;
      case 'negative-feedback':
        return matchesSearch && query.helpful === false;
      default:
        return matchesSearch;
    }
  });

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600 bg-green-50'
    if (confidence >= 0.8) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getHelpfulIcon = (helpful: boolean | null) => {
    if (helpful === true) return <ThumbsUp className="w-4 h-4 text-green-600" />
    if (helpful === false) return <ThumbsDown className="w-4 h-4 text-red-600" />
    return <div className="w-4 h-4 rounded-full bg-gray-300" />
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Query Logs</h1>
        <p className="text-gray-600 mt-2">Monitor and analyze user queries and AI responses</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Queries</p>
                <p className="text-2xl font-bold text-gray-900">{queries.length}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Confidence</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(queries.reduce((acc, q) => acc + q.confidence, 0) / queries.length * 100)}%
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Positive Feedback</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(queries.filter(q => q.helpful === true).length / queries.filter(q => q.helpful !== null).length * 100)}%
                </p>
              </div>
              <ThumbsUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(queries.reduce((acc, q) => acc + q.responseTime, 0) / queries.length).toFixed(1)}s
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search queries or users..."
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant={filterType === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterType('all')}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={filterType === 'low-confidence' ? 'default' : 'outline'}
              onClick={() => setFilterType('low-confidence')}
              size="sm"
            >
              Low Confidence
            </Button>
            <Button
              variant={filterType === 'negative-feedback' ? 'default' : 'outline'}
              onClick={() => setFilterType('negative-feedback')}
              size="sm"
            >
              Negative Feedback
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Query List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Queries ({filteredQueries.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200">
              {filteredQueries.map((query, index) => (
                <motion.div
                  key={query.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="space-y-4">
                    {/* Query Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>
                            {query.userName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="text-sm font-medium text-gray-900">{query.userName}</p>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{formatRelativeTime(query.timestamp)}</span>
                          </div>
                          <h3 className="text-sm text-gray-900 font-medium">{query.question}</h3>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(query.confidence)}`}>
                          {Math.round(query.confidence * 100)}% confident
                        </div>
                        {getHelpfulIcon(query.helpful)}
                      </div>
                    </div>

                    {/* Answer Preview */}
                    <div className="ml-11">
                      <p className="text-sm text-gray-600 line-clamp-2">{query.answer}</p>
                    </div>

                    {/* Sources and Metadata */}
                    <div className="ml-11 flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{query.responseTime}s</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{query.documentSources.length} sources</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {query.documentSources.slice(0, 2).map((source, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                            {source}
                          </span>
                        ))}
                        {query.documentSources.length > 2 && (
                          <span className="text-xs text-gray-500">
                            +{query.documentSources.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}