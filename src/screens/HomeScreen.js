import React from 'react';
import { View, Text, ScrollView, TextInput, Alert, FlatList } from 'react-native';
import TrendingEventCard from '../components/TrendingEventCard';
import UpcomingEventCard from '../components/UpcomingEventCard';
import NearbyEventCard from '../components/NearbyEventCard';
import CategoryFilter from '../components/CategorieFilter';
import { useEvents } from '../hooks/UseEvents';
import { useLocation } from '../hooks/UseLocation';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/HomeScreenStyle';

/**
 * Page d'accueil (HomeScreen).
 * - Affiche les sections d'événements (Trending, Upcoming, Nearby).
 * - Inclut un champ de recherche, des filtres de catégories et gère la géolocalisation.
 */
const HomeScreen = ({ navigation }) => {
  const { trendingEvents, upcomingEvents, nearbyEvents, loading } = useEvents();
  const { location, errorMsg } = useLocation();

  // Gestion des erreurs de géolocalisation
  if (errorMsg) {
    Alert.alert('Erreur', errorMsg);
  }

  return (
    <View style={styles.container}>
      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#FFF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search events"
          placeholderTextColor="#888"
        />
      </View>

      {/* Catégories de filtres */}
      <View style={styles.categoryContainer}>
        <CategoryFilter />
      </View>

      <ScrollView>
        {/* Section Trending Events */}
        <Text style={styles.sectionTitle}>Trending Events</Text>
        <FlatList
          data={trendingEvents}
          renderItem={({ item }) => (
            <TrendingEventCard
              event={item}
              onPress={() => navigation.navigate('EventDetails', { event: item })}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        {/* Section Upcoming Events */}
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <View style={styles.upcomingEventContainer}>
          {loading ? (
            <Text style={styles.loadingText}>Chargement...</Text>
          ) : upcomingEvents.length > 0 ? (
            <UpcomingEventCard
              event={upcomingEvents[0]}
              onPress={() => navigation.navigate('EventDetails', { event: upcomingEvents[0] })}
            />
          ) : (
            <Text style={styles.placeholderText}>Aucun événement à venir.</Text>
          )}
        </View>

        {/* Section Nearby Events */}
        <Text style={styles.sectionTitle}>Nearby Events</Text>
        {location ? (
          <FlatList
            data={nearbyEvents}
            renderItem={({ item }) => (
              <NearbyEventCard
                event={item}
                onPress={() => navigation.navigate('EventDetails', { event: item })}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <Text style={styles.loadingText}>Chargement de la localisation...</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
