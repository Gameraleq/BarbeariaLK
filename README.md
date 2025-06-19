# Barbearia LK Pro 🪒

Aplicativo móvel para agendamentos de barbearia desenvolvido com React Native e Expo.

## 🚀 Funcionalidades

- **Sistema de Autenticação**: Cadastro e login de usuários
- **Agendamentos**: Criação, visualização e exclusão de agendamentos
- **Chat Interno**: Sistema de mensagens integrado
- **Interface Moderna**: Design escuro com tema dourado

## 🛠️ Tecnologias

- React Native
- Expo Router
- Firebase (Auth + Realtime Database)
- TypeScript

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI
- Conta no Firebase

## ⚙️ Configuração

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/barbearia-lk-pro.git
cd barbearia-lk-pro
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente

1. Copie o arquivo de exemplo:
```bash
cp env.example .env
```

2. Edite o arquivo `.env` com suas credenciais do Firebase:
```env
EXPO_PUBLIC_FIREBASE_API_KEY=sua_api_key_aqui
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=seu_app_id
EXPO_PUBLIC_FIREBASE_DATABASE_URL=https://seu_projeto-default-rtdb.firebaseio.com
```

### 4. Configure o Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Ative a **Authentication** com email/senha
3. Crie um **Realtime Database** com regras de segurança
4. Copie as credenciais para o arquivo `.env`

### 5. Execute o projeto
```bash
npx expo start
```

## 📱 Como usar

1. **Cadastro**: Crie uma conta com nome, email e senha
2. **Login**: Faça login com suas credenciais
3. **Agendamentos**: Crie novos agendamentos com data, hora e serviço
4. **Chat**: Use o chat interno para comunicação

## 🔒 Segurança

- ✅ Variáveis de ambiente configuradas
- ✅ Logs de debug removidos
- ✅ Autenticação Firebase implementada
- ✅ Validação de dados implementada

## 📁 Estrutura do Projeto

```
BarbeariaLK/
├── app/                    # Telas da aplicação
│   ├── (tabs)/            # Navegação por abas
│   │   ├── index.tsx      # Tela de boas-vindas
│   │   ├── login.tsx      # Login
│   │   ├── register.tsx   # Cadastro
│   │   ├── home.tsx       # Tela principal
│   │   ├── agendamentos.tsx # Sistema de agendamentos
│   │   └── explore.tsx    # Serviços (em desenvolvimento)
│   └── _layout.tsx        # Layout principal
├── components/            # Componentes reutilizáveis
├── config/               # Configurações (Firebase)
├── constants/            # Constantes da aplicação
└── env.example          # Exemplo de variáveis de ambiente
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte, envie um email para seu-email@exemplo.com ou abra uma issue no GitHub.

---

Desenvolvido com ❤️ para a Barbearia LK Pro
