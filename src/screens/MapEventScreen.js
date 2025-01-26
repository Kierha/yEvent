import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEvents } from "../hooks/UseEvents";

/**
 * Écran MapEventScreen.
 * - Affiche une carte avec les événements.
 */
const MapEventScreen = () => {
  const { trendingEvents, upcomingEvents } = useEvents();
  const events = [...trendingEvents, ...upcomingEvents];

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {events.map((event) => (
          <Marker
            key={event.id}
            coordinate={{
              latitude: event.location.latitude,
              longitude: event.location.longitude,
            }}
            title={event.title}
            description={event.description}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapEventScreen;
