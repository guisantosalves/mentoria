import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';

interface ItemData {
  id: string;
  title: string;
  date: string;
  time: string;
}

const data: ItemData[] = [
  { id: '1', title: 'Desenvolvimento de aplicativos móveis', date: '28/10/2024', time: '14h às 15h' },
  { id: '2', title: 'Design Thinking para iniciantes', date: '29/10/2024', time: '10h às 11h' },
  { id: '3', title: 'Introdução ao React Native', date: '30/10/2024', time: '16h às 17h' },
];

type HomeScreenNavigationProp = StackNavigationProp<any, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<string>('Procurar');

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleSearchPress = () => {
    console.log("presionou")
    navigation.navigate('Search');
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.contentMain}>
        <View style={styles.header}>
          <Icon name="menu" size={24} color="#FFFFFF" />
          <Text style={styles.headerTitle}>
            Encontre sua <Text style={styles.highlight}>Mentoria</Text>
          </Text>
        </View>

        {/* Barra de pesquisa */}
        <View style={styles.search}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar mentoria"
              placeholderTextColor="#888"
            />
            <TouchableOpacity onPress={handleSearchPress}>
              <Icon name="search-outline" size={20} color="#FFFFFF" style={styles.searchIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Ilustração */}
        <View style={styles.illustrationContainer}>
          <Image
            source={require('../../assets/images/computer.png')}
            style={styles.illustration}
          />
        </View>
      </View>

      {/* Lista de mentorias */}
      <View style={styles.secondaryHeader}>
        <Text style={styles.sectionTitle}>Últimas acessadas</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listItem}>
            <Icon name="time-outline" size={20} color="#6C757D" />
            <View style={styles.listItemContent}>
              <Text style={styles.listItemSubtitle}>{item.date}</Text>
              <Text style={styles.listItemTitle}>{item.title}</Text>
              <Text style={styles.listItemSubtitle}>{item.time}</Text>
            </View>
            <Icon name="chevron-forward-outline" size={20} color="#6C757D" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#263238',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '300',
    marginLeft: 16,
  },
  highlight: {
    fontWeight: '700',
    color: '#FFFFFF',
    fontSize: 24,
  },
  contentMain: {
    backgroundColor: '#263238',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingBottom: 50,
  },
  search: {
    alignItems: 'center',
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 10,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  illustration: {
    width: 170,
    height: 170,
    resizeMode: 'contain',
  },
  secondaryHeader: {
    alignItems: 'center',
    marginTop: 40,
  },
  sectionTitle: {
    color: '#263238',
    fontSize: 18,
    marginBottom: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  listItemContent: {
    flex: 1,
    marginLeft: 16,
  },
  listItemTitle: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
  },
  listItemSubtitle: {
    color: '#91989D',
    fontSize: 12,
  },
});

export default HomeScreen;