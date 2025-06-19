import { usePathname, useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { auth } from '../config/firebase';

const publicRoutes = ['/', '/login', '/register', '/welcome'];
const protectedRoutes = ['/home', '/agendamentos', '/explore'];

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        if (publicRoutes.includes(pathname)) {
          router.replace('/home');
        }
      } else {
        if (!publicRoutes.includes(pathname)) {
          router.replace('/');
        }
      }
    });
    return unsubscribe;
  }, [pathname]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  return <>{children}</>;
} 