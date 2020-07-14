set MONGO_HOME=C:\Program Files\MongoDB\Server\4.2
cd /d "%~dp0"
"%MONGO_HOME%\bin\mongoimport" --db projetAL04 --collection eventslogos --drop --file dataset/ebenafrica-logos.json --jsonArray
pause