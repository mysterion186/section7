# Projet Quiz - Web full stack 

## Les membres du groupes sont (groupes 8): 
-  Vithulaksan Naguleswaran (nagulesv & vithulaksan)
-  Julien Ravindrarasa (mysterion186)
-  Askar Seyadoumougammadou (seyadoua & Amst64)

## Lancement des dockers 
Les deux images sur le docker hub peuvent être lancées grâces aux commandes suivantes :  
Image front : 

```yaml
docker container run -it --rm -p 3000:80 --name quiz-prod-ui ravindrj/quiz-prod-ui
```
Image back : 

```yaml
docker container run -it --rm -p 5000:5000 --name quiz-prod-api ravindrj/quiz-prod-api
```

## Lancement des test Postman (Collection Quiz TDD)
Lors du lancement du projet, la base de données est vide. Ainsi, il faut générer les deux tables pour pouvoir utiliser le projet.
Pour cela il faut envoyer une requête `POST` à l'endpoint `/rebuild-db` mais cet endpoint nécessite une authentification.
Dans les tests actuels, on ne cherche pas à récupérer le token ainsi il faut d'abord le récupérer en faisant une requête au endpoint `/login` puis on peut lancer tous les tests.


## Lancement du projet en production (Collection `Data Generation.postman_collection.json`)
La première étape est d'importer la collection fournie pour générer les différents éléments de notre projet. Le fichier nécessaire se trouve à la racine du projet.  
Le premier dossier aura pour but de créer les tables vides (car la base de données est vide au lancement).  
Le second dossier aura pour but d'ajouter les questions dans la base de données.  
Le dernier dossier (factultatif) a pour but de créer des "fausses" participations pour notre quiz.
