import { Stack } from 'expo-router';
import AuthGate from '../components/AuthGate';

export default function Layout() {
  return (
    <AuthGate>
      <Stack
        screenOptions={{
          headerShown: false, // Remove header para todas as telas dentro desse stack
        }}
      />
    </AuthGate>
  );
}
