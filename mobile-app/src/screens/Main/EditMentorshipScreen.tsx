import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Disciplina, Mentoria } from "../../types/types";
import Icon from "react-native-vector-icons/Ionicons";
import { mentoriaServ } from "../../modules/mentoria/service";
import DateTimeSelector from "../../components/DateTimeSelector";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { disciplinaServ } from "../../modules/disciplina/service";

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
  const [dataInicio, setDataInicio] = useState(new Date(mentoria.data_inicio));
  const [dataFim, setDataFim] = useState(new Date(mentoria.data_fim));
  const [localizacao, setLocalizacao] = useState(mentoria.localizacao);
  const [selectedArea, setSelectedArea] = useState<number>(
    mentoria.disciplinaId
  );
  const [discplinas, setDisciplinas] = useState<Disciplina[]>([]);

  const gettingDisciplinas = useCallback(async () => {
    const token = await AsyncStorage.getItem("@token");
    const data = await disciplinaServ.getAllDisciplinas(token ?? "");
    setDisciplinas(data);
  }, []);

  useEffect(() => {
    gettingDisciplinas();
  }, [gettingDisciplinas]);

  const updatingMentoria = useCallback(async () => {
    const token = await AsyncStorage.getItem("@token");
    if (
      !nome ||
      !localizacao ||
      !descricao ||
      !selectedArea ||
      !dataInicio ||
      !dataFim ||
      selectedArea === -1
    ) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }
    const dataToSend: Mentoria = {
      id: Number(mentoria.id),
      nome: nome,
      data_fim: new Date("2024-10-02").toISOString(),
      data_inicio: new Date("2024-10-02").toISOString(),
      descricao: descricao,
      localizacao: localizacao,
      mentor: 1,
      disciplinaId: selectedArea,
      usuarios: [1],
    };

    if (token && mentoria.id) {
      const data = await mentoriaServ.updatementoria(
        dataToSend,
        String(mentoria.id),
        token
      );
      navigation.goBack();
    }
  }, []);

  const deleData = useCallback(async () => {
    const token = await AsyncStorage.getItem("@token");
    if (token && mentoria.id) {
      const data = await mentoriaServ.deletementoria(
        String(mentoria.id),
        token
      );
      navigation.goBack();
    }
  }, []);

  console.log(mentoria);
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
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
            selectedValue={String(selectedArea)}
            onValueChange={(itemValue) => setSelectedArea(Number(itemValue))}
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

        {/* <Text style={styles.fieldLabel}>Data e Hora Início</Text>
        <DateTimeSelector
          selectedDate={dateInicio}
          onDateChange={(newDate) => setDateInicio(newDate)}
        />

        <Text style={styles.fieldLabel}>Data e Hora Fim</Text>
        <DateTimeSelector
          selectedDate={dateFim}
          onDateChange={(newDate) => setDateFim(newDate)}
        /> */}
        <Text style={styles.fieldLabel}>Data e Hora</Text>
        <DateTimeSelector
          selectedDate={dataInicio}
          onDateChange={(newDate) => setDataInicio(newDate)}
        />
        <DateTimeSelector
          selectedDate={dataFim}
          onDateChange={(newDate) => setDataFim(newDate)}
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
            onPress={() => {
              deleData();
              navigation.goBack();
            }}
          >
            <Text style={styles.backButtonText}>Apagar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              updatingMentoria();
            }}
          >
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textArea: {
    height: 120,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#D9D9D966",
    textAlignVertical: "top",
    marginBottom: 20,
    color: "#5C6D73",
    fontWeight: "600",
    fontSize: 14,
  },
  pickerContainer: {
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: "#D9D9D966",
    color: "#5C6D73",
    fontWeight: "600",
    fontSize: 12,
    overflow: "hidden",
    borderWidth: 0,
  },
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 20,
    padding: 15,
    elevation: 3,
    alignItems: "center",
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
