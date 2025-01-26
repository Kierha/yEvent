import React from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

const categories = [
  { name: "City Festival", colors: ["#FFD700", "#FFA500"] },
  { name: "Theatre", colors: ["#A1C4FD", "#C2E9FB"] },
  { name: "Fashion Show", colors: ["#4CAF50", "#388E3C"] },
  { name: "Comedy", colors: ["#FBC2EB", "#A6C1EE"] },
  { name: "Workshop", colors: ["#FDEB71", "#F8D800"] },
];

/**
 * Component CategoryFilter.
 * - Displays categories on two lines with horizontal scrolling.
 * - Allows filtering events by category.
 * @param {string} selectedCategory - The currently selected category.
 * @param {Function} onFilter - Function to call when a category is selected.
 * @returns {JSX.Element} - The CategoryFilter component.
 */
const CategoryFilter = ({ selectedCategory, onFilter }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {categories.map((category, index) => (
        <View key={index} style={styles.categoryContainer}>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              {
                backgroundColor:
                  selectedCategory === category.name
                    ? category.colors[1]
                    : category.colors[0],
              },
            ]}
            activeOpacity={0.8}
            onPress={() => onFilter(category.name)}
          >
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 10,
  },
  categoryContainer: {
    marginHorizontal: 5,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  categoryText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default CategoryFilter;
