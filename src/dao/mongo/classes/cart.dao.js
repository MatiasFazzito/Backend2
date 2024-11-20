import CartModel from "../models/cart.model.js"

export default class Cart {

    getCartById = async (id) => {
        try {
            const cart = await CartModel.findOne({ _id: id }).populate("products.product")

            return cart
        } catch (error) {
            return null
        }
    }

    deleteCart = async (id) => {
        try {
            const cart = await CartModel.findOne({ _id: id })

            cart.products = []
            await cart.save()

        } catch (error) {
            return null
        }
    }

    deleteProductFromCart = async (cid, pid) => {
        try {
            const cart = await CartModel.findOne({ _id: cid })

            const productIndex = cart.products.findIndex(p => p._id.toString() === pid)
            if (!productIndex) {
                return res.render("error", { error: 'Producto no encontrado en el carrito' })
            }

            cart.products.splice(productIndex, 1)
            cart.save()
        } catch (error) {
            return null
        }
    }
}