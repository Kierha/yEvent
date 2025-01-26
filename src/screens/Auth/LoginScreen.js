import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { supabase } from "../../api/Supabase.js";
import styles from "../../styles/LoginScreenStyle.js";

/**
 * Écran de connexion.
 * - Permet à l'utilisateur de se connecter à son compte.
 * - Redirige vers l'écran principal en cas de succès.
 * @param {Object} navigation - Objet de navigation pour gérer les transitions entre écrans.
 * @returns {JSX.Element} - Composant LoginScreen.
 */
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Gère la connexion de l'utilisateur.
   * - Utilise Supabase pour authentifier l'utilisateur.
   * - Affiche un message d'erreur en cas d'échec.
   * - Redirige vers l'écran principal ("Main") en cas de succès.
   */
  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert("Error", error.message);
      } else {
        navigation.replace("Main");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Unexpected Error", "An error occurred.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>YEVENT</Text>
      <Text style={styles.subtitle}>Your event experience starts here.</Text>

      <TextInput
        style={styles.input}
        placeholder="Your email"
        placeholderTextColor="#A0A0A0"
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

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerLink}>Register here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
