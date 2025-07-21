import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LandingPage } from '@/components/auth/LandingPage'
import { LoginPage } from '@/components/auth/LoginPage'
import { Layout } from '@/components/Layout'
import { SearchInterface } from '@/components/SearchInterface'
import { Dashboard } from '@/components/admin/Dashboard'
import { DocumentManager } from '@/components/admin/DocumentManager'
import { QueryLogs } from '@/components/admin/QueryLogs'
import { UserManager } from '@/components/admin/UserManager'
import { useAuth } from '@/hooks/useAuth'
import { SignupPage } from '@/components/auth/SignupPage' // (create this component if needed)

const queryClient = new QueryClient()

function AppContent() {
  const { user, isLoading, isAuthenticated, login, logout: originalLogout } = useAuth()
  const [authScreen, setAuthScreen] = React.useState<null | 'login' | 'signup'>(null)
  const navigate = useNavigate(); // Add this line

  // Debug: Log initial state
  console.log('AppContent rendered - authScreen:', authScreen, 'isAuthenticated:', isAuthenticated, 'isLoading:', isLoading)

  // Create a custom logout function that resets the auth screen
  const logout = () => {
    console.log('Logout called - clearing auth state')
    originalLogout()
    setAuthScreen(null) // Reset to landing page
    console.log('Auth screen reset to null')
  }

  // Reset auth screen when user becomes unauthenticated
  React.useEffect(() => {
    console.log('Auth state changed - isAuthenticated:', isAuthenticated, 'isLoading:', isLoading, 'authScreen:', authScreen)
    if (!isAuthenticated && !isLoading) {
      setAuthScreen(null)
      console.log('Auth screen reset due to unauthenticated state')
    }
  }, [isAuthenticated, isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">Loading DocsAI...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    console.log('Not authenticated - authScreen:', authScreen)
    if (authScreen === 'login') {
      console.log('Rendering LoginPage')
      return (
        <LoginPage
          onLogin={async (email, password, role) => {
            const result = await login(email, password, role)
            if (result.success) {
              setAuthScreen(null)
              if (result.user?.role === 'admin') {
                navigate('/admin')
              } else {
                navigate('/')
              }
            }
          }}
          isLoading={isLoading}
          showHomeButton={true}
          onHome={() => setAuthScreen(null)}
          onSignup={() => setAuthScreen('signup')}
        />
      )
    }
    if (authScreen === 'signup') {
      console.log('Rendering SignupPage')
      return (
        <SignupPage
          onSignupSuccess={() => setAuthScreen('login')}
          onHome={() => setAuthScreen(null)}
        />
      )
    }
    console.log('Rendering LandingPage')
    return (
      <LandingPage
        onGetStarted={() => {
          console.log('Get Started button clicked - setting authScreen to login')
          setAuthScreen('login')
        }}
        onSignup={() => {
          console.log('Sign Up button clicked - setting authScreen to signup')
          setAuthScreen('signup')
        }}
      />
    )
  }

  if (!user) {
    return null
  }

  return (
    <Layout onLogout={logout}>
      <Routes>
        <Route path="/" element={<SearchInterface />} />
        {user.role === 'admin' && (
          <>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/documents" element={<DocumentManager />} />
            <Route path="/admin/queries" element={<QueryLogs />} />
            <Route path="/admin/users" element={<UserManager />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  )
}

export default App