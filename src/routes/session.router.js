import { Router } from "express"
import { authorization, generateToken, passportCall } from "../utils.js"
import passport from "passport"

const router = Router()

router.post("/register", passport.authenticate("register", { failureRedirect: "/api/session/failregister" }), async (req, res) => {
    res.redirect("/login")
})

router.get("/failregister", async (req, res) => {
    res.send({ error: "Failed" })
})

router.post("/login", passport.authenticate("login", { failureRedirect: "/api/session/faillogin" }), async (req, res) => {
    if (!req.user) {
        return res.status(400).send({ status: "error", error: "Invalid credentials" })
    }

    req.session.user = req.user

    const token = generateToken(req.user)
    
    res.cookie("currentUser", token, { maxAge: 60 * 60 * 1000, httpOnly: true })

    res.render("profile", req.user)

})

router.get("/faillogin", (req, res) => {
    res.send({ error: "Failed Login" })
})

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => { })

router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), async (req, res) => {

    req.session.user = req.user

    const token = generateToken(req.user)

    res.cookie("currentUser", token, { maxAge: 60 * 60 * 1000, httpOnly: true })

    res.render("profile", req.user)
})

router.get("/current", passportCall("jwt"), authorization("admin"), (req, res) => {
    const user = req.user
    res.send(user)
})

router.get("/logout", async (req, res) => {
    req.session.destroy(error => {
        if (!error) {
            res.clearCookie("connect.sid")
            res.clearCookie("currentUser")
            res.send("Logout OK")
        }
        else res.send({ status: "Error", body: err })

    })
})

export default router