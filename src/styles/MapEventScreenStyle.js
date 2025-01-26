import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingText: {
    color: "#4CAF50",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  errorText: {
    color: "#FF0000",
    fontSize: 16,
    textAlign: "center",
    margin: 20,
  },
});

export default styles;
