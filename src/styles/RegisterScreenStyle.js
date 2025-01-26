import { StyleSheet } from "react-native";

/**
 * Styles pour l'écran d'inscription (RegisterScreen).
 * - Gère l'apparence de l'écran, des champs de saisie et des boutons.
 */
const RegisterScreenStyles = StyleSheet.create({
  // Conteneur principal
  container: {
    flex: 1,
    backgroundColor: "#000", // Fond noir
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  // Titre principal
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF", // Texte blanc
    textAlign: "center",
    marginBottom: 10,
  },

  // Sous-titre
  subtitle: {
    fontSize: 16,
    color: "#A0A0A0", // Texte gris clair
    textAlign: "center",
    marginBottom: 30,
  },

  // Champ de saisie
  input: {
    backgroundColor: "#1E1E1E", // Fond gris foncé
    color: "#FFF", // Texte blanc
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },

  // Bouton d'inscription
  signUpButton: {
    backgroundColor: "#00FF00", // Fond vert
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  signUpButtonText: {
    color: "#000", // Texte noir
    fontSize: 16,
    fontWeight: "bold",
  },

  // Conteneur pour la redirection vers la connexion
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  loginText: {
    color: "#A0A0A0", // Texte gris clair
    fontSize: 14,
  },
  loginLink: {
    color: "#00FF00", // Lien vert
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default RegisterScreenStyles;
