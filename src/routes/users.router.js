import { Router } from "express"
import userModel from "../models/user.model.js"

const router = Router()

router.get("/", async (req, res) => {
    try {
        const users = await userModel.find()
        res.send({ result: "success", payload: users })
    } catch (error) {
        console.error(error)
    }
})

router.get("/login", async (req, res) => {
    // Validar usuario por email y password
    //Generar un JWT con los datos
    //Almacenar el JWT en una cookie llamada currentUser
    const { user, password } = req.query
    if (user !== "coder" || password !== "house") {
        res.send("Login fallido")
    } else {
        req.session.user = user
        req.session.admin = true
        res.send("Login OK")
    }
})

router.get("/logout", async (req, res) => {
    req.session.destroy(error => {
        if (!err) {
            res.clearCookie("connect.sid")
            res.send("Logout OK")
        }
        else res.send({ status: "Error", body: err })

    })
})

router.post("/", async (req, res) => {
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
})

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