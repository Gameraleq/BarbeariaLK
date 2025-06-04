import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export const options = {
  headerShown: false,  // tira o nome "index" ou "home" no topo
};

// Componente Chat interno para o exemplo
function Chat() {
  const [messages, setMessages] = useState<{id: string, text: string}[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim().length === 0) return;

    const newMessage = {
      id: Date.now().toString(),
      text: input.trim(),
    };

    setMessages([newMessage, ...messages]);
    setInput('');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.chatContainer} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        inverted
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 16 }}
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Digite sua mensagem..."
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default function Home() {
  const router = useRouter();
  const [showChat, setShowChat] = useState(false);

  if (showChat) {
    return (
      <>
        <Pressable style={styles.backButton} onPress={() => setShowChat(false)}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </Pressable>
        <Chat />
      </>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#222" />
      
      <Text style={styles.title}>Barbearia LK Pro</Text>
      <Text style={styles.subtitle}>Cortes e serviços profissionais</Text>

      <Image
        source={require('@/assets/images/barbershop.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => router.push('/agendamentos')}
      >
        <Text style={styles.buttonText}>Agendamentos</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => router.push('/explore')}
      >
        <Text style={styles.buttonText}>Explorar Serviços</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => setShowChat(true)}
      >
        <Text style={styles.buttonText}>Chat com a Barbearia</Text>
      </Pressable>

      <Text style={styles.footer}>© 2025 Barbearia LK Pro</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFD700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 30,
    fontStyle: 'italic',
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 50,
    marginBottom: 20,
    elevation: 6,
  },
  buttonPressed: {
    backgroundColor: '#FFC107',
    elevation: 2,
  },
  buttonText: {
    color: '#121212',
    fontSize: 18,
    fontWeight: '700',
  },
  footer: {
    marginTop: 50,
    color: '#444',
    fontSize: 12,
  },

  // Estilos do chat
  chatContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  messageBubble: {
    backgroundColor: '#FFD700',
    padding: 12,
    borderRadius: 20,
    marginBottom: 12,
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  messageText: {
    color: '#121212',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#333',
    backgroundColor: '#222',
  },
  input: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 20,
    paddingHorizontal: 16,
    color: '#fff',
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 12,
    backgroundColor: '#FFD700',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#121212',
    fontWeight: '700',
    fontSize: 16,
  },

  backButton: {
    padding: 12,
    backgroundColor: '#FFD700',
  },
  backButtonText: {
    color: '#121212',
    fontWeight: '700',
    fontSize: 16,
  },
});
