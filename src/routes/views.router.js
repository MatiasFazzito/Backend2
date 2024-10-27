import { Router } from "express"

const router = Router()

router.get("/", (req,res)=>{
    res.render("home")
})

router.get("/register", (req,res)=>{
    res.render("register")
})

router.get("/login", (req,res)=>{
    res.render("login")
})

router.get("/profile", (req, res) => {
    if (!req.session.user) {
        res.redirect("/login")
    }
    const { first_name, last_name, email, age, password } = req.session.user
    res.render("profile", { first_name, last_name, email, age })
    res.send("req.session.user")
})

router.get('/addproduct', (req, res) => {
    res.render('addproduct')
})

export default router