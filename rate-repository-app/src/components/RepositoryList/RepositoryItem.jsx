import React from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import Text from '../Text';
import useReviews from '../../hooks/useReviews';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  languageTag: {
    flex: 0,
    backgroundColor: '#0366d6',
    borderRadius: 5,
    padding: 5,
    marginVertical: 5,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    marginRight: 10,
  },
});

// Function to format numbers
const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count;
};

const RepositoryItem = ({ repository }) => {
  const { reviews, loading, fetchMore } = useReviews(repository.id, 5, null); // Fetch 5 reviews initially

  const onEndReach = () => {
    fetchMore();
  };

  if (loading) return <Text>Loading reviews...</Text>;

  // Check if reviews are available
  if (!reviews) {
    return <Text>No reviews available.</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image style={styles.avatar} source={{ uri: repository.ownerAvatarUrl }} />
        <View style={styles.nameContainer}>
          <Text fontWeight="bold">{repository.fullName}</Text>
          <Text color="textSecondary">{repository.description}</Text>
          <View style={styles.languageTag}>
            <Text color="textButton">{repository.language}</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <Text color="textSecondary" style={styles.stat}>{formatCount(repository.stargazersCount)} Stars</Text>
        <Text color="textSecondary" style={styles.stat}>{formatCount(repository.forksCount)} Forks</Text>
        <Text color="textSecondary" style={styles.stat}>{repository.reviewCount} Reviews</Text>
        <Text color="textSecondary" style={styles.stat}>{repository.ratingAverage} Rating</Text>
      </View>

      <FlatList
        data={reviews.edges.map(edge => edge.node)}
        renderItem={({ item }) => (
          <View>
            <Text>{item.text}</Text>
            <Text>Rating: {item.rating}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default RepositoryItem;