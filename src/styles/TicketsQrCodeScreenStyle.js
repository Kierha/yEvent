import { StyleSheet } from "react-native";

/**
 * Styles pour l'écran des QR codes de tickets (TicketsQRCodeScreen).
 * - Gère l'apparence des cartes de tickets, du QR code et des boutons.
 */
const styles = StyleSheet.create({
  // Conteneur général
  container: {
    flex: 1,
    backgroundColor: "#4CAF50", // Fond vert
    padding: 20,
  },

  // Titre principal (Order ID)
  header: {
    color: "#FFFFFF", // Texte blanc
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  // Carte contenant le QR code et les infos
  ticketCard: {
    backgroundColor: "#FFFFFF", // Fond blanc
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    alignItems: "center", // Centrer le contenu horizontalement

    // Ombre légère pour Android
    elevation: 4,

    // Ombre légère pour iOS
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  // QR code centré
  qrImage: {
    marginBottom: 10,
  },

  // Trait de séparation horizontal
  divider: {
    borderBottomColor: "#CCCCCC", // Gris clair
    borderBottomWidth: 1,
    marginVertical: 20,
    alignSelf: "stretch", // Étend le trait sur toute la largeur
  },

  // Titre de l'événement
  eventTitle: {
    color: "#000000", // Texte noir
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },

  // Ligne pour regrouper des infos (ex : date, heure, lieu)
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    width: "100%", // Prend toute la largeur
  },
  infoColumn: {
    flex: 1,
    alignItems: "flex-start", // Aligne les colonnes à gauche
  },
  infoLabel: {
    color: "#777777", // Texte gris foncé
    fontSize: 14,
    marginBottom: 5,
  },
  infoValue: {
    color: "#000000", // Texte noir
    fontSize: 16,
    fontWeight: "bold",
  },

  // Texte d'erreur pour le QR code
  errorText: {
    color: "#FF0000", // Texte rouge
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },

  // Bouton Retour en bas de l'écran
  backButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#000000", // Bouton noir
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: {
    color: "#FFFFFF", // Texte blanc
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
