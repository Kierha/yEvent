import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Conteneur général : on utilise flex:1 + padding
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 20,
  },
  // Titre principal (Your E-Ticket)
  header: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  // Carte blanche arrondie (QR + infos)
  ticketCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    // Ombre légère Android
    elevation: 4,
    // Ombre légère iOS
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  // Centrer le QR code
  qrImage: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  // Trait de séparation horizontal
  divider: {
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  // Titre de l'événement
  eventTitle: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  // Ligne pour regrouper des infos
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoColumn: {
    flex: 1,
    alignItems: 'flex-start',
  },
  infoLabel: {
    color: '#777777',
    fontSize: 14,
    marginBottom: 5,
  },
  infoValue: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Texte d'erreur si pas de QR code
  errorText: {
    color: '#FF0000',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  // Bouton Retour en bas
  backButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#000000',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
