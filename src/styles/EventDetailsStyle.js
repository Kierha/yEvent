import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Conteneur principal
  container: {
    flex: 1,
    backgroundColor: "#000", // Fond noir
  },

  // Image principale et conteneur
  imageContainer: {
    position: "relative", // Permet de positionner le bouton "back"
  },
  image: {
    width: "100%",
    height: 300, // Hauteur fixe pour l'image principale
  },

  // Bouton "Retour"
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fond semi-transparent
    borderRadius: 20,
    padding: 8,
  },

  // Détails de l'événement
  detailsContainer: {
    padding: 20,
  },
  genre: {
    color: "#FFF",
    fontSize: 16,
    marginBottom: 10,
  },
  title: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  price: {
    color: "#4CAF50", // Couleur verte pour le prix
    fontSize: 18,
    fontWeight: "bold",
  },
  billsIncluded: {
    color: "#AAA", // Texte grisé
    fontSize: 14,
  },
  eventName: {
    color: "#FFF",
    fontSize: 16,
    marginBottom: 10,
  },

  // Informations supplémentaires (date, lieu)
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    marginRight: 10, // Espacement entre l'icône et le texte
  },
  infoText: {
    color: "#FFF",
    fontSize: 14,
  },

  // Section "Détails"
  sectionTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    color: "#AAA",
    fontSize: 14,
    lineHeight: 22, // Meilleure lisibilité
  },

  // Bouton d'achat
  buyButton: {
    backgroundColor: "#4CAF50", // Bouton vert
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  soldOutButton: {
    backgroundColor: "#888", // Bouton grisé si épuisé
  },
  buyButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Chargement
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", // Fond noir
  },
});

export default styles;
