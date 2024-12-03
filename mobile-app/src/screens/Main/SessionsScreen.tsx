import React from "react";
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

const sessions: Session[] = [
  {
    id: "1",
    day: "Seg. 10 Out.",
    startTime: "18:00",
    endTime: "19:20",
    title: "Desenvolvimento mobile",
    description: "Focado para alunos iniciantes que querem bla bla bla ....",
    teacher: "Marcos Antônio",
    teacherPhoto: "https://via.placeholder.com/40",
  },
];

type RootStackParamList = {
  SessionsScreen: undefined;
  SessionDetailsScreen: { session: Session };
};

type SessionsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "SessionsScreen">;
};

const SessionsScreen: React.FC<SessionsScreenProps> = ({ navigation }) => {
  const renderSession = ({ item }: { item: Session }) => (
    <TouchableOpacity
      style={styles.sessionCard}
      onPress={() =>
        navigation.navigate("SessionDetailsScreen", { session: item })
      }
    >
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{item.startTime}</Text>
        <Text style={styles.separator}>|</Text>
        <Text style={styles.timeText}>{item.endTime}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.teacherContainer}>
          <Image
            source={{ uri: item.teacherPhoto }}
            style={styles.teacherPhoto}
          />
          <Text style={styles.teacherName}>{item.teacher}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Suas Aulas</Text>
      </View>
      <FlatList
        data={sessions}
        renderItem={renderSession}
        keyExtractor={(item) => item.id}
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
