import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
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

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{query}</Text>
      </View>

      <FlatList
        data={results}  
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>{item.nome}</Text>  
              <Text style={styles.itemSubtitle}>
                {item.data_inicio} - {item.data_fim} 
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum resultado encontrado.</Text>}
      />
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
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    marginBottom: 20,
  },
  backButton: {
    paddingRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  item: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#6C757D',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#B0B0B0',
    fontWeight: '600',
    marginTop: 20,
  },
});

export default FilterResultScreen;
