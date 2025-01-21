import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import styles from '../styles/';

/**
 * Écran TicketsQRCodeScreen.
 * - Affiche les détails de la réservation et le QR code.
 */
const TicketsQRCodeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { reservation } = route.params;

  useEffect(() => {
    if (!reservation) {
      Alert.alert('Erreur', 'Aucune réservation trouvée.');
      navigation.goBack();
    } else {
      console.log('Reservation:', reservation);
    }
  }, [reservation, navigation]);

  if (!reservation) {
    return null;
  }

  const eventDate = reservation.events.start_date
    ? new Date(reservation.events.start_date)
    : null;

  // URL de la page web avec l'ID de la réservation en paramètre
  const qrCodeUrl = `https://kierha.github.io/tickets_details/index.html?id=${reservation.id}`;

  return (
    <View style={styles.container}>
      {/* En-tête */}
      <Text style={styles.header}>Your E-Ticket</Text>

      {/* QR Code */}
      <View style={styles.qrContainer}>
        <QRCode
          value={qrCodeUrl}
          size={200}
          backgroundColor="#FFFFFF"
          color="#000000"
        />
      </View>

      {/* Carte d'informations */}
      <View style={styles.ticketCard}>
        <Text style={styles.eventTitle}>{reservation.event_title}</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Date</Text>
            <Text style={styles.infoValue}>
              {eventDate
                ? eventDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
                : 'N/A'}
            </Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Time</Text>
            <Text style={styles.infoValue}>
              {eventDate
                ? eventDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
                : 'N/A'}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Location</Text>
            <Text style={styles.infoValue}>{reservation.events.location}</Text>
          </View>
        </View>
      </View>

      {/* Bouton Retour */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Tickets</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TicketsQRCodeScreen;