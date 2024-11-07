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
                return res.render("error", { error: "No permission" }) 
            }
            req.user = user

            next()
        })(req, res, next)
    }
}

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

export default __dirname