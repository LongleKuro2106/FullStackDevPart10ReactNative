import React from 'react';
import { View, StyleSheet, TextInput, Button, Text } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations'; // Import the updated mutation
import { useNavigate } from 'react-router-native';

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner\'s username is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number().required('Rating is required').min(0, 'Rating must be between 0 and 100').max(100, 'Rating must be between 0 and 100'),
  text: yup.string().optional(),
});

const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview] = useMutation(CREATE_REVIEW);

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const { data } = await createReview({
        variables: { 
          review: { 
            ownerName, 
            repositoryName, 
            rating: Number(rating), 
            text 
          } 
        },
      });
      navigate(`/repository/${data.createReview.repository.id}`); // Redirect to the repository view
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Review</Text>
      <Formik
        initialValues={{ ownerName: '', repositoryName: '', rating: '', text: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Repository Owner's GitHub Username"
              onChangeText={handleChange('ownerName')}
              onBlur={handleBlur('ownerName')}
              value={values.ownerName}
            />
            {touched.ownerName && errors.ownerName && <Text style={styles.errorText}>{errors.ownerName}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Repository Name"
              onChangeText={handleChange('repositoryName')}
              onBlur={handleBlur('repositoryName')}
              value={values.repositoryName}
            />
            {touched.repositoryName && errors.repositoryName && <Text style={styles.errorText}>{errors.repositoryName}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Rating (0-100)"
              keyboardType="numeric"
              onChangeText={handleChange('rating')}
              onBlur={handleBlur('rating')}
              value={values.rating}
            />
            {touched.rating && errors.rating && <Text style={styles.errorText}>{errors.rating}</Text>}

            <TextInput
              style={[styles.input, styles.multiline]}
              placeholder="Review (optional)"
              multiline
              onChangeText={handleChange('text')}
              onBlur={handleBlur('text')}
              value={values.text}
            />

            <Button onPress={handleSubmit} title="Submit" />
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  multiline: {
    height: 100,
  },
  errorText: {
    color: '#d73a4a',
  },
});

export default CreateReview; 