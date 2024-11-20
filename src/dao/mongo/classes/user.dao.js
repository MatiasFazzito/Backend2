import UserModel from "../models/user.model.js"

export default class User {
    getUsers = async () => {
        try {
            const users = await UserModel.find().lean()

            return users
        } catch (error) {
            return null
        }
    }

    getUserById = async (id) => {
        try {
            const user = await UserModel.findOne({ _id: id }).lean()

            return user
        } catch (error) {
            return null
        }
    }

    updateUser = async (id, updateData) => {
        try {
            const user = await UserModel.updateOne({ _id: id }, updateData)

            return user

        } catch (error) {
            return null
        }
    }

    deleteUser = async (id) => {
        try {
            
            await UserModel.deleteOne({ _id: id })

        } catch (error) {
            return null
        }
    }
}