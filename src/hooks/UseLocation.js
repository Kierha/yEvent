import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

/**
 * Hook personnalisé pour gérer la géolocalisation de l'utilisateur.
 * - Demande les permissions nécessaires.
 * - Retourne les coordonnées GPS et les erreurs éventuelles.
 */
export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        // Demande l'autorisation de géolocalisation
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission refusée. Impossible de récupérer la localisation.');
          return;
        }

        // Récupère la position actuelle de l'utilisateur
        const userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation.coords);
      } catch (error) {
        setErrorMsg('Erreur lors de la récupération de la localisation.');
        console.error(error);
      }
    };

    requestLocationPermission();
  }, []);

  return { location, errorMsg };
};