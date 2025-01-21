import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  ticketCard: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  eventImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  qrImage: {
    width: 100,
    height: 100,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  ticketInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  eventTitle: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    color: '#FFF',
    marginBottom: 3,
  },
  dateText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoText: {
    color: '#AAA',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});