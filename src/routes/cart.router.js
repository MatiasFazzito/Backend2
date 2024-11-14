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

router.delete("/:cid", async (req, res) => {
    try {
        const { cid } = req.params

        const cart = await CartModel.findById(cid)

        cart.products = []
        await cart.save()

        res.redirect(`/profile`)

    } catch (error) {
        res.render('error', { error: 'Error al eliminar carrito' })
    }
})

router.delete("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params

        const cart = await CartModel.findById(cid)

        const productIndex = cart.products.findIndex(p => p._id.toString() === pid)
        if (!productIndex) {
            return res.render("error", { error: 'Producto no encontrado en el carrito' })
        }

        cart.products.splice(productIndex, 1)
        cart.save()

        res.redirect(`/api/cart`)

    } catch (error) {
        res.render('error', { error: 'Error al eliminar producto en carrito' })
    }
})

//Ruta en construccion
router.post("/checkout", (req, res) => {

})

export default router