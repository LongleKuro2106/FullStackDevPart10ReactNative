import React from 'react';
import { View, StyleSheet, FlatList, Text, Button, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';

const ReviewItem = ({ review, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => onDelete(review.id) }
      ]
    );
  };

  return (
    <View style={styles.reviewContainer}>
      <Text style={styles.username}>{review.repository.fullName}</Text>
      <Text style={styles.date}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
      <Text style={styles.reviewText}>{review.text}</Text>
      <Text style={styles.ratingText}>Rating: {review.rating}</Text>
      <Button title="View Repository" onPress={() => navigate(`/repository/${review.repository.id}`)} />
      <Button title="Delete Review" onPress={handleDelete} color="red" />
    </View>
  );
};

const MyReviews = () => {
  const { loading, error, data, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
  });

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Error deleting review:", error);
    }
  });

  const handleDeleteReview = (id) => {
    deleteReview({ variables: { deleteReviewId: id } });
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  // Check if user is authenticated
  if (!data || !data.me) {
    return (
      <View style={styles.container}>
        <Text>You need to be signed in to see your reviews.</Text>
      </View>
    );
  }

  const reviews = data.me.reviews.edges.map(edge => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} onDelete={handleDeleteReview} />}
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
  container: {
    padding: 20,
    alignItems: 'center',
  },
});

export default MyReviews;