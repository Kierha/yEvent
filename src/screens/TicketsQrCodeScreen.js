import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";
import styles from "../styles/TicketsQrCodeScreenStyle";

/**
 * Écran TicketsQRCodeScreen.
 * - Affiche les détails de la réservation et le QR code.
 */
const TicketsQRCodeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { reservation } = route.params;

  useEffect(() => {
    if (!reservation) {
      Alert.alert("Erreur", "Aucune réservation trouvée.");
      navigation.goBack();
    }
  }, [reservation, navigation]);

  if (!reservation || !reservation.events) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Aucune réservation trouvée.</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Main", { screen: "Tickets" })}
        >
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const eventDate = reservation.events.start_date
    ? new Date(reservation.events.start_date)
    : null;

  return (
    <View style={styles.container}>
      {/* Affichage de l'UUID tronqué */}
      <Text style={styles.header}>
        Order ID: {reservation.id.substring(0, 8)}
      </Text>

      {/* Carte globale de ticket */}
      <View style={styles.ticketCard}>
        {/* QR Code */}
        {reservation.id ? (
          <QRCode
            value={reservation.id.toString()}
            size={200} // QR code plus grand
            backgroundColor="#FFFFFF"
            style={styles.qrImage} // Centré
          />
        ) : (
          <Text style={styles.errorText}>QR Code non disponible</Text>
        )}

        {/* Trait de séparation */}
        <View style={styles.divider} />

        {/* Contenu du ticket */}
        <Text style={styles.eventTitle}>{reservation.event_title}</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Date</Text>
            <Text style={styles.infoValue}>
              {eventDate
                ? eventDate.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                : "N/A"}
            </Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Time</Text>
            <Text style={styles.infoValue}>
              {eventDate
                ? eventDate.toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "N/A"}
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

      {/* Bouton Retour collé en bas */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Main", { screen: "Tickets" })}
      >
        <Text style={styles.backButtonText}>Back to Tickets</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TicketsQRCodeScreen;
