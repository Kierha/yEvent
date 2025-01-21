import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../../api/Supabase.js'; 
import styles from '../../styles/LoginScreenStyle.js'; 

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        Alert.alert('Erreur', error.message);
      } else {
        Alert.alert('Succès', 'Connexion réussie !');
        console.log('Redirection vers Home après connexion');
        navigation.replace('Main'); // Redirige vers l'écran Home
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Erreur inattendue', 'Une erreur est survenue.');
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
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>Register here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
