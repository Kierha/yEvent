import React from "react";
import { Marker } from "react-native-maps";

/**
 * Affiche un marqueur représentant la position de l'utilisateur sur une carte.
 * @param {Object} location - Coordonnées de l'utilisateur (latitude et longitude).
 * @param {number} location.latitude - Latitude de la position de l'utilisateur.
 * @param {number} location.longitude - Longitude de la position de l'utilisateur.
 * @returns {JSX.Element} - Composant UserMarker.
 */
const UserMarker = ({ location }) => {
  return (
    <Marker
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}
      title="Your Location"
      pinColor="blue"
    />
  );
};

export default UserMarker;
