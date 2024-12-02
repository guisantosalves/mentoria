import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Main/HomeScreen';
import FilterResultScreen from '../screens/Main/ResultsScreen';

type RootStackParamList = {
  Home: undefined;
  FilterResult: { query: string; results: any[] };
};

const Stack = createStackNavigator<RootStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="FilterResult" component={FilterResultScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;