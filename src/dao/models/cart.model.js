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
  },
  amount: {type: Number}
})

const CartModel = mongoose.model('carts', cartSchema)

export default CartModel