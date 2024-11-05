# Auction System

Ce projet est une application d'enchères en temps réel permettant aux utilisateurs de créer des enchères, de placer des offres en direct, et de visualiser les enchères en cours. Le projet est construit avec Node.js, Express, React, et utilise Socket.io pour les fonctionnalités en temps réel.

## Prérequis

- **Node.js** (version >= 14)
- **MongoDB** (compte sur MongoDB Atlas ou une instance MongoDB locale)

## Installation et Lancement du Projet en Local

### 1. Cloner le dépôt

```bash
git clone <URL_DU_DÉPÔT>
cd auction-system
```

## Installation des dépendances backend

```
cd backend
npm install
```

## Installation des dépendances frontend

```
cd ../frontend
npm install
```

## backend/.env

MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret_key

## Démarrer le serveur backend

```
cd backend
npm start
```

## Démarrer le client frontend

```
cd ../frontend
npm start
```

Le serveur sera lancé sur http://localhost:5050 et le frontend sur http://localhost:3000.

# Structure du Projet

## Backend (dossier `backend`)

- **server.js** : Point d'entrée du backend. Configure Express, MongoDB, et intègre Socket.io pour les enchères en temps réel.
- **routes/** : Contient les routes pour gérer les utilisateurs, les enchères et les sessions.
- **controllers/** : Logique métier pour les différentes fonctionnalités (création d'enchères, gestion des utilisateurs, etc.).
- **models/** : Définition des schémas Mongoose pour les collections MongoDB (User, Auction, Bid).
- **middlewares/** : Fonctions de middleware comme l'authentification des utilisateurs (vérification des tokens).

## Frontend (dossier `frontend`)

- **src/App.jsx** : Point d'entrée principal de l'application React. Configure le routage entre les différentes pages de l'application.
- **src/components/** : Contient les composants React réutilisables, comme `AuctionCard`, `CreateAuctionModal`, etc.
- **src/pages/** : Contient les pages principales comme `HomePage`, `AuctionDetail`, `MyAuctions`.
- **src/context/** : Gestion du contexte global pour l’état de l'utilisateur et l'authentification.
- **src/styles/** : Fichiers CSS organisés par composants et pages pour un style unifié dans toute l'application.

## Connexion à la Base de Données MongoDB

1. Crée un compte sur [MongoDB Atlas](https://www.mongodb.com/) ou utilise une instance MongoDB locale.
2. Crée un cluster et récupère l’URI de connexion MongoDB. Cela ressemblera à ceci : `mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majorityS`
3. Remplace `<username>`, `<password>`, et `<dbname>` dans l'URI avec tes informations MongoDB.
4. Colle l'URI dans le fichier `.env` dans `server/.env` sous la clé `MONGODB_URI`.

## Fonctionnalités Principales

- **Enchères en temps réel** : Grâce à Socket.io, les offres placées par les utilisateurs sont mises à jour en direct.
- **Création et gestion des enchères** : Les utilisateurs peuvent créer de nouvelles enchères avec des descriptions, images, et dates de fin.
- **Recherche et filtres** : Barre de recherche et filtres pour faciliter la navigation parmi les enchères.
- **Suivi des vues** : Affiche en temps réel le nombre de personnes visualisant chaque enchère.

## Auteur

**Derek** - Développeur full-stack
