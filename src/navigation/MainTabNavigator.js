import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../src/screens/HomeScreen";
import ProfileScreen from "../../src/screens/UserProfilScreen";
import UserTicketsScreen from "../../src/screens/UserTicketsScreen";
import MapEventScreen from "../../src/screens/MapEventScreen"; // Import du nouvel écran
import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

/**
 * Navigation principale avec onglets.
 * - Inclut les écrans d'accueil, de profil et de carte des événements.
 */
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home" // Définit Home comme écran par défaut
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: "#000" },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Profile") iconName = "person-outline";
          else if (route.name === "Tickets") iconName = "ticket-outline";
          else if (route.name === "Map") iconName = "map-outline"; // Icône pour la carte
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "#FFF",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tickets" component={UserTicketsScreen} />
      <Tab.Screen name="Map" component={MapEventScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
