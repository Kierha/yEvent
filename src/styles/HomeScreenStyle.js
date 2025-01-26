import { StyleSheet } from "react-native";

/**
 * Styles pour la page d'accueil (HomeScreen).
 * Gère l'apparence des sections principales, de la barre de recherche et des filtres.
 */
const HomeScreenStyles = StyleSheet.create({
  // Conteneur principal
  container: {
    flex: 1,
    backgroundColor: "#000", // Fond noir
    padding: 20,
  },

  // Barre de recherche
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333", // Fond gris foncé
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchIcon: {
    marginRight: 10, // Espacement entre l'icône et le champ de recherche
  },
  searchInput: {
    flex: 1,
    color: "#FFF", // Texte blanc
  },

  // Bouton pour afficher/masquer les filtres
  filterToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#333",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  filterToggleText: {
    color: "#FFF", // Texte blanc
    fontSize: 16,
  },

  // Conteneur des catégories
  categoryContainer: {
    marginBottom: 20,
  },

  // Titre de section (ex. Trending Events, Upcoming Events)
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF", // Texte blanc
    marginVertical: 10,
  },

  // Texte d'état de chargement
  loadingText: {
    fontSize: 14,
    color: "#888", // Texte gris clair
    textAlign: "center",
    marginVertical: 10,
  },

  // Texte de placeholder (aucun résultat ou aucun événement trouvé)
  placeholderText: {
    fontSize: 14,
    color: "#888", // Texte gris clair
    marginTop: 10,
    textAlign: "center",
  },

  // Texte pour la localisation (ex. Distance ou position actuelle)
  locationText: {
    fontSize: 14,
    color: "#4CAF50", // Texte vert
    marginVertical: 5,
    textAlign: "center",
  },
});

export default HomeScreenStyles;
