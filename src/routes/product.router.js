import { Router } from "express"
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct, addToCart } from "../Controllers/product.controller.js"
import { handlePolicies, passportCall } from "../utils.js"

const router = Router()

router.post('/', createProduct)

router.get('/', getProducts)

router.get("/:pid", getProductById)

router.put("/:pid", passportCall("jwt"), handlePolicies(["admin"]), updateProduct)

router.delete("/:pid", passportCall("jwt"), handlePolicies(["admin"]), deleteProduct)

router.post('/:pid/addToCart', passportCall("jwt"), handlePolicies(["user", "VIP"]), addToCart)

export default router