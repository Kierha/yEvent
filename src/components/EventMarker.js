import React from "react";
import { Marker } from "react-native-maps";

const EventMarker = ({ event, onSelect }) => {
  return (
    <Marker
      coordinate={{
        latitude: event.latitude,
        longitude: event.longitude,
      }}
      onPress={onSelect} // Appelle la fonction pour afficher les détails
    />
  );
};

export default EventMarker;
