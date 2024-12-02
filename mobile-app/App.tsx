import { NavigationContainer } from '@react-navigation/native';

import MainNavigator from './src/navigation/MainNavigator';
import React from 'react';
import AuthNavigator from './src/navigation/AuthNavigator';

export default function App() {
  return (
   <NavigationContainer>
      <AuthNavigator/>
   </NavigationContainer>
  );
}
