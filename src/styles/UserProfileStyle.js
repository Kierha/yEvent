import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#333',
    color: '#FFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#F44336',
    marginTop: 20,
  },
  camera: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 15,
  },
  
});

export default styles;
