import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MentorshipListScreen from "../screens/Main/MentorshipListScreen";
import MentorshipDetailsScreen from "../screens/Main/MentorshipDetails";
import { Mentoria } from "../types/types";
import OfferMentorshipScreen from "../screens/Main/OfferMentorshipScreen";
import EditMentorshipScreen from "../screens/Main/EditMentorshipScreen";

type RootStackParamList = {
  MentorshipList: undefined;
  OfferMentorship: undefined; 
  MentorshipDetails: { mentoria: Mentoria };
  EditMentorshipScreen: {mentoria: Mentoria}
};

const Stack = createStackNavigator<RootStackParamList>();

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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MentorshipDetails"
        component={MentorshipDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditMentorshipScreen"   
        component={EditMentorshipScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MentorShipNavigator;
