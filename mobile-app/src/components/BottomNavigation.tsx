import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tabName: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabPress }) => {
  const tabs = [
    { name: 'Procurar', icon: 'search' },
    { name: 'Oferecer', icon: 'add-circle-outline' },
    { name: 'Suas aulas', icon: 'calendar-outline' },
    { name: 'Mensagens', icon: 'chatbubbles-outline' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tab}
          onPress={() => onTabPress(tab.name)}
        >
          <Icon
            name={tab.icon}
            size={24}
            color={activeTab === tab.name ? '#000000' : '#6C757D'}
          />
          <Text style={[styles.label, activeTab === tab.name && styles.activeLabel]}>
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.5)'
  },
  tab: {
    alignItems: 'center',
  },
  label: {
    color: '#263238',
    fontSize: 12,
    marginTop: 4,
  },
  activeLabel: {
    color: '#263238',
    fontWeight: 'bold',
  },
});

export default BottomNavigation;