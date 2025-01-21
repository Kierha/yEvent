import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useReservations } from '../hooks/UseReservations'; // Import du hook
import { getUserDetails } from '../api/AuthService'; // Import de la fonction getUserDetails
import styles from '../styles/ReservationScreenStyle'; // Fichier de styles

/**
 * Écran de réservation d'événement.
 * - Permet à l'utilisateur de choisir le nombre de tickets et de réserver.
 */
const ReservationScreen = ({ route, navigation }) => {
  const { event } = route.params; // Données de l'événement passées en paramètres
  const [userId, setUserId] = useState(null); // État pour l'ID de l'utilisateur
  const { addReservation } = useReservations(userId); // Passe l'ID de l'utilisateur au hook
  const [ticketsCount, setTicketsCount] = useState(1); // État pour le nombre de tickets

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const user = await getUserDetails();
        setUserId(user.id);
      } catch (error) {
        console.error('Error fetching user details:', error);
        Alert.alert('Erreur', 'Impossible de récupérer les informations utilisateur.');
      }
    };

    fetchUserId();
  }, []);

  // Fonction pour gérer la réservation
  const handleReservation = async () => {
    try {
      console.log('Handling reservation for event:', event);
      await addReservation(event.id, event.title, ticketsCount);
      Alert.alert('Succès', 'Votre réservation a été confirmée !');
      navigation.navigate('Main'); // Retour à l'accueil
    } catch (error) {
      console.error('Error during reservation:', error);
      Alert.alert('Erreur', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Informations de l'événement */}
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.price}>{event.price === 0 ? 'Gratuit' : `$${event.price} par ticket`}</Text>

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
          style={styles.ticketButton}
          onPress={() => setTicketsCount((prev) => prev + 1)}
        >
          <Text style={styles.ticketButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Bouton de réservation */}
      <TouchableOpacity style={styles.reserveButton} onPress={handleReservation}>
        <Text style={styles.reserveButtonText}>Réserver</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReservationScreen;