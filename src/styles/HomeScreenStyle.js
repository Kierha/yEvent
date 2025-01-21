import { StyleSheet } from 'react-native';

/**
 * Styles pour la page d'accueil (HomeScreen).
 * Gère l'apparence des sections principales.
 */
const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginVertical: 10,
  },
  loadingText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginVertical: 10,
  },
  placeholderText: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
    textAlign: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#4CAF50',
    marginVertical: 5,
    textAlign: 'center',
  },
});

export default HomeScreenStyles;
