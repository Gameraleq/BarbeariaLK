import React, { useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Agendamentos() {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [servico, setServico] = useState('');
  const [lista, setLista] = useState([]);

  function handleAdicionar() {
    if (!nome || !data || !servico) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const novoAgendamento = {
      id: Math.random().toString(36).substr(2, 9),
      nome,
      data,
      servico,
    };

    setLista((prev) => [...prev, novoAgendamento]);
    setNome('');
    setData('');
    setServico('');
    Alert.alert('Sucesso', 'Agendamento adicionado!');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Agendamento</Text>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Data (dd/mm/aaaa)"
        value={data}
        onChangeText={setData}
        style={styles.input}
      />
      <TextInput
        placeholder="Serviço"
        value={servico}
        onChangeText={setServico}
        style={styles.input}
      />
      <Button title="Adicionar" onPress={handleAdicionar} />

      <Text style={styles.listTitle}>Agendamentos:</Text>
      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nome} - {item.data} - {item.servico}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>Nenhum agendamento ainda.</Text>}
      />
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
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});
