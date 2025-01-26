import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";

/**
 * Affiche une popup avec les détails d'un événement sélectionné.
 * Permet de fermer la popup ou de naviguer vers les détails de l'événement.
 * @param {Object} event - Détails de l'événement à afficher.
 * @param {Function} onClose - Fonction appelée pour fermer la popup.
 * @param {Function} onViewDetails - Fonction appelée pour afficher les détails de l'événement.
 * @returns {JSX.Element} - Composant EventDetailsPopupMap.
 */
const EventDetailsPopupMap = ({ event, onClose, onViewDetails }) => {
  return (
    <Modal transparent visible animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.description}>
            {event.description || "No description available."}
          </Text>
          <Text style={styles.date}>Date: {event.start_date}</Text>
          <Text style={styles.price}>
            Price: {event.price ? `$${event.price}` : "Free"}
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={onViewDetails}
            >
              <Text style={styles.detailsButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: 300,
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
  },
  date: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: "#333",
    marginBottom: 15,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: "100%",
  },
  closeButton: {
    backgroundColor: "#CCC",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  detailsButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  detailsButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default EventDetailsPopupMap;
