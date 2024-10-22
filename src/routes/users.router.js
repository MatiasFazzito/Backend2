import { Router } from "express"
import userModel from "../models/user.model.js"
import { isValidPassword } from "../utils.js"
import passport from "passport"

const router = Router()

router.get("/", async (req, res) => {
    try {
        const users = await userModel.find()
        res.send({ result: "success", payload: users })
    } catch (error) {
        console.error(error)
    }
})

router.post("/login", passport.authenticate("login", {failureRedirect:"/faillogin"}), async(req,res)=>{
    if (!req.user) {
        return res.status(400).send({status:"error", error: "Invalid credentials"})
    }
    req.session.user = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        age: req.user.age,
        email: req.user.email
    }
    res.render("profile", user)
})

router.get("/faillogin", (req,res)=>{
    res.send({error: "Failed Login"})
})

/*router.post("/login", async (req, res) => {
    //Generar un JWT con los datos
    //Almacenar el JWT en una cookie llamada currentUser
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })

        if (!isValidPassword(user, password)) {
            return res.status(403).send({ status: error, error: "incorrect password" })
        }

        delete user.password
        req.session.user = user
        res.render("profile", user)

        //else {
            //req.session.user = user
            //req.session.admin = true
            //res.send("Login OK")
        //}

    } catch (error) {
        res.render("error", error)
    }
})*/

router.get("/logout", async (req, res) => {
    req.session.destroy(error => {
        if (!error) {
            res.clearCookie("connect.sid")
            res.send("Logout OK")
        }
        else res.send({ status: "Error", body: err })

    })
})

/*router.post("/", async (req, res) => {
    try {
        const { nombre, apellido, email } = req.body
        if (!nombre || !apellido || !email) {
            res.send({ status: "error", error: "Faltan parametros" })
        }
        const result = await userModel.create({ nombre, apellido, email })

        res.send({ result: "success", payload: result })
    } catch (error) {
        console.error(error)
    }
})*/

router.put("/:uid", async (req, res) => {
    try {
        const { uid } = req.params
        const userToReplace = req.body

        if (!userToReplace.nombre || !userToReplace.apellido || !userToReplace.email) {
            res.send({ status: "error", error: "faltan parametros" })
        }

        const result = await userModel.updateOne({ _id: uid }, userToReplace)
        res.send({ result: "success", payload: result })
    } catch (error) {
        console.error(error)
    }
})

router.delete("/:uid", async (req, res) => {
    try {
        const { uid } = req.params
        const result = await userModel.deleteOne({ _id: uid })

        res.send({ result: "success", payload: result })
    } catch (error) {
        console.error(error)
    }
})

export default router