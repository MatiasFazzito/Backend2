export default class CartDto {
    constructor(cart) {
        this.id = cart._id
        this.products = cart.products.map(product => { return { product: product.product.title, price: product.product.price, quantity: product.quantity } })
        this.amount = cart.amount
    }
}