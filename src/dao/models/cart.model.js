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

cartSchema.pre('save', async function (next) {

  await this.populate('products.product')

  this.amount = this.products.reduce((acc, product) => {
    return acc + product.product.price * product.quantity
  }, 0)

  next()
})

const CartModel = mongoose.model('carts', cartSchema)

export default CartModel