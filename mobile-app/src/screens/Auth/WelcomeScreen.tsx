import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Definição das rotas da navegação
type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined; // Adicionando rota de recuperação de senha
};

// Props da tela
type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Ilustração */}
      <Image
        source={require('../assets/images/illustration.png')} // Substitua pelo caminho correto da sua imagem
        style={styles.image}
        resizeMode="contain"
      />

      {/* Texto de boas-vindas */}
      <Text style={styles.title}>Bem-vindo(a)!</Text>
      <Text style={styles.subtitle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Text>

      {/* Botão de Login */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Link para Cadastro */}
      <Text style={styles.footerText}>
        Novo por aqui?{' '}
        <Text style={styles.signupText} onPress={() => navigation.navigate('Signup')}>
          Cadastre-se
        </Text>
      </Text>

      {/* Link para Recuperação de Senha */}
      <Text style={styles.footerText}>
        Esqueceu sua senha?{' '}
        <Text style={styles.signupText} onPress={() => navigation.navigate('ForgotPassword')}>
          Recuperar senha
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#333333',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    flexDirection: 'row',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 8,
  },
  signupText: {
    color: '#333333',
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
