import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products'
        },
        quantity: Number
      }
    ],
    default: []
  }
})

const CartModel = mongoose.model('cart', cartSchema)

export default CartModel