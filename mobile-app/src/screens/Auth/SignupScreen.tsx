import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

type SignupScreenProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} placeholder="Digite seu nome" />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="Digite seu email" keyboardType="email-address" />

      <Text style={styles.label}>Senha</Text>
      <TextInput style={styles.input} placeholder="Digite sua senha" secureTextEntry />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Já possui uma conta?{' '}
        <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>
          Faça login
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
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#263238',
    marginBottom: 16,
  },
  label: {
    alignSelf: 'flex-start',
    color: "#5C6D73",
    fontSize: 10,
    fontWeight: "600",
    marginBottom: 5,
  },
  input: {
    width: '100%',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#333333',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#263238',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    width: '100%',
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
    marginTop: 16,
  },
  linkText: {
    color: '#333333',
    fontWeight: 'bold',
  },
});

export default SignupScreen;
