// ✅ src/pages/login.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { signIn } from '@/lib/firebase';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password);
      router.push('/topics');
    } catch (err) {
      setError('Failed to login. Please check your email and password.');
    }
  };

  return (
    <Layout>
      {/* Changed background color to match other pages */}
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        {/* Updated card background color */}
        <div className="w-full max-w-md bg-gray-800 p-6 rounded shadow">
          {/* Updated text color */}
          <h1 className="text-2xl font-bold text-center mb-6 text-white">Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Updated input styles */}
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-700 bg-gray-700 text-white placeholder-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-700 bg-gray-700 text-white placeholder-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          {/* Updated link colors */}
          <div className="text-center mt-4">
            <Link href="/forgot-password" className="text-sm text-blue-400 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Updated text and link colors */}
          <div className="text-center mt-2">
            <span className="text-sm text-gray-300">Don't have an account?</span>{' '}
            <Link href="/register" className="text-sm text-blue-400 hover:underline font-medium">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
