import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ChatScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/cactus-bro.png')} 
        style={styles.image}
      />
      <Text style={styles.title}>Funcionalidade Indisponível</Text>
      <Text style={styles.subtitle}>
        Esta funcionalidade ainda não está disponível, mas em breve será!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#263238',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    color: '#5C6D73',
    textAlign: 'center',
  },
});

export default ChatScreen;
