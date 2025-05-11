import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DASHBOARD_DATA = {
  occupancy: 75,
  todayRevenue: 45000,
  rating: 4.5,
  activeRequests: 3,
};

const TODAY_ARRIVALS = [
  { id: 1, name: 'Иван Петров', room: '201', time: '14:00' },
  { id: 2, name: 'Анна Смирнова', room: '305', time: '16:00' },
  { id: 3, name: 'John Smith', room: '102', time: '18:00' },
];

const TODAY_DEPARTURES = [
  { id: 1, name: 'Петр Иванов', room: '404', time: '10:00' },
  { id: 2, name: 'Maria Garcia', room: '201', time: '12:00' },
];

const ACTIVE_REQUESTS = [
  { id: 1, type: 'Уборка', room: '302', priority: 'Высокий' },
  { id: 2, type: 'Техническая', room: '105', priority: 'Средний' },
  { id: 3, type: 'Жалоба', room: '401', priority: 'Низкий' },
];

export default function AdminScreen() {
  const StatCard = ({ icon, title, value, color }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <Ionicons name={icon} size={30} color={color} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  const renderArrival = ({ item }) => (
    <View style={styles.listItem}>
      <View>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDetail}>Номер {item.room}</Text>
      </View>
      <Text style={styles.itemTime}>{item.time}</Text>
    </View>
  );

  const renderRequest = ({ item }) => (
    <View style={styles.requestItem}>
      <View style={styles.requestInfo}>
        <Text style={styles.requestType}>{item.type}</Text>
        <Text style={styles.requestRoom}>Номер {item.room}</Text>
      </View>
      <View style={[
        styles.priorityBadge,
        { backgroundColor: getPriorityColor(item.priority) }
      ]}>
        <Text style={styles.priorityText}>{item.priority}</Text>
      </View>
    </View>
  );

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Высокий':
        return '#F44336';
      case 'Средний':
        return '#FFA500';
      case 'Низкий':
        return '#4CAF50';
      default:
        return '#666';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Панель управления</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationCount}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statsRow}>
          <StatCard
            icon="bed-outline"
            title="Заполняемость"
            value={`${DASHBOARD_DATA.occupancy}%`}
            color="#4CAF50"
          />
          <StatCard
            icon="cash-outline"
            title="Доход за день"
            value={`${DASHBOARD_DATA.todayRevenue}₽`}
            color="#2196F3"
          />
        </View>
        <View style={styles.statsRow}>
          <StatCard
            icon="star-outline"
            title="Рейтинг"
            value={DASHBOARD_DATA.rating}
            color="#FFA500"
          />
          <StatCard
            icon="alert-circle-outline"
            title="Активные запросы"
            value={DASHBOARD_DATA.activeRequests}
            color="#F44336"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Заезды сегодня</Text>
        <FlatList
          data={TODAY_ARRIVALS}
          renderItem={renderArrival}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Выезды сегодня</Text>
        <FlatList
          data={TODAY_DEPARTURES}
          renderItem={renderArrival}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Активные запросы</Text>
        <FlatList
          data={ACTIVE_REQUESTS}
          renderItem={renderRequest}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="people-outline" size={24} color="#007AFF" />
          <Text style={styles.actionButtonText}>Гости</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="calendar-outline" size={24} color="#007AFF" />
          <Text style={styles.actionButtonText}>Бронирования</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="stats-chart-outline" size={24} color="#007AFF" />
          <Text style={styles.actionButtonText}>Отчеты</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#F44336',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsContainer: {
    padding: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  itemDetail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  itemTime: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  requestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  requestInfo: {
    flex: 1,
  },
  requestType: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  requestRoom: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 16,
    marginBottom: 32,
  },
  actionButton: {
    alignItems: 'center',
    padding: 12,
  },
  actionButtonText: {
    color: '#007AFF',
    fontSize: 14,
    marginTop: 4,
  },
});