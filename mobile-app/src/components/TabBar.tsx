import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';  

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => (
  <View style={styles.container}>
    {state.routes.map((route, index) => {
      const { options } = descriptors[route.key];
      const label = options.tabBarLabel || route.name;

      const isFocused = state.index === index;

      return (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate(route.name)}
          style={[styles.tab, isFocused && styles.focusedTab]}
        >
          {/* <Text style={styles.text}>{label}</Text> */}
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderColor: '#EEE',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusedTab: {
    borderBottomWidth: 2,
    borderColor: '#4CAF50',
  },
  text: {
    color: '#333',
  },
});

export default TabBar;
