import { Router } from "express"

import { handlePolicies, passportCall } from "../utils.js"

const router = Router()

router.get("/", passportCall("jwt"), handlePolicies(["VIP", "admin"]), async (req, res) => {
    try {
        const currentUser = req.session.user
        if (currentUser.role == "admin" || currentUser.role == "VIP") {
            currentUser.isValid = true
        }

        const users = await userModel.find().lean()

        res.render("users", { users, currentUser })
    } catch (error) {
        res.render("error", { error: "Error al obtener usuarios" })
    }
})

router.get("/:uid", passportCall("jwt"), handlePolicies(["user", "VIP", "admin"]), async (req, res) => {
    try {
        const user = await userModel.findById(req.params.uid).lean()

        res.render("user", { user })
    } catch (error) {
        res.render("error", { error: "Error al obtener usuario" })
    }
})

router.put("/:uid", passportCall("jwt"), handlePolicies(["user", "VIP", "admin"]), async (req, res) => {
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

router.delete("/:uid", passportCall("jwt"), handlePolicies(["admin"]), async (req, res) => {
    try {
        const currentUser = req.session.user
        const { uid } = req.params
        await userModel.deleteOne({ _id: uid })
        if (currentUser.role == "admin") {
            currentUser.isValid = true
        }

        res.redirect("/api/users")
    } catch (error) {
        res.render("error", { error: "Error al eliminar usuario" })
    }
})

export default router