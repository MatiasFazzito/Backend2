import { dirname } from 'path'
import { fileURLToPath } from 'url'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import passport from 'passport'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

const PRIVATE_KEY = "secretoCoder"

export const generateToken = (user) => {
    return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "24h" })
}

export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (error, user, info) {
            if (error) {
                return next(error)
            }
            if (!user) {
                return res.status(401).send({ error: info.messages ? info.messages : info.toString() })
            }
            req.user = user
            next()
        })(req, res, next)
    }
}

export const authorization = (role) => {
    return async (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).send({ error: "No permission" })
        }
        next()
    }
}

export default __dirname