import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';
import { format } from 'date-fns';

const ReviewItem = ({ review }) => (
  <View style={styles.reviewContainer}>
    <Text style={styles.username}>{review.repository.fullName}</Text>
    <Text style={styles.date}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
    <Text style={styles.reviewText}>{review.text}</Text>
    <Text style={styles.ratingText}>Rating: {review.rating}</Text>
  </View>
);

const MyReviews = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviews = data.me.reviews.edges.map(edge => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  username: {
    fontWeight: 'bold',
  },
  date: {
    color: 'gray',
  },
  reviewText: {
    marginTop: 5,
  },
  ratingText: {
    marginTop: 5,
    fontWeight: 'bold',
  },
});

export default MyReviews;