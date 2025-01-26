import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { getUserDetails } from "../api/AuthService";
import { useReservations } from "../hooks/UseReservations";
import TicketCard from "../components/TicketCard";
import styles from "../styles/UserTicketsScreenStyle";

/**
 * Écran MyTicketsScreen.
 * - Affiche la liste des billets réservés avec leur QR code.
 * - Montre les infos de l'événement, la date d'achat, etc.
 */
const MyTicketsScreen = () => {
  const [userId, setUserId] = useState(null);
  const { reservations, loading, error, fetchReservations } =
    useReservations(userId);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const user = await getUserDetails();
        setUserId(user.id);
      } catch (err) {
        Alert.alert("Error", "Unable to retrieve user info.");
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchReservations();
    }
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.infoText}>Loading tickets...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Tickets</Text>
      {reservations.map((reservation) => (
        <TicketCard key={reservation.id} reservation={reservation} />
      ))}
    </ScrollView>
  );
};

export default MyTicketsScreen;
