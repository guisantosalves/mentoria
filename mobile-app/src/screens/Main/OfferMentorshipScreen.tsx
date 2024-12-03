import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimeSelector from "../../components/DateTimeSelector";
import { StackNavigationProp } from "@react-navigation/stack";
import { Disciplina, Mentoria } from "../../types/types";
import { API_URL, API_PORT } from "../../modules/info";
import { mentoriaServ } from "../../modules/mentoria/service";
import { useAuth } from "../../navigation/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { disciplinaServ } from "../../modules/disciplina/service";

const url = `${API_URL}:${API_PORT}/mentorias`;

type RootStackParamList = {
  MentorshipList: undefined;
  OfferMentorship: undefined;
};

type OfferMentorshipScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "OfferMentorship">;
};

const OfferMentorshipScreen: React.FC<OfferMentorshipScreenProps> = ({
  navigation,
}) => {
  const { token } = useAuth();
  const [nome, setNome] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [initialDate, setInitialDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(new Date());
  const [discplinas, setDisciplinas] = useState<Disciplina[]>([]);

  const gettingDisciplinas = useCallback(async () => {
    const token = await AsyncStorage.getItem("@token");
    const data = await disciplinaServ.getAllDisciplinas(token ?? "");
    setDisciplinas(data);
  }, []);

  useEffect(() => {
    gettingDisciplinas();
  }, [gettingDisciplinas]);

  const handleRegister = async () => {
    if (!nome || !localizacao || !descricao || !selectedArea) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    const mentorshipData: Mentoria = {
      nome,
      data_inicio: initialDate.toISOString(),
      data_fim: finalDate.toISOString(),
      descricao,
      localizacao,
      mentor: 1,
      disciplinaId: Number(selectedArea),
      usuarios: [],
    };

    try {
      const response = await mentoriaServ.creatementoria(
        mentorshipData,
        token || ""
      );
      if (response) {
        console.log("Sucesso");
        navigation.goBack();
      } else {
        console.log("Erro");
        Alert.alert("Erro", "Houve um erro ao registrar a mentoria.");
      }
    } catch (error) {
      console.error("Erro ao criar a mentoria:", error);
      Alert.alert("Erro", "Algo deu errado. Tente novamente mais tarde.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Cadastro</Text>
        </View>

        <Text style={styles.fieldLabel}>Nome</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Digite seu nome"
        />

        <Text style={styles.fieldLabel}>Localização</Text>
        <TextInput
          style={styles.input}
          value={localizacao}
          onChangeText={setLocalizacao}
          placeholder="Digite o local da aula"
        />

        <Text style={styles.fieldLabel}>Área de Especialização</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedArea}
            onValueChange={(itemValue) => setSelectedArea(itemValue)}
            // style={styles.picker}
            style={{ marginHorizontal: 20 }}
          >
            {discplinas.map((item, index) => {
              return (
                <Picker.Item
                  key={index}
                  label={item.nome}
                  value={String(item.id)}
                />
              );
            })}
          </Picker>
        </View>

        <Text style={styles.fieldLabel}>Data e Hora</Text>
        <DateTimeSelector
          selectedDate={initialDate}
          onDateChange={(newDate) => setInitialDate(newDate)}
        />
        <DateTimeSelector
          selectedDate={finalDate}
          onDateChange={(newDate) => setFinalDate(newDate)}
        />

        <Text style={styles.fieldLabel}>Descrição da aula</Text>
        <TextInput
          style={styles.textArea}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Aula focada..."
          multiline
          numberOfLines={4}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>Registrar aula</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    fontSize: 24,
    fontWeight: "700",
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
  pickerContainer: {
    borderRadius: 20,
    marginBottom: 15,
    backgroundColor: "#D9D9D966",
    color: "#5C6D73",
    fontWeight: "600",
    fontSize: 12,
    overflow: "hidden",
    borderWidth: 0,
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#D9D9D966",
    color: "#5C6D73",
    fontWeight: "600",
    fontSize: 12,
    borderWidth: 0,
  },
  textArea: {
    height: 100,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#D9D9D966",
    textAlignVertical: "top",
    marginBottom: 15,
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
  registerButton: {
    height: 45,
    flex: 1,
    marginLeft: 10,
    backgroundColor: "#263238",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default OfferMentorshipScreen;
