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
  amount: { type: Number, default: 0 }
})

cartSchema.pre('save', function (next) {
  this.amount = this.products.reduce((acc, product) => acc + product.quantity, 0)
  next()
})

const CartModel = mongoose.model('carts', cartSchema)

export default CartModel