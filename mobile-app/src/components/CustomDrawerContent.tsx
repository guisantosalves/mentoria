import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useAuth } from '../navigation/context/AuthContext'; 

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { logout } = useAuth(); 
  const { navigation } = props;

  const handleLogout = () => {
    logout(); 
    navigation.navigate('Login'); 
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image
          source={require('../assets/images/lotus.png')} 
          style={styles.avatar}
        />
        <Text style={styles.username}>Olá, Usuário!</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sair"
        onPress={handleLogout} 
        labelStyle={styles.logoutLabel}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    color: '#263238',
    fontSize: 18,
    fontWeight: '500',
  },
  logoutLabel: {
    color: '#FF7043',
    fontWeight: 'bold',
  },
});
