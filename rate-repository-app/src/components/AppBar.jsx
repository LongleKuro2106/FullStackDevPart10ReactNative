import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import Text from './Text';
import theme from '../theme';
import Constants from 'expo-constants';
import { GET_AUTHORIZED_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarTheme,
    padding: 10,
  },
  scrollView: {
    flexDirection: 'row',
  },
  tab: {
    padding: 10,
  },
});

const AppBar = () => {
  const { data } = useQuery(GET_AUTHORIZED_USER);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        <Pressable style={styles.tab}>
          <Link to="/" underlayColor="#f0f4f7">
            <Text fontWeight="bold" color="textPrimary">Repositories</Text>
          </Link>
        </Pressable>
        {data?.me && (
          <Pressable style={styles.tab}>
            <Link to="/create-review" underlayColor="#f0f4f7">
              <Text fontWeight="bold" color="textPrimary">Create a review</Text>
            </Link>
          </Pressable>
        )}
        {!data?.me && (
          <Pressable style={styles.tab}>
            <Link to="/signup" underlayColor="#f0f4f7">
              <Text fontWeight="bold" color="textPrimary">Sign up</Text>
            </Link>
          </Pressable>
        )}
        {data?.me ? (
          <Pressable style={styles.tab} onPress={signOut}>
            <Text fontWeight="bold" color="textPrimary">Sign out</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.tab}>
            <Link to="/signin" underlayColor="#f0f4f7">
              <Text fontWeight="bold" color="textPrimary">Sign in</Text>
            </Link>
          </Pressable>
        )}
        {data?.me && (
          <Pressable style={styles.tab}>
            <Link to="/my-reviews" underlayColor="#f0f4f7">
              <Text fontWeight="bold" color="textPrimary">My Reviews</Text>
            </Link>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;