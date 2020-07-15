@echo off
echo ======= DEBUT DE SCRAPPING ABENAFRICA =======
cd "D:\Projet AL04\africaparis-backend-nodejs2\scrapping\scrapping\ScrapeAbenafrica"
node scrapeAll.js
node scrapeLogoEtUrl.js
echo ======= FIN DE SCRAPPING ABENAFRICA =======

echo ======= DEBUT DE SCRAPPING AFRIKREA =======
cd "D:\Projet AL04\africaparis-backend-nodejs2\scrapping\scrapping\ScrapeAfrikrea" 
node scrapeAfrikrea.js
echo ======= FIN DE SCRAPPING AFRIKREA =======

echo ======= DEBUT DE FUSION DES DONNEES =======
cd "D:\Projet AL04\africaparis-backend-nodejs2\scrapping\scrapping" 
node fusionDonnes.js
echo ======= FIN DE FUSION DES DONNEES =======

cd "D:\Projet AL04\africaparis-backend-nodejs2\scrapping\configMongoDB"
start import.bat
