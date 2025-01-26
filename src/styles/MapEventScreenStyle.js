import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Carte
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  // Texte de chargement
  loadingText: {
    color: "#4CAF50",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },

  // Texte d'erreur
  errorText: {
    color: "#FF0000",
    fontSize: 16,
    textAlign: "center",
    margin: 20,
  },
});

export default styles;
