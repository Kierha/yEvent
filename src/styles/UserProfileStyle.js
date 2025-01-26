import { StyleSheet } from "react-native";

/**
 * Styles pour l'écran du profil utilisateur (UserProfileScreen).
 * - Gère l'apparence des champs, des boutons, et des sections.
 */
const styles = StyleSheet.create({
  // Conteneur principal
  container: {
    flex: 1,
    backgroundColor: "#000", // Fond noir
    padding: 20,
  },

  // Titre principal
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF", // Texte blanc
    marginBottom: 20,
  },

  // Section (groupe de champs ou de contenu)
  section: {
    marginBottom: 30,
  },

  // Label pour les champs
  label: {
    fontSize: 16,
    color: "#FFF", // Texte blanc
    marginBottom: 10,
  },

  // Champ de saisie
  input: {
    backgroundColor: "#333", // Fond gris foncé
    color: "#FFF", // Texte blanc
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },

  // Bouton principal
  button: {
    backgroundColor: "#4CAF50", // Bouton vert
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF", // Texte blanc
    fontWeight: "bold",
    fontSize: 16,
  },

  // Bouton de déconnexion
  logoutButton: {
    backgroundColor: "#F44336", // Rouge
    marginTop: 20,
  },

  // Bouton pour accéder au scanner QR code
  qrButton: {
    backgroundColor: "#2196F3", // Bleu
    marginTop: 20,
  },

  // Vue de la caméra
  camera: {
    width: "100%",
    height: 300, // Hauteur fixe pour la vue caméra
    borderRadius: 10,
    marginBottom: 15,
  },
});

export default styles;
