import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useEvents } from "../hooks/UseEvents";
import styles from "../styles/EventDetailsStyle";

/**
 * Écran des détails d'un événement.
 * - Affiche les informations détaillées sur un événement sélectionné.
 * - Permet d'acheter des billets si l'événement n'est pas complet.
 * @param {Object} route - Contient les paramètres passés à l'écran.
 * @param {Object} navigation - Objet de navigation pour gérer les transitions entre écrans.
 * @returns {JSX.Element} - Composant EventDetailsScreen.
 */
const EventDetailsScreen = ({ route, navigation }) => {
  const { event } = route.params; // Données de l'événement passées en paramètres
  const { checkAvailability } = useEvents();
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [loading, setLoading] = useState(true);

  /**
   * Vérifie la disponibilité des billets pour l'événement.
   */
  useEffect(() => {
    const fetchAvailability = async () => {
      const available = await checkAvailability(event.id);
      setIsSoldOut(!available);
      setLoading(false);
    };

    fetchAvailability();
  }, [event.id, checkAvailability]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Image principale */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: event.image }} style={styles.image} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Informations principales */}
      <View style={styles.detailsContainer}>
        <Text style={styles.genre}>{event.genre}</Text>
        <Text style={styles.title}>{event.title}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>
            {event.price === 0 ? "Free" : `$${event.price} / person`}
          </Text>
          <Text style={styles.billsIncluded}>Bills included</Text>
        </View>

        <Text style={styles.eventName}>{event.eventName}</Text>

        {/* Date et localisation */}
        <View style={styles.infoRow}>
          <Icon
            name="calendar-outline"
            size={18}
            color="#FFF"
            style={styles.icon}
          />
          <Text style={styles.infoText}>{event.start_date}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon
            name="location-outline"
            size={18}
            color="#FFF"
            style={styles.icon}
          />
          <Text style={styles.infoText}>{event.location}</Text>
        </View>

        {/* Détails */}
        <Text style={styles.sectionTitle}>Event Details</Text>
        <Text style={styles.description}>{event.description}</Text>

        {/* Bouton d'achat */}
        <TouchableOpacity
          style={[styles.buyButton, isSoldOut && styles.soldOutButton]}
          onPress={() =>
            !isSoldOut && navigation.navigate("Reservation", { event })
          }
          disabled={isSoldOut}
        >
          <Text style={styles.buyButtonText}>
            {isSoldOut ? "Full" : "Buy Tickets"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EventDetailsScreen;
