import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useAuth } from "../../navigation/context/AuthContext";

interface ProfileScreenProps {
  navigation: DrawerNavigationProp<any>;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="menu"
          size={24}
          color="#263238"
          onPress={() => navigation.openDrawer()}
        />
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={require("../../assets/images/lotus.png")}
          style={styles.avatar}
        />
        <Text style={styles.username}>João da Silva</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>E-mail:</Text>
          <Text style={styles.infoText}>admin@gmail.com</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "300",
    marginLeft: 16,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#263238",
    marginBottom: 20,
  },
  infoContainer: {
    width: "100%",
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#5C6D73",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: "#263238",
    padding: 12,
    backgroundColor: "#D9D9D966",
    borderRadius: 8,
    marginBottom: 15,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#D32F2F",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProfileScreen;
