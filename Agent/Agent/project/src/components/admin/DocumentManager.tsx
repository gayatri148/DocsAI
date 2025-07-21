import React, { useState, useEffect, ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import { 
  Upload, 
  FileText, 
  File, 
  CheckCircle, 
  Clock, 
  Trash2,
  Search,
  Filter,
  Download
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { formatDate } from '@/lib/utils'

export function DocumentManager() {
  // Dummy documents data
  const [documents] = useState<any[]>([
    {
      id: 1,
      name: 'Employee Handbook.pdf',
      type: 'pdf',
      size: 2140000,
      uploadedBy: 'Sarah Chen',
      uploadedAt: new Date('2024-01-15T05:00:00'),
      indexed: true,
      chunks: 17,
    },
    {
      id: 2,
      name: 'HR Policies & Procedures',
      type: 'docx',
      size: 980000,
      uploadedBy: 'Mike Rodriguez',
      uploadedAt: new Date('2024-01-14T14:30:00'),
      indexed: true,
      chunks: 9,
    },
    {
      id: 3,
      name: 'Finance Guidelines.docx',
      type: 'docx',
      size: 1560000,
      uploadedBy: 'Emma Wilson',
      uploadedAt: new Date('2024-01-13T13:30:00'),
      indexed: false,
      chunks: 0,
    },
    {
      id: 4,
      name: 'Benefits Guide.pdf',
      type: 'pdf',
      size: 1200000,
      uploadedBy: 'Lisa Johnson',
      uploadedAt: new Date('2024-01-12T09:00:00'),
      indexed: true,
      chunks: 7,
    },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return FileText
      case 'docx': return File
      case 'notion': return FileText
      case 'gdoc': return FileText
      default: return File
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'text-red-600 bg-red-50'
      case 'docx': return 'text-blue-600 bg-blue-50'
      case 'notion': return 'text-purple-600 bg-purple-50'
      case 'gdoc': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Document Management</h1>
        <p className="text-gray-600 mt-2">Upload and manage documents for AI-powered search</p>
      </div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </Button>
        </div>
      </motion.div>

      {/* Documents List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Documents ({filteredDocuments.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200">
              {filteredDocuments.map((doc, index) => {
                const TypeIcon = getTypeIcon(doc.type)
                const typeColorClass = getTypeColor(doc.type)
                
                return (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className={`w-10 h-10 rounded-lg ${typeColorClass} flex items-center justify-center`}>
                          <TypeIcon className="w-5 h-5" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {doc.name}
                          </h3>
                          <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                            <span>{formatFileSize(doc.size)}</span>
                            <span>•</span>
                            <span>By {doc.uploadedBy}</span>
                            <span>•</span>
                            <span>{formatDate(doc.uploadedAt)}</span>
                            {doc.indexed && (
                              <>
                                <span>•</span>
                                <span>{doc.chunks} chunks</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {doc.indexed ? (
                            <div className="flex items-center space-x-1 text-green-600">
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-xs font-medium">Indexed</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1 text-orange-600">
                              <Clock className="w-4 h-4" />
                              <span className="text-xs font-medium">Processing</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}