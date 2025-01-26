import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import TrendingEventCard from "../components/TrendingEventCard";
import UpcomingEventCard from "../components/UpcomingEventCard";
import EventCardFiltered from "../components/EventCardFiltered"; // Utiliser le composant EventCardFiltered
import CategoryFilter from "../components/CategorieFilter";
import { useEvents } from "../hooks/UseEvents";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "../styles/HomeScreenStyle";

const HomeScreen = ({ navigation }) => {
  const { trendingEvents, upcomingEvents, loading } = useEvents();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);

  // Fonction de recherche
  const handleSearch = (query) => {
    setSearchQuery(query);
    filterEvents(query, selectedCategory);
  };

  // Fonction de filtrage par catégorie
  const handleFilter = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory("");
      setFilteredEvents([]);
    } else {
      setSelectedCategory(category);
      filterEvents(searchQuery, category);
    }
  };

  // Filtrer les événements en fonction de la recherche et de la catégorie
  const filterEvents = (query, category) => {
    let filtered = [...trendingEvents, ...upcomingEvents];

    if (query) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((event) =>
        event.genre.toLowerCase().includes(category.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  };

  return (
    <View style={styles.container}>
      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <Icon
          name="search-outline"
          size={20}
          color="#FFF"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search events"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Bouton pour afficher/masquer les filtres */}
      <TouchableOpacity
        style={styles.filterToggle}
        onPress={() => setFiltersVisible(!filtersVisible)}
      >
        <Text style={styles.filterToggleText}>
          {filtersVisible ? "Hide Filters" : "Show Filters"}
        </Text>
        <Icon
          name={filtersVisible ? "chevron-up-outline" : "chevron-down-outline"}
          size={20}
          color="#FFF"
        />
      </TouchableOpacity>

      {/* Catégories de filtres */}
      {filtersVisible && (
        <View style={styles.categoryContainer}>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onFilter={handleFilter}
          />
        </View>
      )}

      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : searchQuery || selectedCategory ? (
        filteredEvents.length > 0 ? (
          <FlatList
            data={filteredEvents}
            renderItem={({ item }) => (
              <EventCardFiltered
                event={item}
                onPress={() =>
                  navigation.navigate("EventDetails", { event: item })
                }
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text style={styles.placeholderText}>
            No events found for the current search or filter.
          </Text>
        )
      ) : (
        <ScrollView>
          {/* Section Trending Events */}
          <Text style={styles.sectionTitle}>Trending Events</Text>
          <FlatList
            data={trendingEvents}
            renderItem={({ item }) => (
              <TrendingEventCard
                event={item}
                onPress={() =>
                  navigation.navigate("EventDetails", { event: item })
                }
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />

          {/* Section Upcoming Events */}
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <View style={styles.upcomingEventContainer}>
            {upcomingEvents.length > 0 ? (
              <UpcomingEventCard
                event={upcomingEvents[0]}
                onPress={() =>
                  navigation.navigate("EventDetails", {
                    event: upcomingEvents[0],
                  })
                }
              />
            ) : (
              <Text style={styles.placeholderText}>No upcoming events.</Text>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
