import React from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";

/**
 * Affiche une carte d'événement tendance.
 * Inclut l'image de l'événement, le titre et le prix.
 * @param {Object} event - Détails de l'événement à afficher.
 * @param {Function} onPress - Fonction appelée lors de la sélection de la carte.
 * @returns {JSX.Element} - Composant TrendingEventCard.
 */
const TrendingEventCard = ({ event, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
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
    width: 100,
    marginRight: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 250,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    color: "#fff",
    fontSize: 14,
  },
});

export default TrendingEventCard;
