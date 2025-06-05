import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { signUp } from '@/lib/firebase';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signUp(email, password);
      router.push('/topics');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="w-full max-w-md bg-gray-800 p-6 rounded shadow">
          <h1 className="text-2xl font-bold text-center mb-6 text-white">Create Account</h1>
          <form onSubmit={handleRegister} className="space-y-4">
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

            {/* ✅ Consent Checkbox */}
            <div className="flex items-start space-x-2 text-sm text-gray-300">
              <input
                type="checkbox"
                id="terms"
                className="mt-1"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
              />
              <label htmlFor="terms">
                I agree to the{' '}
                <Link href="/legal/terms" className="underline text-blue-400">
                  Terms
                </Link>{' '}
                and{' '}
                <Link href="/legal/privacy" className="underline text-blue-400">
                  Privacy Policy
                </Link>.
              </label>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={!agreed}
              className={`w-full py-2 rounded font-medium transition ${
                agreed
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-600 text-gray-300 cursor-not-allowed'
              }`}
            >
              Sign Up
            </button>
          </form>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-300">Already have an account?</span>{' '}
            <a href="/login" className="text-sm text-blue-400 hover:underline font-medium">
              Login
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
