# Projet Quiz - Web full stack 

## Lancement du back : 
Le back pour ce jeux de quiz est fait avec flask (Python). 
Il y a la possibilité d'utiliser une image Docker pour faciliter l'exécution du jeu.   
Instruction pour générer l'image Docker pour le back : 
```yaml 
docker image build -t quiz-local-api .
```  
Instruction pour lancer le conteneur : 
```yaml 
docker container run -it --rm -p 5000:5000 --name quiz-local-api quiz-local-api
```  

## Lancement du front :
C'est un projet react. Il faut d'abord installer les modules avec l'instruction suivante :  
```yaml
npm install
```  
Puis lancer le serveur avec la commande :   
```yml
npm start
``` 