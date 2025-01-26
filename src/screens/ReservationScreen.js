import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useReservations } from "../hooks/UseReservations"; // Import du hook personnalisé
import { getUserDetails } from "../api/AuthService"; // Import de la fonction pour récupérer les détails de l'utilisateur
import styles from "../styles/ReservationScreenStyle"; // Fichier de styles

/**
 * Écran de réservation d'événement.
 * - Permet à l'utilisateur de réserver un événement en choisissant le nombre de tickets.
 * - Affiche les détails de l'événement et les tickets restants.
 * @param {Object} route - Contient les paramètres passés à l'écran, incluant l'événement.
 * @param {Object} navigation - Objet de navigation pour gérer les transitions entre écrans.
 * @returns {JSX.Element} - Composant ReservationScreen.
 */
const ReservationScreen = ({ route, navigation }) => {
  const { event } = route.params; // Données de l'événement passées en paramètres
  const [userId, setUserId] = useState(null); // État pour l'ID de l'utilisateur
  const { addReservation } = useReservations(userId); // Hook personnalisé pour gérer les réservations
  const [ticketsCount, setTicketsCount] = useState(1); // Nombre de tickets sélectionnés
  const [remainingTickets, setRemainingTickets] = useState(
    event.capacity - event.tickets_sold
  ); // Tickets restants pour l'événement

  /**
   * Récupère l'ID de l'utilisateur connecté.
   */
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const user = await getUserDetails();
        setUserId(user.id);
      } catch (error) {
        console.error("Error fetching user details:", error);
        Alert.alert(
          "Erreur",
          "Impossible de récupérer les informations utilisateur."
        );
      }
    };

    fetchUserId();
  }, []);

  /**
   * Gère la réservation d'un événement.
   * - Appelle la fonction `addReservation` pour ajouter une réservation.
   * - Redirige vers l'écran du QR code en cas de succès.
   */
  const handleReservation = async () => {
    try {
      const reservation = await addReservation(
        event.id,
        event.title,
        ticketsCount
      );
      if (reservation) {
        Alert.alert("Succès", "Votre réservation a été confirmée !");
        navigation.navigate("TicketsQRCode", { reservation }); // Redirection vers l'écran QR code
      } else {
        throw new Error("Aucune réservation trouvée");
      }
    } catch (error) {
      console.error("Error during reservation:", error);
      Alert.alert("Erreur", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Informations de l'événement */}
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.price}>
        {event.price === 0 ? "Gratuit" : `$${event.price} par ticket`}
      </Text>

      {/* Sélecteur de tickets */}
      <View style={styles.ticketSelector}>
        <TouchableOpacity
          style={styles.ticketButton}
          onPress={() => setTicketsCount((prev) => Math.max(1, prev - 1))}
        >
          <Text style={styles.ticketButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.ticketCount}>{ticketsCount}</Text>
        <TouchableOpacity
          style={[
            styles.ticketButton,
            ticketsCount >= remainingTickets && styles.disabledButton,
          ]}
          onPress={() =>
            setTicketsCount((prev) => Math.min(prev + 1, remainingTickets))
          }
          disabled={ticketsCount >= remainingTickets}
        >
          <Text style={styles.ticketButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Message indiquant le nombre de tickets restants */}
      {ticketsCount >= remainingTickets && (
        <Text style={styles.remainingTicketsText}>
          Il ne reste que {remainingTickets} tickets disponibles.
        </Text>
      )}

      {/* Bouton de réservation */}
      <TouchableOpacity
        style={styles.reserveButton}
        onPress={handleReservation}
      >
        <Text style={styles.reserveButtonText}>Réserver</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReservationScreen;
