import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { usuarioServ } from "../../modules/usuario/service";
import { useAuth } from "../../navigation/context/AuthContext";
import { Usuario } from "../../types/types";

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

type SignupScreenProps = NativeStackScreenProps<RootStackParamList, "Signup">;

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const { token } = useAuth();
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  const createUser = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const usuarioData: Usuario = {
        nome,
        email,
        senha,
        cpf: "",
        rg: "",
        foto: "",
        cursoId: 1,
        tipo: 0,
        disciplinas: [],
        mentorias: [],
      };

      const response = await usuarioServ.createUser(usuarioData, token || "");

      console.log(response);
      if (response) {
        Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
        navigation.navigate("Login");
      } else {
        Alert.alert("Erro", response.message || "Erro ao criar usuário");
      }
    } catch (error) {
      console.error("Erro ao tentar criar o usuário:", error);
      Alert.alert("Erro", "Ocorreu um erro, tente novamente mais tarde.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={createUser}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Já possui uma conta?{" "}
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate("Login")}
        >
          Faça login
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    color: "#263238",
    marginBottom: 16,
  },
  label: {
    alignSelf: "flex-start",
    color: "#5C6D73",
    fontSize: 10,
    fontWeight: "600",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    color: "#333333",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#263238",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    width: "100%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  footerText: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    marginTop: 16,
  },
  linkText: {
    color: "#333333",
    fontWeight: "bold",
  },
});

export default SignupScreen;
