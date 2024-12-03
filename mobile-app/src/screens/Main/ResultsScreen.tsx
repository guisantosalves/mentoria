import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  Home: undefined;
  FilterResult: { query: string; results: any[] };
  SessionDetailsScreen: { session: any }; 
};

type FilterResultScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FilterResult'>;
type FilterResultScreenRouteProp = RouteProp<RootStackParamList, 'FilterResult'>;

interface FilterResultScreenProps {
  navigation: FilterResultScreenNavigationProp;
  route: FilterResultScreenRouteProp;
}

const FilterResultScreen: React.FC<FilterResultScreenProps> = ({ route, navigation }) => {
  const { query, results } = route.params;

  const handleItemPress = (item: any) => {
    navigation.navigate('SessionDetailsScreen', {
      session: item, 
    });
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Image source={require('../../assets/images/cat.png')}style={styles.emptyImage} />
      <Text style={styles.emptyText}>Nenhum resultado encontrado.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{query}</Text>
      </View>

      <View style={styles.emptyContainer}>
      <Image source={require('../../assets/images/cat.png')}style={styles.emptyImage} />
      <Text style={styles.emptyText}>Nenhum resultado encontrado.</Text>
    </View>
      {/* {results.length > 0 ? (
        <FlatList
          data={results}  
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
              <View style={styles.itemContent}>
                <Text style={styles.itemTime}>{item.data_inicio} - {item.data_fim}</Text>  
                <Text style={styles.itemTitle}>{item.nome}</Text>
                <Text style={styles.itemDescription}>
                  {item.descricao || 'Descrição não disponível...'}
                </Text>
              </View>
              <View style={styles.itemFooter}>
                <Text style={styles.itemAuthor}>{item.autor}</Text>
                <View style={styles.itemRating}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Ionicons name="star" size={16} color="#FFD700" />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        renderEmptyList()  
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F4F4F4',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 25,
    borderColor: '#cdcdcd94',
    borderWidth: 1,
    marginBottom: 20,
  },
  backButton: {
    paddingRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  filterButton: {
    paddingLeft: 8,
  },
  item: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  itemContent: {
    marginBottom: 10,
  },
  itemTime: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDescription: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 4,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  itemAuthor: {
    fontSize: 14,
    color: '#6C757D',
  },
  itemRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#B0B0B0',
    fontWeight: '600',
  },
});

export default FilterResultScreen;
