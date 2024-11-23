import { Router } from "express"
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct, addToCart } from "../Controllers/product.controller.js"
import { handlePolicies, passportCall } from "../utils.js"

const router = Router()

router.post('/', createProduct)

router.get('/', getProducts)

router.get("/:pid", getProductById)

router.put("/:pid", passportCall("current"), handlePolicies(["admin"]), updateProduct)

router.delete("/:pid", passportCall("current"), handlePolicies(["admin"]), deleteProduct)

router.post('/:pid/addToCart', passportCall("current"), handlePolicies(["user", "VIP"]), addToCart)

export default router