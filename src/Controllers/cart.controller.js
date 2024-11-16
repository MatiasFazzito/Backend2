import Cart from "../dao/classes/cart.dao.js"

const cartService = new Cart()

export const getCart = async (req, res) => {
    try {
        const cartId = req.session.user.cart

        const cart = await cartService.getCartById(cartId)

        res.render("cart", { cart: cart.toObject() })

    } catch (error) {
        res.render('error', { error: 'Error al mostrar carrito' })
    }
}

export const clearCart = async (req, res) => {
    try {
        const { cid } = req.params

        await cartService.deleteCart(cid)

        res.redirect(`/profile`)

    } catch (error) {
        res.render('error', { error: 'Error al eliminar carrito' })
    }
}

export const deleteProductFromCart = async (req,res)=>{
    try {
        const { cid, pid } = req.params

        await cartService.deleteProductFromCart(cid, pid)

        res.redirect(`/api/cart`)
    } catch (error) {
        res.render('error', { error: 'Error al eliminar producto en carrito' })
    }
}