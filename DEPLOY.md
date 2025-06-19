# 🚀 Guia de Deploy - Barbearia LK Pro

## 📋 Checklist de Deploy

### ✅ Pré-requisitos
- [ ] Conta no Firebase criada
- [ ] Projeto Firebase configurado
- [ ] Authentication ativado
- [ ] Realtime Database criado
- [ ] Variáveis de ambiente configuradas

### 🔧 Configuração do Firebase

#### 1. Criar Projeto Firebase
1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Digite o nome: "Barbearia LK Pro"
4. Siga os passos de configuração

#### 2. Configurar Authentication
1. No console do Firebase, vá para "Authentication"
2. Clique em "Get started"
3. Vá para a aba "Sign-in method"
4. Ative "Email/Password"
5. Clique em "Save"

#### 3. Configurar Realtime Database
1. No console do Firebase, vá para "Realtime Database"
2. Clique em "Create database"
3. Escolha "Start in test mode" (para desenvolvimento)
4. Selecione a localização mais próxima
5. Clique em "Done"

#### 4. Configurar Regras de Segurança (Opcional)
```json
{
  "rules": {
    "Usuários": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    },
    "Agendamentos": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

#### 5. Obter Credenciais
1. No console do Firebase, vá para "Project settings" (ícone de engrenagem)
2. Role para baixo até "Your apps"
3. Clique em "Add app" e escolha "Web"
4. Registre o app e copie as credenciais

### 🔐 Configuração das Variáveis de Ambiente

1. Copie o arquivo de exemplo:
```bash
cp env.example .env
```

2. Preencha o arquivo `.env` com suas credenciais:
```env
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyC...sua_chave_aqui
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=barbearia-lk-pro.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=barbearia-lk-pro
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=barbearia-lk-pro.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
EXPO_PUBLIC_FIREBASE_DATABASE_URL=https://barbearia-lk-pro-default-rtdb.firebaseio.com
```

### 📱 Deploy para Produção

#### Opção 1: Expo Application Services (EAS)
```bash
# Instalar EAS CLI
npm install -g @expo/eas-cli

# Fazer login
eas login

# Configurar build
eas build:configure

# Build para Android
eas build --platform android

# Build para iOS
eas build --platform ios
```

#### Opção 2: Expo Go (Desenvolvimento)
```bash
# Iniciar servidor de desenvolvimento
npx expo start

# Escanear QR code com Expo Go
```

### 🔍 Testes Pós-Deploy

- [ ] Cadastro de usuário funciona
- [ ] Login funciona
- [ ] Criação de agendamentos funciona
- [ ] Listagem de agendamentos funciona
- [ ] Exclusão de agendamentos funciona
- [ ] Chat interno funciona

### 🛠️ Solução de Problemas

#### Erro de Autenticação
- Verifique se o Authentication está ativado no Firebase
- Confirme se as credenciais estão corretas no `.env`

#### Erro de Database
- Verifique se o Realtime Database foi criado
- Confirme se as regras de segurança permitem leitura/escrita

#### Erro de Build
- Verifique se todas as dependências estão instaladas
- Confirme se o Node.js está na versão correta

### 📞 Suporte

Para problemas específicos:
1. Verifique os logs do console
2. Consulte a documentação do Firebase
3. Abra uma issue no GitHub

---

**Importante**: Nunca commite o arquivo `.env` no repositório! 