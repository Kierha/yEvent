import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native"; // Barre d'état pour le thème sombre
import LoginScreen from "./src/screens/Auth/LoginScreen";
import RegisterScreen from "./src/screens/Auth/RegisterScreen";
import MainTabNavigator from "./src/navigation/MainTabNavigator"; // Navigation principale avec onglets
import EventDetailsScreen from "./src/screens/EventDetailsScreen"; // Écran des détails d'un événement
import ReservationScreen from "./src/screens/ReservationScreen"; // Écran de réservation
import TicketsQRCodeScreen from "./src/screens/TicketsQrCodeScreen"; // Écran du QR code des tickets
import QRCodeScannerScreen from "./src/screens/QrCodeScannerScreen"; // Écran du scanner de QR code

const Stack = createStackNavigator();

/**
 * Composant principal de l'application.
 * - Configure la navigation principale.
 * - Définit les écrans de connexion, d'inscription, de navigation principale et de détails d'événement.
 */
export default function App() {
  return (
    <>
      {/* Barre d'état avec un style adapté au thème sombre */}
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          {/* Écrans d'authentification */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          {/* Navigation principale */}
          <Stack.Screen name="Main" component={MainTabNavigator} />
          {/* Détails d'un événement */}
          <Stack.Screen
            name="EventDetails"
            component={EventDetailsScreen}
            options={{
              headerShown: false,
              headerStyle: { backgroundColor: "#000" },
              headerTintColor: "#FFF",
              title: "Event Details",
            }}
          />
          {/* Écran de réservation */}
          <Stack.Screen
            name="Reservation"
            component={ReservationScreen}
            options={{
              headerShown: true,
              headerStyle: { backgroundColor: "#000" },
              headerTintColor: "#FFF",
              title: "Reservation",
            }}
          />
          {/* Écran du QR code des tickets */}
          <Stack.Screen
            name="TicketsQRCode"
            component={TicketsQRCodeScreen}
            options={{
              headerShown: false,
            }}
          />
          {/* Écran du scanner de QR code */}
          <Stack.Screen
            name="QRCodeScanner"
            component={QRCodeScannerScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
