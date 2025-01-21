import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const categories = [
  { name: 'Music Concert', colors: ['#FF9A8B', '#FF6A88'] },
  { name: 'City Festival', colors: ['#FFD700', '#FFA500'] },
  { name: 'Theatre', colors: ['#A1C4FD', '#C2E9FB'] },
  { name: 'Fashion Show', colors: ['#4CAF50', '#388E3C'] },
  { name: 'Comedy', colors: ['#FBC2EB', '#A6C1EE'] },
  { name: 'Workshop', colors: ['#FDEB71', '#F8D800'] },
];

/**
 * Composant CategoryFilter.
 * - Affiche les catégories sur deux lignes avec un défilement horizontal.
 */
const CategoryFilter = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      {categories.map((category, index) => (
        <View key={index} style={styles.categoryContainer}>
          <TouchableOpacity
            style={[styles.categoryButton, { backgroundColor: category.colors[0] }]}
            activeOpacity={0.8}
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
    flexDirection: 'row',
    flexWrap: 'wrap', // Permet de répartir les éléments en plusieurs lignes
    paddingHorizontal: 2,
  },
  categoryContainer: {
    width: '30%', // Largeur fixe pour chaque catégorie (environ 1/3 de l'écran)
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  categoryButton: {
    height: 40, // Hauteur des boutons
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5, // Ombre pour un effet 3D
  },
  categoryText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CategoryFilter;
