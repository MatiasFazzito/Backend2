import express from "express"
import handlebars from 'express-handlebars'
import session from "express-session"
import FileStore from "session-file-store"
import MongoStore from "connect-mongo"
import cookieParser from "cookie-parser"
import dotenv from 'dotenv'
import mongoose from "mongoose"
import passport from "passport"
import initializePassport from "./config/passport.config.js"
import __dirname from "./utils.js"
import userRouter from "./routes/users.router.js"
import sessionRouter from "./routes/session.router.js"
import viewsRouter from "./routes/views.router.js"

const app = express()
dotenv.config()
const fileStorage = FileStore(session)

const PORT = 8080
const URIConection = process.env.URIMONGO

app.listen(PORT, () => {
    console.log("Server running on port 8080")
})

mongoose.connect(URIConection)
    .then(() => { console.log("Conectado a mongo") })
    .catch(() => { console.error("Error al intentar conectar a la base de datos") })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: URIConection,
        mongoOptions: {
            serverSelectionTimeoutMS: 30000
        },
        ttl: 1000
    }),
    secret: "secretoCoder",
    resave: false,
    saveUninitialized: false
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine("handlebars", handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use("/", viewsRouter)
app.use("/api/users", userRouter)
app.use("/api/sessions", sessionRouter)