import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator, Alert } from "react-native";
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

  const now = new Date();

  const upcomingReservations = reservations.filter(
    (reservation) => new Date(reservation.events.start_date) >= now
  );

  const pastReservations = reservations.filter(
    (reservation) => new Date(reservation.events.start_date) < now
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading tickets...</Text>
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

      <Text style={styles.sectionTitle}>Upcoming Events</Text>
      {upcomingReservations.length > 0 ? (
        upcomingReservations.map((reservation) => (
          <TicketCard key={reservation.id} reservation={reservation} />
        ))
      ) : (
        <Text style={styles.infoText}>No upcoming events.</Text>
      )}

      <Text style={styles.sectionTitle}>Past Events</Text>
      {pastReservations.length > 0 ? (
        pastReservations.map((reservation) => (
          <TicketCard key={reservation.id} reservation={reservation} />
        ))
      ) : (
        <Text style={styles.infoText}>No past events.</Text>
      )}
    </ScrollView>
  );
};

export default MyTicketsScreen;
