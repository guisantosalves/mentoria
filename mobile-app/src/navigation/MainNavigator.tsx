import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import BottomNavigation from "../components/BottomNavigation"; 
import SessionNavigator from "./SessionNavigator"; 
import HomeScreen from "../screens/Main/HomeScreen";
import OfferMentorshipScreen from "../screens/Main/OfferMentorshipScreen";
import HomeStack from "./HomeStack";

const MainNavigator = () => {
  const [activeTab, setActiveTab] = useState<string>("Procurar");

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case "Procurar":
        return <HomeStack  />;
      case "Oferecer":
        return <OfferMentorshipScreen />;
      case "Suas aulas":
        return <SessionNavigator />; 
      default:
        return <HomeStack />;
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>{renderScreen()}</View>
      <BottomNavigation activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  screenContainer: {
    flex: 1,
  },
});

export default MainNavigator;