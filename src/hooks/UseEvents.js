import { useState, useEffect } from "react";
import { supabase } from "../api/Supabase";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

/**
 * Hook personnalisé pour récupérer les événements.
 * - Récupère les événements "Trending", "Upcoming", et "Nearby".
 * - Gère les états de chargement et les erreurs.
 */
export const useEvents = (userLocation) => {
  const [trendingEvents, setTrendingEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [nearbyEvents, setNearbyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, [userLocation]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

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

      if (trendingError || upcomingError) {
        throw trendingError || upcomingError;
      }

      // Function to capitalize the first letter
      const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };

      // Format the dates
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

  return { trendingEvents, upcomingEvents, nearbyEvents, loading, error };
};
