import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

interface SessionDetailsScreenProps {
  route: any;
}

const RegistrationScreen: React.FC<SessionDetailsScreenProps> = ({ route }) => {
  const { session } = route.params;

  const handleEnroll = () => {
    Alert.alert('Matriculado', `Você foi matriculado na mentoria: ${session.title}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{session.title}</Text>
      <Text style={styles.date}>{session.date}</Text>
      <Text style={styles.time}>{session.time}</Text>
      <Text style={styles.description}>{session.description}</Text>

      <Button title="Matricular-se" onPress={handleEnroll} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F4F4F4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 16,
    color: '#6C757D',
    marginVertical: 8,
  },
  time: {
    fontSize: 16,
    color: '#6C757D',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginVertical: 16,
  },
});

export default RegistrationScreen;
