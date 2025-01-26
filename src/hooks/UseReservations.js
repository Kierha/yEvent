import { useState, useEffect } from "react";
import { supabase } from "../api/Supabase";
import {
  getUserReservations,
  createReservation,
} from "../api/ReservationService";

/**
 * Hook personnalisé pour gérer les réservations.
 * - Permet de créer une réservation.
 * - Permet de récupérer les réservations d'un utilisateur.
 */
export const useReservations = (userId) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchReservations();
    }
  }, [userId]);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const data = await getUserReservations(userId);
      // Trier les réservations par date de réservation dans l'ordre décroissant
      const sortedData = data.sort(
        (a, b) => new Date(b.reservation_date) - new Date(a.reservation_date)
      );
      setReservations(sortedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addReservation = async (eventId, eventTitle, ticketsCount) => {
    setLoading(true);
    setError(null);

    try {
      const newReservation = await createReservation(
        userId,
        eventId,
        eventTitle,
        ticketsCount
      );

      if (!newReservation) {
        throw new Error("Aucune réservation trouvée");
      }

      setReservations((prevReservations) => [
        newReservation,
        ...prevReservations,
      ]);

      return newReservation;
    } catch (err) {
      setError(err.message);
      console.error("Error adding reservation:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    reservations,
    addReservation,
    fetchReservations,
    loading,
    error,
  };
};
