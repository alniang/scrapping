set MONGO_HOME=C:\Program Files\MongoDB\Server\4.2
cd /d "%~dp0"
"%MONGO_HOME%\bin\mongoimport" -h ds049864.mlab.com:49864 -d heroku_xkfxc8s6 -c fusionEbenafrica -u alpha -p Niangal01 --drop --file dataset/fusionAbenafrica.json --jsonArray
"%MONGO_HOME%\bin\mongoimport" -h ds049864.mlab.com:49864 -d heroku_xkfxc8s6 -c fusionAfrikrea -u alpha -p Niangal01 --drop --file dataset/fusionAfrikrea.json --jsonArray
pause