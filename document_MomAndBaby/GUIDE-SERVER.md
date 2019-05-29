#--------------------------------------------------------
# SOURCE CONTROL
#--------------------------------------------------------
+ Git: https:https://sogoten6689@dev.azure.com/sogoten6689/ShareMomAndBaby/_git/ShareMomAndBaby
+ Git branch: develop


#--------------------------------------------------------
# STEPS TO START API SERVER
#--------------------------------------------------------
1. Install node.js (version >= 8) --> restart computer (check: node -v)
2. Install xampp and run mysql  (https://www.apachefriends.org/download.html)
    + Open xampp and start apache + mysql
3. Go to /server, run: npm install
4. Create mom_and_baby_tool database.
    + Go to http://localhost:port/phpmyadmin/ and create database name : baby_forums (choose utf8_unicode_ci for language of database)
5. Run database migration to generate db schema.
    + Run cmd: npm install sequelize-cli -g
    + Go to D:\hoctap\hocki8\DOANTOTNGHIEP\baocao\code\server\db
	+ Run cmd: sequelize db:migrate
	+ Run cmd: sequelize db:seed:all
6. Start server without checking changed:
    + Run cmd: npm start


#--------------------------------------------------------
# STEP TO GENERATE API DOCS
#--------------------------------------------------------
1. Run command: npm install apidoc -g
2. Go to /server folder
3. Run command: npm run apidoc
4. Open file: server/apidoc/index.html