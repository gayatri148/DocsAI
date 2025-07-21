import React from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  MessageSquare, 
  BarChart3,
  Users,
  Shield,
  Zap,
  Globe,
  CheckCircle,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface LandingPageProps {
  onGetStarted: () => void
  onSignup?: () => void
}

export function LandingPage({ onGetStarted, onSignup }: LandingPageProps) {
  const features = [
    {
      icon: MessageSquare,
      title: 'Natural Language Search',
      description: 'Ask questions in plain English and get instant, contextual answers from your documents.',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: FileText,
      title: 'Multi-Source Integration',
      description: 'Search across PDFs, Google Docs, Notion pages, and more in one unified interface.',
      color: 'text-green-600 bg-green-50'
    },
    {
      icon: BarChart3,
      title: 'Smart Analytics',
      description: 'Track usage patterns, popular queries, and optimize your knowledge base performance.',
      color: 'text-purple-600 bg-purple-50'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Role-based access control and secure document handling for enterprise teams.',
      color: 'text-red-600 bg-red-50'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get answers in seconds with our optimized AI-powered search engine.',
      color: 'text-yellow-600 bg-yellow-50'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share knowledge, track team queries, and build a collaborative knowledge base.',
      color: 'text-indigo-600 bg-indigo-50'
    }
  ]

  const benefits = [
    'Reduce time spent searching for information',
    'Improve team productivity and efficiency',
    'Centralize knowledge across all platforms',
    'Get instant answers with source citations',
    'Track and optimize knowledge usage',
    'Scale your team\'s collective intelligence'
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Product Manager',
      company: 'TechCorp',
      content: 'DocsAI has transformed how our team accesses information. What used to take hours now takes seconds.',
      rating: 5
    },
    {
      name: 'Mike Rodriguez',
      role: 'Engineering Lead',
      company: 'StartupXYZ',
      content: 'The natural language search is incredible. Our developers can find documentation instantly.',
      rating: 5
    },
    {
      name: 'Emma Wilson',
      role: 'Operations Director',
      company: 'Enterprise Inc',
      content: 'The analytics dashboard helps us understand knowledge gaps and improve our documentation.',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            {/* Logo and Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-center space-x-3">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Search className="w-9 h-9 text-white" />
                </div>
                <div className="text-left">
                  <h1 className="text-4xl font-bold text-gray-900">DocsAI</h1>
                  <p className="text-gray-600">Internal Knowledge Assistant</p>
                </div>
              </div>
              
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg">
                <Sparkles className="w-5 h-5" />
                <span className="font-medium">AI-Powered Document Search</span>
              </div>
            </motion.div>

            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6 max-w-4xl mx-auto"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Transform Your Team's
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Knowledge Discovery</span>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Ask questions in natural language and get instant, contextual answers from your internal documents. 
                No more endless searching through files and folders.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Button
                onClick={onGetStarted}
                size="lg"
                className="h-14 px-8 text-lg font-medium shadow-lg hover:shadow-xl transition-all"
              >
                <span>Get Started Free</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              {onSignup && (
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-lg font-medium border-2"
                  onClick={onSignup}
                >
                  <span>Sign Up</span>
                </Button>
              )}
            </motion.div>

            {/* Hero Image/Demo */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-16"
            >
              <div className="relative max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl border p-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="text-sm text-gray-500 ml-4">DocsAI Search Interface</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Search className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-600">How do I submit expense reports?</span>
                      </div>
                      <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                        <p className="text-sm text-gray-700">
                          To submit expense reports, follow these steps: 1) Log into the finance portal...
                        </p>
                        <div className="mt-3 flex items-center space-x-2 text-xs text-gray-500">
                          <FileText className="w-3 h-3" />
                          <span>Source: Employee Handbook.pdf</span>
                          <span>•</span>
                          <span>95% confidence</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              Everything you need for intelligent document search
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to make your team more productive and efficient
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center`}>
                        <feature.icon className="w-6 h-6" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900">{feature.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Why teams choose DocsAI
                </h3>
                <p className="text-xl text-gray-600">
                  Join thousands of teams who have transformed their knowledge management
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <Button
                onClick={onGetStarted}
                size="lg"
                className="h-12 px-8 font-medium"
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600">10x</div>
                    <div className="text-gray-600">Faster information retrieval</div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">95%</div>
                      <div className="text-sm text-gray-600">Accuracy rate</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">2.3s</div>
                      <div className="text-sm text-gray-600">Avg response time</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              Loved by teams worldwide
            </h3>
            <p className="text-xl text-gray-600">
              See what our customers have to say about DocsAI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-700 italic">"{testimonial.content}"</p>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                Ready to transform your team's productivity?
              </h3>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Join thousands of teams who have already revolutionized their knowledge management with DocsAI
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button
                onClick={onGetStarted}
                size="lg"
                variant="secondary"
                className="h-14 px-8 text-lg font-medium bg-white text-blue-600 hover:bg-gray-50"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <div className="text-blue-100 text-sm">
                No credit card required • 14-day free trial
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">DocsAI</span>
            </div>
            <p className="text-gray-400">
              © 2024 DocsAI. All rights reserved. Transforming knowledge discovery for teams worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}