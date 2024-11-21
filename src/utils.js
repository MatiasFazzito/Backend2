import { dirname } from 'path'
import { fileURLToPath } from 'url'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import passport from 'passport'
import nodemailer from "nodemailer"

//.env
process.loadEnvFile()
const PRIVATE_KEY = process.env.PRIVATE_KEY
const MAILING = process.env.MAILING
const MAILINGPASS = process.env.MAILINGPASS

//Pathing
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//Authentication
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

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
                return res.render("error", { error: "No permission" }) 
            }
            req.user = user

            next()
        })(req, res, next)
    }
}

//Authorization
export const handlePolicies = (policies)=>{
    return (req, res, next)=>{
        if (policies.includes("PUBLIC")) {
            next()
        } else{
            const token = req.cookies.currentUser
            if (!token) {
                return res.render("error", { error: "No permission" })                
            }
            try {
                const decoded = jwt.verify(token, PRIVATE_KEY)
                if (policies.includes(decoded.user.role)) {
                    next()
                } else{
                    return res.render("error", { error: "No permission" })
                }
            } catch (error) {
                return res.render("error", { error: "Invalid Token" })
            }
        }
    }
}

export const transport = nodemailer.createTransport({
    service:"gmail",
    port: 587,
    auth: {
        user: MAILING,
        pass:  MAILINGPASS
    }
})

export default __dirname