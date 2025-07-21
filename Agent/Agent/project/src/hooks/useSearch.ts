import { useState, useEffect } from 'react'
import { SearchSuggestion, ConversationMessage } from '@/types'

const mockSuggestions: SearchSuggestion[] = [
  { text: 'How to submit expense reports?', type: 'trending' },
  { text: 'Company vacation policy', type: 'trending' },
  { text: 'IT support contact information', type: 'recent' },
  { text: 'Remote work guidelines', type: 'trending' },
  { text: 'Employee benefits overview', type: 'recent' }
]

const mockResponses = {
  'expense': {
    answer: 'To submit expense reports, follow these steps:\n\n1. Log into the finance portal at finance.company.com\n2. Click "New Expense Report"\n3. Upload receipts and fill out the required fields\n4. Submit for manager approval\n\nReports are typically processed within 3-5 business days.',
    sources: [
      { name: 'Employee Handbook.pdf', excerpt: 'Expense reports must be submitted within 30 days...', confidence: 0.95 },
      { name: 'Finance Procedures.docx', excerpt: 'All receipts must be clearly legible...', confidence: 0.87 }
    ]
  },
  'vacation': {
    answer: 'Our vacation policy allows:\n\n• 15 days PTO for employees with 0-2 years of service\n• 20 days PTO for employees with 3-5 years of service\n• 25 days PTO for employees with 6+ years of service\n\nPTO requests should be submitted at least 2 weeks in advance through the HR portal.',
    sources: [
      { name: 'HR Policy Manual.pdf', excerpt: 'Vacation time accrues based on tenure...', confidence: 0.93 },
      { name: 'Benefits Guide.pdf', excerpt: 'Unused vacation days can be carried over...', confidence: 0.81 }
    ]
  },
  'default': {
    answer: 'I found relevant information in our documents. Here are the key points:\n\n• Check the employee handbook for detailed procedures\n• Contact your manager for approval processes\n• Use the company portal for most requests\n\nFor specific questions, please reach out to HR or IT support.',
    sources: [
      { name: 'General Guidelines.pdf', excerpt: 'For additional support, contact the appropriate department...', confidence: 0.78 }
    ]
  }
}

const exampleAnswers: { [key: string]: string } = {
  "how to submit expense reports?": `
To submit expense reports, follow these steps:

1. Log into the finance portal at finance.company.com
2. Click "New Expense Report"
3. Upload receipts and fill out the required fields
4. Submit for manager approval

Reports are typically processed within 3-5 business days.
`,
  "company vacation policy": `Our vacation policy allows:

• 15 days PTO for employees with 0-2 years of service
• 20 days PTO for employees with 3-5 years of service
• 25 days PTO for employees with 6+ years of service

PTO requests should be submitted at least 2 weeks in advance through the HR portal.`,
  "it support contact information": `You can reach IT support at...`,
  // Add more as needed
};

export function useSearch() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [conversation, setConversation] = useState<ConversationMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (query.length > 2) {
      const filtered = mockSuggestions.filter(s => 
        s.text.toLowerCase().includes(query.toLowerCase())
      )
      setSuggestions(filtered)
    } else {
      setSuggestions(mockSuggestions.slice(0, 3))
    }
  }, [query])

  const search = async (question: string) => {
    setIsLoading(true);
    const questionMessage: ConversationMessage = {
      id: Date.now().toString(),
      type: 'question',
      content: question,
      timestamp: new Date()
    };
    setConversation(prev => [...prev, questionMessage]);

    // Lowercase and trim for matching
    const normalized = question.trim().toLowerCase();
    let answerContent = exampleAnswers[normalized] || "Sorry, I don't have an answer for that question yet.";

    const answerMessage: ConversationMessage = {
      id: (Date.now() + 2).toString(),
      type: 'answer',
      content: answerContent,
      sources: [],
      timestamp: new Date()
    };
    setConversation(prev => [...prev, answerMessage]);
    setIsLoading(false);
    setQuery('');
  }

  const ratAnswer = (messageId: string, helpful: boolean) => {
    setConversation(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, helpful } : msg
      )
    )
  }

  const clearConversation = () => {
    setConversation([])
  }

  return {
    query,
    setQuery,
    suggestions,
    conversation,
    isLoading,
    search,
    ratAnswer,
    clearConversation
  }
}