import { useState, useEffect } from "react";
import { supabase } from "../api/Supabase";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

/**
 * Hook personnalisé pour récupérer et gérer les événements.
 * - Récupère les événements classés par catégories : "Trending", "Upcoming", "Nearby", et "All".
 * - Gère les états de chargement et d'erreur.
 * @param {Object} userLocation - Coordonnées de l'utilisateur (latitude et longitude).
 * @returns {Object} - Contient les listes d'événements, les états de chargement/erreur, et des fonctions utilitaires.
 */
export const useEvents = (userLocation) => {
  const [trendingEvents, setTrendingEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [nearbyEvents, setNearbyEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, [userLocation]);

  /**
   * Récupère les événements depuis Supabase et les classe par catégories.
   */
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      // Récupérer tous les événements
      const { data: all, error: allError } = await supabase
        .from("events")
        .select("*");

      // Récupérer les événements "Trending"
      const { data: trending, error: trendingError } = await supabase
        .from("events")
        .select("*")
        .order("tickets_sold", { ascending: false })
        .limit(5);

      // Récupérer les événements "Upcoming"
      const now = new Date();
      const threeMonthsLater = new Date();
      threeMonthsLater.setMonth(now.getMonth() + 3);
      const { data: upcoming, error: upcomingError } = await supabase
        .from("events")
        .select("*")
        .gte("start_date", now.toISOString())
        .lte("start_date", threeMonthsLater.toISOString())
        .order("start_date", { ascending: true });

      // Récupérer les événements "Nearby"
      let nearby = [];
      if (userLocation) {
        const { data: nearbyData, error: nearbyError } = await supabase
          .from("events")
          .select("*")
          .not("latitude", "is", null)
          .not("longitude", "is", null);

        if (nearbyError) throw nearbyError;

        const RADIUS = 50; // Rayon en kilomètres
        nearby = nearbyData.filter((event) => {
          const distance = getDistanceFromLatLonInKm(
            userLocation.latitude,
            userLocation.longitude,
            event.latitude,
            event.longitude
          );
          return distance <= RADIUS;
        });
      }

      if (allError || trendingError || upcomingError) {
        throw allError || trendingError || upcomingError;
      }

      // Formatage des dates pour chaque catégorie
      const formatDates = (events) =>
        events.map((event) => ({
          ...event,
          start_date: format(
            new Date(event.start_date),
            "EEEE dd MMMM yyyy - HH:mm",
            { locale: enUS }
          ),
        }));

      setAllEvents(formatDates(all));
      setTrendingEvents(formatDates(trending));
      setUpcomingEvents(formatDates(upcoming));
      setNearbyEvents(formatDates(nearby));
    } catch (err) {
      console.error("Erreur lors de la récupération des événements :", err);
      setError("Impossible de récupérer les événements.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Calcule la distance entre deux coordonnées géographiques.
   * @param {number} lat1 - Latitude du premier point.
   * @param {number} lon1 - Longitude du premier point.
   * @param {number} lat2 - Latitude du second point.
   * @param {number} lon2 - Longitude du second point.
   * @returns {number} - Distance en kilomètres.
   */
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Rayon de la Terre en kilomètres
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  /**
   * Convertit les degrés en radians.
   * @param {number} deg - Valeur en degrés.
   * @returns {number} - Valeur en radians.
   */
  const deg2rad = (deg) => deg * (Math.PI / 180);

  /**
   * Vérifie la disponibilité des places pour un événement donné.
   * @param {number} eventId - ID de l'événement.
   * @returns {boolean} - `true` si des places sont disponibles, sinon `false`.
   */
  const checkAvailability = async (eventId) => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("tickets_sold, capacity")
        .eq("id", eventId)
        .single();

      if (error) {
        throw error;
      }

      return data.tickets_sold < data.capacity;
    } catch (err) {
      console.error(
        "Erreur lors de la vérification de la disponibilité :",
        err
      );
      return false;
    }
  };

  return {
    allEvents,
    trendingEvents,
    upcomingEvents,
    nearbyEvents,
    loading,
    error,
    checkAvailability,
  };
};
