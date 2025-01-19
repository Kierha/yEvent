import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const events = [
  {
    id: '1',
    title: 'Jisoo Blackpink Live Concert',
    price: '$450',
    date: '14 February 2021',
    location: 'Kyoto, Japan',
    image: 'https://example.com/event1.jpg',
  },
  {
    id: '2',
    title: 'Ultra Miami 2021',
    price: '$120',
    date: '24 March 2021',
    location: 'Miami, USA',
    image: 'https://example.com/event2.jpg',
  },
];

const App = () => {
  const renderEvent = ({ item }) => (
    <TouchableOpacity style={styles.eventCard}>
      <Image source={{ uri: item.image }} style={styles.eventImage} />
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventPrice}>{item.price}</Text>
        <Text style={styles.eventDate}>{item.date}</Text>
        <Text style={styles.eventLocation}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore Events</Text>
      <FlatList
        data={events}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginVertical: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  eventCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 150,
  },
  eventInfo: {
    padding: 12,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  eventPrice: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    color: '#B0B0B0',
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 14,
    color: '#B0B0B0',
  },
});

export default App;
