import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * Composant NearbyEventCard.
 * - Compact avec titre et prix directement sur l'image.
 * - Permet la navigation vers les détails de l'événement.
 */
const NearbyEventCard = ({ event, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}>
      <Image source={{ uri: event.image }} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.price}>${event.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    marginBottom: 10,
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    aspectRatio: 3 / 2,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
  },
  title: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  price: {
    color: '#4CAF50',
    fontSize: 12,
  },
});

export default NearbyEventCard;
