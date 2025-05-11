import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SERVICES_DATA = [
  {
    id: 1,
    category: 'Питание',
    services: [
      {
        id: 1,
        name: 'Завтрак континентальный',
        description: 'Свежая выпечка, фрукты, кофе/чай',
        price: 450,
        image: 'https://images.unsplash.com/photo-1555817128-342e1c8b3101?w=300',
      },
      {
        id: 2,
        name: 'Обед бизнес-ланч',
        description: 'Суп, основное блюдо, салат, напиток',
        price: 750,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300',
      },
    ],
  },
  {
    id: 2,
    category: 'Прачечная',
    services: [
      {
        id: 3,
        name: 'Стирка белья',
        description: 'До 5 кг, возврат в течение 24 часов',
        price: 500,
        image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=300',
      },
      {
        id: 4,
        name: 'Экспресс-стирка',
        description: 'До 3 кг, возврат в течение 3 часов',
        price: 800,
        image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300',
      },
    ],
  },
  {
    id: 3,
    category: 'Экскурсии',
    services: [
      {
        id: 5,
        name: 'Обзорная экскурсия по городу',
        description: 'Автобусная экскурсия, 3 часа',
        price: 1500,
        image: 'https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?w=300',
      },
      {
        id: 6,
        name: 'Пешеходная экскурсия по центру',
        description: 'Индивидуальный гид, 2 часа',
        price: 1200,
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300',
      },
    ],
  },
];

export default function ServicesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [cart, setCart] = useState([]);

  const categories = ['Все', ...new Set(SERVICES_DATA.map(item => item.category))];

  const filteredServices = selectedCategory === 'Все'
    ? SERVICES_DATA
    : SERVICES_DATA.filter(item => item.category === selectedCategory);

  const addToCart = (service) => {
    setCart([...cart, service]);
    Alert.alert(
      'Успех',
      `${service.name} добавлен в корзину`,
      [{ text: 'OK' }]
    );
  };

  const renderService = ({ item }) => (
    <View style={styles.serviceCard}>
      <Image source={{ uri: item.image }} style={styles.serviceImage} />
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.serviceDescription}>{item.description}</Text>
        <View style={styles.serviceFooter}>
          <Text style={styles.servicePrice}>{item.price} ₽</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addToCart(item)}
          >
            <Ionicons name="add-circle" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.categoryTextActive
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.servicesContainer}>
        {filteredServices.map((category) => (
          <View key={category.id}>
            <Text style={styles.categoryTitle}>{category.category}</Text>
            {category.services.map((service) => renderService({ item: service }))}
          </View>
        ))}
      </ScrollView>

      {cart.length > 0 && (
        <TouchableOpacity style={styles.cartBar}>
          <View style={styles.cartInfo}>
            <Ionicons name="cart" size={24} color="#fff" />
            <Text style={styles.cartText}>
              Корзина ({cart.length}) • {cart.reduce((sum, item) => sum + item.price, 0)} ₽
            </Text>
          </View>
          <Ionicons name="arrow-forward" size={24} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    maxHeight: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginRight: 8,
  },
  categoryButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  categoryText: {
    fontSize: 16,
    color: '#666',
  },
  categoryTextActive: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  servicesContainer: {
    flex: 1,
    padding: 16,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 12,
  },
  serviceCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  serviceImage: {
    width: 120,
    height: 120,
  },
  serviceInfo: {
    flex: 1,
    padding: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  addButton: {
    padding: 4,
  },
  cartBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  },
});