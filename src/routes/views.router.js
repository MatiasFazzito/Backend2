import { Router } from "express"
import { handlePolicies, passportCall } from "../utils.js"

const router = Router()

//Landing
router.get("/", (req, res) => {
    res.render("landing", { currentPage: 'landing' })
})

router.get("/register", (req, res) => {
    res.render("register", { currentPage: 'landing' })
})

router.get("/login", (req, res) => {
    res.render("login", { currentPage: 'landing' })
})

//Home
router.get("/home", passportCall("jwt"), handlePolicies(["user", "VIP", "admin"]), (req, res) => {
    const currentUser = req.session.user
    if (currentUser.role == "admin" || currentUser.role == "VIP") {
        currentUser.isValid = true
    }

    currentUser.isAdmin = currentUser.role === "admin"

    res.render("home", { currentUser, currentPage: 'landing' })
})

//Admin Views
router.get('/addproduct', passportCall("jwt"), handlePolicies(["VIP", "admin"]), (req, res) => {
    res.render('addproduct')
})

router.get("/editproduct/:pid", passportCall("jwt"), handlePolicies(["admin"]), (req, res) => {
    const product = req.params.pid

    res.render("editproduct", { product })
})

//Authenticated Views
router.get("/profile", passportCall("jwt"), handlePolicies(["user", "VIP", "admin"]), (req, res) => {
    const currentUser = req.session.user
    res.render("profile", { currentUser })
})

router.get("/edituser/:uid", passportCall("jwt"), handlePolicies(["user", "VIP", "admin"]), (req, res) => {
    const user = req.params.uid
    const currentUser = req.session.user
    currentUser.isValid = currentUser.role === "admin"

    res.render("edituser", { user, currentUser })
})

export default router