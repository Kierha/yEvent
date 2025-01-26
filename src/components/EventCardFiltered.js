import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

/**
 * Représente une carte d'événement.
 * Affiche les informations essentielles d'un événement : titre, genre et prix.
 * @param {Object} event - Données de l'événement à afficher.
 * @param {Function} onPress - Fonction appelée lors de la sélection de la carte.
 * @returns {JSX.Element} - Composant EventCardFiltered.
 */
const EventCardFiltered = ({ event, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: event.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.genre}>{event.genre}</Text>
        <Text style={styles.price}>${event.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 200,
    flexDirection: "row",
    backgroundColor: "#222",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
  },
  image: {
    width: "40%",
    height: "100%",
  },
  details: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  genre: {
    fontSize: 14,
    color: "#AAA",
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    color: "#4CAF50",
  },
});

export default EventCardFiltered;
