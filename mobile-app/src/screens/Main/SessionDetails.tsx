import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; 
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Session } from "./SessionsScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usuarioServ } from "../../modules/usuario/service";
import { Usuario } from "../../types/types";

type RootStackParamList = {
  SessionsScreen: undefined;
  SessionDetailsScreen: { session: any };
};

type SessionDetailsScreenProps = {
  route: RouteProp<RootStackParamList, "SessionDetailsScreen">;
  navigation: StackNavigationProp<RootStackParamList, "SessionDetailsScreen">;
};

const SessionDetailsScreen: React.FC<SessionDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const [allUsers, setAllUsers] = useState<Usuario[]>([]);
  const { session } = route.params;

  const gettingAllUsers = useCallback(async () => {
    const token = await AsyncStorage.getItem("@token");

    if (token) {
      const data = await usuarioServ.getAllUsers(token);
      setAllUsers(data);
    }
  }, []);

  useEffect(() => {
    gettingAllUsers();
  }, [gettingAllUsers]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#263238" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes da Aula</Text>
      </View>

      <Text style={styles.title}>{session.mentoria.nome}</Text>
      <Text style={styles.time}>
        {new Date(session.mentoria.data_inicio).getHours()} -{" "}
        {new Date(session.mentoria.data_fim).getHours()}
      </Text>
      <Text style={styles.teacher}>
        Professor:{" "}
        {
          allUsers.filter((currUser) => currUser.id === session.usuarioId)[0]
            ?.nome
        }
      </Text>
      <Text style={styles.description}>{session.mentoria.descricao}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
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
  time: {
    fontSize: 16,
    marginBottom: 10,
    color: "#263238",
  },
  teacher: {
    fontSize: 16,
    marginBottom: 10,
    color: "#263238",
  },
  description: {
    fontSize: 14,
    color: "#91989D",
  },
});

export default SessionDetailsScreen;
