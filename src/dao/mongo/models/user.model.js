import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    age: { type: Number },
    password: { type: String },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    },
    role: { type: String, default: "user" }
})

const UserModel = mongoose.model("users", userSchema)

export default UserModel