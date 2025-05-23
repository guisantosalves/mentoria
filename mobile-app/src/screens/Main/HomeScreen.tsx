import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Mentoria, Usuario } from "../../types/types";
import { mentoriaServ } from "../../modules/mentoria/service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usuarioServ } from "../../modules/usuario/service";

interface ItemData {
  id: string;
  title: string;
  date: string;
  time: string;
}

const data: ItemData[] = [
  {
    id: "1",
    title: "Desenvolvimento de aplicativos móveis",
    date: "28/10/2024",
    time: "14h às 15h",
  },
  {
    id: "2",
    title: "Design Thinking para iniciantes",
    date: "29/10/2024",
    time: "10h às 11h",
  },
  {
    id: "3",
    title: "Introdução ao React Native",
    date: "30/10/2024",
    time: "16h às 17h",
  },
  {
    id: "4",
    title: "Introdução ao React Native",
    date: "30/10/2024",
    time: "16h às 17h",
  },
  {
    id: "5",
    title: "Introdução ao React Native",
    date: "30/10/2024",
    time: "16h às 17h",
  },
];

type HomeScreenNavigationProp = DrawerNavigationProp<any>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<string>("Procurar");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mentorships, setMentorships] = useState<Mentoria[]>([]);
  const [allUsers, setAllUsers] = useState<Usuario[]>([]);

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const fetchMentorships = async () => {
      const token = await AsyncStorage.getItem("@token");
      try {
        const data = await mentoriaServ.getAllmentorias(token || "");
        setMentorships(data);
      } catch (error) {
        console.error("Erro ao buscar mentorias:", error);
      }
    };

    fetchMentorships();
  }, []);

  const gettingAllUsers = useCallback(async () => {
    const token = await AsyncStorage.getItem("@token");

    if (token) {
      const data = await usuarioServ.getAllUsers(token);
      setAllUsers(data);
    }
  }, []);

  const handleSearchPress = () => {
    navigation.navigate("FilterResult", {
      query: searchQuery,
      results: data,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentMain}>
        <View style={styles.header}>
          <Icon
            name="menu"
            size={24}
            color="#FFFFFF"
            onPress={() => navigation.openDrawer()}
          />
          <Text style={styles.headerTitle}>
            Encontre sua <Text style={styles.highlight}>Mentoria</Text>
          </Text>
        </View>

        <View style={styles.search}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
            <TouchableOpacity onPress={handleSearchPress}>
              <Icon
                name="search-outline"
                size={20}
                color="#FFFFFF"
                style={styles.searchIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.illustrationContainer}>
          <Image
            source={require("../../assets/images/study.png")}
            style={styles.illustration}
          />
        </View>
      </View>

      <View style={styles.secondaryHeader}>
        <Text style={styles.sectionTitle}>Últimas acessadas</Text>
      </View>
      <FlatList
        data={mentorships.slice(-4)}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() =>
                navigation.navigate("SessionDetailsScreen", {
                  session: {
                    title: item.nome,
                    startTime: new Date(item.data_inicio).getDate().toString(),
                    endTime: new Date(item.data_fim).getDate().toString(),
                    teacher: allUsers.filter(
                      (currUser, index) => currUser.id === item.mentor
                    )[0]?.nome,
                    description: item.descricao,
                  },
                })
              }
            >
              <Icon name="time-outline" size={20} color="#6C757D" />
              <View style={styles.listItemContent}>
                <Text style={styles.listItemSubtitle}>
                  {new Date(item.data_inicio).getDay().toString()}/
                  {new Date(item.data_inicio).getUTCMonth().toString()}/
                  {new Date(item.data_inicio).getFullYear().toString()} -{" "}
                  {new Date(item.data_inicio).getUTCHours().toString()}
                </Text>
                <Text style={styles.listItemTitle}>{item.nome}</Text>
                <Text style={styles.listItemSubtitle}>
                  Período: {new Date(item.data_fim).getDay().toString()}/
                  {new Date(item.data_fim).getUTCMonth().toString()}/
                  {new Date(item.data_fim).getFullYear().toString()} -{" "}
                  {new Date(item.data_fim).getUTCHours().toString()}
                </Text>
              </View>
              <Icon name="chevron-forward-outline" size={20} color="#6C757D" />
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#263238",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "300",
    marginLeft: 16,
  },
  highlight: {
    fontWeight: "700",
    color: "#FFFFFF",
    fontSize: 24,
  },
  contentMain: {
    backgroundColor: "#263238",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    // paddingBottom: 50,
  },
  search: {
    alignItems: "center",
    padding: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: 317,
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 10,
  },
  illustrationContainer: {
    alignItems: "center",
    // marginVertical: 24,
  },
  illustration: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  secondaryHeader: {
    alignItems: "center",
    marginTop: 40,
  },
  sectionTitle: {
    color: "#263238",
    fontSize: 18,
    marginBottom: 8,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  listItemContent: {
    flex: 1,
    marginLeft: 16,
  },
  listItemTitle: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
  },
  listItemSubtitle: {
    color: "#91989D",
    fontSize: 12,
  },
});

export default HomeScreen;
