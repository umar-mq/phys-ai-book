import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from '@docusaurus/router';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      await signup(email, password, name);
      history.push('/profile');
    } catch (err) {
      setError('Failed to create account. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout title="Sign Up" description="Create an account">
      <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
        
        {/* Abstract Background Shapes */}
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-600/30 rounded-full blur-[100px]" />
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary/30 rounded-full blur-[100px]" />

        <div className="relative z-10 w-full max-w-md p-8 bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
          <div className="text-center mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent bg-clip-text font-extrabold text-2xl tracking-tighter">
              Physical AI
            </span>
          </div>
          <h1 className="text-4xl font-bold text-center mb-2 text-white">Get Started</h1>
          <p className="text-center text-gray-300 mb-8">Join the Physical AI community today</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 text-red-200 rounded text-sm text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:-translate-y-1 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-white transition-colors font-semibold">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
