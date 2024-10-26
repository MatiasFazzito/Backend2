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