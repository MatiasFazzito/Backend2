import { Router } from "express"
import { getCart, clearCart, deleteProductFromCart } from "../Controllers/cart.controller.js"
import { createTicket } from "../Controllers/ticket.controller.js"

const router = Router()

router.get("/", getCart)

router.delete("/:cid", clearCart)

router.delete("/:cid/product/:pid", deleteProductFromCart)

router.post("/:cid/purchase", createTicket)

export default router