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

      {/* Campo de Nome */}
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} placeholder="Digite seu nome" />

      {/* Campo de Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="Digite seu email" keyboardType="email-address" />

      {/* Campo de Senha */}
      <Text style={styles.label}>Senha</Text>
      <TextInput style={styles.input} placeholder="Digite sua senha" secureTextEntry />

      {/* Botão de Cadastro */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* Link para Voltar ao Login */}
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
      fontWeight: 'bold',
      color: '#333333',
      marginBottom: 24,
    },
    label: {
      fontSize: 14,
      color: '#666666',
      alignSelf: 'flex-start',
      marginBottom: 8,
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
      backgroundColor: '#333333',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 8,
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
