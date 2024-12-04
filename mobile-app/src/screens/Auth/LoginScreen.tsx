import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Login } from "../../types/types";
import { UsuarioServ } from "../../modules/login/service/index";
import { useAuth } from "../../navigation/context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  HomeScreen: undefined;
};

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    const loginData: Login = { email, senha };
    try {
      const response = await UsuarioServ.logging(loginData);

      if (response && response.token) {
        login(response.token);
        Alert.alert("Sucesso", "Login realizado com sucesso!");
        navigation.navigate("HomeScreen");
      } else {
        Alert.alert("Erro", "Usuário ou senha incorretos");
      }
    } catch (error) {
      console.error("Erro ao tentar realizar o login:", error);
      Alert.alert("Erro", "Ocorreu um erro, tente novamente mais tarde");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="******"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Acessar</Text>
      </TouchableOpacity>

      {/* <Text style={styles.footerText}>
        Esqueceu a senha?{' '}
        <Text style={styles.linkText} onPress={() => navigation.navigate('ForgotPassword')}>
          Recuperar
        </Text>
      </Text> */}

      <Text style={styles.footerText}>
        Novo por aqui?{" "}
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate("Signup")}
        >
          Cadastre-se
        </Text>
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 34,
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
    color: "#263238",
    fontWeight: "bold",
  },
});

export default LoginScreen;
