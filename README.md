# Matias Fazzito´s API

_Check [README-es.md](https://github.com/MatiasFazzito/Backend2/blob/main/README.md) to see this in spanish_

_This is a project based on Backend II course from CODERHOUSE in continuation with previous courses and my profesional learning path to insert myself in the developing world, in this case with the lead of Prof. Omar Jesus Maniás @omanias and tutors Walter Maza & David Alvarez, the main objective is to deepen on the creation of an ecommerce aplying all the knowledge adquired on the previous course Backend I including Design patterns & architecture to the previous developed project_

## Getting started 🚀

_These instructions will aloow you to get a copy of the working project in your local machine for development and testing_


### Pre-requisites 📋

_You only need Visual Studio Code, postman and MongoAtlas to test all functions_

### Installing 🔧

_Opening your VSC terminal type the following_

```
$ git clone https://github.com/MatiasFazzito/Backend2
```

```
$ cd ../path/to/the/file
```

```
$ npm install
```

```
$ npm start
```

_In the .env.example file you will find all the global variables you need to run the project_

## running tests ⚙️

_Every funcionality can be tested with the several endpoints already included on the project_

* **To test admin functions use admin@admin as login email and 123 as password**

### Postman 🔩

_To run tests on Postman you need to check the routes folder where you can find all the project routes_

### Browser ⌨️

_I order to perform tests on your browser you need to use the next command on your VSC terminal_

```
npm start
```

_A localhost server will be open on the port you indicated on the global variables_

## Built with 🛠️

### Dependencies 🛠️

* [express](https://expressjs.com/es/) - Used framework
* [express-handlebars](https://www.npmjs.com/package/express-handlebars) - View engine
* [express-session](https://expressjs.com/en/resources/middleware/session.html) - Used to manage user sessions
* [mongoose](https://mongoosejs.com/) - Used for persistence
* [passport](https://www.passportjs.org/) - Used for authentication and authorization
* [passport-github2](https://www.passportjs.org/packages/passport-github2/) - Used for github login and register
* [passport-local](https://www.passportjs.org/packages/passport-local/) - Used for local user Login and Register
* [passport-jwt](https://www.passportjs.org/packages/passport-jwt/) - Used for authorization
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Used for authorization and authentication
* [cookie-parser](https://www.npmjs.com/package/cookie-parser) - Used to generate and manage cookies
* [connect-mongo](https://www.mongodb.com/es) - Used to connect with Mongo database
* [bcrypt](https://www.npmjs.com/package/bcrypt) - Used to encrypt user password
* [luxon](https://www.npmjs.com/package/luxon) - Used for time management on tickets
* [method-override](https://www.npmjs.com/package/method-override) - Used for form management
* [nodemailer](https://www.nodemailer.com/) - Used for mailing service
* [cors](https://www.npmjs.com/package/cors) - Used to manage petitions


## Contributing 🖇️

Currently this project is not open to colaboration but sugestions are always welcome

## Versions 📌

Git was used for project version control, you can find all versions on github version history

## Authors ✒️

* **Fazzito Matias** - *Initial work and documenting* - [MatiasFazzito](https://github.com/MatiasFazzito)


## Greetings 🎁

* Tell others about this project 📢
* Share a beer 🍺 or a coffee ☕ with the team😁