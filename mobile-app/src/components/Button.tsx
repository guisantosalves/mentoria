import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary' }) => (
  <TouchableOpacity
    style={[styles.button, variant === 'secondary' && styles.secondaryButton]}
    onPress={onPress}
  >
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default Button;
