import { StyleSheet } from 'react-native';

const LoginScreenStyles = StyleSheet.create({
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
  forgotPassword: {
    color: '#00FF00', // Vert
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 30,
  },
  signInButton: {
    backgroundColor: '#00FF00', // Vert
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  signInButtonText: {
    color: '#000', // Noir
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  registerText: {
    color: '#A0A0A0', // Gris clair
    fontSize: 14,
  },
  registerLink: {
    color: '#00FF00', // Vert
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LoginScreenStyles;
