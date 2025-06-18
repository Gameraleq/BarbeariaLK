import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import app, { auth } from '../../config/firebase';

console.log('auth:', auth);

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    console.log('Botão pressionado');
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    setLoading(true);
    try {
      console.log('Iniciando cadastro...');
      // Cria usuário no Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Usuário criado:', user.uid);
      // Salva dados adicionais no Realtime Database
      const db = getDatabase(app);
      const userRef = ref(db, 'Usuários/' + user.uid);
      await set(userRef, {
        name,
        email
      });
      console.log('Dados salvos no banco de dados');
      setLoading(false);
      // Usuário já está autenticado automaticamente após cadastro
      router.replace('/home'); // Redireciona para home.tsx
    } catch (error: any) {
      setLoading(false);
      console.error('Erro no cadastro:', error);
      let mensagem = 'Erro ao cadastrar. ';
      if (error && (error.message || error.code)) {
        mensagem += `\nMotivo: ${error.message || error.code}`;
      }
      Alert.alert('Erro', mensagem);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <TextInput
        placeholder="Nome completo"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="#888"
      />

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
        placeholderTextColor="#888"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister} activeOpacity={0.7} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Registrando...' : 'Registrar'}</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Já tem conta?
        <Text style={styles.loginLink} onPress={() => router.push('/login')}> Entre</Text>
      </Text>

      <TouchableOpacity style={styles.link} onPress={() => router.push('/')}> 
        <Text style={styles.linkText}>Voltar para Home</Text>
      </TouchableOpacity>
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
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    width: 280,
    borderWidth: 0,
  },
  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10,
    width: 280,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#121212',
    fontWeight: '700',
    fontSize: 18,
  },
  loginText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  loginLink: {
    color: '#FFD700',
    fontWeight: '700',
    fontSize: 14,
  },
  link: {
    marginTop: 18,
    alignItems: 'center',
  },
  linkText: {
    color: '#FFD700',
    textDecorationLine: 'underline',
    fontWeight: '700',
    fontSize: 15,
  },
});
