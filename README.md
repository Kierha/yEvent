# yEvent

yEvent est une application mobile de gestion d'événements permettant aux utilisateurs de consulter des événements, de réserver des billets, de visualiser leurs réservations et de gérer leur profil utilisateur. L'application est développée avec **React Native** et utilise **Supabase** pour la gestion des données backend.

---

## Fonctionnalités principales

### **1. Navigation intuitive et écrans clés**

#### Structure et navigation

- **Bottom Tab Navigation** :
  - Accueil (liste des événements)
  - Profil utilisateur
  - Réservations
  - Carte des événements

#### Écrans principaux

1. **Accueil (Home Screen)**

   - Affiche une liste d’événements avec image, titre, date et bouton pour consulter les détails.
   - Recherche d’événements et filtres par catégorie.
   - Gestion des différents états : Aucun événement disponible ou liste d’événements.

2. **Détails de l’événement (Event Details Screen)**

   - Affiche les informations complètes d’un événement (description, lieu, date, disponibilité des billets).
   - Permet de réserver si l’événement n’est pas complet.

3. **Réservation (Booking Screen)**

   - Affiche les informations sur l’événement et permet de sélectionner un nombre de billets à réserver.

4. **Confirmation (Confirmation Screen)**

   - Affiche un résumé de la réservation avec un numéro de confirmation et un QR Code pour l’accès.

5. **Profil utilisateur (User Profile Screen)**

   - Affiche les informations de l’utilisateur (nom, email).
   - Permet de mettre à jour l’adresse email et le mot de passe.
   - Affiche les événements auxquels l’utilisateur participe (triés par date).
   - Bouton de déconnexion.

6. **Carte des événements (Map Event Screen)**

   - Affiche la position actuelle de l’utilisateur sur une carte.
   - Permet de localiser les événements grâce à des marqueurs.
   - Affiche les détails d’un événement sélectionné sur la carte.

7. **Scanner de QR Code (QR Code Scanner Screen)**
   - Permet de scanner un QR Code généré après une réservation.

---

## **Backend avec Supabase**

### Modélisation des données

- **Utilisateurs** : ID, nom, email, mot de passe (optionnel).
- **Événements** : ID, titre, description, lieu, date, capacité, places restantes.
- **Réservations** : ID, utilisateur, événement, nombre de billets.

### Fonctionnalités backend

- Gestion des données avec **Supabase** :
  - Récupération de la liste des événements (GET).
  - Création d’une réservation (POST).
  - Liste des réservations d’un utilisateur (GET).
- Mise à jour automatique des places restantes après chaque réservation.
- Affichage en temps réel des informations (exemple : événements complets).

---

## **Fonctionnalités natives et gestion des états**

### **Géolocalisation**

- Affiche la position actuelle de l’utilisateur.
- Permet de localiser les événements grâce à des marqueurs.

### **Caméra et QR Code**

- Implémentation d’un scanner de QR Code pour valider l’accès aux événements.

### **Gestion des états utilisateur**

- Messages clairs lorsque :
  - Aucun événement n’est réservé.
  - Un événement est complet.
- Loaders pour les appels API et messages de succès/erreurs.

---

## Installation et lancement

### **Prérequis**

- **Node.js**
- **Expo CLI**

### **Installation**

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Kierha/yEvent
   cd yEvent
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```

### **Lancement de l'application**

Démarrez l’application avec la commande suivante :

```bash
expo start
```

Ensuite, scannez le QR code affiché dans le terminal ou le navigateur avec l’application **Expo Go**.

### **Build APK**

Pour générer un fichier APK pour Android :

1. Installez les outils nécessaires :
   ```bash
   npm install -g eas-cli
   ```
2. Configurez votre projet pour **EAS Build** :
   ```bash
   eas build:configure
   ```
3. Lancez le processus de build pour Android :
   ```bash
   eas build -p android
   ```
4. Une fois le build terminé, téléchargez le fichier APK depuis le lien fourni.

---

## **Livrables attendus**

1. **Diagrammes UML** :

   - Diagramme de classes modélisant les relations entre utilisateur, événement et réservation.
   - Diagramme de cas d’utilisation pour décrire les interactions utilisateur (inscription, réservation, etc.).

2. **Application fonctionnelle** :

   - Tous les écrans et fonctionnalités mentionnés.
   - Intégration backend avec Supabase.
   - Respect des bonnes pratiques UI/UX.

3. **Design soigné** :
   - Inspiré de plateformes comme **Dribbble** ou **Behance**.

---

## **Ressources utiles**

- [Documentation officielle React Native](https://reactnative.dev)
- [Documentation Expo](https://docs.expo.dev)
- [React Native Elements](https://reactnativeelements.com)
- [Supabase Documentation](https://supabase.io)
- [Dribbble](https://dribbble.com) / [Behance](https://www.behance.net) pour l’inspiration design
- [GitHub](https://github.com) pour le versionnage
