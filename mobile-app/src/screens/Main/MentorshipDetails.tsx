import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
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

const MentorshipDetailsScreen: React.FC<MentorshipDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const { mentoria } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 30,  
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
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,  
  },
  editButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#263238",
    borderRadius: 20,
    alignItems: "center",
<<<<<<< HEAD
=======
    marginTop: 20,
>>>>>>> fcc17cd (home screen)
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MentorshipDetailsScreen;
