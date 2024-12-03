import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OfferMentorshipScreen from "../screens/Main/OfferMentorshipScreen";
import MentorshipListScreen from "../screens/Main/MentorshipListScreen";

const Stack = createStackNavigator();

const MentorShipNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MentorshipList">
      <Stack.Screen 
        name="MentorshipList" 
        component={MentorshipListScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="OfferMentorship" 
        component={OfferMentorshipScreen} 
        options={{ headerShown: false  }} 
      />
    </Stack.Navigator>
  );
};

export default MentorShipNavigator;
