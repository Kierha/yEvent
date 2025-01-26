import React, { useEffect, useState } from "react";
import { Text, View, Alert, ActivityIndicator } from "react-native";
import MapView from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { useLocation } from "../hooks/UseLocation";
import { useEvents } from "../hooks/UseEvents";
import EventMarker from "../components/EventMarker";
import UserMarker from "../components/UserMarker";
import EventDetailsPopup from "../components/EventDetailsPopupMap";
import styles from "../styles/MapEventScreenStyle"; // Import des styles

/**
 * Écran de carte des événements.
 * - Affiche la carte avec la position actuelle de l'utilisateur.
 * - Affiche les marqueurs des événements à proximité.
 * - Permet de visualiser les détails d'un événement sélectionné.
 * @returns {JSX.Element} - Composant MapEventScreen.
 */
const MapEventScreen = () => {
  const navigation = useNavigation();
  const { location, errorMsg, isLocationEnabled } = useLocation();
  const {
    trendingEvents,
    upcomingEvents,
    nearbyEvents,
    loading: eventsLoading,
  } = useEvents(location);
  const events = [...trendingEvents, ...upcomingEvents, ...nearbyEvents];
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  /**
   * Vérifie l'état des services de localisation et met à jour l'état de chargement.
   */
  useEffect(() => {
    if (!isLocationEnabled || errorMsg) {
      Alert.alert(
        "Location Services Disabled",
        "Please enable location services and grant permissions to use the map.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Home"),
          },
        ]
      );
    } else if (location) {
      setLoading(false);
    }
  }, [isLocationEnabled, errorMsg, location, navigation]);

  if (loading || eventsLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Fetching location...</Text>
      </View>
    );
  }

  if (!location || !isLocationEnabled || errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Please enable location services and grant permissions to use the map.
        </Text>
      </View>
    );
  }

  /**
   * Filtre les événements pour n'afficher qu'un seul marqueur par emplacement unique.
   */
  const uniqueEvents = [];
  const seenLocations = new Set();

  events.forEach((event) => {
    const locationKey = `${event.latitude}-${event.longitude}`;
    if (!seenLocations.has(locationKey)) {
      seenLocations.add(locationKey);
      uniqueEvents.push(event);
    }
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Marqueur pour la position actuelle de l'utilisateur */}
        <UserMarker location={location} />

        {/* Marqueurs pour les événements */}
        {uniqueEvents.map((event) => (
          <EventMarker
            key={event.id}
            event={event}
            onSelect={() => setSelectedEvent(event)}
          />
        ))}
      </MapView>

      {/* Fenêtre des détails de l'événement */}
      {selectedEvent && (
        <EventDetailsPopup
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onViewDetails={() => {
            setSelectedEvent(null);
            navigation.navigate("EventDetails", { event: selectedEvent });
          }}
        />
      )}
    </View>
  );
};

export default MapEventScreen;
