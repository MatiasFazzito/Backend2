import mongoose from 'mongoose'

const productsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true}
})
productsSchema.index({title: 1})

const ProductModel = mongoose.model('products', productsSchema)

export default ProductModel