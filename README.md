# P7-Groupomania-API

Lien du front : backend link: [frontend repository](https://github.com/Kiggz-Prizrak/P7-Groupomania-Front)

## Dépendances

Pour installer ce projet veuillez vous procurer

- Node.js
- MySQL

## Configuration du Backend

cloner le repository

```bash
git clone
```

Ouvrir le dossier Backend dans le terminal puis exécuter la commande:

```bash
npm install
```

Dupliquer le fichier `.env.exemple`, renommer le fichier dupliqué en `.env`

puis lancer le server avec la commande :

```bash
  npm start
```

ou

```bash
  nodemon server
```
[la documentation de l'API](https://kiggz-prizrak.github.io/P7-Groupomania-API/#/)

L'API sera disponible sur [localhost:3000](http://localhost:3000)

## Gestion de base de Données

Importer le fichier [database.sql](https://github.com/Kiggz-Prizrak/P7-Groupomania-API/blob/main/database.sql) dans phpmyadmin

Log de l'administrateur :

- email : admin@groupomania.fr
- password : Admin.123

sinon aller dans la table User, créer un utilisateur en changeant la valeur "isAdmin" par "1"
