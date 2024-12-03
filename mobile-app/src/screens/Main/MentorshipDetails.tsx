import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Mentoria } from "../../types/types";
import Icon from "react-native-vector-icons/Ionicons"; 

type RootStackParamList = {
  MentorshipDetails: { mentoria: Mentoria };
  EditMentorshipScreen: { mentoria: Mentoria };  
};

type MentorshipDetailsScreenProps = {
  route: RouteProp<RootStackParamList, "MentorshipDetails">;
  navigation: StackNavigationProp<RootStackParamList, "MentorshipDetails">;
};

const MentorshipDetailsScreen: React.FC<MentorshipDetailsScreenProps> = ({ route, navigation }) => {
  const { mentoria } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#263238" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes da Mentoria</Text>
      </View>

      <Text style={styles.title}>{mentoria.nome}</Text>
      <Text style={styles.date}>
        Data: {mentoria.data_inicio} - {mentoria.data_fim}
      </Text>
      <Text style={styles.description}>{mentoria.descricao}</Text>

      <TouchableOpacity 
        style={styles.editButton} 
        onPress={() => navigation.navigate("EditMentorshipScreen", { mentoria: mentoria })}
      >
        <Text style={styles.editButtonText}>Editar</Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
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
  date: {
    fontSize: 16,
    color: "#666",
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
  editButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#263238",
    borderRadius: 20,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MentorshipDetailsScreen;
