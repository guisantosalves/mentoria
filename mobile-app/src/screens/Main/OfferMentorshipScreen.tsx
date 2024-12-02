import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

const OfferMentorshipScreen = () => {
  const [selectedArea, setSelectedArea] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TouchableOpacity style={styles.profilePicture}>
        <Text style={styles.addPhotoText}>+</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Foto de perfil</Text>

      <Text style={styles.fieldLabel}>Nome</Text>
      <TextInput
        style={styles.input}
        value="Beatriz S. Aquino"
        editable={false}
      />

      <Text style={styles.fieldLabel}>Localização</Text>
      <TextInput
        style={styles.input}
        value="Bloco C. Sala 404"
        editable={false}
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
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.dateText}>
          {date.toLocaleDateString()} - {date.toLocaleTimeString().slice(0, 5)}Hs
        </Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.fieldLabel}>Descrição da aula</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Aula focada..."
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.registerButton}>
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
