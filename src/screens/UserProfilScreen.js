import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useCameraPermissions } from "expo-camera"; // Import useCameraPermissions
import { updateEmail, updatePassword, logout } from "../../src/api/AuthService"; // API centralisée
import styles from "../../src/styles/UserProfileStyle";

/**
 * Page utilisateur.
 * - Affiche les informations du profil utilisateur.
 * - Permet de changer l'e-mail ou le mot de passe.
 * - Intègre un scanner QR code.
 * - Inclut un bouton de déconnexion.
 */
const UserProfileScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [permission, requestPermission] = useCameraPermissions(); // Utiliser useCameraPermissions

  // Changement de l'adresse e-mail
  const handleEmailUpdate = async () => {
    try {
      await updateEmail(email);
      Alert.alert("Succès", "Adresse e-mail mise à jour.");
    } catch (error) {
      Alert.alert("Erreur", error.message);
    }
  };

  // Changement du mot de passe
  const handlePasswordUpdate = async () => {
    try {
      await updatePassword(newPassword);
      Alert.alert("Succès", "Mot de passe mis à jour.");
    } catch (error) {
      Alert.alert("Erreur", error.message);
    }
  };

  // Déconnexion de l'utilisateur
  const handleLogout = async () => {
    try {
      await logout();
      navigation.replace("Login"); // Redirection vers la page de connexion
    } catch (error) {
      Alert.alert("Erreur", error.message);
    }
  };

  // Demande de permission de la caméra et navigation vers le scanner QR code
  const handleRequestCameraPermission = async () => {
    const { status } = await requestPermission();
    if (status === "granted") {
      Alert.alert("Permission accordé");
      navigation.navigate("QRCodeScanner");
    } else {
      Alert.alert(
        "Permission refusée",
        "Impossible d'utiliser la caméra sans autorisation."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon Profil</Text>

      {/* Changement d'adresse e-mail */}
      <View style={styles.section}>
        <Text style={styles.label}>Changer l'adresse e-mail :</Text>
        <TextInput
          style={styles.input}
          placeholder="Nouvelle adresse e-mail"
          placeholderTextColor="#A0A0A0"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.button} onPress={handleEmailUpdate}>
          <Text style={styles.buttonText}>Mettre à jour</Text>
        </TouchableOpacity>
      </View>

      {/* Changement de mot de passe */}
      <View style={styles.section}>
        <Text style={styles.label}>Changer le mot de passe :</Text>
        <TextInput
          style={styles.input}
          placeholder="Nouveau mot de passe"
          placeholderTextColor="#A0A0A0"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handlePasswordUpdate}>
          <Text style={styles.buttonText}>Mettre à jour</Text>
        </TouchableOpacity>
      </View>

      {/* Scanner QR code */}
      <TouchableOpacity
        style={[styles.button, styles.qrButton]}
        onPress={handleRequestCameraPermission}
      >
        <Text style={styles.buttonText}>Scanner un QR Code</Text>
      </TouchableOpacity>

      {/* Déconnexion */}
      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfileScreen;
