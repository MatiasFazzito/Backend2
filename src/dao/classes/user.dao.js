import UserModel from "../models/user.model"

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
            const user = await UserModel.findOne({ _id: id })

            return user
        } catch (error) {
            return null
        }
    }

    updateUser = async (id, user) => {
        try {
            const updates = user
            const updateData = { $set: {} }

            for (const key in updates) {
                if (updates.hasOwnProperty(key) && updates[key] !== '') {
                    updateData.$set[key] = updates[key];
                }
            }

            await UserModel.updateOne({ _id: id }, updateData)
        } catch (error) {
            return null
        }
    }

    deleteUser = async (id) => {
        try {
            const { uid } = req.params
            
            await UserModel.deleteOne({ _id: uid })

        } catch (error) {
            return null
        }
    }
}