import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    try {
      const token = await AsyncStorage.getItem(`${this.namespace}:accessToken`);
      return token; // Return the access token
    } catch (error) {
      console.error('Failed to get access token:', error);
      return null; // Return null if there's an error
    }
  }

  async setAccessToken(accessToken) {
    try {
      await AsyncStorage.setItem(`${this.namespace}:accessToken`, accessToken);
    } catch (error) {
      console.error('Failed to set access token:', error);
    }
  }

  async removeAccessToken() {
    try {
      await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
    } catch (error) {
      console.error('Failed to remove access token:', error);
    }
  }
}

export default AuthStorage; 