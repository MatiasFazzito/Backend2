import ProductModel from "../dao/mongo/models/product.model.js"
import CartModel from "../dao/mongo/models/cart.model.js"

export default class ProductRepository {
    createProduct = async (body) => {
        try {
            const newProduct = await ProductModel.create(body)

            return newProduct
        } catch (error) {
            return null
        }
    }

    getProducts = async (req) => {
        try {
            const products = await ProductModel.find()

            return products
        } catch (error) {

            return null
        }
    }

    getProductById = async (id) => {
        try {
            const product = await ProductModel.findOne({ _id: id })

            return product

        } catch (error) {
            return null
        }
    }

    updateProduct = async (id, updateData) => {
        try {
            const product = await ProductModel.updateOne({ _id: id }, updateData)

            return product

        } catch (error) {
            return null
        }
    }

    deleteProduct = async (id) => {
        try {
            await ProductModel.deleteOne({ _id: id })

        } catch (error) {
            return null
        }
    }

    addProductToCart = async (id, quantity, cartId) => {
        try {
            const product = await ProductModel.findOne({ _id: id })
            const cart = await CartModel.findOne({ _id: cartId })

            const productIndex = cart.products.findIndex(item => item.product.toString() === product._id.toString())

            if (productIndex !== -1) {
                cart.products[productIndex].quantity = Number(cart.products[productIndex].quantity) + Number(quantity)
            } else {
                cart.products.push({ product: product._id, quantity })
            }

            await cart.save()
        } catch (error) {
            return null
        }
    }
}