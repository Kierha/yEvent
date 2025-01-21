import { StyleSheet } from 'react-native';

const RegisterScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Noir
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF', // Blanc
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0', // Gris clair
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#1E1E1E', // Gris foncé
    color: '#FFF', // Blanc pour le texte
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  signUpButton: {
    backgroundColor: '#00FF00', // Vert
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  signUpButtonText: {
    color: '#000', // Noir
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  loginText: {
    color: '#A0A0A0', // Gris clair
    fontSize: 14,
  },
  loginLink: {
    color: '#00FF00', // Vert
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default RegisterScreenStyles;
