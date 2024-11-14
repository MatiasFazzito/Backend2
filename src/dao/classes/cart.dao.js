import CartModel from "../models/cart.model.js"

export default class Cart {

    getCartById = async () => {
        try {
            const cartId = req.session.user.cart
            const cart = await CartModel.findOne({ _id: cartId }).populate("products.product")

            return cart
        } catch (error) {
            return null
        }
    }

    deleteCart = async (id) => {
        try {
            const { cid } = req.params

            const cart = await CartModel.deleteOne({ _id: cid })

            cart.products = []
            await cart.save()

        } catch (error) {
            return null
        }
    }

    deleteProductFromCart = async () => {
        try {
            const { cid, pid } = req.params

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

    /*checkout = async ()=>{
        try {
            
        } catch (error) {
            
        }
    }*/
}