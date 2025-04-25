import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Main/HomeScreen';
import FilterResultScreen from '../screens/Main/ResultsScreen';

type RootStackParamList = {
  Home: undefined;
  FilterResult: { query: string; results: any[] };
  Search: undefined; 
};


const Stack = createStackNavigator<RootStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="FilterResult" component={FilterResultScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default HomeStack;
