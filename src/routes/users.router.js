import { Router } from "express"
import userModel from "../models/user.model.js"

const router = Router()

router.get("/", async (req, res) => {
    try {
        const currentUser = req.session.user
        const users = await userModel.find().lean()

        currentUser.isValid = currentUser.role == "admin"

        res.render("users", { users, currentUser })
    } catch (error) {
        res.render("error", { error: "Error al obtener usuarios" })
    }
})

router.get("/:uid", async (req, res) => {
    try {
        const user = await userModel.findById(req.params.uid).lean()

        res.render("user", { user })
    } catch (error) {
        res.render("error", { error: "Error al obtener usuario" })
    }
})

router.put("/:uid", async (req, res) => {
    try {
        const updates = req.body

        const updateData = { $set: {} }

        for (const key in updates) {
            if (updates.hasOwnProperty(key) && updates[key] !== '') {
                updateData.$set[key] = updates[key];
            }
        }

        await userModel.findByIdAndUpdate(req.params.uid, updateData)

        res.redirect("/")

    } catch (error) {
        console.log(error)

        res.render("error", { error: "Error al modificar usuario" })
    }
})

router.delete("/:uid", async (req, res) => {
    try {
        const { uid } = req.params
        await userModel.deleteOne({ _id: uid })

        res.redirect("/api/users")
    } catch (error) {
        res.render("error", { error: "Error al eliminar usuario" })
    }
})

export default router