# Matias Fazzito´s API

_Este es un proyecto basado en el curso BackendII de CODERHOUSE en continuacion con los cursos previos y el trayecto que estoy realizando para integrarme en el mundo del desarrollo y programacion, en este caso con la direccion del Prof. Omar Jesus Maniás @omanias y los tutores Walter Maza y David Alvarez, el objetivo principal es poder profundizar en la creacion de un ecommerce aplicando los conocimientos adquiridos previamente en el curso de desarrollo BackendI incluyendo Patrones de diseño y arquitectura al proyecto anteriormente desarrollado_

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._


### Pre-requisitos 📋

_Solo necesitas Visual Studio Code, postman y MongoAtlas para poder probar todas las funciones_


### Instalación 🔧

_Abriendo la terminal de tu VSC escribe_

```
$ git clone https://github.com/MatiasFazzito/Backend2
```

```
$ cd ../path/al/archivo
```

```
$ npm install
```

```
$ npm start
```

_En el archivo .env.example se encuentran todas las variables globales necesarias para la ejecucion del proyecto_

## Ejecutando las pruebas ⚙️

_Se pueden ejecutar pruebas de todas las funcionalidades con los distintos endpoint desarrollados en el proyecto_

### Postman 🔩

_Para poder realizar pruebas en Postman se deberan revisar los router donde se encuentran las distintas rutas del proyecto_

### Navegador ⌨️

_Para poder hacer prueba de funciones en el navegador debe utilizarce el siguiente comando_

```
npm start
```
_Este abrira el localhost en el puerto indicado dentro de las variables globales_

## Construido con 🛠️

### Dependencias 🛠️

* [express](https://expressjs.com/es/) - El framework utilizado
* [express-handlebars](https://www.npmjs.com/package/express-handlebars) - Manejador de vistas
* [express-session](https://expressjs.com/en/resources/middleware/session.html) - Usado para manejar sesiones de usuario
* [mongoose](https://mongoosejs.com/) - Usado para persistencia
* [passport](https://www.passportjs.org/) - Usado para autenticacion y autorizacion
* [passport-github2](https://www.passportjs.org/packages/passport-github2/) - Usado para login y registro con github
* [passport-local](https://www.passportjs.org/packages/passport-local/) - Usado para login y registro con usuarios locales
* [passport-jwt](https://www.passportjs.org/packages/passport-jwt/) - Usado para autorizacion
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Usado para autorizacion y autenticacion
* [cookie-parser](https://www.npmjs.com/package/cookie-parser) - Usado para generacion y manejar cookies
* [connect-mongo](https://www.mongodb.com/es) - Usado para conectar con base de datos Mongo
* [bcrypt](https://www.npmjs.com/package/bcrypt) - Usado para encriptar la contraseña de usuarios
* [luxon](https://www.npmjs.com/package/luxon) - Usado para manejo de horarios en tickets
* [method-override](https://www.npmjs.com/package/method-override) - Usado para manejo de formularios
* [nodemailer](https://www.nodemailer.com/) - Usado para sericio de mailing
* [cors](https://www.npmjs.com/package/cors) - Usado para manejo de peticiones


## Contribuyendo 🖇️

Por el momento el proyecto no esta abierto a contribucion pero toda sujerencia es siempre bienvenida

## Versionado 📌

Para el versionado del proyecto se utilizo Git, se pueden encontrar todas las versiones en el historial de github del proyecto

## Autores ✒️

* **Fazzito MAtias** - *Trabajo Inicial y documentacion* - [MatiasFazzito](https://github.com/MatiasFazzito)


## Expresiones de Gratitud 🎁

* Comenta a otros sobre este proyecto 📢
* Invita una cerveza 🍺 o un café ☕ a alguien del equipo. 😁