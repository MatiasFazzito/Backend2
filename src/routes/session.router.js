import { Router } from "express"
import userModel from "../models/user.model.js"


const router = Router()

router.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, age, password, role } = req.body

        if (!firstName || !lastName || !email || !age || !password) {
            return res.status(400).send("Todos los campos son obligatorios");
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send("El usuario ya está registrado");
        }

        const user = new userModel({firstName, lastName, email, age, password, role: "admin"})

        await user.save()

        res.redirect("/login")
    } catch (error) {
        console.log(error);
        
        res.status(500).send("Error al registrarse")
    }
})

router.get("/current", async (req, res) => {
    //Validar usuario logueado y devolver respuesta con los datos

})

export default router