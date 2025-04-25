import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { usuarioServ } from "../../modules/usuario/service";
import { useAuth } from "../../navigation/context/AuthContext";
import { Usuario } from "../../types/types";
import Icon from "react-native-vector-icons/Feather";

const userImage = require("../../../assets/user.png");

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

type SignupScreenProps = NativeStackScreenProps<RootStackParamList, "Signup">;

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const { token } = useAuth();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [foto, setFoto] = useState<string | null>(null);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [uploading, setUploading] = useState(false);

  const senhaCoincide = senha === confirmarSenha || confirmarSenha === "";

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (senha: string) => senha.length >= 8;

  const escolherImagem = async () => {
    if (uploading) return;

    try {
      setUploading(true);

      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos acessar sua galeria para selecionar uma imagem');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      // if (!result.canceled && result.assets && result.assets.length > 0) {
      //   let uri = result.assets[0].uri;
      //   if (Platform.OS === 'android' && !uri.startsWith('file://')) {
      //     uri = 'file://' + uri;
      //   }
      //   setFoto(uri);
      // }

      console.log(result);

      if (!result.canceled) {
        setFoto(result.assets[0].uri);
      }

    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem');
    } finally {
      setUploading(false);
    }
  };

  const createUser = async () => {
    const nomeFormatado = nome.trim();
    const emailFormatado = email.trim().toLowerCase();
    const senhaFormatada = senha.trim();
    const confirmarSenhaFormatada = confirmarSenha.trim();

    if (!nomeFormatado || !emailFormatado || !senhaFormatada || !confirmarSenhaFormatada) {
      console.log("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!isValidEmail(emailFormatado)) {
      console.log("Erro", "Por favor, insira um e-mail válido.");
      return;
    }

    if (!isValidPassword(senhaFormatada)) {
      console.log("Erro", "A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (senhaFormatada !== confirmarSenhaFormatada) {
      console.log("Erro", "As senhas não coincidem.");
      return;
    }
    try {
      const usuarioData: Usuario = {
        nome: nomeFormatado,
        email: emailFormatado,
        senha: senhaFormatada,
        cpf,
        rg,
        foto: foto || " ",
        cursoId: 1,
        tipo: 0,
        disciplinas: [],
        mentorias: [],
      };

      console.log("usuario:", usuarioData)
      const response = await usuarioServ.createUser(usuarioData, token || "");
      console.log(response)

      if (response) {
        Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
        navigation.navigate("Login");
      } else {
        Alert.alert("Erro", response.message || "Erro ao criar usuário");
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      Alert.alert("Erro", "Ocorreu um erro, tente novamente mais tarde.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.innerContainer}>
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
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Senha</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Digite sua senha"
                secureTextEntry={!mostrarSenha}
                value={senha}
                onChangeText={setSenha}
              />
              <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                <Icon
                  name={mostrarSenha ? "eye-off" : "eye"}
                  size={20}
                  color="#333"
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Confirmar Senha</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.passwordInput,
                  !senhaCoincide && confirmarSenha ? styles.inputError : null,
                ]}
                placeholder="Confirme sua senha"
                secureTextEntry={!mostrarConfirmarSenha}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
              />
              <TouchableOpacity
                onPress={() =>
                  setMostrarConfirmarSenha(!mostrarConfirmarSenha)
                }
              >
                <Icon
                  name={mostrarConfirmarSenha ? "eye-off" : "eye"}
                  size={20}
                  color="#333"
                />
              </TouchableOpacity>
            </View>
            {!senhaCoincide && confirmarSenha !== "" && (
              <Text style={styles.errorText}>As senhas não coincidem</Text>
            )}

            <Text style={styles.label}>CPF</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu CPF"
              value={cpf}
              onChangeText={setCpf}
            />

            <Text style={styles.label}>RG</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu RG"
              value={rg}
              onChangeText={setRg}
            />
            <Text style={styles.label}>Foto</Text>
            <TouchableOpacity
              style={styles.imageButton}
              onPress={escolherImagem}
              disabled={uploading}
            >
              {uploading ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <Text style={styles.imageButtonText}>
                  {foto ? "Trocar imagem" : "Selecionar imagem"}
                </Text>
              )}
            </TouchableOpacity>

            <View style={styles.imageContainer}>
              <Image
                source={foto ? { uri: foto } : userImage}
                style={styles.imagePreview}
                resizeMode="cover"
                onError={() => {
                  console.log('Falha ao carregar imagem');
                  setFoto(null);
                }}
              />
            </View>
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
  },
  innerContainer: { alignItems: "center" },
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
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: "#333333",
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    marginTop: -12,
    marginBottom: 12,
  },
  imageButton: {
    backgroundColor: "#263238",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 40,
  },
  imageButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    backgroundColor: '#f0f0f0',
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