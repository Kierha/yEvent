import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useCameraPermissions } from "expo-camera"; // Importe les permissions de la caméra
import {
  getUserDetails,
  updateEmail,
  updatePassword,
  logout,
} from "../../src/api/AuthService"; // API centralisée pour la gestion utilisateur
import styles from "../../src/styles/UserProfileStyle";

/**
 * Écran du profil utilisateur.
 * - Permet de changer l'adresse e-mail ou le mot de passe de l'utilisateur.
 * - Inclut un scanner QR code nécessitant la permission de la caméra.
 * - Propose un bouton de déconnexion.
 * @param {Object} navigation - Objet de navigation pour gérer les transitions entre écrans.
 * @returns {JSX.Element} - Composant UserProfileScreen.
 */
const UserProfileScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [user, setUser] = useState(null);
  const [permission, requestPermission] = useCameraPermissions(); // Gère les permissions de la caméra

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUserDetails();
        setUser(userDetails);
      } catch (error) {
        Alert.alert("Error", "Unable to retrieve user info.");
      }
    };
    fetchUserDetails();
  }, []);

  /**
   * Met à jour l'adresse e-mail de l'utilisateur.
   */
  const handleEmailUpdate = async () => {
    try {
      await updateEmail(email);
      Alert.alert("Success", "Email address updated.");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  /**
   * Met à jour le mot de passe de l'utilisateur.
   */
  const handlePasswordUpdate = async () => {
    try {
      await updatePassword(newPassword);
      Alert.alert("Success", "Password updated.");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  /**
   * Déconnecte l'utilisateur et redirige vers l'écran de connexion.
   */
  const handleLogout = async () => {
    try {
      await logout();
      navigation.replace("Login"); // Redirection vers l'écran de connexion
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  /**
   * Demande la permission de la caméra et redirige vers l'écran de scanner QR code.
   */
  const handleRequestCameraPermission = async () => {
    const { status } = await requestPermission();
    if (status === "granted") {
      navigation.navigate("QRCodeScanner");
    } else {
      Alert.alert(
        "Permission denied",
        "Cannot use the camera without permission."
      );
    }
  };

  return (
    <View style={styles.container}>
      {user && (
        <Text style={styles.title}>Hello, {user.name || user.email}</Text>
      )}

      {/* Changement d'adresse e-mail */}
      <View style={styles.section}>
        <Text style={styles.label}>Change email address:</Text>
        <TextInput
          style={styles.input}
          placeholder="New email address"
          placeholderTextColor="#A0A0A0"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.button} onPress={handleEmailUpdate}>
          <Text style={styles.buttonText}>Update email</Text>
        </TouchableOpacity>
      </View>

      {/* Changement de mot de passe */}
      <View style={styles.section}>
        <Text style={styles.label}>Change password:</Text>
        <TextInput
          style={styles.input}
          placeholder="New password"
          placeholderTextColor="#A0A0A0"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handlePasswordUpdate}>
          <Text style={styles.buttonText}>Update password</Text>
        </TouchableOpacity>
      </View>

      {/* Scanner QR code */}
      <TouchableOpacity
        style={[styles.button, styles.qrButton]}
        onPress={handleRequestCameraPermission}
      >
        <Text style={styles.buttonText}>Scan a QR Code</Text>
      </TouchableOpacity>

      {/* Déconnexion */}
      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfileScreen;
