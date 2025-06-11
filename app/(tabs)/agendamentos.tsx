import { getDatabase, onValue, push, ref, remove } from 'firebase/database';
import { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import app from '../../config/firebase';

interface Agendamento {
  key: string;
  Nome: string;
  Data: string;
  Servico: string;
}

export default function Agendamentos() {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [servico, setServico] = useState('');
  const [lista, setLista] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar agendamentos do Realtime Database
  useEffect(() => {
    const db = getDatabase(app);
    const agendamentosRef = ref(db, 'Agendamentos');
    const unsubscribe = onValue(agendamentosRef, (snapshot) => {
      const data = snapshot.val();
      const agendamentos: Agendamento[] = [];
      if (data) {
        Object.keys(data).forEach((key) => {
          agendamentos.push({ key, ...data[key] });
        });
      }
      setLista(agendamentos);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Função para formatar a data no padrão XX/XX/XXXX
  const formatarData = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{2})(\d{4})$/);
    if (match) {
      return `${match[1]}/${match[2]}/${match[3]}`;
    }
    if (cleaned.length <= 2) {
      return cleaned;
    }
    if (cleaned.length <= 4) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
  };

  // Função para validar a data
  const validarData = (data: string) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return regex.test(data);
  };

  async function handleAdicionar() {
    if (!nome || !data || !servico) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (!validarData(data)) {
      Alert.alert('Erro', 'Por favor, insira uma data válida no formato DD/MM/AAAA.');
      return;
    }
    try {
      const db = getDatabase(app);
      const agendamentosRef = ref(db, 'Agendamentos');
      await push(agendamentosRef, {
        Nome: nome,
        Data: data,
        Servico: servico
      });
      setNome('');
      setData('');
      setServico('');
      Alert.alert('Sucesso', 'Agendamento adicionado!');
    } catch (error: any) {
      let mensagem = 'Não foi possível adicionar o agendamento.';
      if (error && (error.message || error.code)) {
        mensagem += `\nMotivo: ${error.message || error.code}`;
      }
      Alert.alert('Erro', mensagem);
      console.error('Erro ao adicionar agendamento:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Agendamento</Text>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={(text) => setNome(text.slice(0, 50))}
        style={styles.input}
        maxLength={50}
      />
      <TextInput
        placeholder="Data (DD/MM/AAAA)"
        value={data}
        onChangeText={(text) => setData(formatarData(text))}
        style={styles.input}
        maxLength={10}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Serviço"
        value={servico}
        onChangeText={(text) => setServico(text.slice(0, 255))}
        style={styles.input}
        maxLength={255}
        multiline
      />
      <Button title="Adicionar" onPress={handleAdicionar} />

      <Text style={styles.listTitle}>Agendamentos:</Text>
      {loading ? (
        <Text>Carregando agendamentos...</Text>
      ) : (
        <FlatList
          data={lista}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={{ flex: 1 }}>{item.Nome} - {item.Data} - {item.Servico}</Text>
              <TouchableOpacity onPress={async () => {
                try {
                  const db = getDatabase(app);
                  await remove(ref(db, `Agendamentos/${item.key}`));
                } catch (error: any) {
                  let mensagem = 'Não foi possível deletar o agendamento.';
                  if (error && (error.message || error.code)) {
                    mensagem += `\nMotivo: ${error.message || error.code}`;
                  }
                  Alert.alert('Erro', mensagem);
                  console.error('Erro ao deletar agendamento:', error);
                }
              }}>
                <Text style={styles.trashIcon}>🗑️</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={<Text>Nenhum agendamento ainda.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  listTitle: { marginTop: 20, fontWeight: 'bold', fontSize: 18 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  trashIcon: {
    fontSize: 22,
    marginLeft: 8,
    color: '#d11a2a',
  },
});
