/**
 * RegisterScreen.js
 * Écran d'inscription utilisant signUp() depuis AuthService.js
 * pour créer l'utilisateur dans Supabase Auth et dans la table `users`.
 */

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { signUp } from "../../api/AuthService"; // <-- On importe la fonction signUp
import styles from "../../styles/RegisterScreenStyle"; // <-- Tes styles externalisés

const RegisterScreen = ({ navigation }) => {
  // Champs gérés par l'utilisateur
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * handleRegister
   * - Appelle la fonction signUp du AuthService.
   * - Affiche un message de succès ou d'erreur.
   * - Redirige vers l'écran de login en cas de réussite.
   */
  const handleRegister = async () => {
    try {
      // 1. Inscription via AuthService (Auth + insert dans `users`)
      const user = await signUp(email, password, name);

      // 2. Vérifie si l'utilisateur a bien été créé
      if (user) {
        Alert.alert(
          "Succès",
          "Inscription réussie ! Vérifie ta boîte e-mail pour valider ton compte."
        );
        // 3. Redirige vers la page de login
        navigation.navigate("Login");
      }
    } catch (error) {
      // 4. Gère les erreurs
      console.error("Erreur lors de l’inscription :", error);
      Alert.alert("Erreur", error.message || "Une erreur est survenue.");
    }
  };

  // Rendu de l'interface
  return (
    <View style={styles.container}>
      <Text style={styles.title}>YEVENT</Text>
      <Text style={styles.subtitle}>Create your account to get started.</Text>

      <TextInput
        style={styles.input}
        placeholder="Your name"
        placeholderTextColor="#A0A0A0"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Your email"
        placeholderTextColor="#A0A0A0"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Your password"
        placeholderTextColor="#A0A0A0"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.signUpButton} onPress={handleRegister}>
        <Text style={styles.signUpButtonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
