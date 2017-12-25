# VAMP_ApiRest

A [Sails](http://sailsjs.org) application

## Setup

### Base de données : MongoDB

Lancer une instance de la base :

    mongod

### Initialisation du projet

#### Installation des modules

    sudo npm install

#### Lancement de l'API

    sails lift

## Tests et documentation de l'API

## Utilisation

url de login :
  `http://localhost:1337/auth/local`

url de register :
  `http://localhost:1337/auth/local/register`

Pour acceder à une resource, ajouter le token à la header de la requête :
  `Authorization: Bearer <token>`

  ou bien au corps de la requête :
  `access_token: <token>`


## documentation

Realisée avec l'api Apiary
Le lien : https://khadidjahamza.docs.apiary.io/#
