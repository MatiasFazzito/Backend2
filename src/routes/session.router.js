import { Router } from "express"
import { generateToken, handlePolicies, passportCall } from "../utils.js"
import passport from "passport"

const router = Router()

//Registro de usuarios
router.post("/register", passport.authenticate("register", { failureRedirect: "/api/session/failregister" }), async (req, res) => {
    res.redirect("/login")
})

router.get("/failregister", async (req, res) => {
    res.render("error", { error: "Error en el registro de usuario" })
})

//Login local
router.post("/login", passport.authenticate("login", { failureRedirect: "/api/session/faillogin" }), async (req, res) => {
    if (!req.user) {
        return res.status(400).send({ status: "error", error: "Invalid credentials" })
    }

    req.session.user = req.user

    const token = generateToken(req.user)

    res.cookie("currentUser", token, { maxAge: 60 * 60 * 1000, httpOnly: true })

    res.redirect("/home")

})

router.get("/faillogin", (req, res) => {
    res.render("error", { error: "Error en el inicio de sesion" })
})

//Login github
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => { })

router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), async (req, res) => {

    req.session.user = req.user

    const token = generateToken(req.user)

    res.cookie("currentUser", token, { maxAge: 60 * 60 * 1000, httpOnly: true })

    res.redirect("/home")
})

//Logout
router.get("/logout", async (req, res) => {
    req.session.destroy(error => {
        if (!error) {
            res.clearCookie("connect.sid")
            res.clearCookie("currentUser")
            res.redirect("/")
        }
        else res.send({ status: "Error", body: error })
    })
})

export default router