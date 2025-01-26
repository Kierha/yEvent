import { StyleSheet } from "react-native";

/**
 * Styles pour l'écran de réservation (ReservationScreen).
 * - Gère l'apparence des sections principales, des boutons et des messages.
 */
export default StyleSheet.create({
  // Conteneur principal
  container: {
    flex: 1,
    backgroundColor: "#000", // Fond noir
    padding: 20,
  },

  // Titre de l'événement
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF", // Texte blanc
    marginBottom: 10,
  },

  // Prix de l'événement
  price: {
    fontSize: 18,
    color: "#4CAF50", // Texte vert
    marginBottom: 20,
  },

  // Conteneur pour la sélection du nombre de tickets
  ticketSelector: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  // Bouton pour augmenter ou diminuer le nombre de tickets
  ticketButton: {
    backgroundColor: "#444", // Bouton gris foncé
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  ticketButtonText: {
    fontSize: 18,
    color: "#FFF", // Texte blanc
    fontWeight: "bold",
  },

  // Nombre de tickets sélectionnés
  ticketCount: {
    fontSize: 18,
    color: "#FFF", // Texte blanc
    fontWeight: "bold",
  },

  // Bouton de réservation
  reserveButton: {
    backgroundColor: "#4CAF50", // Bouton vert
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  reserveButtonText: {
    color: "#FFF", // Texte blanc
    fontSize: 18,
    fontWeight: "bold",
  },

  // Bouton désactivé
  disabledButton: {
    backgroundColor: "#888", // Bouton grisé
  },

  // Texte pour les tickets restants
  remainingTicketsText: {
    color: "#FF0000", // Texte rouge
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
});
