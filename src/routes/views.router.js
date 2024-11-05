import { Router } from "express"

const router = Router()

router.get("/", (req, res) => {
    res.render("landing", { currentPage: 'landing' })
})

router.get("/home", (req, res) => {
    if (!req.session.user) {
        res.render("error", { error: "Debe iniciar sesion para continuar" })
    }
    res.render("home")
})

router.get("/register", (req, res) => {
    res.render("register", { currentPage: 'landing' })
})

router.get("/login", (req, res) => {
    res.render("login", { currentPage: 'landing' })
})

router.get("/profile", (req, res) => {
    if (!req.session.user) {
        res.redirect("/login")
    }

    const user = req.session.user
    res.render("profile", { user })
})

router.get('/addproduct', (req, res) => {
    const user = req.session.user
    if (user.role == "admin") {
        res.render('addproduct')
    } else {
        res.render('error', { error: 'Credenciales no validas' })
    }
})

router.get("/edituser/:uid", (req, res) => {
    const user = req.params.uid
    const currentUser = req.session.user
    currentUser.isValid = currentUser.role === "admin"

    res.render("edituser", { user, currentUser })
})


export default router