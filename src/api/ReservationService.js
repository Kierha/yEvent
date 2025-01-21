import { supabase } from './Supabase';

/**
 * Crée une nouvelle réservation.
 */
export const createReservation = async (userId, eventId, eventTitle, ticketsCount) => {
  try {
    // Insertion de la réservation dans la table "reservations" pour obtenir l'ID
    const { data, error } = await supabase
      .from('reservations')
      .insert({
        user_id: userId,
        event_id: eventId,
        event_title: eventTitle,
        tickets_count: ticketsCount,
      }, { returning: 'representation' });

    if (error) throw new Error(error.message);

    return data[0]; // Retourne l'objet de réservation insérée
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Met à jour le nombre de places vendues pour un événement.
 */
export const updateEventFromReservation = async (eventId, ticketsCount) => {
  try {
    const { data: eventData, error: readError } = await supabase
      .from('events')
      .select('tickets_sold')
      .eq('id', eventId)
      .single();
    if (readError) throw new Error(readError.message);

    const currentSold = eventData?.tickets_sold || 0;
    const newSold = currentSold + ticketsCount;

    const { data: updatedData, error: updateError } = await supabase
      .from('events')
      .update({ tickets_sold: newSold })
      .eq('id', eventId)
      .single();
    if (updateError) throw new Error(updateError.message);

    return updatedData;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Récupère toutes les réservations d'un utilisateur.
 */
export const getUserReservations = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .select(`
        *,
        events!inner (
          image,
          start_date,
          location
        )
      `)
      .eq('user_id', userId);
    if (error) throw new Error(error.message);
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Supprime une réservation par ID.
 */
export const deleteReservation = async (reservationId) => {
  try {
    const { error } = await supabase
      .from('reservations')
      .delete()
      .eq('id', reservationId);
    if (error) throw new Error(error.message);
  } catch (err) {
    throw new Error(err.message);
  }
};