import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#4CAF50',
    marginBottom: 20,
  },
  ticketSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  ticketButton: {
    backgroundColor: '#444',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  ticketButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  ticketCount: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  reserveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  reserveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
