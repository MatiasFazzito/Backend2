import User from "../dao/classes/user.dao.js"

const userService = new User()

export const getUsers = async (req, res) => {
    try {
        const currentUser = req.session.user
        if (currentUser.role == "admin" || currentUser.role == "VIP") {
            currentUser.isValid = true
        }

        const users = await userService.getUsers()

        res.render("users", { users, currentUser })
    } catch (error) {
        res.render("error", { error: "Error al obtener usuarios" })
    }
}

export const getUserById = async (req, res) => {
    try {
        const currentUser = req.session.user
        const { uid } = req.params
        const user = await userService.getUserById(uid)

        if (currentUser.role == "admin") {
            currentUser.isValid = true
        }

        res.render("user", { user, currentUser })
    } catch (error) {
        res.render("error", { error: "Error al obtener usuario" })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params
        const updates = req.body
        const updateData = { $set: {} }

        for (const key in updates) {
            if (updates.hasOwnProperty(key) && updates[key] !== '') {
                updateData.$set[key] = updates[key]
            }
        }

        await userService.updateUser(uid, updateData)

        res.redirect("/")
    } catch (error) {
        res.render("error", { error: "Error al modificar usuario" })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { uid } = req.params

        await userService.deleteUser(uid)

        res.redirect("/api/users")
    } catch (error) {
        res.render("error", { error: "Error al eliminar usuario" })
    }
}