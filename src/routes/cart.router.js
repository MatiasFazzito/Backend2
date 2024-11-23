import { Router } from "express"
import { getCart, clearCart, deleteProductFromCart } from "../Controllers/cart.controller.js"
import { createTicket } from "../Controllers/ticket.controller.js"
import { handlePolicies, passportCall } from "../utils.js"

const router = Router()

router.get("/",passportCall("current"), handlePolicies(["user", "VIP"]), getCart)

router.delete("/:cid",passportCall("current"), handlePolicies(["user", "VIP"]), clearCart)

router.delete("/:cid/product/:pid",passportCall("current"), handlePolicies(["user", "VIP"]), deleteProductFromCart)

router.post("/:cid/purchase",passportCall("current"), handlePolicies(["user", "VIP"]), createTicket)

export default router