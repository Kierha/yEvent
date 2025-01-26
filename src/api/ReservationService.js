import { supabase } from "./Supabase";
import QRCode from "qrcode-svg";
import { Buffer } from "buffer";

/**
 * Génère un QR code en base64.
 * @param {string} content - Contenu à intégrer dans le QR code.
 * @returns {string} - QR code en base64.
 */
const generateQrCodeBase64 = (content) => {
  const qrCode = new QRCode({
    content: content,
    width: 200,
    height: 200,
    color: "#000000",
    background: "#FFFFFF",
  });
  const svgText = qrCode.svg();
  const base64Data = `data:image/svg+xml;base64,${Buffer.from(svgText).toString(
    "base64"
  )}`;
  return base64Data;
};

/**
 * Crée une nouvelle réservation et génère un QR code associé.
 * @param {string} userId - ID de l'utilisateur.
 * @param {string} eventId - ID de l'événement.
 * @param {string} eventTitle - Titre de l'événement.
 * @param {number} ticketsCount - Nombre de billets.
 * @returns {Promise<Object>} - Données de la réservation insérée.
 */
export const createReservation = async (
  userId,
  eventId,
  eventTitle,
  ticketsCount
) => {
  try {
    if (!userId || !eventId || !eventTitle || !ticketsCount) {
      throw new Error("Invalid input values");
    }

    const qrCodeContent = `https://kierha.github.io/tickets_details/index.html?id=${eventId}`;
    const qrCodeBase64 = generateQrCodeBase64(qrCodeContent);
    const reservationDate = new Date().toISOString();

    const { data, error } = await supabase.from("reservations").insert(
      {
        user_id: userId,
        event_id: eventId,
        event_title: eventTitle,
        tickets_count: ticketsCount,
        reservation_date: reservationDate,
        qr_code: qrCodeBase64,
      },
      { returning: "minimal" }
    );

    if (error) throw new Error(error.message);

    const { data: insertedReservation, error: fetchError } = await supabase
      .from("reservations")
      .select(
        `
        *,
        events!inner (
          image,
          start_date,
          location
        )
      `
      )
      .eq("user_id", userId)
      .eq("event_id", eventId)
      .order("reservation_date", { ascending: false })
      .limit(1);

    if (fetchError) throw new Error(fetchError.message);
    if (!insertedReservation || insertedReservation.length === 0) {
      throw new Error("Failed to fetch inserted reservation.");
    }

    return insertedReservation[0];
  } catch (err) {
    console.error("Error creating reservation:", err.message);
    throw new Error(err.message);
  }
};

/**
 * Met à jour le nombre de places vendues pour un événement.
 * @param {string} eventId - ID de l'événement.
 * @param {number} ticketsCount - Nombre de billets vendus.
 * @returns {Promise<Object>} - Données mises à jour de l'événement.
 */
export const updateEventFromReservation = async (eventId, ticketsCount) => {
  try {
    const { data: eventData, error: readError } = await supabase
      .from("events")
      .select("tickets_sold")
      .eq("id", eventId)
      .single();

    if (readError) throw new Error(readError.message);

    const currentSold = eventData?.tickets_sold || 0;
    const newSold = currentSold + ticketsCount;

    const { data: updatedData, error: updateError } = await supabase
      .from("events")
      .update({ tickets_sold: newSold })
      .eq("id", eventId)
      .single();

    if (updateError) throw new Error(updateError.message);

    return updatedData;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Récupère toutes les réservations d'un utilisateur.
 * @param {string} userId - ID de l'utilisateur.
 * @returns {Promise<Array>} - Liste des réservations.
 */
export const getUserReservations = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("reservations")
      .select(
        `
        *,
        events!inner (
          image,
          start_date,
          location
        )
      `
      )
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Supprime une réservation par ID.
 * @param {string} reservationId - ID de la réservation à supprimer.
 */
export const deleteReservation = async (reservationId) => {
  try {
    const { error } = await supabase
      .from("reservations")
      .delete()
      .eq("id", reservationId);

    if (error) throw new Error(error.message);
  } catch (err) {
    throw new Error(err.message);
  }
};
