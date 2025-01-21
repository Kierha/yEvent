import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../src/screens/HomeScreen';
import ProfileScreen from '../../src/screens/UserProfilScreen';
import UserTicketsScreen from '../../src/screens/UserTicketsScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

/**
 * Navigation principale avec onglets.
 * - Inclut les écrans d'accueil et de profil.
 */
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#000' },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';
          else if (route.name === 'Tickets') iconName = 'ticket-outline';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#FFF',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Tickets" component={UserTicketsScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;