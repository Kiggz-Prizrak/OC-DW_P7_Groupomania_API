# P7-Groupomania-API

## Lien du front :
- https://github.com/Kiggz-Prizrak/P7-Groupomania-Front

## dépendances 
Pour installer ce projet veuillez vous procurer 
- Node.js
- MySQL
- bcrypt
- sequelize
- jsonwebtoken
- multer
- dotenv

##  configuration du Backend

cloner le repository 

Ouvrir le dossier Backend dans le terminal puis exécuter la commande:

    npm install
    
Ouvir le fichier ".env.exemple", remplir les clés et remplacer le nom du fichier par ".en"

puis lancer le server avec la commande :

    npm start ou nodemon serve
    
Server : "localhost:3000"

##  Gestion de base de Données

Importer le fichier sql dans phpmyadmin

Log de l'administrateur : 
- email : admin@groupomania.fr
- password : Admin.123

sinon aller dans la table User, créer un utilisateur en changeant la valeur "isAdmin" par "1"



