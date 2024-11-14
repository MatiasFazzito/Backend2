import User from "../dao/classes/user.dao.js"

const userService = new User()

export const getUsers = async (req, res) => {
    const result = await userService.getUsers()

    res.send({ status: "success", result })
}

export const getUserById = async (req, res) => {
    const { uid } = req.params
    const user = await userService.getUserById(uid)

    res.send({ status: "success", result: user })
}

export const updateUser = async (req, res) => {
    const { uid } = req.params
    const updates = req.body
    const updateData = { $set: {} }

    for (const key in updates) {
        if (updates.hasOwnProperty(key) && updates[key] !== '') {
            updateData.$set[key] = updates[key];
        }
    }

    const user = await userService.updateUser(uid, updateData)

    res.send({status: "success", result: user})
}

export const deleteUser = async (req,res)=>{
    const { uid } = req.params

    await userService.deleteUser(uid)

    res.send({status: "success"})
}