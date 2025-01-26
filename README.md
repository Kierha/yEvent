# yEvent

yEvent est une application mobile de gestion d'événements, permettant aux utilisateurs de consulter des événements, de réserver des billets, de visualiser leurs réservations et de gérer leur profil utilisateur. L'application est développée avec React Native et utilise Supabase pour la gestion des données backend.

## Fonctionnalités

### Développement UI/UX et Navigation

#### Structure et Navigation

- **Bottom Tab Navigation** : L'application est organisée avec une navigation par onglets en bas pour accéder rapidement aux sections principales :
  - Accueil (liste des événements)
  - Profil utilisateur
  - Réservations
  - Carte des événements

#### Écrans Principaux

1. **Accueil (Home Screen)**

   - Affiche la liste des événements avec image, titre, date, et bouton pour afficher les détails.
   - Gère les différents états : Aucun événement disponible ou liste d'événements.
   - Recherche et filtres par catégorie.

2. **Détails de l'événement (Event Details Screen)**

   - Affiche les informations complètes sur un événement (nom, description, lieu, date, disponibilité des billets).
   - Gère les états : complet ou nombre de places restantes, et si c’est passé ou à venir.
   - Permet de réserver un billet si l’événement n’est pas complet.

3. **Réservation (Booking Screen)**

   - Crée un formulaire contenant : nom, email, et nombre de billets.
   - Affiche les informations de l'événement et permet de sélectionner le nombre de billets à réserver.

4. **Confirmation (Confirmation Screen)**

   - Affiche un résumé de la réservation avec un numéro de confirmation et, si disponible, un QR Code généré pour l’accès.

5. **Profil utilisateur (User Profile Screen)**

   - Affiche les informations de l’utilisateur (nom, email).
   - Liste les événements auxquels il participe.
   - Gère les états : Aucun événement réservé ou liste d’événements triés par date.
   - Permet de mettre à jour l'email et le mot de passe de l'utilisateur.
   - Inclut un bouton de déconnexion.

6. **Carte des événements (Map Event Screen)**

   - Affiche la position actuelle de l’utilisateur sur une carte.
   - Permet de localiser les événements grâce à des marqueurs.
   - Affiche les détails de l'événement sélectionné sur la carte.

7. **Scanner de QR Code (QR Code Scanner Screen)**
   - Implémente une fonctionnalité pour scanner un QR Code généré après une réservation.

### Développement Backend avec Supabase

#### Création et Gestion des Données

- **Modélisation des tables nécessaires dans Supabase** :
  - Utilisateurs : ID, nom, email, mot de passe (optionnel).
  - Événements : ID, titre, description, lieu, date, capacité, places restantes.
  - Réservations : ID, utilisateur, événement, nombre de billets.

#### API Supabase

- **Configuration de Supabase pour récupérer et modifier les données de l’application** :
  - Liste des événements (GET)
  - Création d’une réservation (POST)
  - Liste des réservations d’un utilisateur (GET)

#### Gestion des États avec Supabase

- Mise à jour automatique des places restantes après chaque réservation.
- Affichage des informations en temps réel (exemple : événements complets).

### Intégration de Fonctionnalités Natives et Gestion des États

#### Géolocalisation

- Affiche la position actuelle de l’utilisateur sur une carte.
- Permet de localiser l’événement grâce à un marqueur.

#### Caméra et QR Code

- Implémente une fonctionnalité pour scanner un QR Code généré après une réservation.

#### Gestion des États Utilisateur

- Affiche un message clair lorsque :
  - Un utilisateur n’a réservé aucun événement.
  - Un événement est complet.

#### Feedback Utilisateur

- Ajoute des messages pour les erreurs et succès (exemple : "Événement complet", "Réservation confirmée").
- Intègre des loaders pour les appels API.

## Installation et Lancement

### Prérequis

- Node.js
- Expo CLI

### Installation

1. Clonez le dépôt :
   ```sh
   git clone <URL_DU_DEPOT>
   cd yEvent
   ```
2. Installer les dépendances :
   ```sh
   npm install
   ```

### Lancement de l'Application

Pour démarrer l'application, utilisez la commande suivante :

    ```sh
    expo start
    ```

Ensuite, scannez le QR code affiché dans le terminal ou dans le navigateur avec l'application Expo Go sur votre appareil mobile.

### Build APK

Pour générer un fichier APK pour Android, suivez les étapes ci-dessous :

1. Assurez-vous d'avoir installé les outils nécessaires :

   ```sh
   npm install -g eas-cli
   ```

2. Configurez votre projet pour EAS Build :

   ```sh
   eas build:configure
   ```

3. Lancez le processus de build pour Android :

   ```sh
   eas build -p android
   ```

4. Une fois le build terminé, vous recevrez un lien pour télécharger le fichier APK.
