import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Remove header para todas as telas dentro desse stack
      }}
    />
  );
}
