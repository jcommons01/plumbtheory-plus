// ✅ src/components/Navbar.tsx
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthProvider';
import { logOut } from '@/lib/firebase';

const Navbar = () => {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isAdmin = userData?.email === 'jordoncommons@gmail.com';

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl text-white font-bold ml-2">PlumbTheory+</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link href="/topics" className="text-white hover:bg-blue-500 px-3 py-2 rounded">
                      Topics
                    </Link>
                    <Link href="/references" className="text-white hover:bg-blue-500 px-3 py-2 rounded">
                      References
                    </Link>
                    <Link href="/account" className="text-white hover:bg-blue-500 px-3 py-2 rounded">
                      My Account
                    </Link>

                    {isAdmin && (
                      <Link
                        href="/admin/reports"
                        className="text-white hover:bg-blue-500 px-3 py-2 rounded"
                      >
                        Reported Questions
                      </Link>
                    )}

                    {userData?.isPro ? (
                      <span className="bg-yellow-400 text-yellow-800 px-3 py-1 rounded text-sm font-medium">
                        PRO
                      </span>
                    ) : (
                      <Link
                        href="/subscribe"
                        className="bg-yellow-400 hover:bg-yellow-500 text-yellow-800 px-3 py-1 rounded text-sm font-medium"
                      >
                        Upgrade to Pro
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="text-white hover:bg-blue-500 px-3 py-2 rounded"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="text-white hover:bg-blue-500 px-3 py-2 rounded">
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="bg-white hover:bg-gray-100 text-blue-600 px-3 py-2 rounded font-medium"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-blue-500 p-2 rounded-md focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-500">
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link href="/topics" className="text-white block px-3 py-2 rounded hover:bg-blue-600">
                      Topics
                    </Link>
                    <Link href="/references" className="text-white block px-3 py-2 rounded hover:bg-blue-600">
                      References
                    </Link>
                    <Link href="/account" className="text-white block px-3 py-2 rounded hover:bg-blue-600">
                      My Account
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin/reports"
                        className="text-white block px-3 py-2 rounded hover:bg-blue-600"
                      >
                        Reported Questions
                      </Link>
                    )}
                    {userData?.isPro ? (
                      <span className="bg-yellow-400 text-yellow-800 px-3 py-1 rounded text-sm font-medium block my-2 w-max">
                        PRO
                      </span>
                    ) : (
                      <Link
                        href="/subscribe"
                        className="bg-yellow-400 hover:bg-yellow-500 text-yellow-800 px-3 py-1 rounded text-sm font-medium block my-2 w-max"
                      >
                        Upgrade to Pro
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="text-white block w-full text-left px-3 py-2 rounded hover:bg-blue-600"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="text-white block px-3 py-2 rounded hover:bg-blue-600">
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="bg-white hover:bg-gray-100 text-blue-600 block px-3 py-2 rounded font-medium my-2"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
