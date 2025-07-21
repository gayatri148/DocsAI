import { useState, useEffect } from 'react'
import { User } from '../types'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('docsai_user')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        setIsAuthenticated(true)
      } catch (error) {
        localStorage.removeItem('docsai_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: 'admin' | 'user') => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      })
      const data = await response.json()
      if (response.ok) {
        setUser(data.user)
        setIsAuthenticated(true)
        localStorage.setItem('docsai_user', JSON.stringify(data.user))
        setIsLoading(false)
        return { success: true, user: data.user } // Return user object
      } else {
        setIsLoading(false)
        return { success: false, error: data.error || 'Login failed' }
      }
    } catch (error) {
      setIsLoading(false)
      return { success: false, error: 'Network error' }
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('docsai_user')
    setIsLoading(false)
  }

  const switchRole = (role: 'admin' | 'user') => {
    if (user) {
      const updatedUser = { ...user, role }
      setUser(updatedUser)
      localStorage.setItem('docsai_user', JSON.stringify(updatedUser))
    }
  }

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    switchRole,
    isAdmin: user?.role === 'admin'
  }
}