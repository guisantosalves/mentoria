import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  MentorshipList: undefined;
  OfferMentorship: undefined;
};

type MentorshipListScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "MentorshipList">;
};

const MentorshipListScreen: React.FC<MentorshipListScreenProps> = ({ navigation }) => {
  const [mentorships, setMentorships] = useState([]);

  const mockData = [
    { id: "1", name: "Matemática - Aula 1", date: "2024-12-03 10:00" },
    { id: "2", name: "Física - Aula 2", date: "2024-12-05 14:00" },
  ];

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Aulas Cadastradas</Text>
      </View>

      <FlatList
        data={mockData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDate}>Data: {item.date}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma aula cadastrada.</Text>}
      />
      
      {/* Botão para adicionar aula */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("OfferMentorship")}
      >
        <Text style={styles.addButtonText}>+</Text>
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
  card: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardDate: {
    fontSize: 14,
    color: "#666",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#263238",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default MentorshipListScreen;
