Le projet africaparis est un site web qui permet de regrouper tout ce qui tourne au tour de la mode et de la culture africaine et afro caribéenne. 
L'architechture du projet comprend les éléments suivants :
- Un front Angular qui se connecter à un backend via une API rest
- Un backend Java / Spring boot sur lequel Angular viendra se connecter
- Une base de données MySQL pour stocker les informations “métiers” du Backend
- Une base de données MongoDB pour stocker les informations “data”
- Une partie server-side en NodeJS, qui devra récolter des données, les traiter et les insérer dans la base de données MongoDB.

Le projet est composé de 6 repos github :

# scrapping : https://github.com/alniang/scrapping
# africaparis-nodejs : https://github.com/alniang/africaparis-nodejs
# africaparis-ms-evenement : https://github.com/alniang/africaparis-ms-evenement
# africaparis-ms-boutique :https://github.com/alniang/africaparis-ms-boutique
# africaparis-ms-login : https://github.com/alniang/africaparis-ms-login
# africaparis-frontend-angular : https://github.com/alniang/africaparis-frontend-angular


   # SCRAPING #
Cette partie permet de récupérer des données de sites web, de les mettre dans des fichiers json et enfin de les stocker dans une base de données mongodb. Elle est composée de 2 dossiers scrapping et configMongo : 
- scrapping dans ce dossier on a :
  ScrapeAbenafrica qui permet de récupérer des données du site abenafrica.com
  ScrapeAfrikrea qui permet de récupérer des données du site afrikrea.com
  fusionDonnes.js qui permet de fusionner les données de chaque site entre elles
- configMongo dans ce dossier on a : 
  dataset qui permet de stocker les données fusionnées avant de les persister dans mongodb
  et import.bat qui permet d'importer ces fichiers et de les persister dans mongodb.
On trouve aussi à la racine de ce repos le fichier scrapping.bat afin de faciliter l'exécution de tous ces programmes.

Ce projet est réalisé avec nodejs v12.16.3 et mondodb
Pour l'utiliser il faut executer la commande npm install dans le dossier scrapping afin d'installer les modules ensuite node + nom_programme.js.
Pour persister les donner dans mongo, il faut changer les paramètres dans import.bat (chemin vers votre mongo local, nom de votre collection , votre dbusername, votre dbpassword et votre host)
Pour utiliser scrapping.bat afin d'exécuter tous les programmes en une fois il faut aussi modifier les paramétres dans le fichier.


