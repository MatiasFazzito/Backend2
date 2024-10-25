import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    age: { type: Number },
    password: { type: String },
    //cart: String,
    role: { type: String, default: "user" }
})

const userModel = mongoose.model("users", userSchema)

export default userModel