import { useState, useEffect } from "react";
import { supabase } from "../api/Supabase";
import {
  getUserReservations,
  createReservation,
} from "../api/ReservationService";

/**
 * Gère les réservations d'un utilisateur.
 * - Permet de récupérer les réservations existantes.
 * - Permet de créer une nouvelle réservation.
 * @param {string} userId - Identifiant de l'utilisateur.
 * @returns {Object} - Contient les réservations, les fonctions utilitaires, et les états associés.
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

  /**
   * Récupère les réservations de l'utilisateur depuis Supabase.
   * Trie les réservations par date décroissante.
   */
  const fetchReservations = async () => {
    try {
      setLoading(true);
      const data = await getUserReservations(userId);

      // Trier les réservations par date de réservation (ordre décroissant)
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

  /**
   * Ajoute une nouvelle réservation pour l'utilisateur.
   * @param {string} eventId - Identifiant de l'événement.
   * @param {string} eventTitle - Titre de l'événement.
   * @param {number} ticketsCount - Nombre de billets réservés.
   * @returns {Object|null} - La nouvelle réservation ou `null` en cas d'échec.
   */
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
        throw new Error("Aucune réservation trouvée.");
      }

      // Ajouter la nouvelle réservation en tête de la liste
      setReservations((prevReservations) => [
        newReservation,
        ...prevReservations,
      ]);

      return newReservation;
    } catch (err) {
      setError(err.message);
      console.error("Erreur lors de l'ajout de la réservation :", err);
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
