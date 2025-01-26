import { StyleSheet } from "react-native";

/**
 * Styles pour l'écran de scanner de QR code (QRCodeScannerScreen).
 * - Gère l'apparence de l'overlay, du cadre de scan, et des boutons.
 */
const QrCodeScannerScreenStyle = StyleSheet.create({
  // Conteneur principal de l'overlay
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Fond semi-transparent
  },

  // Cadre de scan
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 4,
    borderColor: "#4CAF50", // Bordure verte
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Fond semi-transparent à l'intérieur
  },

  // Texte sous le cadre de scan
  overlayText: {
    color: "#FFFFFF", // Texte blanc
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
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
});

export default QrCodeScannerScreenStyle;
