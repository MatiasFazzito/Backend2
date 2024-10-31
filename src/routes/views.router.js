import { Router } from "express"

const router = Router()

router.get("/", (req, res) => {
    res.render("landing")
})

router.get("/home", (req,res)=>{
    if (!req.session.user) {
        res.render("error", { error: "Debe iniciar sesion para continuar" })
    }
    res.render("home")
})

router.get("/register", (req, res) => {
    res.render("register")
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.get("/profile", (req, res) => {
    if (!req.session.user) {
        res.redirect("/login")
    }

    const { firstName, lastName, email, age, password } = req.session.user
    res.render("profile", { firstName, lastName, email, age })
})

router.get('/addproduct', (req, res) => {
    const user = req.session.user
    if (user.role == "admin") {
        res.render('addproduct')
    } else {
        res.render('error', { error: 'Credenciales no validas' })
    }
})


export default router