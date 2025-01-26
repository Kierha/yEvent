import { StyleSheet } from "react-native";

const QrCodeScannerScreenStyle = StyleSheet.create({
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
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 4,
    borderColor: "#4CAF50", // Bordure verte
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  overlayText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 8,
  },
});

export default QrCodeScannerScreenStyle;
