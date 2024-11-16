import { Router } from "express"
import { getCart, clearCart, deleteProductFromCart } from "../Controllers/cart.controller.js"

const router = Router()

router.get("/", getCart)

router.delete("/:cid", clearCart)

router.delete("/:cid/product/:pid", deleteProductFromCart)

export default router