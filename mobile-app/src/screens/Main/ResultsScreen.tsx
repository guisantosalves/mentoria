import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Tipando os parâmetros de navegação
type RootStackParamList = {
  Home: undefined;
  FilterResult: { query: string; results: any[] };  // Alterado para dois parâmetros
};

type FilterResultScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FilterResult'>;
type FilterResultScreenRouteProp = RouteProp<RootStackParamList, 'FilterResult'>;

interface FilterResultScreenProps {
  navigation: FilterResultScreenNavigationProp;
  route: FilterResultScreenRouteProp;
}

const FilterResultScreen: React.FC<FilterResultScreenProps> = ({ route }) => {
  const { query, results } = route.params;  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultados para: "{query}"</Text>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemSubtitle}>
              {item.date} - {item.time}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  item: { marginBottom: 16 },
  itemTitle: { fontSize: 16, fontWeight: '600' },
  itemSubtitle: { fontSize: 14, color: '#6C757D' },
});

export default FilterResultScreen;
