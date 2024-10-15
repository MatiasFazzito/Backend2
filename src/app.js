import express from "express"
import mongoose from "mongoose"
import userRouter from "./routes/users.router.js"

const app = express()
const PORT = 8080


app.listen(PORT, () => {
    console.log("Server running on port 8080")
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", userRouter)
mongoose.connect("mongodb+srv://matiasfazzitodev:Alucard66@backend2.liqdm.mongodb.net/")
    .then(() => { console.log("Conectado a mongo") })
    .catch(() => { console.error("Error al intentar conectar a la base de datos") })