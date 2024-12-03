import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainNavigator from './MainNavigator';
import ProfileScreen from '../screens/Main/ProfileScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
    initialRouteName="Main"
    drawerContent={(props) => <CustomDrawerContent {...props} />} 
    screenOptions={{
      headerTintColor: '#263238',
      drawerLabelStyle: { color: '#263238' },
      drawerActiveTintColor: '#CECACA',
    }}
  >
    <Drawer.Screen
      name="Main"
      component={MainNavigator}
      options={{ title: 'Início', headerShown: false }}
    />
    <Drawer.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ title: 'Perfil', headerShown: false }}
    />
  </Drawer.Navigator>
  );
};

export default DrawerNavigator;
