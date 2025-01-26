import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";
import LoginScreen from "./src/screens/Auth/LoginScreen";
import RegisterScreen from "./src/screens/Auth/RegisterScreen";
import MainTabNavigator from "./src/navigation/MainTabNavigator";
import EventDetailsScreen from "./src/screens/EventDetailsScreen";
import ReservationScreen from "./src/screens/ReservationScreen";
import TicketsQRCodeScreen from "./src/screens/TicketsQrCodeScreen";
import QRCodeScannerScreen from "./src/screens/QrCodeScannerScreen";

const Stack = createStackNavigator();

/**
 * Composant principal de l'application.
 * - Configure la navigation principale avec un Stack Navigator.
 * - Définit les écrans de connexion, d'inscription, de navigation principale, et les écrans liés aux événements.
 */
export default function App() {
  return (
    <>
      {/* Barre d'état avec un style adapté au thème sombre */}
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false, // Cache l'en-tête par défaut
          }}
        >
          {/* Écrans d'authentification */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />

          {/* Navigation principale avec onglets */}
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
              headerShown: true, // Affiche l'en-tête pour cet écran
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
              headerShown: false, // Cache l'en-tête pour cet écran
            }}
          />

          {/* Écran du scanner de QR code */}
          <Stack.Screen
            name="QRCodeScanner"
            component={QRCodeScannerScreen}
            options={{
              headerShown: false, // Cache l'en-tête pour cet écran
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
