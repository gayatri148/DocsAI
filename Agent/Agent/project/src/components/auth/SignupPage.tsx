import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SignupPageProps {
  onSignupSuccess: () => void;
  onHome: () => void;
}

export function SignupPage({ onSignupSuccess, onHome }: SignupPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [jobRole, setJobRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, jobRole, role }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Signup successful! Please log in.');
        onSignupSuccess(); // Redirect to login page
      } else {
        alert(data.error || 'Signup failed');
      }
    } catch (err) {
      alert('Network error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-4 pb-6">
            <CardTitle className="text-2xl font-bold text-center text-gray-900">
              Create Your Account
            </CardTitle>
            <p className="text-center text-gray-600">
              Sign up to access your team's knowledge base
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Role</label>
                <select
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  value={role}
                  onChange={e => setRole(e.target.value as 'user' | 'admin')}
                >
                  <option value="user">Employee</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Job Role</label>
                <select
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  value={jobRole}
                  onChange={e => setJobRole(e.target.value)}
                  required
                >
                  <option value="" disabled>Select your department</option>
                  <option value="HR department">HR department</option>
                  <option value="Design department">Design department</option>
                  <option value="Operations department">Operations department</option>
                  <option value="Product and service development">Product and service development</option>
                  <option value="Administrative">Administrative</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-base font-medium"
                disabled={isLoading || !name || !email || !password || !jobRole}
              >
                {isLoading ? 'Signing up...' : 'Sign Up'}
              </Button>
            </form>
            <Button
              variant="link"
              size="sm"
              type="button"
              onClick={onHome}
              className="w-full"
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 