import { Router } from "express"

const router = Router()


router.get("/profile", (req, res) => {
    if (!req.session.user) {
        res.redirect("/login")
    }
    const { first_name, last_name, email, age, password } = req.session.user
    res.render("profile", { first_name, last_name, email, age })
    res.send("req.session.user")
})

router.get("/login", (req,res)=>{
    res.render("login")
})

router.get("/register", (req,res)=>{
    res.render("register")
})

router.get("/", (req,res)=>{
    res.render("home")
})

export default router