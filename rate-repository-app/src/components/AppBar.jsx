import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';
import theme from '../theme';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarTheme,
    padding: 10,
  },
  scrollView: {
    flexDirection: 'row', // Align tabs in a row
  },
  tab: {
    padding: 10,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        <Pressable style={styles.tab}>
          <Link to="/" underlayColor="#f0f4f7">
            <Text fontWeight="bold" color="textPrimary">Repositories</Text>
          </Link>
        </Pressable>
        <Pressable style={styles.tab}>
          <Link to="/signin" underlayColor="#f0f4f7">
            <Text fontWeight="bold" color="textPrimary">Sign in</Text>
          </Link>
        </Pressable>
        {/* Add more tabs for testing scrolling */}
        <Pressable style={styles.tab}>
          <Link to="/tab3" underlayColor="#f0f4f7">
            <Text fontWeight="bold" color="textPrimary">Tab 3</Text>
          </Link>
        </Pressable>
        <Pressable style={styles.tab}>
          <Link to="/tab4" underlayColor="#f0f4f7">
            <Text fontWeight="bold" color="textPrimary">Tab 4</Text>
          </Link>
        </Pressable>
        <Pressable style={styles.tab}>
          <Link to="/tab5" underlayColor="#f0f4f7">
            <Text fontWeight="bold" color="textPrimary">Tab 5</Text>
          </Link>
        </Pressable>
        {/* Add more tabs as needed */}
      </ScrollView>
    </View>
  );
};

export default AppBar;