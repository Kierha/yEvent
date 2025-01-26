import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { signUp } from "../../api/AuthService"; // Fonction signUp pour gérer l'inscription
import styles from "../../styles/RegisterScreenStyle"; // Styles externalisés

/**
 * Écran d'inscription.
 * - Permet à l'utilisateur de créer un compte.
 * - Utilise la fonction signUp du AuthService pour créer un utilisateur dans Supabase.
 * @param {Object} navigation - Objet de navigation pour gérer les transitions entre écrans.
 * @returns {JSX.Element} - Composant RegisterScreen.
 */
const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Gère l'inscription de l'utilisateur.
   * - Appelle la fonction signUp du AuthService.
   * - Affiche un message de succès ou d'erreur.
   * - Redirige l'utilisateur vers l'écran de connexion en cas de succès.
   */
  const handleRegister = async () => {
    try {
      const user = await signUp(email, password, name);

      if (user) {
        Alert.alert(
          "Succès",
          "Inscription réussie ! Vérifie ta boîte e-mail pour valider ton compte."
        );
        navigation.navigate("Login"); // Redirection vers l'écran de connexion
      }
    } catch (error) {
      console.error("Erreur lors de l’inscription :", error);
      Alert.alert("Erreur", error.message || "Une erreur est survenue.");
    }
  };

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
