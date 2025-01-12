import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable, Text, TextInput, ActivityIndicator } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  loading: {
    marginVertical: 20,
    alignItems: 'center',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [sortOrder, setSortOrder] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [pickerValue, setPickerValue] = useState('CREATED_AT_DESC');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 700);
  const navigate = useNavigate();

  const { repositories, loading, error } = useRepositories(sortOrder, orderDirection, 10, '', debouncedSearchKeyword);

  const onSortChange = (value) => {
    setPickerValue(value);
    switch (value) {
      case 'CREATED_AT_DESC':
        setSortOrder('CREATED_AT');
        setOrderDirection('DESC');
        break;
      case 'RATING_AVERAGE_DESC':
        setSortOrder('RATING_AVERAGE');
        setOrderDirection('DESC');
        break;
      case 'RATING_AVERAGE_ASC':
        setSortOrder('RATING_AVERAGE');
        setOrderDirection('ASC');
        break;
      default:
        break;
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={repositories ? repositories.edges.map(edge => edge.node) : []}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search repositories..."
            value={searchKeyword}
            onChangeText={setSearchKeyword}
          />
          <Picker
            selectedValue={pickerValue}
            style={styles.picker}
            onValueChange={onSortChange}
          >
            <Picker.Item label="Latest repositories" value="CREATED_AT_DESC" />
            <Picker.Item label="Highest rated repositories" value="RATING_AVERAGE_DESC" />
            <Picker.Item label="Lowest rated repositories" value="RATING_AVERAGE_ASC" />
          </Picker>
          {loading && (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
        </View>
      )}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem repository={item} testID="repositoryItem" />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;