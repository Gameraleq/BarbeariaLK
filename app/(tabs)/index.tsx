import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Bem-vindo à Barbearia LK Pro!
      </ThemedText>
      <ThemedText type="subtitle" style={styles.subtitle}>
        Seu novo visual começa aqui.
      </ThemedText>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => router.push('/register')}
      >
        <ThemedText style={styles.buttonText}>CADASTRE-SE</ThemedText>
      </Pressable>

      <ThemedText style={styles.loginText}>
        já tem conta?
        <ThemedText style={styles.loginLink} onPress={() => router.push('/login')}> entre</ThemedText>
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  title: {
    color: '#FFD700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#ccc',
    marginBottom: 40,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 50,
    marginBottom: 20,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: 280,
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#FFC107',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  buttonText: {
    color: '#121212',
    fontSize: 18,
    fontWeight: '700',
  },
  loginText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
  },
  loginLink: {
    color: '#FFD700',
    fontWeight: '700',
    fontSize: 14,
  },
}); 