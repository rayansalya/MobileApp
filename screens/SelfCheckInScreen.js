import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SelfCheckInScreen({ navigation }) {
  const [documentNumber, setDocumentNumber] = useState('');
  const [documentPhoto, setDocumentPhoto] = useState(null);
  const [rulesAccepted, setRulesAccepted] = useState(false);

  const handleCheckIn = () => {
    if (!documentNumber || !rulesAccepted) {
      Alert.alert('Ошибка', 'Заполните все поля и подтвердите ознакомление с правилами');
      return;
    }

    // Генерация QR-кода для доступа
    Alert.alert(
      'Успех',
      'Регистрация завершена! QR-код для доступа отправлен на ваш email.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Электронная регистрация</Text>
        <Text style={styles.subtitle}>Пройдите регистрацию самостоятельно</Text>
      </View>

      <View style={styles.bookingInfo}>
        <Text style={styles.sectionTitle}>Информация о бронировании</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Номер:</Text>
          <Text style={styles.infoValue}>Двухместный стандарт</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Даты:</Text>
          <Text style={styles.infoValue}>15.03.2025 - 17.03.2025</Text>
        </View>
      </View>

      <View style={styles.documentSection}>
        <Text style={styles.sectionTitle}>Документ</Text>
        <TextInput
          style={styles.input}
          placeholder="Номер паспорта"
          value={documentNumber}
          onChangeText={setDocumentNumber}
        />
        
        <TouchableOpacity style={styles.photoButton}>
          <Ionicons name="camera-outline" size={24} color="#007AFF" />
          <Text style={styles.photoButtonText}>Сканировать документ</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rulesSection}>
        <Text style={styles.sectionTitle}>Правила проживания</Text>
        <View style={styles.rules}>
          <Text style={styles.ruleText}>• Курение в номерах запрещено</Text>
          <Text style={styles.ruleText}>• Тишина с 23:00 до 07:00</Text>
          <Text style={styles.ruleText}>• Посетители до 22:00</Text>
          <Text style={styles.ruleText}>• Бережное отношение к имуществу</Text>
        </View>
        
        <View style={styles.checkboxRow}>
          <TouchableOpacity
            style={[styles.checkbox, rulesAccepted && styles.checkboxActive]}
            onPress={() => setRulesAccepted(!rulesAccepted)}
          >
            {rulesAccepted && <Ionicons name="checkmark" size={18} color="#fff" />}
          </TouchableOpacity>
          <Text style={styles.checkboxText}>
            Я ознакомлен и согласен с правилами проживания
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.checkInButton} onPress={handleCheckIn}>
        <Text style={styles.checkInButtonText}>Получить электронный ключ</Text>
      </TouchableOpacity>

      <View style={styles.instructionsSection}>
        <Text style={styles.sectionTitle}>Инструкция по заселению</Text>
        <Text style={styles.instructionText}>
          1. После регистрации вы получите QR-код на email{'\n'}
          2. Покажите QR-код на турникете при входе{'\n'}
          3. Направляйтесь к номеру 201 на втором этаже{'\n'}
          4. Приложите телефон с QR-кодом к замку номера
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  bookingInfo: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    color: '#666',
    fontSize: 16,
  },
  infoValue: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  documentSection: {
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
  },
  photoButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007AFF',
  },
  rulesSection: {
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 8,
  },
  rules: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  ruleText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: '#007AFF',
  },
  checkboxText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  checkInButton: {
    backgroundColor: '#007AFF',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  instructionsSection: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    marginBottom: 32,
  },
  instructionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});