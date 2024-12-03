import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Mentoria } from "../../types/types";
import { mentoriaServ } from "./../../modules/mentoria/service/index";
import { useAuth } from "../../navigation/context/AuthContext";

type RootStackParamList = {
  MentorshipList: undefined;
  OfferMentorship: undefined;
  MentorshipDetails: { mentoria: Mentoria };
};

type MentorshipListScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "MentorshipList">;
};

const MentorshipListScreen: React.FC<MentorshipListScreenProps> = ({ navigation }) => {
  const { token } = useAuth();
  const [mentorships, setMentorships] = useState<Mentoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMentorships = async () => {
      try {
        setLoading(true);
        const data = await mentoriaServ.getAllmentorias(token || '');
        setMentorships(data);
      } catch (error) {
        console.error("Erro ao buscar mentorias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorships();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Aulas Cadastradas</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#263238" />
      ) : (
        <FlatList
          data={mentorships}
          keyExtractor={(item) => item.id?.toString() || ""}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("MentorshipDetails", { mentoria: item })}
            >
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.nome}</Text>
                <Text style={styles.cardDate}>
                  Data: {item.data_inicio} - {item.data_fim}
                </Text>
                <Text style={styles.cardDescription}>{item.descricao}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma aula cadastrada.</Text>}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("OfferMentorship")}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
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
  cardDescription: {
    fontSize: 14,
    color: "#333",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#CECACA",
    fontWeight: 'bold'
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
