import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainNavigator from './MainNavigator';
import ProfileScreen from '../screens/Main/ProfileScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Main">
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
