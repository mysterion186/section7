# Image de l'API basée sur une image python
FROM python:3.10-alpine

# Création et positionnement du répertoire par défaut dans le container
WORKDIR /app

# Copie du fichier requirements local (machine hôte) vers le container 
# (répertoire /app, car il s'agit du WORKDIR)
COPY requirements.txt requirements.txt

# Installation des dépendances dans le container + outil sqlite 
RUN pip3 install -r requirements.txt && apk add sqlite

# Creation d'une base vide
RUN touch quiz.db

# Variables d'environement de production
ENV FLASK_DEBUG=1
#ENV FLASK_ENV=production
ENV FLASK_APP=app.py

# Copie de l'ensemble du code + dépendances
COPY . .

# Informations sur l'image
# LABEL maintainer="Nagusleswaran Vithulaksan   <nagusleswaran.vithulaksan@edu.esiee.fr>" \
#     version="1.0"

# Commande de démarrage du serveur gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app", "--log-level", "info", "--error-logfile", "-", "--access-logfile", "-"]
