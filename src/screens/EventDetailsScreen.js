import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/EventDetailsStyle';

/**
 * Page des détails d'un événement.
 * - Affiche les informations détaillées d'un événement.
 * - Inclut le bouton d'achat et les informations liées à la localisation.
 */
const EventDetailsScreen = ({ route, navigation }) => {
  const { event } = route.params; // Données de l'événement passées en paramètres

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
          <TouchableOpacity>
            <Text style={styles.directionLink}>Direction</Text>
          </TouchableOpacity>
        </View>

        {/* Détails */}
        <Text style={styles.sectionTitle}>Event Details</Text>
        <Text style={styles.description}>{event.description}</Text>

        {/* Bouton d'achat */}
        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => navigation.navigate("Reservation", { event })} // Passez les détails de l'événement
        >
          <Text style={styles.buyButtonText}>Buy Tickets</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EventDetailsScreen;