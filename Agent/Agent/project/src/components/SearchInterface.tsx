import React, { useState, ChangeEvent, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Send, 
  ThumbsUp, 
  ThumbsDown, 
  Clock, 
  FileText,
  Trash2,
  Sparkles
} from 'lucide-react'
import { useSearch } from '@/hooks/useSearch'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { formatRelativeTime } from '@/lib/utils'

export function SearchInterface() {
  const { 
    query, 
    setQuery, 
    suggestions, 
    conversation, 
    isLoading, 
    search, 
    ratAnswer, 
    clearConversation 
  } = useSearch()
  
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (query.trim()) {
      search(query.trim())
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    search(suggestion)
    setShowSuggestions(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Search</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Ask anything about your documents
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get instant answers from your team's knowledge base with AI-powered search and contextual understanding.
          </p>
        </motion.div>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative mb-8"
      >
        <form onSubmit={handleSubmit} className="relative flex flex-col gap-2">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Ask a question about your documents..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setShowSuggestions(true)
              }}
              onFocus={() => setShowSuggestions(true)}
              className="pl-12 pr-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl shadow-sm"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!query.trim() || isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-lg"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border shadow-lg z-10"
            >
              <div className="p-2">
                {suggestions.map((suggestion: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3"
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      suggestion.type === 'trending' ? 'bg-orange-500' :
                      suggestion.type === 'recent' ? 'bg-blue-500' : 'bg-gray-400'
                    }`} />
                    <span className="text-gray-900">{suggestion.text}</span>
                    <span className="text-xs text-gray-500 ml-auto capitalize">
                      {suggestion.type}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Conversation */}
      {conversation.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Conversation</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearConversation}
              className="text-gray-500 hover:text-gray-700"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          <div className="space-y-4">
            {conversation.map((message: any, index: number) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${message.type === 'question' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'question' ? (
                  <div className="max-w-2xl">
                    <div className="bg-blue-600 text-white px-6 py-4 rounded-2xl rounded-br-md">
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    <div className="flex items-center justify-end mt-2 space-x-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{formatRelativeTime(message.timestamp)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-3xl w-full">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600">
                        <AvatarFallback className="text-white text-xs">AI</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Card className="border-gray-200">
                          <CardContent className="p-6">
                            <div className="prose prose-sm max-w-none">
                              <p className="text-gray-900 leading-relaxed whitespace-pre-line">
                                {message.content}
                              </p>
                            </div>

                            {/* Sources */}
                            {message.sources && message.sources.length > 0 && (
                              <div className="mt-6 pt-4 border-t border-gray-100">
                                <h4 className="text-sm font-medium text-gray-900 mb-3">Sources</h4>
                                <div className="space-y-3">
                                  {message.sources.map((source: any, i: number) => (
                                    <div key={i} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                      <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900">{source.name}</p>
                                        <p className="text-xs text-gray-600 mt-1">{source.excerpt}</p>
                                        <div className="flex items-center mt-2">
                                          <div className="flex-1 bg-gray-200 rounded-full h-1">
                                            <div 
                                              className="bg-green-500 h-1 rounded-full"
                                              style={{ width: `${source.confidence * 100}%` }}
                                            />
                                          </div>
                                          <span className="text-xs text-gray-500 ml-2">
                                            {Math.round(source.confidence * 100)}% match
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Rating */}
                            <div className="mt-6 pt-4 border-t border-gray-100">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Was this helpful?</span>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => ratAnswer(message.id, true)}
                                    className={`${
                                      message.helpful === true 
                                        ? 'text-green-600 bg-green-50' 
                                        : 'text-gray-400 hover:text-green-600'
                                    }`}
                                  >
                                    <ThumbsUp className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => ratAnswer(message.id, false)}
                                    className={`${
                                      message.helpful === false 
                                        ? 'text-red-600 bg-red-50' 
                                        : 'text-gray-400 hover:text-red-600'
                                    }`}
                                  >
                                    <ThumbsDown className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <div className="flex items-center mt-2 space-x-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{formatRelativeTime(message.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3">
                  <Avatar className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600">
                    <AvatarFallback className="text-white text-xs">AI</AvatarFallback>
                  </Avatar>
                  <Card className="border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                        <span className="text-sm text-gray-600">Searching documents...</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* Empty state with trending queries */}
      {conversation.length === 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">Popular questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {suggestions.slice(0, 4).map((suggestion: any, index: number) => (
              <Card 
                key={index}
                className="cursor-pointer hover:shadow-md transition-all duration-200 border-gray-200 hover:border-blue-300"
                onClick={() => handleSuggestionClick(suggestion.text)}
              >
                <CardContent className="p-4">
                  <p className="text-sm text-gray-700">{suggestion.text}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      suggestion.type === 'trending' ? 'bg-orange-100 text-orange-700' :
                      suggestion.type === 'recent' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {suggestion.type}
                    </span>
                    <Search className="w-4 h-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}