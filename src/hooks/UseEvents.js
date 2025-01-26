import { useState, useEffect } from "react";
import { supabase } from "../api/Supabase";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

/**
 * Hook personnalisé pour récupérer les événements.
 * - Récupère les événements "Trending", "Upcoming", "Nearby", et "All".
 * - Gère les états de chargement et les erreurs.
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

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      // All Events
      const { data: all, error: allError } = await supabase
        .from("events")
        .select("*");

      // Trending Events
      const { data: trending, error: trendingError } = await supabase
        .from("events")
        .select("*")
        .order("tickets_sold", { ascending: false })
        .limit(5);

      // Upcoming Events
      const now = new Date();
      const threeMonthsLater = new Date();
      threeMonthsLater.setMonth(now.getMonth() + 3);

      const { data: upcoming, error: upcomingError } = await supabase
        .from("events")
        .select("*")
        .gte("start_date", now.toISOString())
        .lte("start_date", threeMonthsLater.toISOString())
        .order("start_date", { ascending: true });

      // Nearby Events
      let nearby = [];
      if (userLocation) {
        const { data: nearbyData, error: nearbyError } = await supabase
          .from("events")
          .select("*")
          .not("latitude", "is", null)
          .not("longitude", "is", null);

        if (nearbyError) throw nearbyError;

        // Filtrer les événements à proximité (par exemple, dans un rayon de 50 km)
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

      // Function to capitalize the first letter
      const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };

      // Format the dates
      const formattedAll = all.map((event) => ({
        ...event,
        start_date: capitalizeFirstLetter(
          format(new Date(event.start_date), "EEEE dd MMMM yyyy - HH:mm", {
            locale: enUS,
          })
        ),
      }));

      const formattedTrending = trending.map((event) => ({
        ...event,
        start_date: capitalizeFirstLetter(
          format(new Date(event.start_date), "EEEE dd MMMM yyyy - HH:mm", {
            locale: enUS,
          })
        ),
      }));

      const formattedUpcoming = upcoming.map((event) => ({
        ...event,
        start_date: capitalizeFirstLetter(
          format(new Date(event.start_date), "EEEE dd MMMM yyyy - HH:mm", {
            locale: enUS,
          })
        ),
      }));

      const formattedNearby = nearby.map((event) => ({
        ...event,
        start_date: capitalizeFirstLetter(
          format(new Date(event.start_date), "EEEE dd MMMM yyyy - HH:mm", {
            locale: enUS,
          })
        ),
      }));

      setAllEvents(formattedAll);
      setTrendingEvents(formattedTrending);
      setUpcomingEvents(formattedUpcoming);
      setNearbyEvents(formattedNearby);
    } catch (err) {
      console.error("Erreur lors de la récupération des événements :", err);
      setError("Impossible de récupérer les événements.");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour calculer la distance entre deux points géographiques
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
    const distance = R * c; // Distance en kilomètres
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  // Fonction pour vérifier la disponibilité des places pour un événement spécifique
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
