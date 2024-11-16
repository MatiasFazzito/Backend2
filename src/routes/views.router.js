import { Router } from "express"
import { handlePolicies, passportCall } from "../utils.js"

const router = Router()

router.get("/", (req, res) => {
    res.render("landing", { currentPage: 'landing' })
})

router.get("/home", passportCall("jwt"), handlePolicies(["user", "VIP", "admin"]), (req, res) => {
    const currentUser = req.session.user
    if (currentUser.role == "admin"|| currentUser.role == "VIP") {
        currentUser.isValid = true
    }

    res.render("home", { currentUser, currentPage: 'landing' })
})

router.get("/register", (req, res) => {
    res.render("register", { currentPage: 'landing' })
})

router.get("/login", (req, res) => {
    res.render("login", { currentPage: 'landing' })
})

router.get("/profile", passportCall("jwt"), handlePolicies(["user", "VIP", "admin"]), (req, res) => {
    const user = req.session.user
    res.render("profile", { user })
})

router.get('/addproduct', passportCall("jwt"), handlePolicies([ "admin"]), (req, res) => {
    res.render('addproduct')
})

router.get("/edituser/:uid", passportCall("jwt"), handlePolicies(["user", "VIP", "admin"]), (req, res) => {
    const user = req.params.uid
    const currentUser = req.session.user
    currentUser.isValid = currentUser.role === "admin"

    res.render("edituser", { user, currentUser })
})

router.get("/editproduct/:pid", passportCall("jwt"), handlePolicies(["admin"]), (req, res) => {
    const product = req.params.pid

    res.render("editproduct", { product })
})

//Ruta en construccion
router.get("/checkout", passportCall("jwt"), handlePolicies(["user", "VIP"]), (req, res) => {
    const user = req.session.user

    res.render("checkout", user)
})


export default router