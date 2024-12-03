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
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import DateTimeSelector from '../../components/DateTimeSelector';

const OfferMentorshipScreen = () => {
  const [nome, setNome] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowPicker(false);
  };

  const handleRegister = async () => {
    if (!nome || !localizacao || !descricao || !selectedArea) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    const mentorshipData = {
      nome,
      localizacao,
      descricao,
      area: selectedArea,
      data_inicio: date.toISOString(),
    };

    try {
      const response = await fetch("https://seu-backend.com/mentorias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mentorshipData),
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Aula cadastrada com sucesso!");
        setNome("");
        setLocalizacao("");
        setDescricao("");
        setSelectedArea("");
        setDate(new Date());
      } else {
        Alert.alert("Erro", "Não foi possível cadastrar a aula.");
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao cadastrar a aula.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
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
          style={styles.picker}
        >
          <Picker.Item label="Selecionar" value="" />
          <Picker.Item label="Matemática" value="matematica" />
          <Picker.Item label="Física" value="fisica" />
          <Picker.Item label="Química" value="quimica" />
        </Picker>
      </View>

      <Text style={styles.fieldLabel}>Data e Hora</Text>
      <DateTimeSelector
        selectedDate={date}
        onDateChange={(newDate) => setDate(newDate)}
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

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Registrar aula</Text>
      </TouchableOpacity>
    </View>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
  addPhotoText: {
    fontSize: 32,
    color: "#888",
  },
  label: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
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
    fontWeight: '600',
    fontSize: 12
  },
  pickerContainer: {
    borderRadius: 20,
    marginBottom: 15,
    backgroundColor: "#D9D9D966",
    color: "#5C6D73",
    fontWeight: '600',
    fontSize: 12,
    overflow: 'hidden',
    borderWidth: 0,
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#D9D9D966",
    color: "#5C6D73",
    fontWeight: '600',
    fontSize: 12,
    borderWidth: 0,
  },
  dateInput: {
    height: 50,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: "center",
    backgroundColor: "#D9D9D966",
    marginBottom: 15,
    borderWidth: 0,
  },
  dateText: {
    color: "#5C6D73",
    fontWeight: '600',
    fontSize: 12
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
    fontWeight: '600',
    fontSize: 12
  },
  registerButton: {
    height: 45,
    backgroundColor: "#263238",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default OfferMentorshipScreen;
