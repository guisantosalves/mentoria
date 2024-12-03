import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen'; 

const Drawer = createDrawerNavigator();

const ProfileScreen: React.FC = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenTitle}>Perfil do Usuário</Text>
  </View>
);

const LogoutScreen: React.FC = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenTitle}>Deseja sair?</Text>
    <TouchableOpacity style={styles.logoutButton}>
      <Text style={styles.logoutText}>Confirmar Logout</Text>
    </TouchableOpacity>
  </View>
);

const AppDrawer: React.FC = () => (
  <Drawer.Navigator
    screenOptions={{
      drawerStyle: {
        backgroundColor: '#f4f4f4',
        width: 240,
      },
      drawerActiveTintColor: '#263238',
      drawerInactiveTintColor: '#91989D',
    }}
  >
    <Drawer.Screen
      name="Home"
      component={HomeScreen}
      options={{
        drawerIcon: ({ color }) => <Icon name="home-outline" size={20} color={color} />,
      }}
    />
    <Drawer.Screen
      name="Perfil"
      component={ProfileScreen}
      options={{
        drawerIcon: ({ color }) => <Icon name="person-outline" size={20} color={color} />,
      }}
    />
    <Drawer.Screen
      name="Logout"
      component={LogoutScreen}
      options={{
        drawerIcon: ({ color }) => <Icon name="log-out-outline" size={20} color={color} />,
      }}
    />
  </Drawer.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <AppDrawer />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  logoutButton: {
    padding: 10,
    backgroundColor: '#D32F2F',
    borderRadius: 8,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
