import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimeSelector from "../../components/DateTimeSelector";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Mentoria } from "../../types/types";
import { mentoriaServ } from "../../modules/mentoria/service";
import { useAuth } from "../../navigation/context/AuthContext";

type RootStackParamList = {
    MentorshipList: undefined;
    OfferMentorship: undefined;
    MentorshipDetails: { mentoria: Mentoria };
  };
  
  type MentorshipEditScreenProps = {
    route: { params: { mentoria: Mentoria } };
    navigation: StackNavigationProp<RootStackParamList, "MentorshipDetails">;
  };
  

const MentorshipEditScreen: React.FC<MentorshipEditScreenProps> = ({
  route,
  navigation,
}) => {
  const { mentoria } = route.params;
  const { token } = useAuth();

  const [nome, setNome] = useState(mentoria.nome);
  const [localizacao, setLocalizacao] = useState(mentoria.localizacao);
  const [descricao, setDescricao] = useState(mentoria.descricao);
  const [selectedArea, setSelectedArea] = useState(""); // Ajuste se a área for parte dos dados
  const [date, setDate] = useState(new Date(mentoria.data_inicio));

  const handleSave = async () => {
    if (!nome || !localizacao || !descricao) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }

    const updatedMentoria: Mentoria = {
      ...mentoria,
      nome,
      localizacao,
      descricao,
      data_inicio: date.toISOString(),
      data_fim: new Date(date.getTime() + 2 * 60 * 60 * 1000).toISOString(), 
    };

    // try {
    //   const response = await mentoriaServ.updatementoria(
    //     mentoria.id,
    //     updatedMentoria,
    //     token || ""
    //   );
    //   if (response.success) {
    //     Alert.alert("Sucesso", "Mentoria atualizada com sucesso!");
    //     navigation.goBack();
    //   } else {
    //     Alert.alert("Erro", "Não foi possível salvar as alterações.");
    //   }
    // } catch (error) {
    //   console.error("Erro ao atualizar mentoria:", error);
    //   Alert.alert("Erro", "Ocorreu um erro. Tente novamente.");
    // }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.fieldLabel}>Nome</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome da mentoria"
      />

      <Text style={styles.fieldLabel}>Localização</Text>
      <TextInput
        style={styles.input}
        value={localizacao}
        onChangeText={setLocalizacao}
        placeholder="Local da mentoria"
      />

      <Text style={styles.fieldLabel}>Área de Especialização</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedArea}
          onValueChange={(itemValue) => setSelectedArea(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecionar" value="" />
          <Picker.Item label="Matemática" value="matematica" />
          <Picker.Item label="Física" value="fisica" />
          <Picker.Item label="Química" value="quimica" />
        </Picker>
      </View>

      <Text style={styles.fieldLabel}>Data e Hora</Text>
      <DateTimeSelector selectedDate={date} onDateChange={setDate} />

      <Text style={styles.fieldLabel}>Descrição</Text>
      <TextInput
        style={styles.textArea}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descrição da mentoria"
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

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
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
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
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

export default MentorshipEditScreen;
