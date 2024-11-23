import { Router } from "express"
import { getCart, clearCart, deleteProductFromCart } from "../Controllers/cart.controller.js"
import { createTicket } from "../Controllers/ticket.controller.js"
import { handlePolicies, passportCall } from "../utils.js"

const router = Router()

router.get("/",passportCall("jwt"), handlePolicies(["user", "VIP"]), getCart)

router.delete("/:cid",passportCall("jwt"), handlePolicies(["user", "VIP"]), clearCart)

router.delete("/:cid/product/:pid",passportCall("jwt"), handlePolicies(["user", "VIP"]), deleteProductFromCart)

router.post("/:cid/purchase",passportCall("jwt"), handlePolicies(["user", "VIP"]), createTicket)

export default router