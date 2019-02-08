# Sample App
[using Blockbase](http://npmjs.com/package/@blacksmithstudio/blockbase)

### Version
v1.0.1

### Installation

You need to install : 
- NPM (Node.js) in order to get the dependencies
https://nodejs.org/en/
- Node >= 8.6


**Installing Blockbase**
In case you wanna you the CLI methods.
```sh
$ npm i -g blockbase
```

**Update config/default.yml**
Update your mysql credentials to run the database
```yml
# Default DBMS
dbms : mysql
mysql :
    host : localhost
    user : YOURUSERNAME
    password : YOURPASSWORD
    port : 3306
    database : blocksample
```

**Run the setup script**
This will install the DB and the tables.
```sh
$ npm run setup
```

### Usage

Start the app, using node `package.json` scripts runner.
PM2 required (installed with Blockbase) !

#### Development
```sh
$ npm run app
```

#### Sandbox / Production
```sh
$ npm run app:{env}
```

#### Sample Content
The sample contains 
- A complete config file in `./config/default.yml`
- An example of a model (User) in `./src/models/`
- An example of controllers linked to User (C.R.U.D.) in `./src/controllers``
- An example of views in `./src/views` 
- A postman docs in `./docs`

Then your app is available on your localhost :
- http://localhost:1337/
- http://localhost:1337/users (users list in a view)
- http://localhost:1337/api/users/auth (POST, see postman file)
- http://localhost:1337/api/users (POST, see postman file)
- http://localhost:1337/api/users/{id} (READ, see postman file)
- http://localhost:1337/api/users/{id} (PUT, see postman file)
- http://localhost:1337/api/users/{id} (DELETE, see postman file)

License
----
(Licence [MIT](https://github.com/blacksmithstudio/blockbase/blob/master/LICENCE))
Coded by [Blacksmith](https://www.blacksmith.studio)

**Free Software, Hell Yeah!**

[Node.js]:https://nodejs.org/en
[NPM]:https://www.npmjs.com