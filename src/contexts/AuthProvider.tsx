// src/contexts/AuthProvider.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { auth, getUserData } from '@/lib/firebase';
import { UserData } from '@/types/user';
import { useRouter } from 'next/router';

type AuthContextType = {
  user: FirebaseUser | null;
  userData: UserData | null;
  loading: boolean;
  error: string | null;
};


const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  error: null,
});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(true);

      try {
        if (firebaseUser) {
          const data = await getUserData(firebaseUser.uid);
          setUserData(data);
        } else {
          setUserData(null);

          const protectedRoutes = [
            '/topics',
            '/quiz',
            '/results',
            '/subscribe',
          ];

          const isProtected = protectedRoutes.some((route) =>
            router.pathname.startsWith(route)
          );

          const isAllowedPublicRoute = router.pathname.startsWith('/subscription/success');

          if (isProtected && !isAllowedPublicRoute) {
            router.push('/login');
          }
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, userData, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}
