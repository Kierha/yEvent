import { useState, useEffect } from "react";
import {
  createReservation,
  getUserReservations,
  deleteReservation,
  updateEventFromReservation,
} from "../api/ReservationService";

/**
 * Hook personnalisé pour gérer les réservations.
 * @param {string} userId - ID de l'utilisateur.
 */
export const useReservations = (userId) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charge les réservations à l'initialisation
  useEffect(() => {
    if (userId) {
      fetchReservations();
    }
  }, [userId]);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const data = await getUserReservations(userId);
      setReservations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addReservation = async (eventId, eventTitle, ticketsCount) => {
    try {
      // console.log("Adding reservation:", {
      //   userId,
      //   eventId,
      //   eventTitle,
      //   ticketsCount,
      // });
      const newReservation = await createReservation(
        userId,
        eventId,
        eventTitle,
        ticketsCount
      );
      setReservations((prev) => [...prev, newReservation]);

      // Mettre à jour l'événement après avoir ajouté la réservation
      await updateEventFromReservation(eventId, ticketsCount);
      // console.log("Event updated after reservation");
    } catch (err) {
      setError(err.message);
      console.error("Error adding reservation:", err);
    }
  };

  const removeReservation = async (reservationId) => {
    try {
      await deleteReservation(reservationId);
      setReservations((prev) => prev.filter((res) => res.id !== reservationId));
    } catch (err) {
      setError(err.message);
      console.error("Error deleting reservation:", err);
    }
  };

  return {
    reservations,
    loading,
    error,
    fetchReservations,
    addReservation,
    removeReservation,
  };
};
