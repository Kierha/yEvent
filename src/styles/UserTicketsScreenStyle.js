import { StyleSheet } from "react-native";

/**
 * Styles pour l'écran MyTicketsScreen.
 * - Gère l'apparence des cartes de tickets, des titres et des états (chargement, erreurs).
 */
export default StyleSheet.create({
  // Conteneur principal
  container: {
    flex: 1,
    backgroundColor: "#000", // Fond noir
    padding: 20,
  },

  // Titre principal
  title: {
    color: "#FFF", // Texte blanc
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  // Titre de section (ex. : Upcoming Events, Past Events)
  sectionTitle: {
    color: "#4CAF50", // Texte vert
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },

  // Carte de ticket
  ticketCard: {
    flexDirection: "row",
    backgroundColor: "#1E1E1E", // Fond gris foncé
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden", // Arrondir les bords
  },

  // Image de l'événement
  eventImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  // QR code
  qrImage: {
    width: 100,
    height: 100,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  // Conteneur des informations du ticket
  ticketInfo: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },

  // Titre de l'événement
  eventTitle: {
    color: "#4CAF50", // Texte vert
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },

  // Texte général
  text: {
    color: "#FFF", // Texte blanc
    marginBottom: 3,
  },

  // Texte pour la date
  dateText: {
    color: "#FFF", // Texte blanc
    fontSize: 14,
    fontWeight: "bold",
  },

  // Texte d'information générique
  infoText: {
    color: "#AAA", // Texte gris clair
    textAlign: "center",
  },

  // Texte d'erreur
  errorText: {
    color: "red", // Texte rouge
    textAlign: "center",
  },

  // Conteneur de chargement
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", // Fond noir
  },

  // Texte de chargement
  loadingText: {
    color: "#4CAF50", // Texte vert
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});
