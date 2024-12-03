import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Mentoria } from "../../types/types";
import Icon from "react-native-vector-icons/Ionicons";

type RootStackParamList = {
  EditMentorshipScreen: { mentoria: Mentoria };
};

type EditMentorshipScreenProps = {
  route: RouteProp<RootStackParamList, "EditMentorshipScreen">;
  navigation: StackNavigationProp<RootStackParamList, "EditMentorshipScreen">;
};

const EditMentorshipScreen: React.FC<EditMentorshipScreenProps> = ({
  route,
  navigation,
}) => {
  const { mentoria } = route.params;

  const [nome, setNome] = useState(mentoria.nome);
  const [descricao, setDescricao] = useState(mentoria.descricao);
  const [dataInicio, setDataInicio] = useState(mentoria.data_inicio);
  const [dataFim, setDataFim] = useState(mentoria.data_fim);

  const handleSave = () => {
    console.log("Salvando alterações...");
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButtonIcon}
        >
          <Icon name="arrow-back" size={24} color="#263238" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edição da Mentoria</Text>
      </View>

      <Text style={styles.fieldLabel}>Nome</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome da Mentoria"
      />

      <Text style={styles.fieldLabel}>Descrição</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descrição"
      />

      <Text style={styles.fieldLabel}>Data de Início</Text>
      <TextInput
        style={styles.input}
        value={dataInicio}
        onChangeText={setDataInicio}
        placeholder="Data de Início"
      />

      <Text style={styles.fieldLabel}>Data de Fim</Text>
      <TextInput
        style={styles.input}
        value={dataFim}
        onChangeText={setDataFim}
        placeholder="Data de Fim"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Apagar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  headerContainer: {
    backgroundColor: "#fff",
    marginBottom: 20,
    padding: 15,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButtonIcon: {
    marginRight: 10,
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#263238",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
    color: "#263238",
  },
  fieldLabel: {
    color: "#5C6D73",
    fontSize: 10,
    fontWeight: "600",
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#D9D9D966",
    color: "#5C6D73",
    fontWeight: "600",
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  backButton: {
    height: 45,
    flex: 1,
    marginRight: 10,
    backgroundColor: "#ccc",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  saveButton: {
    height: 45,
    flex: 1,
    marginLeft: 10,
    backgroundColor: "#263238",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default EditMentorshipScreen;
