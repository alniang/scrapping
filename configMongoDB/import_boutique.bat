set MONGO_HOME=C:\Program Files\MongoDB\Server\4.2
cd /d "%~dp0"
"%MONGO_HOME%\bin\mongoimport" --db projetAL04 --collection fusionAfrikrea --drop --file dataset/fusionAfrikrea.json --jsonArray
pause