import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  USER: '@user_data',
  BOOKINGS: '@bookings',
  IS_LOGGED_IN: '@is_logged_in'
};

export const StorageService = {
  // User methods
  async saveUser(userData) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      await AsyncStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  },

  async getUser() {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  },

  async isLoggedIn() {
    try {
      const isLoggedIn = await AsyncStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN);
      return isLoggedIn === 'true';
    } catch (error) {
      console.error('Error checking login status:', error);
      return false;
    }
  },

  async logout() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      await AsyncStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'false');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  },

  // Bookings methods
  async saveBooking(booking) {
    try {
      const existingBookings = await this.getBookings();
      const updatedBookings = [...existingBookings, booking];
      await AsyncStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updatedBookings));
    } catch (error) {
      console.error('Error saving booking:', error);
    }
  },

  async getBookings() {
    try {
      const bookings = await AsyncStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return bookings ? JSON.parse(bookings) : [];
    } catch (error) {
      console.error('Error getting bookings:', error);
      return [];
    }
  },

  async clearAll() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
};