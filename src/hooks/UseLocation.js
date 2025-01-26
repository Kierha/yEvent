import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Alert, Linking, Platform } from "react-native";

/**
 * Hook personnalisé pour gérer la géolocalisation de l'utilisateur.
 * - Surveille les services de localisation.
 * - Gère les erreurs de manière appropriée.
 */
export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLocationEnabled, setIsLocationEnabled] = useState(true);

  useEffect(() => {
    const checkLocationServices = async () => {
      try {
        // Vérifie si les services de localisation sont activés
        const isServiceEnabled = await Location.hasServicesEnabledAsync();
        setIsLocationEnabled(isServiceEnabled);

        if (!isServiceEnabled) {
          setErrorMsg(
            "Location services are disabled. Enable them to use Nearby Events."
          );
          return;
        } else {
          setErrorMsg(null); // Réinitialise les erreurs si tout est correct
        }

        // Demande les permissions si les services sont activés
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg(
            "Location permission denied. Nearby Events are unavailable."
          );
          return;
        }

        // Récupère la position actuelle
        const userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation.coords);
        setErrorMsg(null); // Réinitialise les erreurs si tout est correct
      } catch (error) {
        console.error(error); // Garde l'erreur dans la console pour debug
        if (error.message.includes("Current location is unavailable")) {
          setErrorMsg(
            "Unable to fetch location. Make sure location services are enabled."
          );
        } else {
          setErrorMsg("An error occurred while fetching location.");
        }
      }
    };

    // Vérifie l'état de la localisation toutes les 5 secondes
    const interval = setInterval(() => {
      checkLocationServices();
    }, 5000);

    // Nettoie l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
  }, []);

  return { location, errorMsg, isLocationEnabled };
};
