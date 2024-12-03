import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';


type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/illustration.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Bem-vindo(a)!</Text>
      <Text style={styles.subtitle}>
        Conecte-se com mentores inspiradores, aprenda novas habilidades e cresça em sua jornada.
      </Text>

    <View style={styles.footer}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Login</Text>
        <View style={styles.iconContainer}>
        <Icon name="chevron-forward-outline" size={20} color="#6C757D" />
        </View>
      </TouchableOpacity>


      <Text style={styles.footerText}>
        Novo por aqui?{' '}
        <Text style={styles.signupText} onPress={() => navigation.navigate('Signup')}>
          Cadastre-se
        </Text>
      </Text>
    </View>

      {/* <Text style={styles.footerText}>
        Esqueceu sua senha?{' '}
        <Text style={styles.signupText} onPress={() => navigation.navigate('ForgotPassword')}>
          Recuperar senha
        </Text>
      </Text> */}
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
    width: 300,
    height: 300,
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#263238',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
  },
  footer: {
    position: 'absolute', 
    bottom: 24, 
    width: '100%',
    padding: 20
  },
  button: {
    backgroundColor: '#263238',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 16,
  },
  iconContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  icon: {
    color: '#263238',
    fontSize: 16,
    fontWeight: 'bold',
  },

  footerText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 8,
  },
  signupText: {
    color: '#263238',
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
