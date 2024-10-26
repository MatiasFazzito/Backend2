import passport from "passport"
import local from "passport-local"
import GitHubStrategy from "passport-github2"
import jwt from "passport-jwt"
import userModel from "../models/user.model.js"
import { createHash, isValidPassword } from "../utils.js"

const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const cookieExtractor = req => {
    let token = null
    if (req && req.cookies) {
        token = req.cookies["currentUser"]
    }
    return token
}

const initializePassport = () => {

    passport.use("register", new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {
            const { firstName, lastName, email, age } = req.body
            try {
                const user = await userModel.findOne({ email: username })

                if (user) {
                    console.log("user already exist")
                    return done(null, false)
                }

                const newUser = {
                    firstName,
                    lastName,
                    email,
                    age,
                    password: createHash(password)
                }

                const result = await userModel.create(newUser)

                return done(null, result)
            } catch (error) {
                return done("Error al obtener usuario: " + error)
            }
        }
    ))

    passport.use("login", new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
        try {
            const user = await userModel.findOne({ email: username })
            if (!user) {
                console.log("User not found")
                return done(null, false)
            }
            if (!isValidPassword(user, password)) {
                return done(null, false)
            }            
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))

    passport.use("github", new GitHubStrategy({
        clientID: "Iv23linzCZ0Y35zrRVL0",
        clientSecret: "dcbed2771f097a48b35963d70dea28a5538895d1",
        callbackURL: "http://localhost:8080/api/session/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await userModel.findOne({ email: profile._json.email })
            if (!user) {
                const newUser = {
                    firstName: profile._json.name,
                    lastName: "",
                    age: 18,
                    email: profile._json.email,
                    password: "",
                    role: "admin"
                }
                const result = await userModel.create(newUser)
                done(null, result)
            } else {
                done(null, user)
            }

        } catch (error) {
            return done(error)
        }
    }
    ))

    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: "secretoCoder"
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user)
    })
}

export default initializePassport