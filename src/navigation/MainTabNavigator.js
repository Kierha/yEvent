import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../src/screens/HomeScreen";
import ProfileScreen from "../../src/screens/UserProfilScreen";
import UserTicketsScreen from "../../src/screens/UserTicketsScreen";
import MapEventScreen from "../../src/screens/MapEventScreen";
import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

/**
 * Navigation principale avec onglets.
 * - Permet de naviguer entre les écrans : accueil, billets, carte des événements et profil utilisateur.
 * - Chaque onglet est associé à une icône.
 * @returns {JSX.Element} - Composant de navigation avec onglets.
 */
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home" // Définit Home comme écran par défaut
      screenOptions={({ route }) => ({
        headerShown: false, // Cache le header pour tous les écrans
        tabBarStyle: { backgroundColor: "#000" }, // Style de la barre des onglets
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Définition des icônes en fonction du nom de l'onglet
          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Profile") iconName = "person-outline";
          else if (route.name === "Tickets") iconName = "ticket-outline";
          else if (route.name === "Map") iconName = "map-outline";

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4CAF50", // Couleur active
        tabBarInactiveTintColor: "#FFF", // Couleur inactive
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
