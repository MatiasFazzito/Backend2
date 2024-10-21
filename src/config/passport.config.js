import passport from "passport"
import GitHubStrategy from "passport-github2"
import userModel from "../models/user.model.js"

const initializePassport = () => {
    passport.use("github", new GitHubStrategy({
        clientID: "Iv23linzCZ0Y35zrRVL0",
        clientSecret: "dcbed2771f097a48b35963d70dea28a5538895d1",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done)=>{
        try {
            console.log(profile)
            const user = await userModel.findOne({email:profile._json.email})
            if (!user) {
                const newUser = {
                    firstName: profile._json.name,
                    lastName: "",
                    age: 18,
                    email: profile._json.email,
                    password: ""
                }
                const result = await userModel.create(newUser)
                done(null, result)
            } else{
                done(null, user)
            }
            
        } catch (error) {
            return done(error)
        }
    }
))
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user)
    })
}

export default initializePassport