import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    age: { type: Number },
    password: { type: String },
    cart: {type: String},
    role: { type: String, default: "admin" }
})

const UserModel = mongoose.model("users", userSchema)

export default UserModel