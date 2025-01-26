import React from "react";
import { Marker } from "react-native-maps";

/**
 * Affiche un marqueur d'événement sur une carte.
 * Permet à l'utilisateur de sélectionner un événement pour afficher ses détails.
 * @param {Object} event - Détails de l'événement, incluant latitude et longitude.
 * @param {Function} onSelect - Fonction appelée lors de la sélection du marqueur.
 * @returns {JSX.Element} - Composant EventMarker.
 */
const EventMarker = ({ event, onSelect }) => {
  return (
    <Marker
      coordinate={{
        latitude: event.latitude,
        longitude: event.longitude,
      }}
      onPress={onSelect}
    />
  );
};

export default EventMarker;
