import { dirname } from 'path'
import { fileURLToPath } from 'url'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

const PRIVATE_KEY = "myprivatekey"

const generateToken = (user) => {
    return jwt.sign({ user }, PRIVATE_KEY)
}

const authToken = (req, res, next) => {
    const token = req.headers["authorization"]
    if (token) {
        jwt.verify(token, PRIVATE_KEY, {})
    }
}

export default __dirname