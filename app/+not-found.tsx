import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MaterialIcons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Página não encontrada' }} />
      <ThemedView style={styles.container}>
        <MaterialIcons name="error-outline" size={80} color="#ff4757" />
        <ThemedText type="title" style={styles.title}>
          Ops! Página não encontrada.
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Não encontramos o que você procura.
        </ThemedText>

        <Link href="/" asChild>
          <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
            <Text style={styles.buttonText}>Voltar para o Início</Text>
          </Pressable>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9fb',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    marginTop: 16,
    fontSize: 28,
    fontWeight: '700',
    color: '#2f3542',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#57606f',
    textAlign: 'center',
  },
  button: {
    marginTop: 32,
    backgroundColor: '#1e90ff',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 30,
    elevation: 3,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
