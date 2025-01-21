// src/styles/EventDetailsStyle.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 300,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  detailsContainer: {
    padding: 20,
  },
  genre: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 10,
  },
  title: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    color: '#4CAF50',
    fontSize: 18,
    fontWeight: 'bold',
  },
  billsIncluded: {
    color: '#AAA',
    fontSize: 14,
  },
  eventName: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  infoText: {
    color: '#FFF',
    fontSize: 14,
  },
  directionLink: {
    color: '#4CAF50',
    fontSize: 14,
    marginLeft: 10,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    color: '#AAA',
    fontSize: 14,
    lineHeight: 22,
  },
  buyButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
