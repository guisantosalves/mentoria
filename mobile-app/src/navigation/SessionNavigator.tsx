import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SessionsScreen, { Session } from "../screens/Main/SessionsScreen";
import SessionDetailsScreen from "../screens/Main/SessionDetails";

type RootStackParamList = {
    SessionsScreen: undefined;
    SessionDetailsScreen: { session: Session };
};

const Stack = createStackNavigator<RootStackParamList>();

const SessionNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="SessionsScreen" >
            <Stack.Screen name="SessionsScreen" component={SessionsScreen} />
            <Stack.Screen
                name="SessionDetailsScreen"
                component={SessionDetailsScreen}
                options={{ title: "Detalhes da Aula", headerShown: false }}
            />
        </Stack.Navigator>
    );
};



export default SessionNavigator;
