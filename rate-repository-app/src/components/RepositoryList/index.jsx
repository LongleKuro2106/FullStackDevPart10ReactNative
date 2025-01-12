import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    marginBottom: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, onSortChange, selectedValue }) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

  return (
    <View>
      <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={(itemValue) => onSortChange(itemValue)}
      >
        <Picker.Item label="Latest repositories" value="CREATED_AT_DESC" />
        <Picker.Item label="Highest rated repositories" value="RATING_AVERAGE_DESC" />
        <Picker.Item label="Lowest rated repositories" value="RATING_AVERAGE_ASC" />
      </Picker>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => {
            console.log(`Navigating to repository with ID: ${item.id}`);
            navigate(`/repository/${item.id}`);
          }}>
            <RepositoryItem repository={item} testID="repositoryItem" />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const RepositoryList = () => {
  const [sortOrder, setSortOrder] = useState('CREATED_AT'); // Default sorting
  const [orderDirection, setOrderDirection] = useState('DESC'); // Default direction
  const [pickerValue, setPickerValue] = useState('CREATED_AT_DESC'); // State for Picker value
  const { repositories, loading, error } = useRepositories(sortOrder, orderDirection);

  const onSortChange = (value) => {
    setPickerValue(value); // Update Picker value
    switch (value) {
      case 'CREATED_AT_DESC':
        setSortOrder('CREATED_AT');
        setOrderDirection('DESC'); // Latest first
        break;
      case 'RATING_AVERAGE_DESC':
        setSortOrder('RATING_AVERAGE');
        setOrderDirection('DESC'); // Highest first
        break;
      case 'RATING_AVERAGE_ASC':
        setSortOrder('RATING_AVERAGE');
        setOrderDirection('ASC'); // Lowest first
        break;
      default:
        break;
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return <RepositoryListContainer repositories={repositories} onSortChange={onSortChange} selectedValue={pickerValue} />;
};

export default RepositoryList;