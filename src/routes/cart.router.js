import { Router } from 'express'
import CartModel from '../models/cart.model.js'

const router = Router()

router.get("/", async (req, res) => {
    try {
        const cartId = req.session.user.cart
        const cart = await CartModel.findById(cartId).populate("products.product")

        res.render("cart", { cart: cart.toObject() })
    } catch (error) {
        res.render('error', { error: 'Error al mostrar carrito' })
    }
})

export default router