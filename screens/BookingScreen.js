import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StorageService } from '../utils/storage';

export default function BookingScreen({ route, navigation }) {
  const { room } = route.params;
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date(Date.now() + 86400000));
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  const calculateTotal = () => {
    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays * room.price;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('ru-RU');
  };

  const handleBooking = async () => {
    if (!guestName || !guestEmail || !guestPhone) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }

    if (checkIn >= checkOut) {
      Alert.alert('Ошибка', 'Дата выезда должна быть позже даты заезда');
      return;
    }

    const booking = {
      id: Date.now(),
      roomId: room.id,
      roomTitle: room.title,
      checkIn: checkIn.toISOString().split('T')[0],
      checkOut: checkOut.toISOString().split('T')[0],
      totalPrice: calculateTotal(),
      status: 'confirmed',
      guestName,
      guestEmail,
      guestPhone,
      createdAt: new Date().toISOString()
    };

    await StorageService.saveBooking(booking);
    
    Alert.alert(
      'Успех',
      'Бронирование подтверждено!',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Main')
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.roomInfo}>
        <Text style={styles.roomTitle}>{room.title}</Text>
        <Text style={styles.roomPrice}>{room.price} ₽ за ночь</Text>
      </View>

      <View style={styles.dateSection}>
        <Text style={styles.sectionTitle}>Даты проживания</Text>
        
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowCheckInPicker(true)}
        >
          <Text style={styles.dateLabel}>Заезд</Text>
          <Text style={styles.dateValue}>{formatDate(checkIn)}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowCheckOutPicker(true)}
        >
          <Text style={styles.dateLabel}>Выезд</Text>
          <Text style={styles.dateValue}>{formatDate(checkOut)}</Text>
        </TouchableOpacity>

        {showCheckInPicker && (
          <DateTimePicker
            value={checkIn}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setShowCheckInPicker(false);
              if (selectedDate) setCheckIn(selectedDate);
            }}
            minimumDate={new Date()}
          />
        )}

        {showCheckOutPicker && (
          <DateTimePicker
            value={checkOut}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setShowCheckOutPicker(false);
              if (selectedDate) setCheckOut(selectedDate);
            }}
            minimumDate={checkIn}
          />
        )}
      </View>

      <View style={styles.guestSection}>
        <Text style={styles.sectionTitle}>Контактная информация</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Имя и фамилия"
          value={guestName}
          onChangeText={setGuestName}
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={guestEmail}
          onChangeText={setGuestEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Телефон"
          value={guestPhone}
          onChangeText={setGuestPhone}
          keyboardType="phone-pad"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.totalSection}>
        <Text style={styles.totalLabel}>Итого к оплате:</Text>
        <Text style={styles.totalAmount}>{calculateTotal()} ₽</Text>
      </View>

      <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
        <Text style={styles.bookButtonText}>Подтвердить бронирование</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  roomInfo: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
  },
  roomTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  roomPrice: {
    fontSize: 16,
    color: '#007AFF',
    marginTop: 4,
  },
  dateSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  dateButton: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  dateLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  guestSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
  },
  totalSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    color: '#333',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  bookButton: {
    backgroundColor: '#007AFF',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});