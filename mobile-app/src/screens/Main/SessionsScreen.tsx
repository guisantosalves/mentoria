import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { usuarioServ } from "../../modules/usuario/service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Buffer } from "buffer";
import { Mentoria, Usuario, UsuarioAndMentoria } from "../../types/types";

export type Session = {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  teacher: string;
  teacherPhoto: string;
};

type RootStackParamList = {
  SessionsScreen: undefined;
  SessionDetailsScreen: { session: any };
};

type SessionsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "SessionsScreen">;
};

const SessionsScreen: React.FC<SessionsScreenProps> = ({ navigation }) => {
  const [dataFromApi, setDataFromApi] = useState<any>();
  const [allUsers, setAllUsers] = useState<Usuario[]>([]);

  const gettingUsersMentoria = useCallback(async () => {
    const token = await AsyncStorage.getItem("@token");

    if (token) {
      const parts = token
        .split(".")
        .map((part) =>
          Buffer.from(
            part.replace(/-/g, "+").replace(/_/g, "/"),
            "base64"
          ).toString()
        );

      const payload = JSON.parse(parts[1]);

      if (payload.id) {
        const data = await usuarioServ.getUserByIdAndMentorias(
          payload.id,
          token
        );
        setDataFromApi(data);
      }
    }
  }, []);

  const gettingAllUsers = useCallback(async () => {
    const token = await AsyncStorage.getItem("@token");

    if (token) {
      const data = await usuarioServ.getAllUsers(token);
      setAllUsers(data);
    }
  }, []);

  useEffect(() => {
    gettingUsersMentoria();
    gettingAllUsers();
  }, [gettingUsersMentoria, gettingAllUsers]);

  const renderSession = (item: any) => {
    return (
      <TouchableOpacity
        style={styles.sessionCard}
        onPress={() =>
          navigation.navigate("SessionDetailsScreen", { session: item })
        }
      >
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>
            {new Date(item.mentoria.data_inicio).getHours()}
          </Text>
          <Text style={styles.separator}>|</Text>
          <Text style={styles.timeText}>
            {new Date(item.mentoria.data_fim).getHours()}
          </Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{item.mentoria.nome}</Text>
          <Text style={styles.description}>{item.mentoria.descricao}</Text>
          <View style={styles.teacherContainer}>
            <Image
              source={{
                uri: allUsers.filter(
                  (currUser) => currUser.id === item.usuarioId
                )[0]?.foto,
              }}
              style={styles.teacherPhoto}
            />
            <Text style={styles.teacherName}>
              {
                allUsers.filter((currUser) => currUser.id === item.usuarioId)[0]
                  ?.nome
              }
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Suas Aulas</Text>
      </View>
      <FlatList
        data={dataFromApi && dataFromApi.mentorias && dataFromApi.mentorias}
        renderItem={({ item }) => renderSession(item)}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  headerContainer: {
    backgroundColor: "#fff",
    marginBottom: 20,
    padding: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginLeft: 20,
    marginBottom: 10,
    color: "#263238",
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  sessionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    marginBottom: 15,
  },
  timeContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    borderRightWidth: 1,
    borderRightColor: "#E0E0E0",
    paddingRight: 15,
  },
  timeText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#263238",
  },
  separator: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 2,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    color: "#263238",
  },
  description: {
    fontSize: 12,
    color: "#91989D",
    marginBottom: 10,
  },
  teacherContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  teacherPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  teacherName: {
    fontSize: 14,
    color: "#263238",
  },
});

export default SessionsScreen;
