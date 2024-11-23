import { Router } from "express"
import { getUsers, getUserById, updateUser, deleteUser } from "../Controllers/user.controller.js"
import { handlePolicies, passportCall } from "../utils.js"

const router = Router()

router.get("/", passportCall("current"), handlePolicies(["VIP", "admin"]), getUsers)

router.get("/:uid", passportCall("current"), handlePolicies(["user", "VIP", "admin"]), getUserById)

router.put("/:uid", passportCall("current"), handlePolicies(["user", "VIP", "admin"]), updateUser)

router.delete("/:uid", passportCall("current"), handlePolicies(["admin"]), deleteUser)

export default router