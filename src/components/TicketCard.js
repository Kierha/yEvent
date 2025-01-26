import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

/**
 * Affiche une carte avec les détails d'une réservation.
 * Inclut l'image de l'événement, le titre, le nombre de billets et la date.
 * Permet la navigation vers la page de QR code pour la réservation.
 * @param {Object} reservation - Détails de la réservation à afficher.
 * @returns {JSX.Element} - Composant TicketCard.
 */
const TicketCard = ({ reservation }) => {
  const navigation = useNavigation();

  /**
   * Gère la navigation vers la page des détails de la réservation et QR code.
   */
  const handlePress = () => {
    navigation.navigate("TicketsQRCode", { reservation });
  };

  return (
    <TouchableOpacity style={styles.ticketCard} onPress={handlePress}>
      {/* Image de l'événement à gauche */}
      <Image
        source={{ uri: reservation.events.image }}
        style={styles.eventImage}
      />

      {/* Informations à droite */}
      <View style={styles.ticketInfo}>
        <Text style={styles.eventTitle} numberOfLines={1}>
          {reservation.event_title}
        </Text>
        <Text style={styles.text}>Tickets: {reservation.tickets_count}</Text>
        <Text style={styles.dateText}>
          {new Date(reservation.events.start_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}{" "}
          -{" "}
          {new Date(reservation.events.start_date).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ticketCard: {
    flexDirection: "row",
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    marginVertical: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  eventImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  ticketInfo: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  eventTitle: {
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    color: "#E0E0E0",
    fontSize: 14,
    marginBottom: 5,
  },
  dateText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
  },
});

export default TicketCard;
