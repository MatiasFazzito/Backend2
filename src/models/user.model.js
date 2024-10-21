import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, max: 100 },
    lastName: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 50, unique: true },
    age: {type: Number, required: true},
    password: { type: String, required: true, max: 50 },
    //cart: String,
    role: {type: String, default: "user"}
})

const userModel = mongoose.model("users", userSchema)

export default userModel