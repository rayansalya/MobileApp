import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StorageService } from '../utils/storage';
import BookingCard from '../components/BookingCard';
import mockBookings from '../data/bookings.json';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadUserData();
    loadBookings();
  }, []);

  const loadUserData = async () => {
    const userData = await StorageService.getUser();
    setUser(userData);
  };

  const loadBookings = async () => {
    const userBookings = await StorageService.getBookings();
    // Если есть сохраненные бронирования, используем их, иначе показываем mock-данные
    if (userBookings.length > 0) {
      setBookings(userBookings);
    } else {
      setBookings(mockBookings);
    }
  };

  const handleLogout = async () => {
    await StorageService.logout();
    navigation.replace('Login');
  };

  const renderBooking = ({ item }) => (
    <BookingCard booking={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Профиль пользователя */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle-outline" size={80} color="#007AFF" />
          </View>
          {user ? (
            <>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </>
          ) : (
            <>
              <Text style={styles.userName}>Гость</Text>
              <Text style={styles.userEmail}>Войдите в аккаунт</Text>
            </>
          )}
        </View>

        {/* Кнопки действий */}
        <View style={styles.actionButtons}>
          {user ? (
            <>
              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={() => navigation.navigate('SelfCheckIn')}
              >
                <Ionicons name="qr-code-outline" size={24} color="#007AFF" />
                <Text style={styles.actionButtonText}>Check-in</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={24} color="#F44336" />
                <Text style={styles.actionButtonText}>Выйти</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => navigation.replace('Login')}
            >
              <Ionicons name="log-in-outline" size={24} color="#007AFF" />
              <Text style={styles.actionButtonText}>Войти</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* История бронирований */}
        <View style={styles.bookingsSection}>
          <Text style={styles.sectionTitle}>История бронирований</Text>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={50} color="#ccc" />
              <Text style={styles.emptyText}>У вас пока нет бронирований</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileSection: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    marginBottom: 16,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  actionButtons: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  actionButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  bookingsSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});