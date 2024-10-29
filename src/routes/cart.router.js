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

router.get('/products/allproducts', async (req, res) => {
    try {
        const products = await ProductModel.find()

        res.json(products)
    } catch (error) {
        console.error('Error fetching products:', error)
        res.status(500).send('Error fetching products')
    }
})

export default router